"use client"

import { DeviceStatus } from "@/components/device-status"
import { StatusBubble } from "@/components/status-bubble"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Robot } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { Bot } from "lucide-react"

interface RobotListProps {
  connectedRobots: Robot[]
}

export default function RobotList({ connectedRobots }: RobotListProps) {
  const total = connectedRobots.length
  const online = connectedRobots.filter((robot) => robot.status === "online").length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            mBot2 Robots
          </div>
          {online} online
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <div>Status of recently active Robots</div>
          <div>
            of {total} total robot{total === 1 ? "" : "s"}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {connectedRobots.length === 0 ? (
          <div className="py-8 text-center text-gray-500">No Robots connected yet</div>
        ) : (
          <div className="space-y-3">
            {connectedRobots
              .sort((a, b) => b.lastSeen.getTime() - a.lastSeen.getTime())
              .slice(0, 5)
              .map((robot) => (
                <div
                  key={robot.macAddress}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3 px-2">
                    <StatusBubble status={robot.status} />
                    <div>
                      <p className="text-base">
                        {robot.name ? robot.name : `Unnamed Robot ${robot.id}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {robot.macAddress.toUpperCase()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Last seen:{" "}
                        {formatDistanceToNow(robot.lastSeen, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <DeviceStatus status={robot.status} />
                    {/* {robot.assignedPico && (
                      <p className="text-xs text-muted-foreground mt-1">Controlled by {robot.assignedPico}</p>
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
