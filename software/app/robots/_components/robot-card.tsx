"use client"

import { StatusBadge } from "@/components/status-badge"
import { StatusBubble } from "@/components/status-bubble"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { updateRobot } from "@/lib/database"
import { Robot } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

interface RobotCardProps {
  robot: Robot
}

export default function RobotCard({ robot }: RobotCardProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(robot.name || "")
  const router = useRouter()

  const handleSave = async () => {
    try {
      await updateRobot(robot.id, { name: name.trim() || undefined })
      toast.success("Robot name updated")

      // Refresh the page data to get updated robot list
      router.refresh()
    } catch {
      toast.error("Failed to update robot name")
      // Revert the name on error
      setName(robot.name || "")
    }
  }

  const handleEdit = useDebouncedCallback((value: string) => {
    if (value.trim() !== (robot.name || "")) {
      handleSave()
    }
  }, 500)

  const handleCardClick = () => {
    setOpen(true)
  }

  return (
    <>
      <Card
        key={robot.id}
        onClick={handleCardClick}
        className="relative transition-shadow hover:shadow-md"
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StatusBubble status={robot.status} />
              <div>
                <CardTitle className="text-lg">
                  {robot.name ? robot.name : `Unnamed Robot ${robot.id}`}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  {robot.macAddress.toUpperCase()}
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StatusBadge status={robot.status} />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Edit Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Robot Details</SheetTitle>
            <SheetDescription>View and edit robot information</SheetDescription>
          </SheetHeader>

          {/* <div className="space-y-6 py-6"> */}
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            {/* Status - Read Only */}
            <div className="grid gap-3">
              <Label>Status</Label>
              <div className="flex items-center gap-2">
                <StatusBubble status={robot.status} />
                <StatusBadge status={robot.status} />
              </div>
            </div>

            {/* Robot ID - Read Only */}
            <div className="grid gap-3">
              <Label>Robot ID</Label>
              <Input disabled value={robot.id} />
            </div>

            {/* Robot Name - Editable */}
            <div className="grid gap-3">
              <Label htmlFor="robot-name">Robot Name</Label>
              <Input
                id="robot-name"
                value={name}
                placeholder={`Unnamed Robot ${robot.id}`}
                onChange={(e) => {
                  setName(e.target.value)
                  handleEdit(e.target.value)
                }}
              />
            </div>

            {/* MAC Address - Read Only */}
            <div className="grid gap-3">
              <Label>MAC Address</Label>
              <Input disabled className="font-mono" value={robot.macAddress.toUpperCase()} />
            </div>

            {/* Last Seen - Read Only */}
            <div className="grid gap-3">
              <Label>Last Seen</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Input disabled value={robot.lastSeen.toLocaleString("en-UK")} />
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{formatDistanceToNow(robot.lastSeen, { addSuffix: true })}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Assignments Count - Read Only */}
            <div className="space-y-2">
              <Label>Active Assignments</Label>
              <Input
                disabled
                value={`${robot.assignments?.filter((a) => a.isActive).length || 0} assignment(s)`}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
