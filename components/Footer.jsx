"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Send,
  MessageCircle,
  Terminal,
} from "lucide-react";
import { companyInfo, navItems } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-white tracking-wide relative">
      <div className="relative w-full max-w-7xl mx-auto px-4 xl:px-0  -top-16 z-20">
        <div className="relative w-full min-h-[380px] sm:min-h-[420px] rounded-[2.5rem] overflow-hidden bg-[#0a192f] border border-blue-900/50 shadow-2xl flex flex-col justify-center p-6 sm:p-10 lg:p-14 ">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none " />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 relative h-[260px] sm:h-[340px] w-full flex items-center justify-center">
              <Image
                src="/travelFamily.png"
                alt="Ready to Travel with MK Travels"
                fill
                priority
                className="object-contain object-bottom drop-shadow-2xl"
              />
            </div>
            <div className="lg:col-span-6 text-center lg:text-right space-y-4 lg:pl-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
                Ready to Travel?
              </h2>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Let's Go and Experience More!
              </h3>

              <p className="text-white text-xs sm:text-sm leading-relaxed max-w-lg lg:ml-auto font-normal">
                Pack your bags and start your next adventure with us! Discover
                the best of South India through comfortable rides, expert
                guides, and unforgettable travel memories from Coimbatore.
              </p>

              <div className="pt-2 flex justify-center lg:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs uppercase  py-3.5 px-8 rounded-md shadow-lg shadow-orange-950/40 transition-all duration-300 hover:shadow-orange-600/50 active:scale-95"
                >
                  Plan Your Trip Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-slate-800 pb-12">
          {/* BRAND INFO */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800/50 shadow-sm border border-emerald-100 shrink-0">
                <img
                  src={companyInfo.companyLogo}
                  className="w-full h-full object-cover rounded-full"
                  alt="logo"
                />
              </div>
              <div className="flex flex-col justify-center leading-tight">
                <p className="font-extrabold text-blue-400 text-lg">
                  {companyInfo.companyName.split(" ").slice(0, 1).join(" ")}
                  <span className="text-orange-500 font-extrabold ml-1">
                    {companyInfo.companyName.split(" ").slice(1)}
                  </span>
                </p>
                <p className="text-[9px] font-bold text-white uppercase">
                  Expertise. Trust.
                </p>
              </div>
            </Link>

            <p className="text-white text-xs leading-relaxed">
              MK TRAVELS provides seamless travel, local cabs, outstation tour
              packages, and airport transfer services across Coimbatore, Tamil
              Nadu, and South India.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase  text-orange-500">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-white font-semibold">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-orange-400 flex items-center gap-1.5 transition-colors"
                  >
                    <ChevronRight size={12} className="text-orange-500" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase  text-orange-500">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-white font-semibold">
              <li>
                <Link
                  href="/tariff/local-duty"
                  className="hover:text-orange-400 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight size={12} className="text-orange-500" />
                  Local Hourly Duty
                </Link>
              </li>
              <li>
                <Link
                  href="/tariff/onewayfixed"
                  className="hover:text-orange-400 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight size={12} className="text-orange-500" />
                  Airport Drop & Transfer
                </Link>
              </li>
              <li>
                <Link
                  href="/tariff/outstation-day-basis"
                  className="hover:text-orange-400 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight size={12} className="text-orange-500" />
                  Outstation Day Basis
                </Link>
              </li>
              <li>
                <Link
                  href="/tour-packages"
                  className="hover:text-orange-400 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight size={12} className="text-orange-500" />
                  South India Tour Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase  text-orange-500">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-xs text-white">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                <span>Coimbatore & Surrounding Regions, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-orange-500 shrink-0" />
                <span>+91 94894 85353</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-orange-500 shrink-0" />
                <span>info@mktravels.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white gap-4 border-t border-slate-800/60">
          {/* Copyright Notice */}
          <p>© {new Date().getFullYear()} MK Travels. All rights reserved.</p>

          {/* Developer Badge */}
          <div className="flex items-center gap-2 bg-orange-950 border border-orange-800/80 px-4 py-2 rounded-xl text-white font-medium">
            <Terminal className="w-3.5 h-3.5 text-orange-600" />
            <span>Developed by</span>
            <a
              href="https://wepzite.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 font-black tracking-wide hover:text-orange-500 transition-colors uppercase flex items-center gap-0.5 border-b border-dashed border-orange-500 hover:border-orange-500"
            >
              wepzite.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
