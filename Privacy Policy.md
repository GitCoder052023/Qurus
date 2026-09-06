# Qurus Privacy Policy

**Effective Date:** September 6, 2026  
**Last Updated:** September 6, 2026

Qurus (“Qurus,” “we,” “us,” or “our”) is a Quran reading, listening, and personal reflection application created by Hamdan Khubaib.

This Privacy Policy explains what information Qurus handles, what is stored on your device, what limited analytics and feedback information is transmitted to third-party services, and how those services are used.

Our approach is privacy-first: personal study content is kept on-device, while the analytics system is intentionally limited to anonymous identifiers and sanitized product-usage information. User-generated Quran reflections and voice recordings are not sent to our analytics service.

> **Important:** Qurus does not require an account. However, Qurus uses PostHog for anonymous product analytics and in-app feedback. The PostHog integration is described in this policy below.

## 1. Information We Do Not Require

Qurus does not require you to create an account.

We do not require your name, password, phone number, social-media account, or profile information in order to use the core application.

Qurus does not provide a social feed, public profile, comments system, or user-to-user messaging service.

## 2. Personal Study Data Stored on Your Device

Qurus allows you to create and maintain personal study information, including:

* Bookmarks
* Verse highlights
* Written reflection notes
* Voice notes
* Recently studied verses
* Your last studied location
* Reading streak information
* Reading and audio preferences
* Onboarding state

The current Qurus application stores this information locally on your device using on-device storage. Qurus does not provide a server-side account or cloud synchronization system for this personal study information.

Your written reflections and voice recordings are intended to remain on the device on which you created them. They are not uploaded to Qurus or PostHog as part of Qurus analytics.

Deleting the application, clearing its app data, changing devices, or otherwise removing local application storage may permanently remove locally stored study information.

Qurus cannot recover local study information that has been deleted or lost from your device.

## 3. Voice Notes and Microphone Access

Qurus includes an optional voice-note feature.

When you choose to record a voice note, Qurus requests permission to use your device microphone. The microphone is used to create the recording you explicitly request.

Voice recordings are associated with the relevant verse and stored locally on your device. Qurus does not operate a server that receives or stores your voice-note recordings as part of the current application architecture.

Qurus analytics may record the duration, in seconds, of a completed voice-note recording solely to understand feature usage. The recording itself, its binary data, and any transcript are not sent to PostHog.

You can remove a voice note from the application through the available note controls.

You are responsible for ensuring that anything you record is appropriate for your intended use and does not unlawfully capture another person's private communications or information.

## 4. Anonymous Analytics and Product Usage

Qurus uses **PostHog** for lightweight product analytics. The purpose is to understand high-level application health and feature usage, such as active-user counts, retention, and adoption of features.

### Anonymous identifier

Qurus does not use an account-based identity for analytics. Instead:

* On first use, Qurus generates a random UUID v4 identifier locally.
* The identifier is stored on the device in Qurus's local application storage.
* It is not derived from your name, email address, phone number, contacts, advertising ID, MAC address, or other hardware identifier.
* The same anonymous identifier may be reused across app launches so PostHog can distinguish a new installation from a returning installation.

This identifier is used as the analytics identity for the Qurus installation; it is not intended to directly identify you as a named individual.

### Analytics events

Qurus currently sends limited events to PostHog, including information such as:

* App opens and whether the installation is new
* Platform and Qurus app version
* The numeric Surah number opened
* Reciter identifier, playback mode, and playback speed when audio is played
* Search filter type, without the text of the search query
* Counts of bookmarks and highlights created
* Whether a newly created note includes a voice note, without the note contents
* Voice-note duration, without the recording itself
* Non-sensitive preference changes, such as setting names and values used for product analysis
* Completion of onboarding
* Agreement to the app's legal consent screen

Qurus intentionally does **not** send the following to PostHog as analytics payloads:

* Written reflection or journal text
* Voice recordings or audio binaries
* Voice-note transcripts
* Quran verse text, translations, or excerpt snippets as user-content payloads
* Search query strings
* Passwords, contacts, or similar account credentials
* Device hardware identifiers used as an analytics identity

Qurus also disables PostHog session replay and does not use analytics as a condition for core application functionality. The app is designed to continue working when analytics is unavailable or disabled.

## 5. Contact Us and In-App Feedback

Qurus provides a native Contact Us & Feedback feature within the application.

