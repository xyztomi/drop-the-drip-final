import { Image, Upload, X, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';

// Auto-import all catalog images using Vite's glob import
const catalogImages = import.meta.glob('../assets/catalogs/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

interface UploadBoxProps {
  label: string;
  required?: boolean;
  onImageUpload?: (image: string | null) => void;
}

const EXAMPLE_IMAGES: Record<string, string> = {
  'Foto Model': '/examples/model-best.jpg',
  'Pakaian 1': '/examples/garment-1-best.jpg',
  'Pakaian 2': '/examples/garment-2-best.jpg',
};

const EXAMPLE_NOTES: Record<string, string> = {
  'Foto Model': 'Potret penuh tubuh dengan pose tegak, latar sederhana, dan cahaya merata.',
  'Pakaian 1': 'Foto pakaian gantung dengan lipatan rapi dan latar polos agar detail jelas.',
  'Pakaian 2': 'Gunakan sudut lurus dengan pencahayaan terang untuk warna yang akurat.',
};

interface TemplateOption {
  id: string;
  name: string;
  imagePath: string;
}

// Helper function to extract template name from filename
const getTemplateName = (filename: string): string => {
  return filename
    .replace(/\.(jpg|jpeg|png|webp)$/i, '') // Remove extension
    .split(/[-_]/) // Split by dash or underscore
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize
    .join(' ');
};

// Helper function to build template catalog from glob imports
const buildTemplateCatalog = (): Record<string, TemplateOption[]> => {
  const catalog: Record<string, TemplateOption[]> = {
    'Foto Model': [],
    'Pakaian 1': [],
    'Pakaian 2': [],
  };

  Object.entries(catalogImages).forEach(([path, url]) => {
    const filename = path.split('/').pop() || '';
    const templateName = getTemplateName(filename);

    if (path.includes('/look-1/')) {
      catalog['Foto Model'].push({
        id: `model-${filename}`,
        name: templateName,
        imagePath: url,
      });
    } else if (path.includes('/look-2/')) {
      catalog['Pakaian 1'].push({
        id: `garment1-${filename}`,
        name: templateName,
        imagePath: url,
      });
    } else if (path.includes('/look-3/')) {
      catalog['Pakaian 2'].push({
        id: `garment2-${filename}`,
        name: templateName,
        imagePath: url,
      });
    }
  });

  return catalog;
};

const TEMPLATE_CATALOG = buildTemplateCatalog();

export default function UploadBox({ label, required = false, onImageUpload }: UploadBoxProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const exampleImage = useMemo(() => EXAMPLE_IMAGES[label] ?? '/examples/default-best.jpg', [label]);
  const exampleNote = useMemo(
    () => EXAMPLE_NOTES[label] ?? 'Pastikan foto tajam, menyeluruh, dan mudah diproses.',
    [label]
  );

  const templates = useMemo(() => TEMPLATE_CATALOG[label] ?? [], [label]);

  const handleTemplateSelect = async (templateId: string) => {
    setSelectedTemplate(templateId);
    if (!templateId) {
      setUploadedImage(null);
      onImageUpload?.(null);
      return;
    }

    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    // Convert imported image to data URL
    try {
      const response = await fetch(template.imagePath);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setUploadedImage(dataUrl);
          onImageUpload?.(dataUrl);
        }
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Failed to load template:', error);
    }
  };

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
    setSelectedTemplate('');
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
            className={`group relative border-4 border-dashed ${isDragging ? 'border-[--accent] bg-[--accent]/15' : 'border-black'
              } h-52 md:h-72 lg:h-96 flex flex-col items-center justify-center gap-3 cursor-pointer overflow-visible transition-all duration-300 ease-out group-hover:border-black group-hover:bg-[--accent]/10 group-hover:shadow-[5px_5px_0px_0px_#000000] md:group-hover:shadow-[8px_8px_0px_0px_#000000] active:scale-[0.98]`}
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
            <div className="pointer-events-none absolute left-1/2 bottom-full z-30 mb-2 hidden w-48 -translate-x-1/2 group-hover:flex">
              <div className="relative border-4 border-black bg-white p-3 shadow-[6px_6px_0px_0px_#000000] after:absolute after:-bottom-[10px] after:left-1/2 after:-translate-x-1/2 after:h-0 after:w-0 after:border-[10px] after:border-transparent after:border-t-black after:content-[''] before:absolute before:-bottom-[8px] before:left-1/2 before:-translate-x-1/2 before:h-0 before:w-0 before:border-[9px] before:border-transparent before:border-t-white before:content-['']">
                <div className="flex items-center gap-2 pb-1.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-black bg-[--accent] text-black">
                    <Image className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-black">
                    Contoh ideal
                  </div>
                </div>
                <div className="h-40 w-28 overflow-hidden border-2 border-black bg-[--background]">
                  <img
                    src={exampleImage}
                    alt={`Contoh ${label}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-black/70">
                  {exampleNote}
                </p>
              </div>
            </div>
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

        {/* Template Selector */}
        {!uploadedImage && templates.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-black" />
              <label className="text-xs font-medium text-black uppercase tracking-wide">
                Atau pilih template
              </label>
            </div>
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateSelect(e.target.value)}
              className="w-full px-3 py-2.5 text-sm font-medium text-black bg-white border-4 border-black shadow-[3px_3px_0px_0px_#000000] transition-all duration-200 hover:shadow-[5px_5px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 focus:outline-none focus:shadow-[5px_5px_0px_0px_#000000] focus:-translate-x-0.5 focus:-translate-y-0.5 cursor-pointer"
            >
              <option value="">-- Pilih template --</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
        )}

      </div>
    </div>
  );
}