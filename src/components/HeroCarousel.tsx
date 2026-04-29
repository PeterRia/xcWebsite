"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/data/home";

type HeroCarouselProps = {
  slides: HeroSlide[];
};

const HeroCarousel = ({ slides }: HeroCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = useMemo(() => slides[activeIndex], [slides, activeIndex]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-brand-700">
      <div className="relative mx-auto max-w-page px-[var(--section-padding-x)] py-0">
        <div className="relative h-[clamp(23rem,48vw,34rem)] overflow-hidden bg-brand-900 shadow-panel lg:h-[34rem]">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <article
                key={slide.title}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  isActive ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-hidden={!isActive}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/18 to-black/12" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 text-white md:p-10">
                  <div className="max-w-4xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/85">
                      {slide.eyebrow}
                    </p>
                    <h1 className="mt-4 max-w-4xl text-[clamp(1.9rem,4.3vw,4rem)] font-black leading-[0.94]">
                      {slide.title}
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 md:text-[1.03rem]">
                      {slide.description}
                    </p>
                  </div>
                  <Link
                    href={slide.href}
                    className="hidden rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white/95 transition-colors hover:bg-white/10 md:inline-flex"
                  >
                    查看详情
                  </Link>
                </div>
              </article>
            );
          })}

          <button
            type="button"
            aria-label="上一张"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/35"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="下一张"
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/35"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`切换到 ${slide.title}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  index === activeIndex ? "w-10 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-0 hidden h-full w-full bg-subtle-grid opacity-40 mix-blend-screen lg:block" />
      <div className="sr-only" aria-live="polite">
        {activeSlide.title}
      </div>
    </section>
  );
};

export default HeroCarousel;
