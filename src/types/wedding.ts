export interface TimelineEventItem {
  time: string;
  title: string;
}

export interface TimelineDay {
  dayLabel: string;
  date: string;
  venueName: string;
  venueAddress: string;
  events: TimelineEventItem[];
}

export interface JourneySlide {
  id: string;
  title: string;
  date: string;
  caption: string;
  imageUrl: string;
  alt: string;
}

export interface DressCodeSwatch {
  name: string;
  hex: string;
}

export interface WeddingConfig {
  coupleNames: string;
  displayDate: string;
  locationShort: string;
  heroVideoUrl: string;
  heroFallbackImageUrl: string;
  heroMobileImageUrl?: string;
  heroScrollLabel: string;
  creatorBadge?: {
    enabled: boolean;
    initials: string;
    label: string;
    author: string;
  };
  music: {
    enabled: boolean;
    audioUrl: string;
    fallbackAudioUrl: string;
    volume: number;
    fadeDurationMs: number;
    playLabel: string;
    pauseLabel: string;
  };
  welcome: {
    heading: string;
    message: string;
  };
  ourJourney: {
    heading: string;
    subtitle: string;
    previousLabel: string;
    nextLabel: string;
    slides: JourneySlide[];
  };
  countdown: {
    heading: string;
    targetIsoDate: string;
    completedMessage: string;
  };
  timeline: {
    heading: string;
    days: TimelineDay[];
  };
  dressCode: {
    heading: string;
    message: string;
    swatches: DressCodeSwatch[];
  };
  assistance: {
    eyebrow: string;
    heading: string;
    message: string;
    coordinatorName: string;
    phoneDisplay: string;
    phoneNumberRaw: string;
    whatsappDigits: string;
    whatsappLabel: string;
    whatsappMessage: string;
    email: string;
    blessingNote: string;
  };
  heartfeltRequest: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    closingLine: string;
    signature: string;
    calendarButtonLabel: string;
    calendarEvent: {
      title: string;
      description: string;
      location: string;
      startIso: string;
      endIso: string;
      fileName: string;
    };
  };
  location: {
    heading: string;
    venueTabLabel: string;
    venueName: string;
    venueAddress: string;
    mapQuery: string;
    fallbackEmbedUrl: string;
    openMapsLabel: string;
    office: {
      tabLabel: string;
      cardHeading: string;
      address: string;
      mapQuery: string;
      fallbackEmbedUrl: string;
      mapsUrl: string;
      openMapsLabel: string;
    };
  };
  footer: {
    closingLine: string;
    plannerCredit: {
      eyebrow: string;
      brandName: string;
      websiteUrl: string;
      websiteDisplay: string;
      tagline: string;
      phoneDisplay: string;
      phoneNumberRaw: string;
      email: string;
    };
  };
}

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}
