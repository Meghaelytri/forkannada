export function AkkiMascot({ className = "ch-akki" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 110 110"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 55,8 C 80,8 100,28 102,52 C 104,80 78,102 50,102 C 25,102 10,90 8,62 C 6,34 30,8 55,8 Z"
        fill="#FFD400"
        stroke="#1F1610"
        strokeWidth="3"
      />
      <text
        x="54"
        y="72"
        fontFamily="Noto Sans Kannada, sans-serif"
        fontSize="60"
        fontWeight="700"
        textAnchor="middle"
        fill="#1F1610"
      >
        ಕ
      </text>
      <ellipse cx="36" cy="44" rx="5" ry="5" fill="#FFFFFF" stroke="#1F1610" strokeWidth="1.8" />
      <ellipse cx="72" cy="44" rx="5" ry="5" fill="#FFFFFF" stroke="#1F1610" strokeWidth="1.8" />
      <circle cx="37" cy="47" r="2.2" fill="#1F1610" />
      <circle cx="73" cy="47" r="2.2" fill="#1F1610" />
      <g transform="translate(0, 78)">
        <rect
          x="22" y="0" width="66" height="22"
          fill="#FFFFFF" stroke="#1F1610" strokeWidth="2.2" rx="2"
        />
        <line x1="55" y1="0" x2="55" y2="22" stroke="#1F1610" strokeWidth="2" />
        <line x1="30" y1="7" x2="48" y2="7" stroke="#1F1610" strokeWidth="1.2" />
        <line x1="30" y1="13" x2="48" y2="13" stroke="#1F1610" strokeWidth="1.2" />
        <line x1="62" y1="7" x2="80" y2="7" stroke="#1F1610" strokeWidth="1.2" />
        <line x1="62" y1="13" x2="80" y2="13" stroke="#1F1610" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

export function AkkiXs() {
  return (
    <svg
      className="akki-xs"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 32,5 C 47,5 59,17 60,32 C 61,49 45,60 28,60 C 14,60 5,52 4,36 C 3,20 17,5 32,5 Z"
        fill="#FFFFFF"
        stroke="#1F1610"
        strokeWidth="2.2"
      />
      <text
        x="31"
        y="43"
        fontFamily="Noto Sans Kannada, sans-serif"
        fontSize="36"
        fontWeight="700"
        textAnchor="middle"
        fill="#1F1610"
      >
        ಕ
      </text>
      <ellipse cx="20" cy="25" rx="3" ry="3.5" fill="#FFFFFF" stroke="#1F1610" strokeWidth="1.2" />
      <ellipse cx="42" cy="25" rx="3" ry="3.5" fill="#FFFFFF" stroke="#1F1610" strokeWidth="1.2" />
      <circle cx="21" cy="26" r="1.3" fill="#1F1610" />
      <circle cx="43" cy="26" r="1.3" fill="#1F1610" />
      <path
        d="M 8,22 C 8,12 22,5 31,5 C 40,5 54,12 54,22"
        stroke="#FC261C"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}
