// La Sala A en WebGL (three.js): un solo lienzo fijo detras del texto que dibuja tres cosas.
//
// 1. El campo de la portada: la luz magenta de la sala como ruido que hierve, posterizado en bandas duras, con
//    grano grueso, lineas de barrido y rasgaduras horizontales que crecen con la velocidad del scroll. El puntero
//    lo calienta.
// 2. Las fotos: cada <img data-gl> de la pagina se redibuja aqui, en su mismo sitio, con un shader: separacion
//    RGB y tiras corridas segun la velocidad del scroll, duotono magenta tramado (asi unas miniaturas de
//    Instagram aguantan mas tamano) y, al pasar el puntero, la foto real con un abombado bajo el cursor.
//    Entran a golpes, por bloques.
// 3. El vumetro: una fila de barras de LED (InstancedMesh: una geometria repetida) que salta como un analizador
//    de espectro y sube con el scroll y cerca del puntero.
// Reglas de la casa: ACESFilmicToneMapping, salida sRGB, dispose de geometrias, materiales y texturas.
import {
  ACESFilmicToneMapping,
  ClampToEdgeWrapping,
  InstancedBufferAttribute,
  InstancedMesh,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector2,
  Vector4,
  WebGLRenderer,
} from "three";

const NOISE = /* glsl */ `
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 4; i++) {
    s += a * vnoise(p);
    p = p * 2.03 + vec2(17.1, 9.2);
    a *= 0.5;
  }
  return s;
}`;

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const FIELD_FRAG = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uVel;
uniform float uBurst;
uniform float uOff;
uniform vec2 uPointer;
varying vec2 vUv;
${NOISE}
void main() {
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(vUv.x * asp, vUv.y + uOff);
  // Rasgaduras: algunas bandas horizontales se corren de golpe con la velocidad.
  float band = floor(vUv.y * 30.0);
  float on = step(0.7, hash(vec2(band * 1.7, floor(uTime * 9.0))));
  p.x += (hash(vec2(band, floor(uTime * 14.0))) - 0.5) * (abs(uVel) * 0.5 + uBurst * 0.7) * on;

  vec2 q = p * 1.35;
  float t = uTime * 0.13;
  vec2 w = vec2(fbm(q + vec2(t, -t)), fbm(q + vec2(5.2 - t, 1.3 + t)));
  float n = fbm(q + 2.3 * w + vec2(0.0, t * 2.0));

  float heat = smoothstep(0.6, 0.0, distance(vec2(vUv.x * asp, vUv.y), vec2(uPointer.x * asp, uPointer.y)));
  float v = n * 1.3 + heat * 0.5 - 0.34;
  v -= (1.0 - vUv.x) * 0.26;               // el lado del titular queda mas oscuro
  v += abs(uVel) * 0.12 + uBurst * 0.25;
  v = clamp(v, 0.0, 1.4);
  v = mix(v, floor(v * 6.0) / 6.0, 0.7);     // bandas duras

  vec3 c = mix(vec3(0.018, 0.006, 0.012), vec3(0.42, 0.012, 0.20), smoothstep(0.04, 0.4, v));
  c = mix(c, vec3(1.7, 0.07, 0.82), smoothstep(0.4, 0.8, v));
  c = mix(c, vec3(3.0, 1.5, 2.3), smoothstep(0.92, 1.3, v));

  c += (hash(gl_FragCoord.xy + fract(uTime * 24.0) * 113.0) - 0.5) * 0.13;
  c *= 0.86 + 0.14 * step(0.5, fract(gl_FragCoord.y * 0.5));
  gl_FragColor = vec4(max(c, 0.0), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

const PHOTO_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uSize;
uniform vec2 uMouse;
uniform float uHover;
uniform float uReveal;
uniform float uDuo;
uniform float uTime;
uniform float uVel;
uniform float uBurst;
varying vec2 vUv;
${NOISE}
float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
float bayer(vec2 a) {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}
void main() {
  vec2 uv = vUv;
  // Entrada a golpes: la foto aparece por bloques, no con un fundido.
  float gate = step(hash(vec2(floor(uv.y * 8.0), floor(uv.x * 3.0) + 3.1)), uReveal * 1.02 - 0.01);
  if (gate < 0.5) discard;

  float amt = abs(uVel) + uBurst;
  float sl = floor(uv.y * 28.0);
  float on = step(0.5, hash(vec2(sl * 0.7, floor(uTime * 7.0))));
  uv.x += (hash(vec2(sl, floor(uTime * 16.0))) - 0.5) * amt * 0.11 * on;
  uv.y += uVel * 0.045 * sin(uv.x * 3.14159);

  vec2 d = uv - uMouse;
  float r = length(d * vec2(uSize.x / uSize.y, 1.0));
  uv -= d * smoothstep(0.5, 0.0, r) * 0.14 * uHover;

  float off = amt * 0.04 + uHover * 0.008 + 0.003;
  vec3 c;
  c.r = texture2D(uTex, uv + vec2(off, 0.0)).r;
  c.g = texture2D(uTex, uv).g;
  c.b = texture2D(uTex, uv - vec2(off, 0.0)).b;

  // Duotono magenta tramado; con el puntero encima vuelve la foto real.
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  float lq = clamp(floor((l * 1.9 + (bayer(gl_FragCoord.xy) - 0.5) * 0.3) * 4.0) / 3.0, 0.0, 1.0);
  vec3 duo = mix(vec3(0.02, 0.006, 0.014), vec3(0.86, 0.035, 0.42), smoothstep(0.0, 0.66, lq));
  duo = mix(duo, vec3(1.25, 1.05, 1.1), smoothstep(0.66, 1.0, lq));
  c = mix(c * 1.15, duo, uDuo * (1.0 - uHover));

  c += (hash(gl_FragCoord.xy + fract(uTime * 24.0) * 71.0) - 0.5) * 0.1;
  c *= 0.9 + 0.1 * step(0.5, fract(gl_FragCoord.y * 0.5));
  gl_FragColor = vec4(max(c, 0.0), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

const BARS_VERT = /* glsl */ `
attribute float aI;
uniform vec4 uRect;   // centro x, centro y, ancho, alto (px de camara)
uniform float uCount;
uniform float uTime;
uniform float uVel;
uniform float uPx;
varying vec2 vB;
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
void main() {
  float tq = floor(uTime * 11.0);
  float f = fract(uTime * 11.0);
  float lvl = mix(hash(vec2(aI * 91.7, tq)), hash(vec2(aI * 91.7, tq + 1.0)), f * f);
  float env = 0.3 + 0.7 * pow(sin(aI * 3.14159), 0.6);
  float near = smoothstep(0.2, 0.0, abs(aI - uPx));
  float hgt = clamp((0.1 + 0.5 * lvl) * env + near * 0.45 + abs(uVel) * 0.7 * lvl, 0.04, 1.0);
  float bw = uRect.z / uCount;
  float x = uRect.x - uRect.z * 0.5 + (aI * (uCount - 1.0) + 0.5) * bw + position.x * bw * 0.6;
  float y = uRect.y - uRect.w * 0.5 + (position.y + 0.5) * uRect.w * hgt;
  vB = vec2(position.x + 0.5, (position.y + 0.5) * hgt);
  gl_Position = projectionMatrix * viewMatrix * vec4(x, y, 0.0, 1.0);
}`;

const BARS_FRAG = /* glsl */ `
precision mediump float;
uniform float uSegs;
varying vec2 vB;
void main() {
  float seg = step(0.3, fract(vB.y * uSegs));
  if (seg < 0.5) discard;
  vec3 c = mix(vec3(1.5, 0.06, 0.72), vec3(2.8, 2.3, 2.5), smoothstep(0.62, 0.95, vB.y));
  gl_FragColor = vec4(c, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

type Photo = {
  img: HTMLImageElement;
  mesh: Mesh;
  mat: ShaderMaterial;
  tex: Texture | null;
  visible: boolean;
  hover: number;
  reveal: number;
  seenAt: number;
  revealAt: number;
  rot: number;
};

export type Sala = { destroy: () => void; burst: (v?: number) => void };

export async function createSala(opts: {
  host: HTMLElement;
  field: HTMLElement | null;
  bars: HTMLElement | null;
  images: HTMLImageElement[];
  finePointer: boolean;
  onLost: () => void;
  onPhoto: (img: HTMLImageElement) => void;
}): Promise<Sala> {
  const { host } = opts;
  const renderer = new WebGLRenderer({ antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: "high-performance" });
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.finePointer ? 1.5 : 1.25));
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);
  // Se cede el hilo entre pasos para no dejar una sola tarea larga al arrancar.
  const rest = () => new Promise<void>((r) => setTimeout(r, 0));
  await rest();

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, -10, 10);
  const geo = new PlaneGeometry(1, 1);
  const shared = { uTime: { value: 0 }, uVel: { value: 0 }, uBurst: { value: 0 } };

  // 1. Campo de la portada
  let field: Mesh | null = null;
  let fieldMat: ShaderMaterial | null = null;
  if (opts.field) {
    fieldMat = new ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FIELD_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: { ...shared, uRes: { value: new Vector2(1, 1) }, uOff: { value: 0 }, uPointer: { value: new Vector2(0.7, 0.6) } },
    });
    field = new Mesh(geo, fieldMat);
    field.renderOrder = 0;
    field.frustumCulled = false;
    scene.add(field);
  }

  // 3. Vumetro
  const N = opts.finePointer ? 96 : 40;
  let bars: InstancedMesh | null = null;
  let barsMat: ShaderMaterial | null = null;
  let barsGeo: PlaneGeometry | null = null;
  if (opts.bars) {
    barsGeo = new PlaneGeometry(1, 1);
    const idx = new Float32Array(N);
    for (let i = 0; i < N; i++) idx[i] = i / (N - 1);
    barsGeo.setAttribute("aI", new InstancedBufferAttribute(idx, 1));
    barsMat = new ShaderMaterial({
      vertexShader: BARS_VERT,
      fragmentShader: BARS_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: shared.uTime,
        uVel: shared.uVel,
        uRect: { value: new Vector4(0, 0, 1, 1) },
        uCount: { value: N },
        uPx: { value: -1 },
        uSegs: { value: 14 },
      },
    });
    bars = new InstancedMesh(barsGeo, barsMat, N);
    bars.frustumCulled = false;
    bars.renderOrder = 1;
    scene.add(bars);
  }

  // 2. Fotos
  const loader = new TextureLoader();
  const photos: Photo[] = opts.images.map((img) => {
    const mat = new ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: PHOTO_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        ...shared,
        uTex: { value: null },
        uSize: { value: new Vector2(1, 1) },
        uMouse: { value: new Vector2(0.5, 0.5) },
        uHover: { value: 0 },
        uReveal: { value: 0 },
        uDuo: { value: img.dataset.duo ? Number(img.dataset.duo) : 1 },
      },
    });
    const mesh = new Mesh(geo, mat);
    mesh.visible = false;
    mesh.renderOrder = 2;
    mesh.frustumCulled = false;
    scene.add(mesh);
    return { img, mesh, mat, tex: null, visible: false, hover: 0, reveal: 0, seenAt: -1, revealAt: -1, rot: Number(img.dataset.rot || 0) };
  });
  let dead = false;
  const loadPhoto = (p: Photo) => {
    if (p.tex || p.seenAt === -2) return;
    p.seenAt = -2;
    const go = () =>
      loader.load(p.img.currentSrc || p.img.src, (t) => {
        if (dead) {
          t.dispose();
          return;
        }
        t.colorSpace = SRGBColorSpace;
        t.minFilter = LinearFilter;
        t.magFilter = LinearFilter;
        t.generateMipmaps = false;
        t.wrapS = t.wrapT = ClampToEdgeWrapping;
        p.tex = t;
        p.mat.uniforms.uTex.value = t;
        p.seenAt = performance.now();
        opts.onPhoto(p.img);
      });
    if (p.img.complete && p.img.naturalWidth) go();
    else p.img.addEventListener("load", go, { once: true });
  };

  let w = 1;
  let h = 1;
  const resize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.left = -w / 2;
    camera.right = w / 2;
    camera.top = h / 2;
    camera.bottom = -h / 2;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  const ptr = { x: -1e4, y: -1e4, at: -1e9 };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    ptr.x = e.clientX;
    ptr.y = e.clientY;
    ptr.at = performance.now();
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  // Solo se sigue (y se carga) lo que esta cerca de la pantalla.
  const byEl = new Map<Element, Photo>();
  photos.forEach((p) => byEl.set(p.img, p));
  let fieldSeen = !!opts.field;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.target === opts.field) {
          fieldSeen = e.isIntersecting;
          continue;
        }
        const p = byEl.get(e.target);
        if (!p) continue;
        p.visible = e.isIntersecting;
        if (e.isIntersecting) loadPhoto(p);
        else p.mesh.visible = false;
      }
      wake();
    },
    { rootMargin: "25% 0px 25% 0px" }
  );
  photos.forEach((p) => io.observe(p.img));
  if (opts.field) io.observe(opts.field);

  let raf = 0;
  let last = performance.now();
  let time = 0;
  let vel = 0;
  let burst = 0;
  let lastY = window.scrollY;
  let cleared = false;
  const wake = () => {
    if (!raf && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };
  const onVis = () => wake();
  document.addEventListener("visibilitychange", onVis);

  function frame(now: number) {
    raf = 0;
    if (document.hidden) return;
    const any = fieldSeen || photos.some((p) => p.visible);
    if (!any) {
      // Fuera de pantalla: un ultimo cuadro vacio y se detiene el bucle.
      if (!cleared) {
        renderer.clear();
        cleared = true;
      }
      return;
    }
    cleared = false;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    time += dt;

    const y = window.scrollY;
    const raw = (y - lastY) / Math.max(dt, 0.001) / 2600;
    lastY = y;
    vel += (Math.max(-1.6, Math.min(1.6, raw)) - vel) * (1 - Math.exp(-dt * 9));
    burst *= Math.exp(-dt * 5.5);
    shared.uTime.value = time;
    shared.uVel.value = vel;
    shared.uBurst.value = burst;
    const live = now - ptr.at < 4000;

    if (field && fieldMat && opts.field) {
      const r = opts.field.getBoundingClientRect();
      field.visible = fieldSeen && r.bottom > 0 && r.top < h;
      if (field.visible) {
        field.position.set(r.left + r.width / 2 - w / 2, h / 2 - (r.top + r.height / 2), 0);
        field.scale.set(r.width, r.height, 1);
        (fieldMat.uniforms.uRes.value as Vector2).set(r.width, r.height);
        fieldMat.uniforms.uOff.value = 0;
        const fp = fieldMat.uniforms.uPointer.value as Vector2;
        const tx = live ? (ptr.x - r.left) / r.width : 0.72 + Math.sin(time * 0.31) * 0.18;
        const ty = live ? 1 - (ptr.y - r.top) / r.height : 0.55 + Math.cos(time * 0.27) * 0.2;
        const k = 1 - Math.exp(-dt * 4);
        fp.x += (tx - fp.x) * k;
        fp.y += (ty - fp.y) * k;
      }
    }
    if (bars && barsMat && opts.bars) {
      const r = opts.bars.getBoundingClientRect();
      bars.visible = r.bottom > 0 && r.top < h && r.width > 0;
      if (bars.visible) {
        (barsMat.uniforms.uRect.value as Vector4).set(r.left + r.width / 2 - w / 2, h / 2 - (r.top + r.height / 2), r.width, r.height);
        barsMat.uniforms.uPx.value = live && ptr.y > r.top - 260 ? (ptr.x - r.left) / r.width : -1;
        barsMat.uniforms.uSegs.value = Math.max(6, Math.round(r.height / 9));
      }
    }
    for (const p of photos) {
      if (!p.visible || !p.tex) continue;
      const r = p.img.getBoundingClientRect();
      const on = r.bottom > -40 && r.top < h + 40;
      p.mesh.visible = on;
      if (!on) continue;
      const pw = p.img.offsetWidth;
      const ph = p.img.offsetHeight;
      p.mesh.position.set(r.left + r.width / 2 - w / 2, h / 2 - (r.top + r.height / 2), 0);
      p.mesh.scale.set(pw, ph, 1);
      p.mesh.rotation.z = (-p.rot * Math.PI) / 180;
      (p.mat.uniforms.uSize.value as Vector2).set(pw, ph);
      const inside = live && ptr.x >= r.left && ptr.x <= r.right && ptr.y >= r.top && ptr.y <= r.bottom;
      p.hover += ((inside ? 1 : 0) - p.hover) * (1 - Math.exp(-dt * (inside ? 14 : 6)));
      p.mat.uniforms.uHover.value = p.hover;
      if (inside) (p.mat.uniforms.uMouse.value as Vector2).set((ptr.x - r.left) / r.width, 1 - (ptr.y - r.top) / r.height);
      // Entrada en seis golpes, cuando la foto ya asoma un tercio.
      if (p.reveal < 1 && r.top < h * 0.92) {
        if (p.revealAt < 0) p.revealAt = now;
        p.reveal = Math.min(1, Math.floor(((now - p.revealAt) / 420) * 6) / 6 + 1 / 6);
        p.mat.uniforms.uReveal.value = p.reveal;
      }
    }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }

  const onLost = (e: Event) => {
    e.preventDefault();
    opts.onLost();
  };
  canvas.addEventListener("webglcontextlost", onLost);
  // Los tres shaders se compilan sin bloquear el hilo principal (KHR_parallel_shader_compile) antes del
  // primer cuadro. Medido con Lighthouse movil: sin esto, el primer render era una tarea de 601 ms.
  await rest();
  photos.forEach((p) => (p.mesh.visible = true));
  try {
    await renderer.compileAsync(scene, camera);
  } catch {
    /* si falla, compila al dibujar */
  }
  photos.forEach((p) => (p.mesh.visible = false));
  wake();

  return {
    burst(v = 1) {
      burst = Math.max(burst, v);
      wake();
    },
    destroy() {
      dead = true;
      cancelAnimationFrame(raf);
      raf = 0;
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost);
      for (const p of photos) {
        scene.remove(p.mesh);
        p.mat.dispose();
        p.tex?.dispose();
      }
      if (field) scene.remove(field);
      fieldMat?.dispose();
      if (bars) {
        scene.remove(bars);
        bars.dispose();
      }
      barsMat?.dispose();
      barsGeo?.dispose();
      geo.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
