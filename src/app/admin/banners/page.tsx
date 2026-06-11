'use client';

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import CrudModal from '@/components/admin/CrudModal';
import Toast from '@/components/ui/Toast';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import ImageUpload from '@/components/ui/ImageUpload';
import { IBanner } from '@/types';
import { Plus } from 'lucide-react';

const defaultForm: Partial<IBanner> = {
  title: '',
  subtitle: '',
  image_desktop: '',
  image_mobile: '',
  cta_text: '',
  cta_link: '',
  order: 0,
  is_active: true,
};

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IBanner | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string>('');
  const [formData, setFormData] = useState<Partial<IBanner>>(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/banners');
      if (!res.ok) throw new Error('Failed to fetch banners');
      const data = await res.json();
      setBanners(data);
    } catch (error) {
      console.error(error);
      showToast('Error loading banners data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchBanners();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData(defaultForm);
    setModalOpen(true);
  };

  const openEditModal = (item: IBanner) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      subtitle: item.subtitle || '',
      image_desktop: item.image_desktop,
      image_mobile: item.image_mobile,
      cta_text: item.cta_text || '',
      cta_link: item.cta_link || '',
      order: item.order ?? 0,
      is_active: item.is_active ?? true,
    });
    setModalOpen(true);
  };

  const openDeleteDialog = (item: IBanner) => {
    if (item._id) {
      setDeletingId(item._id);
      setConfirmOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingItem ? `/api/banners/${editingItem._id}` : '/api/banners';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save banner');

      showToast(editingItem ? 'Banner updated successfully!' : 'Banner created successfully!', 'success');
      setModalOpen(false);
      fetchBanners();
    } catch (error) {
      console.error(error);
      showToast('Error saving banner. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/banners/${deletingId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete banner');

      showToast('Banner deleted successfully!', 'success');
      setConfirmOpen(false);
      fetchBanners();
    } catch (error) {
      console.error(error);
      showToast('Failed to delete banner.', 'error');
    }
  };

  const columns = [
    { header: 'Title', accessor: (row: IBanner) => <span className="font-bold text-gray-900">{row.title}</span> },
    {
      header: 'Desktop Image',
      accessor: (row: IBanner) => (
        <a href={row.image_desktop} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline truncate max-w-xs block">
          {row.image_desktop}
        </a>
      ),
    },
    {
      header: 'Mobile Image',
      accessor: (row: IBanner) => (
        <a href={row.image_mobile} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline truncate max-w-xs block">
          {row.image_mobile}
        </a>
      ),
    },
    { header: 'Order', accessor: (row: IBanner) => String(row.order ?? 0) },
    {
      header: 'Status',
      accessor: (row: IBanner) => (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
          row.is_active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-55 text-gray-600 border-gray-200'
        }`}>
          {row.is_active ? 'Active' : 'Draft'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2d6a4f]">Manage Banners</h1>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or remove promotional banners from the public home page slider.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
        >
          <Plus size={18} />
          <span>Add New</span>
        </button>
      </div>

      <DataTable<IBanner>
        data={banners}
        columns={columns}
        onEdit={openEditModal}
        onDelete={openDeleteDialog}
        loading={loading}
      />

      {/* Form Modal */}
      <CrudModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Promotional Banner' : 'Create Promotional Banner'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUpload
              value={formData.image_desktop || ''}
              onChange={(url) => setFormData({ ...formData, image_desktop: url })}
              label="Desktop Image"
            />
            <ImageUpload
              value={formData.image_mobile || ''}
              onChange={(url) => setFormData({ ...formData, image_mobile: url })}
              label="Mobile Image"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">CTA Button Text (Optional)</label>
              <input
                type="text"
                value={formData.cta_text}
                onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
                placeholder="e.g. Shop Now"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">CTA Button Link (Optional)</label>
              <input
                type="text"
                value={formData.cta_link}
                onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
                placeholder="e.g. /shop"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Display Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
              />
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-[#2d6a4f] focus:ring-[#2d6a4f]"
              />
              <label htmlFor="is_active" className="ml-2 block text-sm font-semibold text-gray-700">
                Is Active (Visible to users)
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-150 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#2d6a4f] hover:bg-[#1b4332] rounded-lg transition-colors focus:outline-none disabled:opacity-70"
            >
              {submitting ? 'Saving...' : 'Save Banner'}
            </button>
          </div>
        </form>
      </CrudModal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Banner?"
        message="Are you sure you want to delete this promotional banner? This action is permanent."
      />

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
