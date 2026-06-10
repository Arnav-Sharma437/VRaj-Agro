'use client';

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import CrudModal from '@/components/admin/CrudModal';
import Toast from '@/components/ui/Toast';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { ITestimonial } from '@/types';
import { Plus, User } from 'lucide-react';

const defaultForm: Partial<ITestimonial> = {
  customer_name: '',
  location: '',
  review: '',
  image: '',
  order: 0,
  is_active: true,
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ITestimonial | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string>('');
  const [formData, setFormData] = useState<Partial<ITestimonial>>(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/testimonials');
      if (!res.ok) throw new Error('Failed to fetch testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error(error);
      showToast('Error loading testimonials data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData(defaultForm);
    setModalOpen(true);
  };

  const openEditModal = (item: ITestimonial) => {
    setEditingItem(item);
    setFormData({
      customer_name: item.customer_name,
      location: item.location || '',
      review: item.review,
      image: item.image || '',
      order: item.order ?? 0,
      is_active: item.is_active ?? true,
    });
    setModalOpen(true);
  };

  const openDeleteDialog = (item: ITestimonial) => {
    if (item._id) {
      setDeletingId(item._id);
      setConfirmOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingItem ? `/api/testimonials/${editingItem._id}` : '/api/testimonials';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save testimonial');

      showToast(editingItem ? 'Testimonial updated successfully!' : 'Testimonial created successfully!', 'success');
      setModalOpen(false);
      fetchTestimonials();
    } catch (error) {
      console.error(error);
      showToast('Error saving testimonial. Verify field entries.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/testimonials/${deletingId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete testimonial');

      showToast('Testimonial deleted successfully!', 'success');
      setConfirmOpen(false);
      fetchTestimonials();
    } catch (error) {
      console.error(error);
      showToast('Failed to delete testimonial.', 'error');
    }
  };

  const columns = [
    {
      header: 'Image',
      accessor: (row: ITestimonial) => (
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
          {row.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={row.image} alt={row.customer_name} className="w-full h-full object-cover" />
          ) : (
            <User size={16} className="text-gray-400" />
          )}
        </div>
      ),
    },
    { header: 'Customer', accessor: (row: ITestimonial) => <span className="font-bold text-gray-900">{row.customer_name}</span> },
    { header: 'Location', accessor: (row: ITestimonial) => row.location || 'N/A' },
    {
      header: 'Review',
      accessor: (row: ITestimonial) => (
        <span className="text-xs text-gray-500 max-w-xs block truncate" title={row.review}>
          {row.review}
        </span>
      ),
    },
    { header: 'Order', accessor: (row: ITestimonial) => String(row.order ?? 0) },
    {
      header: 'Status',
      accessor: (row: ITestimonial) => (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
          row.is_active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'
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
          <h1 className="text-3xl font-bold text-[#2d6a4f]">Manage Testimonials</h1>
          <p className="text-sm text-gray-500 mt-1">Review, approve, and order customer feedback displayed on the public site.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
        >
          <Plus size={18} />
          <span>Add New</span>
        </button>
      </div>

      <DataTable<ITestimonial>
        data={testimonials}
        columns={columns}
        onEdit={openEditModal}
        onDelete={openDeleteDialog}
        loading={loading}
      />

      {/* Form Modal */}
      <CrudModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Testimonial' : 'Create Testimonial'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name</label>
              <input
                type="text"
                required
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location / Designation</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
                placeholder="e.g. Farmer, Gujarat"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
              placeholder="https://example.com/customer-photo.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Review</label>
            <textarea
              rows={4}
              required
              value={formData.review}
              onChange={(e) => setFormData({ ...formData, review: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
              placeholder="Write customer feedback review here..."
            />
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
                Is Active (Show in testimonial carousels)
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
              {submitting ? 'Saving...' : 'Save Testimonial'}
            </button>
          </div>
        </form>
      </CrudModal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Testimonial?"
        message="Are you sure you want to delete this customer feedback? This will remove it from the home page."
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
