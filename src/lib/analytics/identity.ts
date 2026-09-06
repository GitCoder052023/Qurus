import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_ANONYMOUS_ID = '@qurus_analytics_anonymous_id_v1';
const STORAGE_KEY_FIRST_LAUNCH = '@qurus_analytics_first_launch_v1';

let cachedAnonymousId: string | null = null;

/**
 * Generates a random UUID v4 identifier.
 * Completely detached from any hardware ID, MAC address, user name, or PII.
 */
function generateAnonymousUUID(): string {
  // RFC4122 version 4 UUID generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Retrieves the persistent anonymous identifier for this app installation.
 * If none exists, a new one is generated and stored locally.
 */
export async function getOrCreateAnonymousId(): Promise<{ anonymousId: string; isNewUser: boolean }> {
  if (cachedAnonymousId) {
    return { anonymousId: cachedAnonymousId, isNewUser: false };
  }

  try {
    const [existingId, firstLaunchRecorded] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEY_ANONYMOUS_ID),
      AsyncStorage.getItem(STORAGE_KEY_FIRST_LAUNCH),
    ]);

    if (existingId) {
      cachedAnonymousId = existingId;
      return { anonymousId: existingId, isNewUser: false };
    }

    // Generate new anonymous random ID
    const newId = `usr_${generateAnonymousUUID()}`;
    cachedAnonymousId = newId;

    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEY_ANONYMOUS_ID, newId),
      AsyncStorage.setItem(STORAGE_KEY_FIRST_LAUNCH, Date.now().toString()),
    ]);

    const isNewUser = !firstLaunchRecorded;
    return { anonymousId: newId, isNewUser };
  } catch (error) {
    // Fallback in case of storage failure to avoid crashing
    if (!cachedAnonymousId) {
      cachedAnonymousId = `temp_${generateAnonymousUUID()}`;
    }
    return { anonymousId: cachedAnonymousId, isNewUser: false };
  }
}

/**
 * Returns the currently cached anonymous ID synchronously if available.
 */
export function getCachedAnonymousId(): string | null {
  return cachedAnonymousId;
}
