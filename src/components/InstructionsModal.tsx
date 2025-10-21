import { X } from 'lucide-react';
import { useEffect } from 'react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InstructionsModal({ isOpen, onClose }: InstructionsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000000] w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-black text-white border-b-4 border-black px-4 py-3 flex items-center justify-between z-10">
          <h2 className="text-lg uppercase tracking-wide">
            Cara Penggunaan
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 transition-colors rounded"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          {/* Contoh Hasil */}
          <section>
            <div className="mx-auto w-full max-w-xs md:max-w-sm border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000000] overflow-hidden">
              <img
                src="/hasil1.png"
                alt="Contoh hasil try-on"
                className="w-full h-auto"
              />
            </div>
          </section>

          {/* Steps */}
          <section>
            <h3 className="text-base uppercase tracking-wider mb-2">Langkah-Langkah</h3>
            <div className="space-y-3">
              {[{
                title: 'Upload Foto Model',
                description: 'Pilih foto model atau diri Anda sendiri. Pastikan foto jelas dan pencahayaan baik.',
              }, {
                title: 'Upload Foto Pakaian',
                description: 'Unggah minimal satu foto pakaian. Anda bisa menambahkan pakaian kedua sebagai opsi.',
              }, {
                title: 'Verifikasi Keamanan',
                description: 'Selesaikan verifikasi Captcha untuk memastikan keamanan.',
              }, {
                title: 'Klik Submit & Lihat Hasil',
                description: 'Tekan tombol Submit dan tunggu hasil virtual try-on muncul di halaman.',
              }].map((step, index) => (
                <div
                  key={step.title}
                  className="border-4 border-black bg-white p-3 shadow-[3px_3px_0px_0px_#000000]"
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-9 h-9 bg-black text-white flex items-center justify-center text-base border-4 border-black">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="uppercase text-[11px] mb-1 tracking-wide">{step.title}</h4>
                      <p className="text-[10px] leading-relaxed text-black/70">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section>
            <div className="border-4 border-black bg-[--accent] p-4 shadow-[3px_3px_0px_0px_#000000]">
              <h3 className="text-sm uppercase tracking-wider mb-2">💡 Tips untuk Hasil Terbaik</h3>
              <ul className="text-[10px] space-y-2 list-disc list-inside text-black/80">
                <li>Gunakan foto dengan pencahayaan yang terang dan jelas.</li>
                <li>Pastikan pose model tegak dan tidak terhalang objek lain.</li>
                <li>Ambil foto pakaian dengan latar belakang polos.</li>
                <li>Hindari foto buram atau resolusi rendah.</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t-4 border-black px-4 py-3">
          <button
            onClick={onClose}
            className="w-full py-2 bg-black text-white border-4 border-black uppercase tracking-wide text-[11px] hover:shadow-[3px_3px_0px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all"
          >
            Mengerti, Mulai Sekarang!
          </button>
        </div>
      </div>
    </div>
  );
}
