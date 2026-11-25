import { useState } from 'react';
import { CalendarPlus, Check } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';
import { buildWeddingIcsContent } from '../utils/weddingHelpers';
import { Reveal } from './Reveal';
import { GoldCornerFiligree, GoldLotusDivider } from './RoyalOrnaments';

interface HeartfeltRequestSectionProps {
  config: WeddingConfig;
}

export function HeartfeltRequestSection({
  config,
}: HeartfeltRequestSectionProps) {
  const [downloaded, setDownloaded] = useState(false);
  const { heartfeltRequest } = config;

  const handleAddToCalendar = () => {
    const icsContent = buildWeddingIcsContent(heartfeltRequest.calendarEvent);
    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = heartfeltRequest.calendarEvent.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <section
      id="invitation-request"
      aria-labelledby="heartfelt-request-heading"
      className="py-20 sm:py-28 px-6 border-t border-[#C59B27]/20"
    >
      <Reveal className="max-w-2xl mx-auto">
        <div className="border border-[#C59B27]/50 p-1.5 bg-[#FFFFFF]">
          <div className="relative border border-[#C59B27]/25 px-7 py-12 sm:px-14 sm:py-16 text-center">
            <GoldCornerFiligree position="top-left" />
            <GoldCornerFiligree position="top-right" />
            <GoldCornerFiligree position="bottom-left" />
            <GoldCornerFiligree position="bottom-right" />

            <GoldLotusDivider className="mb-7" />

            <p className="text-[11px] sm:text-xs uppercase tracking-[0.26em] font-medium text-[#8A6712]">
              {heartfeltRequest.eyebrow}
            </p>

            <h2
              id="heartfelt-request-heading"
              className="mt-4 font-serif text-3xl sm:text-5xl font-normal tracking-tight leading-[1.15] text-balance text-[#D95D1E]"
            >
              {heartfeltRequest.heading}
            </h2>

            <div className="mt-8 space-y-5 max-w-xl mx-auto">
              {heartfeltRequest.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[15px] sm:text-base leading-[1.85] font-light text-[#262220]/85"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <GoldLotusDivider className="my-9" />

            <p className="font-serif text-xl sm:text-2xl italic text-[#D95D1E]/95">
              {heartfeltRequest.closingLine}
            </p>
            <p className="mt-2 text-xs sm:text-sm tracking-[0.12em] font-normal text-[#262220]/75">
              {heartfeltRequest.signature}
            </p>

            <div className="mt-9">
              <button
                type="button"
                onClick={handleAddToCalendar}
                className="min-h-[44px] px-7 py-3 inline-flex items-center justify-center gap-2.5 bg-[#D95D1E] border border-[#D95D1E] text-[#FFFFFF] text-xs sm:text-sm tracking-[0.14em] font-normal hover:bg-[#B84A14] hover:border-[#D4AF37] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D95D1E]"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4 shrink-0 text-[#FFF4CE]" aria-hidden="true" />
                    <span>Saved to Calendar</span>
                  </>
                ) : (
                  <>
                    <CalendarPlus
                      className="w-4 h-4 shrink-0 text-[#FFF4CE]"
                      aria-hidden="true"
                    />
                    <span>{heartfeltRequest.calendarButtonLabel}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