If you have a question, encounter a problem, want to report a bug, or have other feedback about Qurus, we encourage you to **contact us through the in-app Contact Us & Feedback feature first**. This is the preferred method for contacting Qurus because it provides relevant application information that can help us understand and respond to your request.

Unlike ordinary product-usage analytics, a feedback submission contains the information you explicitly choose to submit so that Qurus can receive and respond to your feedback.

A feedback submission may include:

* Category, such as Bug Report, Feature Request, General Feedback, or Other

* The message you write

* Your Qurus app version

* Your platform

* An email address, only if you voluntarily provide one

Feedback is currently submitted through PostHog's event-capture infrastructure; Qurus does not require a separate custom feedback backend for this feature.

You can submit feedback without providing an email address. If you provide an email address, it may be used to identify a way to respond to you regarding your feedback.

**Please do not include passwords, authentication secrets, private Quran reflections, confidential personal information, or other sensitive information in a feedback message.**

Qurus does not intentionally attach your local bookmarks, highlights, notes, voice recordings, reading history, or Quran-study content to feedback submissions.

### Support Contact Preference

For support requests and general questions, please **use the in-app Contact Us & Feedback feature first**.

If you have submitted a request through the in-app support system and **do not receive a response**, you may contact us directly by email using the address provided in the Contact Us section below:

**Email:** [hamdankhubaib959@gmail.com](mailto:hamdankhubaib959@gmail.com)

## When contacting us by email about an existing in-app support request, please provide enough information for us to identify and understand the issue. Do not send passwords, authentication secrets, or other sensitive information unnecessarily.

## 6. Search and Reading Interactions

Qurus allows you to search for Surahs and verse references.

Searches are performed against Quran data packaged with the application. For analytics purposes, Qurus may record that a search was performed and the selected filter type, but it does **not** send the text typed into the search field to PostHog.

Qurus may record the numeric Surah number associated with a Surah-opening event. These events are used to understand broad feature engagement and are not intended to create a server-side copy of your personal study notes or detailed reading history.

## 7. Network Requests and Third-Party Infrastructure

Although personal study data is designed to remain local, Qurus is not completely network-isolated.

Certain features require network access to retrieve remote resources, including Quran recitation audio, Urdu translation audio, artwork, application updates, and analytics or feedback submissions when PostHog is configured.

The PostHog ingestion host is configured through the application's environment configuration. Qurus's current configuration uses PostHog infrastructure for analytics and feedback event ingestion.

When your device communicates with a third-party service, that provider may receive ordinary technical information associated with the request, such as an IP address, request time, device/network information, or other information normally processed by internet infrastructure. Qurus does not control the exact technical metadata that may be generated or logged by independent network providers.

Third-party providers may process information according to their own privacy policies, terms, security controls, and retention practices.

Relevant third-party services used by the current application include PostHog, EveryAyah-hosted audio resources, external image resources, and Expo update infrastructure. Apple, Google, Android, iOS, and other operating-system services may also process information as required to provide their platform functionality.

## 8. Device Permissions

Qurus may request device permissions necessary for specific features.

In particular, microphone permission is requested when you choose to record a voice note.

Qurus does not request access to your contacts, photos, address book, or device location as part of the current core application functionality.

You can manage permissions through your device's operating-system settings.

## 9. Sharing Content

Qurus includes a system sharing feature for verses.

When you choose to share a verse, the application passes the selected verse content to the sharing functionality provided by your device and operating system.

Qurus does not operate the external application or service you choose for sharing, and content shared outside Qurus becomes subject to the policies of that external service.

## 10. Advertising

Qurus is designed without advertisements.

Qurus does not intentionally use behavioral advertising, sell advertising profiles, or sell users' personal information.

The PostHog integration described above is for product analytics and feedback, not for serving ads.

## 11. Data Retention

Qurus generally does not maintain a remote copy of your locally stored notes, bookmarks, highlights, voice recordings, or other personal study content.

The anonymous analytics identifier may remain associated with analytics events in PostHog according to PostHog's applicable storage and retention practices and Qurus's configured analytics setup.

Analytics events are designed to contain only limited product-usage information rather than the contents of your private study data.

Feedback submissions may contain the text and optional email address you choose to provide and may be retained by the services used to receive and process that feedback according to their applicable retention practices.

Remote infrastructure used for audio, artwork, application updates, analytics, or feedback may retain technical request information according to the relevant provider's own policies and retention practices.

