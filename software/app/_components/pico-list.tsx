"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pico } from "@/lib/types/pico"
import { formatDistanceToNow } from "date-fns"
import { Cpu } from "lucide-react"

interface PicoListProps {
  connectedPicos: Pico[]
  totalPicos: number
}

export default function PicoList({ connectedPicos }: PicoListProps) {
  const total = connectedPicos.length
  const online = connectedPicos.filter((pico) => pico.status === "online").length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Pico W Controllers
          </div>
          {online} online
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <div>Status of all Pico W controllers</div>
          <div>
            of {total} total controller{total === 1 ? "" : "s"}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {connectedPicos.length === 0 ? (
          <div className="py-8 text-center text-gray-500">No Picos connected yet</div>
        ) : (
          <div className="space-y-3">
            {connectedPicos.map((pico) => (
              <div
                key={pico.macAddress}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${pico.status === "online" ? "bg-chart-3" : "bg-destructive"}`}
                  />
                  <div>
                    <p className="font-medium">{pico.macAddress}</p>
                    <p className="text-sm text-muted-foreground">
                      Last seen:{" "}
                      {formatDistanceToNow(new Date(pico.lastSeen), {
                        includeSeconds: true,
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={pico.status === "online" ? "default" : "destructive"}>
                    {pico.status}
                  </Badge>
                  {/* {pico.assignedRobot&& (
                      <p className="text-xs text-muted-foreground mt-1">Controlled by {pico.assignedRobot}</p>
                    )} */}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
