import { RobotPicoAssignment } from "./robot-pico"

export interface Pico {
  id: number
  name?: string
  macAddress: string
  lastSeen: string
  status: "online" | "offline"
  assignments?: RobotPicoAssignment[]
}

export interface PicoRegistry {
  connectedPicos: Pico[]
}
