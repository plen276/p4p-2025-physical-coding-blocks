"use client"

import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AssignmentTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Robot</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Assigned Pico</TableHead>
        <TableHead>Last Seen</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  )
}
