import { RobotPicoAssignment } from "./robot-pico"

export interface Robot {
  id: number
  name?: string
  macAddress: string
  lastSeen: string
  status: "offline" | "online"
  assignments?: RobotPicoAssignment[]
}

export interface RobotRegistry {
  connectedRobots: Robot[]
}
