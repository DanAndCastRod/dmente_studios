import Link from 'next/link';
import { MapPin, Instagram, Clock } from 'lucide-react';
import { INSTAGRAM_MENSAJE, INSTAGRAM_PERFIL, INSTAGRAM_USUARIO, RELEVEN_URL } from '@/lib/contacto';

const claseEnlace = 'text-gray-300 hover:text-primary-soft active:opacity-70 ui-motion text-sm rounded-sm';

export default function Footer() {
    return (
        <footer className="bg-bg-abyss border-t border-surface-dark pt-20 pb-10 relative overflow-hidden">
            {/* Decorative neon glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary-neon to-transparent opacity-50" aria-hidden="true"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand Col */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-primary-neon/20 border border-primary-neon/50 flex items-center justify-center" aria-hidden="true">
                                <span className="text-primary-soft font-display font-bold text-xl leading-none">D&apos;</span>
                            </div>
                            <span className="font-display font-bold text-xl tracking-wider text-text-main">
                                MENTE
                            </span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            La hipnosis del sonido en Pereira. Nosotros ponemos el espacio, el aislamiento y la técnica para que el mundo lo escuche.
                        </p>
                        <a
                            href={INSTAGRAM_PERFIL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Instagram de D'mente Estudio, @${INSTAGRAM_USUARIO} (pestaña nueva)`}
                            className="w-11 h-11 rounded-full bg-surface-dark flex items-center justify-center text-gray-300 hover:text-accent-cyan active:scale-90 ui-motion"
                        >
                            <Instagram size={20} aria-hidden="true" />
                        </a>
                    </div>

                    {/* Links Col */}
                    <div>
                        <h2 className="font-display tracking-widest text-sm text-white mb-6">ESTUDIO</h2>
                        <ul className="space-y-4">
                            <li><Link href="#servicios" className={claseEnlace}>Servicios</Link></li>
                            <li><Link href="#equipamiento" className={claseEnlace}>El arsenal (equipo)</Link></li>
                            <li><Link href="#reservas" className={claseEnlace}>Reservas</Link></li>
                        </ul>
                    </div>

                    {/* Contact Col */}
                    <div>
                        <h2 className="font-display tracking-widest text-sm text-white mb-6">CONTACTO</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Instagram size={18} className="text-primary-soft shrink-0 mt-0.5" aria-hidden="true" />
                                <a href={INSTAGRAM_PERFIL} target="_blank" rel="noopener noreferrer" className={claseEnlace}>
                                    @{INSTAGRAM_USUARIO}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary-soft shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-gray-300 text-sm">
                                    Pereira, Risaralda<br />
                                    Colombia
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock size={18} className="text-primary-soft shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-gray-300 text-sm">
                                    Horarios y tarifas:<br />
                                    pregúntanos por Instagram
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Col */}
                    <div>
                        <h2 className="font-display tracking-widest text-sm mb-6 text-accent-cyan">¿LISTO PARA ENTRAR EN TRANCE?</h2>
                        <p className="text-gray-300 text-sm mb-6">Escríbenos para reservar tu bloque de ensayo o agendar una sesión de producción.</p>
                        <a
                            href={INSTAGRAM_MENSAJE}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Escríbenos por Instagram (abre un mensaje directo en una pestaña nueva)"
                            className="inline-flex items-center justify-center w-full bg-surface-dark border border-primary-neon/60 hover:border-primary-soft text-white px-6 py-3 rounded-sm font-display text-sm uppercase tracking-wide glow-btn ui-motion active:scale-[0.97] gap-2"
                        >
                            <Instagram size={16} aria-hidden="true" />
                            Escríbenos por Instagram
                        </a>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-surface-dark/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs">
                        © {new Date().getFullYear()} D&apos;mente Estudio. Todos los derechos reservados.
                    </p>
                    <p className="text-gray-400 text-xs">
                        Casa de{' '}
                        <a href={RELEVEN_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-gray-600 hover:text-white active:opacity-70 ui-motion rounded-sm">
                            Releven
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
