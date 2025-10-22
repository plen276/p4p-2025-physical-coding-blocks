"use client"

import { DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { SheetContent, SheetHeader } from "@/components/ui/sheet"
import { Pico, Robot } from "@/lib/types"
import { cn } from "@/lib/utils"
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
    <SheetContent>
      <SheetHeader>
        <DialogTitle>Assign Pico to {robot.name || robot.macAddress}</DialogTitle>
      </SheetHeader>
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
        className="scrollbar-hidden overflow-y-auto p-5"
      >
        {allPicos.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">No Picos available</div>
        ) : (
          <>
            <div className="flex items-center space-x-2 align-middle">
              <RadioGroupItem id="unassigned" value="unassigned" />
              <Label htmlFor="unassigned" className="w-full">
                Unassigned
              </Label>
            </div>
            {allPicos.map((pico) => {
              const isDisabled = disabledPicoIds.includes(pico.id)
              return (
                <div key={pico.id}>
                  <Separator />
                  <div
                    className={cn(
                      "flex items-center justify-start gap-2 pt-3 align-middle",
                      isDisabled ? "opacity-50" : "opacity-100"
                    )}
                  >
                    <RadioGroupItem
                      id={pico.macAddress}
                      value={pico.macAddress}
                      disabled={isDisabled}
                    />
                    {/* Radio Button Label */}
                    <Label
                      htmlFor={pico.macAddress}
                      className={cn(
                        "flex w-full flex-col items-start gap-1",
                        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                      )}
                    >
                      <span>{pico.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {pico.macAddress.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Last seen {formatDistanceToNow(pico.lastSeen, { addSuffix: true })}
                      </span>
                    </Label>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </RadioGroup>
    </SheetContent>
  )
}
