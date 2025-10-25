"use client"

import { QRCodeSVG } from "qrcode.react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

interface QRCodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function QRCodeDialog({ open, onOpenChange }: QRCodeDialogProps) {
  const wifiPayload = "WIFI:T:WPA;S:NaoBlocks;P:letmein1;;" // Replace with actual SSID and Password if needed
  const navUrl = "http://192.168.0.201"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan to explore the interface</DialogTitle>
        </DialogHeader>

        <div className="grid justify-center gap-5 md:grid-cols-2 md:gap-10">
          <div className="flex flex-col items-center">
            <span className="mb-2 text-base font-semibold">Step 1</span>
            <QRCodeSVG value={wifiPayload} size={192} className="border-6 border-primary p-1" />
            <span className="mt-2 text-sm">Connect to Wi‑Fi</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="mb-2 text-base font-semibold">Step 2</span>
            <QRCodeSVG value={navUrl} size={192} className="border-6 border-primary p-1" />
            <span className="mt-2 text-sm">Open interface</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
