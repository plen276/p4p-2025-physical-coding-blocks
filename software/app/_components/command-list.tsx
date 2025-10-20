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
import { parseMoveIcons } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { Terminal } from "lucide-react"
import { Commands } from "../generated/prisma"

interface CommandListProps {
  commands: Commands[]
}

export default function CommandList({ commands }: CommandListProps) {
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
                  {parseMoveIcons(JSON.parse(command.data)).map((move, index) => (
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
