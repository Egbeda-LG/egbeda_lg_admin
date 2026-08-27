import * as React from "react"

export function MessagesEmptyIcon(props: React.SVGProps<SVGSVGElement>) {
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
          id="msg-bg-glow"
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
          id="msg-envelope"
          x1="36"
          y1="52"
          x2="124"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" />
          <stop offset="1" stopColor="#571323" />
        </linearGradient>
        <linearGradient
          id="msg-letter"
          x1="50"
          y1="36"
          x2="110"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#f3f4f6" />
        </linearGradient>
        <linearGradient
          id="msg-paperplane"
          x1="102"
          y1="28"
          x2="136"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8c223c" />
          <stop offset="1" stopColor="#571323" />
        </linearGradient>
        <filter
          id="msg-shadow"
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
      <circle cx="80" cy="80" r="64" fill="url(#msg-bg-glow)" />
      <circle
        cx="80"
        cy="80"
        r="54"
        stroke="#701a2e"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        strokeOpacity="0.25"
      />

      {/* Decorative communication sparks */}
      <circle cx="34" cy="48" r="2.5" fill="#f59e0b" fillOpacity="0.7" />
      <circle cx="128" cy="116" r="3" fill="#701a2e" fillOpacity="0.3" />
      <circle cx="36" cy="112" r="2" fill="#f43f5e" fillOpacity="0.5" />

      {/* Main Mailbox / Envelope Container */}
      <g filter="url(#msg-shadow)">
        {/* Letter paper sliding out */}
        <rect
          x="48"
          y="40"
          width="64"
          height="52"
          rx="8"
          fill="url(#msg-letter)"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        {/* Letter mock text lines */}
        <rect
          x="58"
          y="50"
          width="32"
          height="3.5"
          rx="1.5"
          fill="#701a2e"
          fillOpacity="0.7"
        />
        <rect x="58" y="58" width="44" height="3" rx="1.5" fill="#9ca3af" />
        <rect x="58" y="65" width="38" height="3" rx="1.5" fill="#d1d5db" />

        {/* Envelope back body */}
        <rect
          x="36"
          y="62"
          width="88"
          height="60"
          rx="14"
          fill="url(#msg-envelope)"
        />

        {/* Envelope fold wings */}
        <path
          d="M36 64L80 94L124 64"
          stroke="#ffffff"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M36 120L66 90"
          stroke="#ffffff"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
        <path
          d="M124 120L94 90"
          stroke="#ffffff"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />

        {/* Central golden seal stamp */}
        <circle
          cx="80"
          cy="94"
          r="8"
          fill="#f59e0b"
          stroke="#ffffff"
          strokeWidth="1.5"
        />
        <path
          d="M77 94L79 96L83 92"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Floating paper plane at top right in brand wine with gold crease */}
      <g filter="url(#msg-shadow)">
        <path d="M136 28L98 44L114 54L136 28Z" fill="url(#msg-paperplane)" />
        <path d="M136 28L114 54L118 64L122 56L136 28Z" fill="#3b0814" />
        <path
          d="M136 28L114 54"
          stroke="#fde047"
          strokeWidth="1"
          strokeOpacity="0.7"
        />
      </g>
    </svg>
  )
}
