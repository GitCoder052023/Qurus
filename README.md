# Qurus

A calm, study-first Quran app for reading Arabic with Urdu translation, listening ayah by ayah, and keeping personal notes and bookmarks on your device.

Qurus is built with [Expo](https://expo.dev/) (SDK 57), React Native, and [Expo Router](https://docs.expo.dev/router/introduction/).

## Features

- **Full Quran** — All 114 surahs, with Arabic text and Fateh Muhammad Jalandhari’s Urdu translation
- **Reader** — Search by name, number, or `surah:ayah` (for example `2:255`); filter Meccan / Medinan
- **Audio** — Ayah-by-ayah recitation with optional spoken Urdu after each ayah
- **Reciters** — Mishary Rashid Alafasy, Abdul Basit (Murattal), Mahmoud Khalil Al-Husary, Abu Bakr Al-Shatri, Saad Al-Ghamdi
- **Study tools** — Bookmarks, highlights, per-ayah notes, resume last position, recent passages
- **Share** — Share an ayah with Arabic and Urdu together
- **Appearance** — Ivory, dark, sepia, or follow the system; adjustable Arabic and Urdu font sizes
- **Playback** — Arabic only, translation only, or both; speed from 0.75× to 1.5×; mini player and full player; background playback on supported devices
- **Local data** — Study history, notes, and preferences stay on the device; optional JSON backup via the system share sheet

## Requirements

- Node.js 20 or later
- [Expo Go](https://expo.dev/go) on a phone, or Xcode / Android Studio for simulators
- Network access for recitation audio (streamed from EveryAyah)

## Getting started

```bash
git clone https://github.com/GitCoder052023/Qurus.git
cd Qurus
npm install
npm start
```

Then press `i` for iOS, `a` for Android, or `w` for web. You can also scan the QR code with Expo Go.

| Script | Description |
| --- | --- |
| `npm start` | Start the Expo dev server |
| `npm run ios` | Open in the iOS simulator |
| `npm run android` | Open on Android |
| `npm run web` | Open in a browser |

## Project layout

```
src/
  app/           Screens and routes (Expo Router)
  components/    Reader, player, and note UI
  context/       Theme, study data, and audio
  data/          Surah metadata and bundled Quran JSON
  types/         Shared TypeScript types
assets/          App icons and splash
```

Quran text is bundled in `src/data/quran/` so reading works offline. Recitation is fetched over the network.

## Credits and sources

The Quran is the Word of Allah. This app is a study aid. Translations are human work and cannot replace the Arabic.

- **Arabic text** — Bundled Uthmani script for offline reading
- **Urdu translation** — Fateh Muhammad Jalandhari
- **Spoken Urdu** — Shamshad Ali Khan (Jalandhari), via EveryAyah
- **Recitation audio** — [EveryAyah](https://everyayah.com/) (verse-by-verse MP3s)
- **Framework** — [Expo](https://expo.dev/) and React Native

Please treat the text with respect. If you redistribute this project, keep these attributions.

## Privacy

Qurus does not require an account. Bookmarks, notes, highlights, reading history, and preferences are stored locally with AsyncStorage. Audio is requested from EveryAyah when you play a verse. There is no in-app analytics or login.

Export a JSON backup from Settings if you want a copy of your study data.

## Contributing

Issues and pull requests are welcome. Please keep changes focused, and test reading plus playback on at least one platform before opening a PR.

## License

The repository currently includes the MIT license from the Expo project template (copyright 650 Industries, Inc.). Application code in this repo is provided as-is for personal study and learning.

Quran text, translations, and recitations remain the work of their respective authors and distributors. Using this app does not grant extra rights over that material.
