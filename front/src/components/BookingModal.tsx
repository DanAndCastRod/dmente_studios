"use client";

import { useBooking } from "./BookingContext";
import { X, Calendar, Clock, Music, Mic } from "lucide-react";

// ─────────────────────────────────────────────────────────
// CONFIGURACIÓN: Reemplazar estas URLs con los Appointment
// Schedule reales de Google Calendar del estudio.
// ─────────────────────────────────────────────────────────
const GOOGLE_CAL_ENSAYO =
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0";
const GOOGLE_CAL_PRODUCCION =
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1";
// ─────────────────────────────────────────────────────────

const services = [
    {
        id: "ensayo",
        icon: Music,
        title: "Bloque de Ensayo",
        duration: "2 horas",
        description:
            "Sala insonorizada con backline profesional. Ideal para bandas que necesitan apretar antes de un show.",
        color: "primary-neon",
        calendarUrl: GOOGLE_CAL_ENSAYO,
    },
    {
        id: "produccion",
        icon: Mic,
        title: "Sesión de Producción",
        duration: "4 horas",
        description:
            "Estudio de grabación completo. Desde la captura hasta la mezcla. Incluye ingeniero de sonido.",
        color: "accent-cyan",
        calendarUrl: GOOGLE_CAL_PRODUCCION,
    },
];

export default function BookingModal() {
    const { isOpen, closeBooking } = useBooking();

    if (!isOpen) return null;

    const handleServiceClick = (calendarUrl: string) => {
        window.open(calendarUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={closeBooking}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-bg-abyss border border-surface-dark rounded-sm shadow-2xl shadow-primary-neon/10 animate-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-surface-dark">
                    <div className="flex items-center gap-3">
                        <Calendar size={20} className="text-accent-cyan" />
                        <h2 className="font-display text-lg tracking-wider text-white">
                            AGENDAR SESIÓN
                        </h2>
                    </div>
                    <button
                        onClick={closeBooking}
                        className="text-gray-500 hover:text-white transition-colors"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <p className="text-gray-400 text-sm mb-6">
                        Selecciona el tipo de sesión que necesitas. Serás redirigido al
                        calendario de disponibilidad en tiempo real.
                    </p>

                    {services.map((service) => {
                        const Icon = service.icon;
                        const borderColor =
                            service.color === "primary-neon"
                                ? "border-primary-neon/30 hover:border-primary-neon"
                                : "border-accent-cyan/30 hover:border-accent-cyan";
                        const iconColor =
                            service.color === "primary-neon"
                                ? "text-primary-neon"
                                : "text-accent-cyan";
                        const glowClass =
                            service.color === "primary-neon" ? "glow-btn" : "glow-btn-cyan";

                        return (
                            <button
                                key={service.id}
                                onClick={() => handleServiceClick(service.calendarUrl)}
                                className={`w-full text-left bg-surface-dark border ${borderColor} rounded-sm p-5 transition-all group ${glowClass}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-12 h-12 rounded-full bg-surface-dark border ${borderColor} flex items-center justify-center shrink-0`}
                                    >
                                        <Icon size={20} className={iconColor} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-display text-white text-sm tracking-wider mb-1">
                                            {service.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock size={12} className="text-gray-500" />
                                            <span className="text-gray-500 text-xs">
                                                {service.duration}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-xs leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-surface-dark">
                    <p className="text-gray-600 text-xs text-center">
                        Powered by Google Calendar · Confirmación automática por email
                    </p>
                </div>
            </div>
        </div>
    );
}
