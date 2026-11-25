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
      className={`fixed top-4 left-4 sm:top-5 sm:left-5 z-40 inline-flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-sm bg-[#FFFFFF]/95 backdrop-blur-md border border-[#C59B27]/55 shadow-sm select-none transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      {/* Minimal Royal Orange & Antique Gold JS Monogram Crest */}
      <svg
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        className="w-7 h-7 shrink-0"
      >
        <circle
          cx="18"
          cy="18"
          r="16.2"
          fill="#D95D1E"
          stroke="#C59B27"
          strokeWidth="1"
        />
        <circle
          cx="18"
          cy="18"
          r="13.2"
          stroke="#D4AF37"
          strokeWidth="0.6"
          strokeOpacity="0.7"
        />
        <text
          x="18"
          y="21.5"
          textAnchor="middle"
          fill="#FFFFFF"
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
        <span className="mt-0.5 font-serif text-[12px] sm:text-[12.5px] font-normal tracking-[0.02em] text-[#D95D1E] whitespace-nowrap">
          {badge.author}
        </span>
      </div>
    </div>
  );
}
