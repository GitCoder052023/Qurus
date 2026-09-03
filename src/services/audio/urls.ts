import { AUDIO_CDN_BASE } from '../../config/audio';

export function getAudioUrl(reciterSubfolder: string, surahNumber: number, ayahNumber: number): string {
  const surahPadded = String(surahNumber).padStart(3, '0');
  const ayahPadded = String(ayahNumber).padStart(3, '0');
  return `${AUDIO_CDN_BASE}/${reciterSubfolder}/${surahPadded}${ayahPadded}.mp3`;
}

export function getUrduAudioUrl(surahNumber: number, ayahNumber: number): string {
  const surahPadded = String(surahNumber).padStart(3, '0');
  const ayahPadded = String(ayahNumber).padStart(3, '0');
  return `${AUDIO_CDN_BASE}/translations/urdu_shamshad_ali_khan_46kbps/${surahPadded}${ayahPadded}.mp3`;
}
