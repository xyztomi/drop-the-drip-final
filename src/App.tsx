import { SimpleHeader } from './components/SimpleHeader';
import { UploadBox } from './components/UploadBox';
import { Turnstile } from './components/Turnstile';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { steps } from './steps';

export default function App() {
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [garment1, setGarment1] = useState<string | null>(null);
  const [garment2, setGarment2] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  const canGenerate = modelImage && garment1 && turnstileToken;

  const handleGenerate = () => {
    if (!canGenerate) return;
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      const jumlahPakaian = garment2 ? 'dua pakaian' : 'satu pakaian';
      alert(
        `Coba pakaian virtual akan dibuat di sini dengan ${jumlahPakaian}! Ini hanya demo.`
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[--background]">
      {/* Header */}
      <SimpleHeader />

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-16">
        {/* Instructions */}
        <section className="max-w-5xl mx-auto mb-8 md:mb-12">
          <div className="bg-white border-4 border-black px-5 py-6 md:p-8 shadow-[8px_8px_0px_0px_#000000]">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider">
                Cara Penggunaan
              </h2>
              <p className="text-[0.65rem] md:text-xs font-black uppercase tracking-[0.35em] text-black/60">
                3 langkah mudah · sapu geser untuk lihat semua
              </p>
            </div>

            <div className="relative mt-6 md:mt-8">
              <div className="-mx-5 px-5 md:mx-0 md:px-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none">
                <ol className="flex gap-4 min-w-max snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:min-w-0">
                  {steps.map((step, index) => (
                    <li
                      key={step.title}
                      className="w-[220px] md:w-auto flex-shrink-0 border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000000] snap-center transition-transform duration-200 ease-out hover:-translate-y-1 md:h-full"
                    >
                      <div className="flex items-center justify-between border-b-4 border-black bg-black text-white px-3 py-2">
                        <span className="text-base font-black uppercase tracking-wider">
                          0{index + 1}
                        </span>
                        <span className="ml-2 text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/70">
                          langkah
                        </span>
                      </div>
                      <div className="px-3 py-4">
                        <p className="text-sm font-black uppercase tracking-wider mb-2">
                          {step.title}
                        </p>
                        <p className="text-xs leading-relaxed text-left text-black/80">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Upload Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {/* Model Image */}
          <div className="lg:col-span-1">
            <UploadBox
              label="Foto Model"
              required
              onImageUpload={setModelImage}
            />
          </div>

          {/* Garments */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <UploadBox
              label="Pakaian 1"
              required
              onImageUpload={setGarment1}
            />
            <UploadBox
              label="Pakaian 2"
              onImageUpload={setGarment2}
            />
          </div>
        </div>

        {/* Cloudflare Turnstile */}
        {modelImage && garment1 && (
          <div className="max-w-md mx-auto mb-8 flex justify-center">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000000]">
              <Turnstile
                siteKey="0x4AAAAAAB33tcxLCFBTn3_j"
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setTurnstileToken(null)}
                onExpire={() => setTurnstileToken(null)}
                theme="light"
                size="normal"
              />
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="max-w-md mx-auto">
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isProcessing}
            className={`w-full py-6 border-4 border-black shadow-[8px_8px_0px_0px_#000000] font-black uppercase tracking-wider text-2xl transition-all duration-200 flex items-center justify-center gap-4 ${canGenerate && !isProcessing
              ? 'bg-[--accent] text-black hover:shadow-[12px_12px_0px_0px_#000000] hover:transform hover:translate-x-[-4px] hover:translate-y-[-4px] cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {isProcessing ? (
              <>
                <Sparkles className="w-8 h-8 animate-spin" />
                MEMPROSES...
              </>
            ) : (
              <>
                <Sparkles className="w-8 h-8" />
                submit
              </>
            )}
          </button>

          {!canGenerate && (
            <p className="text-center mt-4 font-black uppercase text-sm">
              {!modelImage || !garment1
                ? 'HARAP UNGGAH FOTO MODEL DAN MINIMAL SATU PAKAIAN'
                : 'HARAP SELESAIKAN VERIFIKASI KEAMANAN DI ATAS!'}
            </p>
          )}
        </div>

        {/* Contoh Hasil */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="border-4 border-black bg-white p-6 shadow-[10px_10px_0px_0px_#000000]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wider">
                Contoh hasil
              </h3>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <figure
                  key={item}
                  className="group border-4 border-black bg-[--background] overflow-hidden shadow-[8px_8px_0px_0px_#000000]"
                >
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-[#f5f5f5] via-[#ffffff] to-[#e5e5e5] flex items-center justify-center">
                    <div className="absolute inset-4 border-4 border-dashed border-black/30"></div>
                    <span className="text-6xl md:text-7xl font-black text-black/20">
                      #{item}
                    </span>
                  </div>
                  <figcaption className="p-4 border-t-4 border-black bg-white">
                    <p className="text-sm font-black uppercase tracking-wider">
                      Model {item}
                    </p>
                    <p className="mt-2 text-xs text-black/70">
                      test
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-6 border-4 border-black bg-[--accent] text-black px-4 py-3 font-black uppercase tracking-wider text-center">
              Contoh di atas merupakan mock-up. Hasil akhir akan disesuaikan dengan aset foto dan kebutuhan brand Anda.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-black mt-16 py-12">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000]">
              <p className="text-2xl font-black uppercase tracking-wider">
                Drop the Drip 💧
              </p>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.35em] text-black/70">
                © {currentYear} OptiMind Labs.
              </p>
              <p className="mt-4 text-sm leading-relaxed">
                Platform buat brand dan kreator lokal untuk mencoba pakaian atau aksesoris secara virtual. Bikin katalog interaktif tanpa perlu mencoba pakaiannya secara langsung.
              </p>
            </div>
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000]">
              <h4 className="text-lg font-black uppercase tracking-wider mb-4">
                Navigasi
              </h4>
              <ul className="space-y-3 text-sm font-black uppercase tracking-wider">
                <li>
                  <span className="border-b-2 border-transparent hover:border-black transition-colors">Beranda</span>
                </li>
                <li>
                  <span className="border-b-2 border-transparent hover:border-black transition-colors">Cara Kerja</span>
                </li>
                <li>
                  <span className="border-b-2 border-transparent hover:border-black transition-colors">Harga</span>
                </li>
                <li>
                  <span className="border-b-2 border-transparent hover:border-black transition-colors">FAQ</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000]">
              <h4 className="text-lg font-black uppercase tracking-wider mb-4">
                Kontak
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-black uppercase tracking-wider">Email</p>
                  <a
                    href="mailto:halo@optimind.id"
                    className="underline decoration-2 decoration-black">
                    support@optimind.co.id
                  </a>
                </div>
                <div>
                  <p className="font-black uppercase tracking-wider">Lokasi</p>
                  <p>Jakarta, Indonesia</p>
                </div>
                <div>
                  <p className="font-black uppercase tracking-wider">Jam Layanan</p>
                  <p>Senin - Jumat · 09.00 - 18.00 WIB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-4 border-black mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm font-black uppercase tracking-wider">
            <span>© {currentYear} OptiMind Labs.</span>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="border-b-2 border-transparent hover:border-black transition-colors">Kebijakan Privasi</span>
              <span className="border-b-2 border-transparent hover:border-black transition-colors">Syarat Layanan</span>
              <span className="border-b-2 border-transparent hover:border-black transition-colors">Dukungan</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
