# Arquitectura Técnica — D'mente Estudio Landing Page

## 1. Diagrama de Componentes

```
layout.tsx (RootLayout)
├── BookingProvider          ← Context global para el modal de reservas
│   ├── Navbar               ← Fija, z-50, backdrop-blur
│   ├── <main>
│   │   └── page.tsx
│   │       ├── Hero         ← min-h-screen, imagen de fondo + overlay
│   │       ├── Services     ← Grid 2 columnas (Ensayo | Producción)
│   │       ├── GearShowcase ← Grid 2 columnas (Imagen | Lista de gear)
│   │       └── Booking      ← Tarjetas interactivas + CTA
│   ├── Footer               ← 4 columnas, co-branding Releven
│   └── BookingModal         ← Overlay z-100, 2 servicios → Google Calendar
```

## 2. Flujo de Estado del Modal de Reservas

```
BookingContext.tsx
├── isOpen: boolean
├── openBooking(): void     ← Llamado por Navbar, Services, Booking
└── closeBooking(): void    ← Llamado por BookingModal (X o backdrop)

Componentes que consumen el contexto:
├── Navbar.tsx        → botón "Reserva tu Sesión" (desktop + mobile)
├── Services.tsx      → links "RESERVAR BLOQUE" y "AGENDAR SESIÓN"
├── Booking.tsx       → tarjetas "ENSAYO" y "PRODUCCIÓN"
└── BookingModal.tsx  → renderiza/oculta el modal + redirige a Google Calendar
```

## 3. Design Tokens (globals.css)

Los tokens están definidos usando la directiva `@theme` de Tailwind CSS v4:

```css
@theme {
  --color-primary-neon: #5B2C6F;
  --color-bg-abyss: #0A0A0A;
  --color-surface-dark: #1A1A1A;
  --color-accent-cyan: #00FFFF;
  --color-text-main: #F5F5F5;
  --font-display: 'Monument Extended', 'Syncopate', sans-serif;
  --font-body: 'Montserrat', 'Inter', sans-serif;
}
```

Clases utility personalizadas:
- `.glow-btn` — Box-shadow púrpura en hover
- `.glow-btn-cyan` — Box-shadow cian en hover

Textura de ruido: SVG inline como `background-image` en el `body` al 3% de opacidad.

## 4. Configuración de Build (next.config.ts)

```typescript
const nextConfig: NextConfig = {
  output: 'export',       // SSG (Static Site Generation)
  images: {
    unoptimized: true,     // Requerido para static export
  },
};
```

- `output: 'export'` genera HTML estático en `/out` compatible con Cloudflare Pages.
- `images.unoptimized` desactiva el Image Optimization Server de Next.js (no disponible en hosting estático).

## 5. Google Fonts (layout.tsx)

```typescript
const montserrat = Montserrat({ weight: ["400", "600"] });  // Body text
const syncopate = Syncopate({ weight: ["400", "700"] });     // Display headers
```

Ambas fuentes se cargan como CSS variables (`--font-montserrat`, `--font-syncopate`) y se aplican vía las clases Tailwind en `globals.css`.

## 6. Assets Visuales

Los assets actuales son imágenes generadas por IA como placeholders:

| Archivo | Uso | Sección |
|---|---|---|
| `dmente_hero_console_*.png` | Consola de mezcla, fondo del Hero + tarjeta Producción | Hero, Services |
| `dmente_rehearsal_drums_*.png` | Batería con iluminación fucsia | Services (Ensayo) |
| `dmente_gear_showcase_*.png` | Micrófono + interfaz de audio en macro | GearShowcase |

> **Nota:** Estos assets deben ser reemplazados con fotografía real del estudio cuando esté disponible. Las imágenes viven en `front/public/images/`.

## 7. SEO

Configurado en `layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "D'mente Estudio | La Hipnosis del Sonido",
  description: "Grabación, producción y salas de ensayo de alto nivel en Pereira...",
};
```

- `<html lang="es">` para contenido en español
- Heading hierarchy: un solo `<h1>` en Hero, `<h2>` por sección
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`
