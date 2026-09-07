export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export const FOOTER_EXPERIENCE_LINKS: FooterLink[] = [
  { label: "Live Interactive Demo", href: "/#experience" },
  { label: "6 Core Essentials", href: "/#overview" },
  { label: "Why Qurus", href: "/#comparison" },
  { label: "The Story Behind Qurus", href: "/#story" },
  { label: "Android Download", href: "/#download" },
  { label: "Common Questions", href: "/#faq" },
];

export const FOOTER_OPEN_SOURCE_LINKS: FooterLink[] = [
  { label: "GitHub Repository", href: "https://github.com/GitCoder052023/Qurus", external: true },
  { label: "Release Notes", href: "https://github.com/GitCoder052023/Qurus/releases", external: true },
  { label: "MIT Permissive License", href: "https://github.com/GitCoder052023/Qurus/blob/main/LICENSE", external: true },
  { label: "Report an Issue", href: "https://github.com/GitCoder052023/Qurus/issues", external: true },
];

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];
