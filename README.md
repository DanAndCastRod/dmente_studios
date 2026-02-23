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
│   │       ├── BookingContext.tsx # Estado global del modal de reservas
│   │       ├── BookingModal.tsx   # Modal de selección de servicio
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
| `primary-neon` | `#5B2C6F` | Botones, CTAs principales, glows |
| `bg-abyss` | `#0A0A0A` | Fondo global (Dark Mode estricto) |
| `surface-dark` | `#1A1A1A` | Tarjetas, modales, secciones |
| `accent-cyan` | `#00FFFF` | Badges, highlights, hover secundario |
| `text-main` | `#F5F5F5` | Texto principal (alta legibilidad) |

**Tipografías:**
- **Headers:** Syncopate (Google Fonts) — Pesada, uppercase
- **Body:** Montserrat (Google Fonts) — Geométrica, limpia

**Efectos:**
- Noise grain al 3% sobre fondo (textura analógica)
- Glow en hover (box-shadow neón) en lugar de cambios sólidos de color

---

## 📅 Sistema de Reservas (Google Calendar)

El sistema de reservas usa **Google Calendar Appointment Scheduling**.

### Flujo del usuario:
1. Hace clic en cualquier CTA de reserva (Navbar, Services, Booking section)
2. Se abre un **modal centralizado** con 2 opciones:
   - **Bloque de Ensayo** (2 horas)
   - **Sesión de Producción** (4 horas)
3. Al seleccionar, se abre Google Calendar en una nueva pestaña
4. El usuario agenda su cita y recibe confirmación por email

### ⚠️ Configuración requerida:
Editar `front/src/components/BookingModal.tsx` (líneas 10-13) con las URLs reales del Appointment Schedule de Google Calendar:

```typescript
const GOOGLE_CAL_ENSAYO =
  "https://calendar.google.com/calendar/appointments/schedules/TU_ID_ENSAYO";
const GOOGLE_CAL_PRODUCCION =
  "https://calendar.google.com/calendar/appointments/schedules/TU_ID_PRODUCCION";
```

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
