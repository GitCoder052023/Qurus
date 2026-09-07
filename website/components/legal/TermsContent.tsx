import { LegalContactCard } from "./LegalContactCard";

export function TermsContent() {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-14 border border-border shadow-xs space-y-10 text-text-secondary text-sm sm:text-base leading-relaxed">
      <section className="space-y-4">
        <p>Welcome to Qurus.</p>
        <p>
          These Terms of Use (“Terms”) govern your use of the Qurus application
          and related project materials operated or maintained by Hamdan Khubaib
          (“Qurus,” “we,” “us,” or “our”).
        </p>
        <p>
          By installing, accessing, or using Qurus, you agree to these Terms. If
          you do not agree with them, do not use the application.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          1. What Qurus Is
        </h2>
        <p>
          Qurus is a reading, listening, and personal reflection application
          intended to make Quran study more accessible, quiet, and focused in
          everyday life. Features include:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Verse-by-verse Quran reading and audio synchronization</li>
          <li>Original Arabic recitation and spoken translations in five languages</li>
          <li>Structured reading journeys and unrestricted Quran exploration</li>
          <li>Tadabbur motivation engine, daily goals, and evening streak-saver reminders</li>
          <li>Verse search, bookmarks, and color highlights</li>
          <li>Private written reflection notes and spoken voice memos</li>
          <li>Background playback, lock-screen controls, and audio speeds</li>
        </ul>
        <p>
          Qurus is a software tool for personal reading and reflection. It is not
          intended to replace qualified scholars, teachers, translators, or
          academic institutions.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          2. Open-Source Software & MIT License
        </h2>
        <p>
          Qurus is open-source software. The underlying source code is
          distributed under the MIT License. The MIT License governs your rights
          to use, copy, modify, distribute, and sublicense the source code.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          3. Religious and Interpretive Disclaimer
        </h2>
        <p>
          Qurus presents Quranic Arabic text, translations, and recitation audio
          resources. Translations and explanatory notes are interpretations of the
          Arabic original.
        </p>
        <p>
          Qurus does not claim that every translation, transcription, metadata
          field, or categorization is perfect or suitable as the sole authority for
          religious rulings. Qurus is not a fatwa service.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          4. Your Personal Content
        </h2>
        <p>
          You retain ownership of the personal reflections and voice notes you
          create in Qurus. Because the application stores study content locally on
          your device, you are responsible for maintaining any backups you
          consider necessary.
        </p>
        <p>
          You must not use Qurus to create, store, or distribute content in a
          manner that violates applicable law or infringes upon the rights of
          others.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          5. Acceptable Use
        </h2>
        <p>
          You may use Qurus for lawful personal, educational, scholarly, and
          reflective purposes. You agree not to interfere with the application,
          introduce malicious code, or abuse external CDN infrastructure.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          6. Disclaimer of Warranties & Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by law, Qurus is provided on an “AS IS”
          and “AS AVAILABLE” basis. We disclaim warranties of merchantability,
          fitness for a particular purpose, and uninterrupted availability.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          7. Contact Information
        </h2>
        <p>
          For questions regarding these Terms or project matters, please contact:
        </p>
        <LegalContactCard
          role="Creator of Qurus"
          repoLabel="GitHub"
        />
      </section>
    </div>
  );
}
