"use server"

import { prisma } from "@/lib/prisma"
import { Robot } from "@/lib/types"

export async function fetchRobots(): Promise<Robot[]> {
  const now = new Date()
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)

  const robots = await prisma.robot.findMany()

  const updatedRobots = await Promise.all(
    robots.map(async (robot) => {
      if (robot.lastSeen < fiveMinutesAgo && robot.status === "online") {
        return await prisma.robot.update({ where: { id: robot.id }, data: { status: "offline" } })
      }
      return robot
    })
  )

  return updatedRobots.map((robot) => ({
    id: robot.id,
    name: robot.name ?? undefined,
    macAddress: robot.macAddress,
    lastSeen: robot.lastSeen,
    status: robot.status as "online" | "offline",
  })) as Robot[]
}

export async function updateRobot(
  robotId: number,
  updates: Partial<Pick<Robot, "name">>
): Promise<Robot> {
  try {
    const updatedRobot = await prisma.robot.update({
      where: { id: robotId },
      data: {
        name: updates.name || null,
      },
    })

    return {
      id: updatedRobot.id,
      name: updatedRobot.name ?? undefined,
      macAddress: updatedRobot.macAddress,
      lastSeen: updatedRobot.lastSeen,
      status: updatedRobot.status as "online" | "offline",
    } as Robot
  } catch (error) {
    console.error("Error updating robot:", error)
    throw new Error("Failed to update robot")
  }
}
