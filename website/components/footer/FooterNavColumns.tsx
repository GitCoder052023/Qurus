import Link from "next/link";
import {
  FOOTER_EXPERIENCE_LINKS,
  FOOTER_OPEN_SOURCE_LINKS,
  FOOTER_LEGAL_LINKS,
} from "@/data/navigation";

export function FooterNavColumns() {
  return (
    <>
      {/* Navigation Column: Product */}
      <div className="md:col-span-2 space-y-3">
        <h4 className="font-semibold text-text-primary uppercase tracking-wider text-[11px] font-mono">
          Experience
        </h4>

        <ul className="space-y-2.5 text-sm">
          {FOOTER_EXPERIENCE_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Column: Open Source & Code */}
      <div className="md:col-span-2 space-y-3">
        <h4 className="font-semibold text-text-primary uppercase tracking-wider text-[11px] font-mono">
          Open Source
        </h4>

        <ul className="space-y-2.5 text-sm">
          {FOOTER_OPEN_SOURCE_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Column: Privacy & Creator */}
      <div className="md:col-span-3 space-y-3">
        <h4 className="font-semibold text-text-primary uppercase tracking-wider text-[11px] font-mono">
          Privacy & Creator
        </h4>

        <ul className="space-y-2.5 text-sm">
          {FOOTER_LEGAL_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="pt-2">
            <div className="text-[10px] font-mono uppercase text-text-tertiary mb-1">
              Founder & Support
            </div>

            <a
              href="mailto:hamdankhubaib959@gmail.com"
              className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline break-all"
              title="Send email to Hamdan Khubaib"
            >
              <svg
                className="w-3.5 h-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="2"
                  y="4"
                  width="20"
                  height="16"
                  rx="2"
                />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>

              <span>hamdankhubaib959@gmail.com</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
