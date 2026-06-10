import React from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {value ? (
        <div className="relative w-40 h-40 border rounded-md overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded" className="object-cover w-full h-full" />
          <button
            type="button"
            disabled={disabled}
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="w-40 h-40 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-gray-400">
          <span>Upload Image</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
