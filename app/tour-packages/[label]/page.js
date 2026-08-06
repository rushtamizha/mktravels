"use client";
import Header from "@/components/Header";
import TourPackages from "@/components/TourPackages";
import { navItems } from "@/lib/data";
import { useParams } from "next/navigation";
import React from "react";

export default function DynamicTourPackagePage() {
  const params = useParams();
  const rawLabel = params?.label ? String(params.label) : "";

  // 1. Find top-level "Tour Packages" navigation
  const tourPackagesNav = navItems?.find(
    (item) => item.label?.toLowerCase() === "tour packages"
  );

  // 2. Normalize slug (e.g. "one-day-tour-packages" -> "one day tour package")
  const targetSlug = rawLabel.replace(/-/g, " ").toLowerCase();

  // 3. Find matching category inside dropdown array
  const matchedCategory = tourPackagesNav?.dropdown?.find((category) => {
    const catLabel = category.label?.toLowerCase() || "";
    // Handle both exact label match and plural/singular trailing "s"
    return (
      catLabel === targetSlug ||
      catLabel.replace(/s$/, "") === targetSlug.replace(/s$/, "")
    );
  });

  const pageTitlePrefix = matchedCategory?.label.split(" ").slice(0,2).join(' ');
  const suffixTitlePrefix = matchedCategory?.label.split(" ").slice(2).join(' ');



  return (
    <section className="w-full bg-white capitalize text-slate-900 pb-20">
      <Header
        prefix={pageTitlePrefix}
        suffix={suffixTitlePrefix}
        description={matchedCategory.description}
      />
      {/* Pass matched category's subDropdown routes to TourPackages */}
      <TourPackages tourpackages={matchedCategory?.subDropdown || []} />
    </section>
  );
}