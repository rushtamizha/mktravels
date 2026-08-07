"use client";
import Header from "@/components/Header";
import TourPackages from "@/components/TourPackages";
import { navItems } from "@/lib/data";

export default function DynamicTourPackageClient({ label }) {
  const rawLabel = label ? String(label) : "";
  const targetSlug = rawLabel.replace(/-/g, " ").toLowerCase();

  const tourPackagesNav = navItems?.find(
    (item) => item.label?.toLowerCase() === "tour packages"
  );

  const matchedCategory = tourPackagesNav?.dropdown?.find((category) => {
    const catLabel = category.label?.toLowerCase() || "";
    return (
      catLabel === targetSlug ||
      catLabel.replace(/s$/, "") === targetSlug.replace(/s$/, "")
    );
  });

  if (!matchedCategory) {
    return (
      <section className="w-full bg-white text-slate-900 pb-20 px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Package not found</h1>
        <p className="mt-2 text-slate-500">
          This tour package category doesn't exist.
        </p>
      </section>
    );
  }

  const pageTitlePrefix = matchedCategory.label.split(" ").slice(0, 2).join(" ");
  const suffixTitlePrefix = matchedCategory.label.split(" ").slice(2).join(" ");

  return (
    <section className="w-full bg-white capitalize text-slate-900 pb-20">
      <Header
        prefix={pageTitlePrefix}
        suffix={suffixTitlePrefix}
        description={matchedCategory.description}
      />
      <TourPackages tourpackages={matchedCategory?.subDropdown || []} />
    </section>
  );
}