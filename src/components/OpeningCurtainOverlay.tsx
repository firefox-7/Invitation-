import type { CSSProperties } from 'react';
import type { OpeningPhase } from '../utils/weddingHelpers';
import { deriveCoupleInitials } from '../utils/weddingHelpers';

interface OpeningCurtainOverlayProps {
  coupleNames: string;
  displayDate: string;
  phase: OpeningPhase;
}

function VelvetDrapeFolds({ side }: { side: 'left' | 'right' }) {
  const gradId = `velvetFoldGrad-${side}`;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 600"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full pointer-events-none opacity-85"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2A0603" stopOpacity="0.65" />
          <stop offset="10%" stopColor="#C94A1A" stopOpacity="0.22" />
          <stop offset="20%" stopColor="#460C06" stopOpacity="0.68" />
          <stop offset="32%" stopColor="#FCF6BA" stopOpacity="0.09" />
          <stop offset="42%" stopColor="#3B0904" stopOpacity="0.66" />
          <stop offset="56%" stopColor="#C94A1A" stopOpacity="0.26" />
          <stop offset="68%" stopColor="#460C06" stopOpacity="0.68" />
          <stop offset="82%" stopColor="#FCF6BA" stopOpacity="0.1" />
          <stop offset="92%" stopColor="#3A0803" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#260502" stopOpacity="0.72" />
        </linearGradient>
      </defs>
      <rect width="240" height="600" fill={`url(#${gradId})`} />
      {/* Curved vertical fabric creases that deepen the 3D pleated illusion */}
      <path
        d="M 26 0 C 32 190, 20 390, 30 600 M 72 0 C 64 210, 78 410, 68 600 M 120 0 C 128 190, 114 400, 124 600 M 168 0 C 160 220, 174 410, 166 600 M 212 0 C 206 180, 218 420, 210 600"
        stroke="#240503"
        strokeOpacity="0.45"
        strokeWidth="2.4"
        fill="none"
      />
      <path
        d="M 38 0 C 44 190, 32 390, 42 600 M 86 0 C 78 210, 92 410, 82 600 M 136 0 C 144 190, 130 400, 140 600 M 184 0 C 176 220, 190 410, 182 600"
        stroke="#FCF6BA"
        strokeOpacity="0.12"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

function ScallopedPelmetValance({ side }: { side: 'left' | 'right' }) {
  const gradId = `pelmetGrad-${side}`;
  const goldId = `pelmetGold-${side}`;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 78"
      preserveAspectRatio="none"
      className="absolute top-0 inset-x-0 w-full h-14 sm:h-20 pointer-events-none drop-shadow-[0_10px_14px_rgba(24,4,2,0.58)]"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#460C06" />
          <stop offset="52%" stopColor="#9A2614" />
          <stop offset="100%" stopColor="#5E150B" />
        </linearGradient>
        <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#BF953F" />
          <stop offset="28%" stopColor="#FCF6BA" />
          <stop offset="52%" stopColor="#B38728" />
          <stop offset="76%" stopColor="#FBF5B7" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>
      </defs>
      {/* Draped Mughal Scalloped Swags */}
      <path
        d="M0,0 L300,0 L300,46 Q262.5,72 225,44 Q187.5,72 150,44 Q112.5,72 75,44 Q37.5,72 0,46 Z"
        fill={`url(#${gradId})`}
      />
      {/* Subtle folded swag shadows */}
      <path
        d="M75,44 Q56,28 37.5,58 M150,44 Q131,28 112.5,58 M225,44 Q206,28 187.5,58 M300,46 Q281,28 262.5,58"
        stroke="#2B0703"
        strokeOpacity="0.4"
        strokeWidth="1.4"
        fill="none"
      />
      {/* Antique Gold Zari Scalloped Border Trim */}
      <path
        d="M0,46 Q37.5,72 75,44 Q112.5,72 150,44 Q187.5,72 225,44 Q262.5,72 300,46"
        stroke={`url(#${goldId})`}
        strokeWidth="2.2"
        fill="none"
      />
      <path
        d="M0,41 Q37.5,66 75,39 Q112.5,66 150,39 Q187.5,66 225,39 Q262.5,66 300,41"
        stroke={`url(#${goldId})`}
        strokeOpacity="0.55"
        strokeWidth="0.9"
        strokeDasharray="2 3.5"
        fill="none"
      />
    </svg>
  );
}

