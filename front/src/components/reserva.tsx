"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { INSTAGRAM_MENSAJE, INSTAGRAM_USUARIO } from "@/lib/contacto";

// Lo vivo de la pagina: elegir dia y horas de la Sala A y ver el total. Disponibilidad de ejemplo.
// DEMOSTRACION: no envia nada ni llama a ninguna API (ni api.releven.cc ni URiT). Los avisos estan apagados.
// El estudio no publica correo: la reserva se escribe por Instagram. Al pulsar se copia el mensaje con el
// dia y las horas y se abre el chat del estudio. Pago, cancelaciones y devoluciones no se escriben aqui:
// los fija el portal de reservas.
const PRICE = 30000;
const OPEN = 8;
const CLOSE = 22;
// El export estatico se arma con una fecha fija; en el navegador la semana arranca el dia de hoy.
// Clave "anio-mes-dia" con el mes desde 0, como Date: "2026-10-17" es el 17 de noviembre de 2026.
const BUILD_DAY = "2026-10-17";
const dayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};
const noSubscribe = () => () => undefined;
const SHORT = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const LONG = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const fmt = (n: number) => "$" + n.toLocaleString("es-CO");

function busyFor(d: Date) {
  const s = d.getDate();
  return new Set([10 + (s % 3), 11 + (s % 3), 16 + (s % 2), 17 + (s % 2), s % 4 === 0 ? 20 : -1]);
}

export function Reserva() {
  const [day, setDay] = useState(0);
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const today = useSyncExternalStore(noSubscribe, dayKey, () => BUILD_DAY);

  const days = useMemo(() => {
    const [y, m, d0] = today.split("-").map(Number);
    return Array.from({ length: 7 }, (_, i) => new Date(y, m, d0 + i));
  }, [today]);
  const date = days[day];
  const busy = useMemo(() => busyFor(date), [date]);

  const pick = (h: number) => {
    setCopied(false);
    if (start === null || end !== null || h < start) {
      setStart(h);
      setEnd(null);
      return;
    }
    for (let k = start; k <= h; k++) {
      if (busy.has(k)) {
        setStart(h);
        setEnd(null);
        return;
      }
    }
    setEnd(h);
  };

  const last = start === null ? null : (end ?? start) + 1;
  const hours = start === null || last === null ? 0 : last - start;
  const dateText = `${LONG[date.getDay()]} ${date.getDate()} de ${MONTHS[date.getMonth()]}`;
  const ready = hours > 0;
  const message = ready
    ? `Hola, quiero reservar la Sala A el ${dateText.toLowerCase()} de ${start}:00 a ${last}:00 (${hours} ${hours === 1 ? "hora" : "horas"}, ${fmt(hours * PRICE)}).`
    : "";

  return (
    <div className="book">
      <aside className="stub" aria-label="Tu reserva">
        <p className="stub__lab">Sala A · ensayo por horas</p>
        <p className="stub__price">
          <NumberTicker value={ready ? hours * PRICE : PRICE} startValue={PRICE} prefix="$" aria-hidden="true" />
          <span className="sr-only">{ready ? `Total: ${fmt(hours * PRICE)}` : "$30.000 la hora"}</span>
        </p>
        <p className="stub__unit">{ready ? "Total de la reserva" : "La hora, en la Sala A"}</p>
        <p className="stub__when" aria-live="polite">
          <strong>{dateText}</strong>
          <span>{ready ? `${start}:00 a ${last}:00 · ${hours} ${hours === 1 ? "hora" : "horas"}` : "Elige la primera hora."}</span>
        </p>
        <ul className="stub__lines">
          <li>Batería, backline y monitoreo incluidos</li>
          <li>Pago, cambios y devoluciones: según las condiciones del portal de reservas</li>
        </ul>
        <a
          className="btn stub__go"
          href={INSTAGRAM_MENSAJE}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!ready}
          tabIndex={ready ? 0 : -1}
          onClick={(e) => {
            if (!ready) {
              e.preventDefault();
              return;
            }
            navigator.clipboard?.writeText(message).then(
              () => setCopied(true),
              () => undefined
            );
          }}
        >
          <span>Reservar por Instagram</span>
        </a>
        <p className="stub__note" role="status">
          {copied
            ? `Copiamos tu reserva: pégala en el mensaje a @${INSTAGRAM_USUARIO}.`
            : `Se abre el chat de @${INSTAGRAM_USUARIO} con tu día y tus horas copiados.`}
        </p>
      </aside>

      <div className="book__days">
        <p className="book__label" id="dia-l">
          El día
        </p>
        <div className="days" role="group" aria-labelledby="dia-l">
          {days.map((d, i) => (
            <button
              key={i}
              type="button"
              className="day"
              aria-pressed={i === day}
              onClick={() => {
                setDay(i);
                setStart(null);
                setEnd(null);
                setCopied(false);
              }}
            >
              <span>{i === 0 ? "Hoy" : SHORT[d.getDay()]}</span>
              <b>{d.getDate()}</b>
              <span className="sr-only">, {`${LONG[d.getDay()]} ${d.getDate()} de ${MONTHS[d.getMonth()]}`}</span>
            </button>
          ))}
        </div>
        <p className="book__hint">Toca la hora en que llegas y la hora en que te vas. Disponibilidad de ejemplo.</p>
      </div>

      <div className="book__hours">
        <p className="book__label" id="horas-l">
          Las horas · {dateText.toLowerCase()}
        </p>
        <div className="slots" role="group" aria-labelledby="horas-l">
          {Array.from({ length: CLOSE - OPEN }, (_, k) => {
            const h = OPEN + k;
            const taken = busy.has(h);
            const sel = start !== null && h >= start && h <= (end ?? start);
            return (
              <button
                key={h}
                type="button"
                className="slot"
                disabled={taken}
                aria-pressed={sel}
                aria-label={`${h}:00, ${taken ? "ocupada" : sel ? "elegida" : "libre"}`}
                onClick={() => pick(h)}
              >
                <span>{h}:00</span>
                <small>{taken ? "ocupada" : sel ? "tuya" : "libre"}</small>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
