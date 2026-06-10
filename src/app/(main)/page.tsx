import React from 'react';
import HeroSlider from '@/components/main/HeroSlider';
import CategorySection from '@/components/main/CategorySection';
import FeaturedProducts from '@/components/main/FeaturedProducts';
import TestimonialsSection from '@/components/main/TestimonialsSection';
import VideoSection from '@/components/main/VideoSection';

export default function HomePage() {
  // Pass empty arrays for clean, compile-ready initial state
  return (
    <div className="space-y-6">
      <HeroSlider banners={[]} />
      <CategorySection categories={[]} />
      <FeaturedProducts products={[]} />
      <VideoSection videos={[]} />
      <TestimonialsSection testimonials={[]} />
    </div>
  );
}
