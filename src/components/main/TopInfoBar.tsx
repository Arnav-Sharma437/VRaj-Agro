'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail } from 'lucide-react';
import { IContactInfo } from '@/types';

export default function TopInfoBar() {
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
        console.error('Failed to fetch contact info for top bar', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  return (
    <div className="hidden md:block bg-[#cc0000] text-white py-2 border-b border-red-700 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <span className="font-semibold">Welcome to V.Raj Agro</span>
        </div>
        <div className="flex items-center gap-6">
          {loading ? (
            <div className="h-4 w-48 bg-red-800 animate-pulse rounded" />
          ) : (
            <>
              {contactInfo?.phone && (
                <a
                  href={`tel:${contactInfo.phone.split(',')[0].trim()}`}
                  className="flex items-center gap-1.5 hover:text-red-200 transition-colors"
                >
                  <Phone size={13} />
                  <span>{contactInfo.phone}</span>
                </a>
              )}
              {contactInfo?.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-1.5 hover:text-red-200 transition-colors"
                >
                  <Mail size={13} />
                  <span>{contactInfo.email}</span>
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
