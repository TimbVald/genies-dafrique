"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { WifiOff, RefreshCw, Home, BookOpen, Calendar, Phone } from "lucide-react";

export default function OfflinePage() {
  const t = useTranslations("offline");

  const handleRetry = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-blue-50/50 via-white to-amber-50/30">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 text-center relative overflow-hidden">
        {/* Décoration d'arrière-plan */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#1A3A8F]/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#F5A623]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Icône animée */}
        <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center rounded-2xl bg-amber-50 text-[#F5A623] border border-amber-200/60 shadow-inner">
          <WifiOff className="w-10 h-10 animate-pulse text-[#D32F2F]" />
        </div>

        {/* Titre & Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A202C] mb-3 tracking-tight font-display">
          {t("title")}
        </h1>
        <p className="text-[#4A5568] text-base sm:text-lg mb-8 leading-relaxed">
          {t("description")}
        </p>

        {/* Actions principales */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <button
            onClick={handleRetry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1A3A8F] hover:bg-[#0D1F6B] text-white font-semibold shadow-md shadow-[#1A3A8F]/20 transition-all duration-200 active:scale-[0.98]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t("retry")}</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1A202C] font-semibold transition-all duration-200"
          >
            <Home className="w-4 h-4 text-[#1A3A8F]" />
            <span>{t("backHome")}</span>
          </Link>
        </div>

        {/* Raccourcis utiles disponibles hors ligne */}
        <div className="pt-6 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">
            Pages potentiellement en cache :
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <Link
              href="/formations"
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-xs font-medium text-slate-700 hover:text-[#1A3A8F] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#1A3A8F]" />
              <span>Formations</span>
            </Link>
            <Link
              href="/calendrier"
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-xs font-medium text-slate-700 hover:text-[#1A3A8F] transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Calendrier</span>
            </Link>
            <Link
              href="/contact"
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-xs font-medium text-slate-700 hover:text-[#1A3A8F] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D32F2F]" />
              <span>Contact</span>
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          {t("cachedPagesTip")}
        </p>
      </div>
    </div>
  );
}
