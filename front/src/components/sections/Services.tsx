import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { INSTAGRAM_MENSAJE } from '@/lib/contacto';

const servicios = [
    {
        numero: '01',
        titulo: 'LA SALA DE ENSAYO',
        texto: 'Rompe el silencio. Acústica impecable y backline profesional para que tu banda sude la camiseta antes del show.',
        imagen: '/images/dmente_rehearsal_drums_1771798262346.png',
        alt: 'Imagen ilustrativa de una batería en una sala de ensayo con luces violeta. No es una foto del estudio.',
        accion: 'Reservar ensayo',
        borde: 'hover:border-primary-neon/60',
        insignia: 'bg-primary-neon/20 border-primary-neon/40 text-primary-soft',
        enlace: 'text-accent-cyan',
    },
    {
        numero: '02',
        titulo: 'EL LABORATORIO',
        texto: 'Precisión milimétrica. Desde la captura hasta el máster final. El entorno perfecto para materializar tus ideas musicales.',
        imagen: '/images/dmente_gear_showcase_1771798276042.png',
        alt: 'Imagen ilustrativa de un micrófono de condensador junto a una interfaz de audio. No es una foto del estudio.',
        accion: 'Agendar producción',
        borde: 'hover:border-accent-cyan/60',
        insignia: 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan',
        enlace: 'text-primary-soft',
    },
];

export default function Services() {
    return (
        <section id="servicios" className="py-24 bg-bg-abyss relative scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                        DOS CORAZONES,<br />UN ESTUDIO
                    </h2>
                    <div className="w-24 h-1 bg-primary-neon mx-auto rounded-full" aria-hidden="true"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {servicios.map((s) => (
                        <article key={s.numero} className={`group relative rounded-sm overflow-hidden bg-surface-dark border border-white/5 ${s.borde}`}>
                            <div className="h-64 relative overflow-hidden">
                                <Image
                                    src={s.imagen}
                                    alt={s.alt}
                                    fill
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
                            </div>
                            <div className="p-8 relative z-10 -mt-10">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 border ${s.insignia}`}>
                                    <span className="font-display font-bold">{s.numero}</span>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white mb-3">
                                    {s.titulo}
                                </h3>
                                <p className="text-gray-300 mb-6 font-body leading-relaxed">
                                    {s.texto}
                                </p>
                                <a
                                    href={INSTAGRAM_MENSAJE}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${s.accion} por Instagram (abre un mensaje directo en una pestaña nueva)`}
                                    className={`inline-flex items-center ${s.enlace} hover:text-white active:opacity-70 ui-motion font-bold tracking-widest text-sm uppercase gap-2 rounded-sm py-1`}
                                >
                                    {s.accion} por Instagram
                                    <ArrowRight size={16} aria-hidden="true" className="ui-motion group-hover:translate-x-2" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                <p className="mt-8 text-center text-gray-400 text-sm">
                    Las imágenes de esta página son ilustrativas, generadas por computador. No son fotos de la sala.
                </p>
            </div>
        </section>
    );
}
