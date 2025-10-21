import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log("[ROBOT COMMANDS] GET request received")
  try {
    const robotMacAddress = request.nextUrl.searchParams.get("macAddress")
    console.log("[ROBOT COMMANDS] Robot MAC address:", robotMacAddress)

    if (!robotMacAddress) {
      return NextResponse.json({ error: "Robot MAC address is required" }, { status: 400 })
    }

    const robot = await prisma.robot.findUnique({
      where: { macAddress: robotMacAddress },
    })

    if (!robot) {
      return NextResponse.json({ error: "Robot not found" }, { status: 404 })
    }

    const assignment = await prisma.assignment.findFirst({
      where: {
        robotId: robot.id,
        isActive: true,
      },
    })

    if (!assignment) {
      return NextResponse.json(
        { error: "No active assignment found for this robot" },
        { status: 404 }
      )
    }

    const pico = await prisma.pico.findUnique({
      where: { id: assignment.picoId },
    })

    if (!pico) {
      return NextResponse.json({ error: "Assigned Pico not found" }, { status: 404 })
    }

    const commands = await prisma.command.findMany({
      where: {
        macAddress: pico.macAddress,
        read: false,
      },
    })

    console.log("[ROBOT COMMANDS] Found commands:", commands)

    if (commands.length === 0) {
      return NextResponse.json({ commands: [] }, { status: 200 })
    }

    const commandIds = commands.map((command) => command.id)

    await prisma.command.updateMany({
      where: {
        id: {
          in: commandIds,
        },
      },
      data: {
        read: true,
      },
    })

    console.log("[ROBOT COMMANDS] Marked commands as read:", commandIds)

    const parsedCommands = commands.map((command) => JSON.parse(command.data))

    return NextResponse.json({ commands: parsedCommands.flat() }, { status: 200 })
  } catch (error) {
    console.error("[ROBOT COMMANDS] Error fetching commands for Robot:", error)
    return NextResponse.json({ error: "Invalid JSON or server error" }, { status: 500 })
  }
}
