import * as React from "react"

export function ServicesEmptyIcon(props: React.SVGProps<SVGSVGElement>) {
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
          id="srv-bg-glow"
          x1="80"
          y1="20"
          x2="80"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" stopOpacity="0.14" />
          <stop offset="1" stopColor="#701a2e" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient
          id="srv-header"
          x1="42"
          y1="44"
          x2="118"
          y2="68"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" />
          <stop offset="1" stopColor="#571323" />
        </linearGradient>
        <linearGradient
          id="srv-badge"
          x1="102"
          y1="26"
          x2="134"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8c223c" />
          <stop offset="1" stopColor="#571323" />
        </linearGradient>
        <filter
          id="srv-shadow"
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
      <circle cx="80" cy="80" r="64" fill="url(#srv-bg-glow)" />
      <circle
        cx="80"
        cy="80"
        r="54"
        stroke="#701a2e"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        strokeOpacity="0.25"
      />

      {/* Decorative stars */}
      <circle cx="34" cy="48" r="2.5" fill="#f59e0b" fillOpacity="0.7" />
      <circle cx="128" cy="116" r="3" fill="#701a2e" fillOpacity="0.3" />
      <circle cx="36" cy="112" r="2" fill="#f43f5e" fillOpacity="0.5" />

      {/* Main Public Services Clipboard / Certificate Card */}
      <g filter="url(#srv-shadow)">
        {/* Clipboard Top Clip */}
        <rect x="68" y="32" width="24" height="10" rx="3" fill="#701a2e" />
        <circle cx="80" cy="37" r="2" fill="#ffffff" />

        {/* Base Document / Portal Application Form */}
        <rect
          x="38"
          y="40"
          width="84"
          height="90"
          rx="16"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />

        {/* Document Header Bar */}
        <path
          d="M38 52C38 45.3726 43.3726 40 50 40H110C116.627 40 122 45.3726 122 52V58H38V52Z"
          fill="url(#srv-header)"
        />
        <circle cx="50" cy="49" r="3" fill="#fde047" />
        <rect
          x="58"
          y="47"
          width="44"
          height="4"
          rx="2"
          fill="#ffffff"
          fillOpacity="0.9"
        />

        {/* Service Item Row 1 */}
        <circle cx="52" cy="72" r="6" fill="#701a2e" fillOpacity="0.12" />
        <path
          d="M49 72L51.5 74.5L55.5 69.5"
          stroke="#701a2e"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="64"
          y="69"
          width="38"
          height="3.5"
          rx="1.75"
          fill="#701a2e"
          fillOpacity="0.8"
        />
        <rect
          x="64"
          y="75"
          width="24"
          height="2.5"
          rx="1.25"
          fill="currentColor"
          fillOpacity="0.25"
        />

        {/* Service Item Row 2 */}
        <circle cx="52" cy="90" r="6" fill="#701a2e" fillOpacity="0.12" />
        <path
          d="M49 90L51.5 92.5L55.5 87.5"
          stroke="#701a2e"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="64"
          y="87"
          width="46"
          height="3.5"
          rx="1.75"
          fill="#701a2e"
          fillOpacity="0.8"
        />
        <rect
          x="64"
          y="93"
          width="30"
          height="2.5"
          rx="1.25"
          fill="currentColor"
          fillOpacity="0.25"
        />

        {/* Service Item Row 3 */}
        <circle cx="52" cy="108" r="6" fill="#701a2e" fillOpacity="0.12" />
        <path
          d="M49 108L51.5 110.5L55.5 105.5"
          stroke="#701a2e"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="64"
          y="105"
          width="42"
          height="3.5"
          rx="1.75"
          fill="#701a2e"
          fillOpacity="0.8"
        />
        <rect
          x="64"
          y="111"
          width="20"
          height="2.5"
          rx="1.25"
          fill="currentColor"
          fillOpacity="0.25"
        />
      </g>

      {/* Floating Verified Stamp / Ribbon Shield at top right */}
      <g filter="url(#srv-shadow)">
        <circle
          cx="118"
          cy="38"
          r="14"
          fill="url(#srv-badge)"
          stroke="#fde047"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <path
          d="M113 38L116.5 41.5L123 35"
          stroke="#fde047"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
