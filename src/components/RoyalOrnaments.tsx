interface OrnamentProps {
  className?: string;
}

/**
 * Minimal, thin-lined Antique Gold Lord Ganesha motif for auspicious hero top.
 */
export function RoyalGaneshaMotif({ className = 'w-11 h-11' }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Subtle Mukut (Royal Crown) */}
      <path
        d="M25 18 L32 10 L39 18 M23 22 H41"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="8.5" r="1.3" fill="currentColor" />
      {/* Forehead & Tilak */}
      <path
        d="M23 25 C25 21, 39 21, 41 25"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M32 23.5 V26.8"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      {/* Left & Right Graceful Ears */}
      <path
        d="M23 26 C15 24, 12 31, 16 37 C19 40, 23 39, 25 36"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41 26 C49 24, 52 31, 48 37 C45 40, 41 39, 39 36"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Graceful Curved Trunk */}
      <path
        d="M29 29 C28 36, 28 42, 33 46 C37 49, 43 47, 42 42 C41.5 40, 39 40, 39 42"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Single Subtle Tusk Accent */}
      <path
        d="M27 36 L24.5 39"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Minimal Lotus Base Flourish */}
      <path
        d="M20 53 C26 51, 38 51, 44 53 M25 56 H39"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * Delicate Gold Lotus / Ornamental Indian Flourish divider between sections.
 */
export function GoldLotusDivider({ className = '' }: OrnamentProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3.5 ${className}`}
    >
      <span className="w-10 sm:w-14 h-px bg-gradient-to-r from-transparent via-[#B38728]/55 to-[#BF953F]/95" />
      <svg
        viewBox="0 0 44 24"
        fill="none"
        className="w-9 h-5 shrink-0"
      >
        <defs>
          <linearGradient id="lotusGoldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BF953F" />
            <stop offset="30%" stopColor="#FBF5B7" />
            <stop offset="60%" stopColor="#B38728" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>
        </defs>
        {/* Center Lotus Petal */}
        <path
          d="M22 3 C25 7.5, 25 13, 22 17 C19 13, 19 7.5, 22 3 Z"
          stroke="url(#lotusGoldFoil)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Inner Side Petals */}
        <path
          d="M22 17 C17.5 15, 14.5 11, 15 6.5 C18.5 8, 20.5 12, 22 17 Z"
          stroke="url(#lotusGoldFoil)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M22 17 C26.5 15, 29.5 11, 29 6.5 C25.5 8, 23.5 12, 22 17 Z"
          stroke="url(#lotusGoldFoil)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Outer Delicate Leaves & Base Stem */}
        <path
          d="M11 15.5 C14.5 16.5, 18 17.5, 22 17.5 C26 17.5, 29.5 16.5, 33 15.5"
          stroke="url(#lotusGoldFoil)"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
        <circle cx="8" cy="14" r="1" fill="#BF953F" opacity="0.85" />
        <circle cx="36" cy="14" r="1" fill="#BF953F" opacity="0.85" />
        <circle cx="22" cy="20.5" r="1.15" fill="#B38728" />
      </svg>
      <span className="w-10 sm:w-14 h-px bg-gradient-to-l from-transparent via-[#B38728]/55 to-[#BF953F]/95" />
    </div>
  );
}

/**
 * Subtle Mughal / Rajasthani corner filigree accent for cards and countdown boxes.
 */
export function GoldCornerFiligree({
  position,
  sizeClass = 'w-6 h-6 sm:w-7 sm:h-7',
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  sizeClass?: string;
}) {
  const rotationMap: Record<typeof position, string> = {
    'top-left': 'top-2.5 left-2.5 rotate-0',
    'top-right': 'top-2.5 right-2.5 rotate-90',
    'bottom-right': 'bottom-2.5 right-2.5 rotate-180',
    'bottom-left': 'bottom-2.5 left-2.5 -rotate-90',
  };

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={`absolute pointer-events-none text-[#B38728]/80 ${sizeClass} ${rotationMap[position]}`}
    >
      <path
        d="M2 24 V6 C2 3.8, 3.8 2, 6 2 H24"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
      />
      <path
        d="M6 16 V8.5 C6 7.1, 7.1 6, 8.5 6 H16"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M6 6 L11.5 11.5"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
      />
      <circle cx="12.5" cy="12.5" r="1.15" fill="currentColor" />
    </svg>
  );
}

