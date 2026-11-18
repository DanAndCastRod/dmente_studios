"use client";

// Cifra que llega a su valor con un resorte (formato es-CO con prefijo: $90.000).
// v6: el resorte es de Motion (animate), como pide la regla de Daniel Castaneda para React.
// Con movimiento reducido salta directo.

import { useEffect, useRef } from "react";
import { animate } from "motion";

const format = (n: number, prefix: string) => prefix + Intl.NumberFormat("es-CO").format(Math.round(n));

export function NumberTicker({
  value,
  startValue = 0,
  prefix = "",
  className,
  ...props
}: { value: number; startValue?: number; prefix?: string } & React.ComponentPropsWithoutRef<"span">) {
  const ref = useRef<HTMLSpanElement>(null);
  const current = useRef(startValue);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      current.current = value;
      el.textContent = format(value, prefix);
      return;
    }
    const controls = animate(current.current, value, {
      type: "spring",
      stiffness: 260,
      damping: 20,
      onUpdate: (v) => {
        current.current = v;
        el.textContent = format(v, prefix);
      },
    });
    return () => controls.stop();
  }, [value, prefix]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", display: "inline-block" }} {...props}>
      {format(startValue, prefix)}
    </span>
  );
}
