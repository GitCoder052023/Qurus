import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  screenSubtitle: {
    fontSize: 15,
    marginTop: 4,
    lineHeight: 21,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  settingItem: {
    paddingVertical: 8,
  },
  settingLabelGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  settingValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  settingTextGroup: {
    flex: 1,
    marginRight: 12,
  },
  settingSubtext: {
    fontSize: 12,
    marginTop: 2,
  },
  pillGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  sizePill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  sizePillText: {
    fontSize: 13,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  reciterList: {
    gap: 6,
  },
  reciterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  reciterTextCol: {
    flex: 1,
  },
  reciterNameText: {
    fontSize: 13,
  },
  reciterArabicText: {
    fontSize: 11,
    marginTop: 1,
  },
  modeSettingsColumn: {
    gap: 8,
    marginBottom: 6,
  },
  modeOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  modeOptionTextGroup: {
    flex: 1,
    marginRight: 10,
  },
  modeOptionLabel: {
    fontSize: 13,
    marginBottom: 2,
  },
  modeOptionDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
  storyCard: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
  },
  storyCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  storyCardIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyCardTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  storyCardTagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  storyCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  storyCardSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  storyCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  storyCardActionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  appInfoTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  appInfoDesc: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 6,
  },
  appInfoSource: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});

