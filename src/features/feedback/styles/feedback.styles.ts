import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardContainer: {
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
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  headline: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 24,
  },
  privacyCardCopy: {
    flex: 1,
  },
  privacyCardHeading: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  privacyCardDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  section: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeading: {
    fontSize: 12.5,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 2,
  },
  charCount: {
    fontSize: 11.5,
  },
  categoryGrid: {
    gap: 10,
  },
  categoryCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryDesc: {
    fontSize: 12,
    paddingLeft: 26,
  },
  textArea: {
    minHeight: 120,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
    fontSize: 14.5,
    lineHeight: 21,
  },
  input: {
    height: 48,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    fontSize: 14.5,
  },
  optionalBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  optionalBadgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  fieldHelper: {
    fontSize: 11.5,
    marginTop: 6,
    marginLeft: 4,
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  metaContext: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  metaText: {
    fontSize: 11.5,
  },
  bottomDock: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 12,
  },
  submitBtn: {
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitBtnText: {
    fontSize: 15.5,
    fontWeight: '700',
  },
  successWrapper: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  successIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  successDesc: {
    fontSize: 14.5,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  infoNoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 28,
  },
  infoNoteText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  returnBtn: {
    paddingHorizontal: 28,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
});

