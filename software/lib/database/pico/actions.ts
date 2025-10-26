"use server"

import { prisma } from "@/lib/prisma"
import { Pico } from "@/lib/types"

export async function fetchPicos(): Promise<Pico[]> {
  const now = new Date()
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)

  const picos = await prisma.pico.findMany()

  const updatedPicos = await Promise.all(
    picos.map(async (pico) => {
      if (pico.lastSeen < fiveMinutesAgo && pico.status === "online") {
        return await prisma.pico.update({ where: { id: pico.id }, data: { status: "offline" } })
      }
      return pico
    })
  )

  return updatedPicos.map((pico) => ({
    id: pico.id,
    name: pico.name ?? undefined,
    macAddress: pico.macAddress,
    lastSeen: pico.lastSeen,
    status: pico.status as "online" | "offline",
  })) as Pico[]
}

export async function updatePico(
  picoId: number,
  updates: Partial<Pick<Pico, "name">>
): Promise<Pico> {
  try {
    const updatedPico = await prisma.pico.update({
      where: { id: picoId },
      data: {
        name: updates.name || null,
      },
    })

    return {
      id: updatedPico.id,
      name: updatedPico.name ?? undefined,
      macAddress: updatedPico.macAddress,
      lastSeen: updatedPico.lastSeen,
      status: updatedPico.status as "online" | "offline",
    } as Pico
  } catch (error) {
    console.error("Error updating pico:", error)
    throw new Error("Failed to update pico")
  }
}
