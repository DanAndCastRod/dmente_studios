"use client";

import { useBooking } from "../BookingContext";
import { Calendar } from "lucide-react";

export default function Booking() {
    const { openBooking } = useBooking();

    return (
        <section id="reservas" className="py-24 bg-bg-abyss relative border-t border-surface-dark/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                    RESERVA TU<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-neon to-accent-cyan">
                        ESPACIO
                    </span>
                </h2>

                <p className="text-gray-400 mb-12 font-body leading-relaxed text-lg max-w-2xl mx-auto">
                    Selecciona tu servicio, verifica la disponibilidad en tiempo real y asegura tu bloque de ensayo o producción de inmediato.
                </p>

                {/* Booking Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    {/* Card Ensayo */}
                    <button
                        onClick={openBooking}
                        className="bg-surface-dark border border-primary-neon/20 hover:border-primary-neon/60 rounded-sm p-8 text-left transition-all group glow-btn cursor-pointer"
                    >
                        <div className="w-14 h-14 rounded-full bg-primary-neon/10 border border-primary-neon/30 flex items-center justify-center mb-5 group-hover:shadow-[0_0_20px_rgba(91,44,111,0.4)] transition-all">
                            <Calendar size={22} className="text-primary-neon" />
                        </div>
                        <h3 className="font-display text-white text-lg tracking-wider mb-2">ENSAYO</h3>
                        <p className="text-gray-500 text-sm">Bloque de 2 horas con backline profesional y sala insonorizada.</p>
                    </button>

                    {/* Card Producción */}
                    <button
                        onClick={openBooking}
                        className="bg-surface-dark border border-accent-cyan/20 hover:border-accent-cyan/60 rounded-sm p-8 text-left transition-all group glow-btn-cyan cursor-pointer"
                    >
                        <div className="w-14 h-14 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center mb-5 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all">
                            <Calendar size={22} className="text-accent-cyan" />
                        </div>
                        <h3 className="font-display text-white text-lg tracking-wider mb-2">PRODUCCIÓN</h3>
                        <p className="text-gray-500 text-sm">Sesión de 4 horas con ingeniero de sonido y estudio completo.</p>
                    </button>
                </div>

                <p className="text-gray-600 text-xs">
                    Powered by Google Calendar · Confirmación automática por email
                </p>
            </div>
        </section>
    );
}
