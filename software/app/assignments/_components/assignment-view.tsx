"use client"

import { fetchAssignments, fetchPicos, fetchRobots, setAssignment } from "@/app/assignments/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pico } from "@/lib/types/pico"
import { Robot } from "@/lib/types/robot"
import { RobotPicoAssignment } from "@/lib/types/robot-pico"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import AssignmentTable from "./assignment-table"

export default function AssignmentView() {
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

  const handleAssignment = async (robotId: number, picoId: number | null) => {
    try {
      await setAssignment(robotId, picoId)
      const [assignmentsData] = await Promise.all([fetchAssignments()])
      setAssignments(assignmentsData)
    } catch (error) {
      console.error("Error updating assignment:", error)
    }
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
          <AssignmentTable
            picos={picos}
            filteredRobots={filteredRobots}
            assignments={assignments}
            handleAssignment={handleAssignment}
          />
        </CardContent>
      </Card>
    </div>
  )
}
