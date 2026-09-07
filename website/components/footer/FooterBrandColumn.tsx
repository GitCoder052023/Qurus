import Image from "next/image";

export function FooterBrandColumn() {
  return (
    <div className="md:col-span-5 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-primary/25 shadow-xs flex items-center justify-center bg-surface">
          <Image
            src="/images/icon.png"
            alt="Qurus Logo"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>

        <span className="font-semibold text-base text-text-primary tracking-tight">
          Qurus
        </span>

        <span className="font-arabic text-primary text-sm opacity-90 select-none">
          (قُرُوص)
        </span>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-primary-muted text-primary border border-primary/20">
          v2.3.0
        </span>
      </div>

      <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
        A peaceful, focused way to read, listen to, and understand the Quran.
        Built for everyday life with 5 paired languages, screen-off audio,
        quiet consistency, and on-device privacy.
      </p>

      <div className="pt-2">
        <blockquote className="font-editorial text-sm italic text-text-tertiary max-w-sm leading-relaxed border-l-2 border-primary/30 pl-3">
          “Less friction. More reflection. A deeper connection with every verse.”
        </blockquote>
      </div>

      <div className="pt-3 flex items-center gap-3">
        <a
          href="https://github.com/GitCoder052023/Qurus"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border shadow-2xs hover:border-primary/30 hover:text-text-primary transition-colors text-xs font-medium"
        >
          <svg className="w-3.5 h-3.5 text-text-secondary" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>Star on GitHub</span>
        </a>
        <a
          href="/api/download"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-muted text-primary hover:bg-primary-light transition-colors text-xs font-semibold"
        >
          <span>Download APK</span>
          <span>↓</span>
        </a>
      </div>
    </div>
  );
}
