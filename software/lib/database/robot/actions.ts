"use server"

import { prisma } from "@/lib/prisma"
import { Robot } from "@/lib/types"

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
