import { Mail, MessageCircle, Phone } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';
import { buildWhatsAppMessageUrl } from '../utils/weddingHelpers';
import { Reveal } from './Reveal';
import { GoldLotusDivider } from './RoyalOrnaments';

interface AssistanceSectionProps {
  config: WeddingConfig;
}

export function AssistanceSection({ config }: AssistanceSectionProps) {
  const whatsappDirectUrl = buildWhatsAppMessageUrl(
    config.assistance.whatsappDigits,
    config.assistance.whatsappMessage
  );

  return (
    <section
      id="assistance"
      aria-labelledby="assistance-heading"
      className="py-20 sm:py-28 px-6 border-t border-[#B38728]/20"
    >
      <Reveal className="max-w-2xl mx-auto text-center">
        <GoldLotusDivider className="mb-7" />

        <p className="text-[11px] sm:text-xs uppercase tracking-[0.26em] font-medium text-[#8A6712]">
          {config.assistance.eyebrow}
        </p>

        <h2
          id="assistance-heading"
          className="mt-3 font-serif text-3xl sm:text-4xl font-normal tracking-tight text-balance royal-heading-gradient"
        >
          {config.assistance.heading}
        </h2>

        <p className="mt-5 text-[15px] sm:text-base leading-[1.85] font-light text-[#262220]/85">
          {config.assistance.message}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <a
            href={`tel:${config.assistance.phoneNumberRaw}`}
            className="w-full sm:w-auto min-h-[46px] px-7 py-3 inline-flex items-center justify-center gap-2.5 royal-crimson-btn text-xs sm:text-sm tracking-wide font-normal whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A82E18]"
          >
            <Phone className="w-4 h-4 shrink-0 text-[#FCF6BA]" aria-hidden="true" />
            <span className="tabular-nums">{config.assistance.phoneDisplay}</span>
          </a>

          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[46px] px-7 py-3 inline-flex items-center justify-center gap-2.5 royal-crimson-btn text-xs sm:text-sm tracking-wide font-normal whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A82E18]"
          >
            <MessageCircle className="w-4 h-4 shrink-0 text-[#FCF6BA]" aria-hidden="true" />
            <span>{config.assistance.whatsappLabel}</span>
          </a>
        </div>

        <div className="mt-5">
          <a
            href={`mailto:${config.assistance.email}`}
            className="min-h-[44px] px-4 py-2 inline-flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide font-normal text-[#A82E18] hover:text-[#5E150B] underline decoration-[#B38728]/75 underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A82E18]"
          >
            <Mail className="w-3.5 h-3.5 shrink-0 text-[#A82E18]" aria-hidden="true" />
            <span>{config.assistance.email}</span>
          </a>
        </div>

        <GoldLotusDivider className="my-10" />

        <p className="font-serif text-xl sm:text-2xl italic text-[#A82E18] text-balance">
          {config.assistance.blessingNote}
        </p>
      </Reveal>
    </section>
  );
}
