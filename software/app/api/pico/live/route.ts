import { getLiveCommands, setLiveCommands } from "@/lib/live-commands"
import { NextRequest, NextResponse } from "next/server"

// TODO: Turns out I forgot to cast the json body so I'll leave this here
// interface PicoLiveRequest {
//   macAddress: string
//   commands: string
// }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() // as PicoLiveRequest
    const { macAddress, commands } = body

    if (!macAddress || !commands) {
      return NextResponse.json({ error: "MAC address and commands are required" }, { status: 400 })
    }

    setLiveCommands(macAddress, commands)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[PICO LIVE COMMANDS] Error receiving commands:", error)
    return NextResponse.json({ error: "Invalid JSON or server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const macAddress = request.nextUrl.searchParams.get("macAddress")

    if (!macAddress) {
      return NextResponse.json({ error: "MAC address is required" }, { status: 400 })
    }

    const commands = getLiveCommands(macAddress)

    return NextResponse.json({ commands }, { status: 200 })
  } catch (error) {
    console.error("[PICO LIVE COMMANDS] Error fetching commands:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
