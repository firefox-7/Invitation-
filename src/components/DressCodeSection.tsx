import type { WeddingConfig } from '../types/wedding';
import { Reveal } from './Reveal';
import { GoldLotusDivider } from './RoyalOrnaments';

interface DressCodeSectionProps {
  config: WeddingConfig;
}

export function DressCodeSection({ config }: DressCodeSectionProps) {
  return (
    <section
      id="dress-code"
      aria-labelledby="dress-code-heading"
      className="py-20 sm:py-28 px-6 border-t border-[#C59B27]/20"
    >
      <Reveal className="max-w-2xl mx-auto text-center">
        <GoldLotusDivider className="mb-7" />
        <h2
          id="dress-code-heading"
          className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-balance text-[#D95D1E]"
        >
          {config.dressCode.heading}
        </h2>
        <p className="mt-5 text-[15px] sm:text-base leading-[1.8] font-light text-[#262220]/85">
          {config.dressCode.message}
        </p>

        <div
          className="mt-10 sm:mt-12 flex flex-wrap items-start justify-center gap-6 sm:gap-9"
          role="list"
          aria-label="Wedding dress code color palette"
        >
          {config.dressCode.swatches.map((swatch) => (
            <div
              key={swatch.name}
              role="listitem"
              className="flex flex-col items-center w-20 sm:w-24"
            >
              <svg
                viewBox="0 0 64 64"
                className="w-14 h-14 sm:w-16 sm:h-16"
                role="img"
                aria-label={`${swatch.name} (${swatch.hex})`}
              >
                <circle
                  cx="32"
                  cy="32"
                  r="30.5"
                  fill="none"
                  stroke="#C59B27"
                  strokeOpacity="0.55"
                  strokeWidth="0.9"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="27"
                  fill={swatch.hex}
                  stroke="rgba(38, 34, 32, 0.16)"
                  strokeWidth="1"
                />
              </svg>
              <span className="mt-3 text-xs font-normal tracking-wide text-[#262220]/85">
                {swatch.name}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
