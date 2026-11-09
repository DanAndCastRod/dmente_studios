export default function GearShowcase() {
    const gearList = [
        { name: "Pro Tools Ultimate", category: "DAW y software" },
        { name: "Universal Audio Apollo FireWire", category: "Interfaz" },
        { name: "Focal Alpha 65", category: "Monitores" },
        { name: "Neumann U87 Ai", category: "Micrófonos" },
        { name: "Marshall JCM800", category: "Backline" },
        { name: "Ampeg SVT-CL", category: "Backline" },
    ];

    return (
        <section id="equipamiento" className="py-24 bg-[#050505] relative border-y border-surface-dark/50 scroll-mt-20">
            <div className="absolute right-0 top-0 w-1/3 h-full bg-primary-neon/5 blur-[150px] pointer-events-none" aria-hidden="true"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                <div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                        EL ARSENAL
                    </h2>
                    <p className="text-gray-300 font-body leading-relaxed text-lg">
                        A los músicos les importa el equipo. Nuestro hardware y software están meticulosamente curados para ofrecer el estándar de la industria. Cada cable, cada interfaz, cada amplificador es una herramienta de precisión.
                    </p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {gearList.map((item) => (
                        <li key={item.name} className="border-b border-surface-dark pb-4">
                            <span className="block text-primary-soft text-sm tracking-widest uppercase mb-1">{item.category}</span>
                            <span className="block text-white font-semibold">{item.name}</span>
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    );
}
