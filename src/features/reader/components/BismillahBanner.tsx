import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { AT_TAWBAH_SURAH_NUMBER } from '../../../config/quran';
import { styles } from '../styles';

interface BismillahBannerProps {
  surahNumber: number;
}

export function BismillahBanner({ surahNumber }: BismillahBannerProps) {
  const { theme } = useTheme();

  if (surahNumber === AT_TAWBAH_SURAH_NUMBER) {
    return null;
  }

  return (
    <View
      style={[styles.bismillahCard, { backgroundColor: theme.surface, borderColor: theme.borderSubtle }]}
    >
      <Text style={[styles.bismillahArabic, { color: theme.arabicText }]}>
        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </Text>
      <Text style={[styles.bismillahUrdu, { color: theme.urduText }]}>
        شروع الله کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے
      </Text>
    </View>
  );
}
