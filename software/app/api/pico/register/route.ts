import { Pico } from "@/app/types/pico";
import { NextRequest, NextResponse } from "next/server";

let connectedPicos:Map<string,Pico>=new Map()

interface PicoRegisterRequest {
    macAddress: string
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as PicoRegisterRequest

        if (!body.macAddress) {
            console.error("[PICO REGISTER] Pico address is required")
            return NextResponse.json({error: "Pico address is required"},{status:400})
        } else {
            console.log("[PICO REGISTER] Pico address:", body.macAddress)
        }

        const picoAddress = body.macAddress
        const now = Date.now()
        return NextResponse.json({text: "Pico has been registered with the server :) new test"}, {status:200})
    } catch(error) {
        console.error("[PICO REGISTER] Error registering Pico:", error)
        return NextResponse.json({error: "Invalid JSON or server error"}, {status: 500})
    }
}