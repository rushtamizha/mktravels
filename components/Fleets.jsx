"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Users,
  Briefcase,
  PlaneTakeoff,
  ShieldCheck,
  Clock,
  Route,
  CalendarDays,
  ChevronDown,
  MessageCircle,
  Car,
} from "lucide-react";

import { fareDetails } from "@/lib/data";

// ---------------------------------------------------------------------------
// Config: Mapping of fare modes + URL parameter key normalizers
// ---------------------------------------------------------------------------
const FARE_MODE_CONFIG = [
  { key: "local", label: "Local", icon: Clock },
  { key: "outstationKmBasis", label: "Outstation · KM", icon: Route },
  { key: "outstationDayBasis", label: "Outstation · Day", icon: CalendarDays },
  { key: "oneWayDroppingFixed", label: "Airport Drop", icon: PlaneTakeoff },
  { key: "airportTransfer", label: " Airport", icon: PlaneTakeoff },
];

// Normalizer to map URL param slugs to exact fare key names
const normalizeFareParam = (param) => {
  if (!param) return null;
  const p = param.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (p.includes("local") || p.includes("localduty")) return "local";
  if (p.includes("outstationkm") || p.includes("kmbasis"))
    return "outstationKmBasis";
  if (p.includes("outstationday") || p.includes("daybasis"))
    return "outstationDayBasis";
  if (
    p.includes("oneway") ||
    p.includes("onewaydropping") ||
    p.includes("fixed")
  )
    return "oneWayDroppingFixed";
  if (p.includes("airport") || p.includes("airporttransfer"))
    return "airportTransfer";

  return null;
};

const formatINR = (value) =>
  `${fareDetails.currency}${Number(value).toLocaleString("en-IN")}`;

const formatRouteLabel = (raw) =>
  raw
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ")
    .replace(/^Tirupur To /, "To ");

function StatChip({ label, value }) {
  return (
    <div className="flex flex-col bg-white/70 rounded-lg px-2.5 py-1.5 border border-slate-100">
      <span className="text-[9px] uppercase tracking-wide text-slate-400 font-semibold">
        {label}
      </span>
      <span className="text-xs font-semibold text-slate-700">{value}</span>
    </div>
  );
}

