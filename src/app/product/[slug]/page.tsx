import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import ContactInfo from '@/models/ContactInfo';
import ProductGallery from '@/components/main/ProductGallery';
import ProductTabs from '@/components/main/ProductTabs';
import ProductCard from '@/components/main/ProductCard';
import { IProduct, ICategory } from '@/types';

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
          <div className="lg:col-span-6 space-y-4">
            {/* Category badge */}
            {categoryObj && (
              <span className="inline-block bg-[#cc0000] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {categoryName}
              </span>
            )}
            
            <h1 className="text-2xl font-bold text-[#1a1a1a] leading-tight">
              {product.name}
            </h1>
            
            <div className="border-t border-gray-100 my-3"></div>
            
            <p className="text-[#555] text-sm leading-relaxed whitespace-pre-wrap">
              {product.short_description}
            </p>
            
            {/* Two buttons */}
            <div className="mt-4 space-y-2 max-w-md">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25d366] text-white rounded-xl py-3 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Enquire on WhatsApp</span>
              </a>
              <a
                href={`tel:${cleanPhone}`}
                className="w-full flex items-center justify-center gap-2 border-2 border-[#cc0000] text-[#cc0000] rounded-xl py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-50 transition-colors"
              >
                <Phone size={16} />
                <span>Call Us Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Product Details Tabs Section */}
        <div className="mt-12 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <ProductTabs
            description={product.full_description || product.short_description}
            specifications={product.specifications}
            applications={product.applications}
          />
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <h2 className="text-2xl font-extrabold text-[#1a1a1a]">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <div key={relProduct._id} className="h-full">
                  <ProductCard product={relProduct} whatsapp={rawWhatsapp} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
