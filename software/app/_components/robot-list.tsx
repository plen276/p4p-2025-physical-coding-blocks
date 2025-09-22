"use client"

import { Robot } from "@/lib/types/robot"

interface RobotListProps {
  connectedRobots: Robot[]
}

export default function RobotList({ connectedRobots }: RobotListProps) {
  const getRobotStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "offline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="mb-8 rounded-lg bg-white shadow">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-medium text-gray-900">Connected Robots</h2>
        <p className="text-sm text-gray-500">Robots that have sent commands</p>
      </div>
      <div className="p-6">
        {connectedRobots.length === 0 ? (
          <div className="py-8 text-center text-gray-500">No Robots connected yet</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {connectedRobots.map((robot) => (
              <div key={robot.macAddress} className="rounded-lg border border-gray-200 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="truncate font-medium text-gray-900" title={robot.macAddress}>
                    {robot.macAddress}
                  </h3>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getRobotStatusColor(robot.status)}`}
                  >
                    {robot.status}
                  </span>
                </div>
                {/* <div className="space-y-1 text-sm text-gray-500">
                      <div>Commands sent: {robot.commandCount || 0}</div>
                      <div>Last seen: {new Date(robot.lastSeen).toLocaleString()}</div>
                    </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
