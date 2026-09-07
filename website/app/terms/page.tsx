import type { Metadata } from "next";
import {
  LegalPageShell,
  LegalHeader,
  LegalSummaryCard,
  TermsContent,
} from "@/components/legal";
import { TERMS_SUMMARY_ITEMS } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use governing the open-source Qurus application, disclaimers, MIT licensing, content availability, and user responsibilities.",
  alternates: {
    canonical: "https://qurus.app/terms",
  },
};

export default function TermsOfUsePage() {
  return (
    <LegalPageShell>
      <LegalHeader
        badge="Legal & Terms"
        title="Qurus Terms of Use"
        effectiveDate="September 6, 2026"
        lastUpdated="September 6, 2026"
      />

      <LegalSummaryCard
        title="Terms of Use Summary"
        bulletColorClass="bg-accent-gold"
        icon={
          <svg
            className="w-5 h-5 text-accent-gold"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        }
        items={TERMS_SUMMARY_ITEMS}
      />

      <TermsContent />
    </LegalPageShell>
  );
}
