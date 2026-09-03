export function buildAyahShareMessage(
  arabicText: string,
  urduText: string,
  surahName: string,
  surahNumber: number,
  ayahNumber: number
): string {
  return `${arabicText}\n\n${urduText}\n\n— [Surah ${surahName} ${surahNumber}:${ayahNumber}] (Urdu: Fateh Muhammad Jalandhari)`;
}
