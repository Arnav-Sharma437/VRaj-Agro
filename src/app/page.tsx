import React from 'react';
import HeroSlider from '@/components/main/HeroSlider';
import CategorySection from '@/components/main/CategorySection';
import FeaturedProducts from '@/components/main/FeaturedProducts';
import VideoSection from '@/components/main/VideoSection';
import TestimonialsSection from '@/components/main/TestimonialsSection';

export const metadata = {
  title: 'VRaj Agro | Premium Agriculture Products & Seeds',
  description: 'Quality agricultural seeds, organic fertilizers, pesticides, and tools from VRaj Agro to enhance farming yields and sustainable agriculture.',
};

export default function HomePage() {
  return (
    <div className="space-y-4 md:space-y-8 pb-16">
      <HeroSlider />
      <CategorySection />
      <FeaturedProducts />
      <VideoSection />
      <TestimonialsSection />
    </div>
  );
}
