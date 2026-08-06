"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import { motion } from "framer-motion";
import { navItems } from "@/lib/data";

/**
 * Reusable hero banner.
 * Pass `images` to override the background slideshow for a specific page
 * (e.g. a category's own cover shots); otherwise falls back to the global
 * Tour Packages nav item's `coverImages`.
 */
const Header = ({ prefix, suffix, description, images }) => {
  const tourPackagesNav = navItems?.find(
    (item) => item.label?.toLowerCase() === "tour packages"
  );

  // Optional-chained — previously `tourPackagesNav.coverImages` would throw
  // if the nav item wasn't found, taking the whole banner (and page) down.
  const coverImages = images?.length ? images : tourPackagesNav?.coverImages || [];
  const hasImages = coverImages.length > 0;

  return (
    <div className="relative flex h-[34vh] min-h-[280px] tracking-wide items-center justify-center overflow-hidden bg-slate-950 pt-20 sm:h-[42vh] sm:min-h-[360px]">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        {hasImages ? (
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            loop={coverImages.length > 1}
            speed={900}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            className="h-full w-full"
          >
            {coverImages.map((imgSrc, index) => (
              <SwiperSlide key={imgSrc + index} className="relative h-full w-full">
                <Image
                  fill
                  // Only the first slide is ever visible on load — that's the
                  // only one that should carry the LCP `priority` hint.
                  priority={index === 0}
                  sizes="100vw"
                  src={imgSrc}
                  alt={`Tour banner ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // Graceful fallback instead of an empty/crashing Swiper when no
          // cover images exist yet.
          <div className="h-full w-full bg-gradient-to-br from-blue-900 via-slate-950 to-slate-900" />
        )}
      </div>

      {/* Scrim for text legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

      {/* Content */}
      <div className="container relative z-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-2 text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            {prefix}
            {suffix && <span className="ml-2 text-orange-500">{suffix}</span>}
          </h1>
          {description && (
            <p className="mx-auto max-w-2xl text-xs font-semibold leading-relaxed text-white sm:text-sm md:text-base">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Header;