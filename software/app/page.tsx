'use client';

import { useEffect, useState } from 'react';
import { Command, QueueStatus } from './types/command';

export default function Home() {
  const [queueStatus, setQueueStatus] = useState<QueueStatus | null>(null);
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQueueData = async () => {
    try {
      const [statusRes, commandsRes] = await Promise.all([
        fetch('/api/robot?action=status'),
        fetch('/api/pico')
      ]);
      
      const statusData = await statusRes.json();
      const commandsData = await commandsRes.json();
      
      if (statusData.success) {
        setQueueStatus(statusData.status);
      }
      
      if (commandsData.queueLength !== undefined) {
        setCommands(commandsData.commands || []);
      }
    } catch (error) {
      console.error('Error fetching queue data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueData();
    const interval = setInterval(fetchQueueData, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Pico W & mBot2 Command Queue Dashboard
        </h1>
        
        {/* Queue Status Cards */}
        {queueStatus && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Commands</h3>
              <p className="text-2xl font-bold text-gray-900">{queueStatus.total}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">{queueStatus.pending}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Processing</h3>
              <p className="text-2xl font-bold text-blue-600">{queueStatus.processing}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <p className="text-2xl font-bold text-green-600">{queueStatus.completed}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Failed</h3>
              <p className="text-2xl font-bold text-red-600">{queueStatus.failed}</p>
            </div>
          </div>
        )}

        {/* Commands List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Command Queue</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {commands.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No commands in queue
                    </td>
                  </tr>
                ) : (
                  commands.map((command) => (
                    <tr key={command.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {command.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {command.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(command.status)}`}>
                          {command.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <pre className="text-xs bg-gray-100 p-2 rounded">
                          {JSON.stringify(command.data, null, 2)}
                        </pre>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(command.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* API Documentation */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">API Endpoints</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Pico W (Send Commands)</h3>
              <code className="block bg-gray-100 p-2 rounded text-sm mt-1">
                POST /api/pico
              </code>
              <p className="text-sm text-gray-600 mt-1">
                Send commands from Pico W to be queued for the robot
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">mBot2 (Poll Commands)</h3>
              <code className="block bg-gray-100 p-2 rounded text-sm mt-1">
                GET /api/robot?action=get&robotId=default
              </code>
              <p className="text-sm text-gray-600 mt-1">
                Robot polls for next command in queue
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">mBot2 (Complete Command)</h3>
              <code className="block bg-gray-100 p-2 rounded text-sm mt-1">
                GET /api/robot?action=complete&commandId=cmd_123
              </code>
              <p className="text-sm text-gray-600 mt-1">
                Mark command as completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
