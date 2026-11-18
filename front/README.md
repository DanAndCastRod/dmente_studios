# D'mente Estudio, front (landing v6 "cruda y vibrante")

Next.js 16 (App Router) con export estatico: `npm run build` deja el sitio en `out/`, que es lo que publica
Cloudflare Pages (raiz `front`).

```bash
npm ci
npm run dev        # http://localhost:3000
npm run lint
npm run build      # out/
```

## Piezas

- `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/v6.css`: la pagina y su CSS propio (no usa utilidades de Tailwind).
- `src/components/motor.tsx`: movimiento con GSAP + ScrollTrigger y Lenis. Con `prefers-reduced-motion` no corre ni carga WebGL.
- `src/gl/sala.ts`: lienzo WebGL con three.js (campo de la portada, fotos en duotono y vumetro), cargado en diferido.
- `src/components/reserva.tsx`: selector de dia y horas. **Es una demostracion**: disponibilidad de ejemplo, no envia nada
  ni llama a ninguna API. La reserva se escribe por mensaje directo de Instagram.
- `src/lib/contacto.ts`: unico dueno de Instagram, ciudad y enlace a Releven. No repetir esos valores en otro archivo.
- `src/lib/fotos.ts` y `public/sala/`: fotos de la sala.

**Fotos pendientes de permiso del estudio**: las fotos de `public/sala/` salen del Instagram publico @dmenteestudio y se
suben por decision provisional de Daniel Castaneda (2026-11-17), marcadas como pendientes del permiso de D'mente
Estudio. Sin ese permiso no deberian publicarse; si no se da, se retiran.

## Reglas de contenido

Sin correo (contacto solo por Instagram); pago, cambios y cancelaciones "segun las condiciones del portal de
reservas"; Releven solo como "Casa de Releven" al pie.

## Licencias

next, react, three, lenis y motion: MIT. GSAP (con ScrollTrigger): licencia estandar de GSAP, sin costo y con uso
comercial permitido, no MIT (https://gsap.com/community/standard-license/); releerla antes de publicar. Fuentes Anton
y Archivo: SIL Open Font License 1.1, servidas por el propio sitio con `next/font`.
