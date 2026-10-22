const INTRO_SESSION_KEY = "la-piazza-intro-complete";
const INTRO_COMPLETE_ATTRIBUTE = "data-intro-complete";

export const introSessionBootstrap = `try { if (sessionStorage.getItem("${INTRO_SESSION_KEY}") === "true") document.documentElement.setAttribute("${INTRO_COMPLETE_ATTRIBUTE}", "true"); } catch {}`;

export function hasCompletedIntro() {
  const root = document.documentElement;
  if (root.getAttribute(INTRO_COMPLETE_ATTRIBUTE) === "true") return true;

  try {
    if (sessionStorage.getItem(INTRO_SESSION_KEY) === "true") {
      root.setAttribute(INTRO_COMPLETE_ATTRIBUTE, "true");
      return true;
    }
  } catch {
    // Storage can be unavailable in restricted browsing modes.
  }

  return false;
}

export function markIntroCompleted() {
  try {
    sessionStorage.setItem(INTRO_SESSION_KEY, "true");
  } catch {
    // Keep the completed state for this document even when storage is blocked.
  }
  document.documentElement.setAttribute(INTRO_COMPLETE_ATTRIBUTE, "true");
}
