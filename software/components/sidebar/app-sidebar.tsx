"use client"

import { Bot, Cpu, Home, Link, Terminal } from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/sidebar/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ThemeSwitcher } from "../theme-switcher"

// This is sample data.
const data = {
  navMain: [
    { title: "Home", url: "/", icon: Home },
    { title: "Assignments", url: "/assignments", icon: Link },
    { title: "Robots", url: "/robots", icon: Bot },
    { title: "Picos", url: "/picos", icon: Cpu },
    { title: "Command Queue", url: "/commands", icon: Terminal },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <p className="flex h-8 shrink-0 items-center px-1 text-center text-lg font-semibold text-foreground/70 transition-[margin,opacity] duration-100 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0">
          Monitoring Dashboard
        </p>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ThemeSwitcher />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
