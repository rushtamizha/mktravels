import React from "react";
import TourPackages from "@/components/TourPackages";
import Header from "@/components/Header";

const TourPackage = () => {
  return (
    <section className="w-full bg-white capitalize text-slate-900 pb-20">
      <Header prefix="Tour" suffix="Packages" description="Browse through our curated collection of same-day escapes, multi-day hill station getaways, and sacred temple pilgrimages across South India with fixed per-vehicle rates."/>
      <TourPackages/>
    </section>
  );
};

export default TourPackage;
