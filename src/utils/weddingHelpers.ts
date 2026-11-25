import type { CountdownState, WeddingConfig } from '../types/wedding';

export const OPENING_TIMING = {
  PRELOADER_DURATION_MS: 1800,
  CURTAIN_REVEAL_END_MS: 4000,
  REDUCED_MOTION_END_MS: 900,
} as const;

export type OpeningPhase = 'preloader' | 'curtains' | 'complete';

export type MusicPlaybackState =
  | 'idle'
  | 'playing'
  | 'awaiting-gesture'
  | 'paused-by-user'
  | 'paused-by-screen';

/**
 * Clamps an audio volume level safely between 0 and 1.
 */
export function clampVolume(volume: number): number {
  if (!Number.isFinite(volume)) return 0.04;
  return Math.min(1, Math.max(0, volume));
}

/**
 * Computes the current volume during a smooth linear/ease-out fade-in ramp.
 */
export function computeFadeStepVolume(
  targetVolume: number,
  elapsedMs: number,
  durationMs: number
): number {
  const safeTarget = clampVolume(targetVolume);
  if (durationMs <= 0 || elapsedMs >= durationMs) {
    return safeTarget;
  }
  if (elapsedMs <= 0) {
    return 0;
  }
  const progress = Math.min(1, elapsedMs / durationMs);
  return safeTarget * progress;
}

/**
 * Determines the next playback state when the user explicitly clicks the music toggle button.
 */
export function getNextMusicToggleState(
  currentState: MusicPlaybackState
): 'playing' | 'paused-by-user' {
  return currentState === 'playing' ? 'paused-by-user' : 'playing';
}

/**
 * Returns true only if the player was blocked by browser autoplay policy and should start on first tap.
 */
export function shouldResumeOnFirstGesture(
  currentState: MusicPlaybackState
): boolean {
  return currentState === 'awaiting-gesture';
}

/**
 * Returns true when the page/screen is hidden or backgrounded and ambient audio must stop.
 */
export function shouldStopMusicForVisibility(options: {
  hidden: boolean;
  visibilityState?: string;
}): boolean {
  if (options.hidden) return true;
  if (options.visibilityState && options.visibilityState !== 'visible') {
    return true;
  }
  return false;
}

/**
 * Returns true when window focus is lost because the user left the screen/app.
 * Allows interacting with embedded same-page iframes (e.g. Google Maps) while visible.
 */
export function shouldStopMusicForBlur(options: {
  hidden: boolean;
  visibilityState?: string;
  activeElementTagName?: string | null;
}): boolean {
  if (shouldStopMusicForVisibility(options)) {
    return true;
  }
  if (options.activeElementTagName?.toUpperCase() === 'IFRAME') {
    return false;
  }
  return true;
}

/**
 * Derives monogram initials (e.g., "A & A") from coupleNames (e.g., "Aarav & Ananya").
 */
export function deriveCoupleInitials(coupleNames: string): string {
  const parts = coupleNames
    .split(/&|and|\+/i)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    const first = parts[0].charAt(0).toUpperCase();
    const second = parts[1].charAt(0).toUpperCase();
    return `${first} & ${second}`;
  }

  const single = coupleNames.trim().charAt(0).toUpperCase();
  return single || 'A & A';
}

/**
 * Calculates remaining Days, Hours, Minutes, and Seconds until a target ISO timestamp.
 */
export function calculateCountdown(
  targetIso: string,
  nowMs: number = Date.now()
): CountdownState {
  const targetMs = new Date(targetIso).getTime();

  if (Number.isNaN(targetMs)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    };
  }

  const diffMs = targetMs - nowMs;

  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isComplete: false,
  };
}

/**
 * Formats countdown digits with a leading zero when under 10.
 */
export function padTimeUnit(value: number): string {
  const safeValue = Math.max(0, Math.floor(value));
  return safeValue < 10 ? `0${safeValue}` : String(safeValue);
}

/**
 * Formats an ISO timestamp into UTC iCalendar format (YYYYMMDDTHHMMSSZ).
 */
