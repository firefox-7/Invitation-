import type { WeddingConfig } from '../types/wedding';
import { Reveal } from './Reveal';
import { GoldLotusDivider } from './RoyalOrnaments';

interface WelcomeSectionProps {
  config: WeddingConfig;
}

export function WelcomeSection({ config }: WelcomeSectionProps) {
  return (
    <section
      id="welcome"
      aria-labelledby="welcome-heading"
      className="py-24 sm:py-32 px-6"
    >
      <Reveal className="max-w-2xl mx-auto text-center">
        <GoldLotusDivider className="mb-8" />
        <h2
          id="welcome-heading"
          className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-balance text-[#D95D1E]"
        >
          {config.welcome.heading}
        </h2>
        <p className="mt-7 text-[15px] sm:text-base leading-[1.9] font-light text-[#262220]/85">
          {config.welcome.message}
        </p>
      </Reveal>
    </section>
  );
}
