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
import { StudyNote } from '../../types';
import { NoteEditorModal } from '../../components/NoteEditorModal';
import { VoiceNotePlayer } from '../../components/VoiceNotePlayer';

export default function NotesScreen() {
  const { theme } = useTheme();
  const { notes, saveNote, deleteNote } = useStudyState();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);
  const [noteEditorVisible, setNoteEditorVisible] = useState(false);

  // Convert notes map to array and sort by updatedAt desc
  const noteList = useMemo(() => {
    const list = Object.values(notes).sort((a, b) => b.updatedAt - a.updatedAt);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (n) =>
        n.text.toLowerCase().includes(q) ||
        (Boolean(n.voiceNote) && 'voice note'.startsWith(q)) ||
        (n.urduSnippet && n.urduSnippet.toLowerCase().includes(q)) ||
        `${n.surahNumber}:${n.ayahNumber}`.includes(q)
    );
  }, [notes, searchQuery]);

  const handleOpenNoteInReader = (note: StudyNote) => {
    router.push(`/reader/${note.surahNumber}?ayah=${note.ayahNumber}`);
  };

  const handleDeletePrompt = (note: StudyNote) => {
    Alert.alert(
      'Delete Study Note',
      `Delete your reflection on ${note.surahNumber}:${note.ayahNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteNote(note.surahNumber, note.ayahNumber),
        },
      ]
    );
  };

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderNoteItem = ({ item }: { item: StudyNote }) => {
    const surah = SURAHS.find((s) => s.number === item.surahNumber);
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        {/* Header with Surah & Ayah Badge */}
        <View style={styles.cardHeader}>
          <TouchableOpacity
            onPress={() => handleOpenNoteInReader(item)}
            style={styles.surahTag}
          >
            <Ionicons name="journal" size={16} color={theme.noteAccent} />
            <Text style={[styles.surahName, { color: theme.textPrimary }]}>
              {surah ? surah.englishName : `Surah ${item.surahNumber}`}
            </Text>
            <View style={[styles.ayahBadge, { backgroundColor: theme.noteMuted }]}>
              <Text style={[styles.ayahBadgeText, { color: theme.noteAccent }]}>
                {item.surahNumber}:{item.ayahNumber}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => {
                setEditingNote(item);
                setNoteEditorVisible(true);
              }}
              style={styles.iconBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="create-outline" size={18} color={theme.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeletePrompt(item)}
              style={styles.iconBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="trash-outline" size={18} color={theme.textTertiary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Translation Snippet Preview */}
        {item.urduSnippet ? (
          <View style={[styles.verseSnippet, { backgroundColor: theme.surface }]}>
            <Text style={[styles.urduSnippet, { color: theme.urduText }]} numberOfLines={2}>
              "{item.urduSnippet}"
            </Text>
          </View>
        ) : null}

        {item.text ? (
          <Text style={[styles.noteContent, { color: theme.textPrimary }]}>{item.text}</Text>
        ) : null}

        {item.voiceNote ? (
          <View style={styles.voiceWrap}>
            <VoiceNotePlayer voiceNote={item.voiceNote} compact />
          </View>
        ) : null}

        {/* Footer */}
        <View style={[styles.cardFooter, { borderTopColor: theme.borderSubtle }]}>
          <Text style={[styles.dateText, { color: theme.textTertiary }]}>
            Updated {formatDate(item.updatedAt)}
          </Text>
          <TouchableOpacity
            onPress={() => handleOpenNoteInReader(item)}
            style={styles.jumpLink}
          >
            <Text style={[styles.jumpLinkText, { color: theme.primary }]}>Open Verse</Text>
            <Ionicons name="arrow-forward" size={12} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const activeSurahForModal = editingNote ? SURAHS.find((s) => s.number === editingNote.surahNumber) : null;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: theme.textPrimary }]}>Notebook</Text>
        <Text style={[styles.screenSubtitle, { color: theme.textSecondary }]}>
          Written and spoken reflections on verses
        </Text>
      </View>

      {/* Search Input */}
      {Object.keys(notes).length > 0 && (
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Ionicons name="search" size={18} color={theme.textTertiary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: theme.textPrimary }]}
              placeholder="Search your notes or ayah reference..."
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

      {/* Notes List */}
      <FlatList
        data={noteList}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIconCircle, { backgroundColor: theme.surface }]}>
              <Ionicons name="journal-outline" size={36} color={theme.textTertiary} />
            </View>
            <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
              Your Quran study notes will appear here.
            </Text>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              While reading any Surah, tap Note below an ayah to write a reflection or record a voice note.
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/quran')}
              style={[styles.browseBtn, { backgroundColor: theme.primary }]}
            >
              <Text style={[styles.browseBtnText, { color: theme.onPrimary }]}>Browse the Quran</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <NoteEditorModal
        visible={noteEditorVisible}
        surahNumber={editingNote?.surahNumber ?? 1}
        ayahNumber={editingNote?.ayahNumber ?? 1}
        surahName={activeSurahForModal?.englishName || `Surah ${editingNote?.surahNumber ?? ''}`}
        arabicText={editingNote?.arabicSnippet}
        urduText={editingNote?.urduSnippet}
        initialNote={editingNote?.text || ''}
        initialVoiceNote={editingNote?.voiceNote}
        onSave={(newText, voiceNote) => {
          if (!editingNote) return;
          saveNote(
            editingNote.surahNumber,
            editingNote.ayahNumber,
            newText,
            editingNote.arabicSnippet,
            editingNote.urduSnippet,
            voiceNote
          );
          setNoteEditorVisible(false);
        }}
        onDelete={() => {
          if (!editingNote) return;
          deleteNote(editingNote.surahNumber, editingNote.ayahNumber);
          setNoteEditorVisible(false);
        }}
        onClose={() => setNoteEditorVisible(false)}
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
    paddingBottom: 14,
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
  card: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  surahTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  surahName: {
    fontSize: 15,
    fontWeight: '600',
  },
  ayahBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ayahBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    padding: 4,
  },
  verseSnippet: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  urduSnippet: {
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  noteContent: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 14,
  },
  voiceWrap: {
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
  },
  dateText: {
    fontSize: 11,
  },
  jumpLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  jumpLinkText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
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
    paddingVertical: 10,
    borderRadius: 14,
  },
  browseBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
