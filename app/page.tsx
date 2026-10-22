import { ResponsiveLanding } from "@/components/ResponsiveLanding";
import { MenuSection } from "@/components/menu/MenuSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { getIndexableOrigin, SITE_DESCRIPTION } from "@/lib/site";
import "@/styles/story.css";
import "@/styles/transition.css";
import "@/styles/menu.css";
import "@/styles/contact.css";

export default function Home() {
  const origin = getIndexableOrigin();
  const restaurant = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    ...(origin ? { "@id": `${origin}/#restaurant`, url: `${origin}/`, menu: `${origin}/#speisekarte` } : {}),
    name: "La Piazza Ristorante Wismar",
    description: SITE_DESCRIPTION,
    telephone: "+49 157 37497525",
    email: "info@lapiazzawismar.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Am Markt 7",
      postalCode: "23966",
      addressLocality: "Wismar",
      addressCountry: "DE",
    },
    servesCuisine: "Italian",
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:30", closes: "21:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "10:30", closes: "22:30" },
    ],
    sameAs: ["https://www.instagram.com/lapiazza_wismar/"],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurant).replace(/</g, "\\u003c") }} />
    <main>
      <ResponsiveLanding />
      <MenuSection />
      <ContactSection />
    </main>
  </>;
}
