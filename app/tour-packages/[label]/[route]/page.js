"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { navItems } from "@/lib/data";
import {
  CheckCircle2,
  Car,
  MapPin,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  Users,
  Briefcase,
  Fuel,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Home as HomeIcon,
  Info,
  BadgeCheck,
  Clock,
} from "lucide-react";
import Header from "@/components/Header";

/* ---------------------------------------------------
   Helpers
--------------------------------------------------- */
const getVehicleImage = (vehicle = {}) => {
  if (vehicle.carImages) return vehicle.carImages;
  console.log(vehicle)
  const name = (vehicle.name || "").toLowerCase();
  if (name.includes("dzire") || name.includes("etios") || name.includes("ciaz") || name.includes("verito") || name.includes("zest"))
    return "/images/vehicles/sedan.webp";
  if (name.includes("ertiga")) return "/images/vehicles/ertiga.webp";
  if (name.includes("crysta") || name.includes("hycross")) return "/images/vehicles/crysta.webp";
  if (name.includes("innova") || name.includes("xylo") || name.includes("tavera"))
    return "/images/vehicles/innova.webp";
  if (name.includes("tempo") || name.includes("traveller") || name.includes("coach") || name.includes("van"))
    return "/images/vehicles/tempo-traveller.webp";
  return "/images/vehicles/sedan.webp";
};

const getVehicleCapacity = (type = "", name = "") => {
  const t = type.toLowerCase();
  const n = name.toLowerCase();
  if (t.includes("20-seater")) return "19+1 Seats";
  if (t.includes("14-seater") || n.includes("tempo")) return "13+1 Seats";
  if (t.includes("suv") || t.includes("muv") || n.includes("ertiga") || n.includes("innova") || n.includes("xylo") || n.includes("tavera"))
    return "6+1 Seats";
  return "4+1 Seats";
};

