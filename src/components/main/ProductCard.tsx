'use client'
import { useRouter } from 'next/navigation'
import { IProduct, ICategory } from '@/types'

interface ProductCardProps {
  product: IProduct
  whatsapp?: string
  whatsappNumber?: string
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()

  const categoryName = product.category && typeof product.category === 'object'
    ? (product.category as ICategory).name
    : '';

  return (
    <div
      onClick={() => router.push(`/product/${product.slug}`)}
      style={{
        background: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #eee',
        height: '100%',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      {/* IMAGE */}
      <div style={{ height: '180px', background: '#f5f5f5', overflow: 'hidden', position: 'relative' }}>
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
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#ccc',
          }}>
            <svg width="36" height="36" fill="none" stroke="#ccc" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
        )}
      </div>

      {/* BODY */}
      <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Category */}
        {categoryName && (
          <span style={{
            fontSize: '10px', fontWeight: 700,
            color: '#cc0000', textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            {categoryName}
          </span>
        )}

        {/* Name */}
        <h3 style={{
          fontSize: '14px', fontWeight: 700,
          color: '#1a1a1a', margin: 0,
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.name}
        </h3>

        {/* View Details Button */}
        <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
          <button
            style={{
              width: '100%',
              background: '#cc0000',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '9px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
