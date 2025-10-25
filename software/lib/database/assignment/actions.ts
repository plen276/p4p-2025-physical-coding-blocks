"use server"

import { prisma } from "@/lib/prisma"
import { Assignment } from "@/lib/types"

export async function fetchAssignments(): Promise<Assignment[]> {
  const assignments = await prisma.assignment.findMany({
    include: { robot: true, pico: true },
  })
  // Types align closely; cast for client types that use string dates already
  return assignments as unknown as Assignment[]
}

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
