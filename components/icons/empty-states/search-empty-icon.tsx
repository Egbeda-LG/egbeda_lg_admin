import * as React from "react"

export function SearchEmptyIcon(props: React.SVGProps<SVGSVGElement>) {
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
          id="srch-bg-glow"
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
          id="srch-glass"
          x1="45"
          y1="35"
          x2="105"
          y2="95"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" />
          <stop offset="1" stopColor="#450d1b" />
        </linearGradient>
        <filter
          id="srch-shadow"
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

      {/* Ambient background glow & circles */}
      <circle cx="80" cy="80" r="64" fill="url(#srch-bg-glow)" />
      <circle
        cx="80"
        cy="80"
        r="54"
        stroke="#701a2e"
        strokeWidth="1"
        strokeDasharray="3 4"
        strokeOpacity="0.25"
      />

      {/* Subtle background folder/document outline */}
      <rect
        x="36"
        y="46"
        width="88"
        height="74"
        rx="14"
        className="fill-card stroke-border"
        strokeWidth="1.5"
      />
      <rect
        x="48"
        y="58"
        width="36"
        height="4"
        rx="2"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <rect
        x="48"
        y="68"
        width="56"
        height="3"
        rx="1.5"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <rect
        x="48"
        y="76"
        width="44"
        height="3"
        rx="1.5"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <rect
        x="48"
        y="84"
        width="50"
        height="3"
        rx="1.5"
        fill="currentColor"
        fillOpacity="0.1"
      />

      {/* Floating Magnifying Glass Finder */}
      <g filter="url(#srch-shadow)">
        {/* Glass lens outer ring */}
        <circle cx="84" cy="74" r="28" fill="url(#srch-glass)" />
        {/* Glass lens inner clear viewport */}
        <circle cx="84" cy="74" r="21" fill="#ffffff" fillOpacity="0.95" />

        {/* Search sparkle / question mark inside glass */}
        <circle cx="84" cy="71" r="9" fill="#701a2e" fillOpacity="0.1" />
        <path
          d="M80.5 68C80.5 65.5 82 64 84 64C86 64 87.5 65.5 87.5 67.5C87.5 69.5 85.5 71 84 72V74"
          stroke="#701a2e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="84" cy="78" r="1.25" fill="#701a2e" />

        {/* Magnifying Glass Handle */}
        <path
          d="M104 94L124 114"
          stroke="#701a2e"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M104 94L124 114"
          stroke="#f59e0b"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Decorative stars */}
      <circle cx="34" cy="46" r="2.5" fill="#f59e0b" fillOpacity="0.6" />
      <circle cx="34" cy="112" r="2" fill="#10b981" fillOpacity="0.5" />
    </svg>
  )
}
