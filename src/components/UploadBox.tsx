import { Upload, X } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';

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
    reader.onload = (event) => {
      if (!event.target?.result) return;
      const dataUrl = event.target.result as string;
      setUploadedImage(dataUrl);
      onImageUpload?.(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleRemove = () => {
    setUploadedImage(null);
    onImageUpload?.(null);
  };

  const inputId = `file-input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="relative group">
      <div className="absolute inset-0 translate-x-2 translate-y-2 bg-black transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3 group-active:translate-x-1.5 group-active:translate-y-1.5" />
      <div className="relative z-10 bg-white border-4 border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_#000000] md:shadow-[6px_6px_0px_0px_#000000] transition-all duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[7px_7px_0px_0px_#000000] md:group-hover:shadow-[12px_12px_0px_0px_#000000] group-active:-translate-x-0.5 group-active:-translate-y-0.5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-3 md:mb-4">
          <div>
            <h3 className="text-base md:text-xl font-semibold text-black tracking-tight">
              {label}
            </h3>
          </div>
          <span
            className={`inline-flex items-center justify-center rounded-full border-2 border-black px-2 py-0.5 text-[10px] md:text-xs tracking-wide ${required ? 'bg-[--accent] text-black' : 'bg-white text-black/70'
              }`}
          >
            {required ? 'Wajib' : 'Opsional'}
          </span>
        </div>

        {!uploadedImage ? (
          <div
            className={`relative border-4 border-dashed ${isDragging ? 'border-[--accent] bg-[--accent]/15' : 'border-black'
              } h-52 md:h-72 lg:h-96 flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden transition-all duration-300 ease-out group-hover:border-black group-hover:bg-[--accent]/10 group-hover:shadow-[5px_5px_0px_0px_#000000] md:group-hover:shadow-[8px_8px_0px_0px_#000000] active:scale-[0.98]`}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => document.getElementById(inputId)?.click()}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-40 group-hover:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_rgba(255,255,255,0))]" />
            <Upload
              className={`relative z-10 w-11 h-11 md:w-14 md:h-14 text-black transition-transform duration-300 ${isDragging ? 'animate-bounce' : 'group-hover:scale-110 group-hover:-translate-y-1'
                }`}
            />
            <p className="relative z-10 hidden text-sm font-medium text-black md:block md:text-base md:text-center">
              Seret foto ke sini atau ketuk untuk memilih
            </p>
            <p className="relative z-10 hidden text-[11px] text-black/50 md:block">JPG, PNG, atau WEBP · maks 10MB</p>
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
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black transition-all duration-300 group-hover/image:translate-x-2.5 group-hover/image:translate-y-2.5 pointer-events-none" />
            <img
              src={uploadedImage}
              alt={label}
              className="relative z-10 w-full h-52 md:h-72 lg:h-96 object-cover border-4 border-black shadow-[5px_5px_0px_0px_#000000] md:shadow-[6px_6px_0px_0px_#000000] transition-transform duration-300 group-hover/image:-translate-x-1 group-hover/image:-translate-y-1"
            />
            <button
              onClick={handleRemove}
              className="absolute top-3 right-3 z-20 bg-[--destructive] text-black px-2.5 py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_#000000] md:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200 hover:shadow-[5px_5px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-1 text-xs font-medium">
                <X className="w-3.5 h-3.5" /> Hapus
              </span>
            </button>
          </div>
        )}

        {!uploadedImage && (
          <div className="mt-3 hidden flex-col gap-1 text-[11px] text-black/60 md:flex">
            <span>Tip: foto tegak lurus membantu hasil lebih akurat.</span>
            <span>Gunakan latar sederhana agar pakaian mudah terbaca.</span>
          </div>
        )}
      </div>
    </div>
  );
}