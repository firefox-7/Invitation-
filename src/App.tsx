/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { OurJourneySection } from './components/OurJourneySection';
import { CountdownSection } from './components/CountdownSection';
import { TimelineSection } from './components/TimelineSection';
import { DressCodeSection } from './components/DressCodeSection';
import { AssistanceSection } from './components/AssistanceSection';
import { HeartfeltRequestSection } from './components/HeartfeltRequestSection';
import { LocationFooterSection } from './components/LocationFooterSection';
import { OpeningCurtainOverlay } from './components/OpeningCurtainOverlay';
import { AmbientMusicPlayer } from './components/AmbientMusicPlayer';
import { CreatorWatermarkBadge } from './components/CreatorWatermarkBadge';
import {
  OPENING_TIMING,
  type OpeningPhase,
} from './utils/weddingHelpers';
import type { WeddingConfig } from './types/wedding';

/**
 * ============================================================================
 * WEDDING_CONFIG — Edit everything below to customize for your wedding client
 * ============================================================================
 */
export const WEDDING_CONFIG: WeddingConfig = {
  // 1. Couple & Hero Details
  coupleNames: 'Aarav & Ananya',
  displayDate: '15.02.2027',
  locationShort: 'Patna, Bihar',
  // Optional muted auto-playing looping background video URL (empty uses royal palace image)
  heroVideoUrl: '',
  // High-resolution Royal Udaipur heritage palace courtyard with marigolds and diyas
  heroFallbackImageUrl:
    '/src/assets/images/hero_royal_palace_courtyard_1795625137232.jpg',
  // Vertical 9:16 mobile palace courtyard image for crisp smartphone resolution
  heroMobileImageUrl:
    '/src/assets/images/hero_royal_palace_mobile_1795625862275.jpg',
  heroScrollLabel: 'Scroll down',

  // 1a. Creator Demo Invite Crest Badge (top-left)
  creatorBadge: {
    enabled: true,
    initials: 'JS',
    label: 'Demo Invite',
    author: 'by Jaijeet Satyam',
  },

  // 1b. Subtle Instrumental Background Music (Indian Classical Sitar)
  music: {
    enabled: true,
    // Royalty-free Indian classical sitar instrumental (MP3 + OGG fallback)
    audioUrl:
      'https://archive.org/download/HindustaniClassicalConcerts/Musical%20Jugalbandi%20by%20Lakshay%20and%20%20Aayush%20Mohan%20Gupta.mp3',
    fallbackAudioUrl:
      'https://upload.wikimedia.org/wikipedia/commons/1/14/Sitar_sample_yaman.ogg',
    // Whisper-soft ambient volume (~4%)
    volume: 0.04,
    fadeDurationMs: 1200,
    playLabel: 'Play ambient sitar music',
    pauseLabel: 'Mute ambient sitar music',
  },

  // 2. Welcome Note
  welcome: {
    heading: 'Dear friends and family',
    message:
      'With the blessings of our elders, we are overjoyed to invite you to celebrate the beginning of our forever. We cannot imagine this special day without our closest people and would love for you to join us in Patna.',
  },

  // 2b. Our Journey Photo Slider
  ourJourney: {
    heading: 'Our Journey',
    subtitle: 'Quiet milestones that brought our two worlds together.',
    previousLabel: 'Previous milestone photo',
    nextLabel: 'Next milestone photo',
    slides: [
      {
        id: 'first-meeting',
        title: 'Where It Began',
        date: 'October 2022',
        caption:
          'An unhurried afternoon over spiced chai that quietly turned into hours of conversation.',
        imageUrl: '/src/assets/images/journey_first_meeting_1795624938240.jpg',
        alt: 'Two ivory ceramic cups beside blush roses and a linen notebook on a sunlit travertine table',
      },
      {
        id: 'jaipur-evening',
        title: 'A Twilight in Jaipur',
        date: 'December 2023',
        caption:
          'Walking beneath jasmine-draped sandstone arches as lantern light warmed the winter air.',
        imageUrl: '/src/assets/images/journey_jaipur_evening_1795624938163.jpg',
        alt: 'Heritage sandstone courtyard archway adorned with jasmine, blush roses, and glowing brass lanterns at twilight',
      },
      {
        id: 'the-proposal',
        title: 'A Sunset Stroll',
        date: 'March 2025',
        caption:
          'Walking hand in hand beneath sunlit palace arches lined with marigold petals.',
        imageUrl: '/src/assets/images/journey_royal_garden_walk_1795625137060.jpg',
        alt: 'Couple walking hand in hand beneath carved sandstone palace arches at golden hour',
      },
      {
        id: 'family-blessings',
        title: 'Two Families, One Celebration',
        date: 'November 2026',
        caption:
          'With the warmth and blessings of our elders, our countdown to Patna truly began.',
        imageUrl:
          '/src/assets/images/journey_family_blessings_v2_1795624956618.jpg',
        alt: 'Ivory cotton parchment with gold wax seal beside blush rose petals, olive sprigs, and a brass kalash',
      },
    ],
  },

  // 3. Live Countdown Timer (ISO 8601 format with +05:30 for IST)
  countdown: {
    heading: 'Counting down to the celebration',
    targetIsoDate: '2027-02-15T19:00:00+05:30',
    completedMessage: 'The celebration has begun!',
  },

  // 4. Event Timeline (2-Day Schedule)
  timeline: {
    heading: 'Wedding Schedule',
    days: [
      {
        dayLabel: 'Day 1',
        date: '14.02.2027',
        venueName: 'The Panache',
        venueAddress: 'South Gandhi Maidan, Patna',
        events: [
          { time: '11:30 AM', title: 'Haldi & Mehendi' },
          { time: '07:30 PM', title: 'Sangeet & Dinner' },
        ],
      },
      {
        dayLabel: 'Day 2',
        date: '15.02.2027',
        venueName: 'Hotel Maurya',
        venueAddress: 'Fraser Road, Patna',
        events: [
          { time: '07:00 PM', title: 'Baraat Welcome' },
          { time: '08:30 PM', title: 'Varmala & Reception Dinner' },
          { time: '11:00 PM', title: 'Pheras' },
        ],
      },
    ],
  },

  // 5. Dress Code & Palette Swatches
  dressCode: {
    heading: 'Dress Code',
    message:
      'We would love to see you dressed in Traditional Indian or Indo-Western attire inspired by our wedding palette.',
    swatches: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Royal Saffron', hex: '#C94A1A' },
      { name: 'Antique Gold', hex: '#D4AF37' },
      { name: 'Soft Peach', hex: '#FAD4B8' },
      { name: 'Warm Ivory', hex: '#FDFBF7' },
    ],
  },

  // 6. Guest Assistance & Hospitality (Managed by Event Patna)
  assistance: {
    eyebrow: 'GUEST ASSISTANCE & HOSPITALITY',
    heading: 'Managed by Event Patna',
    message:
      'For travel, accommodation, venue coordination, or any assistance in Patna, our official wedding planning team is here to help you.',
    coordinatorName: 'Event Patna',
    phoneDisplay: '+91 99058 05206',
    phoneNumberRaw: '+919905805206',
    whatsappDigits: '919905805206',
    whatsappLabel: 'WhatsApp Planner',
    whatsappMessage:
      "Hello Event Patna, I need assistance regarding Aarav & Ananya's wedding.",
    email: 'info@eventpatna.com',
    blessingNote: 'Your presence and blessings are the only gift we ask for.',
  },

  // 7. Heartfelt Wedding Request & Save-the-Date Calendar Details
  heartfeltRequest: {
    eyebrow: 'A HEARTFELT REQUEST',
    heading: 'Your Presence Means Everything to Us',
    paragraphs: [
      'A celebration is only truly complete when shared with the people who mean the most to us. With folded hands and full hearts, we humbly request you to please grace this joyous occasion with your presence and bless Aarav & Ananya as they begin their new journey together.',
      'Please do not let distance or busy schedules keep you away—we will be eagerly waiting to welcome you and your family with open arms in Patna. Your presence and blessings are the greatest gift we could ever ask for.',
    ],
    closingLine: 'Eagerly awaiting your arrival,',
    signature: 'With love & warm regards, The Entire Family',
    calendarButtonLabel: 'Add to Calendar',
    calendarEvent: {
      title: 'Wedding of Aarav & Ananya',
      description:
        'Join us with your family and blessings to celebrate the wedding of Aarav & Ananya in Patna, Bihar.',
      location: 'Hotel Maurya, Fraser Road, Patna, Bihar',
      startIso: '2027-02-15T19:00:00+05:30',
      endIso: '2027-02-16T01:00:00+05:30',
      fileName: 'aarav-ananya-wedding.ics',
    },
  },

  // 8. Location, Coordination Office & Luxury Planner Footer
  location: {
    heading: 'Venue & Directions',
    venueTabLabel: 'Wedding Venue',
    venueName: 'Hotel Maurya',
    venueAddress: 'Fraser Road, Patna, Bihar',
    mapQuery: 'Hotel Maurya, Fraser Road, Patna, Bihar',
    fallbackEmbedUrl:
      'https://maps.google.com/maps?q=Hotel+Maurya,+Fraser+Road,+Patna,+Bihar&t=&z=15&ie=UTF8&iwloc=&output=embed',
    openMapsLabel: 'Open in Google Maps',
    office: {
      tabLabel: 'Event Patna Office',
      cardHeading: 'Event Coordination Office — Event Patna',
      address:
        'Raushan Enclave, Patthar Gali, Janta Road, New Yarpur, Gardanibagh, Patna, Bihar 800001',
      mapQuery:
        'Raushan Enclave, Patthar Gali, Janta Road, New Yarpur, Gardanibagh, Patna, Bihar 800001',
      fallbackEmbedUrl:
        'https://maps.google.com/maps?q=Raushan+Enclave,+Patthar+Gali,+Janta+Road,+New+Yarpur,+Gardanibagh,+Patna,+Bihar+800001&t=&z=15&ie=UTF8&iwloc=&output=embed',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Raushan+Enclave+Patthar+Gali+Janta+Road+New+Yarpur+Gardanibagh+Patna+800001',
      openMapsLabel: 'View Event Patna on Google Maps',
    },
  },

  footer: {
    closingLine: 'Hope to see you there — Aarav & Ananya',
    plannerCredit: {
      eyebrow: 'LUXURY WEDDING PLANNED & CURATED BY',
      brandName: 'EVENT PATNA',
      websiteUrl: 'https://eventpatna.com/',
      websiteDisplay: 'eventpatna.com',
      tagline: 'End-to-End Luxury Wedding Planners • Patna, Bihar',
      phoneDisplay: '+91 99058 05206',
      phoneNumberRaw: '+919905805206',
      email: 'info@eventpatna.com',
    },
  },
};

