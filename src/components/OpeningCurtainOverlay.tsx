import type { OpeningPhase } from '../utils/weddingHelpers';
import { deriveCoupleInitials } from '../utils/weddingHelpers';

interface OpeningCurtainOverlayProps {
  coupleNames: string;
  displayDate: string;
  phase: OpeningPhase;
}

function SilkDrapeFolds({ side }: { side: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 400"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full pointer-events-none opacity-65"
    >
      <defs>
        <linearGradient id={`foldGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6E2408" stopOpacity="0.45" />
          <stop offset="18%" stopColor="#D4AF37" stopOpacity="0.2" />
          <stop offset="36%" stopColor="#8C320D" stopOpacity="0.44" />
          <stop offset="52%" stopColor="#F5E3A8" stopOpacity="0.22" />
          <stop offset="68%" stopColor="#7C2B0B" stopOpacity="0.4" />
          <stop offset="86%" stopColor="#D4AF37" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#6E2408" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect width="200" height="400" fill={`url(#foldGrad-${side})`} />
      <path
        d="M 28 0 Q 34 200 26 400 M 68 0 Q 62 200 72 400 M 112 0 Q 118 200 108 400 M 156 0 Q 150 200 160 400"
        stroke="#F5E3A8"
        strokeOpacity="0.24"
        strokeWidth="1.1"
        fill="none"
      />
    </svg>
  );
}

export function OpeningCurtainOverlay({
  coupleNames,
  displayDate,
  phase,
}: OpeningCurtainOverlayProps) {
  if (phase === 'complete') {
    return null;
  }

  const initials = deriveCoupleInitials(coupleNames);
  const isParting = phase === 'curtains';

  return (
    <div
      data-testid="opening-scene"
      data-phase={phase}
      aria-hidden={isParting}
      className={isParting ? 'pointer-events-none' : undefined}
    >
      {/* Stage 2: Royal Saffron-Orange & Antique Gold Silk Curtain Reveal (z-index: 9998) */}
      <div
        data-testid="silk-curtains"
        className="fixed inset-0 z-[9998] flex overflow-hidden pointer-events-none"
      >
        {/* Left Silk Curtain Panel */}
        <div
          className={`relative w-1/2 h-full silk-curtain-left will-change-transform transition-transform duration-[2100ms] curtain-sway-ease ${
            isParting ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <SilkDrapeFolds side="left" />
          {/* Left Zari Gold Border Edge */}
          <div className="absolute right-0 inset-y-0 w-[3px] bg-gradient-to-b from-[#9A7418]/60 via-[#F5E3A8]/90 to-[#9A7418]/60" />
          {/* Left Half of Antique Gold Satin Tie-Back Ribbon */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 sm:h-3.5 satin-ribbon-band">
            <div className="h-px w-full bg-[#FFFDF9]/55 mt-[2px]" />
          </div>
        </div>

        {/* Right Silk Curtain Panel */}
        <div
          className={`relative w-1/2 h-full silk-curtain-right will-change-transform transition-transform duration-[2100ms] curtain-sway-ease ${
            isParting ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          <SilkDrapeFolds side="right" />
          {/* Right Zari Gold Border Edge */}
          <div className="absolute left-0 inset-y-0 w-[3px] bg-gradient-to-b from-[#9A7418]/60 via-[#F5E3A8]/90 to-[#9A7418]/60" />
          {/* Right Half of Antique Gold Satin Tie-Back Ribbon */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 sm:h-3.5 satin-ribbon-band">
            <div className="h-px w-full bg-[#FFFDF9]/55 mt-[2px]" />
          </div>
        </div>

        {/* Center Shimmering Gold Clasp that fades smoothly as curtains part */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ease-out ${
            isParting ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}
        >
          <svg
            viewBox="0 0 64 64"
            className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md"
            aria-hidden="true"
          >
            <circle
              cx="32"
              cy="32"
              r="22"
              fill="#9C3A10"
              stroke="#F5E3A8"
              strokeWidth="1.5"
            />
            <circle
              cx="32"
              cy="32"
              r="17"
              fill="#D95D1E"
              stroke="#D4AF37"
              strokeWidth="0.95"
            />
            <path
              d="M32 20 L35 28 L43 32 L35 36 L32 44 L29 36 L21 32 L29 28 Z"
              fill="#FFF4CE"
              fillOpacity="0.95"
            />
            <circle cx="32" cy="32" r="3" fill="#FFFDF9" stroke="#D95D1E" strokeWidth="0.9" />
          </svg>
        </div>
      </div>

      {/* Stage 1: Warm White, Gold & Marigold Orange Circular Monogram Preloader (z-index: 9999) */}
      <div
        data-testid="monogram-preloader"
        role="status"
        aria-label="Loading wedding invitation"
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#FFFDF9_60%,#FAF2E4_100%)] px-6 transition-opacity duration-500 ease-out ${
          isParting ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="relative flex flex-col items-center">
          <svg
            viewBox="0 0 280 280"
            className="w-60 h-60 sm:w-72 sm:h-72 overflow-visible"
            aria-hidden="true"
          >
            <defs>
              {/* Top-left clockwise arc for "SAVE THE DATE" */}
              <path
                id="monogramTopLeftArc"
                d="M 32.4,130.6 A 108,108 0 0,1 185.6,42.1"
              />
              {/* Bottom-right counter-clockwise arc for date so text sits upright */}
              <path
                id="monogramBottomRightArc"
                d="M 82,240.5 A 116,116 0 0,0 255.6,150.1"
              />
            </defs>

            {/* Outer delicate Antique Gold ring */}
            <circle
              cx="140"
              cy="140"
              r="128"
              fill="none"
              stroke="#C59B27"
              strokeWidth="1"
              strokeOpacity="0.88"
            />

            {/* Dotted Royal Mandala Accent Ring */}
            <circle
              cx="140"
              cy="140"
              r="122"
              fill="none"
              stroke="#D95D1E"
              strokeWidth="0.85"
              strokeDasharray="1.5 6"
              strokeOpacity="0.45"
            />

            {/* Inner fine Gold ring */}
            <circle
              cx="140"
              cy="140"
              r="95"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.85"
              strokeOpacity="0.82"
            />

            {/* Delicate Gold Lotus Accent — Top-Right (2 o'clock) */}
            <g transform="translate(226, 70) rotate(32)">
              <path
                d="M 0,-9 C 3,-4, 3,2, 0,6 C -3,2, -3,-4, 0,-9 Z"
                fill="#D95D1E"
                fillOpacity="0.16"
                stroke="#C59B27"
                strokeWidth="0.95"
              />
              <path
                d="M 0,6 C -4.5,4, -7,0, -6.5,-4.5 C -3,-3, -1,1, 0,6 Z"
                fill="#D4AF37"
                fillOpacity="0.2"
                stroke="#C59B27"
                strokeWidth="0.85"
              />
              <path
                d="M 0,6 C 4.5,4, 7,0, 6.5,-4.5 C 3,-3, 1,1, 0,6 Z"
                fill="#D4AF37"
                fillOpacity="0.2"
                stroke="#C59B27"
                strokeWidth="0.85"
              />
              <circle cx="0" cy="9" r="1.4" fill="#D95D1E" />
            </g>

            {/* Delicate Gold Lotus Accent — Bottom-Left (8 o'clock) */}
            <g transform="translate(54, 210) rotate(-148)">
              <path
                d="M 0,-9 C 3,-4, 3,2, 0,6 C -3,2, -3,-4, 0,-9 Z"
                fill="#D95D1E"
                fillOpacity="0.16"
                stroke="#C59B27"
                strokeWidth="0.95"
              />
              <path
                d="M 0,6 C -4.5,4, -7,0, -6.5,-4.5 C -3,-3, -1,1, 0,6 Z"
                fill="#D4AF37"
                fillOpacity="0.2"
                stroke="#C59B27"
                strokeWidth="0.85"
              />
              <path
                d="M 0,6 C 4.5,4, 7,0, 6.5,-4.5 C 3,-3, 1,1, 0,6 Z"
                fill="#D4AF37"
                fillOpacity="0.2"
                stroke="#C59B27"
                strokeWidth="0.85"
              />
              <circle cx="0" cy="9" r="1.4" fill="#D95D1E" />
            </g>

            {/* Curved Text: SAVE THE DATE */}
            <text
              fill="#8A6712"
              fontSize="9.5"
              fontWeight="600"
              letterSpacing="3.4"
              className="font-sans uppercase"
            >
              <textPath
                href="#monogramTopLeftArc"
                startOffset="50%"
                textAnchor="middle"
              >
                SAVE THE DATE
              </textPath>
            </text>

            {/* Curved Text: 15.02.2027 */}
            <text
              fill="#8A6712"
              fontSize="10"
              fontWeight="600"
              letterSpacing="3.2"
              className="font-sans uppercase tabular-nums"
            >
              <textPath
                href="#monogramBottomRightArc"
                startOffset="50%"
                textAnchor="middle"
              >
                {displayDate}
              </textPath>
            </text>

            {/* Center Regal Italic Serif Initials */}
            <text
              x="140"
              y="153"
              textAnchor="middle"
              fill="#D95D1E"
              fontSize="48"
              fontStyle="italic"
              fontWeight="500"
              className="font-serif"
            >
              {initials}
            </text>
          </svg>

          {/* Subtle Italic Loading Indicator */}
          <p className="mt-5 font-serif italic text-base sm:text-lg tracking-[0.16em] text-[#D95D1E] animate-loading-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}
