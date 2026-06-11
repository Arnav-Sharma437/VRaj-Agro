'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageSquare } from 'lucide-react';
import { IContactInfo } from '@/types';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<IContactInfo | null>(null);
  const [loadingContact, setLoadingContact] = useState(true);
  const [logoIndex, setLogoIndex] = useState(0);
  const logoExtensions = ['png', 'jpg', 'jpeg', 'webp', 'svg'];

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

  const whatsappNumber = contactInfo?.whatsapp || '919300311126';
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = encodeURIComponent("Hello V.Raj Agro, I would like to request a quote.");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/shop' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-white py-4 border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {logoIndex < logoExtensions.length ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/images/logo/logo.${logoExtensions[logoIndex]}`}
                alt="V.Raj Agro Logo"
                width={150}
                height={60}
                onError={() => setLogoIndex((prev) => prev + 1)}
                className="object-contain h-12 w-auto"
              />
            ) : (
              <span className="text-2xl font-black tracking-tight text-[#cc0000] uppercase">
                V.Raj <span className="text-[#1a1a1a]">Agro</span>
              </span>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                  isActive(link.href)
                    ? 'text-[#cc0000]'
                    : 'text-gray-700 hover:text-[#cc0000]'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#cc0000] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Request a Quote Button */}
          <div className="hidden md:block">
            {loadingContact ? (
              <div className="h-10 w-40 bg-gray-100 animate-pulse rounded" />
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#aa0000] text-white px-5 py-2.5 rounded text-sm font-bold uppercase tracking-wider shadow-sm transition-all duration-305 hover:-translate-y-0.5"
              >
                <MessageSquare size={16} className="fill-current" />
                <span>Request a Quote</span>
              </a>
            )}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-750 hover:text-[#cc0000] focus:outline-none transition-colors"
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
          mobileMenuOpen
            ? 'max-h-screen opacity-100 border-t border-gray-100 bg-white mt-3'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded text-base font-bold uppercase tracking-wider transition-colors ${
                isActive(link.href)
                  ? 'bg-red-50 text-[#cc0000]'
                  : 'text-gray-750 hover:bg-gray-50 hover:text-[#cc0000]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 px-3">
            {loadingContact ? (
              <div className="h-10 w-full bg-gray-100 animate-pulse rounded" />
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#cc0000] hover:bg-[#aa0000] text-white py-3 rounded text-base font-bold uppercase tracking-wider shadow transition-all"
              >
                <MessageSquare size={18} className="fill-current" />
                <span>Request a Quote</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
