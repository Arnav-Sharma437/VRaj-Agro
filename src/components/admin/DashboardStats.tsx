import React from 'react';

interface DashboardStatsProps {
  bannersCount: number;
  categoriesCount: number;
  productsCount: number;
  testimonialsCount: number;
  videosCount: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  bannersCount,
  categoriesCount,
  productsCount,
  testimonialsCount,
  videosCount,
}) => {
  const stats = [
    { label: 'Banners', value: bannersCount },
    { label: 'Categories', value: categoriesCount },
    { label: 'Products', value: productsCount },
    { label: 'Testimonials', value: testimonialsCount },
    { label: 'Videos', value: videosCount },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
