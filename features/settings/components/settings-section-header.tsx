import type { RemixiconComponentType } from "@remixicon/react"

type SettingsSectionHeaderProps = {
  icon: RemixiconComponentType
  title: string
  description: string
}

export function SettingsSectionHeader({
  icon: Icon,
  title,
  description,
}: SettingsSectionHeaderProps) {
  return (
    <div className="flex items-center gap-3.5 border-b pb-4">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-[#701a2e]">
        <Icon className="size-5" />
      </div>
      <div>
        <h2 className="text-foreground font-serif text-lg font-bold">
          {title}
        </h2>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </div>
  )
}
