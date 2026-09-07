import { Ionicons } from '@expo/vector-icons';

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  content: string[];
  bullets?: string[];
  callout?: string;
}
