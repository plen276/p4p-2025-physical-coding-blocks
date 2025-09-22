import { Pico } from "@/lib/types/pico"
import { NextRequest, NextResponse } from "next/server"

let connectedPicos: Map<string, Pico> = new Map()

interface PicoRegisterRequest {
  macAddress: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PicoRegisterRequest

    if (!body.macAddress) {
      console.error("[PICO REGISTER] Pico address is required")
      return NextResponse.json({ error: "Pico address is required" }, { status: 400 })
    } else {
      console.log("[PICO REGISTER] Pico address:", body.macAddress)
    }

    const picoAddress = body.macAddress
    const now = Date.now()

    const pico: Pico = {
      macAddress: picoAddress,
      lastSeen: now,
      status: "online",
      commandCount: 0,
    }
    connectedPicos.set(picoAddress, pico)

    console.log(`[PICO REGISTER] Pico registered: ${picoAddress}`)
    console.log(`[PICO REGISTER] Total connected Picos: ${connectedPicos.size}`)

    return NextResponse.json(
      { text: `Pico ${picoAddress} has been registered with the server :) new test` },
      { status: 200 }
    )
  } catch (error) {
    console.error("[PICO REGISTER] Error registering Pico:", error)
    return NextResponse.json({ error: "Invalid JSON or server error" }, { status: 500 })
  }
}

export async function GET() {
  const now = Date.now()
  const fiveMinutesAgo = now - 5 * 60 * 1000

  for (const [address, pico] of connectedPicos.entries()) {
    if (pico.lastSeen < fiveMinutesAgo && pico.status === "online") {
      pico.status = "offline"
    }
  }

  return NextResponse.json(
    {
      connectedPicos: Array.from(connectedPicos.values()),
      totalPicos: connectedPicos.size,
    },
    { status: 200 }
  )
}

export { connectedPicos }
