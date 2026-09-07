import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 18,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTextCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  streakNumber: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.6,
  },
  streakUnit: {
    fontSize: 15,
    fontWeight: '500',
  },
  statusPill: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  punchline: {
    fontSize: 13,
    lineHeight: 18,
  },
  weekTrackContainer: {
    marginBottom: 16,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dayCol: {
    alignItems: 'center',
    gap: 8,
  },
  dayLetter: {
    fontSize: 11,
  },
  dayDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  motivationBox: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  milestoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  milestoneGoalText: {
    fontSize: 12,
    fontWeight: '500',
  },
  milestoneDaysLeft: {
    fontSize: 12,
  },
  progressTrack: {
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  quoteText: {
    fontSize: 13,
    lineHeight: 20,
  },
  quoteAuthor: {
    fontSize: 11,
    marginTop: 6,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 14,
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '700',
  },
  urgencyBanner: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    gap: 6,
  },
  urgencyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  urgencyBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  urgencyMessage: {
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: '500',
  },
  safeBanner: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    gap: 5,
  },
  safeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  safeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  safeMessage: {
    fontSize: 12.5,
    lineHeight: 17,
  },
});

