import { Robot } from "@/lib/types/robot"
import { NextRequest, NextResponse } from "next/server"

let connectedRobots: Map<string, Robot> = new Map()

interface RobotRegisterRequest {
  macAddress: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RobotRegisterRequest

    if (!body.macAddress) {
      console.error("[ROBOT REGISTER] Robot address is required")
      return NextResponse.json({ error: "Robot address is required" }, { status: 400 })
    } else {
      console.log("[ROBOT REGISTER] Robot address:", body.macAddress)
    }

    const robotAddress = body.macAddress
    const now = Date.now()

    const robot: Robot = {
      macAddress: robotAddress,
      lastSeen: now,
      status: "online",
    }
    connectedRobots.set(robotAddress, robot)

    console.log(`[ROBOT REGISTER] Robot registered: ${robotAddress}`)
    console.log(`[ROBOT REGISTER] Total connected robots: ${connectedRobots}`)

    return NextResponse.json(
      { text: `Robot ${robotAddress} has been registered with the server` },
      { status: 200 }
    )
  } catch (error) {
    console.error("[ROBOT REGISTER] Error registering Robot:", error)
    return NextResponse.json({ error: "Invalid JSON or server error" }, { status: 500 })
  }
}

export async function GET() {
  const now = Date.now()
  const fiveMinutesAgo = now - 5 * 60 * 1000

  for (const [address, robot] of connectedRobots.entries()) {
    if (robot.lastSeen < fiveMinutesAgo && robot.status === "online") {
      robot.status = "offline"
    }
  }

  return NextResponse.json(
    { connectedRobots: Array.from(connectedRobots.values()), totalRobots: connectedRobots.size },
    { status: 200 }
  )
}
