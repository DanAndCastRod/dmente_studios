import { Reserva } from "@/components/reserva";
import { Motor } from "@/components/motor";
import { FOTOS, type Foto } from "@/lib/fotos";
import { CIUDAD, CIUDAD_CORTA, INSTAGRAM_MENSAJE, INSTAGRAM_PERFIL, INSTAGRAM_USUARIO, RELEVEN_URL } from "@/lib/contacto";

// D'mente v6, "cruda y vibrante": energia de sala de ensayo. Anton enorme en mayusculas, campos planos de
// magenta, cortes sin transicion y un lienzo WebGL (src/gl/sala.ts) que redibuja la luz de la sala y cada foto
// con separacion RGB y tramado. El movimiento lo lleva src/components/motor.tsx.
// Las fotos son miniaturas del Instagram del estudio (360 a 720 px): ninguna se muestra a mas de 560 px.
// Instagram, ciudad y enlace a Releven salen de src/lib/contacto.ts: no repetir esos valores aqui.

type Shot = { f: Foto; w: number; h: number; size: 420 | 640; rot: number };
const shot = (f: Foto, size: 420 | 640, rot: number): Shot => ({ f, size, rot, w: size, h: Math.round((size * f.h) / f.w) });
const src = (s: Shot) => `/sala/${s.f.id}-${s.size}.webp`;

