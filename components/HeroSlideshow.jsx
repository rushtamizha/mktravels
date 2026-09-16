"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroImages } from "@/lib/data";

/**
 * Background crossfade for the hero.
 *
 * The first slide is server-rendered as the LCP image and is the only one
 * fetched up front; the remaining slides mount once the browser goes idle so
 * they never compete with the LCP request for bandwidth. Swapping Swiper for
 * this keeps the carousel library off the home page's critical path.
 */
export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const schedule =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb) => setTimeout(cb, 1200);
    const handle = schedule(() => setReady(true));
    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const timer = setInterval(
      () => setActive((index) => (index + 1) % heroImages.length),
      5500
    );
    return () => clearInterval(timer);
  }, [ready]);

  const slides = ready ? heroImages : heroImages.slice(0, 1);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {slides.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          quality={70}
          priority={index === 0}
          fetchPriority={index === 0 ? "high" : "low"}
          loading={index === 0 ? "eager" : "lazy"}
          className={`object-cover transition-opacity duration-1000 ease-out ${
            active === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Scrims are weighted to the left, where the headline sits, so the
          copy clears WCAG AA contrast without flattening the photography. */}
      <div className="absolute inset-0 bg-slate-950/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-slate-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/50" />
    </div>
  );
}
