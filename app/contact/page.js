import ContactPageSection from "@/components/ContactPageSection";

// This page used to be a Client Component, which cannot export `metadata` —
// /contact was inheriting the site-wide title and description. The
// interactive form now lives in its own client component so the route can
// be a Server Component and ship proper per-page SEO.
export const metadata = {
  title: "Contact MK Travels Coimbatore | Book a Cab or Tour Package",
  description:
    "Contact MK Travels in Coimbatore for cab bookings, airport transfers and South India tour packages. Call +91 87541 42281, WhatsApp us, or send a trip enquiry — available 24/7.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact MK Travels Coimbatore",
    description:
      "Reach MK Travels for cab bookings, airport transfers and South India tour packages. Available 24 hours, 7 days a week.",
    url: "/contact",
    type: "website",
  },
};

const contactPointSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact MK Travels",
  url: "https://www.mktravelscoimbatore.com/contact",
  mainEntity: {
    "@type": "TravelAgency",
    "@id": "https://www.mktravelscoimbatore.com/#organization",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-87541-42281",
        contactType: "reservations",
        areaServed: "IN",
        availableLanguage: ["en", "ta"],
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <ContactPageSection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointSchema) }}
      />
    </>
  );
}
