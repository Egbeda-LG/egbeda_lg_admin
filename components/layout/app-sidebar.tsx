"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  RiArticleLine,
  RiBuilding4Line,
  RiChat3Line,
  RiCompass3Line,
  RiDashboardLine,
  RiGovernmentLine,
  RiGroupLine,
  RiHammerLine,
  RiLogoutBoxRLine,
  RiServiceLine,
  RiSettings3Line,
  RiUser3Line,
  RiUserSharedLine,
} from "@remixicon/react"

import { useAuth } from "@/lib/auth/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog"

const navOverview = [{ href: "/", label: "Dashboard", icon: RiDashboardLine }]

const navContent = [
  { href: "/newsroom", label: "News & Articles", icon: RiArticleLine },
  { href: "/projects", label: "Projects", icon: RiHammerLine },
  { href: "/services", label: "Services", icon: RiServiceLine },
  { href: "/landmarks", label: "Landmarks & Culture", icon: RiCompass3Line },
]

const navGovernance = [
  { href: "/department", label: "Department", icon: RiBuilding4Line },
  { href: "/executive", label: "Executive Officials", icon: RiGovernmentLine },
  { href: "/management", label: "Management", icon: RiGroupLine },
  { href: "/nulge", label: "NULGE", icon: RiUserSharedLine },
]

const navTeam = [
  { href: "/messages", label: "Messages", icon: RiChat3Line, badge: "4" },
  { href: "/settings", label: "Settings", icon: RiSettings3Line },
  { href: "/profile", label: "My Profile", icon: RiUser3Line },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isLogoutOpen, setIsLogoutOpen] = React.useState(false)
  const [isSigningOut, setIsSigningOut] = React.useState(false)

  const handleLogout = async () => {
    setIsSigningOut(true)

    try {
      await logout()
    } finally {
      setIsSigningOut(false)
      setIsLogoutOpen(false)
    }
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <Sidebar className="border-r-0 bg-[#5c1424] text-white">
      {/* Sidebar Header: Official Seal & Branding */}
      <SidebarHeader className="h-20 flex-row items-center gap-3 bg-[#5c1424] px-6">
        <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 shadow-md ring-2 ring-amber-400/50">
          <img
            src="/egbeda_logo.png"
            alt="Egbeda Local Government logo"
            className="size-full object-contain"
          />
        </div>
        <div className="min-w-0">
          <p className="font-serif text-[10px] font-bold tracking-widest text-amber-300 uppercase">
            ADMIN CONSOLE
          </p>
          <h2 className="truncate font-serif text-lg font-bold tracking-tight text-white">
            Egbeda LG
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-1 bg-[#5c1424] px-3">
        {/* OVERVIEW */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 font-serif text-[10px] font-bold tracking-widest text-rose-200/80 uppercase">
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navOverview.map((item) => {
                const active = isActive(item.href)
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      className={`h-10 rounded-lg px-3 transition-colors ${
                        active
                          ? "bg-[#d99b00] font-semibold text-[#2c060f] hover:bg-[#e5a900] hover:text-[#2c060f]"
                          : "text-rose-100/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex w-full items-center gap-3"
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="text-xs">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* CONTENT */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 font-serif text-[10px] font-bold tracking-widest text-rose-200/80 uppercase">
            Content
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navContent.map((item) => {
                const active = isActive(item.href)
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      className={`h-10 rounded-lg px-3 transition-colors ${
                        active
                          ? "bg-[#d99b00] font-semibold text-[#2c060f] hover:bg-[#e5a900] hover:text-[#2c060f]"
                          : "text-rose-100/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex w-full items-center gap-3"
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="text-xs">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* GOVERNANCE */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 font-serif text-[10px] font-bold tracking-widest text-rose-200/80 uppercase">
            Governance
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navGovernance.map((item) => {
                const active = isActive(item.href)
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      className={`h-10 rounded-lg px-3 transition-colors ${
                        active
                          ? "bg-[#d99b00] font-semibold text-[#2c060f] hover:bg-[#e5a900] hover:text-[#2c060f]"
                          : "text-rose-100/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex w-full items-center gap-3"
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="text-xs">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* TEAM & SETTINGS */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 font-serif text-[10px] font-bold tracking-widest text-rose-200/80 uppercase">
            Team & Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navTeam.map((item) => {
                const active = isActive(item.href)
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      className={`h-10 rounded-lg px-3 transition-colors ${
                        active
                          ? "bg-[#d99b00] font-semibold text-[#2c060f] hover:bg-[#e5a900] hover:text-[#2c060f]"
                          : "text-rose-100/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex w-full items-center gap-3"
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="text-xs">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge className="flex size-5 items-center justify-center rounded-full bg-amber-400 p-0 text-[10px] font-bold text-[#420b17]">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer: Logged-in Profile Card */}
      <SidebarFooter className="bg-[#5c1424] p-4">
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white font-serif text-xs font-bold text-[#5c1424]">
              AD
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs leading-tight font-semibold text-white">
                {user?.name ?? "Segun Oladapo"}
              </p>
              <p className="truncate text-[10px] leading-tight text-rose-200/70">
                {user?.email ?? "segunoladapo@admin.org"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLogoutOpen(true)}
            title="Sign out"
            className="flex size-7 shrink-0 items-center justify-center rounded-lg text-rose-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RiLogoutBoxRLine className="size-4" />
          </button>
        </div>
      </SidebarFooter>

      <ConfirmDeleteDialog
        open={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
        tone="neutral"
        icon={<RiLogoutBoxRLine className="size-7" />}
        title="Sign out?"
        description="You will be returned to the sign-in page and any unsaved changes will be lost."
        confirmLabel={isSigningOut ? "Signing out..." : "Sign out"}
        cancelLabel="Stay signed in"
        disabled={isSigningOut}
        onConfirm={handleLogout}
      />
    </Sidebar>
  )
}
