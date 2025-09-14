import { NextRequest, NextResponse } from "next/server"

// In-memory robot registry (in production, use database)
let robotRegistry: { [key: string]: { macAddress: string; lastSeen: number; status: string } } = {}

// POST /api/robot/register - Register robot with MAC address
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { robotId, macAddress, status = "online" } = body

    // Validate required fields
    if (!robotId) {
      return NextResponse.json({ error: "robotId is required" }, { status: 400 })
    }

    if (!macAddress) {
      return NextResponse.json({ error: "macAddress is required" }, { status: 400 })
    }

    // Register or update robot
    robotRegistry[robotId] = {
      macAddress,
      lastSeen: Date.now(),
      status,
    }

    console.log(`[ROBOT] Robot registered: ${robotId} (MAC: ${macAddress})`)

    return NextResponse.json({
      success: true,
      message: "Robot registered successfully",
      robotId,
      macAddress,
      registeredAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[ROBOT] Error registering robot:", error)
    return NextResponse.json({ error: "Invalid JSON or server error" }, { status: 500 })
  }
}

// GET /api/robot/register - Get all registered robots
export async function GET() {
  return NextResponse.json({
    success: true,
    robots: Object.entries(robotRegistry).map(([robotId, data]) => ({
      robotId,
      macAddress: data.macAddress,
      lastSeen: new Date(data.lastSeen).toISOString(),
      status: data.status,
    })),
  })
}

// Export the registry for use in other routes
export { robotRegistry }
