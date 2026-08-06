"use client";
import Header from "@/components/Header";
import TourPackages from "@/components/TourPackages";
import { navItems } from "@/lib/data";
import React from "react";

const page = () => {
  const tourPackagesNav = navItems?.find(
    (item) => item.label?.toLowerCase() === "temple packages",
  );
  return (
    <section className="w-full bg-white capitalize text-slate-900 pb-20">
      <Header
        prefix="Temple" suffix="Packages"
        description="Browse through our curated collection of same-day escapes, multi-day hill station getaways, and sacred temple pilgrimages across South India with fixed per-vehicle rates."
      />
      <TourPackages tourpackages={tourPackagesNav.dropdown} />
    </section>
  );
};

export default page;
