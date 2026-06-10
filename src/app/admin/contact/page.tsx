'use client';

import React, { useState, useEffect } from 'react';
import Toast from '@/components/ui/Toast';
import { IContactInfo } from '@/types';
import { Save } from 'lucide-react';

const defaultForm: IContactInfo = {
  business_name: '',
  address: '',
  phone: '',
  whatsapp: '',
  email: '',
  map_embed_url: '',
};

export default function AdminContactPage() {
  const [formData, setFormData] = useState<IContactInfo>(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const fetchContactInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact-info');
      if (!res.ok) throw new Error('Failed to fetch contact info');
      const data = await res.json();
      setFormData(data);
    } catch (error) {
      console.error(error);
      showToast('Error loading contact settings data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchContactInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/contact-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save contact settings');

      const data = await res.json();
      setFormData(data);
      showToast('Contact information saved successfully!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Error saving contact settings. Please check fields.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-[#f8fffe]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2d6a4f] mb-2"></div>
        <span className="text-sm text-gray-500 font-medium">Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#2d6a4f]">Contact Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure business name, phone numbers, email, physical address, and map location displayed on the public site contact page.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                required
                value={formData.business_name}
                onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Number</label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Office Address</label>
            <textarea
              rows={3}
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
              placeholder="Enter complete office address..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Google Maps Embed URL</label>
            <input
              type="text"
              value={formData.map_embed_url}
              onChange={(e) => setFormData({ ...formData, map_embed_url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
          </div>

          {formData.map_embed_url && formData.map_embed_url.startsWith('https://') && (
            <div className="border border-gray-150 rounded-xl overflow-hidden h-48 bg-gray-100">
              <iframe
                title="Google Maps Embed Preview"
                src={formData.map_embed_url}
                className="w-full h-full border-none"
                loading="lazy"
              ></iframe>
            </div>
          )}

          <div className="pt-4 border-t border-gray-150 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm disabled:opacity-70 focus:outline-none"
            >
              <Save size={18} />
              <span>{saving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Toast Alert */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
