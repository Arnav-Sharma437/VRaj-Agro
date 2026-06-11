'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { ITestimonial } from '@/types';

// Fallback testimonials if DB is empty
const fallbackTestimonials: ITestimonial[] = [
  { customer_name: "Rajesh Patel", location: "Bhopal, MP", review: "The concrete mixer machine we purchased has been running flawlessly for over 2 years now. Excellent build quality and support.", is_active: true },
  { customer_name: "Amit Sharma", location: "Bilaspur, CG", review: "V.Raj Agro provides the best agricultural plows in Chhattisgarh. Heavy-duty construction and highly reliable field performance.", is_active: true },
  { customer_name: "Suresh Kumar", location: "Nagpur, MH", review: "Their customer service is outstanding. When we needed a replacement spare part for our trolley, they delivered it within 24 hours.", is_active: true },
  { customer_name: "Vikram Singh", location: "Jaipur, RJ", review: "Highly cost-effective mixers. Saved us a lot of labor cost on our rural construction sites. A trusted machinery brand indeed.", is_active: true }
];

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
    const list = testimonials.length > 0 ? testimonials : fallbackTestimonials;
    if (list.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % list.length);
  }, [testimonials.length]);

  useEffect(() => {
    const list = testimonials.length > 0 ? testimonials : fallbackTestimonials;
    if (list.length <= 1) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length, nextSlide]);

  if (loading) {
    return (
      <section className="py-16 bg-[#f5f5f5] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-pulse">
          <div className="h-8 w-60 bg-gray-250 rounded mx-auto mb-3" />
          <div className="h-1 bg-red-650 w-16 mx-auto mb-3" />
          <div className="h-4 w-72 bg-gray-200 rounded mx-auto mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="bg-white rounded p-6 shadow-sm space-y-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((x) => (
                    <div key={x} className="w-4 h-4 bg-gray-200 rounded-full" />
                  ))}
                </div>
                <div className="h-4 bg-gray-255 rounded w-full" />
                <div className="h-4 bg-gray-255 rounded w-5/6" />
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="space-y-1.5 text-left">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                    <div className="h-3 bg-gray-200 rounded w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const list = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  // If no testimonials, hide section completely
  if (list.length === 0) {
    return null;
  }

  // Get initials
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  // Get visible items for the multi-item slider layout
  const getVisibleTestimonials = () => {
    const visible = [];
    const count = list.length;
    
    // On mobile we show 1, on desktop we show up to 3
    // We add them in sequence starting from currentIndex
    for (let i = 0; i < Math.min(3, count); i++) {
      visible.push(list[(currentIndex + i) % count]);
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="py-16 bg-[#f5f5f5] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Red Underline */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] tracking-tight uppercase">
            What Our Clients Say
          </h2>
          <div className="w-20 h-1 bg-[#cc0000] mx-auto rounded" />
          <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">
            Hear from our satisfied contractors, farmers, and distributors nationwide.
          </p>
        </div>

        {/* Testimonials grid (slides based on currentIndex) */}
        <div className="relative">
          {/* Desktop/Tablet layout (displays up to 3 cards side-by-side) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
            {visibleTestimonials.map((item, idx) => (
              <div
                key={item._id || idx}
                className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col justify-between space-y-6 transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-[#f5a623]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} className="fill-current" />
                    ))}
                  </div>
                  {/* Review Text */}
                  <blockquote className="text-[#444444] italic text-sm leading-relaxed">
                    &ldquo;{item.review}&rdquo;
                  </blockquote>
                </div>

                {/* Identity */}
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 bg-white">
                      <Image
                        src={item.image}
                        alt={item.customer_name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#cc0000] text-white flex items-center justify-center font-bold text-xs border border-red-700">
                      {getInitials(item.customer_name)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] text-sm tracking-wide uppercase">
                      {item.customer_name}
                    </h4>
                    {item.location && (
                      <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                        {item.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Layout (displays 1 card) */}
          <div className="block md:hidden">
            <div className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex gap-1 text-[#f5a623]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="fill-current" />
                  ))}
                </div>
                <blockquote className="text-[#444444] italic text-sm leading-relaxed">
                  &ldquo;{list[currentIndex].review}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-3">
                {list[currentIndex].image ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 bg-white">
                    <Image
                      src={list[currentIndex].image!}
                      alt={list[currentIndex].customer_name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#cc0000] text-white flex items-center justify-center font-bold text-xs border border-red-700">
                    {getInitials(list[currentIndex].customer_name)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-[#1a1a1a] text-sm tracking-wide uppercase">
                    {list[currentIndex].customer_name}
                  </h4>
                  {list[currentIndex].location && (
                    <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                      {list[currentIndex].location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dot Navigation */}
          {list.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {list.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded transition-all duration-300 ${
                    index === currentIndex ? 'w-6 bg-[#cc0000]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
