import React from 'react';
import { ITestimonial } from '@/types';

interface TestimonialsSectionProps {
  testimonials: ITestimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h2>
        {testimonials.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No testimonials available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t._id} className="border p-6 rounded-lg shadow-sm bg-gray-50 flex flex-col justify-between">
                <p className="text-gray-600 italic">&ldquo;{t.review}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  {t.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.image} alt={t.customer_name} className="w-10 h-10 rounded-full object-cover" />
                  )}
                  <div>
                    <h4 className="font-bold text-gray-900">{t.customer_name}</h4>
                    {t.location && <p className="text-xs text-gray-500">{t.location}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
