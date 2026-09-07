import * as Notifications from 'expo-notifications';
import {
  NOTIFICATION_CHANNEL_ID,
  DAILY_REMINDER_ID,
  CONTEMPLATIVE_MESSAGES,
  STREAK_SAVER_TIERS,
} from './constants';
import {
  checkNotificationPermissionAsync,
  requestNotificationPermissionAsync,
  setupNotificationChannelAsync,
} from './permissions';

export async function scheduleDailyReminderAsync(
  hour: number,
  minute: number,
  streakDays: number = 0,
  lastSurahName?: string
): Promise<boolean> {
  try {
    const hasPermission = await checkNotificationPermissionAsync();
    if (!hasPermission) return false;

    await setupNotificationChannelAsync();

    // Cancel existing reminder if already scheduled
    try {
      await Notifications.cancelScheduledNotificationAsync(DAILY_REMINDER_ID);
    } catch {}

    // Choose a message based on day
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const msg = CONTEMPLATIVE_MESSAGES[dayOfYear % CONTEMPLATIVE_MESSAGES.length];

    let body = msg.body;
    let title = msg.title;

    if (streakDays >= 2) {
      title = `${streakDays}-Day Rhythm Alive 🔥`;
      body = lastSurahName
        ? `Keep your connection unbroken. Surah ${lastSurahName} is ready for today's reflection.`
        : `Your ${streakDays}-day rhythm is strong. Take 3 minutes for one verse today.`;
    } else if (lastSurahName) {
      body = `Surah ${lastSurahName} is waiting for your reflection. A quiet space for your mind.`;
    }

    await Notifications.scheduleNotificationAsync({
      identifier: DAILY_REMINDER_ID,
      content: {
        title,
        body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: '#1B4D3E',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
        channelId: NOTIFICATION_CHANNEL_ID,
      },
    });

    return true;
  } catch (err) {
    console.warn('Failed to schedule daily reminder:', err);
    return false;
  }
}

export async function scheduleStreakSaverReminderAsync(streakDays: number): Promise<boolean> {
  try {
    if (streakDays < 1) return false;

    const hasPermission = await checkNotificationPermissionAsync();
    if (!hasPermission) return false;

    await setupNotificationChannelAsync();

    // Schedule escalating countdown tiers for the evening
    for (const tier of STREAK_SAVER_TIERS) {
      try {
        await Notifications.cancelScheduledNotificationAsync(tier.id);
      } catch {}

      await Notifications.scheduleNotificationAsync({
        identifier: tier.id,
        content: {
          title: tier.title(streakDays),
          body: tier.body(streakDays),
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          color: '#FF4500',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: tier.hour,
          minute: tier.minute,
          channelId: NOTIFICATION_CHANNEL_ID,
        },
      });
    }

    return true;
  } catch (err) {
    console.warn('Failed to schedule streak saver reminders:', err);
    return false;
  }
}

export async function cancelTonightStreakSaversAsync(): Promise<void> {
  for (const tier of STREAK_SAVER_TIERS) {
    try {
      await Notifications.cancelScheduledNotificationAsync(tier.id);
    } catch {}
  }
}

export async function cancelAllRemindersAsync(): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(DAILY_REMINDER_ID);
    await cancelTonightStreakSaversAsync();
  } catch (err) {
    console.warn('Failed to cancel notifications:', err);
  }
}

export async function sendInstantTestNotificationAsync(): Promise<boolean> {
  try {
    const granted = await requestNotificationPermissionAsync();
    if (!granted) return false;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Qurus Tadabbur Reminder 🌿',
        body: '“Do they not reflect upon the Quran?” This is how your daily mindfulness notification will look.',
        sound: true,
        color: '#1B4D3E',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
        channelId: NOTIFICATION_CHANNEL_ID,
      },
    });

    return true;
  } catch (err) {
    console.warn('Failed to send test notification:', err);
    return false;
  }
}

export async function sendInstantFinalCallTestAsync(streakDays: number = 7): Promise<boolean> {
  try {
    const granted = await requestNotificationPermissionAsync();
    if (!granted) return false;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `🔥 FINAL CALL (15 MINS): Streak Resetting!`,
        body: `Final warning! At 12:00 AM, your ${streakDays}-day streak dies. Open Qurus and listen to 1 ayah before it's too late!`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: '#FF4500',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
        channelId: NOTIFICATION_CHANNEL_ID,
      },
    });

    return true;
  } catch (err) {
    console.warn('Failed to send final call test notification:', err);
    return false;
  }
}
