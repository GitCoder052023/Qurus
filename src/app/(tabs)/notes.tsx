import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { SURAHS } from '../../data/surahs';
import { StudyNote, SurahMetadata } from '../../types';
import { NoteEditorModal } from '../../components/NoteEditorModal';
import { NoteViewerModal } from '../../components/NoteViewerModal';
import { formatDurationMs } from '../../components/VoiceNotePlayer';

interface AyahNotesGroup {
  surahNumber: number;
  ayahNumber: number;
  arabicSnippet?: string;
  urduSnippet?: string;
  notes: StudyNote[];
}

interface SurahNotesGroup {
  surahNumber: number;
  surahMeta?: SurahMetadata;
  ayahGroups: AyahNotesGroup[];
  totalNotes: number;
}

export default function NotesScreen() {
  const { theme } = useTheme();
  const { notes, saveNote, deleteNote } = useStudyState();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSurahs, setCollapsedSurahs] = useState<Record<number, boolean>>({});
  const [collapsedAyahs, setCollapsedAyahs] = useState<Record<string, boolean>>({});

  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);
  const [targetAyahForNewNote, setTargetAyahForNewNote] = useState<{
    surahNumber: number;
    ayahNumber: number;
    arabicSnippet?: string;
    urduSnippet?: string;
  } | null>(null);
  const [noteEditorVisible, setNoteEditorVisible] = useState(false);

  const [viewingNote, setViewingNote] = useState<StudyNote | null>(null);
  const [noteViewerVisible, setNoteViewerVisible] = useState(false);

  const toggleSurahCollapse = (surahNumber: number) => {
    setCollapsedSurahs((prev) => ({
      ...prev,
      [surahNumber]: !prev[surahNumber],
    }));
  };

  const toggleAyahCollapse = (surahNumber: number, ayahNumber: number) => {
    const key = `${surahNumber}:${ayahNumber}`;
    setCollapsedAyahs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Overall Statistics
  const stats = useMemo(() => {
    const allNotes = Object.values(notes);
    const surahSet = new Set<number>();
    const ayahSet = new Set<string>();

    allNotes.forEach((n) => {
      surahSet.add(n.surahNumber);
      ayahSet.add(`${n.surahNumber}:${n.ayahNumber}`);
    });

    return {
      totalNotes: allNotes.length,
      totalAyahs: ayahSet.size,
      totalSurahs: surahSet.size,
    };
  }, [notes]);

  // Filter notes by search query
  const filteredNotes = useMemo(() => {
    const all = Object.values(notes);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return all;

    return all.filter((n) => {
      const surah = SURAHS.find((s) => s.number === n.surahNumber);
      const surahMatch =
        surah &&
        (surah.englishName.toLowerCase().includes(q) ||
          surah.name.toLowerCase().includes(q) ||
          surah.urduName.toLowerCase().includes(q) ||
          surah.englishNameTranslation.toLowerCase().includes(q));

      const refMatch =
        `${n.surahNumber}:${n.ayahNumber}`.includes(q) ||
        `surah ${n.surahNumber}`.includes(q) ||
        `ayah ${n.ayahNumber}`.includes(q);

      const textMatch = n.text.toLowerCase().includes(q);
      const voiceMatch =
        Boolean(n.voiceNote) &&
        ('voice'.includes(q) || 'audio'.includes(q) || 'mic'.includes(q));
      const snippetMatch =
        (n.urduSnippet && n.urduSnippet.toLowerCase().includes(q)) ||
        (n.arabicSnippet && n.arabicSnippet.toLowerCase().includes(q));

      return surahMatch || refMatch || textMatch || voiceMatch || snippetMatch;
    });
  }, [notes, searchQuery]);

  // Group filtered notes by Surah, then by Ayah
  const surahGroups = useMemo(() => {
    const surahMap = new Map<number, Map<number, StudyNote[]>>();

    filteredNotes.forEach((note) => {
      if (!surahMap.has(note.surahNumber)) {
        surahMap.set(note.surahNumber, new Map<number, StudyNote[]>());
      }
      const ayahMap = surahMap.get(note.surahNumber)!;
      if (!ayahMap.has(note.ayahNumber)) {
        ayahMap.set(note.ayahNumber, []);
      }
      ayahMap.get(note.ayahNumber)!.push(note);
    });

    const groups: SurahNotesGroup[] = [];
    const sortedSurahNumbers = Array.from(surahMap.keys()).sort((a, b) => a - b);

    sortedSurahNumbers.forEach((surahNum) => {
      const surahMeta = SURAHS.find((s) => s.number === surahNum);
      const ayahMap = surahMap.get(surahNum)!;
      const sortedAyahNumbers = Array.from(ayahMap.keys()).sort((a, b) => a - b);

      let totalNotesInSurah = 0;
      const ayahGroups: AyahNotesGroup[] = sortedAyahNumbers.map((ayahNum) => {
        const aNotes = ayahMap.get(ayahNum)!.sort((a, b) => b.createdAt - a.createdAt);
        totalNotesInSurah += aNotes.length;
        const withArabic = aNotes.find((n) => n.arabicSnippet);
        const withUrdu = aNotes.find((n) => n.urduSnippet);
        return {
          surahNumber: surahNum,
          ayahNumber: ayahNum,
          arabicSnippet: withArabic?.arabicSnippet,
          urduSnippet: withUrdu?.urduSnippet,
          notes: aNotes,
        };
      });

      groups.push({
        surahNumber: surahNum,
        surahMeta,
        ayahGroups,
        totalNotes: totalNotesInSurah,
      });
    });

    return groups;
  }, [filteredNotes]);

  const handleOpenAyahInReader = (surahNumber: number, ayahNumber: number) => {
    router.push(`/reader/${surahNumber}?ayah=${ayahNumber}`);
  };

  const handleOpenSurahInReader = (surahNumber: number) => {
    router.push(`/reader/${surahNumber}`);
  };

  const handleAddNewNoteToAyah = (ayahGroup: AyahNotesGroup) => {
    setTargetAyahForNewNote({
      surahNumber: ayahGroup.surahNumber,
      ayahNumber: ayahGroup.ayahNumber,
      arabicSnippet: ayahGroup.arabicSnippet,
      urduSnippet: ayahGroup.urduSnippet,
    });
    setEditingNote(null);
    setNoteEditorVisible(true);
  };

  const handleEditNote = (note: StudyNote) => {
    setEditingNote(note);
    setTargetAyahForNewNote(null);
    setNoteEditorVisible(true);
  };

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderSurahGroup = ({ item: surahGroup }: { item: SurahNotesGroup }) => {
    const surah = surahGroup.surahMeta;
    const isSurahCollapsed = Boolean(collapsedSurahs[surahGroup.surahNumber]);

    return (
      <View
        style={[
          styles.surahSectionCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        {/* Surah Level Header (Tappable to toggle collapse) */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => toggleSurahCollapse(surahGroup.surahNumber)}
          style={[styles.surahHeaderRow, { borderBottomColor: theme.borderSubtle }]}
        >
          <View style={styles.surahTitleGroup}>
            <View style={[styles.surahNumberBadge, { backgroundColor: theme.primaryMuted }]}>
              <Text style={[styles.surahNumberBadgeText, { color: theme.primary }]}>
                {surahGroup.surahNumber}
              </Text>
            </View>
            <View style={styles.surahTextCol}>
              <View style={styles.surahNameRow}>
                <Text style={[styles.surahEnglishName, { color: theme.textPrimary }]}>
                  {surah ? surah.englishName : `Surah ${surahGroup.surahNumber}`}
                </Text>
                {surah ? (
                  <Text style={[styles.surahArabicName, { color: theme.arabicText }]}>
                    {surah.name}
                  </Text>
                ) : null}
              </View>
              <Text style={[styles.surahSubtitleText, { color: theme.textSecondary }]}>
                {surah ? `${surah.englishNameTranslation} • ` : ''}
                {surahGroup.totalNotes} {surahGroup.totalNotes === 1 ? 'reflection' : 'reflections'} across{' '}
                {surahGroup.ayahGroups.length} {surahGroup.ayahGroups.length === 1 ? 'verse' : 'verses'}
              </Text>
            </View>
          </View>

          <View style={styles.surahHeaderRight}>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                handleOpenSurahInReader(surahGroup.surahNumber);
              }}
              style={[styles.openSurahBtn, { backgroundColor: theme.surfaceHighlight }]}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <Text style={[styles.openSurahBtnText, { color: theme.primary }]}>Surah</Text>
              <Ionicons name="arrow-forward" size={12} color={theme.primary} />
            </TouchableOpacity>

            <Ionicons
              name={isSurahCollapsed ? 'chevron-down' : 'chevron-up'}
              size={18}
              color={theme.textTertiary}
            />
          </View>
        </TouchableOpacity>

        {/* Ayahs in this Surah (Hidden when Surah is collapsed) */}
        {!isSurahCollapsed && (
          <View style={styles.ayahsContainer}>
            {surahGroup.ayahGroups.map((ayahGroup) => {
              const ayahKey = `${ayahGroup.surahNumber}:${ayahGroup.ayahNumber}`;
              const isAyahCollapsed = Boolean(collapsedAyahs[ayahKey]);

              return (
                <View
                  key={ayahKey}
                  style={[
                    styles.ayahCard,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.borderSubtle,
                    },
                  ]}
                >
                  {/* Ayah Header Bar (Tappable to toggle collapse) */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => toggleAyahCollapse(ayahGroup.surahNumber, ayahGroup.ayahNumber)}
                    style={styles.ayahHeaderRow}
                  >
                    <View style={styles.ayahTagGroup}>
                      <View style={[styles.ayahBadge, { backgroundColor: theme.noteMuted }]}>
                        <Text style={[styles.ayahBadgeText, { color: theme.noteAccent }]}>
                          Ayah {ayahGroup.ayahNumber} ({ayahGroup.surahNumber}:{ayahGroup.ayahNumber})
                        </Text>
                      </View>
                      <View style={[styles.notesMiniCount, { backgroundColor: theme.chipBg }]}>
                        <Text style={[styles.notesMiniCountText, { color: theme.textSecondary }]}>
                          {ayahGroup.notes.length} {ayahGroup.notes.length === 1 ? 'note' : 'notes'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.ayahActionsGroup}>
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          handleAddNewNoteToAyah(ayahGroup);
                        }}
                        style={[styles.addNoteBtn, { backgroundColor: theme.card, borderColor: theme.borderSubtle }]}
                        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                      >
                        <Ionicons name="add" size={13} color={theme.primary} />
                        <Text style={[styles.addNoteBtnText, { color: theme.primary }]}>Add</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          handleOpenAyahInReader(ayahGroup.surahNumber, ayahGroup.ayahNumber);
                        }}
                        style={[styles.jumpVerseBtn, { backgroundColor: theme.card, borderColor: theme.borderSubtle }]}
                        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                      >
                        <Ionicons name="book-outline" size={12} color={theme.textSecondary} />
                        <Text style={[styles.jumpVerseBtnText, { color: theme.textSecondary }]}>Read</Text>
                      </TouchableOpacity>

                      <Ionicons
                        name={isAyahCollapsed ? 'chevron-down' : 'chevron-up'}
                        size={16}
                        color={theme.textTertiary}
                      />
                    </View>
                  </TouchableOpacity>

                  {/* Snippet Preview (Shown when Ayah is expanded) */}
                  {!isAyahCollapsed && (
                    <>
                      {ayahGroup.arabicSnippet ? (
                        <Text style={[styles.arabicSnippetPreview, { color: theme.arabicText }]} numberOfLines={1}>
                          {ayahGroup.arabicSnippet}
                        </Text>
                      ) : null}

                      {ayahGroup.urduSnippet ? (
                        <Text style={[styles.urduSnippetPreview, { color: theme.urduText }]} numberOfLines={1}>
                          "{ayahGroup.urduSnippet}"
                        </Text>
                      ) : null}

                      {/* Compact Sleek Note Rows (Tap to view full note in NoteViewerModal) */}
                      <View style={styles.notesListForAyah}>
                        {ayahGroup.notes.map((note) => {
                          const isVoice = Boolean(note.voiceNote);
                          const isText = Boolean(note.text && note.text.trim());
                          const previewSnippet = isText
                            ? note.text.trim()
                            : isVoice
                            ? `Voice note (${formatDurationMs(note.voiceNote?.durationMillis || 0)})`
                            : 'Reflection';

                          return (
                            <TouchableOpacity
                              key={note.id}
                              activeOpacity={0.72}
                              onPress={() => {
                                setViewingNote(note);
                                setNoteViewerVisible(true);
                              }}
                              style={[
                                styles.compactNoteRow,
                                {
                                  backgroundColor: theme.card,
                                  borderColor: theme.borderSubtle,
                                },
                              ]}
                            >
                              <View style={[styles.compactNoteIconPill, { backgroundColor: theme.noteMuted }]}>
                                <Ionicons
                                  name={
                                    isVoice && !isText
                                      ? 'mic'
                                      : !isVoice
                                      ? 'document-text'
                                      : 'chatbubbles'
                                  }
                                  size={13}
                                  color={theme.noteAccent}
                                />
                              </View>

                              <Text
                                style={[styles.compactNoteSnippet, { color: theme.textPrimary }]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                {previewSnippet}
                              </Text>

                              <View style={styles.compactNoteMeta}>
                                <Text style={[styles.compactNoteDateText, { color: theme.textTertiary }]}>
                                  {formatDate(note.updatedAt || note.createdAt)}
                                </Text>
                                <Ionicons name="chevron-forward" size={13} color={theme.textTertiary} />
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  const activeSurahNum = editingNote
    ? editingNote.surahNumber
    : targetAyahForNewNote?.surahNumber;
  const activeAyahNum = editingNote
    ? editingNote.ayahNumber
    : targetAyahForNewNote?.ayahNumber;
  const activeSurahMeta = activeSurahNum
    ? SURAHS.find((s) => s.number === activeSurahNum)
    : null;

  const activeViewerSurahMeta = viewingNote
    ? SURAHS.find((s) => s.number === viewingNote.surahNumber)
    : null;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View>
            <Text style={[styles.screenTitle, { color: theme.textPrimary }]}>Notebook</Text>
            <Text style={[styles.screenSubtitle, { color: theme.textSecondary }]}>
              Reflections grouped by Surah & Ayah
            </Text>
          </View>
        </View>

        {/* Stats Summary Bar */}
        {stats.totalNotes > 0 && (
          <View style={[styles.statsBar, { backgroundColor: theme.surfaceHighlight, borderColor: theme.borderSubtle }]}>
            <View style={styles.statPill}>
              <Ionicons name="journal-outline" size={14} color={theme.primary} />
              <Text style={[styles.statPillText, { color: theme.textPrimary }]}>
                <Text style={{ fontWeight: '700' }}>{stats.totalNotes}</Text>{' '}
                {stats.totalNotes === 1 ? 'Reflection' : 'Reflections'}
              </Text>
            </View>
            <Text style={[styles.statDot, { color: theme.textTertiary }]}>•</Text>
            <View style={styles.statPill}>
              <Ionicons name="book-outline" size={14} color={theme.accentGold} />
              <Text style={[styles.statPillText, { color: theme.textPrimary }]}>
                <Text style={{ fontWeight: '700' }}>{stats.totalAyahs}</Text>{' '}
                {stats.totalAyahs === 1 ? 'Verse' : 'Verses'}
              </Text>
            </View>
            <Text style={[styles.statDot, { color: theme.textTertiary }]}>•</Text>
            <View style={styles.statPill}>
              <Ionicons name="layers-outline" size={14} color={theme.tertiary} />
              <Text style={[styles.statPillText, { color: theme.textPrimary }]}>
                <Text style={{ fontWeight: '700' }}>{stats.totalSurahs}</Text>{' '}
                {stats.totalSurahs === 1 ? 'Surah' : 'Surahs'}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Search Input */}
      {stats.totalNotes > 0 && (
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Ionicons name="search" size={18} color={theme.textTertiary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: theme.textPrimary }]}
              placeholder="Search reflections, surah, or verse (e.g. 2:255)..."
              placeholderTextColor={theme.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={16} color={theme.textTertiary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Grouped Surah & Ayah FlatList */}
      <FlatList
        data={surahGroups}
        keyExtractor={(item) => String(item.surahNumber)}
        renderItem={renderSurahGroup}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          searchQuery.trim().length > 0 ? (
            <View style={styles.emptyContainer}>
              <View style={[styles.emptyIconCircle, { backgroundColor: theme.surface }]}>
                <Ionicons name="search-outline" size={32} color={theme.textTertiary} />
              </View>
              <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
                No reflections found
              </Text>
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                No study notes match "{searchQuery}". Try searching by Surah name, Ayah number, or reflection content.
              </Text>
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={[styles.browseBtn, { backgroundColor: theme.primary }]}
              >
                <Text style={[styles.browseBtnText, { color: theme.onPrimary }]}>Clear Search</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <View style={[styles.emptyIconCircle, { backgroundColor: theme.surface }]}>
                <Ionicons name="journal-outline" size={36} color={theme.textTertiary} />
              </View>
              <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
                Your Quran Notebook is empty
              </Text>
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                While reading any Surah, tap Note below an ayah to write a reflection or record a voice note. You can add multiple voice and text notes per ayah!
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/quran')}
                style={[styles.browseBtn, { backgroundColor: theme.primary }]}
              >
                <Text style={[styles.browseBtnText, { color: theme.onPrimary }]}>Browse the Quran</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />

      {/* Note Editor Modal */}
      <NoteEditorModal
        visible={noteEditorVisible}
        surahNumber={activeSurahNum ?? 1}
        ayahNumber={activeAyahNum ?? 1}
        surahName={activeSurahMeta?.englishName || `Surah ${activeSurahNum ?? ''}`}
        arabicText={editingNote ? editingNote.arabicSnippet : targetAyahForNewNote?.arabicSnippet}
        urduText={editingNote ? editingNote.urduSnippet : targetAyahForNewNote?.urduSnippet}
        initialNote={editingNote?.text || ''}
        initialVoiceNote={editingNote?.voiceNote}
        noteId={editingNote?.id}
        onSave={(newText, voiceNote) => {
          if (!activeSurahNum || !activeAyahNum) return;
          saveNote(
            activeSurahNum,
            activeAyahNum,
            newText,
            editingNote ? editingNote.arabicSnippet : targetAyahForNewNote?.arabicSnippet,
            editingNote ? editingNote.urduSnippet : targetAyahForNewNote?.urduSnippet,
            voiceNote,
            editingNote?.id
          );
          setNoteEditorVisible(false);
        }}
        onDelete={
          editingNote
            ? () => {
                deleteNote(editingNote.id);
                setNoteEditorVisible(false);
              }
            : undefined
        }
        onClose={() => {
          setNoteEditorVisible(false);
          setEditingNote(null);
          setTargetAyahForNewNote(null);
        }}
      />

      {/* Dedicated Note Viewer Modal */}
      <NoteViewerModal
        visible={noteViewerVisible}
        note={viewingNote}
        surahName={activeViewerSurahMeta?.englishName || `Surah ${viewingNote?.surahNumber ?? ''}`}
        arabicText={viewingNote?.arabicSnippet}
        urduText={viewingNote?.urduSnippet}
        onClose={() => {
          setNoteViewerVisible(false);
          setViewingNote(null);
        }}
        onEdit={(note) => {
          handleEditNote(note);
        }}
        onDelete={(noteId) => {
          deleteNote(noteId);
        }}
        onOpenInReader={(surahNum, ayahNum) => {
          handleOpenAyahInReader(surahNum, ayahNum);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
