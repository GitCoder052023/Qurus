"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  VoiceNoteData,
  StudyNoteData,
  LanguageKey,
  LanguageMeta,
  SampleAyah,
} from "../types/player";
import { LANGUAGES } from "../data/languages";
import { SAMPLE_AYAHS } from "../data/sampleAyahs";
import { useInteractiveAudio } from "./interactive-player/hooks/useInteractiveAudio";
import { useStudyNotes } from "./interactive-player/hooks/useStudyNotes";
import { LanguageSelectorTabs } from "./interactive-player/components/LanguageSelectorTabs";
import { PlayerTopBar } from "./interactive-player/components/PlayerTopBar";
import { InteractiveAyahCard } from "./interactive-player/components/InteractiveAyahCard";
import { PlayerAppInvitationFooter } from "./interactive-player/components/PlayerAppInvitationFooter";
import { NoteEditorModal } from "./interactive-player/components/NoteEditorModal";
import { NoteViewerModal } from "./interactive-player/components/NoteViewerModal";

export type { VoiceNoteData, StudyNoteData, LanguageKey, LanguageMeta };
export { LANGUAGES };

export default function InteractivePlayer() {
  const {
    selectedLanguage,
    activeAyahIndex,
    isPlaying,
    playbackPhase,
    audioMode,
    setAudioMode,
    handleTogglePlay,
    handleLanguageChange,
    stopPlayback,
  } = useInteractiveAudio();

  const {
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
  } = useStudyNotes(stopPlayback);

  // Ayah Bookmark, Highlight, and Copied state
  const [bookmarked, setBookmarked] = useState<{ [key: number]: boolean }>({ 0: false, 1: false });
  const [highlighted, setHighlighted] = useState<{ [key: number]: boolean }>({ 0: false, 1: false });
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  const handleBookmarkToggle = (index: number) => {
    setBookmarked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleHighlightToggle = (index: number) => {
    setHighlighted((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleShare = (ayah: SampleAyah) => {
    const langMeta = LANGUAGES[selectedLanguage];
    const transText = ayah.translations[selectedLanguage].text;
    const text = `${ayah.arabicText}\n\n${transText}\n\n— [Surah Al-Faatiha 1:${ayah.numberInSurah}] (${langMeta.name}: ${langMeta.author})`;
    navigator.clipboard?.writeText(text);
    setCopiedAyah(ayah.numberInSurah);
    setTimeout(() => setCopiedAyah(null), 2200);
  };

  const currentLang = LANGUAGES[selectedLanguage];

  return (
    <section id="experience" className="py-24 md:py-36 bg-surface/50 border-y border-border-subtle overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header with Simple, Converting Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Interactive Preview
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter text-text-primary text-balance">
            Experience how effortless understanding feels.
          </h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg leading-relaxed text-balance">
            Choose your language and press <strong>Play</strong>. Listen as the original Arabic recitation flows naturally into clear spoken translation.
          </p>
        </motion.div>

        {/* The Machined Hardware Doppelrand App Frame with Motion Entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="doppelrand-shell"
        >
          <div className="doppelrand-core overflow-hidden">
            {/* Language Selector Bar */}
            <LanguageSelectorTabs
              selectedLanguage={selectedLanguage}
              onSelectLanguage={handleLanguageChange}
            />

            {/* Top Bar matching Qurus Mobile Top Bar */}
            <PlayerTopBar
              currentLang={currentLang}
              audioMode={audioMode}
              onSetAudioMode={setAudioMode}
            />

            {/* Verses List Preview - Replicating AyahItem.tsx */}
            <div className="p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              {SAMPLE_AYAHS.map((ayah, index) => (
                <InteractiveAyahCard
                  key={ayah.numberInSurah}
                  ayah={ayah}
                  index={index}
                  selectedLanguage={selectedLanguage}
                  currentLang={currentLang}
                  isThisAyahActive={activeAyahIndex === index}
                  isPlaying={isPlaying}
                  playbackPhase={playbackPhase}
                  isBookmarked={Boolean(bookmarked[index])}
                  isHighlighted={Boolean(highlighted[index])}
                  copiedAyah={copiedAyah}
                  ayahNotes={notes[ayah.numberInSurah] || []}
                  isNotesCollapsed={Boolean(collapsedNotes[ayah.numberInSurah])}
                  onTogglePlay={handleTogglePlay}
                  onToggleBookmark={handleBookmarkToggle}
                  onToggleHighlight={handleHighlightToggle}
                  onShare={handleShare}
                  onOpenNewNote={openNewNoteModal}
                  onOpenViewNote={openViewNoteModal}
                  onToggleNotesCollapsed={toggleNotesCollapsed}
                />
              ))}
            </div>

            {/* Invitation Footer Card */}
            <PlayerAppInvitationFooter />
          </div>
        </motion.div>
      </div>

      {/* REPLICATED QURUS APP MODALS */}
      <AnimatePresence>
        {/* 1. Note Editor Modal */}
        {editorModalOpen && selectedAyahForNote && (
          <NoteEditorModal
            surahName="Surah Al-Faatiha"
            surahNumber={1}
            ayahNumber={selectedAyahForNote.numberInSurah}
            arabicText={selectedAyahForNote.arabicText}
            translationText={selectedAyahForNote.translations[selectedLanguage].text}
            isRTL={currentLang.isRTL}
            initialNote={editingNote?.text || ""}
            initialVoiceNote={editingNote?.voiceNote || null}
            noteId={editingNote?.id}
            onClose={() => setEditorModalOpen(false)}
            onSave={(text, voiceNote) =>
              handleSaveNote(
                selectedAyahForNote.numberInSurah,
                text,
                voiceNote,
                editingNote?.id
              )
            }
            onDelete={
              editingNote
                ? () => handleDeleteNote(selectedAyahForNote.numberInSurah, editingNote.id)
                : undefined
            }
          />
        )}

        {/* 2. Note Viewer Modal */}
        {viewerModalOpen && selectedNoteForView && selectedAyahForNote && (
          <NoteViewerModal
            surahName="Surah Al-Faatiha"
            surahNumber={1}
            ayahNumber={selectedAyahForNote.numberInSurah}
            arabicText={selectedAyahForNote.arabicText}
            translationText={selectedAyahForNote.translations[selectedLanguage].text}
            isRTL={currentLang.isRTL}
            note={selectedNoteForView}
            onClose={() => setViewerModalOpen(false)}
            onEdit={() => openEditNoteModal(selectedAyahForNote, selectedNoteForView)}
            onDelete={() =>
              handleDeleteNote(selectedAyahForNote.numberInSurah, selectedNoteForView.id)
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}
