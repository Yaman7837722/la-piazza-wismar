import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Mrs_Saint_Delafield } from "next/font/google";
import "@/styles/globals.css";

const editorial = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-editorial", weight: ["400", "500", "600"] });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const handwritten = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--font-handwritten" });

export const metadata: Metadata = {
  title: "La Piazza | Ristorante · Pizzeria am Markt in Wismar",
  description: "Italienische Küche im Herzen von Wismar. La Piazza am Markt 7.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body className={`${editorial.variable} ${sans.variable} ${handwritten.variable}`}>{children}</body></html>;
}
