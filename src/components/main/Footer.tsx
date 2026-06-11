'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { IContactInfo } from '@/types';

const defaultContact = {
  business_name: "V.Raj Agro",
  address: "V. Raj Agro Beside New Petrol Pump, Seepat Road Mopka, Bilaspur Chhattisgarh 495001",
  phone: "+91-9300311126, +91-8871822944",
  whatsapp: "919300311126",
  email: "mustafajabrot.vraj@gmail.com",
};

export default function Footer() {
  const [contactInfo, setContactInfo] = useState<IContactInfo | typeof defaultContact>(defaultContact);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch('/api/contact-info');
        if (res.ok) {
          const data = await res.json();
          // Check if data is not empty or a default template
          if (data && data.business_name && data.address !== '123 Agri Business Park, Gujarat, India') {
            setContactInfo(data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch contact info for footer', err);
      }
    };
    fetchContact();
  }, []);

  const whatsappNumber = contactInfo.whatsapp || '919300311126';
  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}`;

  const primaryPhone = contactInfo.phone.split(',')[0].trim();
  const cleanPhone = primaryPhone.replace(/[^0-9+]/g, '');

  return (
    <footer className="bg-[#1a1a1a] text-[#cccccc] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-[#cc0000] uppercase">
                V.Raj <span className="text-white">Agro</span>
              </span>
            </Link>
            <p className="text-sm font-semibold text-gray-300">
              Quality Machinery Since 1998
            </p>
            <p className="text-xs leading-relaxed text-gray-500">
              {contactInfo.address}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg uppercase tracking-wider border-b-2 border-[#cc0000] pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white hover:underline transition-colors">
                  Shop Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info & CTA */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg uppercase tracking-wider border-b-2 border-[#cc0000] pb-2 inline-block">
              Contact Info
            </h3>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#cc0000] shrink-0 mt-0.5" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#cc0000] shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#cc0000] shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                  {contactInfo.email}
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#cc0000] hover:bg-[#aa0000] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
              >
                <MessageCircle size={16} className="fill-current" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2 bg-[#cc0000] hover:bg-[#aa0000] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
              >
                <Phone size={14} />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Red Bottom Bar */}
      <div className="bg-[#cc0000] text-white py-4 text-center text-xs font-semibold tracking-wider">
        <p>© 2025 V.Raj Agro. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
