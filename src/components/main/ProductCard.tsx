'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { IProduct, ICategory } from '@/types'

interface ProductCardProps {
  product: IProduct
  whatsapp?: string
  whatsappNumber?: string
}

export default function ProductCard({ product, whatsapp, whatsappNumber }: ProductCardProps) {
  const router = useRouter()
  const activeWhatsapp = whatsapp || whatsappNumber || '918871822944'
  
  const price = product.price || 0
  const discountPercent = product.discount_percent || 0
  
  const discountedPrice = price && discountPercent > 0
    ? Math.round(price - (price * discountPercent / 100))
    : price

  const categoryName = product.category && typeof product.category === 'object' && 'name' in product.category
    ? (product.category as ICategory).name
    : '';

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation()
    const msg = `Hello, I am interested in ${product.name}. Please share more details.`
    window.open(`https://wa.me/${activeWhatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div
      onClick={() => router.push(`/product/${product.slug}`)}
      style={{
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #f0f0f0',
        height: '100%',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.14)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* IMAGE */}
      <div style={{ position: 'relative', height: '200px', background: '#f5f5f5', overflow: 'hidden' }}>
        {product.images?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: '#f0f0f0', color: '#bbb'
          }}>
            <svg width="40" height="40" fill="none" stroke="#bbb" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            <span style={{ fontSize: '11px', marginTop: '6px' }}>No Image</span>
          </div>
        )}

        {/* Badges */}
        <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {product.is_featured && (
            <span style={{
              background: '#f5a623', color: '#1a1a1a',
              fontSize: '10px', fontWeight: 700,
              padding: '2px 8px', borderRadius: '4px',
            }}>FEATURED</span>
          )}
          {discountPercent > 0 && (
            <span style={{
              background: '#16a34a', color: '#fff',
              fontSize: '10px', fontWeight: 700,
              padding: '2px 8px', borderRadius: '4px',
            }}>{discountPercent}% OFF</span>
          )}
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Category */}
        {categoryName && (
          <span style={{
            background: '#cc0000', color: '#fff',
            fontSize: '10px', fontWeight: 700,
            padding: '3px 10px', borderRadius: '999px',
            display: 'inline-block', width: 'fit-content',
          }}>
            {categoryName.toUpperCase()}
          </span>
        )}

        {/* Name */}
        <h3 style={{
          fontSize: '15px', fontWeight: 700,
          color: '#1a1a1a', margin: 0,
          lineHeight: '1.35',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.name}
        </h3>

        {/* Price */}
        {product.show_price && price > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
            <span style={{ fontSize: '17px', fontWeight: 800, color: '#1a1a1a' }}>
              ₹{discountedPrice.toLocaleString('en-IN')}
            </span>
            {discountPercent > 0 && (
              <span style={{ fontSize: '12px', color: '#999', textDecoration: 'line-through' }}>
                ₹{price.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        )}

        {/* WhatsApp Button */}
        <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
          <button
            onClick={handleWhatsApp}
            style={{
              width: '100%',
              background: '#25d366',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px',
            }}
          >
            <svg viewBox="0 0 24 24" fill="white" width="15" height="15">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Get Quote
          </button>
        </div>
      </div>
    </div>
  )
}
