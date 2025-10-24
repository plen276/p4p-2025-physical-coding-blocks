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
        {/* <div className="mt-4 grid gap-6 md:grid-cols-2">
          {contacts.map((contact) => (
            <Card key={contact.email}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <CardDescription>{"Team Member"}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col space-y-3">
                <div className="flex items-start gap-2">
                  <Button variant="outline" className="flex-1 justify-start bg-transparent" asChild>
                    <a href={`mailto:${contact.email}`}>
                      <Mail className="mr-2 h-4 w-4 shrink-0" />
                      <span className="truncate">{contact.email}</span>
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 bg-transparent"
                    onClick={() => handleCopy(contact.email)}
                    title="Copy email"
                  >
                    {copiedEmail === contact.email ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    {"LinkedIn Profile"}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div> */}
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
          {/* <Button variant="outline">
            <a className="flex flex-row items-center" href={`mailto:${contact.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              <span className="truncate">{contact.email}</span>
            </a>
          </Button> */}
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
          {/* <Button
            variant="outline"
            size="icon"
            className="shrink-0 bg-transparent"
            onClick={() => handleCopy(contact.email)}
            title="Copy email"
          >
            {copiedEmail === contact.email ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button> */}
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
