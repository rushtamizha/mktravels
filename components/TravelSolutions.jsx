"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, ArrowRight, Building2, Plane, Car, ChevronDown } from "lucide-react";

const solutionsData = [
  {
    id: "01",
    number: "01",
    title: "Out Station Duty",
    description:
      "MK TRAVELS provides reliable outstation duty services on a day basis, ensuring a smooth and hassle-free journey.",
    href: "/tariff/outstation-day-basis",
    icon: Car,
  },
  {
    id: "02",
    number: "02",
    title: "Corporate Booking",
    description:
      "MK TRAVELS offers seamless corporate booking solutions tailored to your business needs.",
    href: "/contact",
    icon: Building2,
  },
  {
    id: "03",
    number: "03",
    title: "Airport Drop",
    description:
      "MK TRAVELS ensures a smooth and hassle-free airport drop experience with punctual and reliable service.",
    href: "/tariff/onewayfixed",
    icon: Plane,
  },
];

export default function TravelSolutions() {
  const [expandedId, setExpandedId] = useState("01"); // Default open first on mobile

  return (
    <section className="w-full bg-white py-10 tracking-wide  px-4  text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* COMPACT MASTER BANNER CONTAINER */}
        <div className="relative rounded-[2rem] overflow-hidden bg-blue-950/80 px-5 pt-5 pb-5 sm:p-8 lg:p-10 text-white border border-blue-900/50 shadow-xl space-y-6">
          
          {/* SINGLE BACKGROUND IMAGE & GRADIENT OVERLAY (100% COVERAGE FIX) */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
            <Image
              src="/heroSection/coimbatore-tour-package-1.webp"
              alt="MK Travels Solutions Background"
              fill
              priority
              className="object-cover  mix-blend-overlay scale-105"
            />
            {/* Gradient Overlay strictly forced to fill entire card bounds */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-950/95 via-blue-950/85 to-slate-950/95" />
          </div>

          {/* HEADER BLOCK */}
          <div className="relative z-10 space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 font-semibold  text-xs uppercase px-3 py-1 rounded-full w-max bg-orange-500/10 border border-orange-500/30 text-orange-400 backdrop-blur-md">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Our Travel Solutions
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white ">
              Trusted By Thousands <span className="text-orange-500">Of Travelers</span>
            </h2>
          </div>

          {/* MOBILE VIEW: Compact Accordion List */}
          <div className="relative z-10 block lg:hidden space-y-2.5">
            {solutionsData.map((item) => {
              const IconComponent = item.icon;
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl  transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? " "
                      : ""
                  }`}
                >
                  {/* Row Header */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isExpanded ? "bg-orange-600 text-white" : "bg-white/10 text-orange-400"
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase  text-orange-400 block">
                          Service {item.number}
                        </span>
                        <h3 className="text-base font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-orange-400" : ""
                      }`}
                    />
                  </button>

                  {/* Expandable Details */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-4 pb-4 pt-1 space-y-3  "
                      >
                        <p className="text-xs text-white leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* DESKTOP VIEW: Grid Layout */}
          <div className="relative z-10 hidden lg:grid grid-cols-3 gap-6">
            {solutionsData.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10   transition-all duration-300 flex flex-col justify-between space-y-6 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-semibold text-white/20 group-hover:text-orange-500 transition-colors">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}