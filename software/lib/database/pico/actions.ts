"use server"

import { prisma } from "@/lib/prisma"
import { Pico } from "@/lib/types"

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