export default function App() {
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);
  const [openingPhase, setOpeningPhase] = useState<OpeningPhase>('preloader');

  useEffect(() => {
    const handleQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () =>
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const quickTimer = window.setTimeout(() => {
        setOpeningPhase('complete');
      }, OPENING_TIMING.REDUCED_MOTION_END_MS);
      return () => window.clearTimeout(quickTimer);
    }

    const monogramExitTimer = window.setTimeout(() => {
      setOpeningPhase('monogram-exit');
    }, OPENING_TIMING.PRELOADER_DURATION_MS);

    const curtainTimer = window.setTimeout(() => {
      setOpeningPhase('curtains');
    }, OPENING_TIMING.MONOGRAM_FADE_END_MS);

    const completeTimer = window.setTimeout(() => {
      setOpeningPhase('complete');
    }, OPENING_TIMING.CURTAIN_REVEAL_END_MS);

    return () => {
      window.clearTimeout(monogramExitTimer);
      window.clearTimeout(curtainTimer);
      window.clearTimeout(completeTimer);
    };
  }, []);

  useEffect(() => {
    if (openingPhase === 'complete') {
      return;
    }

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [openingPhase]);

  return (
    <div className="min-h-screen royal-mandala-backdrop text-[#262220] flex flex-col">
      <OpeningCurtainOverlay
        coupleNames={WEDDING_CONFIG.coupleNames}
        displayDate={WEDDING_CONFIG.displayDate}
        phase={openingPhase}
      />

      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <main className="flex-1">
        <HeroSection config={WEDDING_CONFIG} openingPhase={openingPhase} />
        <WelcomeSection config={WEDDING_CONFIG} />
        <OurJourneySection config={WEDDING_CONFIG} />
        <CountdownSection config={WEDDING_CONFIG} />
        <TimelineSection config={WEDDING_CONFIG} />
        <DressCodeSection config={WEDDING_CONFIG} />
        <AssistanceSection config={WEDDING_CONFIG} />
        <HeartfeltRequestSection config={WEDDING_CONFIG} />
      </main>

      <LocationFooterSection config={WEDDING_CONFIG} />

      <CreatorWatermarkBadge
        badge={WEDDING_CONFIG.creatorBadge}
        isVisible={openingPhase === 'complete'}
      />

      <AmbientMusicPlayer
        config={WEDDING_CONFIG.music}
        isVisible={openingPhase === 'complete'}
      />
    </div>
  );
}
