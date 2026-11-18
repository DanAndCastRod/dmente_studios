// Fotos del Instagram publico @dmenteestudio, ampliadas y gradadas con scripts/gradar_fotos.py de la maqueta
// (clave baja, sombras al tono del fondo, grano fino).
//
// PENDIENTE DE PERMISO DEL ESTUDIO. Decision provisional de Daniel Castaneda (2026-11-17): estas fotos se suben
// al repositorio para la landing v6, marcadas como pendientes del permiso de D'mente Estudio. Antes de publicar
// hacen falta su permiso y, mejor, los originales en alta. Si el estudio no lo da, se retiran de public/sala/ y
// de aqui. Solo se suben los tamanos que la pagina enlaza (420 y 640 px); ninguna se muestra a mas de 560 px.
export type Foto = { id: string; w: number; h: number; alt: string; cap: string };

export const FOTOS = {
  puerta: { id: "sala-puerta", w: 960, h: 1280, alt: "La Sala A desde la puerta: guitarra roja, amplificador, batería y panel acústico rojo", cap: "La Sala A desde la puerta, junio de 2025" },
  rincon: { id: "sala-rincon", w: 960, h: 960, alt: "Rincón de la Sala A con amplificador, platillo y panel rojo bajo la luz magenta", cap: "Paneles rojos de la sala" },
  bateria: { id: "bateria", w: 1440, h: 812, alt: "Un baterista con audífonos ensaya en la batería roja bajo la luz magenta", cap: "Ensayo de batería, diciembre de 2025" },
  bateriaDet: { id: "bateria-detalle", w: 760, h: 922, alt: "El baterista de cerca, entre los micrófonos de la batería", cap: "Microfonía de la batería" },
  escritorio: { id: "escritorio", w: 1440, h: 812, alt: "El puesto de producción: pantalla con la sesión, portátil y dos monitores de estudio", cap: "El puesto de producción" },
  escritorioDet: { id: "escritorio-detalle", w: 900, h: 768, alt: "Pantalla de la sesión entre los difusores del puesto de producción", cap: "Monitores y pantalla" },
  portatil: { id: "sesion-portatil", w: 1280, h: 720, alt: "Portátil con la sesión de mezcla abierta junto a una botella, con la pared magenta detrás", cap: "La sesión abierta, de noche" },
  mezclador: { id: "mezclador", w: 1600, h: 900, alt: "Canales del mezclador en pantalla, en diagonal", cap: "Canales de la mezcla" },
  monitor: { id: "monitor-magenta", w: 722, h: 1280, alt: "La pantalla de la sesión contra la pared magenta", cap: "La pared magenta" },
} satisfies Record<string, Foto>;
