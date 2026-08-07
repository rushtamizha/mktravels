import AboutClient from "@/components/AboutClient";

export const metadata = {
  title: "About Us | MK Travels Coimbatore",
  description:
    "MK Travels has been striving for excellence since 2017, offering reliable, safe, and customizable South India tour packages, personalized itineraries, verified route-expert drivers, and 24/7 dedicated support.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | MK Travels Coimbatore",
    description:
      "Trusted South India travel agency since 2017 — personalized itineraries, safe journeys with verified drivers, and 24/7 support.",
    type: "website",
    url: "/about",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MK Travels - About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | MK Travels Coimbatore",
    description:
      "Trusted South India travel agency since 2017 — personalized itineraries, safe journeys with verified drivers, and 24/7 support.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <AboutClient />;
}