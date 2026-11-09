# D'mente Estudio — Landing Page & Sistema de Reservas

> La hipnosis del sonido en Pereira. Producción musical y salas de ensayo de alto nivel.

---

## 🚀 Quick Start

```bash
cd front
npm install
npm run dev -- -p 3005
```

Abrir [http://localhost:3005](http://localhost:3005).

---

## 📁 Estructura del Repositorio

```
dmente_studios/
├── front/                        # 🖥️ Aplicación Next.js
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx        # Layout raíz (Montserrat + Syncopate)
│   │   │   ├── page.tsx          # Composición de secciones
│   │   │   └── globals.css       # Design System (Tailwind v4 tokens)
│   │   └── components/
│   │       ├── layout/
│   │       │   ├── Navbar.tsx    # Barra de navegación fija
│   │       │   └── Footer.tsx    # Footer con CTAs y redes
│   │       └── sections/
│   │           ├── Hero.tsx      # Sección principal con imagen de fondo
│   │           ├── Services.tsx  # "Dos Corazones, Un Estudio"
│   │           ├── GearShowcase.tsx # El Arsenal (equipamiento)
│   │           └── Booking.tsx   # Sección de reservas con tarjetas
│   ├── public/images/            # Assets visuales (AI-generated)
│   ├── next.config.ts            # Static export para Cloudflare
│   └── package.json
│
├── docs/                         # 📄 Documentación técnica
│   ├── implementation_plan.md    # Plan de implementación original
│   └── ARQUITECTURA_TECNICA.md   # Arquitectura detallada (este doc)
│
├── INSTRUCCIONES_CLOUDFLARE.md   # 🌐 Guía paso a paso de despliegue
├── contexto.md                   # Contexto del proyecto
├── guia_diseno.md                # Design tokens y paleta
├── universe.md                   # Universo de marca y UX
├── alianza.md                    # Alianza Releven x D'mente
├── arquitectura.md               # Sitemap de componentes
└── integraciones.md              # Integración URiT / Calendar
```

---

## 🎨 Design System

| Token | Valor | Uso |
|---|---|---|
| `primary-neon` | `#5B2C6F` | Fondos de botones, bordes, glows (nunca como color de texto) |
| `primary-soft` | `#B983CC` | Violeta para texto sobre fondo oscuro (contraste AA) |
| `bg-abyss` | `#0A0A0A` | Fondo global (Dark Mode estricto) |
| `surface-dark` | `#1A1A1A` | Tarjetas, modales, secciones |
| `accent-cyan` | `#00FFFF` | Badges, highlights, hover secundario |
| `text-main` | `#F5F5F5` | Texto principal (alta legibilidad) |

**Tipografías:**
- **Headers:** Syncopate (Google Fonts) — Pesada, uppercase
- **Body:** Montserrat (Google Fonts) — Geométrica, limpia

**Efectos:**
- Noise grain al 3% sobre fondo (textura analógica)
- Glow en hover: un pseudo-elemento con sombra que solo cambia de opacidad (las transiciones animan únicamente `transform` y `opacity`)

---

## Reservas (provisional, desde 2026-11-09)

Por ahora no hay reserva en línea. Todos los llamados a reservar llevan a un mensaje
directo de Instagram (`https://ig.me/m/dmenteestudio`), y el perfil
(`https://www.instagram.com/dmenteestudio/`) aparece como contacto.

- Los canales viven en `front/src/lib/contacto.ts`. Solo se agregan canales que el estudio
  haya confirmado (la biografía pública de Instagram no publica teléfono, WhatsApp, correo
  ni dirección a 2026-11-09).
- El modal de Google Calendar se retiró: sus enlaces eran de ejemplo y daban "Cita no
  encontrada".
- El sitio no publica horarios, duraciones de bloque ni tarifas hasta que el estudio las
  confirme.

La imagen para compartir (`front/public/og-dmente.jpg`, 1200x630) se genera desde
`front/scripts/og-image.html`, solo con la tipografía y los colores del sitio.

---

## 🌐 Despliegue

El proyecto usa **Next.js con Static Export** (`output: 'export'`) compatible con **Cloudflare Pages**.

```bash
cd front
npm run build    # Genera carpeta /out
```

Ver [INSTRUCCIONES_CLOUDFLARE.md](./INSTRUCCIONES_CLOUDFLARE.md) para la guía completa de despliegue paso a paso.

| Parámetro | Valor |
|---|---|
| **Framework** | Next.js (Static Export) |
| **Build command** | `npm run build` |
| **Output directory** | `out` |
| **Root directory** | `/front` |

---

## 🔧 Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| **Next.js** | 16.1.6 | Framework React con App Router |
| **React** | 19.2.3 | UI Library |
| **Tailwind CSS** | 4.x | Design system y utilidades |
| **Framer Motion** | 12.x | Animaciones y transiciones |
| **Lucide React** | 0.575 | Iconografía |
| **TypeScript** | 5.x | Tipado estático |

---

## 🤝 Relación con Releven

D'mente Estudio opera como el **cuartel general físico** del colectivo musical Releven. Esta landing está registrada en el ecosistema bajo el subdominio `dmente.releven.cc`.

- **Co-branding:** Badge "A proud member of RELEVEN" en el footer
- **URiT:** La infraestructura tecnológica es provista por URiT (casa matriz tech)
- **Documentación del ecosistema:** Ver `docs/DESPLIEGUE_WEB.md` en el repo principal de Releven

---

**Mantenido por:** Equipo de Desarrollo Releven / URiT  
**Última actualización:** 2026-02-23
