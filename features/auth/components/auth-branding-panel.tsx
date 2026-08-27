import Image from "next/image"
import {
  RiCheckLine,
  RiLockPasswordLine,
  RiShieldCheckLine,
  RiSparklingLine,
} from "@remixicon/react"

const BADGES = [
  { icon: RiShieldCheckLine, label: "Verified officials" },
  { icon: RiLockPasswordLine, label: "Encrypted at rest" },
  { icon: RiSparklingLine, label: "Full audit trail" },
]

/** Left-hand marketing panel shared by the sign-in and 2FA screens. */
export function AuthBrandingPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#420b17] via-[#631427] to-[#2c060f] p-10 text-white lg:flex lg:p-14">
      <div className="pointer-events-none absolute -top-20 -left-20 size-96 rounded-full bg-rose-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 size-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-2 ring-amber-400/50">
          <Image
            src="/egbeda_seal.jpg"
            alt="Egbeda LG Seal"
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-amber-300 uppercase">
            <span>Oyo State</span>
            <span>•</span>
            <span>Nigeria</span>
          </div>
          <h2 className="font-serif text-lg font-bold tracking-tight text-white">
            Egbeda Local Government
          </h2>
        </div>
      </div>

      <div className="relative z-10 my-auto max-w-lg space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-amber-200 uppercase backdrop-blur-md">
          Admin Console
        </div>
        <h1 className="font-serif text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl">
          Serving citizens with integrity, transparency and dedicated public
          service.
        </h1>
        <p className="text-base leading-relaxed text-rose-100/80">
          Manage news, projects, services and governance content all in one
          secure, official workspace.
        </p>

        <div className="grid grid-cols-3 gap-3 pt-4">
          {BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/10 p-3.5 backdrop-blur-md transition hover:bg-white/15"
            >
              <Icon className="size-5 text-amber-300" />
              <span className="text-xs font-medium text-rose-100">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-2 text-xs text-rose-200/70">
        <RiCheckLine className="size-4 text-amber-300" />
        <span>Restricted to invited government staff only.</span>
      </div>
    </div>
  )
}
