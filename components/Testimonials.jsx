"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  MessageCircle,
  Star,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

// Import Swiper styling production layers
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { companyInfo, FALLBACK_REVIEWS } from "@/lib/data";

export default function Testimonials() {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [isLoading, setIsLoading] = useState(false);

  // Clean, working Google Review Place ID URL
  const gmbPlaceId = "ChIJlRUTqCAbBzsGRCSxw5Azi04";
  const gmbReviewUrl =
    companyInfo?.googleBusinessUrl ||
    `https://search.google.com/local/writereview?placeid=${gmbPlaceId}`;

  // Fetch Reviews dynamically from GMB API endpoint with local fallback
  useEffect(() => {
    async function fetchGmbReviews() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/google-reviews");
        if (res.ok) {
          const data = await res.json();
          if (data?.reviews && data.reviews.length > 0) {
            setReviews(data.reviews);
          }
        }
      } catch (error) {
        console.error(
          "Failed to fetch Google My Business reviews, loading fallbacks:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchGmbReviews();
  }, []);

  return (
    <section className="w-full tracking-wide bg-white py-10 px-4 text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER BLOCK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-xs uppercase px-3.5 border border-blue-800/30 py-1.5 rounded-full w-max bg-blue-50 text-blue-800">
              <MessageCircle className="w-3.5 h-3.5 text-blue-800" />
              Verified Google Reviews
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 tracking-wide">
              Trusted By Thousands <br />
              <span className="text-orange-600 font-bold">Of Travelers</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-semibold max-w-xl">
              Authentic reviews synced directly from Google My Business.
              Experience 100% transparent pricing across every route.
            </p>
          </div>

          {/* REDIRECT CTA TO GMB REVIEW FORM */}
          <div className="shrink-0">
            <a
              href={gmbReviewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-[#1a73e8] hover:bg-[#f8f9fa] hover:text-[#174ea6] border border-[#dadce0] font-semibold text-xs py-2.5 px-4 rounded-full shadow-sm hover:shadow-md transition-all tracking-wide"
            >
              {/* Authentic 4-Color Google "G" Icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              <span className="font-semibold text-slate-500">
                Write a Review on{" "}
                <strong className="text-slate-900 font-semibold">Google</strong>
              </span>

              <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </a>
          </div>
        </div>

        {/* SWIPER CAROUSEL */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="pb-16 w-full"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 flex flex-col h-full justify-between transition-all duration-300 hover:bg-white shadow-xs hover:shadow-xs hover:border-slate-200 m-0.5 relative group">
                  {/* Google Brand Logo Badge */}
                  <div className="absolute right-4 top-3 bg-white/95 backdrop-blur-xs border border-slate-200/90 py-1.5 px-3 rounded-2xl shadow-xs group-hover:shadow-md transition-all duration-300 flex items-center gap-2.5 z-10">
                    <Image
                      width={80}
                      height={20}
                      priority
                      unoptimized
                      src="https://www.wepzite.in/logo.png"
                      alt="Wepzite Logo"
                      className="h-5 w-auto object-contain shrink-0 rounded-2xl"
                    />

                    <span className="h-3.5 w-px bg-slate-300/80 shrink-0" />

                    <div className="flex items-center gap-1.5 shrink-0">
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span className="text-[10px] font-semibold text-slate-600 tracking-wide leading-none">
                        Partner
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-4 relative z-10 pt-2">
                    {/* Star Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-200"
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-slate-700 text-sm md:text-base font-semibold leading-relaxed pr-6">
                      "{review.comment.length > 110 ? `${review.comment.slice(0, 110)}...` : review.comment}"
                    </p>
                  </div>

                  {/* Card Footer Bio */}
                  <div className="pt-5 mt-6 border-t border-slate-100 flex flex-col gap-3 relative z-10">
                    <div className="flex items-center gap-3">
                      {review.authorPhoto ? (
                        <Image
                          width={40}
                          height={40}
                          priority
                          unoptimized
                          src={review.authorPhoto}
                          alt={review.authorName || "Reviewer"}
                          className="w-10 h-10 rounded-full object-cover shadow-xs border border-slate-200 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-orange-100 font-bold flex items-center justify-center text-sm shadow-xs shrink-0 text-[#bc3908]">
                          {review.authorName
                            ? review.authorName.charAt(0)
                            : "G"}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-slate-800 truncate tracking-wide flex items-center gap-1">
                          {review.authorName}
                          <CheckCircle2 className="w-4 h-4 text-emerald-800 fill-emerald-500/10 shrink-0" />
                        </h4>
                        <span className="block text-[11px] text-slate-400 font-semibold uppercase">
                          {review.location ? `${review.location} • ` : ""}
                          {review.relativeTime || "Verified Google Review"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}