"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  Headphones,
  FileQuestion,
} from "lucide-react";

const faqData = [
  {
    id: "01",
    question: "What types of vehicles do you provide?",
    answer:
      "We offer a wide range of well-maintained vehicles including 4-seater sedans (Swift Dzire, Toyota Etios), luxury sedans (Suzuki Ciaz), 7-seater SUVs (Innova, Innova Crysta, Hycross, Xylo), and 14 to 25-seater tempo travellers/coaches for large groups.",
  },
  {
    id: "02",
    question: "Do you provide tour guides for South India trips?",
    answer:
      "Yes, we can arrange experienced, multilingual local tour guides upon request for major South India destinations including Ooty, Kodaikanal, Kerala, and temple tour circuits.",
  },
  {
    id: "03",
    question: "Can I book a vehicle for local pickup and drop in Coimbatore?",
    answer:
      "Absolutely! We offer flexible local duty packages (8 Hrs / 80 Km and 10 Hrs / 100 Km), airport transfers, and point-to-point drop services across Coimbatore and surrounding regions.",
  },
  {
    id: "04",
    question: "How can I book a vehicle or tour package?",
    answer:
      "You can book directly by clicking the 'Book Ride Instantly' button on any vehicle card, messaging us on WhatsApp (+91 8754142281), or submitting your requirement via our contact page.",
  },
  {
    id: "05",
    question: "Do you require advance booking?",
    answer:
      "While we accommodate last-minute bookings subject to fleet availability, we strongly recommend booking 24–48 hours in advance (and earlier for peak weekend/festival seasons) to secure your preferred vehicle type.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-10 px-4 tracking-wide text-slate-900">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* HEADER BLOCK */}
       
<div className="space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-xs uppercase  px-3.5 border border-blue-800/30 py-1.5 rounded-full w-max bg-blue-50 text-blue-800">
              <FileQuestion className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 tracking-wide ">
              Everything You Need to Know Before <br />
              <span className="text-orange-600 font-bold">Booking Your Tour</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-semibold max-w-xl">
              Find answers to the most common questions about our South India tour packages, private cab services, pricing, inclusions, destinations, and booking process
            </p>
          </div>
        {/* FAQ CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: ACCORDION LIST (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {faqData.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.id}
                  className={`rounded-[1.75rem] border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white border-blue-200 shadow-md ring-1 ring-blue-500/10"
                      : "bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-xs"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-hidden"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm font-extrabold px-3 py-1 rounded-xl transition-colors ${
                          isOpen
                            ? "bg-orange-50 text-orange-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.id}
                      </span>
                      <h3
                        className={`text-sm sm:text-lg font-semibold transition-colors ${
                          isOpen ? "text-blue-900" : "text-slate-800"
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-orange-600 text-white rotate-180 shadow-xs"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* RIGHT: CONTACT CALLOUT CARD (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="bg-blue-950 rounded-[2rem] p-8 text-white relative overflow-hidden border border-blue-900 shadow-xl space-y-6">
              


              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-orange-400">
                <Headphones className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase  text-orange-400">
                  Still Have Questions?
                </span>
                <h3 className="text-2xl font-bold leading-tight">
                  Do You Have Different Questions?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed pt-1">
                  Didn’t find your answer here? Contact us directly — we’ll guide
                  you with all travel details.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs uppercase  py-4 px-6 rounded-full shadow-lg transition-all duration-300 hover:shadow-orange-600/30"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.me/918754142281?text=Hi%2C%20I%20have%20a%20question%20about%20your%20travel%20services"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/15 font-bold text-xs uppercase  py-3.5 px-6 rounded-full backdrop-blur-md transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Help</span>
                </a>
              </div>


            </div>
          </div>

        </div>
      </div>
    </section>
  );
}