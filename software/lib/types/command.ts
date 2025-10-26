export interface Command {
  id: number
  macAddress: string
  data: string[]
  read: boolean
  createdAt: Date
}
