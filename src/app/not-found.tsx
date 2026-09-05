import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold text-white mb-3">404 - Halaman Tidak Ditemukan</h1>
      <p className="text-slate-400 mb-6">Halaman atau artikel yang Anda cari tidak ada.</p>
      <Link href="/" className="text-brand-accent hover:underline">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
