'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Image,
  Tag,
  Package,
  Video,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Banners', href: '/admin/banners', icon: Image },
    { label: 'Categories', href: '/admin/categories', icon: Tag },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Videos', href: '/admin/videos', icon: Video },
    { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-white">
      {/* Branding */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-white h-[73px]">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo/logo.jpg"
            alt="V.Raj Agro Logo"
            width={130}
            height={50}
            className="object-contain h-10 w-auto"
          />
        </Link>
        {/* Mobile close button */}
        <button onClick={toggleSidebar} className="md:hidden text-gray-800 hover:text-[#cc0000] focus:outline-none">
          <X size={20} />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#cc0000] text-white shadow-md'
                  : 'text-gray-200 hover:text-white hover:bg-[#cc0000]/15'
              }`}
            >
              <IconComponent size={18} className={isActive ? 'text-white' : 'text-gray-300'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#cc0000]/15 transition-colors focus:outline-none"
        >
          <LogOut size={18} className="text-gray-300" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-white text-gray-900 border-b border-gray-150 px-4 py-4 w-full sticky top-0 z-40 shadow-sm h-[73px]">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo/logo.jpg"
            alt="V.Raj Agro Logo"
            width={120}
            height={40}
            className="object-contain h-8 w-auto"
          />
        </Link>
        <button onClick={toggleSidebar} className="text-gray-700 hover:text-[#cc0000] transition-colors focus:outline-none">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={toggleSidebar} />
          {/* Menu Drawer */}
          <div className="relative w-64 max-w-xs flex-1 flex flex-col bg-[#1a1a1a]">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 shrink-0 h-screen sticky top-0 z-30 shadow-xl border-r border-gray-800">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
