import Link from "next/link";
import Ticker from "@/components/Ticker";

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <Ticker />
      <div className="bg-brand-bg/95 backdrop-blur border-b border-slate-800">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-lg font-bold text-white tracking-tight">
            Market<span className="text-brand-accent">Update</span>
          </Link>
          <div className="flex gap-6 text-sm text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <Link href="/artikel" className="hover:text-white transition-colors">
              Artikel
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
