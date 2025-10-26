"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Assignment, Pico, Robot } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { formatDistanceToNow } from "date-fns"
import { Link, Unlink, XIcon } from "lucide-react"
import AssignmentDialog from "./assignment-dialog"

export type AssignmentTableData = {
  robot: Robot
  assignedPicos: Pico[]
  assignedPicoIds: number[]
  allPicos: Pico[]
  assignments: Assignment[]
  handleAssignment: (robotId: number, picoId: number | null) => void
}

const getStatusBadge = (status: string) => {
  const variants = {
    online: "default",
    offline: "outline",
  } as const

  return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>
}

export const columns: ColumnDef<AssignmentTableData>[] = [
  {
    accessorKey: "robot",
    header: "Robot",
    cell: ({ row }) => {
      const robot = row.original.robot
      return (
        <div>
          <div className="font-medium">{robot.name || `Robot ${robot.id}`}</div>
          <div className="text-sm text-muted-foreground">{robot.macAddress}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return getStatusBadge(row.original.robot.status)
    },
  },
  {
    accessorKey: "assignedPicos",
    header: "Assigned Picos",
    cell: ({ row }) => {
      const { assignedPicos, handleAssignment, robot } = row.original
      return (
        <div className="flex flex-wrap gap-1">
          {assignedPicos.map((pico) => (
            <Badge key={pico.id}>
              {pico.name || `Pico ${pico.id}`}
              <span
                role="button"
                tabIndex={0}
                className="ml-1 rounded-full p-1 transition-all hover:bg-destructive hover:text-sidebar-foreground"
                onClick={() => handleAssignment(robot.id, null)}
              >
                <XIcon className="h-3 w-3" />
              </span>
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "lastSeen",
    header: "Last Seen",
    cell: ({ row }) => {
      const lastSeen = row.original.robot.lastSeen
      return (
        <div className="text-sm text-muted-foreground">
          <Tooltip>
            <TooltipTrigger>{lastSeen.toLocaleString("en-UK")}</TooltipTrigger>
            <TooltipContent>
              {formatDistanceToNow(lastSeen, {
                addSuffix: true,
              })}
            </TooltipContent>
          </Tooltip>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { robot, assignedPicos, allPicos, assignedPicoIds, handleAssignment } = row.original
      return (
        <div className="flex items-center space-x-2">
          {/* Link */}
          <Sheet>
            <Tooltip>
              <SheetTrigger asChild>
                <TooltipTrigger asChild disabled={assignedPicos.length !== 0}>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={assignedPicos.length !== 0}
                    onClick={() => {}}
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
              </SheetTrigger>
              <TooltipContent>Assign to Pico</TooltipContent>
            </Tooltip>
            <AssignmentDialog
              robot={robot}
              allPicos={allPicos}
              assignedPicos={assignedPicos}
              disabledPicoIds={assignedPicoIds}
              onAssign={handleAssignment}
            />
          </Sheet>

          {/* Unlink */}
          <Tooltip>
            <TooltipTrigger disabled={assignedPicos.length === 0} asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={assignedPicos.length === 0}
                onClick={() => handleAssignment(robot.id, null)}
              >
                <Unlink className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Unassign Picos</TooltipContent>
          </Tooltip>
        </div>
      )
    },
  },
]
