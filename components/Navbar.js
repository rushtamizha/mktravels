"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Award,
} from "lucide-react";
import { companyInfo, navItems } from "@/lib/data";

export default function Navbar() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [mobileSubDropdown, setMobileSubDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 8,
      scale: 0.98,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", duration: 0.4, bounce: 0.05 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <nav className="fixed top-5 tracking-wide w-full flex justify-center px-4 z-[999] capitalize">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`w-full max-w-7xl rounded-full p-3 flex items-center justify-between border transition-all duration-500 ${
          scrolled
            ? "bg-white/95 border-slate-200/80 shadow-[0_12px_40px_rgba(0,96,57,0.06)] backdrop-blur-md"
            : "bg-white border-slate-200/60 shadow-sm"
        }`}
      >
        {/* BRAND LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2.5 pr-4 cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800/50  transition-transform duration-300 group-hover:scale-105 shadow-sm border border-emerald-100 shrink-0">
            <img
              src={companyInfo.companyLogo}
              className="w-full h-full object-cover rounded-full"
              alt="logo"
            />
          </div>
          <div className="flex flex-col justify-center  leading-tight">
            <p className=" font-extrabold  text-blue-800">
              {companyInfo.companyName.split(" ").slice(0,1).join(" ")}
              <span className="text-orange-600 font-extrabold ml-0.5">
                {companyInfo.companyName.split(" ").slice(1)}
              </span>
            </p>
            <p className="text-[8px] font-bold leading-relaxed text-slate-500 uppercase">
              Expert Expertise. Trust.
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden items-center px-2 space-x-1 lg:flex">
          {navItems.map((menu, idx) => (
            <div
              key={idx}
              className="relative py-1"
              onMouseEnter={() => {
                setActiveMenu(idx);
                setHoveredIndex(idx);
              }}
              onMouseLeave={() => {
                setActiveMenu(null);
                setActiveSubMenu(null);
                setHoveredIndex(null);
              }}
            >
              <Link
                href={menu.href}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                  activeMenu === idx
                    ? "bg-blue-50 text-blue-800"
                    : "text-slate-900 hover:text-blue-800"
                }`}
              >
                {/* ICON FORMATTING (DESKTOP) */}
                <AnimatePresence mode="wait">
                  {hoveredIndex === idx && menu.icon && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6, width: 0 }}
                      animate={{ opacity: 1, scale: 1, width: "auto" }}
                      exit={{ opacity: 0, scale: 0.6, width: 0 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="inline-flex items-center justify-center text-blue-800 shrink-0"
                    >
                      {menu.icon}
                    </motion.span>
                  )}
                </AnimatePresence>

                <span className="whitespace-nowrap">{menu.label}</span>

                {menu.dropdown && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 opacity-70 shrink-0 ${
                      activeMenu === idx ? "rotate-180 text-blue-800" : ""
                    }`}
                  />
                )}
              </Link>

              {/* DROPDOWN LEVEL 1 */}
              <AnimatePresence>
                {activeMenu === idx && menu.dropdown && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-1/2 top-full mt-4 w-64 -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_15px_50px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
                  >
                    {menu.dropdown.map((dropItem, dropIdx) => (
                      <div
                        key={dropIdx}
                        className="relative"
                        onMouseEnter={() => setActiveSubMenu(dropIdx)}
                        onMouseLeave={() => setActiveSubMenu(null)}
                      >
                        <button
                          onClick={() => {
                            if (dropItem.href !== "#") {
                              router.push(dropItem.href);
                              setActiveMenu(null);
                            }
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition-all ${
                            activeSubMenu === dropIdx
                              ? "bg-blue-50 text-blue-800"
                              : "text-slate-900 hover:bg-blue-50 hover:text-blue-800"
                          }`}
                        >
                          <span>{dropItem.label}</span>
                          {dropItem.subDropdown && (
                            <ChevronRight
                              size={13}
                              className="text-blue-800/60"
                            />
                          )}
                        </button>

                        {/* DROPDOWN LEVEL 2 */}
                        <AnimatePresence>
                          {dropItem.subDropdown &&
                            activeSubMenu === dropIdx && (
                              <motion.div
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute left-full top-0 ml-3 w-100 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_15px_50px_rgba(0,0,0,0.08)]"
                              >
                                {dropItem.subDropdown.map((subItem, subIdx) => (
                                  <button
                                    key={subIdx}
                                    onClick={() => {
                                      router.push(subItem.href);
                                      setActiveMenu(null);
                                    }}
                                    className="block w-full rounded-xl px-3 py-2 text-left text-[13px] font-semibold text-slate-900 transition-colors hover:bg-orange-50 hover:text-orange-600"
                                  >
                                    {subItem.label}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* ACTION CTA */}
        <div className="hidden items-center lg:flex px-2">
          <button
            onClick={() => router.push("/contact")}
            className="rounded-full bg-orange-600 px-6 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-emerald-900/10 hover:bg-orange-600/90 hover:shadow-lg transition-all active:scale-95"
          >
            Book Appointment
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full lg:hidden bg-slate-50 text-slate-600 hover:bg-slate-100"
        >
          {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.div>

      {/* MOBILE PANELS */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-x-4 top-20 max-h-[80vh] overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((menu, idx) => (
                <div key={idx} className="rounded-2xl bg-slate-50/80 p-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={menu.href}
                      onClick={() => !menu.dropdown && setIsMobileOpen(false)}
                      className="px-3 py-2 text-sm font-semibold text-slate-900 flex items-center gap-2.5 w-full"
                    >
                      {/* ICON FORMATTING (MOBILE) */}
                      {menu.icon && (
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-800 shrink-0">
                          {menu.icon}
                        </span>
                      )}
                      <span className="grow">{menu.label}</span>
                    </Link>

                    {menu.dropdown && (
                      <button
                        onClick={() =>
                          setMobileDropdown(mobileDropdown === idx ? null : idx)
                        }
                        className="p-2 text-blue-800 shrink-0"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            mobileDropdown === idx ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {menu.dropdown && mobileDropdown === idx && (
                    <div className="mt-1 space-y-1 pl-3 border-l-2 border-blue-600">
                      {menu.dropdown.map((dropItem, dropIdx) => (
                        <div key={dropIdx} className="space-y-1">
                          <div className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 bg-gradient-to-r from-blue-50 border border-blue-100 hover:text-blue-500">
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                if (dropItem.href !== "#") {
                                  router.push(dropItem.href);
                                  setIsMobileOpen(false);
                                }
                              }}
                            >
                              {dropItem.label}
                            </span>
                            {dropItem.subDropdown && (
                              <button
                                onClick={() =>
                                  setMobileSubDropdown(
                                    mobileSubDropdown === dropIdx
                                      ? null
                                      : dropIdx
                                  )
                                }
                              >
                                <ChevronDown
                                  size={14}
                                  className={`transition-transform ${
                                    mobileSubDropdown === dropIdx
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                />
                              </button>
                            )}
                          </div>

                          {dropItem.subDropdown &&
                            mobileSubDropdown === dropIdx && (
                              <div className="space-y-1 pl-3 mt-1 border-l-2 border-orange-600">
                                {dropItem.subDropdown.map((subItem, subIdx) => (
                                  <button
                                    key={subIdx}
                                    onClick={() => {
                                      router.push(subItem.href);
                                      setIsMobileOpen(false);
                                    }}
                                    className="block w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-900 hover:text-orange-600 bg-gradient-to-r from-orange-50 border border-orange-100"
                                  >
                                    {subItem.label}
                                  </button>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4">
                <button
                  onClick={() => {
                    router.push("/contact");
                    setIsMobileOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 font-semibold py-4 text-sm text-white shadow-lg shadow-emerald-900/20 hover:bg-orange-600/90 transition-all active:scale-98"
                >
                  <Award size={16} /> Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}