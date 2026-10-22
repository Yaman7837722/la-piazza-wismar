export const SITE_TITLE = "La Piazza Wismar | Italienisches Restaurant & Pizzeria";
export const SITE_DESCRIPTION = "Italienische Küche im Herzen von Wismar: Entdecken Sie La Piazza Ristorante & Pizzeria direkt am historischen Marktplatz, Am Markt 7.";

/** Set SITE_URL at build time to the verified, preferred HTTPS production origin. */
export function getSiteOrigin(): string | null {
  const value = process.env.SITE_URL;
  if (!value) return null;

  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.username || url.password ||
      url.pathname !== "/" || url.search || url.hash ||
      url.hostname === "localhost" || url.hostname.endsWith(".localhost") ||
      url.hostname.endsWith(".vercel.app")
    ) return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function getIndexableOrigin(): string | null {
  if (process.env.NODE_ENV !== "production") return null;
  if (process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development") return null;
  return getSiteOrigin();
}
