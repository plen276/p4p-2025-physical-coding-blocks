/**
 * Simple in-memory cache to store the latest commands from a Pico.
 * The key is the Pico's MAC address, and the value is the array of commands.
 */
const liveCommands = new Map<string, string[]>()

export const setLiveCommands = (macAddress: string, commands: string[]) => {
  liveCommands.set(macAddress, commands)
}

export const getLiveCommands = (macAddress: string) => {
  return liveCommands.get(macAddress) || []
}
