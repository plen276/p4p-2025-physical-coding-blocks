"use client"

import { CommandStatus } from "@/components/command-status"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { parseMoveIcons } from "@/lib/moves"
import { Command } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { formatDistanceToNow } from "date-fns"
import { ArrowDown, ArrowUp } from "lucide-react"

export const columns: ColumnDef<Command>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    // header: "ID",
    // header: () => <div className="text-center">ID</div>,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => {
      const id = parseInt(row.getValue("id"))

      return <div className="text-center">{id}</div>
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "read",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("read") as boolean

      return <CommandStatus status={status} />
    },
  },
  {
    accessorKey: "macAddress",
    header: "Pico Address",
    cell: ({ row }) => {
      const address = row.getValue("macAddress") as string

      return <div className="font-mono">{address.toUpperCase()}</div>
    },
  },
  {
    accessorKey: "data",
    header: "Data",
    cell: ({ row }) => {
      const data = row.getValue("data") as string[]

      return (
        <div className="flex gap-1">
          {parseMoveIcons(data).map((move, index) => (
            <Tooltip key={index}>
              <TooltipTrigger>
                <Badge key={index} variant="secondary">
                  {move.icon} {move.count > 1 ? `x${move.count}` : ""}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>{move.move}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    // header: "Timestamp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Timestamp
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },

    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date

      return (
        <div>
          <Tooltip>
            <TooltipTrigger>{createdAt.toLocaleString("en-UK")}</TooltipTrigger>
            <TooltipContent side="right">
              {formatDistanceToNow(createdAt, {
                addSuffix: true,
              })}
            </TooltipContent>
          </Tooltip>
        </div>
      )
    },
  },
]
