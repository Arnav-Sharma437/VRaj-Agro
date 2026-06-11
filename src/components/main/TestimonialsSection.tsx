'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { ITestimonial } from '@/types';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data);
        }
      } catch (err) {
        console.error('Failed to fetch testimonials', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const nextSlide = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length, nextSlide]);

  if (loading) {
    return (
      <section className="py-16 bg-white border-t border-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-pulse">
          <div className="h-8 w-60 bg-gray-250 rounded mx-auto mb-3" />
          <div className="h-4 w-72 bg-gray-200 rounded mx-auto mb-10" />
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 space-y-6 max-w-2xl mx-auto">
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="w-5 h-5 bg-gray-200 rounded-full" />
              ))}
            </div>
            <div className="h-4 bg-gray-255 rounded w-full" />
            <div className="h-4 bg-gray-255 rounded w-5/6 mx-auto" />
            <div className="flex justify-center items-center gap-3 pt-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="text-left space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-3 bg-gray-200 rounded w-16" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no testimonials, hide section completely
  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  // Initials generator
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <section className="py-16 bg-white border-t border-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2d6a4f] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-medium">
            Read positive feedback from farmers and agri-businesses partnering with us.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-[#f8fffe] rounded-3xl border border-green-50 p-8 md:p-12 shadow-sm relative overflow-hidden transition-all duration-500">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* 5 Stars */}
              <div className="flex gap-1 justify-center text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} className="fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-gray-700 italic text-base md:text-lg leading-relaxed font-medium">
                &ldquo;{current.review}&rdquo;
              </blockquote>

              {/* User Identity */}
              <div className="flex items-center gap-3.5 pt-4">
                {current.image ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-green-100 bg-white">
                    <Image
                      src={current.image}
                      alt={current.customer_name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#95d5b2]/45 text-[#2d6a4f] flex items-center justify-center font-bold text-sm tracking-wide border border-[#95d5b2]/60">
                    {getInitials(current.customer_name)}
                  </div>
                )}
                <div className="text-left">
                  <h4 className="font-extrabold text-gray-900 text-sm md:text-base leading-tight">
                    {current.customer_name}
                  </h4>
                  {current.location && (
                    <p className="text-xs text-gray-550 font-medium">
                      {current.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dots Navigation (Only show if multiple testimonials) */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-6 bg-[#2d6a4f]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
