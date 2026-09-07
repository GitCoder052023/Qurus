import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  headerTopRow: {
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  screenSubtitle: {
    fontSize: 14,
    marginTop: 3,
    lineHeight: 20,
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 4,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statPillText: {
    fontSize: 12,
  },
  statDot: {
    fontSize: 12,
    opacity: 0.5,
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
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 120,
  },
  surahSectionCard: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 14,
    overflow: 'hidden',
  },
  surahHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  surahTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  surahNumberBadge: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surahNumberBadgeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  surahTextCol: {
    flex: 1,
  },
  surahNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  surahEnglishName: {
    fontSize: 15,
    fontWeight: '700',
  },
  surahArabicName: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'serif',
  },
  surahSubtitleText: {
    fontSize: 11.5,
    marginTop: 2,
  },
  surahHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  openSurahBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 9,
  },
  openSurahBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
  ayahsContainer: {
    padding: 10,
    gap: 10,
  },
  ayahCard: {
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
  },
  ayahHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ayahTagGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  ayahBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 7,
  },
  ayahBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  notesMiniCount: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  notesMiniCountText: {
    fontSize: 10,
    fontWeight: '600',
  },
  ayahActionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addNoteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 7,
    borderWidth: StyleSheet.hairlineWidth,
  },
  addNoteBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
  jumpVerseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 7,
    borderWidth: StyleSheet.hairlineWidth,
  },
  jumpVerseBtnText: {
    fontSize: 11,
    fontWeight: '500',
  },
  arabicSnippetPreview: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'serif',
    marginTop: 6,
  },
  urduSnippetPreview: {
    fontSize: 11,
    lineHeight: 16,
    fontStyle: 'italic',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 2,
    marginBottom: 4,
  },
  notesListForAyah: {
    marginTop: 8,
    gap: 6,
  },
  compactNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  compactNoteIconPill: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactNoteSnippet: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  compactNoteMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactNoteDateText: {
    fontSize: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 70,
    paddingHorizontal: 28,
  },
  emptyIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  browseBtn: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 14,
  },
  browseBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

