"use client"

import { fetchAssignments, fetchPicos, fetchRobots, setAssignment } from "@/app/assignments/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Pico } from "@/lib/types/pico"
import { Robot } from "@/lib/types/robot"
import { RobotPicoAssignment } from "@/lib/types/robot-pico"
import { formatDistanceToNow } from "date-fns"
import { Link, Search, Unlink, XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import AssignmentDialog from "./assignment-dialog"

export default function AssignmentTable() {
  const [robots, setRobots] = useState<Robot[]>([])
  const [picos, setPicos] = useState<Pico[]>([])
  const [assignments, setAssignments] = useState<RobotPicoAssignment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const interval = setInterval(() => {
      const load = async () => {
        const [robotsData, picosData, assignmentsData] = await Promise.all([
          fetchRobots(),
          fetchPicos(),
          fetchAssignments(),
        ])
        setRobots(robotsData)
        setPicos(picosData)
        setAssignments(assignmentsData)
      }
      load()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const filteredRobots = robots.filter((robot) => {
    const matchesSearch =
      robot.macAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      robot.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || robot.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getAssignedPicos = (robotId: number): Pico[] => {
    return assignments
      .filter((assignment) => assignment.robotId === robotId && assignment.isActive)
      .flatMap((assignment) => (assignment.pico ? [assignment.pico] : []))
  }

  const getAssignedPicoIds = (robotId: number) => {
    return assignments
      .filter((assignment) => assignment.isActive && assignment.robotId !== robotId)
      .map((assignment) => assignment.picoId)
  }

  const handleAssignment = async (robotId: number, picoId: number | null) => {
    try {
      await setAssignment(robotId, picoId)
      const [assignmentsData] = await Promise.all([fetchAssignments()])
      setAssignments(assignmentsData)
    } catch (error) {
      console.error("Error updating assignment:", error)
    }
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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            placeholder="Search robots..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Robot Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Robot</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Pico</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
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
                        <TooltipTrigger>
                          {new Date(robot.lastSeen).toLocaleString("en-UK")}
                        </TooltipTrigger>
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
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
