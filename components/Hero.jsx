"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import {
  ArrowRight,
  Compass,
  MapPin,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";

import Link from "next/link";
import { companyInfo, heroImages } from "@/lib/data";
import Image from "next/image";

export const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <section className="relative flex items-center tracking-wide justify-center w-full min-h-screen pt-28 pb-16 overflow-hidden bg-slate-950 capitalize">
      {/* BACKGROUND SWIPER WITH ZOOM EFFECT */}
      <div className="absolute inset-0 z-0">
        <Swiper
          onSwiper={setSwiperRef}
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          loop={true}
          speed={1800}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {heroImages.map((slide, idx) => (
            <SwiperSlide key={idx} className="overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  fill
                  priority={idx === 0}
                  unoptimized
                  sizes="100vw"
                  src={slide}
                  className={`object-cover w-full h-full transition-transform duration-[6000ms] ease-out ${
                    activeIndex === idx ? "scale-110" : "scale-100"
                  }`}
                  alt={`Hero slide ${idx + 1}`}
                />

                
                <div className="absolute inset-0 bg-slate-950/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/60 via-transparent to-slate-950/60" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[250px] bg-orange-600/15 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* MAIN CONTENT CONTAINER */}
      <div className="container relative z-10 px-4 md:px-8 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-xl shadow-black/10"
          >
            <Globe size={14} className="text-orange-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-100">
              Premium Travel & Tour Operator
            </span>
          </motion.div>

          {/* MAIN HEADING */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.02] tracking-tight uppercase mb-2 drop-shadow-sm">
            {companyInfo.companyName.split(" ").slice(0, 1)}{" "}
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              {companyInfo.companyName.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="max-w-2xl mx-auto mb-10 font-normal leading-relaxed text-white text-sm sm:text-base md:text-lg">
            Your trusted travel partner based in the heart of{" "}
            <span className="text-orange-400 font-semibold  underline-offset-4 decoration-orange-500/50">
              Coimbatore
            </span>
            , offering luxury cabs and tour packages with active hubs in{" "}
            <span className="text-white font-semibold">
              Pollachi, Coimbatore, and Cochin.
            </span>
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/packages"
              className="w-full sm:w-auto flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 0.99 }}
                className="w-full max-w-xs sm:w-auto px-8 py-3.5 bg-orange-600/50 hover:bg-orange-600/70 text-white rounded-full  text-xs uppercase tracking-wide shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-3 group border border-orange-400 font-bold"
              >
                <Compass
                  size={16}
                  className="text-white transition-transform group-hover:rotate-45"
                />
                Explore Packages
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.button>
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 0.99 }}
                className="w-full max-w-xs sm:w-auto px-8 py-3.5 bg-blue-600/50 hover:bg-blue-600/70 text-white rounded-full font-bold text-xs uppercase tracking-wide shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-3 group border border-blue-400"
              >
                <PhoneCall size={15} className="text-white" />
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM FOOTER BAR WITHIN HERO */}
      <div className="absolute z-20 bottom-6 sm:bottom-10 left-6 right-6 md:left-12 md:right-12 flex items-end justify-between">
        {/* LOCATION INFO */}
        <div className="hidden md:flex items-center gap-3 text-left">
          <div className="p-2.5 rounded-full bg-white/5 border border-white/10 text-orange-400">
            <MapPin size={16} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.25em]">
              HQ Location
            </p>
            <p className="text-white text-xs font-bold uppercase ">
              Valparai & Coimbatore, TN
            </p>
          </div>
        </div>
      

        {/* YEAR EST. */}
        <div className="hidden md:block text-right">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.25em]">
            Established
          </p>
          <p className="text-white text-xs font-bold uppercase ">
            © 2026 {companyInfo.companyName}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;