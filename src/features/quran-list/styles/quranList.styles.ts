import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
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
  searchContainer: {
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 120,
  },
  surahCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  surahNumberCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  surahNumberText: {
    fontSize: 14,
    fontWeight: '600',
  },
  surahDetails: {
    flex: 1,
    marginRight: 12,
  },
  surahEnglishTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  surahUrduTitle: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  revBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  revText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metaText: {
    fontSize: 11,
    fontWeight: '500',
  },
  arabicCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  surahArabicTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'right',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
  },
  surahMainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  titleWithBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  completedPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  completedPillText: {
    fontSize: 10,
    fontWeight: '700',
  },
  cardProgressFooter: {
    marginTop: 10,
    width: '100%',
    gap: 4,
  },
  cardProgressTrack: {
    height: 3,
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  cardProgressBar: {
    height: '100%',
    borderRadius: 1.5,
  },
  cardProgressLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
});
