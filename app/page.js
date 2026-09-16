import { HeroSection } from "@/components/Hero";
import TourPackages from "@/components/TourPackages";
import AirportTransfers from "@/components/Fleets";
import TravelSolutions from "@/components/TravelSolutions";
import FAQSection from "@/components/FAQSection";
import TravelPartnerHero from "@/components/TravelPartnerHero";

export const metadata = {
  alternates: { canonical: "/" },
};

// Lives on the home page because this is the only route that renders the
// FAQ accordion — Google flags FAQPage markup on pages without the answers.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of vehicles do you provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a wide range of well-maintained vehicles including 4-seater sedans (Swift Dzire, Toyota Etios), luxury sedans (Suzuki Ciaz), 7-seater SUVs (Innova, Innova Crysta, Hycross, Xylo), and 14 to 25-seater tempo travellers/coaches for large groups.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide tour guides for South India trips?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contact our team for tour guide options across South India destinations.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book a vehicle for local pickup and drop in Coimbatore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, MK Travels offers local hourly duty packages (8 & 10 hrs) for pickup and drop within Coimbatore.",
      },
    },
    {
      "@type": "Question",
      name: "How can I book a vehicle or tour package?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book instantly through the booking form on our website, call us, or reach out via WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Do you require advance booking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Advance booking is recommended, especially for multi-day tour packages, though last-minute bookings are accommodated when possible.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <TravelSolutions />
      <TourPackages />
      <TravelPartnerHero />
      <AirportTransfers />
      <FAQSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
