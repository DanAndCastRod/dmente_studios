import { Instagram, MapPin } from "lucide-react";
import { CIUDAD, INSTAGRAM_MENSAJE, INSTAGRAM_PERFIL, INSTAGRAM_USUARIO } from "@/lib/contacto";

const datosDelMensaje = [
    "Si es ensayo o producción.",
    "El día y la hora que buscas.",
    "Cuántos músicos vienen o qué quieres grabar.",
];

export default function Booking() {
    return (
        <section id="reservas" className="py-24 bg-bg-abyss relative border-t border-surface-dark/50 scroll-mt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                    RESERVA TU<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-soft to-accent-cyan">
                        ESPACIO
                    </span>
                </h2>

                <p className="text-gray-300 mb-10 font-body leading-relaxed text-lg max-w-2xl mx-auto">
                    Por ahora las reservas se coordinan por mensaje directo en Instagram. Escríbenos y te confirmamos disponibilidad, horario y tarifa.
                </p>

                <div className="bg-surface-dark border border-primary-neon/30 rounded-sm p-8 text-left max-w-xl mx-auto mb-10">
                    <h3 className="font-display text-white text-base tracking-wider mb-4">Cuéntanos en el mensaje</h3>
                    <ul className="space-y-3 text-gray-300 text-base">
                        {datosDelMensaje.map((d) => (
                            <li key={d} className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" aria-hidden="true"></span>
                                {d}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href={INSTAGRAM_MENSAJE}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Escríbenos por Instagram (abre un mensaje directo en una pestaña nueva)"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-neon hover:bg-[#6E3786] text-white font-display text-sm uppercase tracking-wide sm:tracking-widest rounded-sm glow-btn ui-motion active:scale-[0.97]"
                    >
                        <Instagram size={18} aria-hidden="true" />
                        Escríbenos por Instagram
                    </a>
                    <a
                        href={INSTAGRAM_PERFIL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver @${INSTAGRAM_USUARIO}, perfil de Instagram (pestaña nueva)`}
                        className="inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-white font-display text-sm uppercase tracking-wide sm:tracking-widest rounded-sm hover:border-accent-cyan hover:text-accent-cyan ui-motion active:scale-[0.97]"
                    >
                        Ver @{INSTAGRAM_USUARIO}
                    </a>
                </div>

                <p className="mt-8 inline-flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin size={16} aria-hidden="true" className="text-primary-soft" />
                    {CIUDAD}
                </p>
            </div>
        </section>
    );
}
