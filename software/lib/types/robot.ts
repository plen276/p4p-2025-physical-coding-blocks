import { Assignment } from "./assignment"

export interface Robot {
  id: number
  name?: string
  macAddress: string
  lastSeen: Date
  status: "offline" | "online"
  assignments?: Assignment[]
}

export interface RobotRegistry {
  connectedRobots: Robot[]
}
