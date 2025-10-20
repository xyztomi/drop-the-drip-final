import { SimpleHeader } from "./components/SimpleHeader";
import { UploadBox } from "./components/UploadBox";
import { Turnstile } from "./components/Turnstile";
import { InstructionsModal } from "./components/InstructionsModal";
import { Sparkles, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { submitTryOn } from "./services/api";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user, isAuthenticated } = useAuth();
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [garment1, setGarment1] = useState<string | null>(null);
  const [garment2, setGarment2] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const currentYear = new Date().getFullYear();

  // Show instructions modal on first visit
  useEffect(() => {
    const hasSeenInstructions = localStorage.getItem('hasSeenInstructions');
    if (!hasSeenInstructions) {
      setShowInstructions(true);
      localStorage.setItem('hasSeenInstructions', 'true');
    }
  }, []);

  const canGenerate = modelImage && garment1 && turnstileToken;

  const handleGenerate = async () => {
    if (!canGenerate || !turnstileToken) return;

    setIsProcessing(true);
    setError(null);
    setResultImage(null);

    try {
      const response = await submitTryOn(
        modelImage,
        garment1,
        garment2,
        turnstileToken
      );

      setResultImage(response.result_url);

      // Scroll to result section after successful generation
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan saat memproses gambar';
      setError(errorMessage);
      console.error('Try-on error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[--background]">
      {/* Header */}
      <SimpleHeader />

      {/* Instructions Modal */}
      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />

      {/* Floating Help Button */}
      <button
        onClick={() => setShowInstructions(true)}
        className="fixed bottom-6 right-6 z-40 p-3 bg-[--accent] border-4 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all group"
        aria-label="Cara Penggunaan"
      >
        <HelpCircle className="w-5 h-5" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-white px-2.5 py-1.5 font-black uppercase text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Cara Penggunaan
        </span>
      </button>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 pb-12 md:pb-16">
        {/* Welcome Message for Authenticated Users */}
        {isAuthenticated && (
          <div className="max-w-4xl mx-auto mb-6 md:mb-8">
            <div className="border-4 border-black bg-[--accent] px-4 py-3 shadow-[4px_4px_0px_0px_#000000]">
              <p className="text-sm md:text-base font-bold">
                👋 Selamat datang kembali, <span className="uppercase">{user?.name}</span>!
              </p>
            </div>
          </div>
        )}

        {/* Upload Grid */}
        <div className="max-w-7xl mx-auto mb-10 md:mb-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            <div className="col-span-2 md:col-span-1">
              <UploadBox
                label="Foto Model"
                required
                onImageUpload={setModelImage}
              />
            </div>
            <div className="col-span-1">
              <UploadBox
                label="Pakaian 1"
                required
                onImageUpload={setGarment1}
              />
            </div>
            <div className="col-span-1">
              <UploadBox
                label="Pakaian 2"
                onImageUpload={setGarment2}
              />
            </div>
          </div>
        </div>

        {/* Cloudflare Turnstile */}
        {modelImage && garment1 && (
          <div className="max-w-md mx-auto mb-6 md:mb-8 flex justify-center">
            <div className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000]">
              <Turnstile
                key={turnstileKey}
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
            className={`w-full py-5 md:py-6 border-4 border-black shadow-[6px_6px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000] font-black uppercase tracking-wider text-lg md:text-2xl transition-all duration-200 flex items-center justify-center gap-3 md:gap-4 ${canGenerate && !isProcessing
              ? 'bg-[--accent] text-black hover:shadow-[10px_10px_0px_0px_#000000] md:hover:shadow-[12px_12px_0px_0px_#000000] hover:transform hover:translate-x-[-4px] hover:translate-y-[-4px] cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {isProcessing ? (
              <>
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 animate-spin" />
                MEMPROSES...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
                Submit
              </>
            )}
          </button>

          {!canGenerate && !error && (
            <p className="text-center mt-3 font-black uppercase text-xs md:text-sm">
              {!modelImage || !garment1
                ? 'HARAP UNGGAH FOTO MODEL DAN MINIMAL SATU PAKAIAN'
                : 'HARAP SELESAIKAN VERIFIKASI KEAMANAN DI ATAS!'}
            </p>
          )}

          {error && (
            <div className="mt-4 border-4 border-black bg-red-100 text-black px-4 py-3">
              <p className="font-black uppercase text-xs md:text-sm">⚠️ ERROR</p>
              <p className="text-xs md:text-sm mt-1">{error}</p>
            </div>
          )}
        </div>

        {/* Result Section */}
        {resultImage && (
          <div id="result-section" className="max-w-4xl mx-auto mt-12 md:mt-16 scroll-mt-8">
            <div className="border-4 border-black bg-white p-5 md:p-6 shadow-[8px_8px_0px_0px_#000000] md:shadow-[10px_10px_0px_0px_#000000]">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-5 md:mb-6">
                <h3 className="text-xl md:text-3xl font-black uppercase tracking-wider">
                  ✨ Hasil Virtual Try-On
                </h3>
                <button
                  onClick={() => {
                    setResultImage(null);
                    setModelImage(null);
                    setGarment1(null);
                    setGarment2(null);
                    setTurnstileToken(null);
                    setError(null);
                    setTurnstileKey(prev => prev + 1);
                  }}
                  className="px-3 py-2 border-4 border-black bg-white font-black uppercase text-xs md:text-sm hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                >
                  Coba Lagi
                </button>
              </div>

              <div className="border-4 border-black bg-[--background] overflow-hidden shadow-[6px_6px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000]">
                <img
                  src={resultImage}
                  alt="Virtual try-on result"
                  className="w-full h-auto"
                />
              </div>

              <div className="mt-5 md:mt-6 flex flex-col sm:flex-row gap-3 md:gap-4">
                <a
                  href={resultImage}
                  download="virtual-tryon-result.jpg"
                  className="flex-1 py-2.5 md:py-3 border-4 border-black bg-[--accent] text-black font-black uppercase text-xs md:text-sm text-center hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all"
                >
                  💾 Download Hasil
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(resultImage);
                    alert('Link gambar disalin!');
                  }}
                  className="flex-1 py-2.5 md:py-3 border-4 border-black bg-white text-black font-black uppercase text-xs md:text-sm hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all"
                >
                  🔗 Salin Link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contoh Hasil */}
        {!resultImage && (
          <div className="max-w-6xl mx-auto mt-12 md:mt-16">
            <div className="border-4 border-black bg-white p-5 md:p-6 shadow-[8px_8px_0px_0px_#000000] md:shadow-[10px_10px_0px_0px_#000000]">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h3 className="text-xl md:text-3xl font-black uppercase tracking-wider">
                  Contoh hasil
                </h3>
              </div>

              <div className="mt-6 md:mt-8 grid gap-4 md:gap-6 md:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <figure
                    key={item}
                    className="group border-4 border-black bg-[--background] overflow-hidden shadow-[6px_6px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000]"
                  >
                    <div className="relative aspect-[3/4] bg-gradient-to-br from-[#f5f5f5] via-[#ffffff] to-[#e5e5e5] flex items-center justify-center">
                      <div className="absolute inset-4 border-4 border-dashed border-black/30"></div>
                      <span className="text-4xl md:text-7xl font-black text-black/20">
                        #{item}
                      </span>
                    </div>
                    <figcaption className="p-3 md:p-4 border-t-4 border-black bg-white">
                      <p className="text-xs md:text-sm font-black uppercase tracking-wider">
                        Model {item}
                      </p>
                      <p className="mt-2 text-[11px] md:text-xs text-black/70">
                        test
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="mt-5 md:mt-6 border-4 border-black bg-[--accent] text-black px-4 py-3 font-black uppercase tracking-wider text-[11px] md:text-sm text-center">
                Contoh di atas merupakan mock-up. Hasil akhir akan disesuaikan dengan aset foto dan kebutuhan brand Anda.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-black mt-12 md:mt-16 py-10 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            <div className="bg-white border-4 border-black p-5 md:p-6 shadow-[5px_5px_0px_0px_#000000] md:shadow-[6px_6px_0px_0px_#000000]">
              <p className="text-xl md:text-2xl font-black uppercase tracking-wider">
                Drop the Drip 💧
              </p>
              <p className="mt-2 text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-black/70">
                © {currentYear} OptiMind Labs.
              </p>
              <p className="mt-3 text-xs md:text-sm leading-relaxed">
                Platform buat brand dan kreator lokal untuk mencoba pakaian atau aksesoris secara virtual. Bikin katalog interaktif tanpa perlu mencoba pakaiannya secara langsung.
              </p>
            </div>
            <div className="bg-white border-4 border-black p-5 md:p-6 shadow-[5px_5px_0px_0px_#000000] md:shadow-[6px_6px_0px_0px_#000000]">
              <h4 className="text-base md:text-lg font-black uppercase tracking-wider mb-3 md:mb-4">
                Navigasi
              </h4>
              <ul className="space-y-2 md:space-y-3 text-xs md:text-sm font-black uppercase tracking-wider">
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
            <div className="bg-white border-4 border-black p-5 md:p-6 shadow-[5px_5px_0px_0px_#000000] md:shadow-[6px_6px_0px_0px_#000000]">
              <h4 className="text-base md:text-lg font-black uppercase tracking-wider mb-3 md:mb-4">
                Kontak
              </h4>
              <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
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

          <div className="border-t-4 border-black mt-8 md:mt-10 pt-5 md:pt-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-[10px] md:text-sm font-black uppercase tracking-wider">
            <span>© {currentYear} OptiMind Labs.</span>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/kebijakan-privasi" className="border-b-2 border-transparent hover:border-black transition-colors cursor-pointer">
                Kebijakan Privasi
              </Link>
              <Link to="/syarat-layanan" className="border-b-2 border-transparent hover:border-black transition-colors cursor-pointer">
                Syarat Layanan
              </Link>
              <Link to="/dukungan" className="border-b-2 border-transparent hover:border-black transition-colors cursor-pointer">
                Dukungan
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
