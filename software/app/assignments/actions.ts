"use server"

import prisma from "@/lib/prisma"
import { Pico } from "@/lib/types/pico"
import { Robot } from "@/lib/types/robot"
import { RobotPicoAssignment } from "@/lib/types/robot-pico"

export async function fetchRobots(): Promise<Robot[]> {
  const robots = await prisma.robot.findMany()
  return robots.map((robot) => ({
    id: robot.id,
    name: robot.name ?? undefined,
    macAddress: robot.macAddress,
    lastSeen: robot.lastSeen.toISOString(),
    status: robot.status as "online" | "offline",
  })) as Robot[]
}

export async function fetchPicos(): Promise<Pico[]> {
  const picos = await prisma.pico.findMany()
  return picos.map((pico) => ({
    id: pico.id,
    name: pico.name ?? undefined,
    macAddress: pico.macAddress,
    lastSeen: pico.lastSeen.toISOString(),
    status: pico.status as "online" | "offline",
  })) as Pico[]
}

export async function fetchAssignments(): Promise<RobotPicoAssignment[]> {
  const assignments = await prisma.robotPicoAssignment.findMany({
    include: { robot: true, pico: true },
  })
  // Types align closely; cast for client types that use string dates already
  return assignments as unknown as RobotPicoAssignment[]
}

export async function setAssignment(robotId: number, picoId: number | null): Promise<void> {
  if (picoId === null) {
    await prisma.robotPicoAssignment.updateMany({
      where: { robotId, isActive: true },
      data: { isActive: false },
    })
    return
  }

  await prisma.$transaction([
    prisma.robotPicoAssignment.updateMany({
      where: { robotId, isActive: true },
      data: { isActive: false },
    }),
    prisma.robotPicoAssignment.upsert({
      where: { robotId_picoId: { robotId, picoId } },
      update: { isActive: true },
      create: { robotId, picoId, isActive: true },
    }),
  ])
}
