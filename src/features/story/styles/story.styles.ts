import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  navBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitleGroup: {
    alignItems: 'center',
  },
  topBarBadge: {
    fontSize: 12,
    fontWeight: '500',
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 60,
  },
  storyHeader: {
    marginBottom: 26,
  },
  pillBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  pillBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  mainHeadline: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: -0.8,
    lineHeight: 38,
    marginBottom: 8,
  },
  authorByline: {
    fontSize: 14,
  },
  proseBlock: {
    marginBottom: 28,
  },
  leadParagraph: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  bodyParagraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  subHeadline: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.4,
    lineHeight: 28,
    marginBottom: 14,
  },
  reflectiveCard: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    marginVertical: 14,
    gap: 10,
  },
  reflectiveCardText: {
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  quoteCard: {
    borderLeftWidth: 4,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginVertical: 16,
    gap: 10,
  },
  quoteCardText: {
    fontSize: 15,
    lineHeight: 24,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  quoteCardAuthor: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  adviceCard: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    marginVertical: 16,
  },
  adviceIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  adviceCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  adviceCardText: {
    fontSize: 14.5,
    lineHeight: 23,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  featureGrid: {
    gap: 12,
    marginTop: 8,
  },
  featureCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  featureIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    lineHeight: 19,
  },
  activityRow: {
    gap: 8,
    marginVertical: 12,
  },
  activityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  activityPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  closingCard: {
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  closingTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 20,
    fontWeight: '600',
  },
  closingName: {
    fontSize: 16,
    fontWeight: '600',
  },
  closingTitle: {
    fontSize: 12,
    marginTop: 1,
  },
  closingBody: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 12,
  },
  closingDua: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  signatureDivider: {
    height: 1,
    marginBottom: 18,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
  },
  startBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
  },
  backLinkText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

