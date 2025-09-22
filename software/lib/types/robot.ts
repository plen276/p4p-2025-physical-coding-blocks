export interface Robot {
    address: string
    lastSeen: number
    status: "offline" | "online"
}