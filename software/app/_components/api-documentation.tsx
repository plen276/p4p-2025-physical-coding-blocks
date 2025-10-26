"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApiDocumentation() {
  const apiList = [
    {
      title: "Pico W (Register)",
      url: "POST /api/pico/register",
      description: "Register a Pico W device with its address",
    },
    {
      title: "Get Connected Picos",
      url: "GET /api/pico/register",
      description: "Get list of all registered Pico W devices",
    },
    {
      title: "Pico W (Send Commands)",
      url: " POST /api/pico",
      description:
        "Send commands from Pico W to be queued for the robot. Include picoAddress in body or x-pico-address header.",
    },
    {
      title: "mBot2 (Poll Commands)",
      url: "GET /api/robot?action=get&robotId=default",
      description: "Robot polls for next command in queue",
    },
    {
      title: "mBot2 (Complete Command)",
      url: "GET /api/robot?action=complete&commandId=cmd_123",
      description: "Mark command as completed",
    },
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Endpoints</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {apiList.map((api, index) => {
          return (
            <div key={index}>
              <h3 className="font-medium">{api.title}</h3>
              <code className="mt-1 block rounded bg-accent p-2 text-sm text-accent-foreground">
                {api.url}
              </code>
              <p className="mt-1 text-sm text-foreground/50">{api.title}</p>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
