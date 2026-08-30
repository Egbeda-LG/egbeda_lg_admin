"use client"

import * as React from "react"
import Link from "next/link"
import { RiNotification3Line, RiSearchLine } from "@remixicon/react"

import { profileInitials, roleLabel } from "@/features/auth/auth.utils"
import { useAuth } from "@/lib/auth/auth-context"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Input } from "@/components/ui/input"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-[#f8fafc]">
        {/* Customized Shadcn AppSidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top Bar Header */}
          <header className="bg-background sticky top-0 z-20 flex h-16 items-center justify-between border-b px-4 sm:px-6">
            <div className="flex max-w-xl flex-1 items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="relative w-full max-w-md">
                <RiSearchLine className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  type="search"
                  placeholder="Search articles, projects, citizens, requests..."
                  className="bg-muted/60 h-9 w-full rounded-full border-none pl-9 text-xs shadow-none focus-visible:ring-1 focus-visible:ring-[#701a2e]"
                />
              </div>
            </div>

            {/* Right Notifications & User Profile */}
            <div className="flex items-center gap-4">
              {/* A Link, not window.location: that reloaded the whole app -
                  re-running auth and refetching every query - to move one page. */}
              <Link
                href="/notifications"
                className="text-muted-foreground hover:bg-muted hover:text-foreground relative flex size-9 items-center justify-center rounded-full transition-colors"
              >
                <RiNotification3Line className="size-5" />
                <span className="ring-background absolute top-2 right-2 size-2 rounded-full bg-rose-600 ring-2" />
                <span className="sr-only">Notifications</span>
              </Link>

              <div className="flex items-center gap-2.5 border-l pl-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#701a2e] text-xs font-bold text-white">
                  {profileInitials(user?.name)}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-foreground text-xs leading-none font-bold">
                    {user?.name ?? "Administrator"}
                  </p>
                  <p className="text-muted-foreground mt-1 text-[10px] leading-none">
                    {roleLabel(user?.role)}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Dashboard / Page Body */}
          <main className="w-full min-w-0 flex-1 p-6 sm:p-8 lg:p-10">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
