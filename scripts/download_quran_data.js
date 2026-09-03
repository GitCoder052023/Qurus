const fs = require('fs');
const path = require('path');
const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

const URDU_SURAH_NAMES = {
  1: "دیباچہ / سورۃ الفاتحہ",
  2: "گائے / سورۃ البقرہ",
  3: "عمران کا خاندان / سورۃ آل عمران",
  4: "عورتیں / سورۃ النساء",
  5: "دسترخوان / سورۃ المائدہ",
  6: "مویشی / سورۃ الانعام",
  7: "بلند مقامات / سورۃ الاعراف",
  8: "غنیمت کے مال / سورۃ الانفال",
  9: "توبہ / سورۃ التوبہ",
  10: "یونس علیہ السلام / سورۃ یونس",
  11: "ہود علیہ السلام / سورۃ ہود",
  12: "یوسف علیہ السلام / سورۃ یوسف",
  13: "گرج / سورۃ الرعد",
  14: "ابراہیم علیہ السلام / سورۃ ابراہیم",
  15: "پتھریلی چٹان / سورۃ الحجر",
  16: "شہد کی مکھی / سورۃ النحل",
  17: "رات کا سفر / سورۃ بنی اسرائیل",
  18: "غار / سورۃ الکہف",
  19: "مریم علیہا السلام / سورۃ مریم",
  20: "طٰہٰ / سورۃ طٰہٰ",
  21: "انبیاء / سورۃ الانبیاء",
  22: "حج / سورۃ الحج",
  23: "مومنون / سورۃ المؤمنون",
  24: "نور / سورۃ النور",
  25: "حق و باطل میں فرق / سورۃ الفرقان",
  26: "شعراء / سورۃ الشعراء",
  27: "چیونٹی / سورۃ النمل",
  28: "قصہ / سورۃ القصص",
  29: "مکڑی / سورۃ العنکبوت",
  30: "رومی / سورۃ الروم",
  31: "لقمان / سورۃ لقمان",
  32: "سجدہ / سورۃ السجدہ",
  33: "متحد لشکر / سورۃ الاحزاب",
  34: "سبا / سورۃ سبا",
  35: "پیدا کرنے والا / سورۃ فاطر",
  36: "یٰسٓ / سورۃ یٰسٓ",
  37: "صف بستہ / سورۃ الصافات",
  38: "صٓ / سورۃ صٓ",
  39: "گروہ در گروہ / سورۃ الزمر",
  40: "بخشنے والا / سورۃ غافر",
  41: "کھولی گئی / سورۃ فصلت",
  42: "باہمی مشورہ / سورۃ الشوریٰ",
  43: "سونے کی زینت / سورۃ الزخرف",
  44: "دھواں / سورۃ الدخان",
  45: "گھٹنوں پر گری ہوئی / سورۃ الجاثیہ",
  46: "ریت کے ٹیلے / سورۃ الاحقاف",
  47: "محمد ﷺ / سورۃ محمد",
  48: "کھلی فتح / سورۃ الفتح",
  49: "حجرے / سورۃ الحجرات",
  50: "قٓ / سورۃ قٓ",
  51: "بکھیرنے والیاں / سورۃ الذاریات",
  52: "طور پہاڑ / سورۃ الطور",
  53: "ستارہ / سورۃ النجم",
  54: "چاند / سورۃ القمر",
  55: "نہایت مہربان / سورۃ الرحمن",
  56: "واقع ہونے والی / سورۃ الواقعہ",
  57: "لوہا / سورۃ الحدید",
  58: "بحث کرنے والی / سورۃ المجادلہ",
  59: "جلاوطنی / سورۃ الحشر",
  60: "جانچی جانے والی / سورۃ الممتحنہ",
  61: "صف / سورۃ الصف",
  62: "جمعہ / سورۃ الجمعہ",
  63: "منافقین / سورۃ المنافقون",
  64: "ہار جیت / سورۃ التغابن",
  65: "طلاق / سورۃ الطلاق",
  66: "حرام کرنا / سورۃ التحریم",
  67: "بادشاہی / سورۃ الملک",
  68: "قلم / سورۃ القلم",
  69: "سچ مچ واقع ہونے والی / سورۃ الحاقہ",
  70: "عروج کے راستے / سورۃ المعارج",
  71: "نوح علیہ السلام / سورۃ نوح",
  72: "جنات / سورۃ الجن",
  73: "کپڑے میں لپٹنے والے / سورۃ المزمل",
  74: "چادر اوڑھنے والے / سورۃ المدثر",
  75: "قیامت / سورۃ القیامہ",
  76: "انسان / سورۃ الدھر / الانسان",
  77: "بھیجی جانے والیاں / سورۃ المرسلات",
  78: "بڑی خبر / سورۃ النبأ",
  79: "کھینچنے والے / سورۃ النازعات",
  80: "پیشانی پر بل ڈالا / سورۃ عبس",
  81: "لپیٹ دیا جانا / سورۃ التکویر",
  82: "پھٹ جانا / سورۃ الانفطار",
  83: "ناپ تول میں کمی کرنے والے / سورۃ المطففین",
  84: "ٹکڑے ٹکڑے ہونا / سورۃ الانشقاق",
  85: "بروج / سورۃ البروج",
  86: "رات کو آنے والا / سورۃ الطارق",
  87: "سب سے بلند / سورۃ الاعلیٰ",
  88: "چھا جانے والی / سورۃ الغاشیہ",
  89: "فجر / سورۃ الفجر",
  90: "شہر / سورۃ البلد",
  91: "سورج / سورۃ الشمس",
  92: "رات / سورۃ اللیل",
  93: "چاشت کا وقت / سورۃ الضحیٰ",
  94: "کشادہ کرنا / سورۃ الشرح",
  95: "انجیر / سورۃ التین",
  96: "جما ہوا خون / سورۃ العلق",
  97: "قدر / سورۃ القدر",
  98: "کھلی دلیل / سورۃ البینہ",
  99: "زلزلہ / سورۃ الزلزال",
  100: "دوڑنے والے گھوڑے / سورۃ العادیات",
  101: "کھڑکھڑانے والی / سورۃ القارعہ",
  102: "کثرت کی خواہش / سورۃ التکاثر",
  103: "زمانہ / سورۃ العصر",
  104: "عیب جو / سورۃ الہمزہ",
  105: "ہاتھی / سورۃ الفیل",
  106: "قریش / سورۃ قریش",
  107: "عام استعمال کی چیزیں / سورۃ الماعون",
  108: "حوض کوثر / خیر کثیر / سورۃ الکوثر",
  109: "کافرون / سورۃ الکافرون",
  110: "مدد / سورۃ النصر",
  111: "کھجور کی چھال کا بٹا رسا / سورۃ المسد",
  112: "خالص توحید / سورۃ الاخلاص",
  113: "صبح کا نکلنا / سورۃ الفلق",
  114: "انسان / سورۃ الناس"
};

