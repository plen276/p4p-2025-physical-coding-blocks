"use client"

import { ArrowDown, ArrowUp, RotateCw } from "lucide-react"
import { useEffect, useState } from "react"

const Command = ({ commandString }: { commandString: string }) => {
  const commandType = commandString[0]
  const count = commandString.length

  let icon = null
  let label = ""
  let extra: string | null = null

  if (commandType === "A") {
    icon = <ArrowUp className="h-8 w-8" />
    label = "Forwards"
    extra = count > 1 ? `${count} times` : "1 time"
  } else if (commandType === "B") {
    icon = <ArrowDown className="h-8 w-8" />
    label = "Backwards"
    extra = count > 1 ? `${count} times` : "1 time"
  } else if (commandType === "D") {
    icon = <RotateCw className="h-8 w-8" />
    label = "Turn Right"
    extra = `${count * 90}°`
  }

  return (
    <div className="flex flex-col items-center">
      {icon}
      {extra && <span className="font-mono text-sm text-muted-foreground">{extra}</span>}
      {/* {commandType !== "D" && count > 0 && (
          <Badge className="absolute -top-2 -right-2 rounded-full px-1 font-mono tabular-nums">
            {count}
          </Badge>
        )} */}
      <span className="mt-1 text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

export default function LiveCommandFeed({ macAddress }: { macAddress: string }) {
  const [commands, setCommands] = useState<string[]>([])

  useEffect(() => {
    const fetchCommands = async () => {
      const res = await fetch(`/api/pico/live?macAddress=${macAddress}`)
      const data = await res.json()
      setCommands(data.commands)
    }

    const interval = setInterval(fetchCommands, 1000) // Poll every second

    return () => clearInterval(interval)
  }, [macAddress])

  return (
    <div className="flex items-center space-x-4 rounded-lg bg-muted p-4">
      {commands.map((commandString, index) => (
        <Command key={index} commandString={commandString} />
      ))}
      {commands.length === 0 && (
        <div className="w-full text-center text-muted-foreground">Waiting for commands...</div>
      )}
    </div>
  )
}
