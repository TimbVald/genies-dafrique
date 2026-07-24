import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-lg">
        <p className="font-display font-bold text-[#EEF2FF] text-[8rem] leading-none select-none mb-4">
          404
        </p>
        <h1 className="font-display font-bold text-[#1A202C] text-3xl mb-3">
          Page introuvable
        </h1>
        <p className="text-[#4A5568] mb-2">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <p className="text-[#4A5568]/70 italic text-sm mb-10">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg
              bg-[#1A3A8F] text-white font-semibold hover:bg-[#0D1F6B] transition-colors"
          >
            <Home size={18} />
            Accueil / Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg
              border-2 border-[#E2E8F0] text-[#4A5568] font-semibold
              hover:border-[#1A3A8F] hover:text-[#1A3A8F] transition-colors"
          >
            <ArrowLeft size={18} />
            Nous contacter / Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
