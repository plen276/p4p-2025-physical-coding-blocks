"use client"

export default function ApiDocumentation() {
  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-medium text-gray-900">API Endpoints</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-900">Pico W (Register)</h3>
          <code className="mt-1 block rounded bg-gray-100 p-2 text-sm text-gray-500">
            POST /api/pico/register
          </code>
          <p className="mt-1 text-sm text-gray-600">Register a Pico W device with its address</p>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Get Connected Picos</h3>
          <code className="mt-1 block rounded bg-gray-100 p-2 text-sm text-gray-500">
            GET /api/pico/register
          </code>
          <p className="mt-1 text-sm text-gray-600">Get list of all registered Pico W devices</p>
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
  )
}
