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

## Getting Started with Development

### Prerequisites
- **Node.js**: v18 or higher (LTS recommended)
- **npm** or **yarn**
- **Expo CLI**: Installed globally or via `npx expo`
- **Android Studio** (if testing on an Android Emulator or connected physical device)

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
   - Keep pull requests focused on a single feature or fix.
   - Follow the existing code style and TypeScript conventions.
   - Test your changes across different screen sizes and dark/light themes where applicable.

3. **Commit Your Changes**:
   Write clear, descriptive commit messages:
   ```bash
   git commit -m "feat(audio): add seek forward and backward gestures"
   ```

4. **Push and Open a PR**:
   - Push your branch to your fork.
   - Open a Pull Request against the `main` branch of `GitCoder052023/Qurus`.
   - Provide a clear summary of what was changed and why.

## Code of Conduct

Please note that this project is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating in discussions, reporting issues, or opening pull requests, you agree to uphold its values of kindness, empathy, and respect.

## Questions & Community

Have a question or want to share feedback? Feel free to open an issue or start a discussion on GitHub.
