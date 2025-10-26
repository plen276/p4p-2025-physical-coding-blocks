import { Assignment } from "./assignment"

export interface Pico {
  id: number
  name?: string
  macAddress: string
  lastSeen: Date
  status: "online" | "offline"
  assignments?: Assignment[]
}
