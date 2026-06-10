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
  Phone,
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
    { label: 'Contact Info', href: '/admin/contact', icon: Phone },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#1b4332] text-white">
      {/* Branding */}
      <div className="p-6 border-b border-[#2d6a4f] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="text-xl font-bold tracking-wide">VRaj Agro</span>
        </div>
        {/* Mobile close button */}
        <button onClick={toggleSidebar} className="md:hidden text-white/80 hover:text-white focus:outline-none">
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
                  ? 'bg-[#2d6a4f] text-[#f8fffe] shadow-md border-l-4 border-[#52b788]'
                  : 'text-white/70 hover:text-white hover:bg-[#2d6a4f]/40'
              }`}
            >
              <IconComponent size={18} className={isActive ? 'text-[#52b788]' : 'text-white/50'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-[#2d6a4f]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-200 hover:text-white hover:bg-red-950/40 transition-colors focus:outline-none"
        >
          <LogOut size={18} className="text-red-300/60" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-[#1b4332] text-white px-4 py-4 w-full sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌾</span>
          <span className="font-bold">VRaj Agro Admin</span>
        </div>
        <button onClick={toggleSidebar} className="text-white hover:text-[#52b788] transition-colors focus:outline-none">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={toggleSidebar} />
          {/* Menu Drawer */}
          <div className="relative w-64 max-w-xs flex-1 flex flex-col bg-[#1b4332]">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 shrink-0 h-screen sticky top-0 z-30 shadow-xl border-r border-[#2d6a4f]/20">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
