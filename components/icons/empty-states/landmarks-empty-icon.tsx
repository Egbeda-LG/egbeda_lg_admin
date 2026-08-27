import * as React from "react"

export function LandmarksEmptyIcon(props: React.SVGProps<SVGSVGElement>) {
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
          id="lm-bg-glow"
          x1="80"
          y1="20"
          x2="80"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f59e0b" stopOpacity="0.15" />
          <stop offset="1" stopColor="#701a2e" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient
          id="lm-pin-grad"
          x1="85"
          y1="24"
          x2="135"
          y2="76"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" />
          <stop offset="1" stopColor="#991b34" />
        </linearGradient>
        <linearGradient
          id="lm-sun"
          x1="80"
          y1="44"
          x2="80"
          y2="68"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <filter
          id="lm-shadow"
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
            floodOpacity="0.14"
          />
        </filter>
      </defs>

      {/* Ambient background glow and rings */}
      <circle cx="80" cy="80" r="64" fill="url(#lm-bg-glow)" />
      <circle
        cx="80"
        cy="80"
        r="54"
        stroke="#f59e0b"
        strokeWidth="1"
        strokeDasharray="4 4"
        strokeOpacity="0.35"
      />

      {/* Decorative stars */}
      <circle cx="34" cy="46" r="2.5" fill="#f59e0b" fillOpacity="0.6" />
      <circle cx="128" cy="114" r="2.5" fill="#701a2e" fillOpacity="0.4" />
      <circle cx="32" cy="108" r="2" fill="#10b981" fillOpacity="0.4" />

      {/* Scenic Cultural Landmark Card */}
      <g filter="url(#lm-shadow)">
        {/* Card backdrop */}
        <rect
          x="34"
          y="44"
          width="92"
          height="76"
          rx="18"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />

        {/* Rising Golden Sun */}
        <circle cx="80" cy="62" r="14" fill="url(#lm-sun)" />

        {/* Rolling Hills / Scenic Topography */}
        <path
          d="M34 98C46 88 60 84 76 90C92 96 104 92 126 84V102C126 111.941 117.941 120 108 120H52C42.0589 120 34 111.941 34 102V98Z"
          fill="#701a2e"
          fillOpacity="0.15"
        />
        <path
          d="M34 104C48 96 66 98 82 104C98 110 112 106 126 98V102C126 111.941 117.941 120 108 120H52C42.0589 120 34 111.941 34 102V104Z"
          fill="#701a2e"
          fillOpacity="0.3"
        />

        {/* Traditional Cultural Palace Arch / Monument Gate */}
        <path
          d="M56 120V84C56 78 62 74 72 74H88C98 74 104 78 104 84V120H94V90C94 86 90 84 86 84H74C70 84 66 86 66 90V120H56Z"
          fill="#701a2e"
        />
        {/* Cultural arch crown */}
        <path d="M62 74L80 62L98 74H62Z" fill="#8c223c" />
        <circle cx="80" cy="70" r="2.5" fill="#fde047" />
      </g>

      {/* Floating GPS Landmark Beacon Pin at Top Right */}
      <g filter="url(#lm-shadow)">
        <path
          d="M112 28C103.163 28 96 35.1634 96 44C96 55.5 112 70 112 70C112 70 128 55.5 128 44C128 35.1634 120.837 28 112 28Z"
          fill="url(#lm-pin-grad)"
        />
        <circle cx="112" cy="43" r="5" fill="#ffffff" />
        <circle cx="112" cy="43" r="2.5" fill="#f59e0b" />
      </g>
    </svg>
  )
}
