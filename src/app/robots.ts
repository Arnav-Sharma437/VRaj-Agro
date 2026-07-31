import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/bdis87oanxje1/',
    },
    sitemap: 'https://vrajagro.in/sitemap.xml',
  }
}
