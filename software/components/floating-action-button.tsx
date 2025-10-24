"use client"

import { cn } from "@/lib/utils"
import { BadgeQuestionMark, QrCode, Users } from "lucide-react"
import { useState } from "react"
import ContactDialog from "./contact-dialog"
import QRCodeDialog from "./qr-code-dialog"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface FloatingActionButtonProps {
  className?: string
}

export default function FloatingActionButton({ className, ...props }: FloatingActionButtonProps) {
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="default"
            // className="h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90"
            className={cn("fixed right-6 bottom-6 z-50 h-12 w-12 rounded-full", className)}
            {...props}
          >
            <BadgeQuestionMark className="size-6" />
            <span className="sr-only">{"Open menu"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setQrDialogOpen(true)}>
            <QrCode className="mr-2 h-4 w-4" />
            {"Connect"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setContactDialogOpen(true)}>
            <Users className="mr-2 h-4 w-4" />
            {"Contact"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <Button className={cn("fixed right-6 bottom-6 z-50", className)} {...props}>
        <Menu />
      </Button> */}
      <QRCodeDialog open={qrDialogOpen} onOpenChange={setQrDialogOpen} />
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </>
  )
}
