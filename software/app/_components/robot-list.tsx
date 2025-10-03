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
  // const { total, online, offline } = connectedRobots.reduce(
  //   (counts, robot) => {
  //     counts.total++
  //     if (robot.status === "online") counts.online++
  //     else counts.offline++
  //     return counts
  //   },
  //   { total: 0, online: 0, offline: 0 }
  // )
  // const totalRobots = connectedRobots.length
  // const onlineRobots = connectedRobots.filter((robot) => robot.status === "online").length

  // const getRobotStatusColor = (status: string) => {
  //   switch (status) {
  //     case "online":
  //       return "bg-green-100 text-green-800"
  //     case "offline":
  //       return "bg-red-100 text-red-800"
  //     default:
  //       return "bg-gray-100 text-gray-800"
  //   }
  // }

  // return (
  //   <div className="mb-8 rounded-lg bg-white shadow">
  //     <div className="border-b border-gray-200 px-6 py-4">
  //       <h2 className="text-lg font-medium text-gray-900">Connected Robots</h2>
  //       <p className="text-sm text-gray-500">Robots that have sent commands</p>
  //     </div>
  //     <div className="p-6">
  //       {connectedRobots.length === 0 ? (
  //         <div className="py-8 text-center text-gray-500">No Robots connected yet</div>
  //       ) : (
  //         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  //           {connectedRobots.map((robot) => (
  //             <div key={robot.macAddress} className="rounded-lg border border-gray-200 p-4">
  //               <div className="mb-2 flex items-center justify-between">
  //                 <h3 className="truncate font-medium text-gray-900" title={robot.macAddress}>
  //                   {robot.macAddress}
  //                 </h3>
  //                 <span
  //                   className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getRobotStatusColor(robot.status)}`}
  //                 >
  //                   {robot.status}
  //                 </span>
  //               </div>
  //               <div className="space-y-1 text-sm text-gray-500">
  //                 <div>Last seen: {new Date(robot.lastSeen).toLocaleString("en-UK")}</div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // )
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
