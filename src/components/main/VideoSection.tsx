'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { IVideo } from '@/types';

export default function VideoSection() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos');
        if (res.ok) {
          const data = await res.json();
          setVideos(data);
        }
      } catch (err) {
        console.error('Failed to fetch videos', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-[#ffffff] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="h-8 w-60 bg-gray-200 animate-pulse rounded mx-auto mb-3" />
            <div className="h-1 bg-red-650 w-16 mx-auto mb-3" />
            <div className="h-4 w-72 bg-gray-250 animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="aspect-video bg-gray-200 rounded w-full" />
                <div className="h-5 bg-gray-250 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If no videos, hide section completely
  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-[#ffffff] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Red Underline */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-[#222222] tracking-tight uppercase">
            Customer Success Stories
          </h2>
          <div className="w-20 h-1 bg-[#cc0000] mx-auto rounded" />
          <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">
            Watch our concrete mixers and agricultural machinery in action across farms and job sites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <a
              key={video._id}
              href={video.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block space-y-4"
            >
              {/* Thumbnail with red play button overlay */}
              <div className="relative aspect-video w-full rounded overflow-hidden shadow-sm group-hover:shadow-md transition-shadow bg-gray-100 border border-gray-200">
                <Image
                  src={video.thumbnail || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400'}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Red Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/45">
                  <div className="w-14 h-14 bg-[#cc0000] hover:bg-[#b30000] text-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                    <Play size={24} className="fill-current ml-1" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-gray-800 group-hover:text-[#cc0000] transition-colors duration-300 text-sm md:text-base leading-snug line-clamp-2 uppercase tracking-wide">
                {video.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
