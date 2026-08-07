import { navItems } from "@/lib/data";
import TourPackageDetailClient from "@/components/TourPackageDetailClient";

function findPackage(categorySlug, routeSlug) {
  const tourPackagesNav = navItems?.find(
    (item) => item.label?.toLowerCase() === "tour packages"
  );
  const targetHref = `/tour-packages/${categorySlug}/${routeSlug}`;

  if (!tourPackagesNav?.dropdown) return { selectedPackage: null, selectedCategory: null };

  for (const cat of tourPackagesNav.dropdown) {
    const found = cat.subDropdown?.find(
      (sub) => sub.href?.toLowerCase() === targetHref.toLowerCase()
    );
    if (found) return { selectedPackage: found, selectedCategory: cat };
  }

  for (const cat of tourPackagesNav.dropdown) {
    const found = cat.subDropdown?.find((sub) => {
      const slug = sub.label?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return slug === routeSlug;
    });
    if (found) return { selectedPackage: found, selectedCategory: cat };
  }

  return { selectedPackage: null, selectedCategory: null };
}

export async function generateMetadata({ params }) {
  const { label, route } = await params;
  const { selectedPackage, selectedCategory } = findPackage(label, route);

  if (!selectedPackage) {
    return {
      title: "Package Not Found | MK Travels",
      description: "The requested tour route could not be located in our catalog.",
    };
  }

  const vehicles = selectedPackage.vehicles || [];
  const minPrice = vehicles.length ? Math.min(...vehicles.map((v) => v.price)) : null;

  const title = `${selectedPackage.label} | ${selectedCategory?.label || "Tour Package"} | MK Travels`;
  const description =
    selectedPackage.description ||
    `Book ${selectedPackage.label} with MK Travels — fixed fares, AC fleet, and experienced drivers.${
      minPrice ? ` Starts from ₹${minPrice}.` : ""
    }`;

  return {
    title,
    description,
    alternates: { canonical: `/tour-packages/${label}/${route}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/tour-packages/${label}/${route}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: selectedPackage.label,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export async function generateStaticParams() {
  const tourPackagesNav = navItems?.find(
    (item) => item.label?.toLowerCase() === "tour packages"
  );
  const params = [];

  tourPackagesNav?.dropdown?.forEach((cat) => {
    const categorySlug = cat.label.toLowerCase().replace(/\s+/g, "-");
    cat.subDropdown?.forEach((sub) => {
      const routeSlug = sub.label?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      if (routeSlug) params.push({ label: categorySlug, route: routeSlug });
    });
  });

  return params;
}

export default async function Page({ params }) {
  const { label, route } = await params;
  return <TourPackageDetailClient categorySlug={label} routeSlug={route} />;
}