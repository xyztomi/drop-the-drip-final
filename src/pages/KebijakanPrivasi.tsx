import { SimpleHeader } from '../components/SimpleHeader';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function KebijakanPrivasi() {
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
              Kebijakan Privasi
            </h1>

            <div className="space-y-6 text-sm leading-relaxed">
              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  1. Informasi yang Kami Kumpulkan
                </h2>
                <p className="mb-3">
                  Drop the Drip mengumpulkan informasi berikut untuk menyediakan layanan virtual try-on:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Foto model dan pakaian yang Anda unggah</li>
                  <li>Data verifikasi keamanan (Cloudflare Turnstile token)</li>
                  <li>Informasi teknis seperti IP address dan browser yang digunakan</li>
                  <li>Hasil gambar yang dihasilkan dari proses virtual try-on</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  2. Penggunaan Informasi
                </h2>
                <p>
                  Informasi yang kami kumpulkan digunakan untuk:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Memproses permintaan virtual try-on Anda</li>
                  <li>Meningkatkan kualitas layanan kami</li>
                  <li>Mencegah penyalahgunaan dan aktivitas berbahaya</li>
                  <li>Mematuhi peraturan hukum yang berlaku</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  3. Keamanan Data
                </h2>
                <p>
                  Kami menggunakan enkripsi dan langkah-langkah keamanan standar industri untuk melindungi
                  data Anda. Namun, tidak ada metode transmisi melalui internet yang 100% aman.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  4. Penyimpanan Data
                </h2>
                <p>
                  Foto yang Anda unggah dan hasil yang dihasilkan disimpan sementara untuk keperluan pemrosesan.
                  Data akan dihapus secara otomatis setelah 30 hari.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  5. Hak Anda
                </h2>
                <p>
                  Anda memiliki hak untuk:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Mengakses data pribadi Anda</li>
                  <li>Meminta penghapusan data Anda</li>
                  <li>Menarik persetujuan penggunaan data</li>
                  <li>Mengajukan keluhan terkait penggunaan data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  6. Kontak
                </h2>
                <p>
                  Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, hubungi kami di:
                </p>
                <p className="mt-2 font-bold">
                  Email: support@optimind.co.id
                </p>
              </section>

              <div className="mt-8 pt-6 border-t-4 border-black">
                <p className="text-xs text-black/70">
                  Terakhir diperbarui: 10 Oktober 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
