import { Pico } from "./pico"
import { Robot } from "./robot"

export interface RobotPicoAssignment {
  id: number
  robotId: number
  picoId: number
  createdAt: Date
  isActive: boolean
  robot?: Robot
  pico?: Pico
}
