import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Banner from '@/models/Banner';
import Testimonial from '@/models/Testimonial';
import { Package, Tag, Image as ImageIcon, MessageSquare, Plus } from 'lucide-react';
import { IProduct, ICategory } from '@/types';

export default async function AdminDashboardPage() {
  let stats = {
    products: 0,
    categories: 0,
    banners: 0,
    testimonials: 0,
  };
  let recentProducts: IProduct[] = [];

  try {
    await dbConnect();

    // Fetch counts in parallel
    const [productsCount, categoriesCount, bannersCount, testimonialsCount] = await Promise.all([
      Product.countDocuments({}),
      Category.countDocuments({}),
      Banner.countDocuments({}),
      Testimonial.countDocuments({}),
    ]);

    stats = {
      products: productsCount,
      categories: categoriesCount,
      banners: bannersCount,
      testimonials: testimonialsCount,
    };

    // Fetch recent products populated with category
    const productsData = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('category', 'name')
      .lean();
    
    recentProducts = productsData as unknown as IProduct[];
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
  }

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
    { label: 'Total Categories', value: stats.categories, icon: Tag, color: 'text-[#f5a623]', bg: 'bg-amber-50 border-amber-100' },
    { label: 'Total Banners', value: stats.banners, icon: ImageIcon, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
    { label: 'Total Testimonials', value: stats.testimonials, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
  ];

  return (
    <div className="space-y-8 bg-gray-50 -m-8 p-8 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin</h1>
        <p className="text-gray-500 mt-1">Here is what is happening with VRaj Agro today.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white p-6 rounded-xl shadow flex items-center justify-between transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-600">{card.label}</span>
                <h3 className="text-3xl font-bold text-gray-900">{card.value}</h3>
              </div>
              <div className={`p-4 rounded-xl ${card.bg} border`}>
                <Icon size={24} className={card.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Recent Products (takes 2/3 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-150 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Products</h2>
            <Link href="/admin/products" className="text-sm text-[#cc0000] hover:text-[#aa0000] font-semibold transition-colors">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-150">
            {recentProducts.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No products found. Add some to get started!
              </div>
            ) : (
              recentProducts.map((product) => {
                const categoryObj = product.category as ICategory;
                return (
                  <div key={product._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors text-gray-800">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-150 overflow-hidden flex items-center justify-center border border-gray-200">
                        {product.images && product.images.length > 0 ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{product.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Category: <span className="font-medium">{categoryObj?.name || 'Uncategorized'}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.is_active ? 'bg-green-50 text-green-700 border border-green-150' : 'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}>
                        {product.is_active ? 'Active' : 'Draft'}
                      </span>
                      {product.is_featured && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-150">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Quick Actions (takes 1/3 col) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/products"
              className="flex items-center justify-between w-full p-4 rounded-xl border border-gray-200 hover:border-[#cc0000] hover:bg-red-50/20 group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-50 text-[#cc0000] group-hover:bg-[#cc0000] group-hover:text-white transition-colors">
                  <Plus size={18} />
                </div>
                <span className="text-sm font-semibold text-gray-700">Add New Product</span>
              </div>
            </Link>
            <Link
              href="/admin/categories"
              className="flex items-center justify-between w-full p-4 rounded-xl border border-gray-200 hover:border-[#cc0000] hover:bg-red-50/20 group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-50 text-[#cc0000] group-hover:bg-[#cc0000] group-hover:text-white transition-colors">
                  <Plus size={18} />
                </div>
                <span className="text-sm font-semibold text-gray-700">Add New Category</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
