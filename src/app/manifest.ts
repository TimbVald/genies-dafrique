import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Complexe Scolaire Bilingue Les Génies d'Afrique",
    short_name: "Génies d'Afrique",
    description:
      "École bilingue privée d'excellence de la crèche au primaire à Nkozoa, Yaoundé, Cameroun.",
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#FFFFFF",
    theme_color: "#1A3A8F",
    lang: "fr",
    dir: "ltr",
    categories: ["education", "school"],
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Formations & Cycles",
        short_name: "Formations",
        description: "Découvrez nos cycles : crèche, maternelle et primaire",
        url: "/formations",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Calendrier scolaire",
        short_name: "Calendrier",
        description: "Consultez les dates et événements de l'année scolaire",
        url: "/calendrier",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Admissions & Inscriptions",
        short_name: "Admissions",
        description: "Inscrivez votre enfant aux Génies d'Afrique",
        url: "/admissions",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Actualités de l'école",
        short_name: "Actualités",
        description: "Suivez les dernières nouvelles et activités",
        url: "/actualites",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Contact & Localisation",
        short_name: "Contact",
        description: "Contactez l'administration et venez nous rendre visite",
        url: "/contact",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
    ],
  };
}
