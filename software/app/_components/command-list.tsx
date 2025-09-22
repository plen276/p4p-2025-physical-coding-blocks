"use client"

export default function CommandList() {
  return (
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
  )
}
