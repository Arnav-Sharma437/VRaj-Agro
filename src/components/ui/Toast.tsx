import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div className={`fixed bottom-5 right-5 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white transition-all duration-300 animate-slide-in ${
      isSuccess ? 'bg-[#2d6a4f]' : 'bg-red-650'
    }`}>
      {isSuccess ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      <span className="text-sm font-semibold">{message}</span>
      <button onClick={onClose} className="hover:opacity-80 ml-2 focus:outline-none">
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
