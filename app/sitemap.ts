import type { MetadataRoute } from "next";
import { getIndexableOrigin } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getIndexableOrigin();
  return origin ? [
    { url: `${origin}/` },
    { url: `${origin}/impressum` },
    { url: `${origin}/datenschutz` },
  ] : [];
}
