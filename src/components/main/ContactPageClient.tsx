'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { IContactInfo } from '@/types';

export default function ContactPageClient() {
  const [contactInfo, setContactInfo] = useState<IContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch contact info on load
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch('/api/contact-info');
        if (res.ok) {
          const data = await res.json();
          setContactInfo(data);
        } else {
          console.error(`Failed to fetch contact info. Status code: ${res.status}`);
        }
      } catch (err) {
        console.error('Failed to fetch contact info:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#cc0000]"></div>
          <span className="text-sm text-gray-500 font-medium">Loading contact details...</span>
        </div>
      </div>
    );
  }

  // Parse details with fallbacks
  const address = contactInfo?.address || 'V. Raj Agro Beside New Petrol Pump, Seepat Road Mopka, Bilaspur Chhattisgarh 495001';
  const emailVal = contactInfo?.email || 'vrajagrobilaspurcg@gmail.com';
  const rawPhones = contactInfo?.phone || '+91-8871822944';
  const phonesList = rawPhones.split(',').map((p) => p.trim());
  const mainPhoneClean = phonesList[0].replace(/[^0-9+]/g, '');

  const rawWhatsapp = contactInfo?.whatsapp || '918871822944';
  const whatsappClean = rawWhatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappClean}`;

  const mapEmbedUrl = contactInfo?.map_embed_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.5!2d82.1504!3d22.0896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDA1JzIyLjYiTiA4MsKwMDknMDEuNCJF!5e0!3m2!1sen!2sin!4v1234567890';

  return (
    <div className="bg-white min-h-screen relative">
      {/* Section 1: Page Banner */}
      <section className="bg-[#cc0000] text-white h-[200px] flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact Us</h1>
          <nav className="mt-2 flex items-center text-sm font-medium opacity-90">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-white/80">Contact Us</span>
          </nav>
        </div>
      </section>

      {/* Section 2: Contact Info Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Location */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
            <div className="bg-red-50 p-4 rounded-full text-[#cc0000] mb-5 group-hover:bg-[#cc0000] group-hover:text-white transition-colors duration-300">
              <MapPin size={32} />
            </div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Our Location</h3>
            <p className="text-[#444444] text-sm leading-relaxed max-w-xs">{address}</p>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
            <div className="bg-red-50 p-4 rounded-full text-[#cc0000] mb-5 group-hover:bg-[#cc0000] group-hover:text-white transition-colors duration-300">
              <Phone size={32} />
            </div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Call Us</h3>
            <div className="space-y-1 text-[#444444] text-sm font-medium">
              {phonesList.map((phone, idx) => {
                const phoneClean = phone.replace(/[^0-9+]/g, '');
                return (
                  <a 
                    key={idx} 
                    href={`tel:${phoneClean}`}
                    className="block hover:text-[#cc0000] transition-colors"
                  >
                    {phone}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
            <div className="bg-red-50 p-4 rounded-full text-[#cc0000] mb-5 group-hover:bg-[#cc0000] group-hover:text-white transition-colors duration-300">
              <Mail size={32} />
            </div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Email Us</h3>
            <a 
              href={`mailto:${emailVal}`}
              className="text-[#444444] text-sm hover:text-[#cc0000] transition-colors font-medium break-all"
            >
              {emailVal}
            </a>
          </div>
        </div>
      </section>

      {/* Section 3: Google Map (Full Width) */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-sm border border-gray-150 relative">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="V.Raj Agro Location Map"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      </section>

      {/* Section 4: Quick Contact Buttons */}
      <section className="py-12 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1a1a] mb-2">Need Immediate Assistance?</h3>
          <p className="text-[#444444] text-sm sm:text-base mb-8 max-w-md mx-auto">Get in touch directly with our team for instant answers to your questions.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Green WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-md transition-all duration-350 hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageSquare size={20} className="fill-current" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Red Call Button */}
            <a
              href={`tel:${mainPhoneClean}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-md transition-all duration-350 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone size={20} />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
