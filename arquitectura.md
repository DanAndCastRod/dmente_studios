# Arquitectura de la Landing Page (Sitemap de Componentes)

## 1. Navbar
- Logo D'mente a la izquierda.
- Links: Servicios | Equipamiento | El Estudio | Contacto.
- CTA Principal (Botón Púrpura): "Reserva tu Sesión".

## 2. Hero Section
- **Headline (H1):** "La Hipnosis del Sonido en Pereira."
- **Subheadline:** "Trae el ruido de tu mente. Nosotros ponemos el espacio, el aislamiento y la técnica para que el mundo lo escuche. Producción musical y salas de ensayo de alto nivel."
- **Botones:** Primario ("Ver Servicios") | Secundario ("Escucha nuestro trabajo").
- **Visual:** Video de fondo en loop (oscurecido) intercalando paneos de la consola de mezcla y un platillo de batería vibrando.

## 3. Sección "Dos Corazones, Un Estudio" (Servicios)
Grid de 2 columnas (o tarjetas grandes):
- **Tarjeta A: La Sala de Ensayo.** (Visual: Baterista en luz fucsia). Copy: "Rompe el silencio. Acústica impecable y backline profesional para que tu banda sude la camiseta antes del show."
- **Tarjeta B: El Laboratorio de Producción.** (Visual: Interfaz del DAW). Copy: "Precisión milimétrica. Desde la captura hasta el máster final. El entorno perfecto para materializar tus ideas."

## 4. Sección de Equipamiento (Tech Specs)
- Carrusel o lista minimalista destacando el hardware clave: Monitores, micrófonos de condensador, interfaces y amplificadores de la sala.

## 5. Footer & CTA Final
- **Headline:** "¿Listo para entrar en trance?"
- Integración del Widget de Reservas (Ver sección URiT).
- Links a redes sociales (Instagram) y ubicación exacta (Maps en Pereira).


# Chunk 6: Arquitectura de Dominio y Enrutamiento (Releven x D'mente)

## Dominio Base
- `releven.cc` (Sitio principal del colectivo).

## Subdominio Estratégico (Selección: dmente.releven.cc)
**Propósito:** Portal de co-branding y sistema de reservas exclusivo.
**Flujo de Usuario (Routing):**
1. **Acceso Público (`dmente.releven.cc/`):** Landing page que muestra el espacio de D'mente como la casa oficial de Releven. Muestra specs técnicos, fotos de la sala y el botón de "Agendar Sesión".
2. **Acceso Privado (`dmente.releven.cc/app` o `/login`):** Portal conectado a la infraestructura URiT. Los miembros del colectivo inician sesión aquí para ver el calendario de la sala de ensayo y el estudio de producción con sus tarifas preferenciales.