import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { NoteEditorModal } from '../../components/NoteEditorModal';
import { StudyNote } from '../../types';
import { NoteCard } from './components/NoteCard';
import { NotesEmptyState } from './components/NotesEmptyState';
import { useNotesList } from './hooks/useNotesList';
import { styles } from './styles';

export function NotesScreen() {
  const { theme } = useTheme();
  const {
    notes,
    saveNote,
    deleteNote,
    searchQuery,
    setSearchQuery,
    editingNote,
    setEditingNote,
    noteList,
    handleOpenNoteInReader,
    handleDeletePrompt,
    activeSurahForModal,
  } = useNotesList();

  const renderNoteItem = ({ item }: { item: StudyNote }) => (
    <NoteCard
      item={item}
      theme={theme}
      onOpenInReader={handleOpenNoteInReader}
      onEdit={setEditingNote}
      onDelete={handleDeletePrompt}
    />
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: theme.textPrimary }]}>Study Notebook</Text>
        <Text style={[styles.screenSubtitle, { color: theme.textSecondary }]}>
          Your reflections, thoughts, and lessons attached to verses
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
        ListEmptyComponent={<NotesEmptyState theme={theme} />}
      />

      {/* Note Editor Modal */}
      {editingNote && (
        <NoteEditorModal
          visible={Boolean(editingNote)}
          surahNumber={editingNote.surahNumber}
          ayahNumber={editingNote.ayahNumber}
          surahName={activeSurahForModal?.englishName || `Surah ${editingNote.surahNumber}`}
          arabicText={editingNote.arabicSnippet}
          urduText={editingNote.urduSnippet}
          initialNote={editingNote.text}
          onSave={(newText) => {
            saveNote(
              editingNote.surahNumber,
              editingNote.ayahNumber,
              newText,
              editingNote.arabicSnippet,
              editingNote.urduSnippet
            );
            setEditingNote(null);
          }}
          onDelete={() => {
            deleteNote(editingNote.surahNumber, editingNote.ayahNumber);
            setEditingNote(null);
          }}
          onClose={() => setEditingNote(null)}
        />
      )}
    </SafeAreaView>
  );
}
