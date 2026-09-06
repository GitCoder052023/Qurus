/**
 * Analytics Event Taxonomy & Privacy Sanitization
 * 
 * Strict Privacy Rules:
 * - NO user reflection notes or text
 * - NO voice recording binary or transcripts
 * - NO bookmark snippets or Quran verse translations
 * - NO search query strings
 * - NO personally identifying information (PII)
 */

export const ANALYTICS_EVENTS = {
  APP_OPEN: 'app_open',
  SURAH_OPENED: 'surah_opened',
  AUDIO_PLAYED: 'audio_played',
  SEARCH_PERFORMED: 'search_performed',
  BOOKMARK_CREATED: 'bookmark_created',
  HIGHLIGHT_CREATED: 'highlight_created',
  NOTE_CREATED: 'note_created',
  VOICE_NOTE_RECORDED: 'voice_note_recorded',
  PREFERENCE_CHANGED: 'preference_changed',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  LEGAL_CONSENT_AGREED: 'legal_consent_agreed',
  FEEDBACK_SUBMITTED: 'feedback_submitted',
} as const;

export type AnalyticsEventName = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS];

export interface AppOpenPayload {
  is_new_user: boolean;
  platform: string;
  app_version: string;
}

export interface SurahOpenedPayload {
  surah_number: number;
}

export interface AudioPlayedPayload {
  reciter_id: string;
  mode: string;
  speed: number;
}

export interface SearchPerformedPayload {
  filter_type: string;
}

export interface BookmarkCreatedPayload {
  // Deliberately empty of content/snippets
}

export interface HighlightCreatedPayload {
  // Deliberately empty of content
}

export interface NoteCreatedPayload {
  has_voice: boolean;
  // Deliberately strictly excluding note text and transcripts
}

export interface VoiceNoteRecordedPayload {
  duration_seconds: number;
  // Deliberately strictly excluding audio file or speech contents
}

export interface PreferenceChangedPayload {
  setting_key: string;
  setting_value: string | number | boolean;
}

export interface FeedbackSubmittedPayload {
  category: string;
  message: string;
  email?: string;
  app_version: string;
  platform: string;
}
