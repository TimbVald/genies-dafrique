import type { LocalizedText, LocalizedContent } from "./index";

/* ── Site Information Type ─────────────────────────────────────── */
export type SiteInfo = {
  name: LocalizedText;
  nameShort: string;
  tagline: LocalizedText;
  description: LocalizedContent;
  logo: string;
  favicon: string;
  address: LocalizedText;
  phone: string[];
  email: string;
  whatsapp?: string;
  socialNetworks: SocialNetwork[];
  openingHours: LocalizedText;
  foundedYear: number;
  studentCount: number;
  teacherCount: number;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  googleMapsPlaceId?: string;
  googleMapsDirectionsUrl?: string;
};

/* ── Social Network Type ────────────────────────────────────────── */
export type SocialNetwork = {
  platform: string; // facebook, twitter, instagram, linkedin, youtube
  url: string;
  icon: string;
  visible: boolean;
};
