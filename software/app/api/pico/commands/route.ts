import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

interface PicoCommandsRequest {
  macAddress: string
  commands: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PicoCommandsRequest

    if (!body.macAddress || !body.commands || !Array.isArray(body.commands)) {
      console.error("[PICO COMMANDS] Pico address and valid commands array are required")
      return NextResponse.json(
        { error: "Pico address and valid commands array are required" },
        { status: 400 }
      )
    }

    if (Array.isArray(body.commands) && body.commands.length === 0) {
      console.error("[PICO COMMANDS] Commands array cannot be empty")
      return NextResponse.json({ error: "Commands array cannot be empty" }, { status: 400 })
    }

    console.log("[PICO COMMANDS] Pico address:", body.macAddress)
    console.log("[PICO COMMANDS] Commands:", body.commands)

    console.log(
      `[PICO COMMANDS] Adding [${body.commands.length}] commands from Pico ${body.macAddress} to database`
    )

    const command = await prisma.commands.create({
      data: { macAddress: body.macAddress, data: JSON.stringify(body.commands) },
    })

    const commandQueue = await prisma.commands.findMany({ where: { macAddress: body.macAddress } })

    // const { macAddress, commands } = body

    // commandQueue.push(...commands)

    console.log(`[PICO COMMANDS] Commands added to queue: ${body.commands.length}`)
    console.log(
      `[PICO COMMANDS] Command queue: ${commandQueue.filter((cmd) => cmd.read === false).length}`
    )

    return NextResponse.json(
      { text: `Commands added to queue: ${JSON.parse(command.data).length}` },
      { status: 200 }
    )
  } catch (error) {
    console.error("[PICO COMMANDS] Error sending commands from Pico:", error)
    return NextResponse.json({ error: "Invalid JSON or server error" }, { status: 500 })
  }
}

export async function GET() {
  console.log("[PICO COMMANDS] Getting Commands List")
  try {
    const allCommands = await prisma.commands.findMany()

    // console.log(`[PICO COMMANDS] Commands List[${allCommands.length}]: ${allCommands}`)

    return NextResponse.json({ commandList: allCommands }, { status: 200 })
  } catch (error) {
    console.error("[PICO COMMANDS] Error fetching Commands:", error)
    return NextResponse.json({ error: "Error fetching Commands" }, { status: 500 })
  }
  // return NextResponse.json({ commandQueue: commandQueue }, { status: 200 })
}
