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
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    textAlign: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headline: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.6,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14.5,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  guaranteeCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
    gap: 14,
  },
  guaranteeTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  guaranteeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  guaranteeCopy: {
    flex: 1,
  },
  guaranteeHeading: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  guaranteeDesc: {
    fontSize: 12.5,
    lineHeight: 18,
  },
  docsSection: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 12.5,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  docCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    marginBottom: 12,
  },
  docCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  docIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docTitleGroup: {
    flex: 1,
  },
  docCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  docCardSubtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  docCardFooter: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
  },
  docLinkText: {
    fontSize: 13,
    fontWeight: '600',
  },
  agreementSection: {
    marginBottom: 20,
  },
  checkboxCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxLabel: {
    fontSize: 13.5,
    lineHeight: 20,
    flex: 1,
  },
  checkboxDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 6,
  },
  selectAllRow: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  selectAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  bottomDock: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  proceedBtn: {
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  proceedBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },
});

