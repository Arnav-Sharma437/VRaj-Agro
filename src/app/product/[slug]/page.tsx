import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, Star } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import ContactInfo from '@/models/ContactInfo';
import ProductGallery from '@/components/main/ProductGallery';
import ProductTabs from '@/components/main/ProductTabs';
import ProductCard from '@/components/main/ProductCard';
import { IProduct, ICategory } from '@/types';
import { SUB_CATEGORIES } from '@/lib/categories-data';
import { getProductSubCategory } from '@/components/main/ShopPageClient';

if (Category) {
  // no-op
}

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// 1. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  await dbConnect();
  const product = await Product.findOne({ slug: params.slug, is_active: true }).lean();

  if (!product) {
    return {
      title: 'Product Not Found | V.Raj Agro',
      description: 'The requested agricultural product could not be found.',
    };
  }

  const prodName = product.name as string;
  const prodDesc = (product.short_description || 'Product details from V.Raj Agro') as string;

  return {
    title: `${prodName} | V.Raj Agro`,
    description: prodDesc,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  await dbConnect();

  // Fetch the product populated with category
  const productLean = await Product.findOne({ slug: params.slug, is_active: true })
    .populate('category')
    .lean();

  if (!productLean) {
    notFound();
  }

  const product = JSON.parse(JSON.stringify(productLean)) as IProduct;
  const categoryObj = product.category as ICategory;
  const categoryName = categoryObj?.name || 'Machine';

  const resolvedSubSlug = getProductSubCategory(product);
  const subCategoryObj = resolvedSubSlug
    ? SUB_CATEGORIES.find(s => s.categorySlug === categoryObj?.slug && s.slug === resolvedSubSlug)
    : null;
  const subCategoryName = subCategoryObj?.name || '';

  // Fetch contact details for WhatsApp and calling buttons
  const contactLean = await ContactInfo.findOne({}).lean();
  const contact = contactLean ? JSON.parse(JSON.stringify(contactLean)) : null;

  const phone = contact?.phone || '+91-8871822944';
  const cleanPhone = phone.split(',')[0].trim().replace(/[^0-9+]/g, '');
  const rawWhatsapp = contact?.whatsapp || '918871822944';
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '');

  const whatsappMessage = encodeURIComponent(`Hello, I am interested in ${product.name}. Please share more details.`);
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`;

  // Fetch related products belonging to the same category (excluding current product)
  const categoryId = categoryObj?._id;
  const relatedProductsLean = await Product.find({
    is_active: true,
    category: categoryId,
    _id: { $ne: product._id },
  })
    .populate('category')
    .limit(4)
    .lean();

  const relatedProducts = JSON.parse(JSON.stringify(relatedProductsLean)) as IProduct[];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-8 uppercase">
          <Link href="/" className="hover:text-[#cc0000] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/shop" className="hover:text-[#cc0000] transition-colors">
            Products
          </Link>
          {categoryObj && (
            <>
              <span>&gt;</span>
              <Link href={`/shop?category=${categoryObj.slug}`} className="hover:text-[#cc0000] transition-colors">
                {categoryObj.name}
              </Link>
            </>
          )}
          {subCategoryObj && (
            <>
              <span>&gt;</span>
              <Link href={`/shop?category=${categoryObj.slug}&sub=${subCategoryObj.slug}`} className="hover:text-[#cc0000] transition-colors">
                {subCategoryObj.name}
              </Link>
            </>
          )}
          <span>&gt;</span>
          <span className="text-gray-900 font-extrabold truncate normal-case">{product.name}</span>
        </nav>

        {/* Two-Column Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 w-full">
            <ProductGallery images={product.images || []} name={product.name} />
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-6 space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-block bg-[#cc0000] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {categoryName}
                </span>
                {subCategoryName && (
                  <span className="inline-block bg-gray-100 text-gray-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-gray-200">
                    {subCategoryName}
                  </span>
                )}
                {product.show_price && product.price !== undefined && product.price > 0 && product.discount_percent !== undefined && product.discount_percent > 0 && (
                  <span className="inline-block bg-[#22c55e] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {product.discount_percent}% OFF
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1a1a] leading-tight">
                {product.name}
              </h1>
              {product.show_price && product.price !== undefined && product.price > 0 && (
                <div className="flex items-baseline gap-3 mt-3 mb-2">
                  <span className="text-3xl font-extrabold text-gray-900">
                    ₹{Math.round(product.price - (product.price * (product.discount_percent || 0) / 100)).toLocaleString('en-IN')}
                  </span>
                  {product.discount_percent !== undefined && product.discount_percent > 0 && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              )}
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Overview</h3>
              <p className="text-[#444444] text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {product.short_description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-150">
              
              {/* WhatsApp Enquiry Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-3 bg-[#cc0000] hover:bg-[#aa0000] text-white px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {/* Custom WhatsApp Green-filled Icon */}
                <svg
                  className="w-5 h-5 fill-current text-[#25d366]"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.022-.08-.5-.204-.627-.25-.13-.047-.215-.07-.31-.018-.095.053-.37.283-.453.336-.083.053-.167.08-.31.018-.143-.062-.605-.223-1.152-.712-.425-.379-.713-.847-.796-.983-.084-.136-.01-.21.058-.277.062-.06.136-.16.204-.24.07-.08.092-.136.138-.227.045-.09.022-.167-.01-.23-.03-.063-.302-.728-.415-.992-.11-.264-.22-.228-.3-.23-.078-.002-.167-.002-.257-.002-.09 0-.236.034-.36.168-.124.134-.475.465-.475 1.135 0 .67.487 1.317.555 1.41.07.09.96 1.465 2.327 2.054.325.14.58.223.778.286.327.104.624.09.86.055.263-.04 1.258-.515 1.434-1.012.176-.5.176-.928.123-1.018zM12.016 2.006c-5.5 0-9.98 4.47-9.98 9.98 0 1.76.46 3.48 1.33 5L2.006 22l5.16-1.35c1.47.8 3.12 1.22 4.84 1.22 5.5 0 9.98-4.47 9.98-9.98 0-5.5-4.48-9.98-9.98-9.98zm0 18.294c-1.55 0-3.08-.42-4.41-1.2l-.32-.19-3.27.86.87-3.19-.21-.34c-.85-1.36-1.3-2.94-1.3-4.57 0-4.62 3.76-8.38 8.38-8.38 4.62 0 8.38 3.76 8.38 8.38 0 4.62-3.76 8.38-8.38 8.38z" />
                </svg>
                <span>Enquire on WhatsApp</span>
              </a>

              {/* Call Us Now Button */}
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#cc0000] hover:bg-red-50 text-[#cc0000] px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300"
              >
                <Phone size={16} />
                <span>Call Us Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Product Details Tabs Section */}
        <div className="mt-12">
          <ProductTabs
            description={product.full_description || product.short_description}
            specifications={product.specifications}
            applications={product.applications}
          />
        </div>

        {/* Features Section */}
        {product.features && product.features.length > 0 && (
          <div className="mt-12 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-xl font-extrabold text-[#1a1a1a] tracking-wide flex items-center gap-2">
              <span className="text-[#f5a623]">★</span> Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex gap-3 items-start p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                  <Star className="text-[#f5a623] fill-[#f5a623] shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-[#1a1a1a] font-semibold leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <h2 className="text-2xl font-extrabold text-[#1a1a1a]">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <div key={relProduct._id} className="h-full">
                  <ProductCard product={relProduct} whatsappNumber={rawWhatsapp} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
