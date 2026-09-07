import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerTextGroup: {
    flex: 1,
    marginRight: 16,
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  timePillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  greetingSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  notifBanner: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
    gap: 14,
  },
  notifBannerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  notifIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifTextCol: {
    flex: 1,
  },
  notifBannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  notifBannerBody: {
    fontSize: 13,
    lineHeight: 18,
  },
  notifActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 44,
    borderRadius: 22,
  },
  notifActionBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  heroCard: {
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 22,
  },
  heroEyebrowRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  heroEyebrowPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
  },
  heroStatusText: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  heroMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  heroLeftCol: {
    flex: 1,
    marginRight: 16,
  },
  heroEnglishTitle: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  heroArabicTitle: {
    fontSize: 18,
    marginTop: 2,
    marginBottom: 6,
    fontFamily: 'serif',
  },
  heroVerseCount: {
    fontSize: 13,
    fontWeight: '500',
  },
  heroPlayBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroProgressSection: {
    gap: 8,
  },
  heroProgressTrack: {
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  heroProgressBar: {
    height: '100%',
    borderRadius: 2.5,
  },
  heroProgressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroProgressText: {
    fontSize: 11,
    fontWeight: '500',
  },
  heroResumeTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroResumeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  recentList: {
    gap: 8,
  },
  recentItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  recentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recentNumberDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentNumberText: {
    fontSize: 12,
    fontWeight: '700',
  },
  recentItemSurah: {
    fontSize: 14,
    fontWeight: '600',
  },
  recentItemAyah: {
    fontSize: 11,
    marginTop: 1,
  },
  storyBanner: {
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
  },
  storyBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  storyBadgeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  storyAuthorText: {
    fontSize: 12,
    fontWeight: '600',
  },
  storyBannerTitle: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  storyBannerDesc: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  storyBannerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  storyBannerAction: {
    fontSize: 14,
    fontWeight: '500',
  },
});
