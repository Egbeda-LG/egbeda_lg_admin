"use client"

type ProfileIdentityCardProps = {
  initials: string
  name: string
  subtitle: string
}

/**
 * Identity summary for the signed-in admin. The avatar is drawn from initials:
 * the API exposes no profile-update route, so there is nothing to upload a
 * picture to.
 */
export function ProfileIdentityCard({
  initials,
  name,
  subtitle,
}: ProfileIdentityCardProps) {
  return (
    <div className="bg-card flex items-center gap-4 rounded-2xl border p-6 shadow-sm">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#701a2e] font-serif text-lg font-bold text-white">
        {initials}
      </div>

      <div className="min-w-0">
        <h2 className="text-foreground truncate font-serif text-xl font-bold">
          {name}
        </h2>
        <p className="text-muted-foreground truncate text-xs">{subtitle}</p>
      </div>
    </div>
  )
}
