"use client"

import { Check, Copy, Linkedin, Mail } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Item, ItemContent, ItemMedia } from "./ui/item"

interface Contact {
  name: string
  specialisation: string
  email: string
  linkedin: string
}

interface ContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  const contacts: Contact[] = [
    {
      name: "Mardee Bayron",
      specialisation: "Hardware",
      email: "mbay613@aucklanduni.ac.nz",
      linkedin: "https://www.linkedin.com/in/mardee-bayron/",
    },
    {
      name: "Pulasthi Lenaduwa",
      specialisation: "Firmware & Software",
      email: "plen276@aucklanduni.ac.nz",
      linkedin: "https://www.linkedin.com/in/pulasthi-lenaduwa/",
    },
  ]

  const handleCopy = async (email: string) => {
    await navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2000) // reset icon after 2s
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Who Are We?</DialogTitle>
          <DialogDescription>{"Get in touch with us"}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap justify-center gap-5">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.email}
              contact={contact}
              handleCopy={handleCopy}
              copiedEmail={copiedEmail}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ContactCardProps {
  contact: Contact
  handleCopy: (email: string) => void
  copiedEmail: string | null
}

export function ContactCard({ contact, handleCopy, copiedEmail }: ContactCardProps) {
  return (
    <Card key={contact.email} className="w-fit">
      <CardHeader>
        <CardTitle>{contact.name}</CardTitle>
        <CardDescription>{contact.specialisation}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Item variant="outline" size="sm" asChild>
            <a href={`mailto:${contact.email}`}>
              <ItemMedia>
                <Mail className="h-4 w-4" />
              </ItemMedia>
              <ItemContent>{contact.email}</ItemContent>
            </a>
          </Item>
          <Item variant="outline" size="sm" asChild>
            <a onClick={() => handleCopy(contact.email)}>
              <ItemMedia>
                {copiedEmail === contact.email ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </ItemMedia>
            </a>
          </Item>
        </div>
        <Item variant="outline" size="sm" asChild>
          <a href={contact.linkedin}>
            <ItemMedia>
              <Linkedin className="h-4 w-4" />
            </ItemMedia>
            <ItemContent>LinkedIn Profile</ItemContent>
          </a>
        </Item>
      </CardContent>
    </Card>
  )
}
