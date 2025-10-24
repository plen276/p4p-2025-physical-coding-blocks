"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

interface QRCodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function QRCodeDialog({ open, onOpenChange }: QRCodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan to explore the interface</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
