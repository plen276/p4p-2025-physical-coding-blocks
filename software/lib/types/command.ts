export interface Command {
  id: string
  type: string
  data: any
  timestamp: number
  status: "pending" | "processing" | "completed" | "failed"
  picoAddress?: string
}

export interface CommandResponse {
  success: boolean
  commandId?: string
  queueLength?: number
  hasCommand?: boolean
  command?: {
    id: string
    type: string
    data: any
  }
  message?: string
  error?: string
}

export interface QueueStatus {
  total: number
  pending: number
  processing: number
  completed: number
  failed: number
}

export interface StatusResponse {
  success: boolean
  status: QueueStatus
}

// Common command types for Pico W and mBot2
export const COMMAND_TYPES = {
  // Movement commands
  MOVE_FORWARD: "move_forward",
  MOVE_BACKWARD: "move_backward",
  TURN_LEFT: "turn_left",
  TURN_RIGHT: "turn_right",
  STOP: "stop",

  // LED commands
  LED_ON: "led_on",
  LED_OFF: "led_off",
  LED_BLINK: "led_blink",
  LED_COLOR: "led_color",

  // Sensor commands
  READ_SENSORS: "read_sensors",
  READ_DISTANCE: "read_distance",
  READ_LINE_SENSORS: "read_line_sensors",

  // Custom commands
  CUSTOM: "custom",
} as const

export type CommandType = (typeof COMMAND_TYPES)[keyof typeof COMMAND_TYPES]
