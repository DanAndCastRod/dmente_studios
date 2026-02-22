# Plan de Implementación: Landing Page de D'mente Estudios

Este plan detalla los pasos para construir la landing page de alta conversión para D'mente Estudio basándose en las especificaciones de diseño y arquitectura.

## Resumen del Objetivo
Construir una landing page técnica, inmersiva y oscura (Dark Mode estricto) utilizando Next.js y Tailwind CSS. La página actuará como un portal integrado al ecosistema de Releven, permitiendo a los músicos reservar sesiones y conocer el estudio.

## Cambios Propuestos

### 1. Inicialización y Configuración
- Inicializar un proyecto Next.js en `d:\Releven\partners\dmente_studios\front` con App Router, TypeScript y Tailwind CSS.
- Instalar dependencias adicionales: `framer-motion` (para animaciones suaves y micro-interacciones), `lucide-react` (iconos).

### 2. Design System & UI Tokens (Tailwind Config)
#### [MODIFY] `tailwind.config.ts`
- Agregar la paleta de colores:
  - `primary-neon`: `#5B2C6F` (Púrpura D'mente)
  - `bg-abyss`: `#0A0A0A` (Negro Abisal)
  - `surface-dark`: `#1A1A1A` (Gris Oscuro)
  - `accent-cyan`: `#00FFFF` (Cian Eléctrico)
  - `text-main`: `#F5F5F5` (Blanco humo)
- Configurar tipografías (Monument Extended / Syncopate para headers, Montserrat / Inter para body).
- Configurar texturas visuales (ruido de fondo al 3-5%).

### 3. Componentes Estructurales
#### [NEW] `src/components/layout/Navbar.tsx`
- Logo D'mente, links de navegación y botón de "Reserva tu Sesión" con efecto glow.
#### [NEW] `src/components/layout/Footer.tsx`
- CTA Final, integración del widget de reservas, redes sociales y mapa.

### 4. Módulos de la Landing Page
#### [NEW] `src/components/sections/Hero.tsx`
- H1: "La Hipnosis del Sonido en Pereira."
- Video de fondo en loop (paneos de consola y platillo de batería).
- Efectos de resplandor en botones.
#### [NEW] `src/components/sections/Services.tsx` ("Dos Corazones, Un Estudio")
- Grid oscuro con tarjetas (Surface Dark) destacando Sala de Ensayo y Producción.
#### [NEW] `src/components/sections/GearShowcase.tsx`
- Galería visual o lista fluida destacando inventario técnico (hardware) como armas.
#### [NEW] `src/components/sections/Booking.tsx`
- UI lista para incrustar el Módulo de Agendamiento URiT.

## Plan de Verificación
1. **Verificación Estética:** Ejecutar el servidor de desarrollo (`npm run dev`) para revisar la correcta aplicación del Dark Mode estricto, la legibilidad del texto humo y los tonos neón.
2. **Verificación de UI Inmersiva:** Confirmar que los botones tengan efectos de "glow" en lugar de cambios sólidos de color.
3. **Responsive Design:** Asegurar que la grilla de servicios y el Showcase funcionen bien en dispositivos móviles y de escritorio.

## Generación de Assets
Generaremos imágenes conceptuales usando AI (herramienta `generate_image`) para los fondos abstractos del Hero, el Gear Showcase y los "Dos Corazones, Un Estudio", si no se proveen videos o fotos reales todavía.
