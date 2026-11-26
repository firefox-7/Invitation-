import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OPENING_TIMING,
  clampVolume,
  computeFadeStepVolume,
  getNextMusicToggleState,
  shouldResumeOnFirstGesture,
  shouldStopMusicForVisibility,
  shouldStopMusicForBlur,
  deriveCoupleInitials,
  calculateCountdown,
  padTimeUnit,
  formatIcsUtcTimestamp,
  buildWeddingIcsContent,
  buildGoogleMapsEmbedUrl,
  buildGoogleMapsPlaceUrl,
  wrapSlideIndex,
  resolveSwipeSlideStep,
  formatSlideCounter,
  computeParallaxOffset,
  formatHeroSpacedDate,
  buildWhatsAppMessageUrl,
} from './weddingHelpers';

test('OPENING_TIMING defines 1.4s preloader, clean monogram exit, and 2.2s curtain sweep', () => {
  assert.equal(OPENING_TIMING.PRELOADER_DURATION_MS, 1400);
  assert.equal(OPENING_TIMING.MONOGRAM_FADE_END_MS, 1850);
  assert.equal(OPENING_TIMING.CURTAIN_REVEAL_END_MS, 4050);
  assert.equal(
    OPENING_TIMING.CURTAIN_REVEAL_END_MS - OPENING_TIMING.MONOGRAM_FADE_END_MS,
    2200
  );
  assert.ok(OPENING_TIMING.REDUCED_MOTION_END_MS < OPENING_TIMING.PRELOADER_DURATION_MS);
});

test('clampVolume clamps values cleanly within [0, 1]', () => {
  assert.equal(clampVolume(-0.5), 0);
  assert.equal(clampVolume(0.04), 0.04);
  assert.equal(clampVolume(1.8), 1);
  assert.equal(clampVolume(Number.NaN), 0.04);
});

test('computeFadeStepVolume ramps smoothly from 0 to target volume', () => {
  assert.equal(computeFadeStepVolume(0.04, 0, 1200), 0);
  assert.ok(Math.abs(computeFadeStepVolume(0.04, 600, 1200) - 0.02) < 1e-6);
  assert.equal(computeFadeStepVolume(0.04, 1200, 1200), 0.04);
  assert.equal(computeFadeStepVolume(0.04, 2000, 1200), 0.04);
});

test('music playback transitions respect explicit user mute', () => {
  assert.equal(getNextMusicToggleState('playing'), 'paused-by-user');
  assert.equal(getNextMusicToggleState('paused-by-user'), 'playing');
  assert.equal(getNextMusicToggleState('awaiting-gesture'), 'playing');
  assert.equal(shouldResumeOnFirstGesture('awaiting-gesture'), true);
  assert.equal(shouldResumeOnFirstGesture('paused-by-user'), false);
  assert.equal(shouldResumeOnFirstGesture('paused-by-screen'), false);
  assert.equal(shouldResumeOnFirstGesture('playing'), false);
});

test('screen visibility and window blur helpers stop music when leaving or closing screen', () => {
  assert.equal(
    shouldStopMusicForVisibility({ hidden: true, visibilityState: 'hidden' }),
    true
  );
  assert.equal(
    shouldStopMusicForVisibility({ hidden: false, visibilityState: 'hidden' }),
    true
  );
  assert.equal(
    shouldStopMusicForVisibility({ hidden: false, visibilityState: 'visible' }),
    false
  );

  assert.equal(
    shouldStopMusicForBlur({
      hidden: false,
      visibilityState: 'visible',
      activeElementTagName: 'BODY',
    }),
    true
  );
  assert.equal(
    shouldStopMusicForBlur({
      hidden: false,
      visibilityState: 'visible',
      activeElementTagName: 'IFRAME',
    }),
    false
  );
  assert.equal(
    shouldStopMusicForBlur({
      hidden: true,
      visibilityState: 'hidden',
      activeElementTagName: 'IFRAME',
    }),
    true
  );
});

test('deriveCoupleInitials extracts monogram initials cleanly', () => {
  assert.equal(deriveCoupleInitials('Aarav & Ananya'), 'A & A');
  assert.equal(deriveCoupleInitials('Rohan and Meera'), 'R & M');
  assert.equal(deriveCoupleInitials('Kabir + Tara'), 'K & T');
});

test('calculateCountdown returns exact remaining days, hours, minutes, seconds for IST target', () => {
  const target = '2027-02-15T19:00:00+05:30';
  const targetMs = new Date(target).getTime();
  const deltaMs = ((2 * 24 + 3) * 3600 + 4 * 60 + 5) * 1000;
  const result = calculateCountdown(target, targetMs - deltaMs);

  assert.deepEqual(result, {
    days: 2,
    hours: 3,
    minutes: 4,
    seconds: 5,
    isComplete: false,
  });
});

test('calculateCountdown returns zeroes and isComplete when target time has passed', () => {
  const target = '2027-02-15T19:00:00+05:30';
  const targetMs = new Date(target).getTime();
  const result = calculateCountdown(target, targetMs + 5000);

  assert.deepEqual(result, {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: true,
  });
});

test('padTimeUnit pads single-digit values and preserves multi-digit values', () => {
  assert.equal(padTimeUnit(0), '00');
  assert.equal(padTimeUnit(7), '07');
  assert.equal(padTimeUnit(14), '14');
  assert.equal(padTimeUnit(120), '120');
});

