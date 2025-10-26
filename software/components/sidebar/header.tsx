"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { Separator } from "../ui/separator"
import { SidebarTrigger } from "../ui/sidebar"

// Optional titles for known routes; falls back to humanized segments
const TITLE_MAP: Record<string, string> = {
  assignments: "Assignments",
  robots: "Robots",
  picos: "Picos",
  commands: "Command Queue",
}

function humanizeSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function SidebarHeader() {
  const pathname = usePathname()

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((s) => decodeURIComponent(s))

  // Build cumulative hrefs for each segment
  const crumbs = segments.map((segment, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/")
    const key = segment.toLowerCase()
    const title = TITLE_MAP[key] ?? humanizeSegment(segment)
    return { href, title }
  })

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {crumbs.length > 0 && <BreadcrumbSeparator />}
            {crumbs.map((crumb, idx) => {
              const isLast = idx === crumbs.length - 1
              return (
                <BreadcrumbItem key={crumb.href}>
                  {isLast ? (
                    <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
                  )}
                  {!isLast && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
