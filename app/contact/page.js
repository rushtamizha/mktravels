"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Headphones,
  FileIcon,
} from "lucide-react";
import { companyInfo } from "@/lib/data";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "Local Duty",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct WhatsApp message URL
    const textMessage = `*New Travel Inquiry*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.serviceType}%0A*Message:* ${formData.message}`;
    const waUrl = `https://wa.me/919489485353?text=${textMessage}`;

    // Open WhatsApp
    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <section className="w-full bg-white py-40 px-4  text-slate-900">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HEADER BLOCK */}
     <div className="space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-xs uppercase  px-3.5 border border-blue-800/30 py-1.5 rounded-full w-max bg-blue-50 text-blue-800">
              <FileIcon className="w-3.5 h-3.5" />
              Get in Touch
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 tracking-wide ">
              Ready to Plan Your Perfect<br />
              <span className="text-orange-600 font-bold">South India Trip?</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-semibold max-w-xl">
              Have questions or need a customized itinerary? Our travel experts are here to help you choose the ideal tour package, vehicle, and travel plan.
            </p>
          </div>

        {/* MAIN CONTACT CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: INFO CARD (5 Cols) */}
          <div className="lg:col-span-5 bg-blue-950 rounded-[2.5rem] p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between border border-blue-900">
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-white">
                  Contact Information
                </h3>
                <p className="text-xs sm:text-sm text-white leading-relaxed font-normal">
                  Reach out via phone, email, or WhatsApp. We guarantee fast response times for all inquiries.
                </p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-orange-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold text-orange-400 ">
                      Location
                    </h4>
                    <p className="text-sm font-semibold text-slate-200 mt-0.5">
                      Coimbatore, Tamil Nadu & South India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-orange-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold text-orange-400 ">
                      Phone Number
                    </h4>
                    <a
                      href="tel:+919489485353"
                      className="text-sm font-semibold text-slate-200 hover:text-orange-400 transition-colors mt-0.5 block"
                    >
                      +91 94894 85353
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-orange-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold text-orange-400 ">
                      Email Address
                    </h4>
                    <a
                      href="mailto:info@mktravels.com"
                      className="text-sm font-semibold text-slate-200 hover:text-orange-400 transition-colors mt-0.5 block"
                    >
                      info@mktravels.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-orange-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold text-orange-400 ">
                      Operating Hours
                    </h4>
                    <p className="text-sm font-semibold text-slate-200 mt-0.5">
                      24 Hours / 7 Days a Week
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action */}
            <div className="relative z-10 pt-8  space-y-3">
              <a
                href="https://wa.me/919489485353?text=Hi%2C%20I%20would%20like%20to%20book%20a%20ride"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase  py-4 px-6 rounded-2xl shadow-lg transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* RIGHT: CONTACT FORM (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-200/80 shadow-xs flex flex-col justify-center">
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  We've opened WhatsApp with your details. You can also expect our phone confirmation shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-blue-900 text-white text-xs font-bold uppercase  px-6 py-3 rounded-full hover:bg-blue-800 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-blue-900">
                    Send Us a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Fill out the form below to request custom quotes or trip assistance.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase  text-slate-700">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase  text-slate-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase  text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="e.g. rahul@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold uppercase  text-slate-700">
                      Service Type *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) =>
                        setFormData({ ...formData, serviceType: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                    >
                      <option value="Local Duty">Local Hourly Duty</option>
                      <option value="Airport Transfer">Airport Drop / Transfer</option>
                      <option value="Outstation KM">Outstation (KM Basis)</option>
                      <option value="Outstation Day">Outstation (Day Basis)</option>
                      <option value="Tour Package">South India Tour Package</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold uppercase  text-slate-700">
                    Message / Travel Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Provide trip dates, number of passengers, or specific pickup requirements..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs uppercase  py-4 px-8 rounded-xl shadow-lg shadow-orange-950/20 transition-all duration-300 hover:shadow-orange-600/30 active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Booking Request</span>
                </button>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}