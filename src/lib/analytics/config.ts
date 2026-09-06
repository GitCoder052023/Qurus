/**
 * Configuration for PostHog Analytics & User Feedback.
 * 
 * Credentials can be supplied via environment variables:
 * - EXPO_PUBLIC_POSTHOG_API_KEY
 * - EXPO_PUBLIC_POSTHOG_HOST
 * 
 * If credentials are not provided or contain placeholder values,
 * analytics will safely no-op without degrading any app functionality.
 */

// Placeholder constant - do NOT commit production credentials here.
export const POSTHOG_API_KEY_PLACEHOLDER = 'phc_YOUR_POSTHOG_API_KEY_HERE';
export const POSTHOG_DEFAULT_HOST = 'https://us.i.posthog.com';

export interface AnalyticsConfig {
  apiKey: string;
  host: string;
  isEnabled: boolean;
}

export function getAnalyticsConfig(): AnalyticsConfig {
  const apiKey = (process.env.EXPO_PUBLIC_POSTHOG_API_KEY || '').trim();
  const host = (process.env.EXPO_PUBLIC_POSTHOG_HOST || POSTHOG_DEFAULT_HOST).trim();

  // Active only if an explicit, non-placeholder API key is configured
  const isEnabled = Boolean(
    apiKey &&
    apiKey !== POSTHOG_API_KEY_PLACEHOLDER &&
    apiKey.length > 5
  );

  return {
    apiKey,
    host,
    isEnabled,
  };
}
