import * as React from "react"

export function ManagementEmptyIcon(props: React.SVGProps<SVGSVGElement>) {
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
          id="mgmt-bg-glow"
          x1="80"
          y1="20"
          x2="80"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" stopOpacity="0.13" />
          <stop offset="1" stopColor="#701a2e" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient
          id="mgmt-lanyard"
          x1="80"
          y1="20"
          x2="80"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" />
          <stop offset="1" stopColor="#8c223c" />
        </linearGradient>
        <linearGradient
          id="mgmt-badge-header"
          x1="42"
          y1="46"
          x2="118"
          y2="70"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" />
          <stop offset="1" stopColor="#571323" />
        </linearGradient>
        <filter
          id="mgmt-shadow"
          x="20"
          y="24"
          width="120"
          height="124"
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

      {/* Ambient background ring and grid accents */}
      <circle cx="80" cy="80" r="64" fill="url(#mgmt-bg-glow)" />
      <circle
        cx="80"
        cy="80"
        r="54"
        stroke="#701a2e"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        strokeOpacity="0.25"
      />
      <circle cx="34" cy="46" r="3" fill="#f43f5e" fillOpacity="0.4" />
      <circle cx="128" cy="52" r="2.5" fill="#f59e0b" fillOpacity="0.6" />
      <circle cx="126" cy="116" r="3" fill="#701a2e" fillOpacity="0.3" />
      <circle cx="36" cy="112" r="2.5" fill="#10b981" fillOpacity="0.4" />

      {/* Official Management ID Badge Card */}
      <g filter="url(#mgmt-shadow)">
        {/* Lanyard clip at top */}
        <path d="M74 24H86L83 38H77L74 24Z" fill="url(#mgmt-lanyard)" />
        <rect x="76" y="38" width="8" height="6" rx="2" fill="#d1d5db" />
        <circle cx="80" cy="41" r="1.5" fill="#374151" />

        {/* Badge Card Container */}
        <rect
          x="42"
          y="44"
          width="76"
          height="88"
          rx="14"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />

        {/* Badge Header Ribbon */}
        <path
          d="M42 58C42 50.268 48.268 44 56 44H104C111.732 44 118 50.268 118 58V66H42V58Z"
          fill="url(#mgmt-badge-header)"
        />
        <circle cx="80" cy="55" r="3" fill="#fde047" />

        {/* Profile Picture Placeholder Frame */}
        <circle
          cx="80"
          cy="82"
          r="14"
          fill="#701a2e"
          fillOpacity="0.1"
          stroke="#701a2e"
          strokeWidth="1.5"
        />
        <circle cx="80" cy="79" r="5" fill="#701a2e" />
        <path
          d="M71 93C71 89 74.5 87 80 87C85.5 87 89 89 89 93"
          fill="#701a2e"
        />

        {/* Management credential text lines */}
        <rect
          x="58"
          y="102"
          width="44"
          height="4"
          rx="2"
          fill="#701a2e"
          fillOpacity="0.8"
        />
        <rect
          x="66"
          y="110"
          width="28"
          height="3"
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <rect
          x="62"
          y="116"
          width="36"
          height="3"
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.15"
        />
      </g>

      {/* Floating management seal at bottom right */}
      <g filter="url(#mgmt-shadow)">
        <circle
          cx="114"
          cy="114"
          r="14"
          fill="#701a2e"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <path
          d="M108 114L112 118L120 110"
          stroke="#fde047"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
