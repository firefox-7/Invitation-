import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';
import {
  formatSlideCounter,
  resolveSwipeSlideStep,
  wrapSlideIndex,
} from '../utils/weddingHelpers';
import { Reveal } from './Reveal';
import { GoldLotusDivider } from './RoyalOrnaments';

interface OurJourneySectionProps {
  config: WeddingConfig;
}

const CLONE_BUFFER = 2;

export function OurJourneySection({ config }: OurJourneySectionProps) {
  const slides = config.ourJourney.slides;
  const total = slides.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [trackPos, setTrackPos] = useState(CLONE_BUFFER);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const isHorizontalSwipeRef = useRef(false);
  const didDragRef = useRef(false);
  const dragOffsetRef = useRef(0);
  const snapFallbackTimerRef = useRef<number | null>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(media.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const extendedSlides = useMemo(() => {
    if (total === 0) return [];
    if (total === 1) {
      return [
        {
          slide: slides[0],
          realIndex: 0,
          key: `real-0-${slides[0].id}`,
          isClone: false,
        },
      ];
    }

    const headClones = Array.from({ length: CLONE_BUFFER }, (_, offset) => {
      const realIdx = wrapSlideIndex(total - CLONE_BUFFER + offset, total);
      return {
        slide: slides[realIdx],
        realIndex: realIdx,
        key: `head-${offset}-${slides[realIdx].id}`,
        isClone: true,
      };
    });

    const core = slides.map((slide, idx) => ({
      slide,
      realIndex: idx,
      key: `real-${idx}-${slide.id}`,
      isClone: false,
    }));

    const tailClones = Array.from({ length: CLONE_BUFFER }, (_, offset) => {
      const realIdx = wrapSlideIndex(offset, total);
      return {
        slide: slides[realIdx],
        realIndex: realIdx,
        key: `tail-${offset}-${slides[realIdx].id}`,
        isClone: true,
      };
    });

    return [...headClones, ...core, ...tailClones];
  }, [slides, total]);

  const clearSnapFallback = useCallback(() => {
    if (snapFallbackTimerRef.current !== null) {
      window.clearTimeout(snapFallbackTimerRef.current);
      snapFallbackTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearSnapFallback, [clearSnapFallback]);

  const snapIfOutOfBounds = useCallback(
    (candidateTrackPos: number) => {
      if (total <= 1) return;
      if (candidateTrackPos < CLONE_BUFFER) {
        const normalizedReal = wrapSlideIndex(
          candidateTrackPos - CLONE_BUFFER,
          total
        );
        setIsAnimating(false);
        setTrackPos(CLONE_BUFFER + normalizedReal);
      } else if (candidateTrackPos >= CLONE_BUFFER + total) {
        const normalizedReal = wrapSlideIndex(
          candidateTrackPos - CLONE_BUFFER,
          total
        );
        setIsAnimating(false);
        setTrackPos(CLONE_BUFFER + normalizedReal);
      }
    },
    [total]
  );

  const stepBy = useCallback(
    (delta: number) => {
      if (total <= 1 || delta === 0) return;

      clearSnapFallback();

      let baseTrackPos = trackPos;
      if (baseTrackPos < CLONE_BUFFER || baseTrackPos >= CLONE_BUFFER + total) {
        baseTrackPos = CLONE_BUFFER + activeIndex;
      }

      const nextActive = wrapSlideIndex(activeIndex + delta, total);
      const nextTrackPos = baseTrackPos + delta;

      setActiveIndex(nextActive);
      setIsAnimating(!prefersReducedMotion);
      setTrackPos(
        prefersReducedMotion ? CLONE_BUFFER + nextActive : nextTrackPos
      );

      if (!prefersReducedMotion) {
        snapFallbackTimerRef.current = window.setTimeout(() => {
          snapIfOutOfBounds(nextTrackPos);
        }, 540);
      }
    },
    [
      activeIndex,
      clearSnapFallback,
      prefersReducedMotion,
      snapIfOutOfBounds,
      total,
      trackPos,
    ]
  );

  const goToIndex = useCallback(
    (targetIndex: number) => {
      if (total <= 1) return;
      const safeTarget = wrapSlideIndex(targetIndex, total);
      if (safeTarget === activeIndex) return;

      clearSnapFallback();
      setActiveIndex(safeTarget);
      setIsAnimating(!prefersReducedMotion);
      setTrackPos(CLONE_BUFFER + safeTarget);
    },
    [activeIndex, clearSnapFallback, prefersReducedMotion, total]
  );

  const handleTrackTransitionEnd = () => {
    clearSnapFallback();
    snapIfOutOfBounds(trackPos);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (total <= 1 || event.button !== 0) return;
    clearSnapFallback();
    if (trackPos < CLONE_BUFFER || trackPos >= CLONE_BUFFER + total) {
      setIsAnimating(false);
      setTrackPos(CLONE_BUFFER + activeIndex);
    }
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    isHorizontalSwipeRef.current = false;
    didDragRef.current = false;
    dragOffsetRef.current = 0;
    setIsAnimating(false);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointerStartRef.current) return;
    const dx = event.clientX - pointerStartRef.current.x;
    const dy = event.clientY - pointerStartRef.current.y;

    if (!isHorizontalSwipeRef.current) {
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        isHorizontalSwipeRef.current = true;
      } else if (Math.abs(dy) > 10) {
        pointerStartRef.current = null;
        return;
      }
    }

    if (isHorizontalSwipeRef.current) {
      if (Math.abs(dx) > 8) {
        didDragRef.current = true;
      }
      dragOffsetRef.current = dx;
      setDragOffsetPx(dx);
    }
  };

  const finishPointerGesture = () => {
    if (!pointerStartRef.current) return;
    const step = resolveSwipeSlideStep(dragOffsetRef.current, 44);
    pointerStartRef.current = null;
    isHorizontalSwipeRef.current = false;
    dragOffsetRef.current = 0;
    setDragOffsetPx(0);

    if (step !== 0) {
      stepBy(step);
    } else {
      setIsAnimating(!prefersReducedMotion);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepBy(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepBy(1);
    }
  };

  const handleImageError = (slideId: string) => {
    setFailedImages((prev) => ({ ...prev, [slideId]: true }));
  };

  if (total === 0) return null;

  const activeSlide = slides[activeIndex];

  return (
    <section
      id="our-journey"
      data-testid="our-journey-section"
      aria-labelledby="our-journey-heading"
      onKeyDown={handleKeyDown}
      className="py-20 sm:py-28 border-t border-[#C59B27]/20 overflow-hidden"
    >
      <Reveal className="max-w-2xl mx-auto px-6 text-center">
        <GoldLotusDivider className="mb-7" />
        <h2
          id="our-journey-heading"
          className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-balance text-[#D95D1E]"
        >
          {config.ourJourney.heading}
        </h2>
        <p className="mt-4 text-[14px] sm:text-[15px] leading-[1.75] font-light text-[#262220]/75">
          {config.ourJourney.subtitle}
        </p>
      </Reveal>

      {/* Centered Photo Stage with Subtle Side Peeks */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={config.ourJourney.heading}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerGesture}
        onPointerCancel={finishPointerGesture}
        onPointerLeave={finishPointerGesture}
        className="relative mt-11 sm:mt-14 w-full max-w-6xl mx-auto overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing [--slide-w:76vw] sm:[--slide-w:460px] lg:[--slide-w:560px] [--slide-gap:16px] sm:[--slide-gap:24px] lg:[--slide-gap:32px]"
      >
        <div
          aria-hidden="true"
          className="w-[var(--slide-w)] aspect-[4/3] mx-auto invisible pointer-events-none"
        />

        {extendedSlides.map((item, idx) => {
          const offset = idx - trackPos;
          const isCenter = offset === 0;
          const isAdjacentPeek = Math.abs(offset) === 1;
          const isFarHidden = Math.abs(offset) > 1;
          const isFailed = Boolean(failedImages[item.slide.id]);

          return (
            <div
              key={item.key}
              aria-hidden={!isCenter}
              onTransitionEnd={isCenter ? handleTrackTransitionEnd : undefined}
              onClick={() => {
                if (didDragRef.current) {
                  didDragRef.current = false;
                  return;
                }
                if (offset === -1) stepBy(-1);
                if (offset === 1) stepBy(1);
              }}
              style={{
                transform: `translate3d(calc(-50% + ${offset * 100}% + var(--slide-gap) * ${offset} + ${dragOffsetPx}px), 0, 0) scale(${
                  isCenter ? 1 : 0.93
                })`,
                transitionProperty: isAnimating ? 'transform, opacity' : 'none',
                transitionDuration: isAnimating ? '500ms' : '0ms',
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className={`absolute top-0 left-1/2 w-[var(--slide-w)] h-full rounded-sm overflow-hidden border bg-[#FAF5EB] ${
                isCenter
                  ? 'border-[#C59B27]/55 opacity-100 z-10'
                  : isAdjacentPeek
                    ? 'border-[#C59B27]/30 opacity-45 hover:opacity-70 cursor-pointer z-0'
                    : 'border-[#C59B27]/20 opacity-0 pointer-events-none z-0'
              } ${isFarHidden ? 'invisible' : 'visible'}`}
            >
              {isFailed ? (
                <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF9] to-[#D95D1E]/10">
                  <span className="text-[11px] tracking-[0.2em] text-[#8A6712] uppercase">
                    {item.slide.date}
                  </span>
                  <span className="mt-2 font-serif text-xl sm:text-2xl text-[#D95D1E]">
                    {item.slide.title}
                  </span>
                </div>
              ) : (
                <img
                  src={item.slide.imageUrl}
                  alt={isCenter ? item.slide.alt : ''}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  loading="eager"
                  onError={() => handleImageError(item.slide.id)}
                  className="w-full h-full object-cover object-center pointer-events-none"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Milestone Caption Beneath Centered Frame */}
      <div
        aria-live="polite"
        className="max-w-lg mx-auto px-6 mt-7 sm:mt-8 text-center"
      >
        <div className="flex items-center justify-center gap-2.5 text-xs tracking-[0.18em] text-[#8A6712]">
          <span>{activeSlide.date}</span>
          <span aria-hidden="true" className="text-[#C59B27]">
            ·
          </span>
          <span data-testid="journey-slide-counter" className="tabular-nums">
            {formatSlideCounter(activeIndex, total)}
          </span>
        </div>

        <h3
          data-testid="journey-slide-title"
          className="mt-2 font-serif text-2xl sm:text-3xl font-normal tracking-tight text-balance text-[#D95D1E]"
        >
          {activeSlide.title}
        </h3>

        <p
          data-testid="journey-slide-caption"
          className="mt-2.5 text-[14px] sm:text-[15px] leading-[1.75] font-light text-[#262220]/80 min-h-[3.2rem]"
        >
          {activeSlide.caption}
        </p>
      </div>

      {/* Subtle Arrows & Minimal Pagination Dots */}
      {total > 1 && (
        <div className="mt-6 px-6 flex items-center justify-center gap-5">
          <button
            type="button"
            data-testid="journey-prev-button"
            onClick={() => stepBy(-1)}
            aria-label={config.ourJourney.previousLabel}
            className="w-11 h-11 rounded-full border border-[#C59B27]/55 bg-[#FFFFFF] text-[#D95D1E] hover:border-[#D4AF37] hover:bg-[#D95D1E] hover:text-[#FFFFFF] active:scale-[0.97] transition-all duration-200 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B27]"
          >
            <ChevronLeft className="w-[18px] h-[18px] stroke-[1.5]" />
          </button>

          <div
            role="tablist"
            aria-label="Choose a milestone photo"
            className="flex items-center"
          >
            {slides.map((slide, index) => {
              const isSelected = index === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`View milestone ${index + 1}: ${slide.title}`}
                  data-testid={`journey-dot-${index}`}
                  onClick={() => goToIndex(index)}
                  className="h-11 px-2 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B27] rounded-full"
                >
                  <span
                    aria-hidden="true"
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'w-5 bg-[#D95D1E]'
                        : 'w-1.5 bg-[#C59B27]/40 hover:bg-[#C59B27]/80'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            data-testid="journey-next-button"
            onClick={() => stepBy(1)}
            aria-label={config.ourJourney.nextLabel}
            className="w-11 h-11 rounded-full border border-[#C59B27]/55 bg-[#FFFFFF] text-[#D95D1E] hover:border-[#D4AF37] hover:bg-[#D95D1E] hover:text-[#FFFFFF] active:scale-[0.97] transition-all duration-200 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B27]"
          >
            <ChevronRight className="w-[18px] h-[18px] stroke-[1.5]" />
          </button>
        </div>
      )}
    </section>
  );
}
