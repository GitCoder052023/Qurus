import { track } from "@vercel/analytics";

export type DownloadLocation =
  | "hero_direct"
  | "download_section_direct"
  | "navbar_desktop"
  | "navbar_mobile"
  | "footer_brand_direct"
  | "footer_nav"
  | "player_invitation"
  | (string & {});

export type GitHubLocation =
  | "navbar"
  | "download_section_release"
  | "philosophy_story"
  | "footer_brand_star"
  | "footer_nav_repo"
  | "footer_nav_releases"
  | "footer_nav_issues"
  | "footer_nav_license"
  | "legal_contact_card"
  | (string & {});

/**
 * Track an APK download button click with Vercel Web Analytics.
 */
export function trackDownload(
  location: DownloadLocation,
  details?: Record<string, string | number | boolean | null>
) {
  try {
    track("download_apk", {
      location,
      version: "2.3.0",
      ...details,
    });
  } catch (err) {
    // Fail-safe to avoid disrupting navigation if analytics fails
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to track download event", err);
    }
  }
}

/**
 * Track a GitHub link/button click with Vercel Web Analytics.
 */
export function trackGitHub(
  location: GitHubLocation,
  details?: Record<string, string | number | boolean | null>
) {
  try {
    track("github_click", {
      location,
      ...details,
    });
  } catch (err) {
    // Fail-safe to avoid disrupting navigation if analytics fails
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to track github click event", err);
    }
  }
}
