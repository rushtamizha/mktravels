import Header from "@/components/Header";

// TravelGallery is already rendered site-wide by the root layout, so this
// page used to show the identical gallery twice. It now contributes the
// page heading and SEO copy, and the layout supplies the gallery below it.
export const metadata = {
  title: "Travel Places in South India | MK Travels Coimbatore",
  description:
    "Explore the South India destinations MK Travels covers — Ooty, Kodaikanal, Munnar, Valparai, Coorg, Yercaud, Rameshwaram and more, with private cabs and custom itineraries from Coimbatore.",
  alternates: { canonical: "/travel-places" },
  openGraph: {
    title: "Travel Places in South India | MK Travels",
    description:
      "Ooty, Kodaikanal, Munnar, Valparai, Coorg, Yercaud and more — destinations covered by MK Travels' private cabs and tour packages.",
    url: "/travel-places",
    type: "website",
  },
};

export default function Page() {
  return (
    <Header
      prefix="Travel"
      suffix="Places"
      description="Hill stations, backwaters and temple towns across South India — every destination we cover from Coimbatore, with private cabs and fully customisable itineraries."
    />
  );
}
