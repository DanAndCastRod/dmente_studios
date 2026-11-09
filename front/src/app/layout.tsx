import type { Metadata, Viewport } from "next";
import { Montserrat, Syncopate } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const SITE_URL = "https://dmente.releven.cc";
const TITULO = "D'mente Estudio | La Hipnosis del Sonido";
const DESCRIPCION =
  "Sala de ensayo y estudio de producción en Pereira. Apaga la ciudad. Enciende los monitores. Reservas por mensaje directo en Instagram.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: "D'mente Estudio",
    title: TITULO,
    description: DESCRIPCION,
    images: [
      {
        url: "/og-dmente.jpg",
        width: 1200,
        height: 630,
        alt: "D'mente Estudio, la hipnosis del sonido. Sala de ensayo y producción en Pereira.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: ["/og-dmente.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${syncopate.variable} scroll-smooth dark`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main id="contenido" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
