import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import TravelGallery from "@/components/TravelGallery";
import ContactButton from "@/components/Whatsapp";

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const SITE_URL = "https://www.mktravelscoimbatore.com"; // TODO: replace with your live domain
const SITE_NAME = "MK Travels";
const TITLE =
  "MK Travels Coimbatore | Cab Booking, Tour Packages & Airport Taxi Tamil Nadu";
const DESCRIPTION =
  "MK Travels is Coimbatore's trusted travel partner offering local hourly cabs, outstation trips, airport transfers, corporate bookings, and 1 to 9-day South India tour packages to Ooty, Kodaikanal, Munnar, Coorg, Rameshwaram, Navagraha and pilgrimage temple circuits. Active hubs in Pollachi, Coimbatore & Cochin. Transparent per-km pricing, verified drivers, zero hidden tolls.";

const KEYWORDS = [
  "MK Travels Coimbatore",
  "Coimbatore taxi service",
  "Coimbatore to Ooty cab",
  "Coimbatore to Kodaikanal package",
  "Coimbatore to Munnar tour package",
  "South India tour packages",
  "outstation cab Coimbatore",
  "airport taxi Coimbatore",
  "corporate cab booking Coimbatore",
  "Navagraha temple tour package",
  "pilgrimage tour package Tamil Nadu",
  "Pollachi cab service",
  "Cochin cab booking",
  "Innova Crysta rental Coimbatore",
  "one day tour package Coimbatore",
  "Coimbatore to Rameshwaram taxi",
];

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Travel",

  // Canonical + hreflang
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "ta-IN": "/ta",
    },
  },

  // Robots / crawling
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons / manifest
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MK Travels - Premium Cabs & South India Tour Packages",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
    site: "@mktravels",
    creator: "@mktravels",
  },



  // Mobile / theming
  themeColor: "#0f4c3a",
  colorScheme: "light",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f4c3a",
};

// JSON-LD structured data: TravelAgency / LocalBusiness + FAQPage
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#organization`,
  name: "MK Travels",
  alternateName: "MKTRAVELS",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.png`,
  description: DESCRIPTION,
  telephone: "+91-87541-42281",
  email: "mktravelscbe@gmail.com",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "22 PRG Street, Brindhavan Nagar, Civil Aerodrome Post",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    postalCode: "641014",
    addressCountry: "IN",
  },
  areaServed: [
    "Coimbatore",
    "Pollachi",
    "Cochin",
    "Valparai",
    "Tirupur",
    "Madurai",
    "Ooty",
    "Kodaikanal",
    "Munnar",
    "Coorg",
    "Rameshwaram",
  ],
  sameAs: [
    "https://www.facebook.com/share/1GFfPKMiCT/",
    "https://www.instagram.com/mktravels38?igsh=cmQ1NTZ3dXdhN3J3",
    "https://share.google/m2UTFNBeuYWNU4ydn",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1200",
  },
  makesOffer: [
    {
      "@type": "Offer",
      name: "One Day Tour Package",
      price: "3200",
      priceCurrency: "INR",
    },
    {
      "@type": "Offer",
      name: "Two Day Tour Package",
      price: "8200",
      priceCurrency: "INR",
    },
    {
      "@type": "Offer",
      name: "Three Day Tour Package",
      price: "10100",
      priceCurrency: "INR",
    },
    {
      "@type": "Offer",
      name: "Navagraha Temple Tour Package",
      price: "14000",
      priceCurrency: "INR",
    },
    {
      "@type": "Offer",
      name: "Pilgrimage Tour Package",
      price: "8750",
      priceCurrency: "INR",
    },
  ],
};

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
        text: "You can book instantly through our website, call us, or reach out via WhatsApp.",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Testimonials />
        <TravelGallery />
        <Footer />
        <ContactButton />
      </body>
    </html>
  );
}
