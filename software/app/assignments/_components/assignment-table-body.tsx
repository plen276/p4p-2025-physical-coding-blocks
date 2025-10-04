"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Pico } from "@/lib/types/pico"
import { Robot } from "@/lib/types/robot"
import { RobotPicoAssignment } from "@/lib/types/robot-pico"
import { formatDistanceToNow } from "date-fns"
import { Link, Unlink, XIcon } from "lucide-react"
import AssignmentDialog from "./assignment-dialog"

interface AssignmentTableBodyProps {
  picos: Pico[]
  filteredRobots: Robot[]
  assignments: RobotPicoAssignment[]
  handleAssignment: (robotId: number, picoId: number | null) => void
}

export default function AssignmentTableBody({
  picos,
  filteredRobots,
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

  const getStatusBadge = (status: string) => {
    const variants = {
      online: "default",
      offline: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>
    )
  }

  return (
    <TableBody>
      {filteredRobots.map((robot) => {
        const assignedPicos = getAssignedPicos(robot.id)
        const assignedPicoIds = getAssignedPicoIds(robot.id)

        return (
          <TableRow key={robot.macAddress}>
            {/* Robot */}
            <TableCell>
              <div>
                <div className="font-medium">{robot.name || `Robot ${robot.id}`}</div>
                <div className="text-sm text-muted-foreground">{robot.macAddress}</div>
              </div>
            </TableCell>

            {/* Robot Status */}
            <TableCell>{getStatusBadge(robot.status)}</TableCell>

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
                <TooltipTrigger>{new Date(robot.lastSeen).toLocaleString("en-UK")}</TooltipTrigger>
                <TooltipContent>
                  {formatDistanceToNow(new Date(robot.lastSeen), {
                    includeSeconds: true,
                    addSuffix: true,
                  })}
                </TooltipContent>
              </Tooltip>
            </TableCell>

            {/* Actions */}
            <TableCell className="items-center space-x-2">
              {/* Link */}

              <Dialog>
                <Tooltip>
                  <DialogTrigger asChild>
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
                  </DialogTrigger>
                  <TooltipContent>Assign to Pico</TooltipContent>
                </Tooltip>
                <AssignmentDialog
                  robot={robot}
                  allPicos={picos}
                  assignedPicos={assignedPicos}
                  disabledPicoIds={assignedPicoIds}
                  onAssign={handleAssignment}
                />
              </Dialog>

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
