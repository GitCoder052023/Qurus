export interface ThemeColors {
  background: string;
  card: string;
  surface: string;
  surfaceHighlight: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  arabicText: string;
  urduText: string;
  border: string;
  borderSubtle: string;
  primary: string; // calming emerald
  primaryMuted: string;
  primaryLight: string;
  accentGold: string;
  activeAyahBg: string;
  activeAyahBorder: string;
  bookmarkIcon: string;
  highlightBg: string;
  noteBg: string;
  miniPlayerBg: string;
  tabBarBg: string;
  tabBarBorder: string;
  tabActive: string;
  tabInactive: string;
  statusBarStyle: 'light' | 'dark';
  cardElevated: string;
  urduHighlight: string;
  arabicHighlight: string;
  chipBg: string;
}

export const lightTheme: ThemeColors = {
  background: '#FAF8F5', // soft warm ivory
  card: '#FFFFFF',
  surface: '#F4F0E8',
  surfaceHighlight: '#EAE4D6',
  textPrimary: '#1E293B',
  textSecondary: '#475569',
  textTertiary: '#94A3B8',
  arabicText: '#0F172A',
  urduText: '#334155',
  border: '#E2DCD2',
  borderSubtle: '#EDE8DF',
  primary: '#0D7A57', // serene emerald
  primaryMuted: '#0D7A5720',
  primaryLight: '#E6F4EA',
  accentGold: '#B8860B',
  activeAyahBg: '#EAF7EE', // gentle recitation highlight
  activeAyahBorder: '#2E8B57',
  bookmarkIcon: '#D97706',
  highlightBg: '#FEF9C3',
  noteBg: '#FEF3C7',
  miniPlayerBg: '#FFFFFF',
  tabBarBg: '#FFFFFF',
  tabBarBorder: '#E2DCD2',
  tabActive: '#0D7A57',
  tabInactive: '#64748B',
  statusBarStyle: 'dark',
  cardElevated: '#FFFFFF',
  urduHighlight: '#FFFBEB',
  arabicHighlight: '#F0FDF4',
  chipBg: '#F3EFE6',
};

export const darkTheme: ThemeColors = {
  background: '#0B0F17', // deep atmospheric dusk
  card: '#151C28',
  surface: '#1E2638',
  surfaceHighlight: '#2A344A',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',
  arabicText: '#F8FAFC',
  urduText: '#CBD5E1',
  border: '#232D3F',
  borderSubtle: '#1A2332',
  primary: '#10B981', // serene emerald glow
  primaryMuted: '#10B98122',
  primaryLight: '#064E3B',
  accentGold: '#F59E0B',
  activeAyahBg: '#0D281E',
  activeAyahBorder: '#10B981',
  bookmarkIcon: '#F59E0B',
  highlightBg: '#2E2611',
  noteBg: '#2A2312',
  miniPlayerBg: '#151C28',
  tabBarBg: '#101622',
  tabBarBorder: '#1E2638',
  tabActive: '#10B981',
  tabInactive: '#64748B',
  statusBarStyle: 'light',
  cardElevated: '#1C2536',
  urduHighlight: '#2A200B',
  arabicHighlight: '#0C2E20',
  chipBg: '#1E2638',
};

export const sepiaTheme: ThemeColors = {
  background: '#F4ECE1', // antique manuscript parchment
  card: '#FAF4EB',
  surface: '#ECE2D3',
  surfaceHighlight: '#DFD2C0',
  textPrimary: '#2D2319',
  textSecondary: '#5C4E3E',
  textTertiary: '#8D7B68',
  arabicText: '#231A12',
  urduText: '#44372B',
  border: '#DDCFBD',
  borderSubtle: '#E8DDCF',
  primary: '#7C4A1E', // warm terracotta leather
  primaryMuted: '#7C4A1E20',
  primaryLight: '#EAD9C8',
  accentGold: '#9A6B2F',
  activeAyahBg: '#EDE1CC',
  activeAyahBorder: '#9A6B2F',
  bookmarkIcon: '#C27803',
  highlightBg: '#EFE0B9',
  noteBg: '#E9DAC0',
  miniPlayerBg: '#FAF4EB',
  tabBarBg: '#FAF4EB',
  tabBarBorder: '#DDCFBD',
  tabActive: '#7C4A1E',
  tabInactive: '#786C5E',
  statusBarStyle: 'dark',
  cardElevated: '#FFFFFF',
  urduHighlight: '#FAF0DE',
  arabicHighlight: '#EFE6D6',
  chipBg: '#ECE2D3',
};
