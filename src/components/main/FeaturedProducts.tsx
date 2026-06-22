'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IProduct, ICategory } from '@/types';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [whatsapp, setWhatsapp] = useState<string>('918871822944');

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []));
    fetch('/api/contact-info')
      .then((r) => r.json())
      .then((data) => {
        if (data?.whatsapp) setWhatsapp(data.whatsapp);
      });
  }, []);

  if (products.length === 0) return null;

  const doubled = [...products, ...products, ...products];

  return (
    <section style={{ background: '#f5f5f5', padding: '60px 0', overflow: 'hidden' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 16px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 900, color: '#1a1a1a', textTransform: 'uppercase', margin: 0 }}>
          Our Featured Products
        </h2>
        <div style={{ width: '60px', height: '3px', background: '#cc0000', margin: '12px auto' }}></div>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
          Premium machinery engineered for durability, performance & efficiency
        </p>
      </div>

      {/* Slider */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div className="marquee-track" style={{ gap: '20px', padding: '10px 0' }}>
          {doubled.map((product, index) => (
            <ProductCard 
              key={`${product._id}-${index}`}
              product={product}
              whatsapp={whatsapp}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: IProduct;
  whatsapp: string;
}

function ProductCard({ product, whatsapp }: ProductCardProps) {
  const router = useRouter();
  const price = product.price || 0;
  const discountPercent = product.discount_percent || 0;
  const showPrice = product.show_price || false;

  const discountedPrice = price && discountPercent
    ? Math.round(price - (price * discountPercent / 100))
    : price;

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Hello, I am interested in ${product.name}. Please share more details.`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/product/${product.slug}`);
  };

  return (
    <div
      onClick={() => router.push(`/product/${product.slug}`)}
      style={{
        width: '260px',
        flexShrink: 0,
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)';
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '190px', background: '#f0f0f0', overflow: 'hidden' }}>
        {product.images?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#999', fontSize: '12px' }}>No Image</span>
          </div>
        )}
        {/* Badges */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {product.is_featured && (
            <span style={{ background: '#f5a623', color: '#1a1a1a', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
              FEATURED
            </span>
          )}
          {discountPercent > 0 && (
            <span style={{ background: '#16a34a', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
              {discountPercent}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Category */}
        {product.category && typeof product.category === 'object' && (product.category as ICategory).name && (
          <span style={{ background: '#cc0000', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', display: 'inline-block', width: 'fit-content' }}>
            {(product.category as ICategory).name}
          </span>
        )}

        {/* Name */}
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', margin: 0, lineHeight: '1.3',
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {product.name}
        </h3>

        {/* Description */}
        {product.short_description && (
          <p style={{ fontSize: '12px', color: '#666', margin: 0,
            overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {product.short_description}
          </p>
        )}

        {/* Price */}
        {showPrice && price > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <span style={{ fontSize: '17px', fontWeight: 800, color: '#1a1a1a' }}>
              ₹{discountedPrice.toLocaleString('en-IN')}
            </span>
            {discountPercent > 0 && (
              <span style={{ fontSize: '13px', color: '#999', textDecoration: 'line-through' }}>
                ₹{price.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        )}

        {/* Buttons */}
        <div style={{ marginTop: 'auto', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={handleWhatsApp}
            style={{ background: '#cc0000', color: '#fff', border: 'none', borderRadius: '8px',
              padding: '10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            ENQUIRE ON WHATSAPP
          </button>

          <button
            onClick={handleViewDetails}
            style={{ background: '#fff', color: '#cc0000', border: '2px solid #cc0000',
              borderRadius: '8px', padding: '8px', fontSize: '11px', fontWeight: 700,
              cursor: 'pointer' }}
          >
            VIEW DETAILS
          </button>
        </div>
      </div>
    </div>
  );
}
