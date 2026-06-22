'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IBanner } from '@/types';

export default function HeroSlider() {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners');
        if (res.ok) {
          const data = await res.json();
          setBanners(data);
        }
      } catch (err) {
        console.error('Failed to fetch banners', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const nextSlide = useCallback(() => {
    if (banners.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    if (banners.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  }, [banners.length]);

  // Autoplay effect
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [banners.length, nextSlide]);

  if (loading) {
    return (
      <div className="w-full h-[280px] md:h-[550px] bg-gray-150 animate-pulse flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-64 bg-gray-300 rounded mx-auto" />
          <div className="h-4 w-96 bg-gray-300 rounded mx-auto" />
          <div className="h-10 w-32 bg-gray-300 rounded mx-auto" />
        </div>
      </div>
    );
  }

  // Fallback slide if no active banners found
  if (banners.length === 0) {
    return (
      <div className="relative w-full h-[280px] md:h-[550px] bg-gradient-to-r from-[#1a1a1a] via-[#2d2d2d] to-[#111111] flex items-center justify-center text-white px-4">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 max-w-4xl text-center space-y-5 md:space-y-6">
          <span className="inline-block bg-[#cc0000]/20 text-[#cc0000] px-4 py-1.5 rounded text-xs md:text-sm font-bold tracking-widest uppercase border border-[#cc0000]/30">
            Welcome to V.Raj Agro
          </span>
          <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tight leading-tight max-w-3xl mx-auto">
            Quality Agricultural & Construction Machinery
          </h1>
          <p className="text-xs md:text-lg text-gray-300 max-w-2xl mx-auto font-medium">
            Serving India since 1998 — Trusted by farmers & builders
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block bg-[#cc0000] hover:bg-[#aa0000] text-white px-8 py-3 rounded text-sm md:text-base font-bold uppercase tracking-wider shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[280px] md:h-[550px] overflow-hidden group">
      {/* Slides */}
      {banners.map((banner, index) => (
        <div
          key={banner._id || index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Desktop Image */}
          <div className="hidden md:block relative w-full h-full">
            <Image
              src={banner.image_desktop}
              alt={banner.title || 'Promotional Banner'}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Mobile Image */}
          <div className="block md:hidden relative w-full h-full">
            <Image
              src={banner.image_mobile}
              alt={banner.title || 'Promotional Banner'}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Dark Overlay with content */}
          <div className="absolute inset-0 bg-black/55 z-20 flex items-center px-6 md:px-16 lg:px-24 py-4">
            <div className="max-w-3xl space-y-2 md:space-y-6 text-white">
              {banner.subtitle && (
                <span className="inline-block bg-[#f5a623]/25 text-[#f5a623] px-3 py-1 rounded text-sm md:text-xl font-bold tracking-wider uppercase border border-[#f5a623]/30 animate-fadeIn">
                  {banner.subtitle}
                </span>
              )}
              <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                {banner.title}
              </h2>
              {banner.cta_text && banner.cta_link && (
                <div className="pt-2">
                  <Link
                    href={banner.cta_link}
                    className="inline-block bg-[#cc0000] hover:bg-[#aa0000] text-white px-7 py-3 rounded text-xs md:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {banner.cta_text}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows (Only show if multiple banners) */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-[#cc0000] hover:bg-[#aa0000] text-white p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-[#cc0000] hover:bg-[#aa0000] text-white p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-[#cc0000]' : 'w-2.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
