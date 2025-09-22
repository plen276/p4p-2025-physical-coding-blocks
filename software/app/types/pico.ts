export interface Pico {
    macAddress: string
    lastSeen: number
    status: "offline" | "online"
}