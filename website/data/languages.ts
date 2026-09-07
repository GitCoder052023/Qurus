import { LanguageKey, LanguageMeta } from "../types/player";

export const LANGUAGES: Record<LanguageKey, LanguageMeta> = {
  urdu: {
    id: "urdu",
    name: "Urdu",
    nativeName: "اردو",
    flag: "🇵🇰",
    author: "Fateh Muhammad Jalandhari",
    reciter: "Shamshad Ali Khan",
    isRTL: true,
  },
  english: {
    id: "english",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    author: "Sahih International",
    reciter: "Ibrahim Walk",
    isRTL: false,
  },
  bengali: {
    id: "bengali",
    name: "Bengali",
    nativeName: "বাংলা",
    flag: "🇧🇩",
    author: "Muhiuddin Khan",
    reciter: "Bangla Quran Voice",
    isRTL: false,
  },
  turkish: {
    id: "turkish",
    name: "Turkish",
    nativeName: "Türkçe",
    flag: "🇹🇷",
    author: "Diyanet İşleri",
    reciter: "Diyanet Vakfı",
    isRTL: false,
  },
  french: {
    id: "french",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    author: "Muhammad Hamidullah",
    reciter: "Youssouf Leclerc",
    isRTL: false,
  },
};
