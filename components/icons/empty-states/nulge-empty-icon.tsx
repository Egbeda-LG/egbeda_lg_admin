import * as React from "react"

export function NulgeEmptyIcon(props: React.SVGProps<SVGSVGElement>) {
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
          id="nulge-bg-glow"
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
          id="nulge-badge"
          x1="42"
          y1="36"
          x2="118"
          y2="124"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" />
          <stop offset="1" stopColor="#450d1b" />
        </linearGradient>
        <linearGradient
          id="nulge-gold"
          x1="60"
          y1="50"
          x2="100"
          y2="110"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <filter
          id="nulge-shadow"
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
      <circle cx="80" cy="80" r="64" fill="url(#nulge-bg-glow)" />
      <circle
        cx="80"
        cy="80"
        r="54"
        stroke="#701a2e"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        strokeOpacity="0.25"
      />

      {/* Decorative union spark dots */}
      <circle cx="34" cy="46" r="2.5" fill="#f59e0b" fillOpacity="0.7" />
      <circle cx="128" cy="114" r="3" fill="#701a2e" fillOpacity="0.3" />
      <circle cx="36" cy="112" r="2" fill="#f43f5e" fillOpacity="0.5" />

      {/* Main NULGE Union Crest Emblem */}
      <g filter="url(#nulge-shadow)">
        {/* Crest Outer Rounded Octagon / Shield */}
        <path
          d="M80 34L112 48V78C112 98 80 120 80 120C80 120 48 98 48 78V48L80 34Z"
          fill="url(#nulge-badge)"
        />
        {/* Inner Gold Inset Border */}
        <path
          d="M80 40L106 52V76C106 92 80 110 80 110C80 110 54 92 54 76V52L80 40Z"
          stroke="#fde047"
          strokeWidth="1.5"
          strokeOpacity="0.45"
        />

        {/* Industrial Union Cogwheel / Gear Center */}
        <circle
          cx="80"
          cy="74"
          r="20"
          fill="#ffffff"
          fillOpacity="0.1"
          stroke="url(#nulge-gold)"
          strokeWidth="2"
          strokeDasharray="5 3"
        />

        {/* Solidarity Handshake Silhouette */}
        {/* Left hand sleeve & palm */}
        <path d="M62 76L72 70L78 74L72 80L62 76Z" fill="#fde047" />
        {/* Right hand sleeve & clasp */}
        <path d="M98 76L88 70L82 74L88 80L98 76Z" fill="#fde047" />
        {/* Interlocked fingers */}
        <path d="M74 72L80 77L86 72L82 81L78 81L74 72Z" fill="#ffffff" />

        {/* NULGE Banner Ribbon at bottom of crest */}
        <rect
          x="60"
          y="94"
          width="40"
          height="8"
          rx="4"
          fill="#8c223c"
          stroke="#fde047"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <rect x="66" y="97" width="28" height="2" rx="1" fill="#ffffff" />
      </g>

      {/* Floating Team Unity Star at top right */}
      <g filter="url(#nulge-shadow)">
        <circle
          cx="118"
          cy="38"
          r="14"
          fill="#701a2e"
          stroke="#fde047"
          strokeWidth="1"
        />
        <path
          d="M118 30L120.5 35.5L126.5 36L122 40L123.5 46L118 43L112.5 46L114 40L109.5 36L115.5 35.5L118 30Z"
          fill="#fde047"
        />
      </g>
    </svg>
  )
}
