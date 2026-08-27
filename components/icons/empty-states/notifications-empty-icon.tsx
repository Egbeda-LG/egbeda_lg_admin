import * as React from "react"

export function NotificationsEmptyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-32"
      {...props}
    >
      <defs>
        <linearGradient
          id="notif-bg-glow"
          x1="80"
          y1="20"
          x2="80"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f43f5e" stopOpacity="0.12" />
          <stop offset="1" stopColor="#701a2e" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient
          id="notif-bell"
          x1="50"
          y1="36"
          x2="110"
          y2="108"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" />
          <stop offset="1" stopColor="#571323" />
        </linearGradient>
        <linearGradient
          id="notif-gold"
          x1="70"
          y1="104"
          x2="90"
          y2="124"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f59e0b" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <filter
          id="notif-shadow"
          x="20"
          y="24"
          width="120"
          height="120"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="6"
            floodColor="#701a2e"
            floodOpacity="0.15"
          />
        </filter>
      </defs>

      {/* Ambient background glow & circles */}
      <circle cx="80" cy="80" r="64" fill="url(#notif-bg-glow)" />
      <circle
        cx="80"
        cy="80"
        r="54"
        stroke="#f43f5e"
        strokeWidth="1"
        strokeDasharray="3 4"
        strokeOpacity="0.25"
      />

      {/* Sound / notification waves radiating out */}
      <path
        d="M44 58C36 68 36 82 44 92"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.2"
      />
      <path
        d="M34 50C22 66 22 88 34 104"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="3 3"
        strokeOpacity="0.15"
      />
      <path
        d="M116 58C124 68 124 82 116 92"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.2"
      />
      <path
        d="M126 50C138 66 138 88 126 104"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="3 3"
        strokeOpacity="0.15"
      />

      {/* Floating sparkles */}
      <path
        d="M38 42L40 38L44 36L40 34L38 30L36 34L32 36L36 38L38 42Z"
        fill="#f59e0b"
        fillOpacity="0.8"
      />
      <circle cx="128" cy="116" r="2.5" fill="#701a2e" fillOpacity="0.4" />

      {/* Main Notification Bell */}
      <g filter="url(#notif-shadow)">
        {/* Bell Top Loop */}
        <path
          d="M74 38C74 34.6863 76.6863 32 80 32C83.3137 32 86 34.6863 86 38V42H74V38Z"
          fill="#701a2e"
        />

        {/* Bell Body */}
        <path
          d="M80 42C64.536 42 54 54.536 54 70V88L46 98V104H114V98L106 88V70C106 54.536 95.464 42 80 42Z"
          fill="url(#notif-bell)"
        />

        {/* Bell clapper / striker at bottom */}
        <path
          d="M72 104C72 108.418 75.5817 114 80 114C84.4183 114 88 108.418 88 104H72Z"
          fill="url(#notif-gold)"
        />

        {/* Bell shine highlight */}
        <path
          d="M62 70C62 58 68 50 78 46"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.35"
        />

        {/* Peaceful / All caught up checkmark inside bell */}
        <circle cx="80" cy="74" r="10" fill="#ffffff" fillOpacity="0.15" />
        <path
          d="M75 74L78 77L85 70"
          stroke="#fde047"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Quiet / Zzz badge indicator at top right */}
      <g filter="url(#notif-shadow)">
        <circle cx="118" cy="38" r="14" fill="#10b981" />
        <path
          d="M113 38L116 41L123 34"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
