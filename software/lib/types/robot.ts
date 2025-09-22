export interface Robot {
  macAddress: string
  lastSeen: number
  status: "offline" | "online"
}

export interface RobotRegistry {
  connectedRobots: Robot[]
  totalRobots: number
}
