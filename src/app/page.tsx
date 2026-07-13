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

// Redesigned AEC-Style AboutSection (Why Choose Us)
function AboutSection() {
  const features = [
    { title: 'High-Quality Machinery', desc: 'Premium materials and heavy-duty steel for long-lasting structural performance.' },
    { title: 'Advanced Technology', desc: 'Modern automated fabrication processes ensuring maximum field efficiency.' },
    { title: 'Expert Support', desc: 'Prompt and reliable after-sales field support and spare parts supply.' },
    { title: 'On-Time Delivery', desc: 'Well-connected logistics network delivering machinery across India without delays.' },
    { title: 'Wide Range', desc: 'Diverse selection from industrial concrete mixers to agricultural threshers.' },
    { title: 'Cost-Effective', desc: 'Factory-direct competitive pricing without compromising build standard.' },
  ];

  return (
    <section className="py-20 bg-white px-4 md:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Block */}
        <AnimateOnScroll direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] tracking-tight uppercase">
              Why Choose V.Raj Agro?
            </h2>
            <div className="w-16 h-1 bg-[#cc0000] mx-auto rounded" />
            <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">
              Decades of experience delivering quality construction & agricultural solutions.
            </p>
          </div>
        </AnimateOnScroll>

        {/* 3-Column Grid of AEC-Style Numbered Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <AnimateOnScroll key={index} delay={index * 0.08} direction="up">
              <div className="flex flex-col items-center text-center p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                {/* Number Badge with check icon */}
                <div className="relative mb-6 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border-[3px] border-[#f5a623] bg-white shadow-sm shrink-0">
                  <Check size={28} className="text-[#f5a623] stroke-[3]" />
                  <span className="absolute -bottom-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#cc0000] bg-[#cc0000] font-black text-xs text-white">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-3 font-bold text-sm md:text-base text-[#1a1a1a] uppercase tracking-wide">
                  {feat.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed flex-1">
                  {feat.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
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

// New Founder's Message Callout Block
function FounderMessage() {
  return (
    <section className="bg-[#1a1a1a] text-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll direction="up">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0e0e0e] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 md:p-12 lg:p-16 items-center">
              {/* Founder Image */}
              <div className="lg:col-span-5 flex justify-center lg:justify-start">
                <div className="relative aspect-[4/5] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-gray-900">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=625&fit=crop"
                    alt="V.Raj Agro Founder"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 30vw"
                  />
                </div>
              </div>

              {/* Message Content */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold text-[#f5a623] uppercase tracking-widest block">
                  FOUNDER&apos;S MESSAGE
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                  Decades of Dedication
                </h2>
                <div className="w-16 h-1 bg-[#cc0000]" />
                <p className="text-white/80 text-sm md:text-base leading-relaxed italic font-medium">
                  &ldquo;When we laid the foundation of V.Raj Agro in 1998, it was with a deep-seated commitment to deliver premium-grade construction and agricultural machinery. Over the last 25 years, our goal has remained unchanged: providing unparalleled quality, long-term machinery value, and immediate support. We are proud partners in building India&apos;s agricultural and structural future.&rdquo;
                </p>
                <div>
                  <h4 className="font-extrabold text-white text-base">V. Raj</h4>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mt-0.5">
                    Founder & Principal Director, V.Raj Agro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
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
      <FounderMessage />
      <TestimonialsSection />
    </div>
  );
}
