import { MapPin } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';
import { Reveal } from './Reveal';
import { GoldLotusDivider, IndianEventIcon } from './RoyalOrnaments';

interface TimelineSectionProps {
  config: WeddingConfig;
}

export function TimelineSection({ config }: TimelineSectionProps) {
  return (
    <section
      id="schedule"
      aria-labelledby="timeline-heading"
      className="py-20 sm:py-28 px-6 border-t border-[#C59B27]/20"
    >
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-14 sm:mb-18">
          <GoldLotusDivider className="mb-7" />
          <h2
            id="timeline-heading"
            className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-balance text-[#D95D1E]"
          >
            {config.timeline.heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
          {config.timeline.days.map((day, dayIndex) => (
            <Reveal
              key={day.dayLabel + day.date}
              delay={dayIndex * 0.08}
              className="border border-[#C59B27]/50 p-1.5 bg-[#FFFFFF]"
            >
              <div className="h-full border border-[#C59B27]/25 p-6 sm:p-8 flex flex-col">
                <div className="pb-6 border-b border-[#C59B27]/25">
                  <p className="text-xs tracking-[0.2em] font-medium text-[#8A6712] tabular-nums">
                    {day.dayLabel} — {day.date}
                  </p>
                  <h3 className="mt-2.5 font-serif text-2xl sm:text-3xl font-normal text-[#D95D1E]">
                    {day.venueName}
                  </h3>
                  <p className="mt-1.5 inline-flex items-start gap-1.5 text-sm font-light text-[#262220]/75">
                    <MapPin
                      className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#E06D1B]"
                      aria-hidden="true"
                    />
                    <span>{day.venueAddress}</span>
                  </p>
                </div>

                <ul className="divide-y divide-[#C59B27]/20">
                  {day.events.map((item) => (
                    <li
                      key={item.time + item.title}
                      className="py-5 flex items-center gap-4 sm:gap-5"
                    >
                      <span className="w-20 sm:w-24 shrink-0 text-xs sm:text-sm font-medium tracking-wide tabular-nums text-[#262220]/70">
                        {item.time}
                      </span>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <IndianEventIcon title={item.title} />
                        <span className="font-serif text-xl sm:text-2xl font-normal text-[#262220]">
                          {item.title}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
