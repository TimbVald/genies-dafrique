"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Download, RefreshCw, Wifi, WifiOff, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface PwaContextType {
  isInstalled: boolean;
  canInstall: boolean;
  isOnline: boolean;
  updateAvailable: boolean;
  promptInstall: () => Promise<void>;
  applyUpdate: () => void;
}

const PwaContext = createContext<PwaContextType>({
  isInstalled: false,
  canInstall: false,
  isOnline: true,
  updateAvailable: false,
  promptInstall: async () => {},
  applyUpdate: () => {},
});

export const usePwa = () => useContext(PwaContext);

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const t = useTranslations("pwa");
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [showNetworkToast, setShowNetworkToast] = useState(false);
  const [networkToastType, setNetworkToastType] = useState<"online" | "offline">("online");
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // 1. Enregistrement du Service Worker
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    // Vérifier si l'app est déjà installée (standalone)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    // Enregistrement au chargement
    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        // Détection de mise à jour en attente
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
          setUpdateAvailable(true);
        }

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                setWaitingWorker(newWorker);
                setUpdateAvailable(true);
              }
            });
          }
        });
      } catch (err) {
        console.warn("PWA Service Worker registration failed:", err);
      }
    };

    if (document.readyState === "complete") {
      registerSW();
    } else {
      window.addEventListener("load", registerSW);
      return () => window.removeEventListener("load", registerSW);
    }
  }, []);

  // 2. Gestion de l'événement beforeinstallprompt
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Vérifier si l'utilisateur a fermé la bannière récemment
    const dismissedTime = localStorage.getItem("pwa_banner_dismissed");
    if (dismissedTime && Date.now() - parseInt(dismissedTime, 10) < 7 * 24 * 60 * 60 * 1000) {
      setBannerDismissed(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // 3. Gestion du statut de connexion (Online / Offline)
  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setNetworkToastType("online");
      setShowNetworkToast(true);
      setTimeout(() => setShowNetworkToast(false), 4000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setNetworkToastType("offline");
      setShowNetworkToast(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Méthode pour déclencher l'installation
  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setCanInstall(false);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  // Méthode pour appliquer la mise à jour
  const applyUpdate = useCallback(() => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      waitingWorker.addEventListener("statechange", () => {
        if (waitingWorker.state === "activated") {
          window.location.reload();
        }
      });
    } else {
      window.location.reload();
    }
  }, [waitingWorker]);

  const dismissBanner = () => {
    setBannerDismissed(true);
    localStorage.setItem("pwa_banner_dismissed", Date.now().toString());
  };

  return (
    <PwaContext.Provider
      value={{
        isInstalled,
        canInstall,
        isOnline,
        updateAvailable,
        promptInstall,
        applyUpdate,
      }}
    >
      {children}

      {/* ── Toast de Statut Réseau (Online/Offline) ── */}
      {showNetworkToast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-20 left-4 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-medium transition-all duration-300 animate-in slide-in-from-bottom-5 ${
            networkToastType === "offline"
              ? "bg-[#1A202C] text-white border-amber-500/50"
              : "bg-emerald-700 text-white border-emerald-500/50"
          }`}
        >
          {networkToastType === "offline" ? (
            <>
              <WifiOff className="w-5 h-5 text-[#F5A623] animate-pulse shrink-0" />
              <span>{t("offlineNotice")}</span>
            </>
          ) : (
            <>
              <Wifi className="w-5 h-5 text-emerald-300 shrink-0" />
              <span>{t("onlineNotice")}</span>
            </>
          )}
        </div>
      )}

      {/* ── Toast de Mise à Jour Disponible ── */}
      {updateAvailable && (
        <div
          role="alert"
          className="fixed top-20 right-4 z-50 max-w-sm w-full bg-white rounded-2xl shadow-2xl border border-blue-200 p-4 animate-in slide-in-from-top-5 text-slate-800"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-[#1A3A8F] shrink-0">
              <RefreshCw className="w-5 h-5 animate-spin text-[#1A3A8F]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A3A8F]">
                {t("updateAvailable")}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Cliquez pour recharger avec les dernières nouveautés.
              </p>
              <button
                onClick={applyUpdate}
                className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1A3A8F] text-white text-xs font-semibold hover:bg-[#0D1F6B] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t("updateButton")}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Bannière d'installation PWA discrète (Mobile & Desktop) ── */}
      {canInstall && !isInstalled && !bannerDismissed && (
        <div
          role="region"
          aria-label={t("installTitle")}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100 p-4 animate-in slide-in-from-bottom-5"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#1A3A8F]/10 flex items-center justify-center shrink-0 border border-[#1A3A8F]/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/icon-192x192.png"
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="text-sm font-bold text-[#1A3A8F]">
                {t("installTitle")}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                {t("installDescription")}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={promptInstall}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1A3A8F] hover:bg-[#0D1F6B] text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("installButton")}</span>
                </button>
                <button
                  onClick={dismissBanner}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {t("installLater")}
                </button>
              </div>
            </div>
            <button
              onClick={dismissBanner}
              aria-label="Fermer"
              className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </PwaContext.Provider>
  );
}
