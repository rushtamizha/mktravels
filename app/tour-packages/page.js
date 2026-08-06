import React from "react";
import TourPackages from "@/components/TourPackages";
import Header from "@/components/Header";

const TourPackage = () => {
  return (
    <section className="w-full bg-white capitalize text-slate-900 pb-20">
      <Header prefix="Tour" suffix="Packages" description="Enjoy smooth, quick, and hassle-free bookings. Browse our expertly curated itineraries below, all backed by competitive pricing, spotless AC fleets, and guaranteed safety from departure to return."/>
      <TourPackages/>
    </section>
  );
};

export default TourPackage;
