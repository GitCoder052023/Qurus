# Contributing to Qurus

Thank you for your interest in contributing to **Qurus**! 🌿

Qurus is an open-source project created to provide a calm, frictionless, ayah-by-ayah reading and listening environment. Whether you are a developer, designer, translator, writer, or reader, your contributions help make this project better for everyone.

## Ways You Can Contribute

There are many ways to contribute to Qurus:

1. **Reporting Issues & Bugs**: Notice a bug, playback glitch, or rendering issue? Open an issue with reproduction steps.

2. **Text & Translation Verification**: If you notice any typo, diacritic inaccuracy in Arabic script, or translation mistake, reporting it helps maintain text integrity.

3. **Localization & Language Support**: Help add translations in additional languages (English, Turkish, Indonesian, French, etc.).

4. **Design & UX Suggestions**: Ideas to make the interface cleaner, more accessible, and easier to navigate.

5. **Code & Performance**: Improvements to React Native / Expo components, audio lifecycle management, and local storage.

6. **Documentation**: Enhancing guides, READMEs, and developer walkthroughs.

---

## Getting Started with Development

### Prerequisites

* **Node.js**: v18 or higher (LTS recommended)
* **npm** or **yarn**
* **Expo CLI**: Available through `npx expo`
* **EAS CLI**: Available through `npx eas-cli`
* **Git**
* **Android Studio**: Required if testing on an Android Emulator or connected physical Android device
* **Java Development Kit (JDK)**: Required for local Android builds

### Local Setup

1. **Fork and Clone the Repository**:

   ```bash
   git clone https://github.com/GitCoder052023/Qurus.git

   cd Qurus
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npx expo start
   ```

4. **Run on Android**:

   ```bash
   npm run android
   ```

---

## Building Qurus with EAS

Qurus uses **Expo Application Services (EAS)** for creating Android builds.

There are two ways to build the application:

* **Local build** — the Android build is compiled on your own machine.
* **Cloud build** — the build is compiled on Expo's build servers.

Before building, make sure dependencies are installed:

```bash
npm install
```

You can also verify that the EAS CLI is available:

```bash
npx eas --version
```

### EAS Build Profiles

The exact build profiles available to contributors are defined in `eas.json`.

You can inspect the available profiles with:

```bash
cat eas.json
```

Do not assume that a profile is configured for a particular distribution type without checking the current `eas.json`.

### Local EAS Build

A local build compiles the Android application directly on your machine instead of using Expo's cloud build infrastructure.

Make sure your local Android build environment is configured correctly, including the Android SDK, Java/JDK, and required native build tools.

To create a local Android build using a specific EAS profile:

```bash
npx eas build --platform android --profile <profile-name> --local
```

For example, if the repository contains a `preview` profile:

```bash
npx eas build --platform android --profile preview --local
```

The generated build artifact will be written to the location reported by EAS after the build completes.

#### When to Use Local Builds

Local builds are useful when:

* You want to test native Android changes quickly.
* You want to avoid using EAS cloud build quotas.
* You need to debug the native build environment.
* You are working offline after dependencies and required Android tooling are available.
* You want direct control over the Android build environment.

> **Note:** Local builds require a correctly configured Android development environment. If the build fails during Gradle, Java, Android SDK, or native dependency setup, check your local environment before assuming the application code is responsible.

### EAS Cloud Build

Cloud builds compile the application on Expo's build infrastructure. This is usually the easiest option when you do not want to configure the complete Android native build environment locally.

To create a cloud Android build:

```bash
npx eas build --platform android --profile <profile-name>
```

For example:

```bash
npx eas build --platform android --profile preview
```

EAS will upload the project to its build infrastructure and provide a build page and artifact when the build completes.

You may need to authenticate with an Expo account:

```bash
npx eas login
```

You can check your authentication status with:

```bash
npx eas whoami
```

### Choosing Local vs Cloud Builds

| Build Type | Command                                                        | Build Environment |
| ---------- | -------------------------------------------------------------- | ----------------- |
| Local      | `npx eas build --platform android --profile <profile> --local` | Your machine      |
| Cloud      | `npx eas build --platform android --profile <profile>`         | EAS servers       |

Use **local builds** when you need control over the build environment or want to avoid cloud build usage.

Use **cloud builds** when you want a reproducible remote build without setting up the entire Android toolchain locally.

### Building After Code Changes

After making changes to the application, you can create another build using the same profile:

```bash
npx eas build --platform android --profile preview
```

For a local build:

```bash
npx eas build --platform android --profile preview --local
```

Always check `eas.json` before choosing a profile, as build profiles and their configuration may change over time.

### Testing Before Opening a Pull Request

Before submitting a PR that changes application behavior, contributors should test the changes locally where possible.

At minimum:

```bash
npm install
npx expo start
```

For changes that affect native Android behavior, audio, permissions, storage, or other native functionality, also test an Android build:

```bash
npx eas build --platform android --profile <profile> --local
```

If a local Android build is not available in your environment, use an appropriate EAS cloud build instead.

---

## Textual Integrity Guidelines

Accuracy of source texts is essential:

> **Important**: Any changes proposed to Arabic Ayah texts, diacritics, or translation data in `src/data/` must include verifiable citations to authenticated editions (e.g., standard Medina Uthmani Mushaf, verified academic publications). All source text modifications are strictly reviewed before merging.

---

## Pull Request (PR) Workflow

1. **Create a Topic Branch**:

   ```bash
   git checkout -b feature/your-feature-name

   # or

   git checkout -b fix/your-bug-fix
   ```

2. **Make Clean, Focused Changes**:

   * Keep pull requests focused on a single feature or fix.
   * Follow the existing code style and TypeScript conventions.
   * Test your changes across different screen sizes and dark/light themes where applicable.
   * Test native functionality on Android when your changes affect native behavior.

3. **Commit Your Changes**:

   Write clear, descriptive commit messages:

   ```bash
   git commit -m "feat(audio): add seek forward and backward gestures"
   ```

4. **Push and Open a PR**:

   * Push your branch to your fork.
   * Open a Pull Request against the `main` branch of `GitCoder052023/Qurus`.
   * Provide a clear summary of what was changed and why.
   * Mention any relevant build or testing steps performed.

## Code of Conduct

Please note that this project is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating in discussions, reporting issues, or opening pull requests, you agree to uphold its values of kindness, empathy, and respect.

## Questions & Community

Have a question or want to share feedback? Feel free to open an issue or start a discussion on GitHub.
