export interface Robot {
    macAddress: string
    lastSeen: number
    status: "offline" | "online"
}