'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { IContactInfo } from '@/types';

export default function Footer() {
  const [contactInfo, setContactInfo] = useState<IContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch('/api/contact-info');
        if (res.ok) {
          const data = await res.json();
          setContactInfo(data);
        }
      } catch (err) {
        console.error('Failed to fetch contact info for footer', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  const whatsappNumber = contactInfo?.whatsapp || '';
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = cleanNumber
    ? `https://wa.me/${cleanNumber}`
    : '#';

  return (
    <footer className="bg-[#1b4332] text-green-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-12 border-b border-green-800">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-white">
                VRaj <span className="text-[#52b788]">Agro</span>
              </span>
            </Link>
            <p className="text-green-200/80 text-sm leading-relaxed max-w-sm">
              Empowering farmers with high-quality seeds, organic fertilizers, and state-of-the-art agricultural supplies for maximum crop yields and sustainability.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-green-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-green-200 hover:text-white transition-colors">
                  Shop Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-green-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-green-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Contact Us</h3>
            <ul className="space-y-3.5 text-sm">
              {loading ? (
                <>
                  <div className="h-4 w-3/4 bg-green-900/60 animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-green-900/60 animate-pulse rounded" />
                  <div className="h-4 w-2/3 bg-green-900/60 animate-pulse rounded" />
                </>
              ) : (
                <>
                  {contactInfo?.address && (
                    <li className="flex items-start gap-3">
                      <MapPin size={18} className="text-[#52b788] shrink-0 mt-0.5" />
                      <span className="text-green-200/90">{contactInfo.address}</span>
                    </li>
                  )}
                  {contactInfo?.phone && (
                    <li className="flex items-center gap-3">
                      <Phone size={18} className="text-[#52b788] shrink-0" />
                      <a href={`tel:${contactInfo.phone}`} className="text-green-200 hover:text-white transition-colors">
                        {contactInfo.phone}
                      </a>
                    </li>
                  )}
                  {contactInfo?.whatsapp && (
                    <li className="flex items-center gap-3">
                      <MessageCircle size={18} className="text-[#52b788] shrink-0" />
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-green-200 hover:text-white transition-colors">
                        {contactInfo.whatsapp} (WhatsApp)
                      </a>
                    </li>
                  )}
                  {contactInfo?.email && (
                    <li className="flex items-center gap-3">
                      <Mail size={18} className="text-[#52b788] shrink-0" />
                      <a href={`mailto:${contactInfo.email}`} className="text-green-200 hover:text-white transition-colors">
                        {contactInfo.email}
                      </a>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-green-300/60">
          <p>© {new Date().getFullYear()} VRaj Agro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
