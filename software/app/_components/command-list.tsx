"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Command } from "@/lib/types/command"
import { parseMoveIcons } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { Terminal } from "lucide-react"

interface CommandListProps {
  commands: Command[]
}

export default function CommandList({ commands }: CommandListProps) {
  // const getCommandStatusColor = (status: boolean) => {
  //   switch (status) {
  //     case true:
  //       return "bg-green-100 text-green-800"
  //     case false:
  //       return "bg-gray-100 text-gray-800"
  //     default:
  //       return "bg-gray-100 text-gray-800"
  //   }
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          Recent Commands
        </CardTitle>
        <CardDescription>Latest commands sent through the system</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pico Address</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commands.map((command) => (
              <TableRow key={command.id}>
                <TableCell>{command.id}</TableCell>
                <TableCell>
                  {command.read ? (
                    <Badge variant="outline">Completed</Badge>
                  ) : (
                    <Badge variant="default">Queued</Badge>
                  )}
                </TableCell>
                <TableCell className="font-mono">{command.macAddress}</TableCell>
                <TableCell className="flex gap-1">
                  {/* {command.data.map((m, i) => (
                    <Badge key={i} variant="secondary">
                      {m} {i > 1 ? `x${i}` : ""}
                    </Badge>
                  ))} */}
                  {parseMoveIcons(command.data).map((move, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger>
                        <Badge key={index} variant="secondary">
                          {move.icon} {move.count > 1 ? `x${move.count}` : ""}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>{move.move}</TooltipContent>
                    </Tooltip>
                  ))}
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>{command.createdAt.toLocaleString("en-UK")}</TooltipTrigger>
                    <TooltipContent>
                      {formatDistanceToNow(command.createdAt, {
                        includeSeconds: true,
                        addSuffix: true,
                      })}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
