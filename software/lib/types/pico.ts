export interface Pico {
  address: string
  lastSeen: number
  status: "online" | "offline"
  commandCount: number
}
