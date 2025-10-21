import { Assignment } from "./assignment"

export interface Pico {
  id: number
  name?: string
  macAddress: string
  lastSeen: string
  status: "online" | "offline"
  assignments?: Assignment[]
}

export interface PicoRegistry {
  connectedPicos: Pico[]
}
