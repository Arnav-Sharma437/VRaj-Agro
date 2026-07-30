import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import SessionProvider from '@/components/providers/SessionProvider';
import LayoutWrapper from '@/components/main/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://vrajagro.in'),
  title: {
    default: 'V.Raj Agro | Agricultural & Construction Machinery in Bilaspur',
    template: '%s | V.Raj Agro',
  },
  description: 'V.Raj Agro manufactures quality concrete mixer machines, chaff cutters, threshers & agricultural equipment in Bilaspur, Chhattisgarh since 1998.',
  icons: {
    icon: '/images/logo/logo.jpg',
  },
  verification: {
    google: 'YHLtFKEE9bZTXTlivj6m_BddoJ5nAJy_6XuZ1PQfriU',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-62PJMHBFG2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-62PJMHBFG2');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "V Raj Agro",
              "image": "https://www.vrajagro.in/images/logo/logo.jpg",
              "@id": "https://www.vrajagro.in/",
              "url": "https://www.vrajagro.in/",
              "telephone": "+91-8871822944",
              "email": "vrajagrobilaspurcg@gmail.com",
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Seepat Rd, beside Indian Oil Petrol Pump, Mopka",
                "addressLocality": "Bilaspur",
                "addressRegion": "Chhattisgarh",
                "postalCode": "495001",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://wa.me/918871822944",
                "https://www.youtube.com/@VRajAgro",
                "https://www.instagram.com/themachinejunction",
                "https://www.facebook.com/share/18B8RM6Udc/"
              ],
              "description": "V Raj Agro is a manufacturer of Concrete Mixer Machines and agricultural equipment based in Bilaspur, Chhattisgarh, trusted since 1998."
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
