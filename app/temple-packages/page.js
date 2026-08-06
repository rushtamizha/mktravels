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
    <section className="w-full bg-white capitalize text-slate-900 ">
      <Header
        prefix="Temple" suffix="Packages"
        description="Embark on divine spiritual journeys to Rameshwaram, Madurai Meenakshi Amman, Kanyakumari, Tirupati, and the Aarupadai Veedu circuits. Experience peaceful temple visits with punctual, respectful drivers and well-planned, stress-free itineraries."
      />
      <TourPackages tourpackages={tourPackagesNav.dropdown} />
    </section>
  );
};

export default page;
