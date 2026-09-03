import { StyleSheet } from 'react-native';

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
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  themeRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  themeBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 14,
    gap: 6,
  },
  themeBtnText: {
    fontSize: 12,
    fontWeight: '600',
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
