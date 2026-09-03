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
    paddingBottom: 40,
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
    marginBottom: 6,
  },
  timePillText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  greetingSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  verseThemePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verseThemeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  heroCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  heroTopTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  heroStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  heroStatusText: {
    fontSize: 11,
    fontWeight: '800',
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
    fontSize: 22,
    fontWeight: '800',
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
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  heroProgressSection: {
    gap: 8,
  },
  heroProgressTrack: {
    height: 5,
    borderRadius: 2.5,
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
    fontSize: 12,
    fontWeight: '700',
  },
  dailyVerseCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
  },
  dailyArabicText: {
    fontSize: 20,
    lineHeight: 38,
    textAlign: 'center',
    writingDirection: 'rtl',
    fontFamily: 'serif',
    marginBottom: 12,
  },
  dailyUrduText: {
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    writingDirection: 'rtl',
    fontFamily: 'serif',
    marginBottom: 16,
  },
  dailyVerseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 12,
  },
  dailyCitation: {
    fontSize: 12,
    fontWeight: '600',
  },
  dailyActions: {
    flexDirection: 'row',
    gap: 8,
  },
  dailyActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  dailyActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickScrollContent: {
    gap: 12,
    paddingRight: 10,
  },
  quickSurahCard: {
    width: 140,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  quickIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickArabicName: {
    fontSize: 16,
    fontFamily: 'serif',
    marginBottom: 2,
  },
  quickEnglishName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  quickDesc: {
    fontSize: 11,
    lineHeight: 14,
  },
  overviewGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  overviewCard: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  overviewIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  overviewCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  overviewCardSub: {
    fontSize: 11,
  },
  recentList: {
    gap: 8,
  },
  recentItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
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
    fontSize: 13,
    fontWeight: '700',
  },
  recentItemAyah: {
    fontSize: 11,
    marginTop: 1,
  },
});
