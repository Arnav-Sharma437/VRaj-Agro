'use client'
import { useRouter } from 'next/navigation'
import { IProduct, ICategory } from '@/types'

function getProductPlaceholder(productName: string, categoryName: string): string {
  const name = (productName + ' ' + categoryName).toLowerCase()
  if (name.includes('concrete') || name.includes('mixer')) 
    return 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=500&fit=crop'
  if (name.includes('water') || name.includes('tanker')) 
    return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=500&fit=crop'
  if (name.includes('chaff') || name.includes('cutter')) 
    return 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=500&fit=crop'
  if (name.includes('thresh')) 
    return 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=500&fit=crop'
  if (name.includes('tractor')) 
    return 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=500&fit=crop'
  if (name.includes('hand') || name.includes('trolley')) 
    return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=500&fit=crop'
  if (name.includes('pump') || name.includes('water')) 
    return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=500&fit=crop'
  return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=500&fit=crop'
}

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images?.[0] || getProductPlaceholder(product.name, categoryName)}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
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