export function formatIcsUtcTimestamp(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ISO timestamp: ${isoString}`);
  }
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const hh = String(date.getUTCHours()).padStart(2, '0');
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const ss = String(date.getUTCSeconds()).padStart(2, '0');
  return `${yyyy}${mm}${dd}T${hh}${min}${ss}Z`;
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

/**
 * Generates an RFC 5545 .ics calendar invite string for the wedding event.
 */
export function buildWeddingIcsContent(
  eventConfig: WeddingConfig['heartfeltRequest']['calendarEvent'],
  nowMs: number = Date.now()
): string {
  const dtStart = formatIcsUtcTimestamp(eventConfig.startIso);
  const dtEnd = formatIcsUtcTimestamp(eventConfig.endIso);
  const dtStamp = formatIcsUtcTimestamp(new Date(nowMs).toISOString());

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//Calendar Invite//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${dtStart}@invitation.local`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsText(eventConfig.title)}`,
    `DESCRIPTION:${escapeIcsText(eventConfig.description)}`,
    `LOCATION:${escapeIcsText(eventConfig.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Builds the embedded Google Maps iframe URL using Maps Embed API when an API key is configured,
 * falling back cleanly to the configurable embed URL otherwise.
 */
export function buildGoogleMapsEmbedUrl(options: {
  apiKey?: string;
  query: string;
  fallbackUrl: string;
}): string {
  const trimmedKey = options.apiKey?.trim();
  if (trimmedKey) {
    const params = new URLSearchParams({
      key: trimmedKey,
      q: options.query,
      zoom: '15',
    });
    return `https://www.google.com/maps/embed/v1/place?${params.toString()}`;
  }

  return options.fallbackUrl;
}

/**
 * Builds a direct Google Maps destination URL for the "Open in Google Maps" button.
 */
export function buildGoogleMapsPlaceUrl(query: string): string {
  const params = new URLSearchParams({
    api: '1',
    query,
  });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}

/**
 * Wraps a slide index cleanly into [0, total - 1].
 */
export function wrapSlideIndex(index: number, total: number): number {
  if (total <= 0 || !Number.isFinite(index)) return 0;
  return ((Math.trunc(index) % total) + total) % total;
}

/**
 * Evaluates a horizontal pointer swipe delta against a pixel threshold.
 * Negative deltaX (dragged left) advances forward (+1); positive deltaX (dragged right) goes back (-1).
 */
export function resolveSwipeSlideStep(
  deltaX: number,
  thresholdPx: number = 44
): -1 | 0 | 1 {
  if (!Number.isFinite(deltaX)) return 0;
  if (deltaX <= -thresholdPx) return 1;
  if (deltaX >= thresholdPx) return -1;
  return 0;
}

/**
 * Formats the zero-padded tabular counter for the active journey slide (e.g. "01 / 04").
 */
export function formatSlideCounter(activeIndex: number, total: number): string {
  if (total <= 0) return '00 / 00';
  const safeIndex = wrapSlideIndex(activeIndex, total);
  return `${padTimeUnit(safeIndex + 1)} / ${padTimeUnit(total)}`;
}

/**
 * Computes a clamped vertical parallax offset in pixels for the Hero background layer.
 */
export function computeParallaxOffset(
  scrollY: number,
  viewportHeight: number,
  factor: number = 0.32
): number {
  if (!Number.isFinite(scrollY) || !Number.isFinite(viewportHeight) || viewportHeight <= 0) {
    return 0;
  }
  const clampedScroll = Math.max(0, Math.min(scrollY, viewportHeight * 1.25));
  return Math.round(clampedScroll * factor * 10) / 10;
}

/**
 * Formats compact dot-separated dates ("15.02.2027") into spaced editorial display ("15 . 02 . 2027").
 */
export function formatHeroSpacedDate(displayDate: string): string {
  return displayDate
    .split('.')
    .map((segment) => segment.trim())
    .filter(Boolean)
    .join(' . ');
}

/**
 * Builds a pre-filled WhatsApp click-to-chat URL with sanitized digits and encoded message.
 */
export function buildWhatsAppMessageUrl(digits: string, message?: string): string {
  const cleanDigits = digits.replace(/\D/g, '');
  if (!message?.trim()) {
    return `https://wa.me/${cleanDigits}`;
  }
  const params = new URLSearchParams({ text: message.trim() });
  return `https://wa.me/${cleanDigits}?${params.toString()}`;
}
