import type { LocalizedText } from "./index";

/* ── Navigation Item Type ───────────────────────────────────────── */
export type NavigationItem = {
  id: string;
  label: LocalizedText;
  href: string;
  order: number;
  visible: boolean;
  children?: NavigationItem[];
};

/* ── Footer Link Type ──────────────────────────────────────────── */
export type FooterLink = {
  id: string;
  label: LocalizedText;
  href: string;
  order: number;
  visible: boolean;
};

/* ── Footer Section Type ────────────────────────────────────────── */
export type FooterSection = {
  id: string;
  title: LocalizedText;
  links: FooterLink[];
  order: number;
  visible: boolean;
};
