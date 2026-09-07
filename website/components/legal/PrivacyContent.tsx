import { LegalContactCard } from "./LegalContactCard";

export function PrivacyContent() {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-14 border border-border shadow-xs space-y-10 text-text-secondary text-sm sm:text-base leading-relaxed">
      <section className="space-y-4">
        <p>
          Qurus (“Qurus,” “we,” “us,” or “our”) is a Quran reading, listening,
          and personal reflection application created by Hamdan Khubaib.
        </p>
        <p>
          This Privacy Policy explains what information Qurus handles, what is
          stored on your device, what limited analytics and feedback information
          is transmitted to third-party services, and how those services are used.
        </p>
        <p>
          Our approach is privacy-first: personal study content is kept on-device,
          while the analytics system is intentionally limited to anonymous
          identifiers and sanitized product-usage information. User-generated Quran
          reflections and voice recordings are not sent to our analytics service.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          1. Information We Do Not Require
        </h2>
        <p>
          Qurus does not require you to create an account. We do not require your
          name, password, phone number, social-media account, or profile information
          in order to use the core application.
        </p>
        <p>
          Qurus does not provide a social feed, public profile, comments system, or
          user-to-user messaging service.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          2. Personal Study Data Stored on Your Device
        </h2>
        <p>
          Qurus allows you to create and maintain personal study information,
          including:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Bookmarks and verse highlights</li>
          <li>Written reflection notes and spoken voice notes</li>
          <li>Recently studied verses and last studied location</li>
          <li>Daily Tadabbur goals and reading streak information</li>
          <li>Structured journey checkpoints</li>
          <li>Reading and audio preferences</li>
          <li>Onboarding state and notification reminder settings</li>
        </ul>
        <p>
          The current Qurus application stores this information locally on your
          device using on-device storage. Qurus does not provide a server-side
          account or cloud synchronization system for this personal study
          information.
        </p>
        <p>
          Your written reflections and voice recordings remain on the device on
          which you created them. They are not uploaded to Qurus or third parties.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          3. Voice Notes and Microphone Access
        </h2>
        <p>
          Qurus includes an optional voice-note feature. When you choose to record a
          voice note, Qurus requests permission to use your device microphone. The
          microphone is used solely to create the recording you explicitly request.
        </p>
        <p>
          Voice recordings are associated with the relevant verse and stored
          locally on your device. Qurus does not operate a server that receives or
          stores your voice-note recordings as part of the current application
          architecture.
        </p>
        <p>
          Qurus analytics may record the duration, in seconds, of a completed
          voice-note recording solely to understand feature usage. The recording
          itself, its binary data, and any transcript are never transmitted.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          4. Anonymous Analytics and Product Usage
        </h2>
        <p>
          Qurus uses <strong>PostHog</strong> for lightweight product analytics. The
          purpose is to understand high-level application health and feature adoption,
          such as active-user counts and app stability.
        </p>
        <h3 className="text-base font-semibold text-text-primary">
          Anonymous Identifier
        </h3>
        <p>
          On first use, Qurus generates a random UUID v4 identifier locally. It is
          not derived from your name, email address, phone number, contacts,
          advertising ID, or hardware identifier.
        </p>
        <h3 className="text-base font-semibold text-text-primary">
          What We Intentionally Do NOT Send
        </h3>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Written reflection or journal text</li>
          <li>Voice recordings or audio binaries</li>
          <li>Voice-note transcripts</li>
          <li>Quran verse text or search query strings</li>
          <li>Passwords, contacts, or personal credentials</li>
        </ul>
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          5. Contact Us and In-App Feedback
        </h2>
        <p>
          Qurus provides a native Contact Us & Feedback feature within the app.
          A feedback submission may include a category, the message you write, app
          version, platform, and an optional email address if you voluntarily provide
          one to receive a reply.
        </p>
        <p>
          For support requests, questions, or privacy concerns, you may contact the
          creator directly:
        </p>
        <LegalContactCard
          role="Creator & Maintainer of Qurus"
          repoLabel="Repository"
        />
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          6. Third-Party Infrastructure
        </h2>
        <p>
          Qurus utilizes verified external infrastructure to stream audio and deliver
          content:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>
            <strong>EveryAyah CDN:</strong> Provides public Quran recitation audio
            streams.
          </li>
          <li>
            <strong>PostHog:</strong> Ingests anonymous app reliability metrics.
          </li>
          <li>
            <strong>Expo / EAS:</strong> Handles application build and runtime
            updates.
          </li>
        </ul>
      </section>

      <section className="space-y-4 pt-6 border-t border-border-subtle">
        <h2 className="text-xl font-semibold text-text-primary">
          7. Security and Data Retention
        </h2>
        <p>
          Because personal study content is stored strictly on your local device,
          deleting the app or clearing device data will permanently remove that
          information. We encourage keeping standard device backups.
        </p>
      </section>
    </div>
  );
}
