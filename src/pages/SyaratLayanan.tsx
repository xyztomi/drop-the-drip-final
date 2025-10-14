import { SimpleHeader } from '../components/SimpleHeader';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SyaratLayanan() {
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
              Syarat Layanan
            </h1>

            <div className="space-y-6 text-sm leading-relaxed">
              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  1. Penerimaan Syarat
                </h2>
                <p>
                  Dengan mengakses dan menggunakan layanan Drop the Drip, Anda setuju untuk terikat
                  dengan syarat dan ketentuan yang tercantum di halaman ini. Jika Anda tidak setuju
                  dengan syarat ini, mohon untuk tidak menggunakan layanan kami.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  2. Penggunaan Layanan
                </h2>
                <p className="mb-3">
                  Anda setuju untuk menggunakan layanan ini hanya untuk tujuan yang sah dan sesuai dengan:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Semua hukum dan peraturan yang berlaku</li>
                  <li>Hak-hak pihak ketiga</li>
                  <li>Syarat dan ketentuan yang kami tetapkan</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  3. Konten Pengguna
                </h2>
                <p className="mb-3">
                  Dengan mengunggah foto atau konten ke platform kami:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Anda menjamin bahwa Anda memiliki hak untuk menggunakan konten tersebut</li>
                  <li>Anda memberikan izin kepada kami untuk memproses konten untuk keperluan layanan</li>
                  <li>Anda bertanggung jawab atas semua konten yang Anda unggah</li>
                  <li>Anda tidak akan mengunggah konten yang melanggar hukum atau hak orang lain</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  4. Batasan Penggunaan
                </h2>
                <p className="mb-3">
                  Anda dilarang untuk:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Menggunakan layanan untuk tujuan ilegal</li>
                  <li>Mengunggah konten yang mengandung malware atau virus</li>
                  <li>Mencoba mengakses sistem kami secara tidak sah</li>
                  <li>Menyalahgunakan atau mengeksploitasi layanan</li>
                  <li>Menggunakan bot atau otomasi tanpa izin</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  5. Hak Kekayaan Intelektual
                </h2>
                <p>
                  Semua hak kekayaan intelektual terkait platform dan teknologi yang digunakan
                  adalah milik OptiMind Labs. Hasil yang dihasilkan dari layanan kami dapat Anda
                  gunakan untuk keperluan bisnis Anda.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  6. Penolakan Jaminan
                </h2>
                <p>
                  Layanan ini disediakan "sebagaimana adanya" tanpa jaminan apa pun. Kami tidak
                  menjamin bahwa layanan akan selalu tersedia, bebas kesalahan, atau memenuhi
                  kebutuhan spesifik Anda.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  7. Batasan Tanggung Jawab
                </h2>
                <p>
                  OptiMind Labs tidak bertanggung jawab atas kerugian atau kerusakan yang timbul
                  dari penggunaan atau ketidakmampuan menggunakan layanan kami, termasuk namun tidak
                  terbatas pada kehilangan data atau keuntungan.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  8. Perubahan Syarat
                </h2>
                <p>
                  Kami berhak untuk mengubah syarat layanan ini kapan saja. Perubahan akan berlaku
                  segera setelah dipublikasikan di halaman ini. Penggunaan layanan yang berkelanjutan
                  berarti Anda menyetujui perubahan tersebut.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  9. Hukum yang Berlaku
                </h2>
                <p>
                  Syarat layanan ini diatur oleh hukum Republik Indonesia. Setiap sengketa akan
                  diselesaikan di pengadilan yang berwenang di Jakarta, Indonesia.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black uppercase tracking-wider mb-3">
                  10. Kontak
                </h2>
                <p>
                  Jika Anda memiliki pertanyaan tentang syarat layanan ini, hubungi kami di:
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
