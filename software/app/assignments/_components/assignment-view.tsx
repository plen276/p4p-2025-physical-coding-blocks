"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { setAssignment } from "@/lib/database"
import { Assignment, Pico, Robot } from "@/lib/types"
import { Search } from "lucide-react"
import { useState } from "react"
import AssignmentTable from "./assignment-table"

interface AssignmentViewProps {
  robots: Robot[]
  picos: Pico[]
  assignments: Assignment[]
  onAssignment: () => void
}

export default function AssignmentView({
  robots,
  picos,
  assignments,
  onAssignment,
}: AssignmentViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

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
      onAssignment()
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
            robots={filteredRobots}
            assignments={assignments}
            handleAssignment={handleAssignment}
          />
        </CardContent>
      </Card>
    </div>
  )
}