function Pic({ s, eager = false, cap, className = "" }: { s: Shot; eager?: boolean; cap?: string; className?: string }) {
  return (
    <figure className={`d-pic ${className}`} style={{ "--rot": `${s.rot}deg` } as React.CSSProperties}>
      {/* <img> a proposito: export estatico sin optimizador y src/gl/sala.ts lee estas etiquetas (data-gl). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src(s)}
        width={s.w}
        height={s.h}
        alt={s.f.alt}
        data-gl
        data-rot={s.rot}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
      />
      {cap ? <figcaption>{cap}</figcaption> : null}
    </figure>
  );
}

const FICHA = [
  ["Paredes", "Paneles acústicos rojos"],
  ["Piso", "Caucho"],
  ["Batería", "Acústica, armada, con platillos"],
  ["Guitarra", "Marshall JCM800"],
  ["Bajo", "Ampeg SVT-CL"],
  ["Micrófono", "Neumann U87 Ai"],
  ["Horario", "8:00 a 22:00"],
  ["La hora", "$30.000"],
];

const USOS = [
  { w: "Ensayo", d: "La Sala A por horas, con batería, backline y monitoreo. Llegas, conectas y tocas.", p: "$30.000 la hora", s: shot(FOTOS.rincon, 420, -3) },
  { w: "Grabación", d: "De la maqueta al tema terminado, en la sala y en el puesto de producción de al lado.", p: "A convenir", s: shot(FOTOS.escritorioDet, 420, 2) },
  { w: "Mezcla", d: "Mezcla y máster. Envías las pistas o las grabas aquí. Sale listo para plataformas.", p: "A convenir", s: shot(FOTOS.mezclador, 420, -2) },
];

const EQUIPO = [
  ["Batería acústica", "Sala A", "Cascos rojos y platillos"],
  ["Marshall JCM800", "Sala A", "Cabezal de guitarra"],
  ["Ampeg SVT-CL", "Sala A", "Cabezal de bajo"],
  ["Neumann U87 Ai", "Sala A", "Condensador de estudio"],
  ["Pro Tools Ultimate", "Producción", "Grabación, edición y mezcla"],
  ["UA Apollo", "Producción", "Previos y conversión"],
  ["Focal Alpha 65", "Producción", "Monitores de campo cercano"],
];

const FAQ = [
  ["¿Qué incluye la sala?", "Batería, backline de guitarra y bajo, micrófonos, monitoreo y la sala aislada. Trae tus instrumentos, platillos y cables si prefieres los tuyos."],
  ["¿Cómo reservo?", `Elige el día y las horas aquí y escríbenos por Instagram, a @${INSTAGRAM_USUARIO}. La reserva queda a tu nombre cuando el estudio la confirma.`],
  ["¿Cómo pago, cambio o cancelo?", "Según las condiciones del portal de reservas, que ves antes de confirmar."],
  ["¿Puedo grabar el ensayo?", "Sí. Escríbenos antes para dejar listo el puesto de grabación; se cotiza aparte de la sala."],
];

const CINTA_A = ["Ensayo", "Grabación", "Producción", "Mezcla", "Máster"];
const CINTA_B = ["Sala A", CIUDAD_CORTA, "8:00 a 22:00", "$30.000 la hora"];

function Tape({ words, dir, hollow = false }: { words: string[]; dir: 1 | -1; hollow?: boolean }) {
  return (
    <div className={`d-tape__row${hollow ? " d-tape__row--hollow" : ""}`} data-tape={dir}>
      <div className="d-tape__run">
        {[0, 1, 2, 3].map((k) => (
          <span key={k}>
            {words.map((t) => (
              <i key={t}>{t}</i>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <div className="d-gl" aria-hidden="true" />
      <div className="d-curtain" aria-hidden="true">
        <b>D&apos;mente</b>
        <span>Sala A · abriendo</span>
      </div>

      <nav className="d-nav" aria-label="Principal">
        <a className="d-nav__name" href="#inicio">
          D&apos;mente <small>Estudio</small>
        </a>
        <div className="d-nav__links">
          <a href="#sala">La sala</a>
          <a href="#estudio">El estudio</a>
          <a href="#equipo">Equipo</a>
          <a href="#reservar">Reservas</a>
        </div>
      </nav>
      {/* Fuera de la barra: la barra se esconde al bajar y el boton se queda siempre a la vista. */}
      <a className="d-btn d-btn--sm d-cta" href="#reservar">
        <span>Reservar</span>
      </a>

      <header className="d-hero" id="inicio" data-field>
        <div className="d-hero__body d-wrap">
          <p className="d-kick">Sala de ensayo y estudio de producción · {CIUDAD_CORTA}</p>
          <h1 className="d-mega" aria-label="Ensaya a volumen de tarima.">
            <span className="d-hit" aria-hidden="true">
              Ensaya a
            </span>
            <span className="d-hit" aria-hidden="true">
              volumen
            </span>
            <span className="d-hit" aria-hidden="true">
              de tarima.
            </span>
          </h1>
          <Pic s={shot(FOTOS.bateria, 640, 3)} eager cap="Ensayo de batería, diciembre de 2025" className="d-hero__pic" />
          <ul className="d-stick">
            <li>$30.000 la hora</li>
            <li>8:00 a 22:00</li>
            <li>Sala A, aislada</li>
          </ul>
          <div className="d-hero__go">
            <a className="d-btn" href="#reservar">
              <span>Reservar una hora</span>
            </a>
            <a className="d-ln" href="#sala">
              Ver la sala
            </a>
          </div>
        </div>
        <div className="d-vu" data-bars aria-hidden="true" />
      </header>

      <div className="d-tape" aria-hidden="true">
        <Tape words={CINTA_A} dir={-1} />
        <Tape words={CINTA_B} dir={1} hollow />
      </div>

      <main id="contenido">
        <section className="d-sec d-room" id="sala" aria-labelledby="sala-t">
          <div className="d-wrap d-room__grid">
            <div className="d-room__head" data-hit>
              <h2 id="sala-t" className="d-h2" data-text="La Sala A">
                La Sala A
              </h2>
              <p className="d-say">
                Un cuarto aislado, a volumen de tarima. Paneles rojos, piso de caucho, batería armada y la luz baja.
                Cabe una banda completa con su backline: llegas, conectas y tocas.
              </p>
            </div>
            <Pic s={shot(FOTOS.puerta, 640, -2)} cap="La Sala A desde la puerta, junio de 2025" className="d-room__pic" />
            <dl className="d-ficha" data-hit>
              {FICHA.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Tres usos: seccion anclada que cambia a cortes, sin transicion */}
        <section className="d-cuts" id="estudio" aria-labelledby="estudio-t">
          <div className="d-cuts__pin" data-state="0">
            <h2 id="estudio-t" className="d-cuts__title">
              Tres maneras de usar la casa
            </h2>
            {USOS.map((u, i) => (
              <article key={u.w} className={`d-cut${i === 0 ? " is-on" : ""}`} data-cut={i}>
                <div className="d-wrap d-cut__grid">
                  <p className="d-cut__n">
                    {i + 1} de 3
                  </p>
                  <h3 className="d-cut__word">{u.w}</h3>
                  <div className="d-cut__text">
                    <p>{u.d}</p>
                    <p className="d-cut__p">{u.p}</p>
                  </div>
                  <Pic s={u.s} className="d-cut__pic" />
                </div>
              </article>
            ))}
            <p className="d-cuts__note">Lo que no sea ensayo se conversa antes y se cotiza por proyecto.</p>
          </div>
        </section>

        <section className="d-sec d-gear" id="equipo" aria-labelledby="gear-t">
          <div className="d-wrap">
            <div className="d-head" data-hit>
              <h2 id="gear-t" className="d-h2" data-text="Llegas, conectas y tocas.">
                Llegas, conectas y tocas.
              </h2>
              <p className="d-say">Lo que no esté en la lista, tráelo: la sala tiene sitio.</p>
            </div>
            <ul className="d-rows" data-hit>
              {EQUIPO.map(([n, k, s]) => (
                <li key={n} className="d-row" tabIndex={0}>
                  <span className="d-row__n">{n}</span>
                  <span className="d-row__k">{k}</span>
                  <span className="d-row__s">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="d-slash" aria-hidden="true">
          <div className="d-slash__blade">
            <div className="d-slash__txt">
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <i key={k}>Aparta la sala</i>
              ))}
            </div>
          </div>
        </div>

        <section className="d-sec d-book" id="reservar" aria-labelledby="book-t">
          <div className="d-wrap">
            <div className="d-head" data-hit>
              <h2 id="book-t" className="d-h2" data-text="Aparta la sala.">
                Aparta la sala.
              </h2>
              <p className="d-say">Elige el día y las horas. El total se arma solo y la reserva se escribe por Instagram.</p>
            </div>
            <div data-hit="self">
              <Reserva />
            </div>
            <dl className="d-faq" data-hit>
              {FAQ.map(([q, a]) => (
                <div key={q}>
                  <dt>{q}</dt>
                  <dd>{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="d-sec d-wall" aria-labelledby="wall-t">
          <div className="d-wrap">
            <div className="d-head" data-hit>
              <h2 id="wall-t" className="d-h2" data-text="Lo que pasa adentro.">
                Lo que pasa adentro.
              </h2>
              <p className="d-say">
                Ensayos, sesiones y mezclas, tal como salen de la sala. Lo de cada semana está en{" "}
                <a className="d-ln" href={INSTAGRAM_PERFIL}>
                  @{INSTAGRAM_USUARIO}
                </a>
                .
              </p>
            </div>
            <div className="d-wall__pics">
              <Pic s={shot(FOTOS.portatil, 640, -3)} cap="La sesión abierta, de noche" />
              <Pic s={shot(FOTOS.monitor, 420, 4)} cap="La pared magenta" />
              <Pic s={shot(FOTOS.bateriaDet, 420, -2)} cap="Microfonía de la batería" />
              <Pic s={shot(FOTOS.escritorio, 420, 3)} cap="El puesto de producción" />
            </div>
          </div>
        </section>
      </main>

      <footer className="d-foot">
        <div className="d-wrap d-foot__call" data-hit>
          <h2 className="d-h2 d-h2--xl" data-text="¿Listo para entrar en trance?">
            ¿Listo para entrar en trance?
          </h2>
          <div className="d-hero__go">
            <a className="d-btn d-btn--ink" href="#reservar">
              <span>Reservar una hora</span>
            </a>
            <a className="d-ln" href={INSTAGRAM_MENSAJE}>
              Escribir por Instagram
            </a>
          </div>
        </div>
        <div className="d-wrap d-foot__cols">
          <div>
            <h2>Visítanos</h2>
            <p>Sala A, {CIUDAD}</p>
          </div>
          <div>
            <h2>Contacto</h2>
            <p>
              <a className="d-ln" href={INSTAGRAM_PERFIL}>
                Instagram @{INSTAGRAM_USUARIO}
              </a>
            </p>
            <p>Reservas y cotizaciones por mensaje</p>
          </div>
          <div>
            <h2>Horario</h2>
            <p>8:00 a 22:00, por horas, con reserva</p>
          </div>
        </div>
        <p className="d-foot__name" aria-hidden="true">
          <span data-name="D'mente" />
        </p>
        <p className="d-wrap d-foot__end">
          <span>© 2026 D&apos;mente Estudio</span>
          <a className="d-ln" href={RELEVEN_URL}>
            Casa de Releven
          </a>
        </p>
      </footer>

      <Motor />
    </>
  );
}
