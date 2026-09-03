export interface ContemplativeVerse {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  arabicText: string;
  urduText: string;
  themeNote: string;
}

export const CONTEMPLATIVE_VERSES: ContemplativeVerse[] = [
  {
    surahNumber: 13,
    ayahNumber: 28,
    surahName: "Ar-Ra'd",
    arabicText: 'أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ',
    urduText: 'سنو کہ خدا کے ذکر سے ہی دلوں کو تسلی اور سکون حاصل ہوتا ہے',
    themeNote: 'Peace of Heart & Tranquility',
  },
  {
    surahNumber: 94,
    ayahNumber: 5,
    surahName: 'Ash-Sharh',
    arabicText: 'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',
    urduText: 'سو بے شک مشکل کے ساتھ آسانی ہے',
    themeNote: 'Hope & Relief in Trial',
  },
  {
    surahNumber: 2,
    ayahNumber: 152,
    surahName: 'Al-Baqarah',
    arabicText: 'فَٱذْكُرُونِىٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ',
    urduText: 'سو مجھے یاد کرو، میں تمہیں یاد رکھوں گا، اور میرا شکر ادا کرو اور ناشکری نہ کرو',
    themeNote: 'Gratitude & Divine Presence',
  },
  {
    surahNumber: 93,
    ayahNumber: 7,
    surahName: 'Ad-Duhaa',
    arabicText: 'وَوَجَدَكَ ضَآلًّا فَهَدَىٰ',
    urduText: 'اور اس نے آپ کو راستہ تلاش کرتے پایا تو راہ دکھا دی',
    themeNote: 'Guidance & Divine Grace',
  },
  {
    surahNumber: 39,
    ayahNumber: 53,
    surahName: 'Az-Zumar',
    arabicText: 'لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا',
    urduText: 'خدا کی رحمت سے ناامید نہ ہو، خدا تو سب گناہوں کو بخش دیتا ہے',
    themeNote: 'Boundless Mercy & Forgiveness',
  },
];
