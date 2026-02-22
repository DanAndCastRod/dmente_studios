import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Services() {
    return (
        <section id="servicios" className="py-24 bg-bg-abyss relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                        DOS CORAZONES,<br />UN ESTUDIO
                    </h2>
                    <div className="w-24 h-1 bg-primary-neon mx-auto rounded-full glow-btn"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Tarjeta A: Ensayo */}
                    <div className="group relative rounded-sm overflow-hidden bg-surface-dark border border-white/5 hover:border-primary-neon/50 transition-colors">
                        <div className="h-64 relative overflow-hidden">
                            <Image
                                src="/images/dmente_rehearsal_drums_1771798262346.png"
                                alt="Sala de Ensayo"
                                fill
                                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
                        </div>
                        <div className="p-8 relative z-10 -mt-10">
                            <div className="w-12 h-12 bg-primary-neon/20 rounded-full flex items-center justify-center mb-4 border border-primary-neon/30">
                                <span className="text-primary-neon font-display font-bold">01</span>
                            </div>
                            <h3 className="text-2xl font-display font-bold text-white mb-3">
                                LA SALA DE ENSAYO
                            </h3>
                            <p className="text-gray-400 mb-6 font-body leading-relaxed">
                                Rompe el silencio. Acústica impecable y backline profesional para que tu banda sude la camiseta antes del show.
                            </p>
                            <Link href="#reservas" className="inline-flex items-center text-accent-cyan font-bold tracking-widest text-sm hover:text-white transition-colors gap-2">
                                RESERVAR BLOQUE
                                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Tarjeta B: Producción */}
                    <div className="group relative rounded-sm overflow-hidden bg-surface-dark border border-white/5 hover:border-accent-cyan/50 transition-colors">
                        <div className="h-64 relative overflow-hidden">
                            <Image
                                src="/images/dmente_hero_console_1771798247932.png"
                                alt="Laboratorio de Producción"
                                fill
                                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
                        </div>
                        <div className="p-8 relative z-10 -mt-10">
                            <div className="w-12 h-12 bg-accent-cyan/10 rounded-full flex items-center justify-center mb-4 border border-accent-cyan/30">
                                <span className="text-accent-cyan font-display font-bold">02</span>
                            </div>
                            <h3 className="text-2xl font-display font-bold text-white mb-3">
                                EL LABORATORIO
                            </h3>
                            <p className="text-gray-400 mb-6 font-body leading-relaxed">
                                Precisión milimétrica. Desde la captura hasta el máster final. El entorno perfecto para materializar tus ideas musicales.
                            </p>
                            <Link href="#reservas" className="inline-flex items-center text-primary-neon font-bold tracking-widest text-sm hover:text-white transition-colors gap-2">
                                AGENDAR SESIÓN
                                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