test('formatIcsUtcTimestamp converts IST timestamp accurately to UTC ICS format', () => {
  assert.equal(
    formatIcsUtcTimestamp('2027-02-15T19:00:00+05:30'),
    '20270215T133000Z'
  );
});

test('buildWeddingIcsContent outputs valid RFC 5545 VCALENDAR with escaped metadata', () => {
  const ics = buildWeddingIcsContent(
    {
      title: 'Wedding of Aarav & Ananya',
      description: 'Join us in Patna, Bihar for the wedding celebration.',
      location: 'Hotel Maurya, Fraser Road, Patna, Bihar',
      startIso: '2027-02-15T19:00:00+05:30',
      endIso: '2027-02-16T01:00:00+05:30',
      fileName: 'aarav-ananya-wedding.ics',
    },
    Date.UTC(2026, 10, 25, 12, 0, 0)
  );

  assert.ok(ics.includes('BEGIN:VCALENDAR'));
  assert.ok(ics.includes('BEGIN:VEVENT'));
  assert.ok(ics.includes('DTSTART:20270215T133000Z'));
  assert.ok(ics.includes('DTEND:20270215T193000Z'));
  assert.ok(ics.includes('SUMMARY:Wedding of Aarav & Ananya'));
  assert.ok(
    ics.includes('LOCATION:Hotel Maurya\\, Fraser Road\\, Patna\\, Bihar')
  );
  assert.ok(ics.includes('END:VEVENT'));
  assert.ok(ics.includes('END:VCALENDAR'));
});

test('buildGoogleMapsEmbedUrl uses Maps Embed API when apiKey exists and falls back otherwise', () => {
  const withKey = buildGoogleMapsEmbedUrl({
    apiKey: 'test-key-123',
    query: 'Hotel Maurya, Fraser Road, Patna, Bihar',
    fallbackUrl: 'https://maps.google.com/maps?q=Hotel+Maurya&output=embed',
  });
  assert.ok(withKey.startsWith('https://www.google.com/maps/embed/v1/place?'));
  assert.ok(withKey.includes('key=test-key-123'));
  assert.ok(withKey.includes('q=Hotel+Maurya'));
  assert.ok(!withKey.includes('solution_id='));

  const withoutKey = buildGoogleMapsEmbedUrl({
    apiKey: '',
    query: 'Hotel Maurya, Fraser Road, Patna, Bihar',
    fallbackUrl: 'https://maps.google.com/maps?q=Hotel+Maurya&output=embed',
  });
  assert.equal(
    withoutKey,
    'https://maps.google.com/maps?q=Hotel+Maurya&output=embed'
  );
});

test('buildGoogleMapsPlaceUrl builds search link for Open in Google Maps', () => {
  const url = buildGoogleMapsPlaceUrl('Hotel Maurya, Fraser Road, Patna, Bihar');
  assert.ok(url.startsWith('https://www.google.com/maps/search/?'));
  assert.ok(url.includes('Hotel+Maurya'));
});

test('wrapSlideIndex wraps positive and negative slide indices cleanly', () => {
  assert.equal(wrapSlideIndex(0, 4), 0);
  assert.equal(wrapSlideIndex(4, 4), 0);
  assert.equal(wrapSlideIndex(-1, 4), 3);
  assert.equal(wrapSlideIndex(-5, 4), 3);
  assert.equal(wrapSlideIndex(2, 0), 0);
});

test('resolveSwipeSlideStep detects left/right swipe thresholds accurately', () => {
  assert.equal(resolveSwipeSlideStep(-60, 44), 1);
  assert.equal(resolveSwipeSlideStep(60, 44), -1);
  assert.equal(resolveSwipeSlideStep(-20, 44), 0);
  assert.equal(resolveSwipeSlideStep(25, 44), 0);
});

test('formatSlideCounter formats zero-padded slide progress', () => {
  assert.equal(formatSlideCounter(0, 4), '01 / 04');
  assert.equal(formatSlideCounter(3, 4), '04 / 04');
  assert.equal(formatSlideCounter(-1, 4), '04 / 04');
  assert.equal(formatSlideCounter(0, 0), '00 / 00');
});

test('computeParallaxOffset clamps smoothly across scroll ranges', () => {
  assert.equal(computeParallaxOffset(-20, 900), 0);
  assert.equal(computeParallaxOffset(0, 900), 0);
  assert.equal(computeParallaxOffset(300, 900, 0.3), 90);
  assert.equal(computeParallaxOffset(5000, 800, 0.32), 320);
});

test('formatHeroSpacedDate formats dot-separated dates cleanly', () => {
  assert.equal(formatHeroSpacedDate('15.02.2027'), '15 . 02 . 2027');
  assert.equal(formatHeroSpacedDate(' 01.12.2026 '), '01 . 12 . 2026');
});

test('buildWhatsAppMessageUrl encodes pre-filled message cleanly', () => {
  const url = buildWhatsAppMessageUrl(
    '+91 99058 05206',
    "Hello Event Patna, I need assistance regarding Aarav & Ananya's wedding."
  );
  assert.ok(url.startsWith('https://wa.me/919905805206?text='));
  assert.ok(url.includes('Event+Patna'));
});
