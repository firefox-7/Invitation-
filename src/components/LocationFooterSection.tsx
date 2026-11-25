import { useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';
import {
  buildGoogleMapsEmbedUrl,
  buildGoogleMapsPlaceUrl,
} from '../utils/weddingHelpers';
import { Reveal } from './Reveal';
import { GoldLotusDivider } from './RoyalOrnaments';

interface LocationFooterSectionProps {
  config: WeddingConfig;
}

type MapTarget = 'venue' | 'office';

export function LocationFooterSection({ config }: LocationFooterSectionProps) {
  const [activeMap, setActiveMap] = useState<MapTarget>('venue');

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as
    | string
    | undefined;

  const isVenue = activeMap === 'venue';
  const activeQuery = isVenue
    ? config.location.mapQuery
    : config.location.office.mapQuery;
  const activeFallbackEmbed = isVenue
    ? config.location.fallbackEmbedUrl
    : config.location.office.fallbackEmbedUrl;

  const embedUrl = buildGoogleMapsEmbedUrl({
    apiKey: mapsApiKey,
    query: activeQuery,
    fallbackUrl: activeFallbackEmbed,
  });

  const externalVenueMapsUrl = buildGoogleMapsPlaceUrl(config.location.mapQuery);
  const { office } = config.location;
  const { plannerCredit } = config.footer;

  return (
    <footer
      id="location"
      aria-labelledby="location-heading"
      className="pt-20 sm:pt-28 pb-24 sm:pb-28 px-6 border-t border-[#C59B27]/20"
    >
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center">
          <GoldLotusDivider className="mb-7" />
          <h2
            id="location-heading"
            className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-balance text-[#D95D1E]"
          >
            {config.location.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base font-light text-[#262220]/80">
            <span className="font-medium text-[#D95D1E]">
              {config.location.venueTabLabel}:
            </span>{' '}
            {config.location.venueName} · {config.location.venueAddress}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
          {/* Interactive Map Switcher: Wedding Venue vs Event Patna Office */}
          <div className="flex justify-center mb-6">
            <div
              role="tablist"
              aria-label="Select map location"
              className="inline-flex items-center p-1 border border-[#C59B27]/50 bg-[#FFFFFF] max-w-full"
            >
              <button
                type="button"
                role="tab"
                data-testid="map-tab-venue"
                aria-selected={activeMap === 'venue'}
                onClick={() => setActiveMap('venue')}
                className={`min-h-[40px] px-4 sm:px-6 py-2 text-xs sm:text-sm tracking-wide font-normal transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D95D1E] ${
                  activeMap === 'venue'
                    ? 'bg-[#D95D1E] text-[#FFFFFF]'
                    : 'text-[#262220]/75 hover:text-[#D95D1E]'
                }`}
              >
                {config.location.venueTabLabel}
              </button>
              <button
                type="button"
                role="tab"
                data-testid="map-tab-office"
                aria-selected={activeMap === 'office'}
                onClick={() => setActiveMap('office')}
                className={`min-h-[40px] px-4 sm:px-6 py-2 text-xs sm:text-sm tracking-wide font-normal transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D95D1E] ${
                  activeMap === 'office'
                    ? 'bg-[#D95D1E] text-[#FFFFFF]'
                    : 'text-[#262220]/75 hover:text-[#D95D1E]'
                }`}
              >
                {office.tabLabel}
              </button>
            </div>
          </div>

          <div className="w-full overflow-hidden border border-[#C59B27]/50 p-1 bg-[#FFFFFF]">
            <iframe
              data-testid="location-map-iframe"
              title={
                isVenue
                  ? `Map of ${config.location.venueName}, ${config.location.venueAddress}`
                  : `Map of ${office.cardHeading}, ${office.address}`
              }
              src={embedUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-[320px] sm:h-[420px] border-0 block"
            />
          </div>

          <div className="mt-7 text-center">
            <a
              href={isVenue ? externalVenueMapsUrl : office.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[46px] max-w-full px-6 sm:px-7 py-3 inline-flex items-center justify-center gap-2 bg-[#D95D1E] border border-[#D95D1E] text-[#FFFFFF] text-xs sm:text-sm tracking-[0.12em] font-normal hover:bg-[#B84A14] hover:border-[#D4AF37] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D95D1E]"
            >
              <span>{config.location.openMapsLabel}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#FFF4CE]" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        {/* Event Coordination Office — Event Patna Card */}
        <Reveal delay={0.1} className="mt-10">
          <div
            data-testid="event-patna-office-card"
            className="max-w-2xl mx-auto border border-[#C59B27]/50 p-1.5 bg-[#FFFFFF]"
          >
            <div className="border border-[#C59B27]/25 px-5 py-8 sm:px-10 sm:py-9 text-center">
              <div className="inline-flex items-center justify-center gap-2 text-[#8A6712]">
                <MapPin className="w-4 h-4 text-[#E06D1B] shrink-0" aria-hidden="true" />
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#D95D1E]">
                  {office.cardHeading}
                </h3>
              </div>

              <p className="mt-3 text-sm sm:text-[15px] leading-[1.8] font-light text-[#262220]/80 max-w-lg mx-auto">
                {office.address}
              </p>

              <div className="mt-6">
                <a
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] max-w-full px-4 sm:px-6 py-2.5 inline-flex items-center justify-center gap-2 bg-[#D95D1E] border border-[#D95D1E] text-[#FFFFFF] text-[11px] sm:text-sm tracking-[0.06em] sm:tracking-[0.1em] font-normal hover:bg-[#B84A14] hover:border-[#D4AF37] transition-colors text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D95D1E]"
                >
                  <span>{office.openMapsLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#FFF4CE]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Closing Message & Luxury Planner Branding */}
        <Reveal
          delay={0.12}
          className="mt-16 sm:mt-20 pt-12 border-t border-[#C59B27]/20 text-center"
        >
          <p className="font-serif text-2xl sm:text-3xl font-normal italic text-[#D95D1E] text-balance">
            {config.footer.closingLine}
          </p>

          <GoldLotusDivider className="my-10" />

          <div
            data-testid="footer-planner-credit"
            className="flex flex-col items-center text-center"
          >
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] font-medium text-[#8A6712]">
              {plannerCredit.eyebrow}
            </p>

            <a
              href={plannerCredit.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 font-serif text-2xl sm:text-3xl font-medium tracking-[0.14em] text-[#D95D1E] hover:text-[#B84A14] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D95D1E]"
            >
              {plannerCredit.brandName}
            </a>

            <p className="mt-2 text-xs sm:text-sm font-light text-[#262220]/75">
              {plannerCredit.tagline}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs tracking-wide text-[#262220]/75">
              <a
                href={`tel:${plannerCredit.phoneNumberRaw}`}
                className="tabular-nums hover:text-[#D95D1E] transition-colors whitespace-nowrap"
              >
                {plannerCredit.phoneDisplay}
              </a>
              <span aria-hidden="true" className="text-[#C59B27]">
                •
              </span>
              <a
                href={`mailto:${plannerCredit.email}`}
                className="hover:text-[#D95D1E] transition-colors whitespace-nowrap"
              >
                {plannerCredit.email}
              </a>
              <span aria-hidden="true" className="text-[#C59B27]">
                •
              </span>
              <a
                href={plannerCredit.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D95D1E] transition-colors whitespace-nowrap"
              >
                {plannerCredit.websiteDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
