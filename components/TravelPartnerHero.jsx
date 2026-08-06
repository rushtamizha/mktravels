"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Clock,
  ShieldCheck,
  Star,
  Car,
} from "lucide-react";

export default function TravelPartnerHero() {
  return (
    <section className="w-full bg-white py-10 px-4   text-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="group relative min-h-[520px] sm:min-h-[560px] rounded-[2.5rem] overflow-hidden border border-slate-200/80 shadow-xl flex flex-col justify-between p-6 sm:p-10 lg:p-14"
        >
          {/* BACKGROUND IMAGE WITH MULTI-LAYER GRADIENT OVERLAY */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/heroSection/coimbatore-tour-package-1.webp" // Replace with your primary hero asset path
              alt="Coimbatore Travel Partner MK Travels"
              fill
              priority
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            
            {/* Dark gradient for text readability (Blue depth matching your navbar) */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/80 to-slate-900/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent" />
          </div>

          {/* TOP BAR: BADGES */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold  text-orange-400 uppercase bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              Coimbatore · Tamil Nadu
            </span>

            {/* FLOATING RATING CHIP */}
            <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-white text-xs font-semibold">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="font-bold">4.9/5</span>
              <span className="text-white/60">(1,200+ Rides)</span>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="relative z-10 my-auto max-w-2xl space-y-5 ">
            <h2 className="text-2xl md:text-4xl  font-semibold text-white tracking-wide">
              Your Ultimate Travels Partner in{" "}
              <span className="text-orange-500 underline decoration-orange-500/50 underline-offset-8">
                Coimbatore
              </span>
            </h2>

            <p className="text-white text-sm sm:text-base leading-relaxed font-normal opacity-95">
              <strong className="text-white font-semibold">MK TRAVELS</strong>{" "}
              offers convenient local duty services on an hourly basis, ensuring
              flexible and budget-friendly travel options. Whether you need a
              vehicle for business meetings, city tours, or errands, our reliable
              service is tailored to your schedule.
            </p>

            {/* ACTION CTA & STATS ROW */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/tariff"
                className="inline-flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs uppercase  px-8 py-4 rounded-full shadow-lg shadow-orange-950/30 transition-all duration-300 hover:shadow-orange-600/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Travels With Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-6 px-2 text-white text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-400" /> Hourly Rates
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-orange-400" /> Verified Fleet
                </span>
              </div>
            </div>
          </div>

          {/* BOTTOM FEATURE CHIPS */}
          <div className="relative z-10 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-white">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
              <div className="p-2 rounded-xl bg-orange-600/20 text-orange-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-white font-medium uppercase ">
                  Flexible
                </p>
                <p className="text-xs font-bold">8 & 10 Hrs Packages</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-white font-medium uppercase ">
                  Vehicle Range
                </p>
                <p className="text-xs font-bold">Sedan, SUV & Vans</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-white font-medium uppercase ">
                  Pricing
                </p>
                <p className="text-xs font-bold">Zero Hidden Tolls</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}