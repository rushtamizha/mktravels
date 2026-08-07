import { navItems } from "@/lib/data";
import DynamicTourPackageClient from "@/components/DynamicTourPackageClient";

function findMatchedCategory(rawLabel) {
  const tourPackagesNav = navItems?.find(
    (item) => item.label?.toLowerCase() === "tour packages"
  );
  const targetSlug = String(rawLabel || "").replace(/-/g, " ").toLowerCase();

  return tourPackagesNav?.dropdown?.find((category) => {
    const catLabel = category.label?.toLowerCase() || "";
    return (
      catLabel === targetSlug ||
      catLabel.replace(/s$/, "") === targetSlug.replace(/s$/, "")
    );
  });
}

export async function generateMetadata({ params }) {
  const { label } = await params;
  const matchedCategory = findMatchedCategory(label);

  if (!matchedCategory) {
    return {
      title: "Tour Package Not Found | MK Travels",
      description: "The tour package you're looking for could not be found.",
    };
  }

  const title = `${matchedCategory.label} | MK Travels Coimbatore`;
  const description =
    matchedCategory.description ||
    `Explore ${matchedCategory.label} with MK Travels — private cabs, experienced drivers, and customizable itineraries from Coimbatore.`;

  return {
    title,
    description,
    alternates: { canonical: `/tour-packages/${label}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/tour-packages/${label}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: matchedCategory.label }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  };
}

export async function generateStaticParams() {
  const tourPackagesNav = navItems?.find(
    (item) => item.label?.toLowerCase() === "tour packages"
  );
  return (
    tourPackagesNav?.dropdown?.map((category) => ({
      label: category.label.toLowerCase().replace(/\s+/g, "-"),
    })) || []
  );
}

export default async function Page({ params }) {
  const { label } = await params;
  return <DynamicTourPackageClient label={label} />;
}