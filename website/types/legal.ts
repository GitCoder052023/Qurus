import type { ReactNode } from "react";

export interface LegalSummaryItem {
  title: string;
  description: string;
}

export interface LegalSummaryCardProps {
  title: string;
  icon: ReactNode;
  bulletColorClass: string;
  items: LegalSummaryItem[];
}
