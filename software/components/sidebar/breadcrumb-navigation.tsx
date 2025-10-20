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

export function BreadcrumbNavigation() {
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
  )
}
