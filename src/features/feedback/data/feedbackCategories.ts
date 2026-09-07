import { CategoryOption } from '../types';

export const CATEGORIES: CategoryOption[] = [
  {
    id: 'bug_report',
    label: 'Bug Report',
    icon: 'bug-outline',
    description: 'Something isn’t working correctly',
  },
  {
    id: 'feature_request',
    label: 'Feature Request',
    icon: 'bulb-outline',
    description: 'Idea or improvement for Qurus',
  },
  {
    id: 'general_feedback',
    label: 'General Feedback',
    icon: 'chatbubble-ellipses-outline',
    description: 'Share your thoughts or experience',
  },
  {
    id: 'other',
    label: 'Other',
    icon: 'help-circle-outline',
    description: 'General inquiry or question',
  },
];
