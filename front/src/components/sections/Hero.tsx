import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { INSTAGRAM_MENSAJE } from '@/lib/contacto';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Fondo decorativo: imagen ilustrativa generada por computador, no es foto del estudio. */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <Image
                    src="/images/dmente_hero_console_1771798247932.png"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center opacity-40 mix-blend-luminosity"
                />
                {/* Dark overlay to ensure text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-bg-abyss/80 via-bg-abyss/60 to-bg-abyss"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary-neon/30 bg-primary-neon/10 backdrop-blur-sm">
                    <span className="text-accent-cyan font-semibold text-xs tracking-widest uppercase">
                        Sala de ensayo y producción
                    </span>
                </div>

                <h1 className="text-[1.75rem] min-[400px]:text-3xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                    LA HIPNOSIS<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-soft to-accent-cyan">
                        DEL SONIDO
                    </span><br />
                    EN PEREIRA
                </h1>

                <p className="max-w-2xl text-gray-300 text-lg md:text-xl font-body leading-relaxed mb-10">
                    Trae el ruido de tu mente. Nosotros ponemos el espacio, el aislamiento y la técnica para que el mundo lo escuche.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <a
                        href={INSTAGRAM_MENSAJE}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Escríbenos para reservar (abre un mensaje directo de Instagram en una pestaña nueva)"
                        className="w-full sm:w-auto px-8 py-4 bg-primary-neon hover:bg-[#6E3786] text-white font-display text-sm uppercase tracking-wide sm:tracking-widest glow-btn ui-motion active:scale-[0.97] rounded-sm flex items-center justify-center gap-2"
                    >
                        <Instagram size={16} aria-hidden="true" />
                        Escríbenos para reservar
                    </a>
                    <Link
                        href="#servicios"
                        className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-600 text-white font-display text-sm uppercase tracking-wide sm:tracking-widest hover:border-accent-cyan hover:text-accent-cyan ui-motion active:scale-[0.97] rounded-sm flex items-center justify-center"
                    >
                        Ver servicios
                    </Link>
                </div>
            </div>
        </section>
    );
}
