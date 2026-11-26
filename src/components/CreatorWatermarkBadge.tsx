import type { WeddingConfig } from '../types/wedding';

interface CreatorWatermarkBadgeProps {
  badge?: WeddingConfig['creatorBadge'];
  isVisible: boolean;
}

export function CreatorWatermarkBadge({
  badge,
  isVisible,
}: CreatorWatermarkBadgeProps) {
  if (!badge?.enabled) {
    return null;
  }

  return (
    <div
      data-testid="creator-badge"
      aria-label={`${badge.label} ${badge.author}`}
      className={`fixed top-4 left-4 sm:top-5 sm:left-5 z-40 inline-flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-sm bg-[#FFFFFF]/95 backdrop-blur-md border border-[#B38728]/55 shadow-sm select-none transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      {/* Minimal Royal Saffron-Crimson & Shimmering Antique Gold JS Monogram Crest */}
      <svg
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        className="w-7 h-7 shrink-0"
      >
        <defs>
          <linearGradient id="creatorCrestCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A82E18" />
            <stop offset="55%" stopColor="#C94A1A" />
            <stop offset="100%" stopColor="#5E150B" />
          </linearGradient>
          <linearGradient id="creatorCrestGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BF953F" />
            <stop offset="35%" stopColor="#FCF6BA" />
            <stop offset="70%" stopColor="#B38728" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>
        </defs>
        <circle
          cx="18"
          cy="18"
          r="16.2"
          fill="url(#creatorCrestCrimson)"
          stroke="url(#creatorCrestGold)"
          strokeWidth="1.1"
        />
        <circle
          cx="18"
          cy="18"
          r="13.2"
          stroke="url(#creatorCrestGold)"
          strokeWidth="0.65"
          strokeOpacity="0.82"
        />
        <text
          x="18"
          y="21.5"
          textAnchor="middle"
          fill="#FCF6BA"
          fontSize="11.5"
          fontWeight="500"
          letterSpacing="0.8"
          className="font-serif"
        >
          {badge.initials}
        </text>
      </svg>

      <div className="flex flex-col leading-none">
        <span className="text-[8.5px] uppercase tracking-[0.2em] font-medium text-[#8A6712] whitespace-nowrap">
          {badge.label}
        </span>
        <span className="mt-0.5 font-serif text-[12px] sm:text-[12.5px] font-normal tracking-[0.02em] text-[#A82E18] whitespace-nowrap">
          {badge.author}
        </span>
      </div>
    </div>
  );
}
