import { useEffect, useState } from 'react';
import type { WeddingConfig } from '../types/wedding';
import { calculateCountdown, padTimeUnit } from '../utils/weddingHelpers';
import { Reveal } from './Reveal';
import { GoldCornerFiligree, GoldLotusDivider } from './RoyalOrnaments';

interface CountdownSectionProps {
  config: WeddingConfig;
}

export function CountdownSection({ config }: CountdownSectionProps) {
  const [countdown, setCountdown] = useState(() =>
    calculateCountdown(config.countdown.targetIsoDate)
  );

  useEffect(() => {
    setCountdown(calculateCountdown(config.countdown.targetIsoDate));
    const timerId = window.setInterval(() => {
      setCountdown(calculateCountdown(config.countdown.targetIsoDate));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [config.countdown.targetIsoDate]);

  const units = [
    { label: 'Days', value: padTimeUnit(countdown.days) },
    { label: 'Hours', value: padTimeUnit(countdown.hours) },
    { label: 'Minutes', value: padTimeUnit(countdown.minutes) },
    { label: 'Seconds', value: padTimeUnit(countdown.seconds) },
  ];

  return (
    <section
      aria-labelledby="countdown-heading"
      className="py-20 sm:py-28 px-6 border-t border-[#B38728]/20"
    >
      <Reveal className="max-w-3xl mx-auto text-center">
        <GoldLotusDivider className="mb-7" />
        <h2
          id="countdown-heading"
          className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-balance royal-heading-gradient"
        >
          {config.countdown.heading}
        </h2>

        {countdown.isComplete ? (
          <p className="mt-10 font-serif text-2xl sm:text-3xl italic text-[#8A6712]">
            {config.countdown.completedMessage}
          </p>
        ) : (
          <div
            data-testid="countdown-timer"
            className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 max-w-2xl mx-auto"
          >
            {units.map((unit) => (
              <div
                key={unit.label}
                className="gold-foil-border p-[1px] shadow-[0_10px_28px_-18px_rgba(94,21,11,0.28)]"
              >
                <div className="relative flex flex-col items-center justify-center py-6 sm:py-7 px-3 bg-[#FFFFFF]">
                  <GoldCornerFiligree
                    position="top-left"
                    sizeClass="w-4 h-4 sm:w-4.5 sm:h-4.5"
                  />
                  <GoldCornerFiligree
                    position="top-right"
                    sizeClass="w-4 h-4 sm:w-4.5 sm:h-4.5"
                  />
                  <GoldCornerFiligree
                    position="bottom-left"
                    sizeClass="w-4 h-4 sm:w-4.5 sm:h-4.5"
                  />
                  <GoldCornerFiligree
                    position="bottom-right"
                    sizeClass="w-4 h-4 sm:w-4.5 sm:h-4.5"
                  />
                  <span className="font-serif text-4xl sm:text-5xl font-normal tracking-tight tabular-nums royal-heading-gradient">
                    {unit.value}
                  </span>
                  <span className="mt-2 text-[11px] sm:text-xs tracking-[0.18em] font-normal text-[#262220]/70">
                    {unit.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 text-xs tracking-[0.16em] text-[#262220]/65">
          15 February 2027 · 7:00 PM IST
        </p>
      </Reveal>
    </section>
  );
}
