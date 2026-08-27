"use client"

import { RiCameraLine } from "@remixicon/react"

type ProfileIdentityCardProps = {
  avatarUrl?: string | null
  initials: string
  name: string
  subtitle: string
  onAvatarChange: (file: File) => void
}

export function ProfileIdentityCard({
  avatarUrl,
  initials,
  name,
  subtitle,
  onAvatarChange,
}: ProfileIdentityCardProps) {
  return (
    <div className="bg-card flex items-center gap-4 rounded-2xl border p-6 shadow-sm">
      <label className="group relative shrink-0 cursor-pointer">
        <div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-[#701a2e] font-serif text-lg font-bold text-white">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt="Profile Avatar"
              className="size-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div className="bg-card border-border text-foreground absolute right-0 bottom-0 flex size-5 items-center justify-center rounded-full border shadow-sm transition-transform group-hover:scale-110">
          <RiCameraLine className="text-muted-foreground size-3" />
        </div>
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) onAvatarChange(file)
          }}
        />
      </label>

      <div className="min-w-0">
        <h2 className="text-foreground truncate font-serif text-xl font-bold">
          {name}
        </h2>
        <p className="text-muted-foreground truncate text-xs">{subtitle}</p>
      </div>
    </div>
  )
}
