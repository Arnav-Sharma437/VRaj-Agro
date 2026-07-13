import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import HeroSlider from '@/components/main/HeroSlider';
import CategorySection from '@/components/main/CategorySection';
import StatsBar from '@/components/main/StatsBar';
import FeaturedProducts from '@/components/main/FeaturedProducts';
import VideoSection from '@/components/main/VideoSection';
import TestimonialsSection from '@/components/main/TestimonialsSection';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export const metadata = {
  title: 'V.Raj Agro | Concrete Mixers & Agricultural Machinery Manufacturer',
  description: 'V.Raj Agro is a premier manufacturer of high-quality Concrete Mixer Machines and agricultural equipment since 1998. Trusted by builders and farmers across India.',
};

// Inline AboutSection Component
function AboutSection() {
  const features = [
    { title: 'High-Quality Machinery', desc: 'Premium materials for long-lasting performance' },
    { title: 'Advanced Technology', desc: 'Modern manufacturing for better efficiency' },
    { title: 'Expert Support', desc: 'Dedicated after-sales service team' },
    { title: 'On-Time Delivery', desc: 'Reliable delivery across all locations' },
    { title: 'Wide Range', desc: 'From concrete mixers to agricultural threshers' },
    { title: 'Cost-Effective', desc: 'Best quality at competitive prices' },
  ];

  return (
    <section className="py-20 bg-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image */}
          <div className="lg:col-span-5">
            <AnimateOnScroll direction="left">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg bg-gray-100 border border-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
                  alt="V.Raj Agro Machinery Manufacturing"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Column: Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <AnimateOnScroll direction="right" delay={0.2}>
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] uppercase tracking-tight">
                  Who Are We?
                </h2>
                <div className="w-16 h-1 bg-[#cc0000] rounded" />
              </div>

              <p className="text-[#444444] text-sm md:text-base leading-relaxed mt-4">
                Founded in 1998, V.Raj Agro has built a strong reputation as a manufacturer of high-quality Concrete Mixer Machines and a wide range of agricultural machinery. With decades of experience and an unwavering commitment to excellence, we continuously meet the evolving needs of construction and agriculture sectors.
              </p>

              {/* 2x3 Grid of feature cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 pt-6">
                {features.map((feat, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl border border-gray-50 bg-gray-50/30 hover:border-[#f5a623]/20 hover:bg-[#f5a623]/5 transition-all duration-300">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f5a623]/10 text-[#f5a623] shrink-0 mt-0.5">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a1a1a] text-xs md:text-sm uppercase tracking-wide">
                        {feat.title}
                      </h4>
                      <p className="text-[#666] text-xs mt-1 leading-normal">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center bg-[#cc0000] hover:bg-[#aa0000] text-white px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider shadow hover:shadow-md transition-all duration-300 hover:translate-x-1"
                >
                  Know More &rarr;
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="pb-0 overflow-hidden">
      <HeroSlider />
      <CategorySection />
      <StatsBar />
      <AboutSection />
      <FeaturedProducts />
      <VideoSection />
      <TestimonialsSection />
    </div>
  );
}
