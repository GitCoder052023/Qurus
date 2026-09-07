// Re-export modular notification engine constants, permissions, and scheduler
export {
  NOTIFICATION_CHANNEL_ID,
  CONTEMPLATIVE_MESSAGES,
  STREAK_SAVER_TIERS,
} from './notifications/constants';

export {
  setupNotificationChannelAsync,
  requestNotificationPermissionAsync,
  checkNotificationPermissionAsync,
  promptEnableNotificationsAsync,
} from './notifications/permissions';

export {
  scheduleDailyReminderAsync,
  scheduleStreakSaverReminderAsync,
  cancelTonightStreakSaversAsync,
  cancelAllRemindersAsync,
  sendInstantTestNotificationAsync,
  sendInstantFinalCallTestAsync,
} from './notifications/scheduler';
