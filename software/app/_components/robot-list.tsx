"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Robot } from "@/lib/types/robot"
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
          <div>Status of all Robots</div>
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
            {connectedRobots.map((robot) => (
              <div
                key={robot.macAddress}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${robot.status === "online" ? "bg-chart-3" : "bg-destructive"}`}
                  />
                  <div>
                    <p className="font-medium">{robot.macAddress}</p>
                    <p className="text-sm text-muted-foreground">
                      Last seen:{" "}
                      {formatDistanceToNow(new Date(robot.lastSeen), {
                        includeSeconds: true,
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={robot.status === "online" ? "default" : "destructive"}>
                    {robot.status}
                  </Badge>
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
