"use client"

import { Pico } from "@/lib/types/pico";
import { Robot } from "@/lib/types/robot";
import { useEffect, useState } from "react";

export default function Home() {
  // const [queueStatus, setQueueStatus] = useState<QueueStatus | null>(null);
  // const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectedPicos, setConnectedPicos] = useState<Pico[]>([]);
  const [connectedRobots, setConnectedRobots] = useState<Robot[]>([]);

  const fetchQueueData = async () => {
    try {
      const [picoRes, robotRes] = await Promise.all([
        fetch('/api/pico/register'),
        fetch('/api/robot/register')
      ]);
      
      // const statusData = await statusRes.json();
      // const commandsData = await commandsRes.json();
      
      // if (statusData.success) {
      //   setQueueStatus(statusData.status);
      // }
      
      // if (commandsData.queueLength !== undefined) {
      //   setCommands(commandsData.commands || []);
      // }
    } catch (error) {
      console.error("Error fetching queue data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQueueData()
    const interval = setInterval(fetchQueueData, 2000) // Poll every 2 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Pico W & mBot2 Command Queue Dashboard
        </h1>

        {/* Queue Status Cards */}
        {/* {queueStatus && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Commands</h3>
              <p className="text-2xl font-bold text-gray-900">{queueStatus.total}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">{queueStatus.pending}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-gray-500">Processing</h3>
              <p className="text-2xl font-bold text-blue-600">{queueStatus.processing}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <p className="text-2xl font-bold text-green-600">{queueStatus.completed}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-gray-500">Failed</h3>
              <p className="text-2xl font-bold text-red-600">{queueStatus.failed}</p>
            </div>
          </div>
        )} */}

        {/* Connected Picos */}
        <div className="mb-8 rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">Connected Picos</h2>
            <p className="text-sm text-gray-500">Pico W devices that have sent commands</p>
          </div>
          <div className="p-6">
            {connectedPicos.length === 0 ? (
              <div className="py-8 text-center text-gray-500">No Picos connected yet</div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {connectedPicos.map((pico) => (
                  <div key={pico.address} className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="truncate font-medium text-gray-900" title={pico.address}>
                        {pico.address}
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

        {/* Connected Robots */}
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
                  <div key={robot.address} className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="truncate font-medium text-gray-900" title={robot.address}>
                        {robot.address}
                      </h3>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getPicoStatusColor(robot.status)}`}
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

        {/* Commands List */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">Command Queue</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Pico Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Timestamp
                  </th>
                </tr>
              </thead>
              {/* <tbody className="bg-white divide-y divide-gray-200">
                {commands.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No commands in queue
                    </td>
                  </tr>
                ) : (
                  commands.map((command) => (
                    <tr key={command.id}>
                      <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-gray-900">
                        {command.id}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                        {command.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(command.status)}`}
                        >
                          {command.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                        {command.picoAddress || "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <pre className="rounded bg-gray-100 p-2 text-xs">
                          {JSON.stringify(command.data, null, 2)}
                        </pre>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {new Date(command.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody> */}
            </table>
          </div>
        </div>

        {/* API Documentation */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-gray-900">API Endpoints</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Pico W (Register)</h3>
              <code className="mt-1 block rounded bg-gray-100 p-2 text-sm text-gray-500">
                POST /api/pico/register
              </code>
              <p className="mt-1 text-sm text-gray-600">
                Register a Pico W device with its address
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Get Connected Picos</h3>
              <code className="mt-1 block rounded bg-gray-100 p-2 text-sm text-gray-500">
                GET /api/pico/register
              </code>
              <p className="mt-1 text-sm text-gray-600">
                Get list of all registered Pico W devices
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Pico W (Send Commands)</h3>
              <code className="mt-1 block rounded bg-gray-100 p-2 text-sm text-gray-500">
                POST /api/pico
              </code>
              <p className="mt-1 text-sm text-gray-600">
                Send commands from Pico W to be queued for the robot. Include picoAddress in body or
                x-pico-address header.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">mBot2 (Poll Commands)</h3>
              <code className="mt-1 block rounded bg-gray-100 p-2 text-sm text-gray-500">
                GET /api/robot?action=get&robotId=default
              </code>
              <p className="mt-1 text-sm text-gray-600">Robot polls for next command in queue</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">mBot2 (Complete Command)</h3>
              <code className="mt-1 block rounded bg-gray-100 p-2 text-sm text-gray-500">
                GET /api/robot?action=complete&commandId=cmd_123
              </code>
              <p className="mt-1 text-sm text-gray-600">Mark command as completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
