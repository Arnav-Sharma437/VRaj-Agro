import { MetadataRoute } from 'next'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'

export const dynamic = 'force-dynamic';

interface SitemapProduct {
  slug: string;
  updatedAt?: string | Date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vrajagro.in'

  let productUrls: MetadataRoute.Sitemap = []

  try {
    await dbConnect()
    // Fetch active products directly from MongoDB
    const products = await Product.find({ is_active: true }).select('slug updatedAt').lean() as unknown as SitemapProduct[]
    
    if (Array.isArray(products)) {
      productUrls = products
        .filter((p) => p.slug)
        .map((p) => ({
          url: `${baseUrl}/product/${p.slug}`,
          lastModified: new Date(p.updatedAt || Date.now()),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
    }
  } catch (e) {
    console.error('Sitemap product fetch error:', e)
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...productUrls,
  ]
}
