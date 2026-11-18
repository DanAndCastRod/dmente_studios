"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// El guion de movimiento de D'mente (GSAP + ScrollTrigger + Lenis). Lenguaje: golpe y corte.
// Entradas de 0,2 a 0,35 s con rebote corto, cambios de campo sin transicion, y todo lo que es texto grande
// obedece a la VELOCIDAD del scroll (cintas, titulares desfasados). Solo transform y opacity.
// Con prefers-reduced-motion no corre nada de esto. Catalogo de efectos: diseno/v6/INTERACCIONES-MOXEN.md.
export function Motor() {
  useEffect(() => {
    const root = document.documentElement;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];
    if (still) {
      root.classList.add("gl-off");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    let gl: { destroy: () => void; burst: (v?: number) => void } | null = null;

    const ctx = gsap.context(() => {
      // E6. Inercia corta: mas nerviosa que la de Releven.
      const lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 1.05 });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      });
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
        const go = (e: Event) => {
          const el = document.querySelector<HTMLElement>(a.getAttribute("href") || "#x");
          if (!el) return;
          e.preventDefault();
          gl?.burst(1);
          lenis.scrollTo(el, { duration: 0.7, easing: (t) => 1 - Math.pow(2, -10 * t) });
          el.setAttribute("tabindex", "-1");
          el.focus({ preventScroll: true });
        };
        a.addEventListener("click", go);
        cleanups.push(() => a.removeEventListener("click", go));
      });

      // E12 / E18. Velocidad del scroll con su resorte: mueve las cintas y desfasa los titulares (--v).
      const rows = gsap.utils.toArray<HTMLElement>("[data-tape]").map((row, i) => {
        const run = row.querySelector<HTMLElement>(".d-tape__run")!;
        return { run, dir: Number(row.dataset.tape) || 1, x: 0, half: 0, skew: 0, sv: 0, k: 150 + i * 90, base: 70 + i * 30 };
      });
      const measure = () => rows.forEach((r) => (r.half = r.run.scrollWidth / 2));
      measure();
      window.addEventListener("resize", measure);
      cleanups.push(() => window.removeEventListener("resize", measure));
      let lastY = window.scrollY;
      let vel = 0;
      let shown = 0;
      const nav = document.querySelector<HTMLElement>(".d-nav");
      let navY = window.scrollY;
      const onNav = () => {
        const y = window.scrollY;
        if (Math.abs(y - navY) < 6) return;
        nav?.classList.toggle("is-away", y > navY && y > window.innerHeight * 0.6);
        navY = y;
      };
      window.addEventListener("scroll", onNav, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onNav));
      const loop = (_t: number, dms: number) => {
        const dt = Math.min(0.05, dms / 1000);
        const y = window.scrollY;
        const raw = Math.max(-1.6, Math.min(1.6, (y - lastY) / Math.max(dt, 0.001) / 2600));
        lastY = y;
        vel += (raw - vel) * (1 - Math.exp(-dt * 10));
        if (Math.abs(vel - shown) > 0.004) {
          shown = Math.abs(vel) < 0.004 ? 0 : vel;
          root.style.setProperty("--v", shown.toFixed(3));
        }
        for (const r of rows) {
          // Cada cinta tiene su propio resorte para la inclinacion: al frenar rebotan fuera de fase.
          const target = vel * 16;
          r.sv += ((target - r.skew) * r.k - r.sv * 14) * dt;
          r.skew += r.sv * dt;
          r.x += r.dir * (r.base + Math.abs(vel) * 1500) * dt * (vel < -0.05 ? -1 : 1);
          if (r.half > 0) r.x = ((r.x % r.half) + r.half) % r.half;
          r.run.style.transform = `translate3d(${-r.x}px,0,0) skewX(${r.skew.toFixed(2)}deg) scaleY(${(1 + Math.min(0.35, Math.abs(r.skew) * 0.012)).toFixed(3)})`;
        }
      };
      gsap.ticker.add(loop);
      cleanups.push(() => gsap.ticker.remove(loop));

      // Golpes: los bloques entran rapido y con rebote corto, una vez.
      gsap.utils.toArray<HTMLElement>("[data-hit]").forEach((el) => {
        const kids = el.dataset.hit === "self" ? [el] : Array.from(el.children);
        gsap.from(kids, {
          y: 46,
          opacity: 0,
          duration: 0.34,
          ease: "back.out(2.4)",
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".d-h2").forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => gl?.burst(0.8) });
      });

      // E14, en crudo. Seccion anclada: tres estados que cambian a cortes (sin interpolar) y con un fogonazo.
      const pin = document.querySelector<HTMLElement>(".d-cuts__pin");
      const cuts = gsap.utils.toArray<HTMLElement>(".d-cut");
      if (pin && cuts.length) {
        let state = 0;
        const set = (i: number) => {
          if (i === state) return;
          state = i;
          pin.dataset.state = String(i);
          cuts.forEach((c, k) => c.classList.toggle("is-on", k === i));
          pin.classList.remove("is-flash");
          void pin.offsetWidth;
          pin.classList.add("is-flash");
          gl?.burst(1.2);
          gsap.fromTo(cuts[i].querySelector(".d-cut__word"), { scale: 1.22, xPercent: -3 }, { scale: 1, xPercent: 0, duration: 0.3, ease: "back.out(2.6)" });
        };
        ScrollTrigger.create({
          trigger: ".d-cuts",
          start: "top top",
          end: "+=240%",
          pin,
          anticipatePin: 1,
          onUpdate: (s) => set(Math.min(cuts.length - 1, Math.floor(s.progress * cuts.length * 0.999))),
        });
      }

      // E17. Tajo: la hoja magenta cruza la pantalla con el scroll y el texto corre dentro.
      gsap.fromTo(
        ".d-slash__blade",
        { xPercent: -104 },
        { xPercent: 0, ease: "none", scrollTrigger: { trigger: ".d-slash", start: "top 96%", end: "top 38%", scrub: 0.25 } }
      );
      gsap.to(".d-slash__txt", {
        xPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: ".d-slash", start: "top bottom", end: "bottom top", scrub: true },
      });

      // Las fotos del muro suben a distinta velocidad (paralaje); el lienzo WebGL las sigue.
      gsap.utils.toArray<HTMLElement>(".d-wall__pics .d-pic").forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: 8 + i * 5 },
          { yPercent: -6 - i * 4, ease: "none", scrollTrigger: { trigger: ".d-wall__pics", start: "top bottom", end: "bottom top", scrub: true } }
        );
      });
      gsap.to(".d-hero__pic", {
        yPercent: -26,
        ease: "none",
        scrollTrigger: { trigger: ".d-hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".d-mega", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: ".d-hero", start: "top top", end: "bottom top", scrub: true },
      });

      // El nombre del pie corre de lado con el scroll.
      gsap.fromTo(
        ".d-foot__name span",
        { xPercent: 9 },
        { xPercent: 0, ease: "none", scrollTrigger: { trigger: ".d-foot", start: "top bottom", end: "bottom bottom", scrub: true } }
      );
    });
    cleanups.push(() => ctx.revert());
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    cleanups.push(() => window.removeEventListener("load", refresh));

    // E9, variante Negativo: un circulo que invierte lo que pisa, crece sobre lo pulsable y se estira al correr.
    if (fine) {
      const cur = document.createElement("i");
      cur.className = "d-cur";
      cur.setAttribute("aria-hidden", "true");
      cur.appendChild(document.createElement("b"));
      document.body.append(cur);
      let x = innerWidth / 2;
      let y = innerHeight / 2;
      let ax = x;
      let ay = y;
      let on = false;
      let raf = 0;
      const move = (e: PointerEvent) => {
        x = e.clientX;
        y = e.clientY;
        if (!on) {
          on = true;
          ax = x;
          ay = y;
          cur.classList.add("is-on");
        }
        const hit = (e.target as Element | null)?.closest?.("a, button, .d-row, .d-pic, summary");
        cur.classList.toggle("is-hot", !!hit);
      };
      const down = () => {
        cur.classList.remove("is-pop");
        void cur.offsetWidth;
        cur.classList.add("is-pop");
      };
      const loop = () => {
        const dx = x - ax;
        const dy = y - ay;
        ax += dx * 0.3;
        ay += dy * 0.3;
        const sp = Math.min(1.1, Math.hypot(dx, dy) / 90);
        cur.style.transform = `translate3d(${ax}px,${ay}px,0) rotate(${Math.atan2(dy, dx)}rad) scale(${1 + sp},${1 - sp * 0.35})`;
        raf = requestAnimationFrame(loop);
      };
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerdown", down, { passive: true });
      raf = requestAnimationFrame(loop);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerdown", down);
        cur.remove();
      });
    }

    // WebGL diferido: three.js se pide despues de la carga, en un rato libre.
    let dead = false;
    const fail = () => {
      root.classList.remove("gl-on");
      root.classList.add("gl-off");
      document.querySelectorAll("img.is-gl").forEach((i) => i.classList.remove("is-gl"));
      gl?.destroy();
      gl = null;
    };
    const boot = async () => {
      const host = document.querySelector<HTMLElement>(".d-gl");
      if (dead || !host) return;
      try {
        const { createSala } = await import("@/gl/sala");
        if (dead) return;
        const made = await createSala({
          host,
          field: document.querySelector<HTMLElement>("[data-field]"),
          bars: document.querySelector<HTMLElement>("[data-bars]"),
          images: Array.from(document.querySelectorAll<HTMLImageElement>("img[data-gl]")),
          finePointer: fine,
          onLost: fail,
          onPhoto: (img) => img.classList.add("is-gl"),
        });
        if (dead) {
          made.destroy();
          return;
        }
        gl = made;
        root.classList.add("gl-on");
      } catch {
        fail();
      }
    };
    const idle = (fn: () => void) => {
      const ric = (window as unknown as { requestIdleCallback?: (f: () => void, o: { timeout: number }) => number }).requestIdleCallback;
      if (ric) ric(fn, { timeout: 1500 });
      else window.setTimeout(fn, 300);
    };
    const start = () => idle(boot);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      dead = true;
      window.removeEventListener("load", start);
      gl?.destroy();
      cleanups.forEach((f) => f());
    };
  }, []);

  return null;
}
