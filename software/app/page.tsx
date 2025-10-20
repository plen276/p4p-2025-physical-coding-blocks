import { prisma } from "@/lib/prisma"
import ApiDocumentation from "./_components/api-documentation"
import CommandList from "./_components/command-list"
import PicoList from "./_components/pico-list"
import RobotList from "./_components/robot-list"
import { Pico } from "./generated/prisma"

export default async function Home() {
  // const defaultUrl = process.env.NEXT_PUBLIC_DEFAULT_URL
  //   ? process.env.NEXT_PUBLIC_DEFAULT_URL
  //   : "http://localhost:3000"

  // // const picoResponse = await fetch(`${defaultUrl}/api/pico/register`, { cache: "no-store" })
  // const picoResponse = await fetch("http://localhost:3000/api/pico/register", { cache: "no-store" })
  // // const {connectedPicos: Pico[],totalPicos:number} = await picoResponse.json()
  // const picoData = (await picoResponse.json()) as PicoRegistry
  // console.log("The API returned:", picoData)
  // console.log(`Total connected [${picoData.connectedPicos.length}]:`, picoData.connectedPicos)

  // const robotResponse = await fetch("http://localhost:3000/api/robot/register", {
  //   cache: "no-store",
  // })
  // const robotData = (await robotResponse.json()) as RobotRegistry
  // console.log("The API returned:", robotData)
  // console.log(`Total connected [${robotData.connectedRobots.length}]:`, robotData.connectedRobots)

  // const commandResponse = await fetch("http://localhost:3000/api/pico/commands", {
  //   cache: "no-store",
  // })
  // const commandData = (await commandResponse.json()) as CommandRegistry
  // console.log("The API returned:", commandData)
  // const commandList: Command[] = commandData.commandList.map((cmd) => ({
  //   id: cmd.id,
  //   macAddress: cmd.macAddress,
  //   read: cmd.read,
  //   createdAt: new Date(cmd.createdAt),
  //   data: JSON.parse(cmd.data),
  // }))
  // console.log("Formatted commands:", commandList)

  const picos: Pico[] = await prisma.pico.findMany()
  const robots = await prisma.robot.findMany()
  const commands = await prisma.commands.findMany()

  return (
    <div className="space-y-6">
      {/* Status Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Connected Picos */}
        <PicoList connectedPicos={picos} totalPicos={picos.length} />

        {/* Connected Robots */}
        <RobotList connectedRobots={robots} />
      </div>

      {/* Commands List */}
      <CommandList commands={commands} />

      {/* API Documentation */}
      <ApiDocumentation />
    </div>
  )
}
