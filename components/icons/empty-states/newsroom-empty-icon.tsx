import * as React from "react"

export function NewsroomEmptyIcon(props: React.SVGProps<SVGSVGElement>) {
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
          id="news-bg-glow"
          x1="80"
          y1="20"
          x2="80"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" stopOpacity="0.14" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient
          id="news-header"
          x1="38"
          y1="46"
          x2="114"
          y2="68"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#701a2e" />
          <stop offset="1" stopColor="#571323" />
        </linearGradient>
        <linearGradient
          id="news-quill"
          x1="105"
          y1="26"
          x2="135"
          y2="76"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f59e0b" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <filter
          id="news-shadow"
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
      <circle cx="80" cy="80" r="64" fill="url(#news-bg-glow)" />
      <circle
        cx="80"
        cy="80"
        r="54"
        stroke="#701a2e"
        strokeWidth="1"
        strokeDasharray="3 4"
        strokeOpacity="0.25"
      />

      {/* Decorative sparks */}
      <circle cx="34" cy="48" r="2.5" fill="#f59e0b" fillOpacity="0.7" />
      <circle cx="128" cy="116" r="3" fill="#701a2e" fillOpacity="0.3" />
      <circle cx="36" cy="114" r="2" fill="#f43f5e" fillOpacity="0.5" />

      {/* Secondary Angled Newspaper (Depth effect) */}
      <rect
        x="48"
        y="36"
        width="76"
        height="84"
        rx="12"
        transform="rotate(6 48 36)"
        className="fill-muted stroke-border"
        strokeWidth="1.2"
        opacity="0.6"
      />

      {/* Main Front Newspaper Card */}
      <g filter="url(#news-shadow)">
        <rect
          x="36"
          y="42"
          width="82"
          height="88"
          rx="14"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />

        {/* Newspaper Top Masthead */}
        <path
          d="M36 54C36 47.3726 41.3726 42 48 42H106C112.627 42 118 47.3726 118 54V60H36V54Z"
          fill="url(#news-header)"
        />
        <rect
          x="52"
          y="49"
          width="50"
          height="4"
          rx="2"
          fill="#ffffff"
          fillOpacity="0.9"
        />

        {/* Lead Story Image / Media Frame */}
        <rect
          x="44"
          y="66"
          width="34"
          height="26"
          rx="6"
          fill="#701a2e"
          fillOpacity="0.1"
          stroke="#701a2e"
          strokeWidth="1"
        />
        <circle cx="53" cy="74" r="3" fill="#f59e0b" />
        <path
          d="M46 88L55 80L63 86L71 78L76 88H46Z"
          fill="#701a2e"
          fillOpacity="0.4"
        />

        {/* Article Headline & Summary Column */}
        <rect
          x="84"
          y="68"
          width="28"
          height="4"
          rx="2"
          fill="#701a2e"
          fillOpacity="0.8"
        />
        <rect
          x="84"
          y="75"
          width="24"
          height="2.5"
          rx="1.25"
          fill="currentColor"
          fillOpacity="0.35"
        />
        <rect
          x="84"
          y="80"
          width="26"
          height="2.5"
          rx="1.25"
          fill="currentColor"
          fillOpacity="0.35"
        />
        <rect
          x="84"
          y="85"
          width="20"
          height="2.5"
          rx="1.25"
          fill="currentColor"
          fillOpacity="0.25"
        />

        {/* Lower Multi-column Article Text Lines */}
        <rect
          x="44"
          y="98"
          width="32"
          height="3"
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <rect
          x="44"
          y="104"
          width="30"
          height="2.5"
          rx="1.25"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <rect
          x="44"
          y="109"
          width="26"
          height="2.5"
          rx="1.25"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <rect
          x="44"
          y="114"
          width="32"
          height="2.5"
          rx="1.25"
          fill="currentColor"
          fillOpacity="0.2"
        />

        <rect
          x="82"
          y="98"
          width="30"
          height="3"
          rx="1.5"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <rect
          x="82"
          y="104"
          width="28"
          height="2.5"
          rx="1.25"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <rect
          x="82"
          y="109"
          width="30"
          height="2.5"
          rx="1.25"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <rect
          x="82"
          y="114"
          width="22"
          height="2.5"
          rx="1.25"
          fill="currentColor"
          fillOpacity="0.2"
        />
      </g>

      {/* Floating Author Quill / Editorial Pen at top right */}
      <g filter="url(#news-shadow)">
        <path
          d="M134 26C134 26 122 34 116 46C112 54 112 62 110 68L114 70C118 64 122 58 126 52C134 40 134 26 134 26Z"
          fill="url(#news-quill)"
        />
        <path d="M110 68L108 76L114 70" fill="#701a2e" />
        <line
          x1="126"
          y1="36"
          x2="114"
          y2="68"
          stroke="#ffffff"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      </g>
    </svg>
  )
}
