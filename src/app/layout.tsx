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
