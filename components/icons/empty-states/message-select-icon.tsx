import * as React from "react"

export function MessageSelectIcon(props: React.SVGProps<SVGSVGElement>) {
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
          id="msgsel-bg-glow"
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
          id="msgsel-bubble"
          x1="38"
          y1="42"
          x2="118"
          y2="108"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" />
          <stop offset="1" stopColor="#571323" />
        </linearGradient>
        <filter
          id="msgsel-shadow"
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

      {/* Ambient background ring */}
      <circle cx="80" cy="80" r="64" fill="url(#msgsel-bg-glow)" />
      <circle
        cx="80"
        cy="80"
        r="54"
        stroke="#701a2e"
        strokeWidth="1"
        strokeDasharray="3 4"
        strokeOpacity="0.25"
      />

      {/* Background Chat Bubble */}
      <g opacity="0.4">
        <path
          d="M124 50C124 43.3726 118.627 38 112 38H68C61.3726 38 56 43.3726 56 50V68C56 74.6274 61.3726 80 68 80H108L120 92V78.5C122.5 75.5 124 71.5 124 68V50Z"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>

      {/* Main Foreground Chat Bubble */}
      <g filter="url(#msgsel-shadow)">
        <path
          d="M38 58C38 49.1634 45.1634 42 54 42H106C114.837 42 122 49.1634 122 58V90C122 98.8366 114.837 106 106 106H64L44 122V102.5C40.3 99.2 38 94.8 38 90V58Z"
          fill="url(#msgsel-bubble)"
        />

        {/* Message bubble inner conversation lines */}
        <rect x="54" y="60" width="34" height="4" rx="2" fill="#fde047" />
        <rect
          x="54"
          y="70"
          width="54"
          height="3.5"
          rx="1.75"
          fill="#ffffff"
          fillOpacity="0.9"
        />
        <rect
          x="54"
          y="79"
          width="42"
          height="3.5"
          rx="1.75"
          fill="#ffffff"
          fillOpacity="0.6"
        />
        <rect
          x="54"
          y="88"
          width="26"
          height="3"
          rx="1.5"
          fill="#ffffff"
          fillOpacity="0.4"
        />
      </g>

      {/* Floating Selection Cursor Pointer at bottom right */}
      <g filter="url(#msgsel-shadow)">
        <circle
          cx="118"
          cy="116"
          r="16"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />
        <path
          d="M112 108L112 124L116 120L119 126L122 124.5L119 118.5L124 118.5L112 108Z"
          fill="#701a2e"
        />
      </g>
    </svg>
  )
}
