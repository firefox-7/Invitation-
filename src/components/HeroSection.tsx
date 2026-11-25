import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';
import {
  computeParallaxOffset,
  formatHeroSpacedDate,
  type OpeningPhase,
} from '../utils/weddingHelpers';
import { GoldLotusDivider, RoyalGaneshaMotif } from './RoyalOrnaments';

interface HeroSectionProps {
  config: WeddingConfig;
  openingPhase?: OpeningPhase;
}

interface BokehParticle {
  id: number;
  leftPct: number;
  sizePx: number;
  blurClass: string;
  opacity: number;
  durationSec: number;
  delaySec: number;
  driftPx: number;
}

const BOKEH_PARTICLES: BokehParticle[] = [
  { id: 1, leftPct: 7, sizePx: 4, blurClass: 'blur-0', opacity: 0.68, durationSec: 13, delaySec: -2, driftPx: 14 },
  { id: 2, leftPct: 14, sizePx: 10, blurClass: 'blur-[2.5px]', opacity: 0.42, durationSec: 19, delaySec: -9, driftPx: -18 },
  { id: 3, leftPct: 21, sizePx: 3, blurClass: 'blur-0', opacity: 0.78, durationSec: 11, delaySec: -5, driftPx: 10 },
  { id: 4, leftPct: 28, sizePx: 13, blurClass: 'blur-[3.5px]', opacity: 0.34, durationSec: 22, delaySec: -14, driftPx: 20 },
  { id: 5, leftPct: 35, sizePx: 5, blurClass: 'blur-[0.5px]', opacity: 0.65, durationSec: 15, delaySec: -7, driftPx: -12 },
  { id: 6, leftPct: 42, sizePx: 3.5, blurClass: 'blur-0', opacity: 0.82, durationSec: 12, delaySec: -3, driftPx: 16 },
  { id: 7, leftPct: 49, sizePx: 8, blurClass: 'blur-[1.5px]', opacity: 0.48, durationSec: 17, delaySec: -11, driftPx: -15 },
  { id: 8, leftPct: 56, sizePx: 3, blurClass: 'blur-0', opacity: 0.75, durationSec: 10.5, delaySec: -6, driftPx: 11 },
  { id: 9, leftPct: 62, sizePx: 12, blurClass: 'blur-[3px]', opacity: 0.38, durationSec: 20, delaySec: -16, driftPx: -18 },
  { id: 10, leftPct: 69, sizePx: 4.5, blurClass: 'blur-[0.5px]', opacity: 0.7, durationSec: 14, delaySec: -1, driftPx: 15 },
  { id: 11, leftPct: 76, sizePx: 7, blurClass: 'blur-[1.5px]', opacity: 0.52, durationSec: 16, delaySec: -8, driftPx: -14 },
  { id: 12, leftPct: 83, sizePx: 3.5, blurClass: 'blur-0', opacity: 0.8, durationSec: 12.5, delaySec: -4, driftPx: 12 },
  { id: 13, leftPct: 89, sizePx: 11, blurClass: 'blur-[2.5px]', opacity: 0.4, durationSec: 21, delaySec: -12, driftPx: -16 },
  { id: 14, leftPct: 94, sizePx: 4, blurClass: 'blur-0', opacity: 0.66, durationSec: 13.5, delaySec: -10, driftPx: 9 },
  { id: 15, leftPct: 11, sizePx: 6, blurClass: 'blur-[1px]', opacity: 0.55, durationSec: 16.5, delaySec: -15, driftPx: 13 },
  { id: 16, leftPct: 38, sizePx: 9, blurClass: 'blur-[2px]', opacity: 0.44, durationSec: 18.5, delaySec: -4, driftPx: -11 },
  { id: 17, leftPct: 65, sizePx: 5, blurClass: 'blur-[0.5px]', opacity: 0.64, durationSec: 14.5, delaySec: -13, driftPx: 17 },
  { id: 18, leftPct: 80, sizePx: 14, blurClass: 'blur-[4px]', opacity: 0.3, durationSec: 23, delaySec: -7, driftPx: -20 },
];

