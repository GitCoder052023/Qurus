import type { Metadata } from "next";
import {
  LegalPageShell,
  LegalHeader,
  LegalSummaryCard,
  PrivacyContent,
} from "@/components/legal";
import { PRIVACY_SUMMARY_ITEMS } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Qurus privacy-first architecture: 100% on-device study content, zero user accounts, zero advertisements, and transparent anonymous analytics.",
  alternates: {
    canonical: "https://qurus.app/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell>
      <LegalHeader
        badge="Legal & Privacy"
        title="Qurus Privacy Policy"
        effectiveDate="September 6, 2026"
        lastUpdated="September 6, 2026"
      />

      <LegalSummaryCard
        title="Our Privacy-First Commitment at a Glance"
        bulletColorClass="bg-primary"
        icon={
          <svg
            className="w-5 h-5 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        }
        items={PRIVACY_SUMMARY_ITEMS}
      />

      <PrivacyContent />
    </LegalPageShell>
  );
}
