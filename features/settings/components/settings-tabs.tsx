"use client"

import {
  SETTINGS_TABS,
  type SettingsTab,
} from "@/features/settings/settings.utils"
import { cn } from "@/lib/utils"

type SettingsTabsProps = {
  value: SettingsTab
  onValueChange: (tab: SettingsTab) => void
}

export function SettingsTabs({ value, onValueChange }: SettingsTabsProps) {
  return (
    <div className="bg-card flex flex-wrap items-center gap-2 rounded-2xl border p-2 shadow-sm">
      {SETTINGS_TABS.map(({ value: tab, icon: Icon }) => (
        <button
          key={tab}
          type="button"
          onClick={() => onValueChange(tab)}
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all",
            value === tab
              ? "bg-[#701a2e]/10 text-[#701a2e]"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
          )}
        >
          <Icon className="size-4" />
          <span>{tab}</span>
        </button>
      ))}
    </div>
  )
}
