"use client"

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Pico } from "@/lib/types/pico"
import { Robot } from "@/lib/types/robot"
import { formatDistanceToNow } from "date-fns"

interface AssignmentDialogProps {
  robot: Robot
  allPicos: Pico[]
  assignedPicos: Pico[]
  disabledPicoIds?: number[]
  onAssign: (robotId: number, picoId: number | null) => void
}

export default function AssignmentDialog({
  robot,
  allPicos,
  assignedPicos,
  disabledPicoIds = [],
  onAssign,
}: AssignmentDialogProps) {
  const defaultValue = assignedPicos?.[0]?.macAddress ?? "unassigned"

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Assign Pico to {robot.name || robot.macAddress}</DialogTitle>
      </DialogHeader>
      <RadioGroup
        defaultValue={defaultValue}
        onValueChange={(value) => {
          if (value === "unassigned") {
            onAssign(robot.id, null)
            return
          }
          const selected = allPicos.find((pico) => pico.macAddress === value)
          onAssign(robot.id, selected ? selected.id : null)
        }}
      >
        {allPicos.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">No Picos available</div>
        ) : (
          <>
            <div className="flex items-center space-x-2 py-2">
              <RadioGroupItem id="unassigned" value="unassigned" />
              <Label htmlFor="unassigned">Unassigned</Label>
            </div>
            {allPicos.map((pico) => (
              <div key={pico.id}>
                <Separator />
                <div className="flex items-center justify-between py-2 opacity-100 data-[disabled=true]:opacity-50">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      id={pico.macAddress}
                      value={pico.macAddress}
                      disabled={disabledPicoIds.includes(pico.id)}
                    />
                    <Label htmlFor={pico.macAddress}>{pico.name || pico.macAddress}</Label>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last seen{" "}
                    {formatDistanceToNow(new Date(pico.lastSeen), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </RadioGroup>
    </DialogContent>
  )
}
