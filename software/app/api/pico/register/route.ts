import prisma from "@/lib/prisma"
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

export async function GET() {
  console.log("[PICO REGISTER] Getting Pico List")
  try {
    const now = new Date()
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)

    const allPicos = await prisma.pico.findMany()
    console.log("[PICO REGISTER] All Picos:", allPicos)

    const updatedPicos = await Promise.all(
      allPicos.map(async (pico) => {
        if (pico.lastSeen < fiveMinutesAgo && pico.status === "online") {
          return await prisma.pico.update({ where: { id: pico.id }, data: { status: "offline" } })
        }
        return pico
      })
    )

    return NextResponse.json({ connectedPicos: updatedPicos }, { status: 200 })
  } catch (error) {
    console.error("[PICO REGISTER] Error fetching Picos:", error)
    return NextResponse.json({ error: "Error fetching Picos" }, { status: 500 })
  }
}
