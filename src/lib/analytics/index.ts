import PostHog from 'posthog-react-native';
import { Platform } from 'react-native';
import { getAnalyticsConfig } from './config';
import {
    ANALYTICS_EVENTS,
    AnalyticsEventName,
    AppOpenPayload,
    AudioPlayedPayload,
    BookmarkCreatedPayload,
    FeedbackSubmittedPayload,
    HighlightCreatedPayload,
    NoteCreatedPayload,
    PreferenceChangedPayload,
    SearchPerformedPayload,
    SurahOpenedPayload,
    VoiceNoteRecordedPayload,
} from './events';
import { getCachedAnonymousId, getOrCreateAnonymousId } from './identity';

export const APP_VERSION = '2.3.0';

let posthogClient: PostHog | null = null;
let isInitialized = false;
let initPromise: Promise<void> | null = null;

/**
 * Initializes the PostHog analytics client with persistent anonymous identity.
 * Safely no-ops if credentials are placeholder or unavailable.
 * Never throws or blocks application execution.
 */
export async function initAnalytics(): Promise<void> {
  if (isInitialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const config = getAnalyticsConfig();
      const { anonymousId } = await getOrCreateAnonymousId();

      if (!config.isEnabled) {
        if (__DEV__) {
          console.log('[Analytics] PostHog disabled (placeholder or missing API key). Analytics will no-op.');
        }
        isInitialized = true;
        return;
      }

      // Initialize PostHog client with secure settings
      posthogClient = new PostHog(config.apiKey, {
        host: config.host,
        captureAppLifecycleEvents: false, // We control lifecycle events explicitly
        enableSessionReplay: false, // Ensure zero screen recordings
        setDefaultPersonProperties: false, // Keep identity anonymous & minimal
      });

      await posthogClient.ready();

      // Bind anonymous identifier
      if (posthogClient && anonymousId) {
        posthogClient.identify(anonymousId, {
          platform: Platform.OS,
          app_version: APP_VERSION,
        });
      }

      isInitialized = true;
    } catch (error) {
      // Analytics initialization failure must never crash the app
      if (__DEV__) {
        console.warn('[Analytics] Failed to initialize PostHog safely:', error);
      }
      posthogClient = null;
      isInitialized = true;
    }
  })();

  return initPromise;
}

/**
 * Internal generic tracker with safety boundary.
 */
export function trackEvent(eventName: AnalyticsEventName, properties: Record<string, any> = {}): void {
  try {
    if (!posthogClient) return;

    posthogClient.capture(eventName, {
      ...properties,
      platform: Platform.OS,
      app_version: APP_VERSION,
    });
  } catch (error) {
    if (__DEV__) {
      console.warn(`[Analytics] Failed to capture event "${eventName}":`, error);
    }
  }
}

/**
 * Tracks app launch / open event.
 */
export async function trackAppOpen(): Promise<void> {
  try {
    const { isNewUser } = await getOrCreateAnonymousId();
    const payload: AppOpenPayload = {
      is_new_user: isNewUser,
      platform: Platform.OS,
      app_version: APP_VERSION,
    };
    trackEvent(ANALYTICS_EVENTS.APP_OPEN, payload);
  } catch (_) {
    // Fail silently
  }
}

/**
 * Tracks when a user opens a Surah to read.
 * Transmits ONLY surah number, never notes or reflections.
 */
export function trackSurahOpened(surahNumber: number): void {
  const payload: SurahOpenedPayload = { surah_number: surahNumber };
  trackEvent(ANALYTICS_EVENTS.SURAH_OPENED, payload);
}

/**
 * Tracks when Quran recitation is played.
 */
export function trackAudioPlayed(reciterId: string, mode: string, speed: number): void {
  const payload: AudioPlayedPayload = {
    reciter_id: reciterId,
    mode,
    speed,
  };
  trackEvent(ANALYTICS_EVENTS.AUDIO_PLAYED, payload);
}

