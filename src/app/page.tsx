import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import HeroSlider from '@/components/main/HeroSlider';
import CategorySection from '@/components/main/CategorySection';
import FeaturedProducts from '@/components/main/FeaturedProducts';
import VideoSection from '@/components/main/VideoSection';
import TestimonialsSection from '@/components/main/TestimonialsSection';

export const metadata = {
  title: 'V.Raj Agro | Concrete Mixers & Agricultural Machinery Manufacturer',
  description: 'V.Raj Agro is a premier manufacturer of high-quality Concrete Mixer Machines and agricultural equipment since 1998. Trusted by builders and farmers across India.',
};

// Inline StatsBar Component
function StatsBar() {
  const stats = [
    { value: '25+', label: 'Years Experience' },
    { value: '500+', label: 'Happy Clients' },
    { value: '50+', label: 'Products' },
    { value: '10+', label: 'States Served' },
  ];

  return (
    <section className="bg-[#222222] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-center space-y-1.5 ${
                idx < stats.length - 1 ? 'md:border-r md:border-gray-700' : ''
              }`}
            >
              <span className="text-3xl md:text-5xl font-black text-[#f5a623]">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-gray-400 font-bold uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Inline AboutSection Component
function AboutSection() {
  const checkmarks = [
    'High-Quality Machinery',
    'Advanced Technology',
    'Expert Support',
    'On-Time Delivery',
    'Wide Range',
    'Cost-Effective',
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image */}
          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-lg bg-gray-100 border border-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
              alt="V.Raj Agro Machinery Manufacturing"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-black text-[#222222] uppercase tracking-tight">
                Who Are We?
              </h2>
              <div className="w-16 h-1 bg-[#cc0000] rounded" />
            </div>

            <p className="text-gray-650 text-sm md:text-base leading-relaxed">
              Founded in 1998, V.Raj Agro has built a strong reputation as a manufacturer of high-quality Concrete Mixer Machines and a wide range of agricultural machinery. With decades of experience and an unwavering commitment to excellence, we continuously meet the evolving needs of construction and agriculture sectors.
            </p>

            {/* Why Choose Us checklist */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 pt-2">
              {checkmarks.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#f5a623]/10 text-[#f5a623] shrink-0">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-800 font-bold uppercase tracking-wide">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-[#cc0000] hover:bg-[#b30000] text-white px-7 py-3 rounded text-sm font-bold uppercase tracking-wider shadow hover:shadow-md transition-all duration-300 hover:translate-x-1"
              >
                Know More &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="pb-0">
      <HeroSlider />
      <StatsBar />
      <CategorySection />
      <AboutSection />
      <FeaturedProducts />
      <VideoSection />
      <TestimonialsSection />
    </div>
  );
}
