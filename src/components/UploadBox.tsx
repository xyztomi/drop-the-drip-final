import { Upload, X } from 'lucide-react';
import { useState } from 'react';

interface UploadBoxProps {
  label: string;
  required?: boolean;
  onImageUpload?: (image: string | null) => void;
}

export function UploadBox({ label, required = false, onImageUpload }: UploadBoxProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const imageUrl = e.target.result as string;
        setUploadedImage(imageUrl);
        onImageUpload?.(imageUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    onImageUpload?.(null);
  };

  const inputId = `file-input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="relative group">
      <div className="absolute inset-0 translate-x-3 translate-y-3 bg-black transition-all duration-300 group-hover:translate-x-4 group-hover:translate-y-4 group-active:translate-x-2 group-active:translate-y-2" />
      <div className="relative z-10 bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000] transition-all duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0px_0px_#000000] group-active:-translate-x-0.5 group-active:-translate-y-0.5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-black uppercase tracking-wider">
            {label}
          </h3>
          {required && (
            <span className="bg-[--accent] text-black px-3 py-1 border-2 border-black text-sm font-black uppercase">
              WAJIB
            </span>
          )}
          {!required && (
            <span className="bg-[--secondary] text-black px-3 py-1 border-2 border-black text-sm font-black uppercase">
              OPSIONAL
            </span>
          )}
        </div>

        {!uploadedImage ? (
          <div
            className={`relative border-4 border-dashed ${isDragging ? 'border-[--accent] bg-[--accent]/15 shadow-[0px_0px_0px_0px_#000000]' : 'border-black'} h-96 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 ease-out group-hover:border-black group-hover:bg-[--accent]/10 group-hover:shadow-[8px_8px_0px_0px_#000000] active:scale-[0.98]`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => document.getElementById(inputId)?.click()}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-50 group-hover:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.8),_rgba(255,255,255,0))]" />
            <Upload className={`relative z-10 w-16 h-16 mb-6 text-black transition-transform duration-300 ${isDragging ? 'animate-bounce' : 'group-hover:scale-110 group-hover:-translate-y-1'}`} />
            <p className="relative z-10 text-xl font-black uppercase tracking-wider text-center mb-6 transition-transform duration-300 group-hover:-translate-y-1">
              seret GAMBAR DISINI<br />
              <span className="text-base">atau klik untuk memilih</span>
            </p>
            <span className="relative z-10 text-xs font-black uppercase tracking-[0.4em] text-black/60 transition-opacity duration-300 group-hover:opacity-100 opacity-0">
              TARIK & LEPAS FOTO
            </span>
            <input
              id={inputId}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative group/image">
            <div className="absolute inset-0 translate-x-2 translate-y-2 bg-black transition-all duration-300 group-hover/image:translate-x-3 group-hover/image:translate-y-3 pointer-events-none" />
            <img
              src={uploadedImage}
              alt={label}
              className="relative z-10 w-full h-96 object-cover border-4 border-black shadow-[6px_6px_0px_0px_#000000] transition-transform duration-300 group-hover/image:-translate-x-1 group-hover/image:-translate-y-1"
            />
            <button
              onClick={removeImage}
              className="absolute top-4 right-4 z-20 bg-[--destructive] text-white p-3 border-2 border-black shadow-[4px_4px_0px_0px_#000000] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}