'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { IContactInfo } from '@/types';

const defaultContact = {
  business_name: "V.Raj Agro",
  address: "V. Raj Agro Beside New Petrol Pump, Seepat Road Mopka, Bilaspur Chhattisgarh 495001",
  phone: "+91-8871822944",
  whatsapp: "918871822944",
  email: "vrajagrobilaspurcg@gmail.com",
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
          if (data && data.business_name && data.address !== 'V. Raj Agro Beside New Petrol Pump, Seepat Road Mopka, Bilaspur Chhattisgarh 495001') {
            setContactInfo(data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch contact info for footer', err);
      }
    };
    fetchContact();
  }, []);

  const whatsappNumber = contactInfo.whatsapp || '918871822944';
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

            {/* Social Media Row */}
            <div className="space-y-2 pt-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Follow Us</h4>
              <div className="flex gap-2.5">
                <a
                  href="https://wa.me/918871822944"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 hover:scale-110 text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@VRajAgro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 hover:scale-110 text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="YouTube"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M23.498 6.163c-.272-1.016-1.071-1.815-2.087-2.087C19.57 3.5 12 3.5 12 3.5s-7.57 0-9.41.576C1.574 4.348.775 5.147.502 6.163 0 8.003 0 12 0 12s0 3.997.502 5.837c.273 1.016 1.071 1.815 2.087 2.087 1.84.576 9.41.576 9.41.576s7.57 0 9.41-.576c1.016-.272 1.815-1.071 2.087-2.087.502-1.84.502-5.837.502-5.837s0-3.997-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/themachinejunction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 hover:scale-110 text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/share/18B8RM6Udc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#1877f2] hover:bg-[#166fe5] hover:scale-110 text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
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
