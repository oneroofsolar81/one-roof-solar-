import React, { useState, useRef } from 'react';
import { UploadCloud, Link as LinkIcon, Trash2, Image as ImageIcon, Eye, AlertCircle, RefreshCw } from 'lucide-react';

interface ImageUploadFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  helperText?: string;
}

export function ImageUploadField({ value, onChange, label, helperText }: ImageUploadFieldProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isManualUrl, setIsManualUrl] = useState(!value || value.startsWith('http'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Client-side image compression and resizing using canvas
  const resizeAndCompressImage = (file: File, maxWidth = 1000, maxHeight = 1000, quality = 0.82): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Constrain within maxWidth & maxHeight while preserving aspect ratio
            if (width > height) {
              if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
              }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Canvas context not available'));
              return;
            }

            ctx.drawImage(img, 0, 0, width, height);
            
            // Output compressed JPEG base64 string
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(dataUrl);
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = () => reject(new Error('Could not load image file'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Could not read image file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Selected file is not an image. Please choose an image (JPG, PNG, WebP).');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const compressedBase64 = await resizeAndCompressImage(file);
      onChange(compressedBase64);
      setIsManualUrl(false);
    } catch (err) {
      console.error(err);
      setError('Failed to optimize and upload image. Try a smaller file.');
    } finally {
      setLoading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = () => {
    setIsDragActive(false);
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onChange('');
    setError(null);
  };

  const toggleMode = () => {
    setIsManualUrl(!isManualUrl);
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold text-slate-700">{label}</label>
          <button
            type="button"
            onClick={toggleMode}
            className="text-xs text-brand-600 hover:text-brand-800 font-bold flex items-center gap-1 transition"
          >
            {isManualUrl ? (
              <>
                <UploadCloud className="w-3.5 h-3.5" />
                Upload File Instead
              </>
            ) : (
              <>
                <LinkIcon className="w-3.5 h-3.5" />
                Or Enter URL
              </>
            )}
          </button>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <RefreshCw className="w-8 h-8 text-brand-500 animate-spin mb-2" />
          <p className="text-sm font-bold text-slate-700">Optimizing Image...</p>
          <p className="text-xs text-slate-400 mt-1">Compressing and generating secure database preview</p>
        </div>
      ) : isManualUrl ? (
        // MANUAL URL INPUT
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://images.unsplash.com/... or paste image URL"
                className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm shadow-sm focus:ring-brand-500 focus:border-brand-500"
              />
              <LinkIcon className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
            </div>
            {value && (
              <button
                type="button"
                onClick={handleRemove}
                className="px-3.5 py-2.5 border border-red-200 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* SECURE PREVIEW FOR URL */}
          {value && value.startsWith('http') && (
            <div className="relative mt-2 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 aspect-video max-w-md group shadow-sm">
              <img
                src={value}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={() => setError('Unable to load preview. Please verify that this URL is a direct web image link.')}
              />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition duration-150 flex items-center justify-center gap-2">
                <span className="text-white text-xs font-bold px-3 py-1.5 bg-slate-800/80 rounded-full flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Direct URL Preview
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        // DRAG & DROP FILE UPLOAD / BASE64 IMAGE
        <div>
          {value ? (
            // PREVIEW AND ACTION PANEL
            <div className="relative border border-slate-200 bg-white p-4 rounded-2xl shadow-sm max-w-md">
              <div className="relative rounded-xl overflow-hidden border border-slate-100 bg-slate-50 aspect-video mb-3 shadow-inner">
                <img
                  src={value}
                  alt="Base64 preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-2 bg-brand-50 rounded-lg text-brand-600 scale-90">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">Embedded Base64 Image</p>
                    <p className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">Ready to Save & Sync</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg text-xs font-bold transition active:scale-95"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 rounded-lg transition active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // ENTIRE DRAG BOX
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition duration-150 flex flex-col items-center justify-center ${
                isDragActive
                  ? 'border-brand-500 bg-brand-500/5 shadow-inner'
                  : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-400'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-500 group-hover:scale-110 transition">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Drag & drop or <span className="text-brand-600">browse files</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                {helperText || 'Supports JPG, PNG, WebP (auto-optimized under 120KB for high performance)'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hidden native input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
