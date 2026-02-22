export default function Booking() {
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
                    Integrado con nuestro ecosistema URiT. Selecciona tu servicio, verifica la disponibilidad en tiempo real y asegura tu bloque de ensayo o producción de inmediato.
                </p>

                {/* Placeholder widget URiT */}
                <div className="bg-surface-dark border border-primary-neon/20 rounded-sm p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary-neon/5 group-hover:bg-primary-neon/10 transition-colors"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border border-dashed border-accent-cyan/50 flex items-center justify-center mb-6">
                            <span className="text-accent-cyan font-bold tracking-widest text-xs uppercase">URiT</span>
                        </div>
                        <h3 className="text-xl font-display text-white mb-2">MÓDULO DE AGENDAMIENTO</h3>
                        <p className="text-gray-500 text-sm max-w-md">
                            (El widget de reservas y pagos se incrustará aquí. Las bandas podrán pagar el 50% por adelantado.)
                        </p>

                        <button className="mt-8 px-8 py-3 bg-primary-neon text-white font-display text-xs tracking-widest glow-btn rounded-sm">
                            SIMULAR RESERVA
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