/**
 * Thin-lined Royal Indian Jharokha / Cusped Mughal Arch SVG border for the Hero frame.
 */
export function JharokhaArchFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-4 sm:inset-7 md:inset-10 z-[5] flex items-stretch justify-center"
    >
      <div className="relative w-full max-w-4xl h-full">
        {/* Outer fine gold border (open top where arch sits) */}
        <svg
          viewBox="0 0 800 920"
          preserveAspectRatio="none"
          fill="none"
          className="w-full h-full text-[#D4AF37]/75"
        >
          {/* Outer Jharokha Cusped Mughal Arch Frame */}
          <path
            d="M 28 896
               V 195
               C 28 145, 76 125, 118 112
               C 162 98, 198 68, 245 58
               C 296 47, 342 36, 400 18
               C 458 36, 504 47, 555 58
               C 602 68, 638 98, 682 112
               C 724 125, 772 145, 772 195
               V 896
               Z"
            stroke="currentColor"
            strokeWidth="1.35"
            vectorEffect="non-scaling-stroke"
          />
          {/* Inner Delicate Hairline Arch */}
          <path
            d="M 40 884
               V 202
               C 40 156, 86 138, 128 124
               C 172 110, 208 82, 254 72
               C 302 62, 346 51, 400 34
               C 454 51, 498 62, 546 72
               C 592 82, 628 110, 672 124
               C 714 138, 760 156, 760 202
               V 884
               Z"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.58"
            vectorEffect="non-scaling-stroke"
          />
          {/* Bottom Corner Filigree Accents */}
          <path
            d="M 28 864 H 60 V 896 M 772 864 H 740 V 896"
            stroke="currentColor"
            strokeWidth="0.95"
            strokeOpacity="0.65"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * Subtle minimal line-art Indian ceremony icons for Timeline events.
 */
export function IndianEventIcon({ title }: { title: string }) {
  const lower = title.toLowerCase();

  if (lower.includes('haldi') || lower.includes('mehendi')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="w-4 h-4 text-[#A82E18] shrink-0"
      >
        <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M12 4.5 C13.8 7, 13.8 8.5, 12 9.8 C10.2 8.5, 10.2 7, 12 4.5 Z M12 19.5 C13.8 17, 13.8 15.5, 12 14.2 C10.2 15.5, 10.2 17, 12 19.5 Z M4.5 12 C7 10.2, 8.5 10.2, 9.8 12 C8.5 13.8, 7 13.8, 4.5 12 Z M19.5 12 C17 10.2, 15.5 10.2, 14.2 12 C15.5 13.8, 17 13.8, 19.5 12 Z"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (lower.includes('sangeet')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="w-4 h-4 text-[#A82E18] shrink-0"
      >
        {/* Minimal Shehnai / Festive Music Note */}
        <path
          d="M5 17.5 L15.5 7 L17.5 9 L7 19.5 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 7 L19 5.5 L18.5 9"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="6.5" r="1.2" stroke="currentColor" strokeWidth="1.1" />
        <path d="M10.7 6.5 V3.5 L13.5 4.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    );
  }

  if (lower.includes('baraat')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="w-4 h-4 text-[#A82E18] shrink-0"
      >
        {/* Royal Ceremonial Chhatri / Procession Umbrella */}
        <path
          d="M4 11 C6 6.5, 18 6.5, 20 11 H4 Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <path
          d="M12 4.5 V19.5 M6 11 V13 M18 11 V13 M10 11 V12.5 M14 11 V12.5"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (lower.includes('varmala') || lower.includes('reception')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="w-4 h-4 text-[#A82E18] shrink-0"
      >
        {/* Intertwined Floral Jaimala Rings */}
        <circle cx="9.5" cy="12" r="4.8" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="14.5" cy="12" r="4.8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }

  /* Default / Pheras: Sacred Diya / Havan Flame */
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="w-4 h-4 text-[#A82E18] shrink-0"
    >
      <path
        d="M12 4.5 C13.8 7, 14.5 9, 12 11.2 C9.5 9, 10.2 7, 12 4.5 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 14 C6.5 17.8, 17.5 17.8, 18.5 14 H5.5 Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M9 19.5 H15" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
    </svg>
  );
}
