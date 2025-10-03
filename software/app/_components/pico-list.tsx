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
  // const getPicoStatusColor = (status: string) => {
  //   switch (status) {
  //     case "online":
  //       return "bg-green-100 text-green-800"
  //     case "offline":
  //       return "bg-red-100 text-red-800"
  //     default:
  //       return "bg-gray-100 text-gray-800"
  //   }
  // }

  // useEffect(() => {
  //   fetch("api/pico/register")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       connectedPicos = data.connectedPicos
  //     })
  //   // const response = await fetch("/api/hello", { cache: "no-store" })
  //   // const data = await response.json()
  //   // console.log(data)
  // }, [])

  // return (
  //   <div className="mb-8 rounded-lg bg-white shadow">
  //     <div className="border-b border-gray-200 px-6 py-4">
  //       <h2 className="text-lg font-medium text-gray-900">Connected Picos</h2>
  //       <p className="text-sm text-gray-500">Pico W devices that have sent commands</p>
  //     </div>
  //     <div className="p-6">
  //       {totalPicos === 0 ? (
  //         <div className="py-8 text-center text-gray-500">No Picos connected yet</div>
  //       ) : (
  //         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  //           {connectedPicos.map((pico) => (
  //             <div key={pico.macAddress} className="rounded-lg border border-gray-200 p-4">
  //               <div className="mb-2 flex items-center justify-between">
  //                 <h3 className="truncate font-medium text-gray-900" title={pico.macAddress}>
  //                   {pico.macAddress}
  //                 </h3>
  //                 <span
  //                   className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getPicoStatusColor(pico.status)}`}
  //                 >
  //                   {pico.status}
  //                 </span>
  //               </div>
  //               <div className="space-y-1 text-sm text-gray-500">
  //                 <div>Last seen: {new Date(pico.lastSeen).toLocaleString("en-UK")}</div>
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
