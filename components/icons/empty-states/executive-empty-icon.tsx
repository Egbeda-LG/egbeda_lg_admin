import * as React from "react"

export function ExecutiveEmptyIcon(props: React.SVGProps<SVGSVGElement>) {
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
          id="exec-bg-glow"
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
          id="exec-shield-grad"
          x1="50"
          y1="36"
          x2="110"
          y2="124"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" />
          <stop offset="1" stopColor="#4a0f1d" />
        </linearGradient>
        <linearGradient
          id="exec-gold"
          x1="60"
          y1="45"
          x2="100"
          y2="105"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <filter
          id="exec-shadow"
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
            stdDeviation="7"
            floodColor="#701a2e"
            floodOpacity="0.16"
          />
        </filter>
      </defs>

      {/* Ambient background rays */}
      <circle cx="80" cy="80" r="64" fill="url(#exec-bg-glow)" />
      <circle
        cx="80"
        cy="80"
        r="52"
        stroke="#701a2e"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        strokeOpacity="0.25"
      />

      {/* Decorative floating stars / sparkles */}
      <path
        d="M36 48L38 42L44 40L38 38L36 32L34 38L28 40L34 42L36 48Z"
        fill="#f59e0b"
        fillOpacity="0.7"
      />
      <path
        d="M128 44L129.5 39.5L134 38L129.5 36.5L128 32L126.5 36.5L122 38L126.5 39.5L128 44Z"
        fill="#f43f5e"
        fillOpacity="0.6"
      />
      <circle cx="126" cy="116" r="3" fill="#701a2e" fillOpacity="0.3" />
      <circle cx="34" cy="110" r="2.5" fill="#f59e0b" fillOpacity="0.5" />

      {/* Council Podiums Background arc */}
      <path
        d="M40 108C40 85.9086 57.9086 68 80 68C102.091 68 120 85.9086 120 108"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.15"
        strokeDasharray="4 4"
      />

      {/* Main Executive Crest / Council Dais */}
      <g filter="url(#exec-shadow)">
        {/* Heraldic Shield base */}
        <path
          d="M80 34C98 34 116 38 116 54C116 88 80 118 80 118C80 118 44 88 44 54C44 38 62 34 80 34Z"
          fill="url(#exec-shield-grad)"
        />
        {/* Shield inner border */}
        <path
          d="M80 40C94 40 108 43.5 108 56C108 84 80 110 80 110C80 110 52 84 52 56C52 43.5 66 40 80 40Z"
          stroke="#fde047"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />

        {/* Civic Laurel Wreath (Left & Right) */}
        {/* Left wreath leaves */}
        <path
          d="M62 62C60 66 61 70 65 72"
          stroke="url(#exec-gold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M58 74C57 79 59 83 64 85"
          stroke="url(#exec-gold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M62 87C62 92 66 96 71 97"
          stroke="url(#exec-gold)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Right wreath leaves */}
        <path
          d="M98 62C100 66 99 70 95 72"
          stroke="url(#exec-gold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M102 74C103 79 101 83 96 85"
          stroke="url(#exec-gold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M98 87C98 92 94 96 89 97"
          stroke="url(#exec-gold)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Executive Official Silhouette / Leader Emblem */}
        <circle cx="80" cy="62" r="9" fill="#fde047" />
        <path
          d="M68 86C68 79.3726 73.3726 74 80 74C86.6274 74 92 79.3726 92 86V88H68V86Z"
          fill="#fde047"
        />
        {/* Tie / Sash ribbon */}
        <path d="M78 78L80 84L82 78H78Z" fill="#701a2e" />
      </g>

      {/* Chairman / Councillor Gavel Accent badge floating at bottom right */}
      <g filter="url(#exec-shadow)">
        <circle
          cx="114"
          cy="106"
          r="16"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />
        {/* Gavel head */}
        <rect
          x="108"
          y="97"
          width="12"
          height="6"
          rx="2"
          transform="rotate(45 108 97)"
          fill="#701a2e"
        />
        {/* Gavel handle */}
        <line
          x1="110"
          y1="105"
          x2="120"
          y2="115"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
