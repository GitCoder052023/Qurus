# Qurus Analytics & Feedback Guide (PostHog)

Qurus uses **PostHog** for lightweight, privacy-preserving product analytics and direct in-app feedback submission.

The sole purpose of this analytics integration is to understand high-level app health (such as Daily Active Users, Monthly Active Users, and retention) and how features are utilized, without ever inspecting, profiling, or uploading users' private Quran study activities.

---

## 1. Credentials & Configuration

Credentials are not hardcoded in the source code. They are configured via environment variables.

### Configuration Point
- Implementation configuration: [`src/lib/analytics/config.ts`](file:///Users/hamdan/Qurus/src/lib/analytics/config.ts)
- Environment template: [`.env.example`](file:///Users/hamdan/Qurus/.env.example)

### Providing PostHog Credentials
Create a `.env` file in the root of the project (or set EAS environment variables):

```bash
# PostHog Project API Key (starts with phc_)
EXPO_PUBLIC_POSTHOG_API_KEY=phc_YOUR_POSTHOG_API_KEY_HERE

# PostHog Ingestion Host
EXPO_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

> [!NOTE]
> If `EXPO_PUBLIC_POSTHOG_API_KEY` is not set or contains the placeholder string (`phc_YOUR_POSTHOG_API_KEY_HERE`), the analytics module **safely no-ops**. No network requests are made, and no errors or crashes are produced.

---

## 2. Anonymous User Tracking

Qurus has no accounts, logins, or server-side user databases.

To measure DAU/MAU and returning users:
- On first launch, a random RFC4122 v4 UUID is generated locally.
- It is saved to on-device `AsyncStorage` under `@qurus_analytics_anonymous_id_v1`.
- The identifier is never derived from or associated with any personal information (names, emails, phone numbers, device hardware IDs, or advertising IDs).
- It is reused across launches to allow PostHog to distinguish new vs. returning users.

---

## 3. Event Taxonomy

All analytics events and their strictly sanitized payloads are defined in [`src/lib/analytics/events.ts`](file:///Users/hamdan/Qurus/src/lib/analytics/events.ts):

| Event Name | Purpose | Allowed Payload |
|---|---|---|
| `app_open` | Active user tracking (DAU, WAU, MAU) | `{ is_new_user: boolean, platform: string, app_version: string }` |
| `surah_opened` | Surah reading engagement | `{ surah_number: number }` |
| `audio_played` | Recitation audio usage | `{ reciter_id: string, mode: string, speed: number }` |
| `search_performed` | Search feature utilization | `{ filter_type: string }` *(NO query text)* |
| `bookmark_created` | Bookmark utilization count | *(Empty - NO verse text or snippets)* |
| `highlight_created` | Highlight utilization count | *(Empty)* |
| `note_created` | Reflection note feature usage | `{ has_voice: boolean }` *(NO note text)* |
| `voice_note_recorded`| Voice note feature usage | `{ duration_seconds: number }` *(NO audio file)* |
| `preference_changed` | UX preference adoption | `{ setting_key: string, setting_value: string\|number\|boolean }` |
| `onboarding_completed`| Onboarding completion rate | *(Empty)* |
| `legal_consent_agreed`| First-launch agreement rate | *(Empty)* |
| `feedback_submitted` | In-app user feedback | `{ category, message, email?, platform, app_version }` |

---

## 4. Strictly Excluded Data (Privacy Guarantee)

Under no circumstances should the following data be captured or sent to PostHog:

- ❌ **Note text**: User reflections, personal thoughts, and journal entries.
- ❌ **Voice audio**: Any audio recording files or binary chunks.
- ❌ **Voice transcripts**: Any transcription of spoken reflections.
- ❌ **Quran text / snippets**: Ayah text, translations, or snippet extracts.
- ❌ **Search queries**: Text strings typed into the search bar.
- ❌ **Personally Identifiable Information**: Names, phone numbers, contacts, device hardware IDs, or passwords.
- ❌ **Reading history profiles**: Fine-grained reading logs mapping individual users to exact study timestamps.

---

## 5. Contact Us & In-App Feedback

Qurus provides a native **Contact Us & Feedback** screen (`src/app/feedback.tsx`), accessible from Settings.

- Submissions are dispatched directly through PostHog event capture (`feedback_submitted`).
- No custom backend or database is required.
- Users choose from: `Bug Report`, `Feature Request`, `General Feedback`, or `Other`.
- **Email is strictly optional**: Users can submit entirely anonymously, or optionally leave an email if they wish to receive a direct reply.
- Study data (notes, audio notes, bookmarks) is never attached to feedback submissions.

---

## 6. How Developers Should Add Future Events

When instrumenting new features, follow these strict rules:

1. **Define the event type in [`src/lib/analytics/events.ts`](file:///Users/hamdan/Qurus/src/lib/analytics/events.ts)**:
   Add the event constant to `ANALYTICS_EVENTS` and define a strict TypeScript interface for its payload.
2. **Review against privacy rules**:
   Confirm the payload contains **only** non-sensitive metadata (counts, IDs, enums, numbers) and zero user-generated content or personal reflections.
3. **Expose a helper function in [`src/lib/analytics/index.ts`](file:///Users/hamdan/Qurus/src/lib/analytics/index.ts)**:
   Always wrap event tracking in type-safe helpers and ensure safety boundaries so tracking failures can never crash the app or block user actions.
4. **Never make app functionality depend on analytics**:
   Qurus is offline-first. Features must work smoothly even with no network connection or when analytics services are down.
