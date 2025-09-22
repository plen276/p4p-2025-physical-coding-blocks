"use client"

import { Pico } from "@/lib/types/pico"

interface PicoListProps {
  connectedPicos: Pico[]
  totalPicos: number
}

export default function PicoList({ connectedPicos, totalPicos }: PicoListProps) {
  const getPicoStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "offline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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

  return (
    <div className="mb-8 rounded-lg bg-white shadow">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-medium text-gray-900">Connected Picos</h2>
        <p className="text-sm text-gray-500">Pico W devices that have sent commands</p>
      </div>
      <div className="p-6">
        {totalPicos === 0 ? (
          <div className="py-8 text-center text-gray-500">No Picos connected yet</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {connectedPicos.map((pico) => (
              <div key={pico.macAddress} className="rounded-lg border border-gray-200 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="truncate font-medium text-gray-900" title={pico.macAddress}>
                    {pico.macAddress}
                  </h3>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getPicoStatusColor(pico.status)}`}
                  >
                    {pico.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-500">
                  <div>Commands sent: {pico.commandCount}</div>
                  <div>Last seen: {new Date(pico.lastSeen).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
