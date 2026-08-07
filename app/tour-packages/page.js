import React from "react";
import TourPackages from "@/components/TourPackages";
import Header from "@/components/Header";

export const metadata = {
  title: "Tour Packages | MK Travels Coimbatore",
  description:
    "Browse MK Travels' expertly curated South India tour packages — 1 to 9-day itineraries to Ooty, Kodaikanal, Munnar, Coorg, Rameshwaram, and pilgrimage circuits. Competitive pricing, spotless AC fleets, and guaranteed safety from departure to return.",
  alternates: {
    canonical: "/tour-packages",
  },
  openGraph: {
    title: "Tour Packages | MK Travels Coimbatore",
    description:
      "Expertly curated South India tour packages with competitive pricing, AC fleets, and hassle-free bookings from Coimbatore.",
    type: "website",
    url: "/tour-packages",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MK Travels Tour Packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Packages | MK Travels Coimbatore",
    description:
      "Expertly curated South India tour packages with competitive pricing, AC fleets, and hassle-free bookings from Coimbatore.",
    images: ["/og-image.png"],
  },
};

const TourPackage = () => {
  return (
    <section className="w-full bg-white capitalize text-slate-900 pb-20">
      <Header
        prefix="Tour"
        suffix="Packages"
        description="Enjoy smooth, quick, and hassle-free bookings. Browse our expertly curated itineraries below, all backed by competitive pricing, spotless AC fleets, and guaranteed safety from departure to return."
      />
      <TourPackages />
    </section>
  );
};

export default TourPackage;