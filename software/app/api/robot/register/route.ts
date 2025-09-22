import { NextRequest, NextResponse } from "next/server";

interface RobotRegisterRequest {
    macAddress: string
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as RobotRegisterRequest

        if (!body.macAddress) {
            console.error("[ROBOT REGISTER] Robot address is required")
            return NextResponse.json({error: "Robot address is required"},{status:400})
        } else {
            console.log("[ROBOT REGISTER] Robot address:", body.macAddress)
        }

        const robotAddress = body.macAddress
        const now = Date.now()
    } catch(error) {
        console.error("[ROBOT REGISTER] Error registering Robot:", error)
        return NextResponse.json({error: "Invalid JSON or server error"}, {status: 500})
    }
}