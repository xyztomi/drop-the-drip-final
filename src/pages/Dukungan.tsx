import { SimpleHeader } from '../components/SimpleHeader';
import { ArrowLeft, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dukungan() {
  return (
    <div className="min-h-screen bg-[--background]">
      <SimpleHeader />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-8 font-black uppercase text-sm border-b-2 border-transparent hover:border-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>

          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000000]">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider mb-8">
              Dukungan
            </h1>

            <div className="space-y-8">
              <section>
                <p className="text-sm leading-relaxed mb-6">
                  Tim kami siap membantu Anda dengan pertanyaan atau masalah terkait layanan Drop the Drip.
                  Jangan ragu untuk menghubungi kami melalui saluran berikut:
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Email Support */}
                  <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000000]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-[--accent] border-4 border-black">
                        <Mail className="w-6 h-6" />
                      </div>
                      <h2 className="text-lg font-black uppercase tracking-wider">Email</h2>
                    </div>
                    <p className="text-sm mb-2">Untuk pertanyaan umum dan dukungan teknis:</p>
                    <a
                      href="mailto:support@optimind.co.id"
                      className="text-sm font-bold underline decoration-2 hover:text-black/70"
                    >
                      support@optimind.co.id
                    </a>
                    <p className="text-xs text-black/70 mt-3">
                      Respon dalam 1-2 hari kerja
                    </p>
                  </div>

                  {/* Location */}
                  <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000000]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-[--accent] border-4 border-black">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h2 className="text-lg font-black uppercase tracking-wider">Lokasi</h2>
                    </div>
                    <p className="text-sm">
                      OptiMind Labs<br />
                      Jakarta, Indonesia
                    </p>
                  </div>

                  {/* Business Hours */}
                  <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000000]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-[--accent] border-4 border-black">
                        <Clock className="w-6 h-6" />
                      </div>
                      <h2 className="text-lg font-black uppercase tracking-wider">Jam Layanan</h2>
                    </div>
                    <p className="text-sm">
                      Senin - Jumat<br />
                      09.00 - 18.00 WIB
                    </p>
                    <p className="text-xs text-black/70 mt-3">
                      Tutup pada hari libur nasional
                    </p>
                  </div>

                  {/* Live Chat (Coming Soon) */}
                  <div className="border-4 border-black bg-gray-100 p-6 shadow-[6px_6px_0px_0px_#000000] opacity-75">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gray-300 border-4 border-black">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <h2 className="text-lg font-black uppercase tracking-wider">Live Chat</h2>
                    </div>
                    <p className="text-sm text-black/70">
                      Segera hadir!<br />
                      Chat langsung dengan tim support
                    </p>
                  </div>
                </div>
              </section>

              <section className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
                  FAQ - Pertanyaan Umum
                </h2>

                <div className="space-y-4">
                  <details className="border-4 border-black bg-white p-4 group">
                    <summary className="font-black uppercase text-sm cursor-pointer list-none flex items-center justify-between">
                      <span>Bagaimana cara menggunakan layanan ini?</span>
                      <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed">
                      Cukup upload foto model dan minimal satu foto pakaian, selesaikan verifikasi keamanan,
                      lalu klik tombol "Submit" untuk menghasilkan hasil virtual try-on.
                    </p>
                  </details>

                  <details className="border-4 border-black bg-white p-4 group">
                    <summary className="font-black uppercase text-sm cursor-pointer list-none flex items-center justify-between">
                      <span>Format foto apa yang didukung?</span>
                      <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed">
                      Kami mendukung format JPG, PNG, dan WEBP. Ukuran maksimal file adalah 10MB per gambar.
                    </p>
                  </details>

                  <details className="border-4 border-black bg-white p-4 group">
                    <summary className="font-black uppercase text-sm cursor-pointer list-none flex items-center justify-between">
                      <span>Berapa lama proses menghasilkan hasil?</span>
                      <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed">
                      Proses biasanya memakan waktu 30-60 detik tergantung pada kompleksitas gambar
                      dan beban server saat itu.
                    </p>
                  </details>

                  <details className="border-4 border-black bg-white p-4 group">
                    <summary className="font-black uppercase text-sm cursor-pointer list-none flex items-center justify-between">
                      <span>Apakah foto saya aman?</span>
                      <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed">
                      Ya, kami menggunakan enkripsi dan langkah keamanan standar industri.
                      Foto Anda akan dihapus otomatis setelah 30 hari.
                    </p>
                  </details>

                  <details className="border-4 border-black bg-white p-4 group">
                    <summary className="font-black uppercase text-sm cursor-pointer list-none flex items-center justify-between">
                      <span>Apakah ada batasan penggunaan?</span>
                      <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed">
                      Saat ini layanan dalam tahap beta dan gratis untuk digunakan.
                      Kami akan mengumumkan jika ada perubahan kebijakan di masa depan.
                    </p>
                  </details>

                  <details className="border-4 border-black bg-white p-4 group">
                    <summary className="font-black uppercase text-sm cursor-pointer list-none flex items-center justify-between">
                      <span>Bagaimana jika hasil tidak sesuai harapan?</span>
                      <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed">
                      Kualitas hasil bergantung pada kualitas foto input. Pastikan foto model dan
                      pakaian memiliki pencahayaan yang baik dan jelas. Jika masih ada masalah,
                      hubungi tim support kami.
                    </p>
                  </details>
                </div>
              </section>

              <section className="border-t-4 border-black pt-8">
                <div className="bg-[--accent] border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000]">
                  <h3 className="text-lg font-black uppercase tracking-wider mb-3">
                    Butuh Bantuan Lebih Lanjut?
                  </h3>
                  <p className="text-sm mb-4">
                    Jika pertanyaan Anda tidak terjawab di FAQ, jangan ragu untuk menghubungi kami
                    melalui email. Tim kami akan dengan senang hati membantu Anda!
                  </p>
                  <a
                    href="mailto:support@optimind.co.id"
                    className="inline-block px-6 py-3 bg-white border-4 border-black font-black uppercase text-sm hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all"
                  >
                    Hubungi Support
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
