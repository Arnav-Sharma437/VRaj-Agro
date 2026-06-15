'use client';

import React, { useState } from 'react';

export default function AboutImage() {
  const formats = ['jpg', 'png', 'jpeg', 'webp'];
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (index < formats.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div className="relative bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center h-[350px] sm:h-[400px]">
        <div className="bg-white p-6 rounded-full shadow-md text-[#cc0000] mb-4">
          {/* Tractor SVG Icon */}
          <svg
            className="w-16 h-16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="6" cy="18" r="3" />
            <circle cx="6" cy="18" r="1" />
            <circle cx="17" cy="16" r="5" />
            <circle cx="17" cy="16" r="2" />
            <path d="M9 18h3" />
            <path d="M12 18v-8h5" />
            <path d="M17 11h2l1 4h-2" />
            <path d="M12 10V6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v4" />
            <path d="M10 10V7" />
            <path d="M9 7h2" />
            <path d="M5 15h4" />
            <path d="M3 15h1" />
          </svg>
        </div>
        <p className="text-gray-500 font-semibold text-lg">V.Raj Agro Machinery</p>
        <p className="text-gray-400 text-sm mt-1 max-w-xs">Concrete Mixers, Chaff Cutters, Agricultural Threshers & Water Tankers</p>
      </div>
    );
  }

  const currentSrc = `/images/about/about.${formats[index]}`;

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-150 bg-gray-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentSrc}
        alt="V.Raj Agro"
        className="w-full h-full object-cover rounded-2xl"
        onError={handleError}
      />
    </div>
  );
}
