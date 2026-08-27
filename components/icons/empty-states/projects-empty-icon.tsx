import * as React from "react"

export function ProjectsEmptyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-28"
      {...props}
    >
      <defs>
        {/* Soft Ambient Brand Glow */}
        <radialGradient
          id="prj-new-glow"
          cx="80"
          cy="80"
          r="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" stopOpacity="0.1" />
          <stop offset="1" stopColor="#701a2e" stopOpacity="0" />
        </radialGradient>

        {/* Primary Wine Gradient */}
        <linearGradient
          id="prj-new-wine"
          x1="40"
          y1="30"
          x2="120"
          y2="130"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8c223c" />
          <stop offset="1" stopColor="#571323" />
        </linearGradient>

        {/* Gold Metal Accents */}
        <linearGradient
          id="prj-new-gold"
          x1="60"
          y1="40"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>

        {/* Subtle Drop Shadow */}
        <filter
          id="prj-new-shadow"
          x="15"
          y="20"
          width="130"
          height="125"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="8"
            floodColor="#701a2e"
            floodOpacity="0.14"
          />
        </filter>
      </defs>

      {/* Ambient background glow & dashed orbit ring */}
      <circle cx="80" cy="80" r="64" fill="url(#prj-new-glow)" />
      <circle
        cx="80"
        cy="80"
        r="54"
        stroke="#701a2e"
        strokeWidth="1"
        strokeDasharray="3 4"
        strokeOpacity="0.2"
      />

      {/* Decorative Sparkles */}
      <circle cx="34" cy="46" r="2" fill="#f59e0b" fillOpacity="0.6" />
      <circle cx="128" cy="116" r="2.5" fill="#701a2e" fillOpacity="0.3" />
      <circle cx="124" cy="44" r="1.5" fill="#f43f5e" fillOpacity="0.5" />
      <circle cx="38" cy="114" r="2" fill="#701a2e" fillOpacity="0.2" />

      {/* Main Architectural Blueprint Sheet & Drafting Set */}
      <g filter="url(#prj-new-shadow)">
        {/* Angled Background Blueprint Sheet */}
        <rect
          x="36"
          y="38"
          width="76"
          height="84"
          rx="12"
          transform="rotate(-5 36 38)"
          fill="#fdf2f4"
          stroke="#fecdd3"
          strokeWidth="1.2"
        />

        {/* Foreground Main Blueprint Plan Board */}
        <rect
          x="44"
          y="36"
          width="78"
          height="88"
          rx="12"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />

        {/* Blueprint Fine Grid Lines */}
        <path
          d="M52 50H114M52 64H114M52 78H114M52 92H114M52 106H114"
          stroke="#701a2e"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
        <path
          d="M60 42V118M74 42V118M88 42V118M102 42V118"
          stroke="#701a2e"
          strokeOpacity="0.08"
          strokeWidth="1"
        />

        {/* Architectural Floorplan Outline */}
        <path
          d="M56 56H110V100H88V110H56V56Z"
          stroke="#701a2e"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          strokeOpacity="0.4"
          fill="#701a2e"
          fillOpacity="0.03"
        />
        <rect
          x="62"
          y="62"
          width="20"
          height="16"
          rx="2"
          stroke="#701a2e"
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />
        <rect
          x="88"
          y="62"
          width="16"
          height="24"
          rx="2"
          stroke="#701a2e"
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />

        {/* Steel Ruler Overlay (Horizontal) */}
        <rect
          x="40"
          y="98"
          width="74"
          height="14"
          rx="3"
          fill="#571323"
          stroke="#701a2e"
          strokeWidth="1"
        />
        {/* Ruler Tick Marks */}
        <line
          x1="46"
          y1="98"
          x2="46"
          y2="103"
          stroke="#fde047"
          strokeWidth="1"
        />
        <line
          x1="52"
          y1="98"
          x2="52"
          y2="101"
          stroke="#fde047"
          strokeWidth="1"
          strokeOpacity="0.7"
        />
        <line
          x1="58"
          y1="98"
          x2="58"
          y2="103"
          stroke="#fde047"
          strokeWidth="1"
        />
        <line
          x1="64"
          y1="98"
          x2="64"
          y2="101"
          stroke="#fde047"
          strokeWidth="1"
          strokeOpacity="0.7"
        />
        <line
          x1="70"
          y1="98"
          x2="70"
          y2="104"
          stroke="#fde047"
          strokeWidth="1.2"
        />
        <line
          x1="76"
          y1="98"
          x2="76"
          y2="101"
          stroke="#fde047"
          strokeWidth="1"
          strokeOpacity="0.7"
        />
        <line
          x1="82"
          y1="98"
          x2="82"
          y2="103"
          stroke="#fde047"
          strokeWidth="1"
        />
        <line
          x1="88"
          y1="98"
          x2="88"
          y2="101"
          stroke="#fde047"
          strokeWidth="1"
          strokeOpacity="0.7"
        />
        <line
          x1="94"
          y1="98"
          x2="94"
          y2="103"
          stroke="#fde047"
          strokeWidth="1"
        />
        <line
          x1="100"
          y1="98"
          x2="100"
          y2="101"
          stroke="#fde047"
          strokeWidth="1"
          strokeOpacity="0.7"
        />
        <line
          x1="106"
          y1="98"
          x2="106"
          y2="103"
          stroke="#fde047"
          strokeWidth="1"
        />

        {/* Drafting Compass / Divider Tool (Diagonal Focal Point) */}
        {/* Compass Top Hinge Dial */}
        <circle
          cx="86"
          cy="46"
          r="5.5"
          fill="url(#prj-new-gold)"
          stroke="#701a2e"
          strokeWidth="1"
        />
        <circle cx="86" cy="46" r="2" fill="#701a2e" />

        {/* Compass Left Leg */}
        <path
          d="M84 50L66 94"
          stroke="url(#prj-new-wine)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Left Needle Point */}
        <path
          d="M66 94L63 100"
          stroke="url(#prj-new-gold)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Compass Right Leg */}
        <path
          d="M88 50L106 94"
          stroke="url(#prj-new-wine)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Right Pencil / Lead Point */}
        <path
          d="M106 94L109 100"
          stroke="url(#prj-new-gold)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Compass Cross Adjustment Bar */}
        <path
          d="M74 72H98"
          stroke="url(#prj-new-gold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="86"
          cy="72"
          r="2.5"
          fill="#701a2e"
          stroke="#fde047"
          strokeWidth="1"
        />
      </g>
    </svg>
  )
}
