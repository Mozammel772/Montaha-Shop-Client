"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// ✅ IMPORT WEBP IMAGES
import bannerOne from "@/assets/images/heroBanner/multi-items.webp";
import bannerTwo from "@/assets/images/heroBanner/shopping-cart-bd-banner-1.webp";
import bannerThree from "@/assets/images/heroBanner/shopping-cart-bd-banner-2.webp";

import sideImageOne from "@/assets/images/heroBanner/right-1.webp";
import sideImageTwo from "@/assets/images/heroBanner/right-2.webp";

const banners = [bannerOne, bannerTwo, bannerThree];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  // ✅ AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // ✅ NEXT SLIDE
  const nextSlide = () => {
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  // ✅ PREV SLIDE
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  return (
    <section className="w-full bg-[#F1F5F9] py-6 px-2">
      <div className="max-w-[1600px] mx-auto">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* ================= MAIN SLIDER ================= */}
          <div className="lg:col-span-8 relative overflow-hidden rounded-lg">
            {/* SLIDES */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {banners.map((banner, index) => (
                <div key={index} className="min-w-full">
                  <Image
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 70vw"
                    className="w-full h-[220px] md:h-[420px] object-cover"
                  />
                </div>
              ))}
            </div>

            {/* LEFT BUTTON */}
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-7 w-7 md:h-11 md:w-11 rounded-full bg-[#0f3ea9] text-white flex items-center justify-center shadow-lg hover:scale-105 duration-300 z-20"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* RIGHT BUTTON */}
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-7 w-7 md:h-11 md:w-11 rounded-full bg-[#0f3ea9] text-white flex items-center justify-center shadow-lg hover:scale-105 duration-300 z-20"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* DOTS */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-5 md:w-6 bg-orange-500"
                      : "w-2 bg-orange-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-1.5 md:gap-3">
            {/* TOP CARD */}
            <div className="relative overflow-hidden rounded-lg group h-24 md:h-[200px]">
              <Image
                src={sideImageOne}
                alt="Fashion Banner"
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
                className="object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent"></div>

              {/* CONTENT */}
              <div className="absolute top-3 md:top-8 left-3 md:left-6 z-10">
                <p className="text-xs md:text-[28px] leading-[18px] md:leading-[34px] font-bold text-[#032b75] max-w-[120px] md:max-w-[240px]">
                  New Summer Fashion
                </p>

                <p className="text-orange-500 font-semibold mt-1 md:mt-2 text-[10px] md:text-lg">
                  Handbag
                </p>
              </div>
            </div>

            {/* BOTTOM CARD */}
            <div className="relative overflow-hidden rounded-lg group h-24 md:h-[200px]">
              <Image
                src={sideImageTwo}
                alt="Cream Banner"
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
                className="object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent"></div>

              {/* CONTENT */}
              <div className="absolute top-3 md:top-8 left-3 md:left-6 z-10">
                <p className="text-xs md:text-[28px] leading-[18px] md:leading-[34px] font-bold text-[#032b75] max-w-[120px] md:max-w-[240px]">
                  Vibrant Avocado Hand Cream
                </p>

                <p className="text-orange-500 font-semibold mt-1 md:mt-2 text-[10px] md:text-lg">
                  Cream
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
