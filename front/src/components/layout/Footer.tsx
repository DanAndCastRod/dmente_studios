import Link from 'next/link';
import { MapPin, Instagram, Mail, Calendar } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-bg-abyss border-t border-surface-dark pt-20 pb-10 relative overflow-hidden">
            {/* Decorative neon glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary-neon to-transparent opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand Col */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-primary-neon/20 border border-primary-neon/50 flex items-center justify-center">
                                <span className="text-primary-neon font-display font-bold text-xl leading-none">D'</span>
                            </div>
                            <span className="font-display font-bold text-xl tracking-wider text-text-main">
                                MENTE
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            La hipnosis del sonido en Pereira. Nosotros ponemos el espacio, el aislamiento y la técnica para que el mundo lo escuche.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-dark flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:bg-surface-dark/80 transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="mailto:hola@dmente.com" className="w-10 h-10 rounded-full bg-surface-dark flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:bg-surface-dark/80 transition-all">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links Col */}
                    <div>
                        <h4 className="font-display tracking-widest text-sm text-white mb-6">ESTUDIO</h4>
                        <ul className="space-y-4">
                            <li><Link href="#servicios" className="text-gray-400 hover:text-primary-neon text-sm transition-colors">Servicios</Link></li>
                            <li><Link href="#equipamiento" className="text-gray-400 hover:text-primary-neon text-sm transition-colors">El Arsenal (Gear)</Link></li>
                            <li><Link href="#dmente-sessions" className="text-gray-400 hover:text-primary-neon text-sm transition-colors">D'mente Sessions</Link></li>
                            <li><Link href="#reservas" className="text-gray-400 hover:text-primary-neon text-sm transition-colors">Tarifas y Reservas</Link></li>
                        </ul>
                    </div>

                    {/* Contact Col */}
                    <div>
                        <h4 className="font-display tracking-widest text-sm text-white mb-6">CONTACTO</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary-neon shrink-0 mt-0.5" />
                                <span className="text-gray-400 text-sm">
                                    Pereira, Risaralda<br />
                                    Colombia (HQ Releven)
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Calendar size={18} className="text-primary-neon shrink-0" />
                                <span className="text-gray-400 text-sm">
                                    Lunes - Sábado<br />
                                    9:00 AM - 10:00 PM
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Col */}
                    <div>
                        <h4 className="font-display tracking-widest text-sm text-white mb-6 text-accent-cyan">¿LISTO PARA ENTRAR EN TRANCE?</h4>
                        <p className="text-gray-400 text-sm mb-6">Asegura tu bloque de ensayo o agenda una sesión de producción hoy mismo.</p>
                        <Link
                            href="#reservas"
                            className="inline-flex items-center justify-center w-full bg-surface-dark border border-primary-neon/50 text-white px-6 py-3 rounded-sm font-display text-sm tracking-wide glow-btn hover:bg-primary-neon/10 transition-all gap-2"
                        >
                            <Calendar size={16} />
                            Agendar Sesión
                        </Link>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-surface-dark/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} D'mente Estudio. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">A proud member of</span>
                        <span className="font-display font-bold text-xs tracking-wider text-gray-400">RELEVEN</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
