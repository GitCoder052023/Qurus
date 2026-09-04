import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { SURAHS } from '../../data/surahs';
import { StudyNote } from '../../types';

export const NotesSection = React.memo(function NotesSection() {
  const { theme } = useTheme();
  const { notes } = useStudyState();
  const router = useRouter();

  const noteList = useMemo(() => {
    return Object.values(notes)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 5);
  }, [notes]);

  const totalNotes = Object.keys(notes).length;

  const formatDate = (timestamp: number) => {
    const diffHours = (Date.now() - timestamp) / (1000 * 60 * 60);
    if (diffHours < 24) {
      if (diffHours < 1) return 'Just now';
      return `${Math.floor(diffHours)}h ago`;
    }
    const d = new Date(timestamp);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const handleOpenNote = (note: StudyNote) => {
    router.push({
      pathname: '/reader/[surah]',
      params: { surah: String(note.surahNumber), ayah: String(note.ayahNumber) },
    });
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <View style={[styles.iconPill, { backgroundColor: '#D9770618' }]}>
            <Ionicons name="journal" size={14} color={theme.accentGold} />
          </View>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Your Reflections</Text>
          {totalNotes > 0 && (
            <View style={[styles.countBadge, { backgroundColor: theme.chipBg }]}>
              <Text style={[styles.countBadgeText, { color: theme.textSecondary }]}>
                {totalNotes}
              </Text>
            </View>
          )}
        </View>

        {totalNotes > 0 && (
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/notes')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.viewAllBtn}
          >
            <Text style={[styles.viewAllText, { color: theme.primary }]}>View all</Text>
            <Ionicons name="chevron-forward" size={13} color={theme.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Content: Horizontal Carousel */}
      {noteList.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {noteList.map((item) => {
            const surah = SURAHS.find((s) => s.number === item.surahNumber);
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.88}
                onPress={() => handleOpenNote(item)}
                style={[
                  styles.noteCard,
                  {
                    backgroundColor: theme.cardElevated,
                    borderColor: theme.borderSubtle,
                  },
                ]}
              >
                {/* Note Card Header */}
                <View style={styles.cardTopRow}>
                  <View style={styles.surahInfo}>
                    <Text style={[styles.surahName, { color: theme.textPrimary }]} numberOfLines={1}>
                      {surah ? surah.englishName : `Surah ${item.surahNumber}`}
                    </Text>
                    <View style={[styles.ayahBadge, { backgroundColor: theme.primaryMuted }]}>
                      <Text style={[styles.ayahBadgeText, { color: theme.primary }]}>
                        {item.surahNumber}:{item.ayahNumber}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.dateText, { color: theme.textTertiary }]}>
                    {formatDate(item.updatedAt)}
                  </Text>
                </View>

                {/* Note Content */}
                <Text
                  style={[styles.noteContentText, { color: theme.textPrimary }]}
                  numberOfLines={2}
                >
                  {item.text}
                </Text>

                {/* Ayah Snippet preview (subtle) */}
                {item.urduSnippet ? (
                  <Text
                    style={[styles.urduSnippetText, { color: theme.textTertiary }]}
                    numberOfLines={1}
                  >
                    "{item.urduSnippet}"
                  </Text>
                ) : null}

                {/* Card Footer */}
                <View style={[styles.cardFooter, { borderTopColor: theme.borderSubtle }]}>
                  <View style={styles.openLink}>
                    <Text style={[styles.openLinkText, { color: theme.primary }]}>Open in Reader</Text>
                    <Ionicons name="arrow-forward" size={11} color={theme.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/(tabs)/quran')}
          style={[
            styles.emptyCompactCard,
            {
              backgroundColor: theme.cardElevated,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <View style={[styles.emptyIconWrap, { backgroundColor: '#D9770615' }]}>
            <Ionicons name="create-outline" size={18} color={theme.accentGold} />
          </View>
          <View style={styles.emptyTextCol}>
            <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
              No reflections written yet
            </Text>
            <Text style={[styles.emptyDesc, { color: theme.textTertiary }]}>
              Tap "Note" on any Ayah to record insights
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconPill: {
    width: 26,
    height: 26,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  countBadge: {
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: 10,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '600',
  },
  horizontalScrollContent: {
    gap: 12,
    paddingRight: 6,
  },
  noteCard: {
    width: 250,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  surahInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    marginRight: 6,
  },
  surahName: {
    fontSize: 13,
    fontWeight: '700',
  },
  ayahBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 5,
  },
  ayahBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 10,
  },
  noteContentText: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 6,
  },
  urduSnippetText: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  cardFooter: {
    borderTopWidth: 1,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  openLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  openLinkText: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyCompactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    gap: 10,
  },
  emptyIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTextCol: {
    flex: 1,
  },
  emptyTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyDesc: {
    fontSize: 11,
    marginTop: 1,
  },
});
