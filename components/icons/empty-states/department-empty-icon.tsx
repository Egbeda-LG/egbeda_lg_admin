import * as React from "react"

export function DepartmentEmptyIcon(props: React.SVGProps<SVGSVGElement>) {
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
          id="dept-bg-glow"
          x1="80"
          y1="20"
          x2="80"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" stopOpacity="0.12" />
          <stop offset="1" stopColor="#701a2e" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient
          id="dept-roof"
          x1="45"
          y1="36"
          x2="115"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8c223c" />
          <stop offset="1" stopColor="#571323" />
        </linearGradient>
        <linearGradient
          id="dept-badge-grad"
          x1="100"
          y1="26"
          x2="130"
          y2="54"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" />
          <stop offset="1" stopColor="#450d1b" />
        </linearGradient>
        <filter
          id="dept-shadow"
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
            floodOpacity="0.12"
          />
        </filter>
      </defs>

      {/* Ambient background ring and geometric accents */}
      <circle cx="80" cy="80" r="64" fill="url(#dept-bg-glow)" />
      <circle
        cx="80"
        cy="80"
        r="54"
        stroke="#701a2e"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        strokeOpacity="0.25"
      />
      <circle cx="34" cy="46" r="3" fill="#f43f5e" fillOpacity="0.4" />
      <circle cx="128" cy="52" r="2.5" fill="#f59e0b" fillOpacity="0.6" />
      <circle cx="124" cy="116" r="3" fill="#701a2e" fillOpacity="0.3" />
      <circle cx="38" cy="112" r="2.5" fill="#10b981" fillOpacity="0.4" />

      {/* Main Administrative Building / Ministry Card */}
      <g filter="url(#dept-shadow)">
        {/* Base card container */}
        <rect
          x="36"
          y="42"
          width="88"
          height="80"
          rx="16"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />

        {/* Building pediment roof */}
        <path d="M46 54L80 34L114 54H46Z" fill="url(#dept-roof)" />
        {/* Pediment crest emblem */}
        <circle cx="80" cy="46" r="3.5" fill="#fde047" />
        <rect x="79" y="44" width="2" height="4" rx="1" fill="#701a2e" />

        {/* Architrave beam */}
        <rect x="44" y="54" width="72" height="4" rx="1" fill="#701a2e" />

        {/* Classical pillars (Civic departments representation) */}
        <rect
          x="50"
          y="58"
          width="6"
          height="34"
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <rect
          x="66"
          y="58"
          width="6"
          height="34"
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <rect
          x="88"
          y="58"
          width="6"
          height="34"
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <rect
          x="104"
          y="58"
          width="6"
          height="34"
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.15"
        />

        {/* Pillar base plinth */}
        <rect
          x="46"
          y="92"
          width="68"
          height="4"
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.25"
        />

        {/* Ministry Central Portal / Door */}
        <path
          d="M74 92V72C74 68.6863 76.6863 66 80 66C83.3137 66 86 68.6863 86 72V92H74Z"
          fill="#701a2e"
          fillOpacity="0.9"
        />
        <circle cx="83" cy="82" r="1" fill="#fde047" />

        {/* Hierarchy tree floating badge */}
        <rect
          x="44"
          y="102"
          width="72"
          height="12"
          rx="6"
          className="fill-muted stroke-border"
          strokeWidth="1"
        />
        <circle cx="54" cy="108" r="3" fill="#701a2e" />
        <line
          x1="60"
          y1="108"
          x2="80"
          y2="108"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="92" cy="108" r="2" fill="currentColor" fillOpacity="0.4" />
        <circle cx="104" cy="108" r="2" fill="currentColor" fillOpacity="0.4" />
      </g>

      {/* Floating organizational badge at top right */}
      <g filter="url(#dept-shadow)">
        <rect
          x="102"
          y="26"
          width="30"
          height="24"
          rx="8"
          fill="url(#dept-badge-grad)"
        />
        <path
          d="M111 38L115 42L123 34"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
