"use client"

import { DeviceStatus } from "@/components/device-status"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Assignment, Pico, Robot } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { Link, Unlink, XIcon } from "lucide-react"
import AssignmentDialog from "./assignment-dialog"

interface AssignmentTableBodyProps {
  picos: Pico[]
  robots: Robot[]
  assignments: Assignment[]
  handleAssignment: (robotId: number, picoId: number | null) => void
}

export default function AssignmentTableBody({
  picos,
  robots,
  assignments,
  handleAssignment,
}: AssignmentTableBodyProps) {
  const getAssignedPicos = (robotId: number): Pico[] => {
    return assignments
      .filter((assignment) => assignment.robotId === robotId && assignment.isActive)
      .flatMap((assignment) => (assignment.pico ? [assignment.pico] : []))
  }

  const getAssignedPicoIds = (robotId: number): number[] => {
    return assignments
      .filter((assignment) => assignment.isActive && assignment.robotId !== robotId)
      .map((assignment) => assignment.picoId)
  }

  return (
    <TableBody>
      {robots.map((robot) => {
        const assignedPicos = getAssignedPicos(robot.id)
        const assignedPicoIds = getAssignedPicoIds(robot.id)

        return (
          <TableRow key={robot.macAddress}>
            {/* Robot */}
            <TableCell>
              <div>
                <div className="font-medium">{robot.name || `Robot ${robot.id}`}</div>
                <div className="text-sm text-muted-foreground">
                  {robot.macAddress.toUpperCase()}
                </div>
              </div>
            </TableCell>

            {/* Robot Status */}
            <TableCell>
              <DeviceStatus status={robot.status} />
            </TableCell>

            {/* Assigned Picos */}
            <TableCell>
              {/* Show assigned picos */}
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
            </TableCell>

            {/* Last Seen */}
            <TableCell className="text-sm text-muted-foreground">
              <Tooltip>
                <TooltipTrigger>{robot.lastSeen.toLocaleString("en-UK")}</TooltipTrigger>
                <TooltipContent>
                  {formatDistanceToNow(robot.lastSeen, {
                    addSuffix: true,
                  })}
                </TooltipContent>
              </Tooltip>
            </TableCell>

            {/* Actions */}
            <TableCell className="items-center space-x-2">
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
                  allPicos={picos}
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
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}
