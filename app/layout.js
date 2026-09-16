import "./globals.css";
import { Manrope } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import TravelGallery from "@/components/TravelGallery";
import ContactButton from "@/components/Whatsapp";

// Self-hosted by next/font: no external stylesheet, no render-blocking RTT,
// and `display: swap` + automatic size-adjust fallback keeps CLS at 0.
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto"],
});

const SITE_URL = "https://www.mktravelscoimbatore.com";
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
  referrer: "origin-when-cross-origin",
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Travel",

  alternates: {
    canonical: "/",
  },

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

  // Paths below are the files that actually exist in /public.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      {
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",

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
        height: 800,
        alt: "MK Travels - Premium Cabs & South India Tour Packages",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
    site: "@mktravels",
    creator: "@mktravels",
  },

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

// themeColor / colorScheme belong here, not in `metadata` — Next 16 warns
// and drops them otherwise.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
  themeColor: "#0f4c3a",
};

// JSON-LD: organization + site. The FAQPage graph lives on the home page
// instead of here — emitting it site-wide made every route claim FAQs it
// does not render, which Google flags as mismatched structured data.
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
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.0301,
    longitude: 77.0434,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={manrope.variable}
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Cloudinary serves the fleet images; warming the connection early
            removes a DNS+TLS round trip from those requests. */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="bg-white text-slate-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:bg-blue-900 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>

        <Navbar />
        <main id="main-content">{children}</main>
        <Testimonials />
        <TravelGallery />
        <Footer />
        <ContactButton />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
