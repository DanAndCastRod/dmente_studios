// Canales de contacto verificados del estudio.
//
// Verificado el 2026-11-09 en la pagina publica de Instagram, sin iniciar sesion:
// la cuenta @dmenteestudio existe ("D'mente Estudio"); su biografia no publica
// telefono, WhatsApp, correo, direccion ni enlace externo. Por eso las reservas
// van por mensaje directo de Instagram hasta que el estudio confirme otro canal.
//
// No agregar aqui correos, telefonos ni horarios que el estudio no haya confirmado.

export const INSTAGRAM_USUARIO = "dmenteestudio";

/** Perfil publico del estudio. */
export const INSTAGRAM_PERFIL = `https://www.instagram.com/${INSTAGRAM_USUARIO}/`;

/**
 * Enlace oficial de mensaje directo (ig.me). En el celular abre el chat en la app
 * de Instagram; en el computador pide iniciar sesion y luego abre el chat.
 */
export const INSTAGRAM_MENSAJE = `https://ig.me/m/${INSTAGRAM_USUARIO}`;

/** Nombre corto de la ciudad, para titulares, cintas y metadatos. */
export const CIUDAD_CORTA = "Pereira";

export const CIUDAD = `${CIUDAD_CORTA}, Risaralda, Colombia`;

/** Unica mencion de Releven en el sitio: "Casa de Releven", al pie. */
export const RELEVEN_URL = "https://releven.cc";
