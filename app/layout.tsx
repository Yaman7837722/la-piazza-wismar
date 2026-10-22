import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Mrs_Saint_Delafield } from "next/font/google";
import { getIndexableOrigin, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";
import { introSessionBootstrap } from "@/lib/introSession";
import "@/styles/globals.css";
import "@/styles/legal.css";

const editorial = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-editorial", weight: ["400", "500", "600"] });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const handwritten = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--font-handwritten" });

const origin = getIndexableOrigin();
const heroImage = origin ? `${origin}/images/hero/la-piazza-wismar-hero-pizza.webp` : null;

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  ...(origin ? { metadataBase: new URL(origin), alternates: { canonical: `${origin}/` } } : {}),
  robots: origin ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "La Piazza",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    ...(origin ? { url: `${origin}/` } : {}),
    ...(heroImage ? { images: [{ url: heroImage, width: 2560, height: 1441, alt: "La Piazza in Wismar mit Pizza am Marktplatz" }] } : {}),
  },
  twitter: {
    card: heroImage ? "summary_large_image" : "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    ...(heroImage ? { images: [heroImage] } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de" suppressHydrationWarning><body className={`${editorial.variable} ${sans.variable} ${handwritten.variable}`}>
    <script dangerouslySetInnerHTML={{ __html: introSessionBootstrap }} />
    {children}
  </body></html>;
}
