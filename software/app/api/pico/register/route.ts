import { Pico } from "@/lib/types/command"
import { NextRequest, NextResponse } from "next/server"

// In-memory Pico registry (in production, use Redis or database)
let connectedPicos: Map<string, Pico> = new Map()

// POST /api/pico/register - Pico W registers itself
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.address) {
      return NextResponse.json({ error: "Pico address is required" }, { status: 400 })
    }

    const picoAddress = body.address
    const now = Date.now()

    // Update or create Pico registry entry
    const existingPico = connectedPicos.get(picoAddress)
    const pico: Pico = {
      address: picoAddress,
      lastSeen: now,
      status: "online",
      commandCount: existingPico ? existingPico.commandCount : 0,
    }
    connectedPicos.set(picoAddress, pico)

    console.log(`[PICO REGISTER] Pico registered: ${picoAddress}`)
    console.log(`[PICO REGISTER] Total connected Picos: ${connectedPicos.size}`)

    return NextResponse.json({
      success: true,
      pico: pico,
      totalPicos: connectedPicos.size,
    })
  } catch (error) {
    console.error("[PICO REGISTER] Error registering Pico:", error)
    return NextResponse.json({ error: "Invalid JSON or server error" }, { status: 500 })
  }
}

// GET /api/pico/register - Get all registered Picos
export async function GET() {
  // Check for offline Picos (haven't been seen in 5 minutes)
  const now = Date.now()
  const fiveMinutesAgo = now - 5 * 60 * 1000

  for (const [address, pico] of connectedPicos.entries()) {
    if (pico.lastSeen < fiveMinutesAgo && pico.status === "online") {
      pico.status = "offline"
    }
  }

  return NextResponse.json({
    success: true,
    connectedPicos: Array.from(connectedPicos.values()),
    totalPicos: connectedPicos.size,
  })
}

// Export the registry for use in other routes
export { connectedPicos }
