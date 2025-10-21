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
