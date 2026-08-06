"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  MapPin,
  X,
  Maximize2,
  Sparkles,
  Compass,
} from "lucide-react";

// Swiper React components & modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

const galleryCategories = [
  { key: "all", label: "All Travels" },
  { key: "hills", label: "Hill Stations" },
  { key: "temples", label: "Temple Tours" },
  { key: "fleets", label: "Our Fleets" },
];

const galleryImages = [
  {
    id: 1,
    title: "Ooty Hills & Tea Gardens",
    src: "/Gallery/ooty.webp",
  },
  {
    id: 2,
    title: "Kodaikanal Lake & Hills",
    src: "/Gallery/kodaikana.webp",
  },
  {
    id: 3,
    title: "Munnar Tea Plantations",
    src: "/Gallery/munar.webp",
  },
  {
    id: 4,
    title: "Valparai Scenic View",
    src: "/Gallery/valparai-1.webp",
  },
  {
    id: 5,
    title: "Wayanad Nature Escape",
    src: "/Gallery/Wayanad.webp",
  },
  {
    id: 6,
    title: "Rameswaram Temple",
    src: "/Gallery/ramesh.webp",
  },
  {
    id: 7,
    title: "Guruvayur Temple",
    src: "/Gallery/guruvayur.webp",
  },
  {
    id: 8,
    title: "Sabarimala Pilgrimage",
    src: "/Gallery/sabari-malai-1.webp",
  },
  {
    id: 9,
    title: "Yercaud Hill Station",
    src: "/Gallery/yercurd1.webp",
  },
];

export default function TravelGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section className="w-full tracking-wide bg-white px-4 py-10 pb-20 overflow-hidden text-slate-900 relative">
      <div className="max-w-7xl mx-auto  space-y-10">
        

      </div>
      <div className="relative w-full  max-w-7xl mx-auto ">

        <Swiper
          key={activeCategory} // Force re-render when switching filter category
          modules={[Autoplay, FreeMode]}
          loop={true}
          speed={4000}
          freeMode={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView="auto"
          spaceBetween={24}
          className="w-full !py-4"
        >
          {filteredImages.map((img) => (
            <SwiperSlide
              key={img.id}
              className="!w-[280px] sm:!w-[340px]"
            >
              <div
                onClick={() => setSelectedImage(img)}
                className="group relative h-72 rounded-[2rem] overflow-hidden bg-slate-900  shadow-xs  transition-all duration-500 cursor-pointer"
              >
                {/* Image */}
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 280px, 340px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110  group-hover:opacity-100"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-blue-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Floating Preview Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-white space-y-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white  transition-colors line-clamp-1">
                    {img.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-blue-950 rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center border border-white/20 hover:bg-orange-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-96 sm:h-[480px] w-full bg-slate-900">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 bg-white text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                <div className="space-y-1">

                  <h3 className="text-md uppercase text-slate-800 font-bold">{selectedImage.title}</h3>
                </div>

                <a
                  href="https://wa.me/919489485353?text=Hi%2C%20I%20want%20to%20plan%20a%20trip%20to%20this%20destination"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs uppercase  py-3 px-6 rounded-full shadow-lg transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Trip Here</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}