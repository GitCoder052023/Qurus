import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  navBarIconBtn: {
    padding: 6,
  },
  navBarCenter: {
    alignItems: 'center',
  },
  navBarTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  navBarSubtitle: {
    fontSize: 12,
    marginTop: 1,
  },
  navBarPlayBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 110,
  },
  surahHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  bannerCard: {
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  bannerTopRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  surahPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  surahPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  arabicSurahTitle: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 4,
  },
  englishSurahTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  urduSurahTitle: {
    fontSize: 13,
    marginBottom: 16,
  },
  playSurahBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  playSurahBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  bismillahCard: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  bismillahArabic: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
    fontFamily: 'serif',
  },
  bismillahUrdu: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  surahFooter: {
    padding: 20,
    marginTop: 16,
  },
  surahNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navSurahBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  navSurahText: {
    fontSize: 13,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    padding: 10,
  },
  surahProgressWrapper: {
    width: '100%',
    marginVertical: 12,
    gap: 6,
  },
  surahProgressTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  surahProgressBar: {
    height: '100%',
    borderRadius: 2,
  },
  surahProgressMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  surahProgressMetaText: {
    fontSize: 11,
    fontWeight: '500',
  },
});
