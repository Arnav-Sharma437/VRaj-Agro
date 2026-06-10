import React from 'react';
import { IVideo } from '@/types';

interface VideoSectionProps {
  videos: IVideo[];
}

export const VideoSection: React.FC<VideoSectionProps> = ({ videos }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Videos & Guides</h2>
        {videos.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No videos available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((v) => (
              <div key={v._id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="aspect-video bg-gray-200 relative h-48 flex items-center justify-center">
                  {v.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Thumbnail Placeholder
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900">{v.title}</h3>
                  <a href={v.video_url} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-900 font-medium text-sm mt-2 inline-block">
                    Watch Video →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