async function main() {
  console.log('Step 1: Fetching all Surahs metadata...');
  const surahsMetaRes = await fetchJson('https://api.alquran.cloud/v1/surah');
  if (surahsMetaRes.code !== 200) {
    throw new Error('Failed to fetch surahs metadata');
  }

  const surahs = surahsMetaRes.data.map(s => ({
    number: s.number,
    name: s.name,
    englishName: s.englishName,
    englishNameTranslation: s.englishNameTranslation,
    urduName: URDU_SURAH_NAMES[s.number] || s.englishNameTranslation,
    numberOfAyahs: s.numberOfAyahs,
    revelationType: s.revelationType,
    juzStart: 1 // will be updated per first ayah
  }));

  const outDir = path.join(__dirname, '..', 'src', 'data');
  const quranDir = path.join(outDir, 'quran');
  fs.mkdirSync(quranDir, { recursive: true });

  console.log('Step 2: Fetching 114 Surahs content (Uthmani Arabic + Jalandhari Urdu)...');
  for (let surahNum = 1; surahNum <= 114; surahNum++) {
    const filePath = path.join(quranDir, `${surahNum}.json`);
    if (fs.existsSync(filePath)) {
      const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (existing.ayahs && existing.ayahs.length > 0) {
        surahs[surahNum - 1].juzStart = existing.ayahs[0].juz || 1;
      }
      continue;
    }

    console.log(`Downloading Surah ${surahNum}...`);
    let retries = 3;
    while (retries > 0) {
      try {
        const res = await fetchJson(`https://api.alquran.cloud/v1/surah/${surahNum}/editions/quran-uthmani,ur.jalandhry`);
        if (res.code === 200 && res.data && res.data.length >= 2) {
          const ar = res.data[0];
          const ur = res.data[1];
          
          const ayahs = ar.ayahs.map((ayah, idx) => ({
            numberInSurah: ayah.numberInSurah,
            globalNumber: ayah.number,
            arabicText: ayah.text,
            urduText: ur.ayahs[idx] ? ur.ayahs[idx].text : '',
            juz: ayah.juz,
            page: ayah.page,
            ruku: ayah.ruku,
            hizbQuarter: ayah.hizbQuarter,
            sajda: typeof ayah.sajda === 'boolean' ? ayah.sajda : (ayah.sajda ? true : false)
          }));

          if (ayahs.length > 0) {
            surahs[surahNum - 1].juzStart = ayahs[0].juz || 1;
          }

          const surahData = {
            ...surahs[surahNum - 1],
            ayahs
          };

          fs.writeFileSync(filePath, JSON.stringify(surahData), 'utf8');
          console.log(`Saved Surah ${surahNum}`);
          break;
        } else {
          retries--;
          await new Promise(r => setTimeout(r, 1000));
        }
      } catch (err) {
        retries--;
        await new Promise(r => setTimeout(r, 1000));
      }
    }
    await new Promise(r => setTimeout(r, 300));
  }

  console.log('Step 3: Writing src/data/surahs.ts...');
  const surahsTsContent = `import { SurahMetadata } from '../types';

export const SURAHS: SurahMetadata[] = ${JSON.stringify(surahs, null, 2)};

export const RECITERS = [
  {
    id: 'alafasy',
    name: 'Mishary Rashid Alafasy',
    arabicName: 'مشاري بن راشد العفاسي',
    subfolder: 'Alafasy_128kbps',
  },
  {
    id: 'abdulbasit',
    name: 'Abdul Basit Abdul Samad (Murattal)',
    arabicName: 'عبد الباسط عبد الصمد',
    subfolder: 'Abdul_Basit_Murattal_192kbps',
  },
  {
    id: 'husary',
    name: 'Mahmoud Khalil Al-Husary',
    arabicName: 'محمود خليل الحصري',
    subfolder: 'Husary_128kbps',
  },
  {
    id: 'shatri',
    name: 'Abu Bakr Al-Shatri',
    arabicName: 'أبو بکر الشاطري',
    subfolder: 'Abu_Bakr_Ash-Shaatree_128kbps',
  },
  {
    id: 'ghamadi',
    name: 'Saad Al-Ghamdi',
    arabicName: 'سعد الغامدي',
    subfolder: 'Ghamadi_40kbps',
  }
];

export function getAudioUrl(reciterSubfolder: string, surahNumber: number, ayahNumber: number): string {
  const surahPadded = String(surahNumber).padStart(3, '0');
  const ayahPadded = String(ayahNumber).padStart(3, '0');
  return \`https://everyayah.com/data/\${reciterSubfolder}/\${surahPadded}\${ayahPadded}.mp3\`;
}
`;

  fs.writeFileSync(path.join(outDir, 'surahs.ts'), surahsTsContent, 'utf8');
  console.log('Quran data packaging complete!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