/**
 * Tracks search interactions without recording sensitive query text.
 */
export function trackSearchPerformed(filterType: string = 'all'): void {
  const payload: SearchPerformedPayload = { filter_type: filterType };
  trackEvent(ANALYTICS_EVENTS.SEARCH_PERFORMED, payload);
}

/**
 * Tracks creation of a bookmark.
 * Does NOT transmit verse snippet or personal reflections.
 */
export function trackBookmarkCreated(): void {
  const payload: BookmarkCreatedPayload = {};
  trackEvent(ANALYTICS_EVENTS.BOOKMARK_CREATED, payload);
}

/**
 * Tracks creation of a highlight.
 */
export function trackHighlightCreated(): void {
  const payload: HighlightCreatedPayload = {};
  trackEvent(ANALYTICS_EVENTS.HIGHLIGHT_CREATED, payload);
}

/**
 * Tracks creation or edit of a note.
 * Strictly transmits ONLY whether voice note is attached.
 * Never transmits note text, transcription, or personal reflections.
 */
export function trackNoteCreated(hasVoice: boolean = false): void {
  const payload: NoteCreatedPayload = { has_voice: hasVoice };
  trackEvent(ANALYTICS_EVENTS.NOTE_CREATED, payload);
}

/**
 * Tracks completion of a voice note recording.
 * Strictly transmits ONLY duration in seconds, never the audio file.
 */
export function trackVoiceNoteRecorded(durationSeconds: number): void {
  const payload: VoiceNoteRecordedPayload = { duration_seconds: durationSeconds };
  trackEvent(ANALYTICS_EVENTS.VOICE_NOTE_RECORDED, payload);
}

/**
 * Tracks non-sensitive preference changes (e.g. font size, playback mode).
 */
export function trackPreferenceChanged(key: string, value: string | number | boolean): void {
  const payload: PreferenceChangedPayload = {
    setting_key: key,
    setting_value: value,
  };
  trackEvent(ANALYTICS_EVENTS.PREFERENCE_CHANGED, payload);
}

/**
 * Tracks onboarding completion.
 */
export function trackOnboardingCompleted(): void {
  trackEvent(ANALYTICS_EVENTS.ONBOARDING_COMPLETED);
}

/**
 * Tracks legal consent agreement.
 */
export function trackLegalConsentAgreed(): void {
  trackEvent(ANALYTICS_EVENTS.LEGAL_CONSENT_AGREED);
}

/**
 * Submits user feedback directly through PostHog event capture.
 * Does NOT require custom backend.
 */
export async function submitFeedback(params: {
  category: string;
  message: string;
  email?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    await initAnalytics();

    const anonymousId = getCachedAnonymousId() || (await getOrCreateAnonymousId()).anonymousId;
    const sanitizedEmail = params.email?.trim() || undefined;

    const payload: FeedbackSubmittedPayload = {
      category: params.category,
      message: params.message.trim(),
      email: sanitizedEmail,
      app_version: APP_VERSION,
      platform: Platform.OS,
    };

    if (posthogClient) {
      posthogClient.capture(ANALYTICS_EVENTS.FEEDBACK_SUBMITTED, {
        ...payload,
        $distinct_id: anonymousId,
      });

      // Attempt to flush promptly so feedback is sent immediately
      try {
        await posthogClient.flush();
      } catch (_) {
        // Even if flush doesn't complete right now, event is saved in queue
      }
    } else if (__DEV__) {
      console.log('[Analytics] Feedback recorded (PostHog not configured):', payload);
    }

    return { success: true };
  } catch (err: any) {
    if (__DEV__) {
      console.error('[Analytics] Failed to submit feedback:', err);
    }
    return { success: false, error: err?.message || 'Submission failed' };
  }
}

export { getAnalyticsConfig } from './config';
export { getCachedAnonymousId, getOrCreateAnonymousId } from './identity';
export { ANALYTICS_EVENTS };

