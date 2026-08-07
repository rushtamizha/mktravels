"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Compass,
  Clock,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Smile,
  Tag,
  Zap,
  MapPin,
  Headphones,
  Sliders,
  Calendar,
} from "lucide-react";
import { companyInfo } from "@/lib/data";

const whyUsFeatures = [
  {
    title: "Happy Trips",
    description: "MK TRAVELS crafts unforgettable journeys filled with happiness.",
    icon: Smile,
  },
  {
    title: "Competitive Pricing",
    description: "Enjoy exceptional travel experiences with MK TRAVELS at unbeatable prices.",
    icon: Tag,
  },
  {
    title: "Fast Booking",
    description: "Enjoy smooth, quick, and hassle-free bookings with MK TRAVELS.",
    icon: Zap,
  },
  {
    title: "Guided Tours",
    description: "Discover more with MK TRAVELS' knowledgeable and friendly tour guides.",
    icon: MapPin,
  },
  {
    title: "Best Support 24/7",
    description: "We're here for you 24/7 — MK TRAVELS makes every journey worry-free.",
    icon: Headphones,
  },
  {
    title: "Ultimate Flexibility",
    description: "MK TRAVELS gives you the freedom to design your trip your way.",
    icon: Sliders,
  },
];

const coreHighlights = [
  "Personalized itineraries tailored to your schedule",
  "Safe journeys with verified, route-expert drivers",
  "Easy booking system for hassle-free reservations",
  "24/7 dedicated support to make your trip unforgettable",
];

export default function AboutClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen bg-white py-30 text-slate-800">
      <div className="pointer-events-none absolute top-12 left-1/2 -z-10 h-96 w-[90%] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-100/50 via-orange-100/40 to-blue-50/50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-800 shadow-sm backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-orange-600" />
            <span>Get About Us</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-5xl tracking-wide leading-tight">
            We're Strived Only For The Best In{" "}
            <span className="text-blue-800">South India</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-semibold leading-relaxed">
            We offering personalized itineraries, safe journeys, and 24/7 support to make your trip truly unforgettable.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                <Image
                  src="/og-image.png"
                  alt="MK Travels South India Tours"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-wide text-orange-400">
                    Trusted Travel Agency
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-white">
                    Crafting Unforgettable Journeys
                  </h3>
                </div>
              </div>

              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute -top-6 -left-2 sm:-left-6 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-2xl backdrop-blur-md flex items-center gap-3.5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-800 text-white shadow-md">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-2xl font-black text-blue-800 leading-none block">2017</span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mt-0.5">
                    Since In Travels
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute -bottom-6 -right-2 sm:right-6 rounded-2xl border border-slate-200/80 bg-white/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md flex items-center gap-4 max-w-[260px]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white shadow-md">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">Safety First Always</h4>
                  <p className="text-[11px] font-semibold text-slate-500">
                    Easy Booking System
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-xs font-extrabold uppercase tracking-wide text-orange-600">
              Who We Are
            </span>

            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-4xl tracking-wide">
              Trusted Travel Agency Dedicated To Excellence
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
              At <strong className="text-slate-900 font-semibold">{companyInfo.companyName}</strong>, we have been striving for excellence since 2017. We specialize in providing reliable, safe, and customizable tour packages across South India. From seamless road transfers to expert tour guidance, we ensure every trip is filled with joy and complete peace of mind.
            </p>

            <div className="mt-6 space-y-3">
              {coreHighlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-7 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-orange-600/20 transition-all hover:bg-orange-500 hover:shadow-lg active:scale-95"
              >
                <span>Contact Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/tour-packages"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95"
              >
                <Compass className="h-4 w-4 text-blue-800" />
                <span>Explore Tour Packages</span>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 sm:mt-28"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wide text-orange-600">
              Why MK Travels Best
            </span>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-4xl tracking-wide">
              Six Reasons To Travel With Us
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Designed to give you unbeatable value, complete safety, and total trip freedom.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyUsFeatures.map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all hover:border-blue-200 hover:shadow-md group relative overflow-hidden"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 transition-transform duration-300 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white">
                    <IconComp className="h-6 w-6" />
                  </div>

                  <h4 className="text-lg font-bold text-slate-900">{feature.title}</h4>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 sm:mt-24 overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 p-8 sm:p-12 text-white shadow-2xl relative"
        >
          <div className="relative z-10 flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wide text-orange-400">
                24/7 Dedicated Support
              </p>
              <h3 className="mt-1 text-2xl font-extrabold sm:text-3xl text-white">
                Ready to Experience Your Unforgettable Journey?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-blue-100/90">
                Get in touch with our team today for custom personalized itineraries and instant bookings.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-8 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-orange-600/30 transition-all hover:bg-orange-500 active:scale-95"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Contact Now →</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}