import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

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

    const now = new Date()

    console.log(`[PICO REGISTER] Adding Pico ${body.macAddress} to database`)

    const pico = await prisma.pico.upsert({
      where: { macAddress: body.macAddress },
      update: { lastSeen: now, status: "online" },
      create: { macAddress: body.macAddress, lastSeen: now, status: "online" },
    })

    const allPicos = await prisma.pico.findMany()

    console.log(`[PICO REGISTER] Pico registered: ${pico.macAddress}`)
    console.log(`[PICO REGISTER] Total connected Picos: ${allPicos.length}`)

    return NextResponse.json(
      { text: `Pico ${pico.macAddress} has been registered with the server` },
      { status: 200 }
    )
  } catch (error) {
    console.error("[PICO REGISTER] Error registering Pico:", error)
    return NextResponse.json({ error: "Invalid JSON or server error" }, { status: 500 })
  }
}
