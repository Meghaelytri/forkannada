type AkkiMascotProps = {
  size?: "sm" | "lg";
  mood?: "hello" | "celebrate";
};

export default function AkkiMascot({
  size = "lg",
  mood = "hello",
}: AkkiMascotProps) {
  const isSmall = size === "sm";
  const viewBox = isSmall ? "0 0 64 64" : "0 0 240 240";

  if (isSmall) {
    return (
      <svg
        className="akki akki-sm"
        viewBox={viewBox}
        role="img"
        aria-label="Akki Kannada mascot"
      >
        <path
          d="M 32,5 C 47,5 59,17 60,32 C 61,49 45,60 28,60 C 14,60 5,52 4,36 C 3,20 17,5 32,5 Z"
          fill="#FFD400"
          stroke="#1F1610"
          strokeWidth="2.2"
        />
        <text
          x="31"
          y="43"
          fontFamily="var(--font-kannada)"
          fontSize="36"
          fontWeight="700"
          textAnchor="middle"
          fill="#1F1610"
        >
          ಕ
        </text>
        <ellipse cx="20" cy="22" rx="3" ry="3.5" fill="#FFFFFF" stroke="#1F1610" strokeWidth="1.2" />
        <ellipse cx="42" cy="22" rx="3" ry="3.5" fill="#FFFFFF" stroke="#1F1610" strokeWidth="1.2" />
        <circle cx="21" cy="23" r="1.3" fill="#1F1610" />
        <circle cx="43" cy="23" r="1.3" fill="#1F1610" />
      </svg>
    );
  }

  return (
    <svg
      className="akki akki-lg"
      viewBox={viewBox}
      role="img"
      aria-label="Akki Kannada mascot"
    >
      <path
        d="M 120,15 C 175,15 215,55 225,110 C 235,165 195,225 130,225 C 70,225 15,200 15,135 C 15,75 65,15 120,15 Z"
        fill="#FFD400"
        stroke="#1F1610"
        strokeWidth="6"
      />
      <text
        x="118"
        y={mood === "celebrate" ? "170" : "156"}
        fontFamily="var(--font-kannada)"
        fontSize={mood === "celebrate" ? "140" : "155"}
        fontWeight="700"
        textAnchor="middle"
        fill="#1F1610"
      >
        ಕ
      </text>
      {mood === "celebrate" ? (
        <>
          <path d="M 60,80 Q 78,68 96,80" stroke="#1F1610" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M 144,80 Q 162,68 180,80" stroke="#1F1610" strokeWidth="6" fill="none" strokeLinecap="round" />
          <g transform="translate(20,30) rotate(-25)">
            <circle cx="0" cy="0" r="18" fill="#FFD400" stroke="#1F1610" strokeWidth="5" />
          </g>
          <g transform="translate(218,30) rotate(25)">
            <circle cx="0" cy="0" r="18" fill="#FFD400" stroke="#1F1610" strokeWidth="5" />
          </g>
          <rect x="20" y="10" width="10" height="10" fill="#FC261C" transform="rotate(20 25 15)" />
          <rect x="200" y="22" width="10" height="10" fill="#FC261C" transform="rotate(40 205 27)" />
          <circle cx="215" cy="8" r="5" fill="#FC261C" />
        </>
      ) : (
        <>
          <ellipse cx="78" cy="80" rx="11" ry="13" fill="#FFFFFF" stroke="#1F1610" strokeWidth="3.5" />
          <ellipse cx="155" cy="80" rx="11" ry="13" fill="#FFFFFF" stroke="#1F1610" strokeWidth="3.5" />
          <circle cx="80" cy="83" r="4.5" fill="#1F1610" />
          <circle cx="157" cy="83" r="4.5" fill="#1F1610" />
          <ellipse cx="65" cy="115" rx="9" ry="6" fill="#FC261C" opacity="0.4" />
          <ellipse cx="172" cy="115" rx="9" ry="6" fill="#FC261C" opacity="0.4" />
          <g transform="translate(195,55) rotate(15)">
            <circle cx="0" cy="0" r="22" fill="#FFD400" stroke="#1F1610" strokeWidth="4.5" />
            <path
              d="M -8,-2 L -2,-12 M 2,-3 L 8,-15 M 10,-1 L 16,-12"
              stroke="#1F1610"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </>
      )}
    </svg>
  );
}
