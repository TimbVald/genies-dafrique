import { Inter } from "next/font/google";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


// Layout racine minimal — la locale est gérée par src/app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
