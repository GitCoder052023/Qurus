import React from 'react';
import { View, Text } from 'react-native';
import { ThemeColors } from '../../../context/ThemeContext';
import { TRANSLATION_LANGUAGES } from '../../../data/surahs';
import { TranslationLanguage } from '../../../types';
import { styles } from '../styles/reader.styles';

interface BismillahCardProps {
  surahNumber: number;
  translationLanguage?: string;
  theme: ThemeColors;
}

export const BismillahCard: React.FC<BismillahCardProps> = React.memo(
  function BismillahCard({ surahNumber, translationLanguage, theme }) {
    if (surahNumber === 9) return null;

    const langKey = (translationLanguage || 'urdu') as TranslationLanguage;
    const activeLangConfig =
      TRANSLATION_LANGUAGES[langKey] ||
      TRANSLATION_LANGUAGES.urdu;

    return (
      <View style={[styles.bismillahCard, { backgroundColor: theme.surface, borderColor: theme.borderSubtle }]}>
        <Text style={[styles.bismillahArabic, { color: theme.arabicText }]}>
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </Text>
        <Text
          style={[
            styles.bismillahUrdu,
            {
              color: theme.urduText,
              textAlign: activeLangConfig.isRTL ? 'right' : 'center',
              writingDirection: activeLangConfig.isRTL ? 'rtl' : 'ltr',
            },
          ]}
        >
          {activeLangConfig.bismillah}
        </Text>
      </View>
    );
  }
);
