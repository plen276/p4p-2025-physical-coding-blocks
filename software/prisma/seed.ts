import { prisma } from "@/lib/prisma"
import { faker } from "@faker-js/faker"
import { Pico, Prisma, Robot } from "../app/generated/prisma"

const NUM_PICOS = 20
const NUM_ROBOTS = 20
const NUM_COMMANDS = 50

const tenMinutesAgo = new Date(Date.now() - 1000 * 60 * 10) // 1 hour ago
const now = new Date()

function generatePicos(): Prisma.PicoCreateInput[] {
  return Array.from({ length: NUM_PICOS }).map(() => ({
    name: faker.commerce.productName(),
    macAddress: faker.internet.mac(),
    lastSeen: faker.date.between({ from: tenMinutesAgo, to: now }),
    status: "online",
  }))
}

function generateRobots(): Prisma.RobotCreateInput[] {
  return Array.from({ length: NUM_ROBOTS }).map(() => ({
    name: faker.commerce.productName(),
    macAddress: faker.internet.mac(),
    lastSeen: faker.date.between({ from: tenMinutesAgo, to: now }),
    status: "online",
  }))
}

function createCommandStrings(count = 10) {
  const letters = ["A", "B", "D"]

  return Array.from({ length: count }, () => {
    const letter = faker.helpers.arrayElement(letters) // pick one type
    const repeatCount = faker.number.int({ min: 1, max: 3 }) // repeat 1–3 times
    return letter.repeat(repeatCount) // e.g. "AAA" or "BB"
  })
}

function generateCommands(picos: Pico[]): Prisma.CommandCreateInput[] {
  const targets = [...picos]
  return Array.from({ length: NUM_COMMANDS }).map(() => ({
    macAddress: faker.helpers.arrayElement(targets).macAddress,
    data: JSON.stringify(createCommandStrings()),
    read: faker.datatype.boolean(),
    createdAt: faker.date.between({ from: tenMinutesAgo, to: now }),
  }))
}

export async function main() {
  console.log("Starting to seed...")

  console.log("...seeding picos...")
  const picoData = generatePicos()
  const createdPicos: Pico[] = []
  for (const pico of picoData) {
    const createdPico = await prisma.pico.upsert({
      where: { macAddress: pico.macAddress },
      update: {},
      create: pico,
    })
    createdPicos.push(createdPico)
  }

  console.log("...seeding robots...")
  const robotData = generateRobots()
  const createdRobots: Robot[] = []
  for (const robot of robotData) {
    const createdRobot = await prisma.robot.upsert({
      where: { macAddress: robot.macAddress },
      update: {},
      create: robot,
    })
    createdRobots.push(createdRobot)
  }

  console.log("...seeding assignments...")
  for (const robot of createdRobots) {
    const pico = faker.helpers.arrayElement(createdPicos)
    await prisma.assignment.upsert({
      where: { robotId_picoId: { robotId: robot.id, picoId: pico.id } },
      update: {},
      create: { robotId: robot.id, picoId: pico.id, isActive: faker.datatype.boolean() },
    })
  }

  console.log("...seeding commands...")
  const commandData = generateCommands(createdPicos)
  await prisma.command.createMany({ data: commandData })

  console.log("...seeding finished.")
}

main()
