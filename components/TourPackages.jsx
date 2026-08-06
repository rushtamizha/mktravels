"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, MapPin, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/lib/data";

const FALLBACK_IMAGE = "/heroSection/coimbatore-tour-package-1.webp";


const getCheapestFare = (items = []) => {
  let min = Infinity;
  items.forEach((item) => {
    if (typeof item?.price === "number") {
      // shape (2): item IS a vehicle
      if (item.price < min) min = item.price;
      return;
    }
    // shape (1): item is a route wrapping vehicles
    item?.vehicles?.forEach((v) => {
      if (typeof v?.price === "number" && v.price < min) min = v.price;
    });
  });
  return min === Infinity ? null : min;
};

const TourPackages = ({ tourpackages }) => {
  const tourPackagesNav = navItems?.find(
    (item) => item.label?.toLowerCase() === "tour packages",
  );

  // Derive routesCount / startingPrice once per data change, not on every render.
  const categories = useMemo(() => {
    const list = tourpackages || tourPackagesNav?.dropdown || [];
    return list.map((category) => ({
      ...category,
      routesCount: category.subDropdown?.length || 0,
      startingPrice: getCheapestFare(category.subDropdown || category.vehicles),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourpackages, tourPackagesNav]);

  if (!categories.length) return null;

  return (
    <section className=" mx-auto tracking-wide max-w-7xl px-4 xl:px-0 py-10">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex max-w-3xl flex-col items-start space-y-3 text-left"
      >
        <div className="space-y-2">
                    <div className="flex items-center gap-2 font-extrabold text-xs uppercase  px-3.5 border border-blue-800/30 py-1.5 rounded-full w-max bg-blue-50 text-blue-800">
                      <MapPin className="w-3.5 h-3.5" />
                      Premium South India Tour Packages
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight ">
                      Explore the Best South India's <br />
                      <span className="text-orange-600 font-bold">Tour Packages</span>
                    </h2>
                    <p className="text-slate-500 text-sm md:text-base font-semibold max-w-xl">
                      Discover affordable private tour packages across South India with comfortable cabs, experienced drivers, and customizable itineraries. 
                    </p>
                  </div>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, idx) => {
          const href = `${category.href || ""}`;

          return (
            <motion.div
              key={category.href || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.08, 0.4) }}
              className="group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-gray-50 bg-white shadow-2xs transition-all duration-300 hover:shadow-sm"
            >
              <Link href={href} className="block">
                {category.tourThumbnail &&  <div className="relative h-55 w-full overflow-hidden bg-slate-100">
                  <Image
                    fill
                    priority={idx < 3}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src={category.tourThumbnail || FALLBACK_IMAGE }
                    alt={category.label || "Tour Package"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  /> 
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" /> 

                  {category.routesCount > 0 && (
                    <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-orange-500 shadow-xs">
                      <Compass size={12} /> {category.routesCount} Available
                      Routes
                    </span>
                  )}
                </div> }

                <div className="p-6">
                  <h3 className="mb-1 text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-800">
                    {category.label}
                  </h3>
                  <p className=" text-xs font-normal  md:text-base leading-relaxed text-slate-500">
                    {category.description}
                  </p>
                </div>
              </Link>

              <div className="p-6 pt-0">
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase  text-slate-400">
                      Package Starts From
                    </p>
                    <p className="text-lg font-bold text-orange-600">
                      {category.startingPrice
                        ? `Rs. ${category.startingPrice.toLocaleString("en-IN")}`
                        : "Contact Us"}
                    </p>
                  </div>

                  <Link
                    href={href}
                    className="flex items-center gap-1 rounded-full bg-blue-800 px-5 py-2.5 text-xs font-bold uppercase  text-white shadow-md shadow-blue-900/10 transition-colors hover:bg-orange-600 active:scale-95"
                  >
                    Open Package <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TourPackages;