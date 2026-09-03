import { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useStudyState } from '../../../context/StudyContext';
import { SURAHS } from '../../../data/surahs';
import { filterNotes } from '../../../lib/filterNotes';
import { StudyNote } from '../../../types';

export function useNotesList() {
  const { notes, saveNote, deleteNote } = useStudyState();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);

  const noteList = useMemo(() => filterNotes(notes, searchQuery), [notes, searchQuery]);

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

  const activeSurahForModal = editingNote
    ? SURAHS.find((s) => s.number === editingNote.surahNumber)
    : null;

  return {
    notes,
    saveNote,
    deleteNote,
    router,
    searchQuery,
    setSearchQuery,
    editingNote,
    setEditingNote,
    noteList,
    handleOpenNoteInReader,
    handleDeletePrompt,
    activeSurahForModal,
  };
}
