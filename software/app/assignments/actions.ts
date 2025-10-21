"use server"

import { prisma } from "@/lib/prisma"

export async function setAssignment(robotId: number, picoId: number | null): Promise<void> {
  if (picoId === null) {
    await prisma.assignment.updateMany({
      where: { robotId, isActive: true },
      data: { isActive: false },
    })
    return
  }

  await prisma.$transaction([
    prisma.assignment.updateMany({
      where: { robotId, isActive: true },
      data: { isActive: false },
    }),
    prisma.assignment.upsert({
      where: { robotId_picoId: { robotId, picoId } },
      update: { isActive: true },
      create: { robotId, picoId, isActive: true },
    }),
  ])
}