function ZariVerticalBorderTrim({ side }: { side: 'left' | 'right' }) {
  const goldId = `zariEdge-${side}`;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 600"
      preserveAspectRatio="none"
      className={`absolute inset-y-0 w-4 sm:w-5 h-full pointer-events-none ${
        side === 'left' ? 'right-0' : 'left-0'
      }`}
    >
      <defs>
        <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BF953F" />
          <stop offset="25%" stopColor="#FCF6BA" />
          <stop offset="50%" stopColor="#B38728" />
          <stop offset="75%" stopColor="#FBF5B7" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>
        <pattern
          id={`zariPattern-${side}`}
          width="24"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M12,3 L17,15 L12,27 L7,15 Z"
            fill="none"
            stroke={`url(#${goldId})`}
            strokeWidth="1.05"
            strokeOpacity="0.88"
          />
          <circle cx="12" cy="15" r="1.6" fill={`url(#${goldId})`} />
        </pattern>
      </defs>
      {/* Rich crimson zari band backing */}
      <rect width="24" height="600" fill="#4E1008" fillOpacity="0.65" />
      <rect width="24" height="600" fill={`url(#zariPattern-${side})`} />
      {/* Crisp inner & outer metallic gold piping lines */}
      <line
        x1="2"
        y1="0"
        x2="2"
        y2="600"
        stroke={`url(#${goldId})`}
        strokeWidth="1.2"
      />
      <line
        x1="22"
        y1="0"
        x2="22"
        y2="600"
        stroke={`url(#${goldId})`}
        strokeWidth="1.6"
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
  const showPreloader = phase === 'preloader' || phase === 'monogram-exit';
  const isMonogramExiting = phase === 'monogram-exit';
  const isParting = phase === 'curtains';

  const leftCurtainStyle: CSSProperties = {
    transform: isParting
      ? 'perspective(1400px) translate3d(-44%, 0, 0) scaleX(0.35) rotateY(12deg) skewY(2deg)'
      : 'perspective(1400px) translate3d(0, 0, 0) scaleX(1) rotateY(0deg) skewY(0deg)',
  };

  const rightCurtainStyle: CSSProperties = {
    transform: isParting
      ? 'perspective(1400px) translate3d(44%, 0, 0) scaleX(0.35) rotateY(-12deg) skewY(-2deg)'
      : 'perspective(1400px) translate3d(0, 0, 0) scaleX(1) rotateY(0deg) skewY(0deg)',
  };

  return (
    <div
      data-testid="opening-scene"
      data-phase={phase}
      aria-hidden={isParting}
      className={isParting ? 'pointer-events-none' : undefined}
    >
      {/* Stage 2: 3D Draped Royal Saffron-Crimson Velvet Curtains (z-index: 9998) */}
      <div
        data-testid="silk-curtains"
        className="fixed inset-0 z-[9998] flex overflow-hidden pointer-events-none"
      >
        {/* Left Velvet Curtain Panel */}
        <div
          style={leftCurtainStyle}
          className="relative w-1/2 h-full origin-left velvet-curtain-left will-change-transform curtain-cloth-sweep"
        >
          <VelvetDrapeFolds side="left" />
          <ScallopedPelmetValance side="left" />
          <ZariVerticalBorderTrim side="left" />
          {/* Moving 3D cast drop-shadow onto the Hero section underneath */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 -right-12 sm:-right-16 w-12 sm:w-16 h-full bg-gradient-to-r from-[#1A0301]/65 via-[#1A0301]/25 to-transparent"
          />
        </div>

        {/* Right Velvet Curtain Panel */}
        <div
          style={rightCurtainStyle}
          className="relative w-1/2 h-full origin-right velvet-curtain-right will-change-transform curtain-cloth-sweep"
        >
          <VelvetDrapeFolds side="right" />
          <ScallopedPelmetValance side="right" />
          <ZariVerticalBorderTrim side="right" />
          {/* Moving 3D cast drop-shadow onto the Hero section underneath */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 -left-12 sm:-left-16 w-12 sm:w-16 h-full bg-gradient-to-l from-[#1A0301]/65 via-[#1A0301]/25 to-transparent"
          />
        </div>
      </div>

      {/* Stage 1: Clean Metallic Gold Monogram Crest — scales to 1.08 & fades out BEFORE curtains move */}
      {showPreloader && (
        <div
          data-testid="monogram-preloader"
          role="status"
          aria-label="Loading wedding invitation"
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_46%,#5E150B_0%,#390A05_55%,#1E0402_100%)] px-6 transition-all duration-[450ms] ease-out ${
            isMonogramExiting
              ? 'opacity-0 scale-[1.08] pointer-events-none'
              : 'opacity-100 scale-100'
          }`}
        >
          <div className="relative flex flex-col items-center">
            <svg
              viewBox="0 0 280 280"
              className="w-60 h-60 sm:w-72 sm:h-72 overflow-visible drop-shadow-[0_12px_32px_rgba(12,2,1,0.55)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="monogramGoldFoil"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#BF953F" />
                  <stop offset="25%" stopColor="#FCF6BA" />
                  <stop offset="50%" stopColor="#B38728" />
                  <stop offset="75%" stopColor="#FBF5B7" />
                  <stop offset="100%" stopColor="#AA771C" />
                </linearGradient>
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

              {/* Outer Antique Gold foil ring */}
              <circle
                cx="140"
                cy="140"
                r="128"
                fill="none"
                stroke="url(#monogramGoldFoil)"
                strokeWidth="1.2"
              />

              {/* Dotted Royal Mandala Accent Ring */}
              <circle
                cx="140"
                cy="140"
                r="121"
                fill="none"
                stroke="url(#monogramGoldFoil)"
                strokeWidth="0.9"
                strokeDasharray="1.5 6"
                strokeOpacity="0.68"
              />

              {/* Inner fine Gold foil ring */}
              <circle
                cx="140"
                cy="140"
                r="95"
                fill="none"
                stroke="url(#monogramGoldFoil)"
                strokeWidth="0.9"
                strokeOpacity="0.88"
              />

              {/* Delicate Gold Lotus Accent — Top-Right (2 o'clock) */}
              <g transform="translate(226, 70) rotate(32)">
                <path
                  d="M 0,-9 C 3,-4, 3,2, 0,6 C -3,2, -3,-4, 0,-9 Z"
                  fill="url(#monogramGoldFoil)"
                  fillOpacity="0.26"
                  stroke="url(#monogramGoldFoil)"
                  strokeWidth="0.95"
                />
                <path
                  d="M 0,6 C -4.5,4, -7,0, -6.5,-4.5 C -3,-3, -1,1, 0,6 Z"
                  fill="url(#monogramGoldFoil)"
                  fillOpacity="0.18"
                  stroke="url(#monogramGoldFoil)"
                  strokeWidth="0.85"
                />
                <path
                  d="M 0,6 C 4.5,4, 7,0, 6.5,-4.5 C 3,-3, 1,1, 0,6 Z"
                  fill="url(#monogramGoldFoil)"
                  fillOpacity="0.18"
                  stroke="url(#monogramGoldFoil)"
                  strokeWidth="0.85"
                />
                <circle cx="0" cy="9" r="1.4" fill="url(#monogramGoldFoil)" />
              </g>

              {/* Delicate Gold Lotus Accent — Bottom-Left (8 o'clock) */}
              <g transform="translate(54, 210) rotate(-148)">
                <path
                  d="M 0,-9 C 3,-4, 3,2, 0,6 C -3,2, -3,-4, 0,-9 Z"
                  fill="url(#monogramGoldFoil)"
                  fillOpacity="0.26"
                  stroke="url(#monogramGoldFoil)"
                  strokeWidth="0.95"
                />
                <path
                  d="M 0,6 C -4.5,4, -7,0, -6.5,-4.5 C -3,-3, -1,1, 0,6 Z"
                  fill="url(#monogramGoldFoil)"
                  fillOpacity="0.18"
                  stroke="url(#monogramGoldFoil)"
                  strokeWidth="0.85"
                />
                <path
                  d="M 0,6 C 4.5,4, 7,0, 6.5,-4.5 C 3,-3, 1,1, 0,6 Z"
                  fill="url(#monogramGoldFoil)"
                  fillOpacity="0.18"
                  stroke="url(#monogramGoldFoil)"
                  strokeWidth="0.85"
                />
                <circle cx="0" cy="9" r="1.4" fill="url(#monogramGoldFoil)" />
              </g>

              {/* Curved Text: SAVE THE DATE */}
              <text
                fill="url(#monogramGoldFoil)"
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
                fill="url(#monogramGoldFoil)"
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
                fill="url(#monogramGoldFoil)"
                fontSize="48"
                fontStyle="italic"
                fontWeight="500"
                className="font-serif"
              >
                {initials}
              </text>
            </svg>

            {/* Subtle Italic Loading Indicator */}
            <p className="mt-5 font-serif italic text-base sm:text-lg tracking-[0.16em] text-[#FBF5B7] animate-loading-pulse">
              Loading...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