const DISTANCE_LABELS = {
  oneDay: "1-Day Route",
  twoDay: "2-Day Route",
  threeDay: "3-Day Route",
};
const formatDistanceKey = (key) =>
  DISTANCE_LABELS[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

const formatDuration = (categoryLabel = "") =>
  categoryLabel.replace(/Tour Package/i, "").trim();

/* ---------------------------------------------------
   Vehicle Card
--------------------------------------------------- */
function VehicleCard({ vehicle, isBestValue, packageLabel, index }) {
  const capacity = getVehicleCapacity(vehicle.type, vehicle.name);
  const vehicleImg = getVehicleImage(vehicle);
  const whatsappMsg = `Hi, I want to book the ${vehicle.name} (${vehicle.packageAmount}) for the "${packageLabel}" tour. Please confirm availability.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative flex flex-col items-center gap-5 rounded-[2rem]  bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5  hover:shadow-sm sm:flex-row sm:p-6"
    >
      {isBestValue && (
        <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 rounded-full bg-orange-600 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md shadow-orange-900/20">
          <BadgeCheck size={11} /> Best Value
        </span>
      )}

      {/* Vehicle image */}
      <div className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50 to-slate-100/70 p-3 sm:h-32 sm:w-52">
        <Image
          src={vehicleImg}
          alt={vehicle.name}
          fill
          className="object-cover  transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 208px"
        />
        <span className="absolute left-2.5 top-2.5 rounded-full border border-slate-200/70 bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-600 backdrop-blur">
          {vehicle.type}
        </span>
      </div>

      {/* Details */}
      <div className="w-full flex-1 space-y-3">
        <div>
          <h4 className="text-lg font-extrabold text-slate-900 transition-colors group-hover:text-blue-800">
            {vehicle.name}
          </h4>
          <p className="mt-0.5 text-[12px] font-semibold text-slate-500">
            Air-Conditioned · Sanitised Interior
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-800">
            <Users size={12} /> {capacity}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
            <Briefcase size={12} /> Luggage Space
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
            <Fuel size={12} /> Fuel Included
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div>
            <span className="block text-[10px] font-bold uppercase  text-slate-400">
              All-Inclusive Fare
            </span>
            <span className="text-2xl font-semibold tracking-tight text-orange-600">
              {vehicle.packageAmount}
            </span>
          </div>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-blue-800 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-900/10 transition-all duration-300 hover:bg-orange-600 hover:shadow-orange-900/20 active:scale-95 sm:text-sm"
          >
            Book Vehicle <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------
   Page
--------------------------------------------------- */
export default function TourPackageDetailPage() {
  const params = useParams();
  const categorySlug = params?.label;
  const routeSlug = params?.route;

  const tourPackagesNav = navItems?.find(
    (item) => item.label?.toLowerCase() === "tour packages"
  );

  const targetHref = `/tour-packages/${categorySlug}/${routeSlug}`;

  let selectedPackage = null;
  let selectedCategory = null;

  if (tourPackagesNav?.dropdown) {
    for (const cat of tourPackagesNav.dropdown) {
      const found = cat.subDropdown?.find(
        (sub) => sub.href?.toLowerCase() === targetHref.toLowerCase()
      );
      if (found) {
        selectedPackage = found;
        selectedCategory = cat;
        break;
      }
    }
  }

  if (!selectedPackage && tourPackagesNav?.dropdown) {
    for (const cat of tourPackagesNav.dropdown) {
      const found = cat.subDropdown?.find((sub) => {
        const slug = sub.label?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return slug === routeSlug;
      });
      if (found) {
        selectedPackage = found;
        selectedCategory = cat;
        break;
      }
    }
  }

  /* ---------- Not found state ---------- */
  if (!selectedPackage) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 pt-24 text-center text-slate-900">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-600">
          <Info className="h-8 w-8" />
        </div>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Package Not Found</h1>
        <p className="mb-7 max-w-md text-slate-500">
          The requested tour route could not be located in our catalog. It may
          have moved or been renamed.
        </p>
        <Link
          href="/tour-packages"
          className="inline-flex items-center gap-2 rounded-full bg-blue-800 px-6 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-orange-600"
        >
          <ArrowLeft size={15} /> Browse All Tour Packages
        </Link>
      </section>
    );
  }

  const vehicles = selectedPackage.vehicles || [];
  const minPrice = vehicles.length ? Math.min(...vehicles.map((v) => v.price)) : null;
  const duration = formatDuration(selectedCategory?.label || "");
  const distanceEntries = Object.entries(selectedPackage.marketDistance || {});
  const relatedPackages = (selectedCategory?.subDropdown || [])
    .filter((p) => p.href !== selectedPackage.href)
    .slice(0, 6);
  const categoryViewAllHref = selectedCategory
    ? `/tour-packages${selectedCategory.href}`
    : "/tour-packages";

  return (
    <main className="w-full bg-white pb-28 text-slate-900">
        <Header/>
      <div className="mx-auto py-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem]   bg-white   "
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-blue-800">
                  <Sparkles size={13} /> {selectedCategory?.label}
                </span>
                <span className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[11px] font-bold text-orange-700">
                  Instant Confirmation
                </span>
              </div>

              <h2 className="mb-3 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Tour Overview & Itinerary Highlights
              </h2>
              <p className="leading-relaxed text-slate-600">{selectedPackage.description}</p>

       
            </motion.div>

            {/* Fleet & Fares */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                    <Car className="h-6 w-6 text-blue-800" />
                    Available Fleet & Fixed Fares
                  </h3>
                  <p className="mt-1 text-[12.5px] text-slate-500">
                    Pick a vehicle — every fare includes fuel, tolls & driver allowance.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {vehicles.map((vehicle, idx) => (
                  <VehicleCard
                    key={`${vehicle.name}-${idx}`}
                    vehicle={vehicle}
                    isBestValue={vehicle.price === minPrice}
                    packageLabel={selectedPackage.label}
                    index={idx}
                  />
                ))}
              </div>
            </div>

            {/* Inclusions */}
            {selectedPackage.inclusions?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="rounded-[2rem]  bg-white  "
              >
                <h3 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-slate-900 sm:text-xl">
                  <ShieldCheck className="h-6 w-6 text-blue-800" />
                  Package Inclusions
                </h3>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {selectedPackage.inclusions.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 rounded-2xl border border-blue-100/60 bg-blue-50/50 p-3 font-semibold text-slate-700"
                    >
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-800" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* ---------- Sticky sidebar ---------- */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              <div className="space-y-6 rounded-[2rem]  bg-white  ">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-blue-800">
                    24/7 Desk
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
                    Need Assistance?
                  </h3>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">
                    Have custom itinerary needs or multi-city pickup points?
                    Speak directly with our dispatch team.
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Hi, I am interested in booking the "${selectedPackage.label}" tour package.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2.5 rounded-full bg-emerald-500 px-6 py-4 text-center text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-transform active:scale-[0.98] hover:bg-emerald-600"
                  >
                    <MessageCircle size={16} /> Book via WhatsApp
                  </a>
                  <a
                    href="tel:+919000000000"
                    className="flex w-full items-center justify-center gap-2.5 rounded-full bg-blue-800 px-6 py-4 text-center text-sm font-bold text-white transition-colors active:scale-[0.98] hover:bg-orange-600"
                  >
                    <PhoneCall size={16} /> Call Customer Support
                  </a>
                </div>

                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-800">
                      <MapPin size={13} />
                    </span>
                    Doorstep pickup & drop across Tamil Nadu
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                      <CheckCircle2 size={13} />
                    </span>
                    Transparent fixed pricing · zero surprise fees
                  </div>
                </div>
              </div>

              <Link
                href="/tour-packages"
                className="flex w-full items-center justify-center gap-2 rounded-[2rem] border border-slate-200 bg-white px-6 py-4 text-[13px] font-semibold text-slate-600 transition-colors hover:border-blue-800 hover:text-blue-800"
              >
                <ArrowLeft size={14} /> Browse All Tour Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}