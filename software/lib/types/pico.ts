export interface Pico {
  macAddress: string
  lastSeen: number
  status: "online" | "offline"
  commandCount: number
}

export interface PicoRegistry {
  connectedPicos: Pico[]
  totalPicos: number
}
