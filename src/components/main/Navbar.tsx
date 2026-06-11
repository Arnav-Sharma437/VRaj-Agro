'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';
import { IContactInfo } from '@/types';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<IContactInfo | null>(null);
  const [loadingContact, setLoadingContact] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch('/api/contact-info');
        if (res.ok) {
          const data = await res.json();
          setContactInfo(data);
        }
      } catch (err) {
        console.error('Failed to fetch contact info', err);
      } finally {
        setLoadingContact(false);
      }
    };
    fetchContact();
  }, []);

  // Format whatsapp link
  const whatsappNumber = contactInfo?.whatsapp || '';
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = cleanNumber
    ? `https://wa.me/${cleanNumber}`
    : '#';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-white py-4 border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tight text-[#2d6a4f] transition-colors duration-300 group-hover:text-[#1b4332]">
              VRaj <span className="text-[#52b788]">Agro</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-semibold transition-colors duration-300 ${
                  isActive(link.href)
                    ? 'text-[#2d6a4f]'
                    : 'text-gray-600 hover:text-[#2d6a4f]'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2d6a4f] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* WhatsApp Button (Desktop) */}
          <div className="hidden md:block">
            {loadingContact ? (
              <div className="h-10 w-32 bg-gray-100 animate-pulse rounded-full" />
            ) : whatsappNumber ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm hover:shadow transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle size={18} className="fill-current" />
                <span>WhatsApp</span>
              </a>
            ) : null}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-650 hover:text-[#2d6a4f] focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-screen opacity-100 border-t border-gray-100 bg-white mt-3' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-semibold transition-colors ${
                isActive(link.href)
                  ? 'bg-green-50 text-[#2d6a4f]'
                  : 'text-gray-750 hover:bg-gray-50 hover:text-[#2d6a4f]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 px-3">
            {loadingContact ? (
              <div className="h-10 w-full bg-gray-100 animate-pulse rounded-xl" />
            ) : whatsappNumber ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#2d6a4f] hover:bg-[#1b4332] text-white py-3 rounded-xl text-base font-bold shadow-sm transition-all"
              >
                <MessageCircle size={20} className="fill-current" />
                <span>Enquire on WhatsApp</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
