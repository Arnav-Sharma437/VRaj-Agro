import React from 'react';
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

// Redesigned AEC-Style AboutSection (Why Choose Us & Who Are We)
function AboutSection() {
  const features = [
    { title: 'High-Quality Machinery', desc: 'Premium materials and heavy-duty steel for long-lasting structural performance.' },
    { title: 'Advanced Technology', desc: 'Modern automated fabrication processes ensuring maximum field efficiency.' },
    { title: 'Expert Support', desc: 'Prompt and reliable after-sales field support and spare parts supply.' },
    { title: 'On-Time Delivery', desc: 'Well-connected logistics network delivering machinery across India without delays.' },
  ];

  return (
    <section className="py-20 bg-white px-4 md:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Industrial Fabrication Image */}
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

          {/* Right Column: Text Content & 2x3 Grid */}
          <div className="lg:col-span-7 space-y-6">
            <AnimateOnScroll direction="right" delay={0.2}>
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] uppercase tracking-tight">
                  Who Are We?
                </h2>
                <div className="w-16 h-1 bg-[#cc0000] rounded" />
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-4">
                Founded in 1998, V.Raj Agro has built a strong reputation as a manufacturer of high-quality Concrete Mixer Machines and a wide range of agricultural machinery. With decades of experience and an unwavering commitment to excellence, we continuously meet the evolving needs of construction and agriculture sectors.
              </p>

              {/* 2x3 Grid of AEC-Style Numbered Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6">
                {features.map((feat, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                    {/* Number Badge with check icon */}
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#f5a623] bg-white shadow-sm shrink-0">
                      <Check size={18} className="text-[#f5a623] stroke-[3]" />
                      <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#cc0000] bg-[#cc0000] font-black text-[9px] text-white">
                        {index + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs md:text-sm text-[#1a1a1a] uppercase tracking-wide">
                        {feat.title}
                      </h4>
                      <p className="text-[11px] md:text-xs text-gray-500 leading-normal">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

// New Factory & Warehouse Gallery Showcase
function FactorySection() {
  const factoryImages = [
    { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop', title: 'Precision Component Engineering' },
    { url: 'https://images.unsplash.com/photo-1565034946487-077786996e27?w=800&h=600&fit=crop', title: 'Heavy Metal Welding Shop' },
    { url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop', title: 'Machinery Fabrication Bay' },
    { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop', title: 'Final Inspection & Quality Control' },
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Block */}
        <AnimateOnScroll direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] tracking-tight uppercase">
              Our Factory & Warehouse
            </h2>
            <div className="w-16 h-1 bg-[#cc0000] mx-auto rounded" />
            <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">
              Our advanced machinery fabrication and steel processing facility.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {factoryImages.map((img, idx) => (
            <AnimateOnScroll key={idx} delay={idx * 0.1} direction="up">
              <div className="relative group overflow-hidden rounded-2xl aspect-[4/3] shadow-md border border-gray-150 bg-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">
                    {img.title}
                  </span>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
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
      <FactorySection />
      <FeaturedProducts />
      <VideoSection />
      <TestimonialsSection />
    </div>
  );
}
