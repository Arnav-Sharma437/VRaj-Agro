import React from 'react';
import { IBanner } from '@/types';

interface HeroSliderProps {
  banners: IBanner[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ banners }) => {
  return (
    <div className="relative w-full h-[500px] bg-gray-100 flex items-center justify-center overflow-hidden">
      {banners.length === 0 ? (
        <div className="text-center p-4">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to Vraj Agro</h1>
          <p className="text-gray-600 mt-2">Quality Agricultural Products & Services</p>
        </div>
      ) : (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${banners[0].image_desktop})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-center">{banners[0].title}</h1>
            {banners[0].subtitle && <p className="text-lg md:text-2xl mt-4 text-center">{banners[0].subtitle}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
