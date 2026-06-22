'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import TopInfoBar from './TopInfoBar';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingSocial from './FloatingSocial';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff]">
      <TopInfoBar />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />

      <FloatingSocial />
    </div>
  );
}
