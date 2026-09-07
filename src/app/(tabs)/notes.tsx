import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { SURAHS } from '../../data/surahs';
import { StudyNote } from '../../types';
import { NoteEditorModal } from '../../components/NoteEditorModal';
import { NoteViewerModal } from '../../components/NoteViewerModal';
import { AyahNotesGroup, SurahNotesGroup } from '../../features/notes/types';
import { useNotesGrouping } from '../../features/notes/hooks/useNotesGrouping';
import { NotesStatsBanner } from '../../features/notes/components/NotesStatsBanner';
import { NotesSearchBar } from '../../features/notes/components/NotesSearchBar';
import { NotesEmptyState } from '../../features/notes/components/NotesEmptyState';
import { SurahNotesGroupCard } from '../../features/notes/components/SurahNotesGroupCard';
import { styles } from '../../features/notes/styles/notes.styles';

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

  const { stats, filteredNotes, surahGroups } = useNotesGrouping(notes, searchQuery);

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
        <NotesStatsBanner stats={stats} theme={theme} />
      </View>

      {/* Search Input */}
      {stats.totalNotes > 0 && (
        <NotesSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          theme={theme}
        />
      )}

      {/* Grouped Surah & Ayah FlatList */}
      <FlatList
        data={surahGroups}
        keyExtractor={(item) => String(item.surahNumber)}
        renderItem={({ item }) => (
          <SurahNotesGroupCard
            surahGroup={item}
            isSurahCollapsed={Boolean(collapsedSurahs[item.surahNumber])}
            onToggleSurahCollapse={toggleSurahCollapse}
            collapsedAyahs={collapsedAyahs}
            onToggleAyahCollapse={toggleAyahCollapse}
            onAddNewNoteToAyah={handleAddNewNoteToAyah}
            onOpenAyahInReader={handleOpenAyahInReader}
            onOpenSurahInReader={handleOpenSurahInReader}
            onSelectNoteForView={(note) => {
              setViewingNote(note);
              setNoteViewerVisible(true);
            }}
            formatDate={formatDate}
            theme={theme}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <NotesEmptyState
            isSearching={searchQuery.trim().length > 0}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
            theme={theme}
          />
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
