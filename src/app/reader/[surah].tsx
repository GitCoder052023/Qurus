import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { useAudio } from '../../context/AudioContext';
import { getSurah } from '../../data/surahLoader';
import { SURAHS } from '../../data/surahs';
import { AyahItem } from '../../components/AyahItem';
import { NoteEditorModal } from '../../components/NoteEditorModal';
import { Ayah } from '../../types';

export default function ReaderScreen() {
  const { surah: surahParam, ayah: ayahParam } = useLocalSearchParams<{
    surah: string;
    ayah?: string;
  }>();
  const surahNumber = parseInt(surahParam || '1', 10);
  const initialAyah = ayahParam ? parseInt(ayahParam, 10) : 1;

  const { theme, isDark } = useTheme();
  const { preferences, saveNote, deleteNote, getNote } = useStudyState();
  const {
    currentSurahNumber,
    currentAyahNumber,
    isPlaying,
    playAyah,
    pause,
    resume,
  } = useAudio();
  const router = useRouter();

  const surahData = useMemo(() => getSurah(surahNumber), [surahNumber]);
  const surahMeta = useMemo(() => SURAHS.find((s) => s.number === surahNumber), [surahNumber]);

  const flatListRef = useRef<FlatList>(null);
  const [selectedAyahForNote, setSelectedAyahForNote] = useState<Ayah | null>(null);

  // Auto-scroll when currently reciting ayah changes
  useEffect(() => {
    if (
      preferences.autoScroll &&
      isPlaying &&
      currentSurahNumber === surahNumber &&
      currentAyahNumber !== null &&
      surahData &&
      currentAyahNumber <= surahData.ayahs.length
    ) {
      const index = currentAyahNumber - 1;
      try {
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.25,
        });
      } catch (e) {
        // Fallback if index not measured yet
        flatListRef.current?.scrollToOffset({
          offset: index * 200,
          animated: true,
        });
      }
    }
  }, [currentSurahNumber, currentAyahNumber, isPlaying, surahNumber, preferences.autoScroll, surahData]);

  // Scroll to initialAyah on mount if specified
  useEffect(() => {
    if (initialAyah > 1 && surahData) {
      const timer = setTimeout(() => {
        try {
          flatListRef.current?.scrollToIndex({
            index: initialAyah - 1,
            animated: true,
            viewPosition: 0.2,
          });
        } catch (e) {
          flatListRef.current?.scrollToOffset({
            offset: (initialAyah - 1) * 200,
            animated: true,
          });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [initialAyah, surahData]);

  if (!surahData || !surahMeta) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.textPrimary }]}>Surah not found</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={{ color: theme.primary }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isCurrentSurahActive = currentSurahNumber === surahNumber;
  const isSurahPlaying = isCurrentSurahActive && isPlaying;

  const handleSurahPlayToggle = () => {
    if (isSurahPlaying) {
      pause();
    } else if (isCurrentSurahActive && !isPlaying && currentAyahNumber) {
      resume();
    } else {
      playAyah(surahNumber, initialAyah || 1);
    }
  };

  const handlePrevSurah = () => {
    if (surahNumber > 1) {
      router.replace(`/reader/${surahNumber - 1}`);
    }
  };

  const handleNextSurah = () => {
    if (surahNumber < 114) {
      router.replace(`/reader/${surahNumber + 1}`);
    }
  };

  const renderHeader = () => (
    <View style={styles.surahHeader}>
      {/* Surah Title Banner */}
      <View style={[styles.bannerCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.bannerTopRow}>
          <View style={[styles.surahPill, { backgroundColor: theme.surfaceHighlight }]}>
            <Text style={[styles.surahPillText, { color: theme.primary }]}>
              Surah {surahData.number}
            </Text>
          </View>
          <View style={[styles.surahPill, { backgroundColor: theme.surface }]}>
            <Text style={[styles.surahPillText, { color: theme.textSecondary }]}>
              {surahData.revelationType} • {surahData.numberOfAyahs} Ayahs
            </Text>
          </View>
        </View>

        <Text style={[styles.arabicSurahTitle, { color: theme.arabicText }]}>{surahData.name}</Text>
        <Text style={[styles.englishSurahTitle, { color: theme.textPrimary }]}>
          {surahData.englishName}
        </Text>
        <Text style={[styles.urduSurahTitle, { color: theme.textSecondary }]}>
          {surahData.urduName}
        </Text>

        {/* Play entire Surah button */}
        <TouchableOpacity
          onPress={handleSurahPlayToggle}
          style={[styles.playSurahBtn, { backgroundColor: theme.primary }]}
          activeOpacity={0.85}
        >
          <Ionicons
            name={isSurahPlaying ? 'pause-circle' : 'play-circle'}
            size={22}
            color={theme.onPrimary}
          />
          <Text style={[styles.playSurahBtnText, { color: theme.onPrimary }]}>
            {isSurahPlaying ? 'Pause Recitation' : 'Play Full Surah Recitation'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bismillah Banner (Omitted for Surah 9 At-Tawbah) */}
      {surahNumber !== 9 && (
        <View style={[styles.bismillahCard, { backgroundColor: theme.surface, borderColor: theme.borderSubtle }]}>
          <Text style={[styles.bismillahArabic, { color: theme.arabicText }]}>
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </Text>
          <Text style={[styles.bismillahUrdu, { color: theme.urduText }]}>
            شروع الله کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے
          </Text>
        </View>
      )}
    </View>
  );

  const renderFooter = () => (
    <View style={styles.surahFooter}>
      <View style={styles.surahNavRow}>
        <TouchableOpacity
          onPress={handlePrevSurah}
          disabled={surahNumber <= 1}
          style={[
            styles.navSurahBtn,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              opacity: surahNumber <= 1 ? 0.4 : 1,
            },
          ]}
        >
          <Ionicons name="arrow-back" size={16} color={theme.textPrimary} />
          <Text style={[styles.navSurahText, { color: theme.textPrimary }]}>Previous Surah</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNextSurah}
          disabled={surahNumber >= 114}
          style={[
            styles.navSurahBtn,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              opacity: surahNumber >= 114 ? 0.4 : 1,
            },
          ]}
        >
          <Text style={[styles.navSurahText, { color: theme.textPrimary }]}>Next Surah</Text>
          <Ionicons name="arrow-forward" size={16} color={theme.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Top Navigation Bar */}
      <View style={[styles.navBar, { borderBottomColor: theme.borderSubtle }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.navBarIconBtn}>
          <Ionicons name="chevron-back" size={24} color={theme.textPrimary} />
        </TouchableOpacity>

        <View style={styles.navBarCenter}>
          <Text style={[styles.navBarTitle, { color: theme.textPrimary }]}>
            {surahData.englishName}
          </Text>
          <Text style={[styles.navBarSubtitle, { color: theme.textSecondary }]}>
            {surahData.name} • Surah {surahData.number}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSurahPlayToggle}
          style={[styles.navBarPlayBtn, { backgroundColor: theme.primaryMuted }]}
        >
          <Ionicons
            name={isSurahPlaying ? 'pause' : 'play'}
            size={18}
            color={theme.primary}
            style={!isSurahPlaying ? { marginLeft: 2 } : undefined}
          />
        </TouchableOpacity>
      </View>

      {/* Virtualized Ayah List */}
      <FlatList
        ref={flatListRef}
        data={surahData.ayahs}
        keyExtractor={(item) => String(item.numberInSurah)}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        renderItem={({ item }) => (
          <AyahItem
            ayah={item}
            surahNumber={surahNumber}
            surahName={surahData.englishName}
            isCurrentAyah={isCurrentSurahActive && currentAyahNumber === item.numberInSurah}
            arabicFontSize={preferences.arabicFontSize}
            urduFontSize={preferences.urduFontSize}
            showTranslation={preferences.showTranslation}
            onOpenNote={(ayah) => setSelectedAyahForNote(ayah)}
          />
        )}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.index * 200,
            animated: true,
          });
        }}
      />

      {/* In-place Note Editor Modal */}
      {selectedAyahForNote && (
        <NoteEditorModal
          visible={Boolean(selectedAyahForNote)}
          surahNumber={surahNumber}
          ayahNumber={selectedAyahForNote.numberInSurah}
          surahName={surahData.englishName}
          arabicText={selectedAyahForNote.arabicText}
          urduText={selectedAyahForNote.urduText}
          initialNote={getNote(surahNumber, selectedAyahForNote.numberInSurah)?.text || ''}
          initialVoiceNote={getNote(surahNumber, selectedAyahForNote.numberInSurah)?.voiceNote}
          onSave={(text, voiceNote) => {
            saveNote(
              surahNumber,
              selectedAyahForNote.numberInSurah,
              text,
              selectedAyahForNote.arabicText,
              selectedAyahForNote.urduText,
              voiceNote
            );
            setSelectedAyahForNote(null);
          }}
          onDelete={() => {
            deleteNote(surahNumber, selectedAyahForNote.numberInSurah);
            setSelectedAyahForNote(null);
          }}
          onClose={() => setSelectedAyahForNote(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  navBarIconBtn: {
    padding: 6,
  },
  navBarCenter: {
    alignItems: 'center',
  },
  navBarTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  navBarSubtitle: {
    fontSize: 12,
    marginTop: 1,
  },
  navBarPlayBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 110,
  },
  surahHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  bannerCard: {
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  bannerTopRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  surahPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  surahPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  arabicSurahTitle: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 4,
  },
  englishSurahTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  urduSurahTitle: {
    fontSize: 13,
    marginBottom: 16,
  },
  playSurahBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  playSurahBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  bismillahCard: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  bismillahArabic: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
    fontFamily: 'serif',
  },
  bismillahUrdu: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  surahFooter: {
    padding: 20,
    marginTop: 16,
  },
  surahNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navSurahBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  navSurahText: {
    fontSize: 13,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    padding: 10,
  },
});