function RouteSelect({ routes, value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#bc3908]/30"
      >
        {Object.keys(routes).map((r) => (
          <option key={r} value={r}>
            {formatRouteLabel(r)}
          </option>
        ))}
      </select>
      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single Vehicle Card component
// ---------------------------------------------------------------------------
function VehicleFareCard({ vehicle, targetFareMode }) {
  const fares = vehicle.fares || {};

  // 1. Filter available modes on card (Restricted if targetFareMode exists)
  const availableModes = useMemo(() => {
    return FARE_MODE_CONFIG.filter((m) => {
      if (!fares[m.key]) return false;
      if (targetFareMode && m.key !== targetFareMode) return false;
      return true;
    });
  }, [fares, targetFareMode]);

  const [activeMode, setActiveMode] = useState(
    targetFareMode || availableModes[0]?.key,
  );

  const localHrsOptions = fares.local ? Object.keys(fares.local) : [];
  const [activeHrs, setActiveHrs] = useState(
    localHrsOptions.includes("hrs10") ? "hrs10" : localHrsOptions[0],
  );

  const [activeDropRoute, setActiveDropRoute] = useState(
    fares.oneWayDroppingFixed
      ? Object.keys(fares.oneWayDroppingFixed)[0]
      : undefined,
  );
  const [activeTransferRoute, setActiveTransferRoute] = useState(
    fares.airportTransfer ? Object.keys(fares.airportTransfer)[0] : undefined,
  );

  if (!activeMode || !fares[activeMode]) return null;

  // Derive mode details
  let heroPrice = null;
  let heroNote = "";
  let stats = [];
  let routePicker = null;
  let bookingContext = vehicle.name;

  if (activeMode === "local" && fares.local) {
    const pkg = fares.local[activeHrs] || fares.local[localHrsOptions[0]];
    heroPrice = pkg.totalAmount;
    heroNote = activeHrs === "hrs8" ? "8 Hrs package" : "10 Hrs package";
    stats = [
      { label: "Free Km", value: `${pkg.freeKm} km` },
      { label: "Extra Hr", value: formatINR(pkg.extraHour) },
      { label: "Extra Km", value: `${formatINR(pkg.extraKm)}/km` },
    ];
    bookingContext = `${vehicle.name} - Local ${heroNote} (${formatINR(heroPrice)})`;
  }

  if (activeMode === "outstationKmBasis" && fares.outstationKmBasis) {
    const d = fares.outstationKmBasis;
    heroPrice = d.totalMinimumAmount;
    heroNote = `min ${d.minKmPerDay} km/day`;
    stats = [
      { label: "Min Km/Day", value: `${d.minKmPerDay} km` },
      { label: "Fare/Km", value: formatINR(d.farePerKm) },
      { label: "Driver/Day", value: formatINR(d.driverAllowancePerDay) },
    ];
    bookingContext = `${vehicle.name} - Outstation Round Trip (KM basis, ${formatINR(
      heroPrice,
    )})`;
  }

  if (activeMode === "outstationDayBasis" && fares.outstationDayBasis) {
    const d = fares.outstationDayBasis;
    heroPrice = d.totalAmount;
    heroNote = "incl. driver bata";
    stats = [
      { label: "Rent/Day", value: formatINR(d.rentPerDay) },
      { label: "Free Km/Day", value: `${d.freeKmPerDay} km` },
      { label: "Extra Km", value: formatINR(d.extraKmFare) },
    ];
    bookingContext = `${vehicle.name} - Outstation Round Trip (Day basis, ${formatINR(
      heroPrice,
    )})`;
  }

  if (activeMode === "oneWayDroppingFixed" && fares.oneWayDroppingFixed) {
    const routes = fares.oneWayDroppingFixed;
    const key =
      activeDropRoute && routes[activeDropRoute]
        ? activeDropRoute
        : Object.keys(routes)[0];
    heroPrice = routes[key].oneWayFare;
    heroNote = "one-way, fixed fare";
    routePicker = (
      <RouteSelect routes={routes} value={key} onChange={setActiveDropRoute} />
    );
    bookingContext = `${vehicle.name} - One Way Drop, ${formatRouteLabel(
      key,
    )} (${formatINR(heroPrice)})`;
  }

  if (activeMode === "airportTransfer" && fares.airportTransfer) {
    const routes = fares.airportTransfer;
    const key =
      activeTransferRoute && routes[activeTransferRoute]
        ? activeTransferRoute
        : Object.keys(routes)[0];
    heroPrice = routes[key].amount;
    heroNote = `${routes[key].km} km one-way`;
    routePicker = (
      <RouteSelect
        routes={routes}
        value={key}
        onChange={setActiveTransferRoute}
      />
    );
    bookingContext = `${vehicle.name} - Outstation Airport Transfer, ${formatRouteLabel(
      key,
    )} (${formatINR(heroPrice)})`;
  }

  const whatsappHref = `https://wa.me/919489485353?text=${encodeURIComponent(
    `Hi, I want to book the ${bookingContext}`,
  )}`;

  return (
    <div className="h-auto">
      <div className="bg-white rounded-[2rem] border tracking-wide border-slate-100 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col h-full overflow-hidden relative group">
        {/* Vehicle Image */}
        <div className="w-full h-36 bg-slate-50 flex items-center justify-center relative overflow-hidden border-b border-slate-50">
          <div className="w-full h-full relative transition-transform duration-500 group-hover:scale-105">
            <Image
              src={vehicle.img}
              alt={vehicle.name}
              fill
              className="object-cover w-full"
              loading="lazy"
            />
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-md font-semibold text-slate-800 line-clamp-1">
              {vehicle.name}
            </h3>
            <span className="flex items-center gap-1 bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-md shrink-0">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              {vehicle.seats}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-orange-600 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 fill-current" />
            <span>Verified Active Route Fleet</span>
          </div>

          {/* Render Mode Switcher Tabs ONLY IF no target mode filter is enforced */}
          {!targetFareMode && availableModes.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {availableModes.map((m) => {
                const Icon = m.icon;
                const isActive = activeMode === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setActiveMode(m.key)}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-800 text-white"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {m.label}
                  </button>
                );
              })}
            </div>
          )}

          <hr className="border-slate-100 mb-3" />

          {/* Fare Details Box */}
          <div className="flex flex-col bg-slate-50/70 rounded-xl border border-slate-100 p-3 gap-2.5 mb-4 flex-grow">
            {activeMode === "local" && localHrsOptions.length > 1 && (
              <div className="flex gap-1.5 self-start bg-white rounded-full p-0.5 border border-slate-200">
                {localHrsOptions.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setActiveHrs(h)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors ${
                      activeHrs === h
                        ? "bg-blue-800 text-white"
                        : "text-slate-500"
                    }`}
                  >
                    {h === "hrs8" ? "8 Hrs" : "10 Hrs"}
                  </button>
                ))}
              </div>
            )}

            {routePicker}

            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-semibold">
                  {heroNote}
                </span>
                <span className="text-xl font-semibold text-orange-600 leading-tight">
                  {formatINR(heroPrice)}
                </span>
              </div>
            </div>

            {stats.length > 0 && (
              <div className="grid grid-cols-3 gap-1.5">
                {stats.map((s) => (
                  <StatChip key={s.label} label={s.label} value={s.value} />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center px-1 mb-4">
            <span className="text-slate-500 font-semibold text-xs flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-slate-400" /> Toll & Parking
            </span>
            <span className="text-slate-500 font-semibold text-xs">Extra</span>
          </div>

          <div className="space-y-2.5 mt-auto">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center hover:bg-orange-600 bg-blue-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs  shadow-md transition-all text-center"
            >
              Book Ride Instantly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Section Component (Supports Prop & URL Params)
// ---------------------------------------------------------------------------
export default function AirportTransfers({ serviceType }) {
  const rawParam = serviceType;

  const targetFareMode = useMemo(
    () => normalizeFareParam(rawParam),
    [rawParam],
  );

  // Filter vehicles list: If parameter is passed, only show vehicles that have data for that fare type
  const vehiclesList = useMemo(() => {
    const list = Object.entries(fareDetails.vehicles || {}).map(
      ([key, vehicle]) => ({ id: key, ...vehicle }),
    );

    if (!targetFareMode) return list;

    return list.filter((v) => v.fares && v.fares[targetFareMode]);
  }, [targetFareMode]);

  return (
    <section
      id="fleets"
      className="w-full bg-white py-10 px-4  text-slate-900 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER BLOCK */}
        <div className="space-y-2 mb-10">
          <div className="flex items-center gap-2 font-extrabold text-xs uppercase  px-3.5 border border-blue-800/30 py-1.5 rounded-full w-max bg-blue-50 text-blue-800">
            <Car className="w-3.5 h-3.5" />
            Premium Cab Fleet
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 tracking-wide ">
            Choose the Perfect Vehicle for <br />
            <span className="text-orange-600 font-bold">Every Journey</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-semibold max-w-xl">
            Choose from our wide range of clean, comfortable, and well-maintained vehicles for local trips, outstation travel, airport transfers, and tour packages.
          </p>
        </div>

        {/* FLEETS GRID */}
        {vehiclesList.length > 0 ? (
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {vehiclesList.map((vehicle) => (
              <VehicleFareCard
                key={vehicle.id}
                vehicle={vehicle}
                targetFareMode={targetFareMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-slate-500 font-semibold text-sm">
              No vehicle fleet found for the selected route category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
