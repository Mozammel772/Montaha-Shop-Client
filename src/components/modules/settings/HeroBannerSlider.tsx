"use client";

import { SliderItem } from "@/services/settings/getHeroSliders";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  centerSliders: SliderItem[];
  leftSliders: SliderItem[];
}

const SlideImage = ({
  slider,
  priority,
  className,
  width,
  height,
  sizes,
}: {
  slider: SliderItem;
  priority?: boolean;
  className?: string;
  width: number;
  height: number;
  sizes: string;
}) => {
  const image = (
    <Image
      src={slider.imageUrl}
      alt={slider.title}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );

  // link থাকলে clickable
  if (slider.link) {
    return (
      <Link href={slider.link} className="block w-full h-full">
        {image}
      </Link>
    );
  }

  return image;
};

const HeroBannerSlider = ({ centerSliders, leftSliders }: Props) => {
  const [current, setCurrent] = useState(0);

  // auto slide
  useEffect(() => {
    if (centerSliders.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === centerSliders.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [centerSliders.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === centerSliders.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? centerSliders.length - 1 : prev - 1));
  };

  const hasLeft = leftSliders.length > 0;

  return (
    <section className="w-full bg-[#F1F5F9] py-6 px-2">
      <div className="max-w-[1400px] mx-auto">
        <div
          className={`grid grid-cols-1 gap-4 ${
            hasLeft ? "lg:grid-cols-12" : ""
          }`}
        >
          {/* BIG CENTER SLIDER */}
          {centerSliders.length > 0 && (
            <div
              className={`relative overflow-hidden rounded-2xl shadow-sm ${
                hasLeft ? "lg:col-span-9" : "w-full"
              }`}
            >
              {/* slides */}
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${current * 100}%)`,
                }}
              >
                {centerSliders.map((slider, index) => (
                  <div key={slider.id} className="min-w-full">
                    <SlideImage
                      slider={slider}
                      priority={index === 0}
                      width={1800}
                      height={700}
                      sizes="100vw"
                      className="w-full h-[230px] md:h-[520px] object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* navigation */}
              {centerSliders.length > 1 && (
                <>
                  {/* prev */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:scale-105 transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* next */}
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:scale-105 transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                    {centerSliders.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          current === index
                            ? "w-7 bg-orange-500"
                            : "w-2 bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* SMALL RIGHT SLIDERS */}
          {hasLeft && (
            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3">
              {leftSliders.slice(0, 2).map((slider, index) => (
                <div
                  key={slider.id}
                  className="overflow-hidden rounded-2xl shadow-sm h-[110px] md:h-[252px]"
                >
                  <SlideImage
                    slider={slider}
                    priority={index === 0}
                    width={600}
                    height={300}
                    sizes="30vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* only one left slider হলে placeholder */}
              {leftSliders.length === 1 && (
                <div className="rounded-2xl bg-slate-100 h-[110px] md:h-[252px]" />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBannerSlider;
