import AirportTransfers from '@/components/Fleets';
import Header from '@/components/Header';
import React from 'react';

export const metadata = {
  title: "Local Taxi Service & AC Fleet | MK Travels Coimbatore",
  description:
    "Book MK Travels' modern AC fleet for local and outstation travel — clean, well-maintained Sedans, MUVs, SUVs, and Tempo Travellers with experienced drivers for safe, comfortable trips across Tamil Nadu.",
  alternates: {
    canonical: "/local-taxi-service",
  },
  openGraph: {
    title: "Local Taxi Service & AC Fleet | MK Travels Coimbatore",
    description:
      "Modern AC Sedans, MUVs, SUVs, and Tempo Travellers for safe local and outstation travel across Tamil Nadu.",
    type: "website",
    url: "/local-taxi-service",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MK Travels Fleet - Sedans, SUVs & Tempo Travellers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Taxi Service & AC Fleet | MK Travels Coimbatore",
    description:
      "Modern AC Sedans, MUVs, SUVs, and Tempo Travellers for safe local and outstation travel across Tamil Nadu.",
    images: ["/og-image.png"],
  },
};

export default async function Page({ params }) {
  const resolvedParams = await params;
  const serviceType = resolvedParams?.serviceType;

  return (
    <div className='pt-20'>
        <Header prefix="Modern" suffix="AC Fleet" description="Choose from clean, well-maintained Sedans, MUVs, SUVs, and Tempo Travellers for safe outstation travel across Tamil Nadu."/>
        <AirportTransfers serviceType={serviceType} />
    </div>
  );
}