Local data remains on your device until you delete it, clear the relevant application data, uninstall the application, or otherwise remove it through your device.

## 12. Security

Qurus is designed to minimize personal-data collection and keep personal study information on-device.

The analytics integration is also designed with privacy boundaries, including a locally generated random identifier, sanitized event payloads, disabled session replay, and no analytics dependency for core application functionality.

However, no software, device, storage system, or internet transmission can be guaranteed to be completely secure.

You are responsible for maintaining the security of your device, including any device lock, operating-system security controls, backups, and access permissions.

Because Qurus does not provide cloud synchronization for your personal study data, losing access to your device may also mean losing locally stored information.

## 13. Children's Privacy

Qurus does not require users to create accounts or provide personal information to use the core application.

Qurus nevertheless does not knowingly seek to collect personal information from children for advertising purposes or to build child profiles.

Where a user voluntarily submits feedback containing personal information, that information is processed as described in this Privacy Policy.

Parents and guardians should supervise their children's use of mobile applications and device permissions where appropriate.

If you believe a child has provided personal information to Qurus and you would like us to review or address it, please contact us using the contact information below.

## 14. Your Privacy Rights

Depending on where you live, you may have legal rights concerning personal data, including rights relating to access, correction, deletion, consent, withdrawal, complaints, or other personal-data matters.

Because Qurus's personal study data is primarily stored locally, many requests concerning notes, bookmarks, highlights, voice recordings, and reading preferences can be handled directly by deleting or changing the relevant local data on the device.

For analytics or feedback information held by Qurus's third-party service providers, you may contact us with a privacy request. We will consider and respond to requests as required by applicable law and subject to any limitations that apply to third-party systems and legal obligations.

Where Indian data-protection law applies, Qurus intends to operate its personal-data practices in accordance with applicable requirements, including the Digital Personal Data Protection Act, 2023 and applicable rules and commencement provisions.

The Digital Personal Data Protection Rules, 2025 were notified by India's Ministry of Electronics and Information Technology on November 14, 2025, with phased commencement provisions. Qurus will apply the provisions that are legally in force and applicable to the service at the relevant time. 

## 15. Third-Party Services

The current application relies on third-party infrastructure and libraries to provide parts of its functionality. These may include:

* **PostHog** — product analytics and in-app feedback event ingestion
* **Expo / Expo Updates infrastructure** — application updates and related platform services
* **EveryAyah-hosted audio resources** — Quran recitation and related audio resources
* **External image-hosting resources** — player artwork and related assets
* **Apple, Google, Android, iOS, and other operating-system services** — device and platform functionality

Third-party services operate under their own terms and privacy policies. Qurus does not control the privacy, retention, or security practices of independent third-party providers.

## 16. Changes to This Privacy Policy

We may update this Privacy Policy when Qurus changes, or when legal or regulatory requirements change.

When we make material changes, we may update the “Last Updated” date above and provide additional notice where appropriate.

Your continued use of Qurus after an updated policy becomes effective means the updated policy applies to your use of the application, to the extent permitted by applicable law.

## 17. Contact Us

For privacy questions, privacy requests, or concerns, please use the **in-app Contact Us & Feedback feature first**.

If you do not receive a response through the in-app support system, you may contact us directly by email:

**Qurus / Hamdan Khubaib**

**Email:** [hamdankhubaib959@gmail.com](mailto:hamdankhubaib959@gmail.com)

**Project:** Qurus

**Repository:** https://github.com/GitCoder052023/Qurus

Please include enough information for us to understand and respond to your request, but do not send passwords, authentication secrets, or other sensitive information unnecessarily.

## 18. Important Scope Note

This Privacy Policy describes the current Qurus application architecture as of the Effective Date above.

Qurus may evolve over time. New versions may introduce features such as optional accounts, synchronization, additional analytics, notifications, subscriptions, cloud storage, or additional third-party services. Where those changes materially affect privacy, this policy should be updated before or alongside the relevant release.

Nothing in this Privacy Policy is intended to remove or limit any privacy rights that cannot lawfully be waived under applicable law.

## 19. Third-Party Privacy Policies

Because Qurus uses independent third-party infrastructure, you should review the privacy documentation of those providers for information about their own processing practices, including PostHog's current documentation.

This Privacy Policy describes Qurus's intended collection and use of information; it does not replace the privacy notices of independent providers.
