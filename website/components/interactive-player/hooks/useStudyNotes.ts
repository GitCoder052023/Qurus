"use client";

import { useState, useEffect } from "react";
import { StudyNoteData, SampleAyah, VoiceNoteData } from "../../../types/player";

export function useStudyNotes(onBeforeOpenModal?: () => void) {
  const [notes, setNotes] = useState<{ [key: number]: StudyNoteData[] }>({
    1: [],
    2: [],
  });
  const [collapsedNotes, setCollapsedNotes] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
  });

  // Modal State
  const [editorModalOpen, setEditorModalOpen] = useState<boolean>(false);
  const [viewerModalOpen, setViewerModalOpen] = useState<boolean>(false);
  const [selectedAyahForNote, setSelectedAyahForNote] = useState<SampleAyah | null>(null);
  const [selectedNoteForView, setSelectedNoteForView] = useState<StudyNoteData | null>(null);
  const [editingNote, setEditingNote] = useState<StudyNoteData | null>(null);

  // Load saved notes from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem("qurus_app_replicated_notes");
        if (saved) {
          setNotes(JSON.parse(saved));
        }
      } catch (e) {
        console.warn("Could not read notes from localStorage:", e);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const persistNotes = (updated: { [key: number]: StudyNoteData[] }) => {
    setNotes(updated);
    try {
      localStorage.setItem("qurus_app_replicated_notes", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not persist notes:", e);
    }
  };

  const openNewNoteModal = (ayah: SampleAyah) => {
    onBeforeOpenModal?.();
    setSelectedAyahForNote(ayah);
    setEditingNote(null);
    setEditorModalOpen(true);
  };

  const openEditNoteModal = (ayah: SampleAyah, note: StudyNoteData) => {
    onBeforeOpenModal?.();
    setSelectedAyahForNote(ayah);
    setEditingNote(note);
    setViewerModalOpen(false);
    setEditorModalOpen(true);
  };

  const openViewNoteModal = (ayah: SampleAyah, note: StudyNoteData) => {
    setSelectedAyahForNote(ayah);
    setSelectedNoteForView(note);
    setViewerModalOpen(true);
  };

  const handleSaveNote = (
    ayahNumber: number,
    text: string,
    voiceNote: VoiceNoteData | null,
    existingId?: string
  ) => {
    const now = Date.now();
    const existingList = notes[ayahNumber] || [];

    let updatedList: StudyNoteData[];
    if (existingId) {
      updatedList = existingList.map((item) =>
        item.id === existingId
          ? { ...item, text, voiceNote, updatedAt: now }
          : item
      );
    } else {
      const newNote: StudyNoteData = {
        id: `note_${now}_${Math.random().toString(36).substring(2, 7)}`,
        surahNumber: 1,
        ayahNumber,
        text,
        voiceNote,
        createdAt: now,
        updatedAt: now,
      };
      updatedList = [newNote, ...existingList];
    }

    const updatedNotes = { ...notes, [ayahNumber]: updatedList };
    persistNotes(updatedNotes);
    setEditorModalOpen(false);
  };

  const handleDeleteNote = (ayahNumber: number, noteId: string) => {
    const existingList = notes[ayahNumber] || [];
    const updatedList = existingList.filter((item) => item.id !== noteId);
    const updatedNotes = { ...notes, [ayahNumber]: updatedList };
    persistNotes(updatedNotes);
    setViewerModalOpen(false);
    setEditorModalOpen(false);
  };

  const toggleNotesCollapsed = (ayahNumber: number) => {
    setCollapsedNotes((prev) => ({
      ...prev,
      [ayahNumber]: !prev[ayahNumber],
    }));
  };

  return {
    notes,
    collapsedNotes,
    toggleNotesCollapsed,
    editorModalOpen,
    setEditorModalOpen,
    viewerModalOpen,
    setViewerModalOpen,
    selectedAyahForNote,
    selectedNoteForView,
    editingNote,
    openNewNoteModal,
    openEditNoteModal,
    openViewNoteModal,
    handleSaveNote,
    handleDeleteNote,
  };
}
