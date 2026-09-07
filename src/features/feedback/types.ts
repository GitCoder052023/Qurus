import { Ionicons } from '@expo/vector-icons';

export interface CategoryOption {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}
