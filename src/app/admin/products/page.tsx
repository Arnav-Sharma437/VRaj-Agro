'use client';

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import CrudModal from '@/components/admin/CrudModal';
import Toast from '@/components/ui/Toast';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import ImageUpload from '@/components/ui/ImageUpload';
import { IProduct, ICategory } from '@/types';
import { Plus, Trash2, Package } from 'lucide-react';

interface SpecPair {
  key: string;
  value: string;
}

interface ProductFormState {
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  category: string;
  images: string[];
  features: string[];
  applications: string[];
  is_featured: boolean;
  is_active: boolean;
  price: number;
  discount_percent: number;
  show_price: boolean;
}

const defaultForm: ProductFormState = {
  name: '',
  slug: '',
  short_description: '',
  full_description: '',
  category: '',
  images: [''],
  features: [''],
  applications: [''],
  is_featured: false,
  is_active: true,
  price: 0,
  discount_percent: 0,
  show_price: false,
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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IProduct | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string>('');
  const [formData, setFormData] = useState<ProductFormState>(defaultForm);
  const [specifications, setSpecifications] = useState<SpecPair[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
      ]);

      if (!prodRes.ok || !catRes.ok) throw new Error('Failed to fetch data');

      const prodData = await prodRes.json();
      const catData = await catRes.json();

      setProducts(prodData);
      setCategories(catData);
    } catch (error) {
      console.error(error);
      showToast('Error loading page data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchInitialData();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData(defaultForm);
    setSpecifications([]);
    setModalOpen(true);
  };

  const openEditModal = (item: IProduct) => {
    setEditingItem(item);
    const catId = typeof item.category === 'object' ? item.category._id || '' : item.category;

    setFormData({
      name: item.name,
      slug: item.slug,
      short_description: item.short_description,
      full_description: item.full_description || '',
      category: catId,
      images: item.images && item.images.length > 0 ? [...item.images] : [''],
      features: item.features && item.features.length > 0 ? [...item.features] : [''],
      applications: item.applications && item.applications.length > 0 ? [...item.applications] : [''],
      is_featured: item.is_featured ?? false,
      is_active: item.is_active ?? true,
      price: item.price ?? 0,
      discount_percent: item.discount_percent ?? 0,
      show_price: item.show_price ?? false,
    });

    // Parse specifications map to SpecPair array
    const specsMap = item.specifications || {};
    const specsArray: SpecPair[] = Object.entries(specsMap).map(([key, value]) => ({
      key,
      value,
    }));
    setSpecifications(specsArray);

    setModalOpen(true);
  };

  const openDeleteDialog = (item: IProduct) => {
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

  // Dynamic Array Helpers (Images, Features, Applications)
  const addArrayField = (field: 'images' | 'features' | 'applications') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayField = (field: 'images' | 'features' | 'applications', index: number) => {
    setFormData((prev) => {
      const arr = [...prev[field]];
      arr.splice(index, 1);
      return {
        ...prev,
        [field]: arr.length === 0 ? [''] : arr,
      };
    });
  };

  const updateArrayField = (field: 'images' | 'features' | 'applications', index: number, value: string) => {
    setFormData((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return {
        ...prev,
        [field]: arr,
      };
    });
  };

  // Dynamic Specifications Helpers
  const addSpec = () => {
    setSpecifications((prev) => [...prev, { key: '', value: '' }]);
  };

  const removeSpec = (index: number) => {
    setSpecifications((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateSpec = (index: number, keyOrValue: 'key' | 'value', value: string) => {
    setSpecifications((prev) => {
      const arr = [...prev];
      arr[index][keyOrValue] = value;
      return arr;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
      showToast('Please select a category', 'error');
      return;
    }

    setSubmitting(true);

    // Convert SpecPair array to Map/Object
    const specsObject: Record<string, string> = {};
    specifications.forEach((spec) => {
      if (spec.key.trim()) {
        specsObject[spec.key.trim()] = spec.value;
      }
    });

    // Clean arrays (remove empty entries)
    const cleanedImages = formData.images.filter((img) => img.trim() !== '');
    const cleanedFeatures = formData.features.filter((f) => f.trim() !== '');
    const cleanedApplications = formData.applications.filter((a) => a.trim() !== '');

    const payload = {
      ...formData,
      images: cleanedImages,
      features: cleanedFeatures,
      applications: cleanedApplications,
      specifications: specsObject,
    };

    try {
      const url = editingItem ? `/api/products/${editingItem._id}` : '/api/products';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save product');

      showToast(editingItem ? 'Product updated successfully!' : 'Product created successfully!', 'success');
      setModalOpen(false);
      fetchInitialData();
    } catch (error) {
      console.error(error);
      showToast('Error saving product. Please verify fields.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/products/${deletingId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete product');

      showToast('Product deleted successfully!', 'success');
      setConfirmOpen(false);
      fetchInitialData();
    } catch (error) {
      console.error(error);
      showToast('Failed to delete product.', 'error');
    }
  };

  const columns = [
    {
      header: 'Image',
      accessor: (row: IProduct) => (
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
          {row.images && row.images.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={row.images[0]} alt={row.name} className="w-full h-full object-cover" />
          ) : (
            <Package size={16} className="text-gray-400" />
          )}
        </div>
      ),
    },
    { header: 'Name', accessor: (row: IProduct) => <span className="font-bold text-gray-900">{row.name}</span> },
    {
      header: 'Category',
      accessor: (row: IProduct) => {
        const cat = row.category as ICategory;
        return <span className="text-sm font-medium text-gray-650">{cat?.name || 'Unassigned'}</span>;
      },
    },
    {
      header: 'Featured',
      accessor: (row: IProduct) => (
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
          row.is_featured ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-gray-50 text-gray-500 border border-gray-200'
        }`}>
          {row.is_featured ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: IProduct) => (
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
          <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-sm text-gray-500 mt-1">Create and maintain your Vraj Agro agricultural product inventory items.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#cc0000] hover:bg-[#aa0000] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
        >
          <Plus size={18} />
          <span>Add New</span>
        </button>
      </div>

      <DataTable<IProduct>
        data={products}
        columns={columns}
        onEdit={openEditModal}
        onDelete={openDeleteDialog}
        loading={loading}
      />

      {/* Form Modal */}
      <CrudModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Product' : 'Create Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name and Slug */}
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

          {/* Row 2: Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Row 3: Descriptions */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <textarea
                rows={2}
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Description (Optional)</label>
              <textarea
                rows={4}
                value={formData.full_description}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 4: Images List (Dynamic) */}
          <div className="border border-gray-150 p-4 rounded-xl space-y-3 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-800">Product Image URLs</h4>
              <button
                type="button"
                onClick={() => addArrayField('images')}
                className="text-xs text-[#cc0000] hover:underline font-semibold flex items-center gap-1 focus:outline-none"
              >
                <Plus size={14} /> Add Image
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.images.map((imgUrl, idx) => (
                <div key={idx} className="border border-gray-200 p-2.5 rounded bg-white relative">
                  <ImageUpload
                    value={imgUrl}
                    onChange={(url) => updateArrayField('images', idx, url)}
                    label={`Image #${idx + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField('images', idx)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none p-1"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Row 5: Specifications Editor (Dynamic Key-Value) */}
          <div className="border border-gray-150 p-4 rounded-xl space-y-3 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-800">Technical Specifications</h4>
              <button
                type="button"
                onClick={addSpec}
                className="text-xs text-[#cc0000] hover:underline font-semibold flex items-center gap-1 focus:outline-none"
              >
                <Plus size={14} /> Add Specification
              </button>
            </div>
            <div className="space-y-2">
              {specifications.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No specifications added yet.</p>
              ) : (
                specifications.map((spec, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      required
                      value={spec.key}
                      onChange={(e) => updateSpec(idx, 'key', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs"
                      placeholder="Property (e.g. Weight)"
                    />
                    <input
                      type="text"
                      required
                      value={spec.value}
                      onChange={(e) => updateSpec(idx, 'value', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs"
                      placeholder="Value (e.g. 50 kg)"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpec(idx)}
                      className="text-red-500 hover:text-red-700 focus:outline-none p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Row 6: Features & Applications lists (Dynamic) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Features list */}
            <div className="border border-gray-150 p-4 rounded-xl space-y-3 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-800">Key Features</h4>
                <button
                  type="button"
                  onClick={() => addArrayField('features')}
                  className="text-xs text-[#cc0000] hover:underline font-semibold flex items-center gap-1 focus:outline-none"
                >
                  <Plus size={14} /> Add Feature
                </button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feat, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      required
                      value={feat}
                      onChange={(e) => updateArrayField('features', idx, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs"
                      placeholder="Feature item"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField('features', idx)}
                      className="text-red-500 hover:text-red-700 focus:outline-none p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications list */}
            <div className="border border-gray-150 p-4 rounded-xl space-y-3 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-800">Applications</h4>
                <button
                  type="button"
                  onClick={() => addArrayField('applications')}
                  className="text-xs text-[#cc0000] hover:underline font-semibold flex items-center gap-1 focus:outline-none"
                >
                  <Plus size={14} /> Add App
                </button>
              </div>
              <div className="space-y-2">
                {formData.applications.map((app, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      required
                      value={app}
                      onChange={(e) => updateArrayField('applications', idx, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs"
                      placeholder="Use-case application"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField('applications', idx)}
                      className="text-red-500 hover:text-red-700 focus:outline-none p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing (Optional) */}
          <div className="border border-gray-150 p-4 rounded-xl space-y-4 bg-gray-50/50">
            <h4 className="text-sm font-bold text-gray-800">Pricing (Optional)</h4>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show_price"
                checked={formData.show_price}
                onChange={(e) => setFormData({ ...formData, show_price: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-[#cc0000] focus:ring-[#cc0000]"
              />
              <label htmlFor="show_price" className="ml-2 block text-sm font-medium text-gray-700">
                Show Price on Website
              </label>
            </div>

            {formData.show_price && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount_percent}
                    onChange={(e) => setFormData({ ...formData, discount_percent: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
            
            <p className="text-xs text-gray-500">
              Leave price as 0 to hide pricing and show only WhatsApp enquiry.
            </p>
          </div>

          {/* Row 7: Toggles */}
          <div className="flex gap-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-[#cc0000] focus:ring-[#cc0000]"
              />
              <label htmlFor="is_featured" className="ml-2 block text-sm font-medium text-gray-700">
                Is Featured (Show on homepage)
              </label>
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
                Is Active (Visible to users)
              </label>
            </div>
          </div>

          {/* Actions */}
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
              {submitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </CrudModal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product?"
        message="Are you sure you want to delete this product? This catalog item will be removed permanently."
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
