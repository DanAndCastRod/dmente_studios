import Link from 'next/link';
import { Play } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Image / Placeholder for Video */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/dmente_hero_console_1771798247932.png"
                    alt="D'mente Console"
                    fill
                    priority
                    className="object-cover object-center opacity-40 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
                />
                {/* Dark overlay to ensure text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-bg-abyss/80 via-bg-abyss/60 to-bg-abyss"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary-neon/30 bg-primary-neon/10 backdrop-blur-sm">
                    <span className="text-accent-cyan font-semibold text-xs tracking-widest uppercase">
                        Estudio Híbrido & Salas de Ensayo
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                    LA HIPNOSIS<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-neon to-accent-cyan">
                        DEL SONIDO
                    </span><br />
                    EN PEREIRA
                </h1>

                <p className="max-w-2xl text-gray-300 text-lg md:text-xl font-body leading-relaxed mb-10">
                    Trae el ruido de tu mente. Nosotros ponemos el espacio, el aislamiento y la técnica para que el mundo lo escuche.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        href="#servicios"
                        className="w-full sm:w-auto px-8 py-4 bg-primary-neon text-white font-display text-sm tracking-widest glow-btn rounded-sm flex items-center justify-center"
                    >
                        Ver Servicios
                    </Link>
                    <Link
                        href="#dmente-sessions"
                        className="w-full sm:w-auto px-8 py-4 bg-transparent border border-surface-dark text-white font-display text-sm tracking-widest hover:border-accent-cyan hover:text-accent-cyan transition-all rounded-sm flex items-center justify-center gap-2"
                    >
                        <Play size={16} />
                        Escucha nuestro trabajo
                    </Link>
                </div>
            </div>
        </section>
    );
}
