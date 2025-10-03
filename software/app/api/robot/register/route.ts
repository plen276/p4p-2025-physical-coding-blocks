import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

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

    const now = new Date()

    console.log(`[ROBOT REGISTER] Adding Robot ${body.macAddress} to database`)

    const robot = await prisma.robot.upsert({
      where: { macAddress: body.macAddress },
      update: { lastSeen: now, status: "online" },
      create: { macAddress: body.macAddress, lastSeen: now, status: "online" },
    })

    const allRobots = await prisma.robot.findMany()

    console.log(`[ROBOT REGISTER] Robot registered: ${robot.macAddress}`)
    console.log(`[ROBOT REGISTER] Total connected robots: ${allRobots.length}`)

    return NextResponse.json(
      { text: `Robot ${robot.macAddress} has been registered with the server` },
      { status: 200 }
    )
  } catch (error) {
    console.error("[ROBOT REGISTER] Error registering Robot:", error)
    return NextResponse.json({ error: "Invalid JSON or server error" }, { status: 500 })
  }
}

export async function GET() {
  console.log("[ROBOT REGISTER] Getting Robot List")
  try {
    const now = new Date()
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)

    const allRobots = await prisma.robot.findMany()
    console.log("[ROBOT REGISTER] All Robots:", allRobots)

    const updatedRobots = await Promise.all(
      allRobots.map(async (robot) => {
        if (robot.lastSeen < fiveMinutesAgo && robot.status === "online") {
          return await prisma.robot.update({ where: { id: robot.id }, data: { status: "offline" } })
        }
        return robot
      })
    )

    return NextResponse.json({ connectedRobots: updatedRobots }, { status: 200 })
  } catch (error) {
    console.error("[ROBOT REGSITER] Error fetching Robots:", error)
    return NextResponse.json({ error: "Error fetching Picos" }, { status: 500 })
  }
}
