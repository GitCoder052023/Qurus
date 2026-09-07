import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  safe: {
    flex: 1,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orbA: {
    width: 280,
    height: 280,
    top: -80,
    right: -90,
  },
  orbB: {
    width: 220,
    height: 220,
    bottom: 120,
    left: -100,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 6,
    paddingBottom: 14,
  },
  wordmark: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.6,
  },
  skip: {
    fontSize: 15,
    fontWeight: '500',
  },
  track: {
    height: 3,
    marginHorizontal: 24,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  trackFill: {
    height: '100%',
    borderRadius: 2,
  },
  canvas: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  iconDisc: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: -1,
  },
  kicker: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: -0.9,
    lineHeight: 38,
    marginBottom: 14,
  },
  highlight: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '500',
    marginBottom: 20,
  },
  prose: {
    gap: 14,
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
  },
  quote: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
    marginBottom: 8,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 13,
    fontWeight: '500',
  },
  stack: {
    gap: 10,
    marginTop: 8,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    padding: 16,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureCopy: {
    flex: 1,
    paddingTop: 2,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    lineHeight: 19,
  },
  activityWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  activity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 22,
  },
  activityLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  founder: {
    marginTop: 16,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
  },
  founderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  founderName: {
    fontSize: 16,
    fontWeight: '600',
  },
  founderRole: {
    fontSize: 13,
    marginTop: 2,
  },
  founderNote: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 14,
  },
  founderDua: {
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  dock: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  dockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtn: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  nextLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  intentionSubtitle: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 24,
  },
  intentionBlock: {
    marginBottom: 24,
  },
  intentionBlockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  intentionBlockTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  pillBadgeCompact: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pillBadgeCompactText: {
    fontSize: 12,
    fontWeight: '700',
  },
  goalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  goalCard: {
    width: '48%',
    borderRadius: 18,
    padding: 14,
    flexGrow: 1,
  },
  goalCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  goalCardCount: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  goalRadioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalCardLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  goalCardDesc: {
    fontSize: 11.5,
    lineHeight: 15,
  },
  reminderList: {
    gap: 10,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 18,
  },
  reminderIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderTextCol: {
    flex: 1,
  },
  reminderTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  reminderLabel: {
    fontSize: 14.5,
    fontWeight: '600',
  },
  reminderTimeStr: {
    fontSize: 13,
    fontWeight: '700',
  },
  reminderDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  reminderRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyTipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 4,
    marginBottom: 16,
  },
  privacyTipText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
  },
  languageCardsWrap: {
    gap: 14,
    marginBottom: 14,
  },
  languageCard: {
    borderRadius: 20,
    padding: 16,
  },
  languageCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  languageBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  langPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  subBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  subBadgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  languageName: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  languageReciter: {
    fontSize: 13.5,
    fontWeight: '600',
    marginBottom: 8,
  },
  languageDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
});

