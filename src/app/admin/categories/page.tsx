'use client';

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import CrudModal from '@/components/admin/CrudModal';
import Toast from '@/components/ui/Toast';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import ImageUpload from '@/components/ui/ImageUpload';
import { ICategory } from '@/types';
import { Plus, Tag } from 'lucide-react';

const defaultForm: Partial<ICategory> = {
  name: '',
  slug: '',
  image: '',
  description: '',
  is_active: true,
};

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ICategory | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string>('');
  const [formData, setFormData] = useState<Partial<ICategory>>(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
      showToast('Error loading categories data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData(defaultForm);
    setModalOpen(true);
  };

  const openEditModal = (item: ICategory) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      slug: item.slug,
      image: item.image || '',
      description: item.description || '',
      is_active: item.is_active ?? true,
    });
    setModalOpen(true);
  };

  const openDeleteDialog = (item: ICategory) => {
    if (item._id) {
      setDeletingId(item._id);
      setConfirmOpen(true);
    }
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: slugify(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingItem ? `/api/categories/${editingItem._id}` : '/api/categories';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save category');

      showToast(editingItem ? 'Category updated successfully!' : 'Category created successfully!', 'success');
      setModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error(error);
      showToast('Error saving category. Please check your inputs.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/categories/${deletingId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete category');

      showToast('Category deleted successfully!', 'success');
      setConfirmOpen(false);
      fetchCategories();
    } catch (error) {
      console.error(error);
      showToast('Failed to delete category.', 'error');
    }
  };

  const columns = [
    {
      header: 'Image',
      accessor: (row: ICategory) => (
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
          {row.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={row.image} alt={row.name} className="w-full h-full object-cover" />
          ) : (
            <Tag size={16} className="text-gray-400" />
          )}
        </div>
      ),
    },
    { header: 'Name', accessor: (row: ICategory) => <span className="font-bold text-gray-955">{row.name}</span> },
    { header: 'Slug', accessor: (row: ICategory) => <span className="text-xs text-gray-500 font-mono">{row.slug}</span> },
    {
      header: 'Status',
      accessor: (row: ICategory) => (
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
          <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Organize your products by creating and managing catalog categories.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#cc0000] hover:bg-[#aa0000] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
        >
          <Plus size={18} />
          <span>Add New</span>
        </button>
      </div>

      <DataTable<ICategory>
        data={categories}
        columns={columns}
        onEdit={openEditModal}
        onDelete={openDeleteDialog}
        loading={loading}
      />

      {/* Form Modal */}
      <CrudModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Category' : 'Create Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (Auto-generated)</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-gray-50 font-mono focus:outline-none"
              />
            </div>
          </div>

          <ImageUpload
            value={formData.image || ''}
            onChange={(url) => setFormData({ ...formData, image: url })}
            label="Category Image"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-[#cc0000] focus:ring-[#cc0000]"
            />
            <label htmlFor="is_active" className="ml-2 block text-sm font-medium text-gray-700">
              Is Active (Show in navigation/shop catalog)
            </label>
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
              className="px-4 py-2 text-sm font-semibold text-white bg-[#cc0000] hover:bg-[#aa0000] rounded-lg transition-colors focus:outline-none disabled:opacity-70"
            >
              {submitting ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>
      </CrudModal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Category?"
        message="Are you sure you want to delete this category? All products under this category will need updated references."
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
