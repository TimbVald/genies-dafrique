"use client";

import React from "react";
import { usePwa } from "./PwaProvider";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";

interface InstallButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "compact";
}

export default function InstallButton({
  className = "",
  variant = "outline",
}: InstallButtonProps) {
  const { canInstall, isInstalled, promptInstall } = usePwa();
  const t = useTranslations("pwa");

  if (!canInstall || isInstalled) {
    return null;
  }

  const baseStyles =
    "inline-flex items-center gap-2 font-semibold transition-all duration-200 cursor-pointer active:scale-95";

  let variantStyles = "";
  if (variant === "primary") {
    variantStyles = "px-4 py-2.5 rounded-xl bg-[#1A3A8F] hover:bg-[#0D1F6B] text-white shadow-md text-sm";
  } else if (variant === "secondary") {
    variantStyles = "px-4 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#D98E16] text-[#1A202C] shadow-md text-sm";
  } else if (variant === "compact") {
    variantStyles = "p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1A3A8F] text-xs";
  } else {
    variantStyles =
      "px-3.5 py-2 rounded-xl border border-blue-200 hover:border-[#1A3A8F] text-[#1A3A8F] hover:bg-blue-50/60 text-xs";
  }

  return (
    <button
      onClick={promptInstall}
      className={`${baseStyles} ${variantStyles} ${className}`}
      title={t("installButton")}
      aria-label={t("installButton")}
    >
      <Download className="w-4 h-4 shrink-0" />
      <span>{t("installButton")}</span>
    </button>
  );
}
