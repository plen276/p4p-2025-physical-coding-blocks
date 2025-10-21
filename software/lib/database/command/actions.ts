"use server"

import { prisma } from "@/lib/prisma"
import { Command } from "@/lib/types"

export async function fetchCommands(): Promise<Command[]> {
  const commands = await prisma.command.findMany()
  return commands.map((command) => ({
    id: command.id,
    macAddress: command.macAddress,
    data: JSON.parse(command.data) as string[],
    read: command.read,
    createdAt: command.createdAt,
  })) as Command[]
}
