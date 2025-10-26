"use client"

import { Table } from "@/components/ui/table"
import { Assignment, Pico, Robot } from "@/lib/types"
import AssignmentTableBody from "./assignment-table-body"
import AssignmentTableHeader from "./assignment-table-header"

interface AssignmentTableProps {
  picos: Pico[]
  robots: Robot[]
  assignments: Assignment[]
  handleAssignment: (robotId: number, picoId: number | null) => void
}

export default function AssignmentTable({
  picos,
  robots,
  assignments,
  handleAssignment,
}: AssignmentTableProps) {
  return (
    <Table>
      <AssignmentTableHeader />
      <AssignmentTableBody
        picos={picos}
        robots={robots}
        assignments={assignments}
        handleAssignment={handleAssignment}
      />
    </Table>
  )
  // return(<DataTable columns={columns} data = {})
}
