'use client';

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import CrudModal from '@/components/admin/CrudModal';
import Toast from '@/components/ui/Toast';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { IVideo } from '@/types';
import { Plus, Video } from 'lucide-react';

const defaultForm: Partial<IVideo> = {
  title: '',
  video_url: '',
  thumbnail: '',
  order: 0,
  is_active: true,
};

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IVideo | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string>('');
  const [formData, setFormData] = useState<Partial<IVideo>>(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/videos');
      if (!res.ok) throw new Error('Failed to fetch videos');
      const data = await res.json();
      setVideos(data);
    } catch (error) {
      console.error(error);
      showToast('Error loading videos data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchVideos();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData(defaultForm);
    setModalOpen(true);
  };

  const openEditModal = (item: IVideo) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      video_url: item.video_url,
      thumbnail: item.thumbnail || '',
      order: item.order ?? 0,
      is_active: item.is_active ?? true,
    });
    setModalOpen(true);
  };

  const openDeleteDialog = (item: IVideo) => {
    if (item._id) {
      setDeletingId(item._id);
      setConfirmOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingItem ? `/api/videos/${editingItem._id}` : '/api/videos';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save video');

      showToast(editingItem ? 'Video updated successfully!' : 'Video created successfully!', 'success');
      setModalOpen(false);
      fetchVideos();
    } catch (error) {
      console.error(error);
      showToast('Error saving video. Please verify form details.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/videos/${deletingId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete video');

      showToast('Video deleted successfully!', 'success');
      setConfirmOpen(false);
      fetchVideos();
    } catch (error) {
      console.error(error);
      showToast('Failed to delete video.', 'error');
    }
  };

  const columns = [
    {
      header: 'Thumbnail',
      accessor: (row: IVideo) => (
        <div className="w-16 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
          {row.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={row.thumbnail} alt={row.title} className="w-full h-full object-cover" />
          ) : (
            <Video size={16} className="text-gray-400" />
          )}
        </div>
      ),
    },
    { header: 'Title', accessor: (row: IVideo) => <span className="font-bold text-gray-900">{row.title}</span> },
    {
      header: 'Video URL',
      accessor: (row: IVideo) => (
        <a href={row.video_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline truncate max-w-xs block">
          {row.video_url}
        </a>
      ),
    },
    { header: 'Order', accessor: (row: IVideo) => String(row.order ?? 0) },
    {
      header: 'Status',
      accessor: (row: IVideo) => (
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
          <h1 className="text-3xl font-bold text-[#2d6a4f]">Manage Videos</h1>
          <p className="text-sm text-gray-500 mt-1">Publish and organize agricultural guide videos and feature showcases.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
        >
          <Plus size={18} />
          <span>Add New</span>
        </button>
      </div>

      <DataTable<IVideo>
        data={videos}
        columns={columns}
        onEdit={openEditModal}
        onDelete={openDeleteDialog}
        loading={loading}
      />

      {/* Form Modal */}
      <CrudModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Video Link' : 'Add Video Link'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Video URL (YouTube/Vimeo)</label>
              <input
                type="text"
                required
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
                placeholder="https://www.youtube.com/embed/..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Thumbnail URL</label>
              <input
                type="text"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#2d6a4f] focus:border-[#2d6a4f] text-sm"
                placeholder="https://example.com/video-thumb.jpg"
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
                Is Active (Show in guide galleries)
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
              {submitting ? 'Saving...' : 'Save Video'}
            </button>
          </div>
        </form>
      </CrudModal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Video Link?"
        message="Are you sure you want to delete this guide video? This will remove it from public galleries."
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
