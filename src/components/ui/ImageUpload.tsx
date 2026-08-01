'use client';

import React, { useState } from 'react';
import { Upload, X, Loader2, Video } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  accept?: string;
}

export default function ImageUpload({ value, onChange, label, accept = "image/*" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isVideo = accept && (accept.includes('video') || accept.includes('mp4') || accept.includes('webm') || accept.includes('mov') || accept.includes('avi'));
  const isVideoFile = value.match(/\.(mp4|webm|mov|avi)($|\?)/i) || (value && isVideo);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      // Step 1: Get a signed upload token from our server (keeps API secret safe)
      const signRes = await fetch('/api/upload/sign');
      if (!signRes.ok) throw new Error('Could not get upload credentials');
      const { signature, timestamp, apiKey, cloudName, folder } = await signRes.json();

      // Step 2: Upload directly to Cloudinary from the browser — bypasses Vercel size limits entirely
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', String(timestamp));
      formData.append('api_key', apiKey);
      formData.append('folder', folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        { method: 'POST', body: formData }
      );

      if (!uploadRes.ok) {
        const errData = await uploadRes.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Upload failed (${uploadRes.status})`);
      }

      const data = await uploadRes.json();
      onChange(data.secure_url);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setError(msg);
      console.error(err);
    } finally {
      setUploading(false);
    }
  };


  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      {value ? (
        isVideo ? (
          <div className="relative w-full max-w-sm">
            <video
              src={value}
              controls
              style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors shadow z-10"
              title="Remove video"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="relative w-40 h-40 border border-gray-250 rounded-lg overflow-hidden bg-gray-50 group">
            {isVideoFile ? (
              <video src={value} className="w-full h-full object-cover" controls={false} muted autoPlay loop />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="Upload preview" className="w-full h-full object-cover" />
            )}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors shadow"
              title="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-sm">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <>
                  <Loader2 size={24} className="animate-spin text-[#cc0000] mb-2" />
                  <p className="text-xs text-gray-500 font-semibold">Uploading file...</p>
                </>
              ) : (
                <>
                  {isVideo ? (
                    <Video size={24} className="text-gray-400 mb-2" />
                  ) : (
                    <Upload size={24} className="text-gray-400 mb-2" />
                  )}
                  <p className="text-sm text-gray-700 font-bold uppercase tracking-wide">
                    {isVideo ? 'Upload Video' : 'Upload Image'}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {isVideo ? 'MP4, WEBM, MOV' : 'PNG, JPG, JPEG, WEBP, SVG, GIF'}
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              accept={accept === 'image/*' ? '.jpg,.jpeg,.png,.webp,.svg,.gif' : accept}
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
          {error && <p className="text-xs text-red-650 font-semibold mt-1">{error}</p>}
        </div>
      )}
    </div>
  );
}
