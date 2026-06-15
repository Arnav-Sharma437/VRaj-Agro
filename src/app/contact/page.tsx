import React from 'react';
import ContactPageClient from '@/components/main/ContactPageClient';

export const metadata = {
  title: 'Contact Us | V.Raj Agro',
  description: 'Get in touch with V.Raj Agro. Call us at +91-9300311126 or visit us at Bilaspur, Chhattisgarh.'
};

export default function ContactPage() {
  return (
    <main>
      <ContactPageClient />
    </main>
  );
}
