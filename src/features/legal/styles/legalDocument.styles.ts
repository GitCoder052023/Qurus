import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
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
  navBtnPlaceholder: {
    width: 38,
  },
  topBarTitleGroup: {
    alignItems: 'center',
  },
  topBarBadge: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 20,
  },
  badgePill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  badgePillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  headline: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.6,
    marginBottom: 6,
  },
  dateMeta: {
    fontSize: 13,
    marginBottom: 12,
  },
  summaryLead: {
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '500',
  },
  highlightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 24,
  },
  highlightCardText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  introCallout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderLeftWidth: 4,
    marginBottom: 24,
  },
  introCalloutText: {
    fontSize: 13.5,
    lineHeight: 20,
    flex: 1,
  },
  sectionsList: {
    gap: 16,
  },
  sectionCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sectionIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitleCol: {
    flex: 1,
  },
  sectionNumber: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 1,
  },
  sectionBody: {
    gap: 10,
  },
  paragraphText: {
    fontSize: 14,
    lineHeight: 22,
  },
  bulletsList: {
    gap: 6,
    marginTop: 4,
    marginBottom: 4,
    paddingLeft: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  bulletText: {
    fontSize: 13.5,
    lineHeight: 20,
    flex: 1,
  },
  calloutBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    marginTop: 4,
  },
  calloutText: {
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: '500',
    flex: 1,
  },
  contactCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
    marginTop: 24,
    gap: 10,
  },
  contactCardTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  contactCardDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  contactLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 10,
  },
  contactLinkText: {
    fontSize: 13.5,
    fontWeight: '600',
  },
  footerNote: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
  },
});
