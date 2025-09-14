import { connectedPicos } from "@/app/api/pico/register/route"
import { Command } from "@/lib/types/command"
import { NextRequest, NextResponse } from "next/server"

// In-memory command queue (in production, use Redis or database)
let commandQueue: Command[] = []

// POST /api/pico - Pico W sends commands here
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.type) {
      return NextResponse.json({ error: "Command type is required" }, { status: 400 })
    }

    // Get Pico address from request headers or body
    const picoAddress = body.picoAddress || request.headers.get("x-pico-address") || "unknown"

    // Update Pico's lastSeen time and increment command count
    const existingPico = connectedPicos.get(picoAddress)
    if (existingPico) {
      existingPico.lastSeen = Date.now()
      existingPico.status = "online"
      existingPico.commandCount += 1
    }

    // Create new command
    const command: Command = {
      id: `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: body.type,
      data: body.data || {},
      timestamp: Date.now(),
      status: "pending",
      picoAddress: picoAddress,
    }

    // Add to queue
    commandQueue.push(command)

    console.log(`[PICO] Received command: ${command.type} (ID: ${command.id}) from ${picoAddress}`)
    console.log(`[PICO] Queue length: ${commandQueue.length}`)

    return NextResponse.json({
      success: true,
      commandId: command.id,
      queueLength: commandQueue.length,
      picoAddress: picoAddress,
    })
  } catch (error) {
    console.error("[PICO] Error processing command:", error)
    return NextResponse.json({ error: "Invalid JSON or server error" }, { status: 500 })
  }
}

// GET /api/pico - Get command queue status
export async function GET() {
  return NextResponse.json({
    queueLength: commandQueue.length,
    commands: commandQueue.map((cmd) => ({
      id: cmd.id,
      type: cmd.type,
      status: cmd.status,
      timestamp: cmd.timestamp,
      picoAddress: cmd.picoAddress,
    })),
  })
}

// Export the queue for use in robot route
export { commandQueue }
