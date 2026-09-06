"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Types matching Qurus App
export interface VoiceNoteData {
  uri: string;
  durationMillis: number;
}

export interface StudyNoteData {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  text: string;
  voiceNote: VoiceNoteData | null;
  createdAt: number;
  updatedAt: number;
}

interface SampleAyah {
  numberInSurah: number;
  arabicText: string;
  urduText: string;
  arabicAudio: string;
  urduAudio: string;
}

const SAMPLE_AYAHS: SampleAyah[] = [
  {
    numberInSurah: 1,
    arabicText: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    urduText: "شروع الله کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے",
    arabicAudio: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3",
    urduAudio:
      "https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/001001.mp3",
  },
  {
    numberInSurah: 2,
    arabicText: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
    urduText: "سب طرح کی تعریف خدا ہی کو (سزاوار) ہے جو تمام مخلوقات کا پروردگار ہے",
    arabicAudio: "https://everyayah.com/data/Alafasy_128kbps/001002.mp3",
    urduAudio:
      "https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/001002.mp3",
  },
];

type AudioMode = "both" | "arabic" | "urdu";

function formatDurationMs(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function InteractivePlayer() {
  // Recitation Playback State
  const [activeAyahIndex, setActiveAyahIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackPhase, setPlaybackPhase] = useState<"arabic" | "urdu" | "idle">("idle");
  const [audioMode, setAudioMode] = useState<AudioMode>("both");

  // Ayah Bookmark and Highlight/Mark State
  const [bookmarked, setBookmarked] = useState<{ [key: number]: boolean }>({ 0: false, 1: false });
  const [highlighted, setHighlighted] = useState<{ [key: number]: boolean }>({ 0: false, 1: false });
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  // Notes State (matching Qurus study notes system)
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

  // Audio refs
  const recitationAudioRef = useRef<HTMLAudioElement | null>(null);

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

  // Cleanup recitation audio on unmount
  useEffect(() => {
    return () => {
      if (recitationAudioRef.current) {
        recitationAudioRef.current.pause();
      }
    };
  }, []);

  const persistNotes = (updated: { [key: number]: StudyNoteData[] }) => {
    setNotes(updated);
    try {
      localStorage.setItem("qurus_app_replicated_notes", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not persist notes:", e);
    }
  };

  // Recitation Audio Logic
  const playPhaseRef = useRef<(phase: "arabic" | "urdu", ayahIdx: number) => void>(() => {});

  const playPhase = useCallback(
    (phase: "arabic" | "urdu", ayahIdx: number) => {
      const ayah = SAMPLE_AYAHS[ayahIdx];
      const src = phase === "arabic" ? ayah.arabicAudio : ayah.urduAudio;

      if (!recitationAudioRef.current) {
        recitationAudioRef.current = new Audio();
      }

      const audio = recitationAudioRef.current;
      audio.src = src;
      audio.load();

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setPlaybackPhase(phase);
          setActiveAyahIndex(ayahIdx);
        })
        .catch((e) => {
          console.warn("Playback interrupted:", e);
          setIsPlaying(false);
          setPlaybackPhase("idle");
        });

      audio.onended = () => {
        if (phase === "arabic" && audioMode === "both") {
          playPhaseRef.current("urdu", ayahIdx);
        } else if (audioMode === "both" && phase === "urdu" && ayahIdx === 0) {
          playPhaseRef.current("arabic", 1);
        } else {
          setIsPlaying(false);
          setPlaybackPhase("idle");
        }
      };
    },
    [audioMode]
  );

  useEffect(() => {
    playPhaseRef.current = playPhase;
  }, [playPhase]);

  const handleTogglePlay = (index: number) => {
    if (activeAyahIndex === index && isPlaying) {
      if (recitationAudioRef.current) {
        recitationAudioRef.current.pause();
      }
      setIsPlaying(false);
      setPlaybackPhase("idle");
    } else {
      const startPhase = audioMode === "urdu" ? "urdu" : "arabic";
      playPhase(startPhase, index);
    }
  };

  const handleBookmarkToggle = (index: number) => {
    setBookmarked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleHighlightToggle = (index: number) => {
    setHighlighted((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleShare = (ayah: SampleAyah) => {
    const text = `${ayah.arabicText}\n\n${ayah.urduText}\n\n— [Surah Al-Faatiha 1:${ayah.numberInSurah}] (Urdu: Fateh Muhammad Jalandhari)`;
    navigator.clipboard?.writeText(text);
    setCopiedAyah(ayah.numberInSurah);
    setTimeout(() => setCopiedAyah(null), 2200);
  };

  // Open Note Editor for new or existing note
  const openNewNoteModal = (ayah: SampleAyah) => {
    // Pause recitation if playing
    if (recitationAudioRef.current && isPlaying) {
      recitationAudioRef.current.pause();
      setIsPlaying(false);
      setPlaybackPhase("idle");
    }
    setSelectedAyahForNote(ayah);
    setEditingNote(null);
    setEditorModalOpen(true);
  };

  const openEditNoteModal = (ayah: SampleAyah, note: StudyNoteData) => {
    if (recitationAudioRef.current && isPlaying) {
      recitationAudioRef.current.pause();
      setIsPlaying(false);
      setPlaybackPhase("idle");
    }
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

  return (
    <section id="experience" className="py-20 md:py-28 bg-[#F2F7F5]/60 border-y border-[#EEF3F1]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E6B5C]/10 text-[#0E6B5C] text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E6B5C]" />
            A Glimpse of Qurus
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#122824]">
            Experience the tranquility of Qurus.
          </h2>
          <p className="mt-3 text-[#4A605C] text-base leading-relaxed">
            Listen to synchronized Arabic & Urdu recitation, or try recording a private voice note
            and saving written reflections directly to any verse.
          </p>
        </div>

        {/* The Clean App Frame Glimpse */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#D8E4E0] shadow-[0_16px_50px_rgba(18,40,36,0.06)] overflow-hidden">
          {/* Top Bar matching Qurus Mobile Top Bar */}
          <div className="bg-[#F2F7F5] px-4 py-3.5 sm:px-6 sm:py-4 border-b border-[#D8E4E0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E7F2EF] text-[#0E6B5C] font-bold text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#122824] truncate">Surah Al-Faatiha</h3>
                  <span className="text-xs text-[#7E9490] font-serif shrink-0">(The Opening)</span>
                </div>
                <div className="text-[11px] text-[#4A605C] truncate">
                  Reciter: <strong>Mishary Alafasy</strong> • Urdu: <strong>Shamshad Ali Khan</strong>
                </div>
              </div>
            </div>

            {/* Audio Mode Selectors - Full-width 3-col segmented control on mobile, auto-width on desktop */}
            <div className="grid grid-cols-3 sm:flex items-center bg-white rounded-xl p-1 border border-[#D8E4E0] text-xs w-full sm:w-auto text-center">
              <button
                onClick={() => setAudioMode("both")}
                className={`px-2 sm:px-3 py-1.5 sm:py-1 rounded-lg transition-all text-center ${
                  audioMode === "both"
                    ? "bg-[#0E6B5C] text-white font-medium shadow-xs"
                    : "text-[#4A605C] hover:text-[#122824]"
                }`}
              >
                Arabic + Urdu
              </button>
              <button
                onClick={() => setAudioMode("arabic")}
                className={`px-2 sm:px-3 py-1.5 sm:py-1 rounded-lg transition-all text-center ${
                  audioMode === "arabic"
                    ? "bg-[#0E6B5C] text-white font-medium shadow-xs"
                    : "text-[#4A605C] hover:text-[#122824]"
                }`}
              >
                Arabic Only
              </button>
              <button
                onClick={() => setAudioMode("urdu")}
                className={`px-2 sm:px-3 py-1.5 sm:py-1 rounded-lg transition-all text-center ${
                  audioMode === "urdu"
                    ? "bg-[#0E6B5C] text-white font-medium shadow-xs"
                    : "text-[#4A605C] hover:text-[#122824]"
                }`}
              >
                Urdu Only
              </button>
            </div>
          </div>

          {/* Verses List Preview - Replicating AyahItem.tsx */}
          <div className="p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {SAMPLE_AYAHS.map((ayah, index) => {
              const isThisAyahActive = activeAyahIndex === index;
              const isThisAyahPlaying = isThisAyahActive && isPlaying;
              const isRecitingArabic = isThisAyahPlaying && playbackPhase === "arabic";
              const isRecitingUrdu = isThisAyahPlaying && playbackPhase === "urdu";
              const isBookmarked = bookmarked[index];
              const isHighlighted = highlighted[index];

              const ayahNotes = notes[ayah.numberInSurah] || [];
              const isNotesCollapsed = collapsedNotes[ayah.numberInSurah];

              return (
                <div
                  key={ayah.numberInSurah}
                  className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isThisAyahActive
                      ? "bg-[#E8F2EF] border-[#0E6B5C] shadow-xs"
                      : isHighlighted
                      ? "bg-[#F8ECD8] border-[#C46B1A]"
                      : "bg-white border-[#D8E4E0] hover:border-[#0E6B5C]/40"
                  }`}
                >
                  {/* Top Header: Ayah Number Badge & Status Indicators */}
                  <div className="px-4 sm:px-6 pt-3.5 sm:pt-4 pb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors shrink-0 ${
                          isThisAyahActive
                            ? "bg-[#0E6B5C] text-white"
                            : "bg-[#DCE8E4] text-[#122824]"
                        }`}
                      >
                        {ayah.numberInSurah}
                      </div>
                    </div>

                    {/* Status badges */}
                    <div className="flex items-center gap-2">
                      {isHighlighted && (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F8ECD8] border border-[#C46B1A]/30 text-[11px] font-medium text-[#C46B1A]">
                          <span>★</span>
                          <span className="hidden xs:inline sm:inline">Important</span>
                        </div>
                      )}
                      {isBookmarked && (
                        <span className="text-[#C45C56]" title="Bookmarked">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quranic Arabic Text */}
                  <div className="px-4 sm:px-6 py-2.5 sm:py-3 text-right">
                    <p
                      className={`font-arabic text-xl sm:text-2xl md:text-3xl leading-[2.1] sm:leading-[2.2] tracking-normal transition-all duration-300 ${
                        isRecitingArabic
                          ? "text-[#0C1C1A] font-bold bg-[#E8F2EF] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl"
                          : "text-[#0C1C1A]"
                      }`}
                    >
                      {ayah.arabicText}
                    </p>
                  </div>

                  {/* Urdu Translation */}
                  <div className="px-4 sm:px-6 pb-3.5 sm:pb-4 text-right">
                    <p
                      className={`font-urdu text-sm sm:text-base md:text-lg leading-[2.0] sm:leading-[2.2] transition-all duration-300 ${
                        isRecitingUrdu
                          ? "text-[#2A3E3A] font-semibold bg-[#F8E8EB] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl"
                          : "text-[#2A3E3A]"
                      }`}
                    >
                      {ayah.urduText}
                    </p>
                    <p className="mt-1 text-[10px] sm:text-[11px] text-[#7E9490]">
                      — ترجمہ: فتح محمد جالندھری
                    </p>
                  </div>

                  {/* Sleek, Compact & Collapsible Personal Reflection Notes (Qurus App Style) */}
                  {ayahNotes.length > 0 && (
                    <div className="mx-5 sm:mx-6 mb-4 rounded-xl bg-[#EEEAF8] border border-[#D8E4E0] overflow-hidden">
                      {/* Header Bar */}
                      <div
                        onClick={() =>
                          setCollapsedNotes((prev) => ({
                            ...prev,
                            [ayah.numberInSurah]: !prev[ayah.numberInSurah],
                          }))
                        }
                        className="px-3 py-2 flex items-center justify-between cursor-pointer select-none hover:bg-[#5548A0]/5 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <svg
                            className="w-3.5 h-3.5 text-[#5548A0] shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                          </svg>
                          <span className="text-xs font-bold text-[#5548A0]">
                            Reflections
                          </span>
                          <span className="px-1.5 py-0.2 rounded-full bg-[#5548A0]/15 text-[#5548A0] text-[11px] font-bold">
                            {ayahNotes.length}
                          </span>
                          {isNotesCollapsed && (
                            <span className="text-xs text-[#4A605C] truncate max-w-[200px] sm:max-w-[320px]">
                              •{" "}
                              {ayahNotes[0].text
                                ? ayahNotes[0].text.trim()
                                : ayahNotes[0].voiceNote
                                ? `Voice note (${formatDurationMs(ayahNotes[0].voiceNote.durationMillis)})`
                                : "Reflection"}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openNewNoteModal(ayah);
                            }}
                            className="px-2 py-0.5 rounded-md bg-white border border-[#D8E4E0] text-xs font-semibold text-[#5548A0] hover:bg-[#5548A0]/10 transition-colors"
                          >
                            + Add
                          </button>
                          <svg
                            className={`w-3.5 h-3.5 text-[#7E9490] transition-transform duration-200 ${
                              isNotesCollapsed ? "" : "rotate-180"
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>

                      {/* Expanded Compact Notes List */}
                      {!isNotesCollapsed && (
                        <div className="p-2 pt-0 space-y-1.5">
                          {ayahNotes.map((n) => {
                            const isVoice = Boolean(n.voiceNote);
                            const isText = Boolean(n.text && n.text.trim());
                            const dateStr = new Date(n.updatedAt || n.createdAt).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                              }
                            );
                            const previewSnippet = isText
                              ? n.text.trim()
                              : isVoice
                              ? `Voice note (${formatDurationMs(n.voiceNote?.durationMillis || 0)})`
                              : "Reflection";

                            return (
                              <div
                                key={n.id}
                                onClick={() => openViewNoteModal(ayah, n)}
                                className="p-2.5 rounded-lg bg-white border border-[#EEF3F1] flex items-center justify-between gap-3 cursor-pointer hover:border-[#5548A0]/30 transition-all shadow-2xs"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="w-6 h-6 rounded-md bg-[#5548A0]/10 flex items-center justify-center shrink-0">
                                    {isVoice && !isText ? (
                                      <svg
                                        className="w-3.5 h-3.5 text-[#5548A0]"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                        <line x1="12" y1="19" x2="12" y2="23" />
                                        <line x1="8" y1="23" x2="16" y2="23" />
                                      </svg>
                                    ) : (
                                      <svg
                                        className="w-3.5 h-3.5 text-[#5548A0]"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line x1="16" y1="13" x2="8" y2="13" />
                                        <line x1="16" y1="17" x2="8" y2="17" />
                                      </svg>
                                    )}
                                  </div>
                                  <span className="text-xs text-[#122824] truncate font-sans">
                                    {previewSnippet}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0 text-[#7E9490]">
                                  <span className="text-[11px]">{dateStr}</span>
                                  <svg
                                    className="w-3.5 h-3.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <polyline points="9 18 15 12 9 6" />
                                  </svg>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Ayah Actions Toolbar (Mobile-first app navigation bar) */}
                  <div className="px-1.5 sm:px-3 py-1.5 sm:py-2 bg-[#F2F7F5]/50 border-t border-[#EEF3F1] grid grid-cols-5 sm:flex sm:items-center sm:justify-between text-xs font-medium gap-0.5 sm:gap-1">
                    {/* Play / Pause */}
                    <button
                      type="button"
                      onClick={() => handleTogglePlay(index)}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-3 rounded-xl transition-colors min-h-[44px] ${
                        isThisAyahPlaying
                          ? "bg-[#0E6B5C]/15 text-[#0E6B5C] font-semibold"
                          : "text-[#4A605C] hover:text-[#122824]"
                      }`}
                    >
                      {isThisAyahPlaying ? (
                        <>
                          <svg className="w-4 h-4 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                          </svg>
                          <span className="text-[10px] sm:text-xs">Pause</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          <span className="text-[10px] sm:text-xs">Play</span>
                        </>
                      )}
                    </button>

                    {/* Bookmark */}
                    <button
                      type="button"
                      onClick={() => handleBookmarkToggle(index)}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-3 rounded-xl transition-colors min-h-[44px] ${
                        isBookmarked
                          ? "text-[#C4455A] font-semibold"
                          : "text-[#4A605C] hover:text-[#122824]"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 sm:w-3.5 sm:h-3.5"
                        viewBox="0 0 24 24"
                        fill={isBookmarked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                      <span className="text-[10px] sm:text-xs">{isBookmarked ? "Saved" : "Bookmark"}</span>
                    </button>

                    {/* Highlight / Mark */}
                    <button
                      type="button"
                      onClick={() => handleHighlightToggle(index)}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-3 rounded-xl transition-colors min-h-[44px] ${
                        isHighlighted
                          ? "text-[#C46B1A] font-semibold"
                          : "text-[#4A605C] hover:text-[#122824]"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 sm:w-3.5 sm:h-3.5"
                        viewBox="0 0 24 24"
                        fill={isHighlighted ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="text-[10px] sm:text-xs">{isHighlighted ? "Marked" : "Mark"}</span>
                    </button>

                    {/* Note Button */}
                    <button
                      type="button"
                      onClick={() => openNewNoteModal(ayah)}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-3 rounded-xl transition-colors min-h-[44px] ${
                        ayahNotes.length > 0
                          ? "text-[#5548A0] font-semibold bg-[#5548A0]/10"
                          : "text-[#4A605C] hover:text-[#122824]"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 sm:w-3.5 sm:h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <span className="text-[10px] sm:text-xs">
                        {ayahNotes.length > 0 ? `Notes (${ayahNotes.length})` : "Note"}
                      </span>
                    </button>

                    {/* Share */}
                    <button
                      type="button"
                      onClick={() => handleShare(ayah)}
                      className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-2 rounded-xl text-[#7E9490] hover:text-[#122824] transition-colors min-h-[44px] relative"
                      title="Copy verse"
                    >
                      {copiedAyah === ayah.numberInSurah ? (
                        <span className="text-[10px] font-bold text-[#0E6B5C]">Copied!</span>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4 sm:w-3.5 sm:h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                          </svg>
                          <span className="text-[10px] sm:text-xs">Share</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Invitation Footer Card */}
          <div className="bg-[#F2F7F5]/80 p-6 border-t border-[#D8E4E0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-[#122824]">
                Want all 114 Surahs, background audio, and offline reflections?
              </h4>
              <p className="text-xs text-[#4A605C] mt-0.5">
                Install the complete Qurus sanctuary on your Android phone in 30 seconds.
              </p>
            </div>

            <a
              href="#download"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E6B5C] hover:bg-[#0A5347] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors shrink-0"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Get Qurus for Android</span>
            </a>
          </div>
        </div>
      </div>

      {/* REPLICATED QURUS APP MODALS */}

      {/* 1. Note Editor Modal (Replicating NoteEditorModal.tsx + VoiceNoteComposer.tsx) */}
      {editorModalOpen && selectedAyahForNote && (
        <NoteEditorModal
          surahName="Surah Al-Faatiha"
          surahNumber={1}
          ayahNumber={selectedAyahForNote.numberInSurah}
          arabicText={selectedAyahForNote.arabicText}
          urduText={selectedAyahForNote.urduText}
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

      {/* 2. Note Viewer Modal (Replicating NoteViewerModal.tsx) */}
      {viewerModalOpen && selectedNoteForView && selectedAyahForNote && (
        <NoteViewerModal
          surahName="Surah Al-Faatiha"
          surahNumber={1}
          ayahNumber={selectedAyahForNote.numberInSurah}
          arabicText={selectedAyahForNote.arabicText}
          urduText={selectedAyahForNote.urduText}
          note={selectedNoteForView}
          onClose={() => setViewerModalOpen(false)}
          onEdit={() => openEditNoteModal(selectedAyahForNote, selectedNoteForView)}
          onDelete={() =>
            handleDeleteNote(selectedAyahForNote.numberInSurah, selectedNoteForView.id)
          }
        />
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: NoteEditorModal (Replicating NoteEditorModal.tsx from App)
// ---------------------------------------------------------------------------
interface NoteEditorModalProps {
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
  arabicText?: string;
  urduText?: string;
  initialNote?: string;
  initialVoiceNote?: VoiceNoteData | null;
  noteId?: string;
  onSave: (text: string, voiceNote: VoiceNoteData | null) => void;
  onDelete?: () => void;
  onClose: () => void;
}

function NoteEditorModal({
  surahName,
  surahNumber,
  ayahNumber,
  arabicText,
  urduText,
  initialNote = "",
  initialVoiceNote = null,
  noteId,
  onSave,
  onDelete,
  onClose,
}: NoteEditorModalProps) {
  const [noteText, setNoteText] = useState(initialNote);
  const [voiceNote, setVoiceNote] = useState<VoiceNoteData | null>(initialVoiceNote);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  const canSave = Boolean(noteText.trim() || voiceNote);
  const isEditing = Boolean(noteId || initialNote.trim() || initialVoiceNote);

  const handleSave = () => {
    if (!canSave || isRecordingVoice) return;
    onSave(noteText, voiceNote);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[28px] sm:rounded-3xl border-t sm:border border-[#D8E4E0] shadow-2xl max-w-lg w-full max-h-[88vh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 duration-200">
        {/* Mobile drag handle indicator */}
        <div className="w-10 h-1 rounded-full bg-[#D8E4E0] mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />
        {/* Header matching NoteEditorModal.tsx */}
        <div className="px-5 py-3.5 border-b border-[#D8E4E0] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-[#4A605C] hover:text-[#122824] text-sm font-medium py-1 px-2 -ml-2 rounded-lg"
          >
            Cancel
          </button>

          <div className="text-center">
            <h3 className="text-base font-bold text-[#122824]">
              {noteId ? "Edit Reflection" : "New Reflection"}
            </h3>
            <div className="text-xs font-semibold text-[#0E6B5C]">
              {surahName} {surahNumber}:{ayahNumber}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={isRecordingVoice || (!canSave && !isEditing)}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              !isRecordingVoice && (canSave || isEditing)
                ? "bg-[#0E6B5C] text-white hover:bg-[#0A5347] shadow-xs cursor-pointer"
                : "bg-[#0E6B5C]/40 text-white/70 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Verse Snippet Preview */}
          <div className="p-3.5 rounded-2xl bg-[#F2F7F5] border border-[#D8E4E0] space-y-2">
            {arabicText && (
              <p className="font-arabic text-lg sm:text-xl text-right text-[#0C1C1A] leading-relaxed">
                {arabicText}
              </p>
            )}
            {urduText && (
              <p className="font-urdu text-xs sm:text-sm text-right text-[#2A3E3A] leading-relaxed">
                {urduText}
              </p>
            )}
          </div>

          {/* Written Reflection Section */}
          <div>
            <label className="block text-xs font-semibold text-[#4A605C] mb-2">
              Written reflection
            </label>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="What thoughts, questions, or insights did this verse spark? Write here, or record a voice note below."
              rows={4}
              className="w-full text-sm text-[#122824] bg-white border border-[#D8E4E0] rounded-2xl p-4 focus:outline-hidden focus:border-[#0E6B5C] transition-colors leading-relaxed placeholder:text-[#7E9490] resize-y"
            />
          </div>

          {/* VoiceNoteComposer Section (Replicating VoiceNoteComposer.tsx) */}
          <VoiceNoteComposer
            value={voiceNote}
            onChange={setVoiceNote}
            onRecordingChange={setIsRecordingVoice}
          />

          {/* Delete Button if editing */}
          {isEditing && onDelete && (
            <div className="pt-2 border-t border-[#EEF3F1]">
              <button
                type="button"
                onClick={onDelete}
                className="w-full py-3 rounded-xl border border-[#C45C56]/30 text-[#C45C56] hover:bg-[#C45C56]/5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                <span>Delete this note</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: VoiceNoteComposer (Replicating VoiceNoteComposer.tsx from App)
// ---------------------------------------------------------------------------
interface VoiceNoteComposerProps {
  value: VoiceNoteData | null;
  onChange: (voiceNote: VoiceNoteData | null) => void;
  onRecordingChange?: (isRecording: boolean) => void;
}

function VoiceNoteComposer({
  value,
  onChange,
  onRecordingChange,
}: VoiceNoteComposerProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const elapsedRef = useRef<number>(0);

  // Notify parent of recording state
  useEffect(() => {
    onRecordingChange?.(isRecording);
  }, [isRecording, onRecordingChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    setErrorMessage(null);
    setIsStarting(true);

    if (
      typeof window === "undefined" ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setErrorMessage(
        "Microphone access is not supported in this browser environment. You can still save written reflections!"
      );
      setIsStarting(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")
        ? "audio/ogg;codecs=opus"
        : "";

      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      elapsedRef.current = 0;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const durationSec = Math.max(1, elapsedRef.current);
        const durationMillis = durationSec * 1000;
        const blob = new Blob(chunksRef.current, {
          type: mimeType || "audio/webm",
        });

        // Instant local object URL
        const objectUrl = URL.createObjectURL(blob);

        // Also convert to data URI so it persists across reloads in localStorage
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Uri = reader.result as string;
          onChange({
            uri: base64Uri,
            durationMillis,
          });
        };
        reader.readAsDataURL(blob);

        // Set immediate local state
        onChange({
          uri: objectUrl,
          durationMillis,
        });

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      recorder.start(200);
      setIsRecording(true);
      setIsStarting(false);
      setRecordingSeconds(0);

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          const next = prev + 1;
          elapsedRef.current = next;
          if (next >= 180) {
            // Maximum 3 minutes (like Qurus app)
            stopRecording();
          }
          return next;
        });
      }, 1000);
    } catch (err) {
      console.warn("Could not start recording:", err);
      setErrorMessage(
        "Microphone access needed: Please allow microphone access in your browser to attach a voice note to this verse."
      );
      setIsStarting(false);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  if (value && !isRecording) {
    return (
      <div className="space-y-2.5">
        <label className="block text-xs font-semibold text-[#4A605C]">Voice note</label>
        <VoiceNotePlayer voiceNote={value} onRemove={() => onChange(null)} />

        <button
          type="button"
          onClick={startRecording}
          disabled={isStarting}
          className="w-full py-2.5 rounded-xl border border-[#D8E4E0] text-xs font-medium text-[#4A605C] hover:text-[#122824] hover:bg-[#F2F7F5] flex items-center justify-center gap-2 transition-colors"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
          <span>Replace recording</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <label className="block text-xs font-semibold text-[#4A605C]">Voice note</label>
      <p className="text-xs text-[#7E9490] leading-relaxed">
        Speak a reflection and attach it to this verse. You can still write a note too.
      </p>

      {isRecording ? (
        <div className="p-4 rounded-2xl bg-[#EEEAF8] border-2 border-[#5548A0]/40 space-y-3">
          {/* Live indicator & timer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C45C56] animate-pulse" />
              <span className="text-sm font-bold text-[#5548A0]">Recording</span>
            </div>
            <span className="text-base font-semibold font-mono text-[#122824]">
              {formatDurationMs(recordingSeconds * 1000)}
            </span>
          </div>

          {/* STOP BUTTON (Large, Unmissable Red Button replicating App) */}
          <button
            type="button"
            onClick={stopRecording}
            className="w-full py-3 px-4 rounded-xl bg-[#C45C56] hover:bg-[#B34D47] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
            <span>Stop Recording</span>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={startRecording}
          disabled={isStarting}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#5548A0] hover:bg-[#473B88] text-white text-sm font-semibold flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
          <span>{isStarting ? "Starting microphone..." : "Record voice note"}</span>
        </button>
      )}

      {errorMessage && (
        <p className="text-xs text-[#C45C56] mt-2 leading-relaxed bg-[#C45C56]/10 p-2.5 rounded-xl border border-[#C45C56]/20">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: VoiceNotePlayer (Replicating VoiceNotePlayer.tsx from App)
// ---------------------------------------------------------------------------
interface VoiceNotePlayerProps {
  voiceNote: VoiceNoteData;
  compact?: boolean;
  onRemove?: () => void;
}

function VoiceNotePlayer({ voiceNote, compact = false, onRemove }: VoiceNotePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const totalMs = voiceNote.durationMillis || 1000;
  const progress = Math.min(1, currentTimeMs / totalMs);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(voiceNote.uri);
    }
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (audio.src !== voiceNote.uri) {
        audio.src = voiceNote.uri;
        audio.load();
      }
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.warn);

      audio.ontimeupdate = () => {
        setCurrentTimeMs(audio.currentTime * 1000);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentTimeMs(0);
      };
    }
  };

  return (
    <div
      className={`rounded-2xl border border-[#EEF3F1] bg-[#EEEAF8] flex items-center gap-3 transition-all ${
        compact ? "p-2 min-h-11" : "p-3 sm:p-3.5 min-h-14"
      }`}
    >
      {/* Play / Pause Circular Button */}
      <button
        type="button"
        onClick={togglePlayback}
        className="w-9 h-9 rounded-full bg-[#5548A0] text-white flex items-center justify-center shadow-2xs hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
        title={isPlaying ? "Pause voice note" : "Play voice note"}
      >
        {isPlaying ? (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </button>

      {/* Track & Time */}
      <div className="flex-1 min-w-0 space-y-1">
        {!compact && (
          <div className="text-[11px] font-bold text-[#5548A0]">Voice note</div>
        )}
        <div className="h-1.5 rounded-full bg-[#D8E4E0] overflow-hidden">
          <div
            className="h-full bg-[#5548A0] transition-all duration-100"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <div className="text-[11px] text-[#4A605C] font-mono">
          {isPlaying || currentTimeMs > 400
            ? `${formatDurationMs(currentTimeMs)} / ${formatDurationMs(totalMs)}`
            : formatDurationMs(totalMs)}
        </div>
      </div>

      {/* Remove Button */}
      {onRemove && (
        <button
          type="button"
          onClick={() => {
            if (audioRef.current) audioRef.current.pause();
            onRemove();
          }}
          className="p-1.5 rounded-full text-[#7E9490] hover:text-[#C45C56] transition-colors"
          title="Remove voice note"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: NoteViewerModal (Replicating NoteViewerModal.tsx from App)
// ---------------------------------------------------------------------------
interface NoteViewerModalProps {
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
  arabicText?: string;
  urduText?: string;
  note: StudyNoteData;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function NoteViewerModal({
  surahName,
  surahNumber,
  ayahNumber,
  arabicText,
  urduText,
  note,
  onClose,
  onEdit,
  onDelete,
}: NoteViewerModalProps) {
  const isVoice = Boolean(note.voiceNote);
  const isText = Boolean(note.text && note.text.trim());

  const dateStr = new Date(note.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[28px] sm:rounded-3xl border-t sm:border border-[#D8E4E0] shadow-2xl max-w-lg w-full max-h-[88vh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 duration-200">
        {/* Mobile drag handle indicator */}
        <div className="w-10 h-1 rounded-full bg-[#D8E4E0] mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#D8E4E0] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-[#4A605C] hover:text-[#122824] text-sm font-medium py-1 px-2 -ml-2 rounded-lg"
          >
            Done
          </button>

          <div className="text-center">
            <h3 className="text-base font-bold text-[#122824]">Reflection</h3>
            <div className="text-xs font-semibold text-[#0E6B5C]">
              {surahName} {surahNumber}:{ayahNumber}
            </div>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="text-[#0E6B5C] hover:text-[#0A5347] p-1.5 rounded-lg"
            title="Edit reflection"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Verse Context Box */}
          <div className="p-3.5 rounded-2xl bg-[#F2F7F5] border border-[#D8E4E0] space-y-2">
            {arabicText && (
              <p className="font-arabic text-lg sm:text-xl text-right text-[#0C1C1A] leading-relaxed">
                {arabicText}
              </p>
            )}
            {urduText && (
              <p className="font-urdu text-xs sm:text-sm text-right text-[#2A3E3A] leading-relaxed">
                {urduText}
              </p>
            )}
          </div>

          {/* Written reflection */}
          {isText && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#4A605C]">Written reflection</span>
              <p className="text-sm text-[#122824] whitespace-pre-wrap leading-relaxed bg-[#F2F7F5]/50 p-4 rounded-2xl border border-[#EEF3F1]">
                {note.text}
              </p>
            </div>
          )}

          {/* Voice reflection */}
          {isVoice && note.voiceNote && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#4A605C]">Voice reflection</span>
              <VoiceNotePlayer voiceNote={note.voiceNote} />
            </div>
          )}

          {/* Footer Metadata & Actions */}
          <div className="pt-4 border-t border-[#EEF3F1] flex items-center justify-between text-xs text-[#7E9490]">
            <span>{dateStr} • 100% On-Device</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onEdit}
                className="px-3 py-1.5 rounded-xl border border-[#D8E4E0] text-[#122824] hover:bg-[#F2F7F5] font-medium transition-colors"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="px-3 py-1.5 rounded-xl text-[#C45C56] hover:bg-[#C45C56]/10 font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