export function HeroSection({
  config,
  openingPhase = 'complete',
}: HeroSectionProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const isZoomedIn = openingPhase === 'preloader';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let rafId: number | null = null;

    const updateParallax = () => {
      rafId = null;
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
      setParallaxY(computeParallaxOffset(window.scrollY, heroHeight, 0.32));
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleScrollDown = () => {
    const welcomeEl = document.getElementById('welcome');
    if (welcomeEl) {
      welcomeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const spacedDate = formatHeroSpacedDate(config.displayDate);

  return (
    <section
      ref={heroRef}
      data-testid="hero-section"
      aria-label="Wedding Invitation Hero"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-5 sm:px-10 pt-10 pb-20 sm:py-16 overflow-hidden bg-[#1A0D06] text-[#FFFFFF]"
    >
      {/* Shared SVG clipPath matching the cusped Royal Mughal / Jharokha Arch silhouette */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        className="absolute pointer-events-none"
      >
        <defs>
          <clipPath id="jharokhaArchClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,1 L 0,0.22 C 0,0.16 0.06,0.135 0.12,0.12 C 0.19,0.102 0.25,0.068 0.32,0.056 C 0.39,0.044 0.45,0.032 0.5,0.008 C 0.55,0.032 0.61,0.044 0.68,0.056 C 0.75,0.068 0.81,0.102 0.88,0.12 C 0.94,0.135 1,0.16 1,0.22 L 1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* LAYER 1: Deepest Parallax + Ken Burns Royal Palace Backdrop */}
      <div
        data-testid="hero-parallax-layer"
        style={{ transform: `translate3d(0, ${parallaxY}px, 0)` }}
        className="absolute inset-0 z-0 overflow-hidden will-change-transform"
      >
        <div
          className={`absolute inset-0 overflow-hidden will-change-transform transition-transform duration-[2200ms] curtain-sway-ease motion-reduce:transition-none motion-reduce:scale-100 ${
            isZoomedIn ? 'scale-[1.06]' : 'scale-100'
          }`}
        >
          <div className="hero-ken-burns w-full h-full overflow-hidden">
            <div
              data-testid="hero-blur-wrapper"
              style={{
                transform: 'scale(1.06)',
                filter: 'blur(2.5px) contrast(1.08) brightness(0.85)',
              }}
              className="w-full h-full"
            >
              <picture className="block w-full h-full">
                {config.heroMobileImageUrl && (
                  <source
                    media="(max-width: 767px)"
                    srcSet={config.heroMobileImageUrl}
                  />
                )}
                <img
                  data-testid="hero-bg-image"
                  src={config.heroFallbackImageUrl}
                  alt={`${config.coupleNames} royal heritage courtyard decorated with marigolds and glowing diyas`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center saturate-[1.08]"
                />
              </picture>

              {!videoFailed && config.heroVideoUrl && (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={config.heroFallbackImageUrl}
                  onError={() => setVideoFailed(true)}
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src={config.heroVideoUrl} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 2: Cinematic Lighting — Sunset-Amber / Burnt-Orange Vignette + Warm Golden Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 48%, rgba(217, 93, 30, 0.14) 20%, rgba(76, 28, 8, 0.56) 66%, rgba(22, 9, 3, 0.90) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[6]"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(224, 109, 27, 0.24) 0%, rgba(212, 175, 55, 0.16) 36%, transparent 66%)',
        }}
      />

      {/* LAYER 3: Midground Frosted Royal Mughal / Jharokha Arch Depth Card */}
      <div
        data-testid="hero-arch-card"
        className="relative z-10 w-full max-w-[360px] sm:max-w-[540px] md:max-w-[640px] mx-auto drop-shadow-[0_28px_55px_rgba(18,7,2,0.62)]"
      >
        {/* Clipped Frosted Glass Arch Interior */}
        <div
          style={{ clipPath: 'url(#jharokhaArchClip)' }}
          className="relative px-7 pt-16 pb-12 sm:px-14 sm:pt-20 sm:pb-16 bg-[rgba(34,16,7,0.34)] backdrop-blur-[8px] text-center"
        >
          {/* Subtle inner golden luminance behind couple names */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_54%,rgba(224,109,27,0.16)_0%,rgba(212,175,55,0.12)_38%,transparent_66%)]"
          />

          {/* Double Thin Antique Gold Jharokha Arch SVG Border + Corner Filigree */}
          <svg
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full text-[#D4AF37]"
          >
            {/* Outer Thin Gold Arch Border */}
            <path
              d="M 4,996 L 4,222 C 4,162 62,137 122,122 C 191,104 250,70 320,58 C 390,46 450,34 500,10 C 550,34 610,46 680,58 C 750,70 809,104 878,122 C 938,137 996,162 996,222 L 996,996 Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.9"
              vectorEffect="non-scaling-stroke"
            />
            {/* Inner Delicate Gold Arch Border */}
            <path
              d="M 18,982 L 18,232 C 18,175 74,151 133,136 C 200,118 258,85 326,73 C 394,61 452,49 500,26 C 548,49 606,61 674,73 C 742,85 800,118 867,136 C 926,151 982,175 982,232 L 982,982 Z"
              stroke="currentColor"
              strokeWidth="0.85"
              strokeOpacity="0.55"
              vectorEffect="non-scaling-stroke"
            />
            {/* Bottom Corner Filigree L-brackets */}
            <path
              d="M 18,940 V 982 H 64 M 982,940 V 982 H 936 M 32,956 V 970 H 48 M 968,956 V 970 H 952"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.72"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Arch Card Typography Hierarchy */}
          <div className="relative z-10 flex flex-col items-center">
            <RoyalGaneshaMotif className="w-10 h-10 sm:w-11 sm:h-11 text-[#E8CE82] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />

            <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.34em] font-medium text-[#E8CE82]">
              Shubh Vivah
            </p>

            <p className="mt-2 text-xs sm:text-sm tracking-[0.26em] font-normal text-[#FFFFFF]/95 tabular-nums">
              {spacedDate}
            </p>

            <h1 className="mt-7 sm:mt-9 font-serif text-5xl sm:text-7xl md:text-[5.25rem] font-normal tracking-tight leading-[1.06] text-balance bg-gradient-to-b from-[#FFF9E6] via-[#F2CE68] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_6px_16px_rgba(18,7,2,0.82)]">
              {config.coupleNames}
            </h1>

            <GoldLotusDivider className="my-6 sm:my-7" />

            <p className="text-[11px] sm:text-xs uppercase tracking-[0.34em] font-normal text-[#F5E3A8]/95">
              {config.locationShort}
            </p>
          </div>
        </div>
      </div>

      {/* LAYER 4: Foreground Floating Golden Bokeh Particles */}
      <div
        data-testid="hero-bokeh-layer"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[15] overflow-hidden"
      >
        {BOKEH_PARTICLES.map((particle) => {
          const particleStyle: CSSProperties = {
            left: `${particle.leftPct}%`,
            bottom: '-8%',
            width: `${particle.sizePx}px`,
            height: `${particle.sizePx}px`,
            animationDuration: `${particle.durationSec}s`,
            animationDelay: `${particle.delaySec}s`,
            background:
              'radial-gradient(circle, rgba(255, 243, 196, 0.95) 0%, rgba(212, 175, 55, 0.55) 48%, transparent 78%)',
            '--bokeh-opacity': String(particle.opacity),
            '--bokeh-drift': `${particle.driftPx}px`,
          } as CSSProperties;

          return (
            <span
              key={particle.id}
              style={particleStyle}
              className={`hero-bokeh-mote absolute rounded-full ${particle.blurClass}`}
            />
          );
        })}
      </div>

      {/* LAYER 5: Seamless Bottom Fade Transition + Floating Scroll Down Indicator */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 z-20 bg-gradient-to-b from-transparent via-[#FFFDF9]/50 to-[#FFFDF9]"
      />

      <div className="relative z-30 mt-8 sm:mt-10">
        <button
          type="button"
          onClick={handleScrollDown}
          className="group min-h-[44px] px-5 py-2 inline-flex flex-col items-center justify-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-[0.26em] font-normal text-[#FFFFFF]/95 hover:text-[#FFF4CE] drop-shadow-[0_2px_8px_rgba(18,7,2,0.85)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
        >
          <span>{config.heroScrollLabel}</span>
          <ChevronDown
            className="w-4 h-4 text-[#F2CE68] animate-bounce motion-reduce:animate-none"
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
}
