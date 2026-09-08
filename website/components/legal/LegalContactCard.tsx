"use client";

import { trackGitHub } from "@/utils/analytics";

interface LegalContactCardProps {
  role?: string;
  repoLabel?: string;
}

export function LegalContactCard({
  role = "Creator & Maintainer of Qurus",
  repoLabel = "Repository",
}: LegalContactCardProps) {
  return (
    <div className="p-4 rounded-xl bg-surface border border-border text-sm">
      <p className="font-semibold text-text-primary">Hamdan Khubaib</p>
      <p className="text-text-secondary">{role}</p>
      <p className="mt-2">
        Email:{" "}
        <a
          href="mailto:hamdankhubaib959@gmail.com"
          className="text-primary font-semibold hover:underline"
        >
          hamdankhubaib959@gmail.com
        </a>
      </p>
      <p>
        {repoLabel}:{" "}
        <a
          href="https://github.com/GitCoder052023/Qurus"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackGitHub("legal_contact_card", { destination: "repository" })
          }
          className="text-primary hover:underline"
        >
          github.com/GitCoder052023/Qurus
        </a>
      </p>
    </div>
  );
}
