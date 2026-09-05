# Security Policy

## Qurus Security

Qurus is an open-source Quran reading, listening, and personal reflection application.

We take security seriously and welcome responsible reports from security researchers, developers, and users who discover potential vulnerabilities in Qurus.

## Supported Versions

Security fixes are generally applied to the latest version of Qurus.

| Version                         | Supported      |
| ------------------------------- | -------------- |
| Latest release                  | ✅              |
| Older releases                  | ⚠️ Best effort |
| Unreleased / development builds | ❌              |

If you discover a vulnerability in an older version, please first verify whether the issue is still present in the latest release.

## Reporting a Vulnerability

If you believe you have discovered a security vulnerability in Qurus, please report it privately rather than opening a public GitHub issue.

**Security contact:** hamdankhubaib959@gmail.com

Please include:

* A clear description of the vulnerability
* The affected Qurus version
* The affected platform and operating-system version, where relevant
* Steps required to reproduce the issue
* The potential security or privacy impact
* Any proof-of-concept necessary to understand the issue
* Screenshots, logs, or other supporting information where useful

Please avoid including real users' personal information, private recordings, credentials, or other sensitive data in your report.

## Where to Report

Please send security reports to:

**hamdankhubaib959@gmail.com**

Use a subject such as:

`[Security] Brief description of vulnerability`

If a security email address has not yet been configured, do not disclose sensitive vulnerability details through a public GitHub issue.

## Responsible Disclosure

We ask security researchers to give us a reasonable opportunity to investigate and address a vulnerability before publicly disclosing it.

Please:

* Avoid accessing, modifying, deleting, or exposing data belonging to other users
* Avoid disrupting Qurus, GitHub, audio providers, update infrastructure, or other third-party services
* Avoid denial-of-service testing
* Avoid social engineering, phishing, or attacks against people
* Do not publicly disclose an exploitable vulnerability before we have had a reasonable opportunity to address it
* Only test against accounts, devices, and data you own or have explicit permission to test

If a vulnerability requires interaction with a third-party service, please follow that provider's security and acceptable-use requirements as well.

## What You Can Expect From Us

When a valid vulnerability report is received, we will make reasonable efforts to:

1. Acknowledge receipt of the report.
2. Assess the reported issue and its potential impact.
3. Investigate and reproduce the issue where possible.
4. Determine an appropriate remediation.
5. Release a fix or mitigation when reasonably possible.
6. Coordinate disclosure where appropriate.

Response and remediation times may vary depending on the severity and complexity of the issue.

## Severity

We may consider factors including:

* Whether sensitive user data can be accessed
* Whether the vulnerability can be exploited remotely
* Whether exploitation requires user interaction
* The privileges required to exploit the issue
* The number of users potentially affected
* Whether the vulnerability can compromise the application or device

A vulnerability's final severity will be determined by Qurus based on its actual impact and exploitability.

## Privacy and Local Data

Qurus is designed to keep personal study information on the user's device.

This includes information such as:

* Written reflection notes
* Voice notes
* Bookmarks
* Highlights
* Reading history
* Streak information
* Reading preferences
* Last-studied information

The current application does not provide a Qurus-operated cloud account or server-side database for this personal study information.

Security reports involving unauthorized access to this locally stored information are particularly important and should be reported privately.

## Third-Party Services

Qurus relies on certain third-party services and infrastructure for functionality such as remote audio resources, artwork, application updates, and distribution.

A vulnerability entirely within a third-party service should generally be reported to the relevant provider.

If the vulnerability results from the way Qurus integrates with that service, please report it to us as well.

## Dependency Vulnerabilities

Qurus uses open-source frameworks, libraries, and packages.

If you identify a vulnerability in a dependency that directly affects Qurus, please report it to us when the issue has a meaningful security impact on the Qurus application.

Where appropriate, we may update the affected dependency or implement another mitigation.

## Security Updates

Security-related fixes may be included in normal Qurus releases.

Where appropriate, security issues may be documented in release notes or GitHub security advisories after remediation.

We may withhold technical details until a vulnerability has been sufficiently mitigated to reduce the risk of exploitation.

## Recognition

We appreciate responsible security research.

With the researcher's permission, we may acknowledge valid security contributors in project release notes or other appropriate project documentation.

Recognition is discretionary and does not constitute compensation, employment, or a guarantee of public attribution.

## Scope

This policy applies to the Qurus application and Qurus-controlled project resources.

It does not authorize testing against:

* GitHub's infrastructure
* Expo's infrastructure
* EveryAyah's infrastructure
* Third-party audio or content providers
* Other external services

Those systems are subject to their respective security policies and terms.

## Legal Safe Harbor

We will not pursue legal action against security researchers for security research conducted in good faith and in accordance with this policy, to the extent permitted by applicable law.

This safe harbor does not authorize activity that violates applicable law, compromises third-party systems, accesses data belonging to others, or intentionally causes harm or disruption.

## Contact

**Qurus Security**
**Email:** hamdankhubaib959@gmail.com

**Project:** Qurus
**Repository:** https://github.com/GitCoder052023/Qurus

Thank you for helping keep Qurus and its users safe.
