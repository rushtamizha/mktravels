import Link from "next/link";
import { ArrowRight, Compass, Globe, MapPin, ShieldCheck, Star } from "lucide-react";

import HeroSlideshow from "@/components/HeroSlideshow";
import BookingWidget from "@/components/booking/BookingWidget";
import { companyInfo } from "@/lib/data";

const TRUST_POINTS = [
  { icon: Star, label: "4.9★ · 1200+ reviews" },
  { icon: ShieldCheck, label: "Verified drivers" },
  { icon: MapPin, label: "Coimbatore · Pollachi · Cochin" },
];

/**
 * Server component on purpose: the headline is the LCP element, so it must
 * be painted from the server HTML. The previous version wrapped it in a
 * framer-motion node with `initial={{ opacity: 0 }}`, which left the largest
 * text invisible until hydration finished and pushed LCP out by seconds.
 * Entrance motion is now CSS, which runs before any JS arrives.
 */
export function HeroSection() {
  const [firstWord, ...restWords] = companyInfo.companyName.split(" ");

  return (
    <section className="relative isolate w-full overflow-hidden bg-slate-950 pb-14 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
      <HeroSlideshow />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* ---------- COPY ---------- */}
        <div className="animate-hero-in text-center lg:col-span-6 lg:text-left">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
            <Globe className="h-3.5 w-3.5 text-orange-400" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-100">
              Premium Travel &amp; Tour Operator
            </span>
          </span>

          <h1 className="mt-5 text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {firstWord}{" "}
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              {restWords.join(" ")}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base lg:mx-0">
            Your trusted travel partner in{" "}
            <span className="font-semibold text-orange-400">Coimbatore</span> —
            luxury cabs, airport transfers and 1 to 9-day South India tour
            packages, with transparent per-km pricing and zero hidden tolls.
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 lg:justify-start">
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200"
              >
                <Icon className="h-3.5 w-3.5 text-orange-400" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/tour-packages"
              className="group inline-flex w-full max-w-sm items-center justify-center gap-2.5 rounded-full border border-orange-400 bg-orange-600 px-7 py-3.5 text-[16px] font-bold uppercase tracking-wide text-white shadow-lg shadow-orange-900/30 transition-colors hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              <Compass className="h-4 w-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
              Explore Packages
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>

            <a
              href="tel:+918754142281"
              className="inline-flex w-full max-w-sm items-center justify-center gap-2.5 rounded-full border border-white/25 bg-blue-800 px-7 py-3.5 text-[16px] font-bold uppercase tracking-wide text-white backdrop-blur-md transition-colors hover:bg-blue-700/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              Call +91 87541 42281
            </a>
          </div>
        </div>

        {/* ---------- BOOKING ---------- */}
        <div className="animate-hero-in-delayed lg:col-span-6">
          <div className="mb-3 text-center lg:text-left">
          </div>
          <BookingWidget />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
