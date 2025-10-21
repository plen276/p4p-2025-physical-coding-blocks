"use client"

import { Table } from "@/components/ui/table"
import { Assignment, Pico, Robot } from "@/lib/types"
import AssignmentTableBody from "./assignment-table-body"
import AssignmentTableHeader from "./assignment-table-header"

interface AssignmentTableProps {
  picos: Pico[]
  filteredRobots: Robot[]
  assignments: Assignment[]
  handleAssignment: (robotId: number, picoId: number | null) => void
}

export default function AssignmentTable({
  picos,
  filteredRobots,
  assignments,
  handleAssignment,
}: AssignmentTableProps) {
  return (
    <Table>
      <AssignmentTableHeader />
      <AssignmentTableBody
        picos={picos}
        filteredRobots={filteredRobots}
        assignments={assignments}
        handleAssignment={handleAssignment}
      />
    </Table>
  )
}
