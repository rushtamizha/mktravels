import Header from "@/components/Header";
import TourPackages from "@/components/TourPackages";
import { navItems } from "@/lib/data";
import React from "react";

export const metadata = {
  title: "Temple Packages | MK Travels Coimbatore",
  description:
    "Book divine temple tour packages with MK Travels — Rameshwaram, Madurai Meenakshi Amman, Kanyakumari, Tirupati, and the Aarupadai Veedu circuits. Peaceful pilgrimages with punctual, respectful drivers and stress-free itineraries.",
  alternates: {
    canonical: "/temple-packages",
  },
  openGraph: {
    title: "Temple Packages | MK Travels Coimbatore",
    description:
      "Divine spiritual journeys to Rameshwaram, Madurai Meenakshi Amman, Kanyakumari, Tirupati, and Aarupadai Veedu circuits with punctual, respectful drivers.",
    type: "website",
    url: "/temple-packages",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MK Travels Temple Packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Temple Packages | MK Travels Coimbatore",
    description:
      "Divine spiritual journeys to Rameshwaram, Madurai Meenakshi Amman, Kanyakumari, Tirupati, and Aarupadai Veedu circuits.",
    images: ["/og-image.png"],
  },
};

const Page = () => {
  const tourPackagesNav = navItems?.find(
    (item) => item.label?.toLowerCase() === "temple packages"
  );

  return (
    <section className="w-full bg-white capitalize text-slate-900">
      <Header
        prefix="Temple"
        suffix="Packages"
        description="Embark on divine spiritual journeys to Rameshwaram, Madurai Meenakshi Amman, Kanyakumari, Tirupati, and the Aarupadai Veedu circuits. Experience peaceful temple visits with punctual, respectful drivers and well-planned, stress-free itineraries."
      />
      <TourPackages tourpackages={tourPackagesNav?.dropdown} />
    </section>
  );
};

export default Page;