import type { Metadata, Viewport } from "next";
import { Anton, Archivo } from "next/font/google";
import { CIUDAD_CORTA, INSTAGRAM_USUARIO } from "@/lib/contacto";
import "./v6.css";

// v6, "cruda y vibrante". Dos familias OFL servidas por el propio sitio (next/font):
// - Anton: titulares en mayusculas, enormes y apretados, como un afiche de toque.
// - Archivo: el texto.
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });

const SITE_URL = "https://dmente.releven.cc";
const TITULO = `D'mente Estudio · Sala de ensayo y estudio en ${CIUDAD_CORTA}`;
const DESCRIPCION = `Sala de ensayo y estudio de producción en ${CIUDAD_CORTA}. Por horas, de 8:00 a 22:00, a $30.000 la hora. Reservas por Instagram, @${INSTAGRAM_USUARIO}.`;
const OG_TITULO = "D'mente Estudio · Ensaya a volumen de tarima";
const OG_DESCRIPCION = `Sala de ensayo y estudio de producción en ${CIUDAD_CORTA}. $30.000 la hora.`;
// Imagen para redes de la version anterior (1200 x 630, sin fotos de Instagram). Pendiente: una en el estilo v6.
const OG_IMAGEN = {
  url: "/og-dmente.jpg",
  width: 1200,
  height: 630,
  alt: `D'mente Estudio. Sala de ensayo y producción en ${CIUDAD_CORTA}.`,
};

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
    title: OG_TITULO,
    description: OG_DESCRIPCION,
    images: [OG_IMAGEN],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITULO,
    description: OG_DESCRIPCION,
    images: [OG_IMAGEN.url],
  },
};

export const viewport: Viewport = { themeColor: "#0b0709", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${anton.variable} ${archivo.variable}`}>
      <head>
        {/* Sin script (o con movimiento reducido) no hay telon ni golpes: todo queda visible y quieto. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var c=document.documentElement.classList;c.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)c.add('mov')})()",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
