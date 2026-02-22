import Image from 'next/image';

export default function GearShowcase() {
    const gearList = [
        { name: "Pro Tools Ultimate", category: "DAW & Software" },
        { name: "Universal Audio Apollo FireWire", category: "Interface" },
        { name: "Focal Alpha 65", category: "Monitors" },
        { name: "Neumann U87 Ai", category: "Microphones" },
        { name: "Marshall JCM800", category: "Backline" },
        { name: "Ampeg SVT-CL", category: "Backline" },
    ];

    return (
        <section id="equipamiento" className="py-24 bg-[#050505] relative border-y border-surface-dark/50">
            <div className="absolute right-0 top-0 w-1/3 h-full bg-primary-neon/5 blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <div className="order-2 lg:order-1 relative">
                    <div className="aspect-square relative rounded-sm overflow-hidden border border-surface-dark">
                        <Image
                            src="/images/dmente_gear_showcase_1771798276042.png"
                            alt="Studio Gear Macro"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-bg-abyss border border-surface-dark p-6 flex flex-col justify-center shadow-2xl">
                        <span className="text-accent-cyan font-display font-bold text-4xl mb-2">100%</span>
                        <span className="text-text-main text-xs uppercase tracking-widest font-semibold text-gray-400">Pure<br />Analog<br />Signal Flow</span>
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                        EL ARSENAL
                    </h2>
                    <p className="text-gray-400 mb-10 font-body leading-relaxed text-lg">
                        A los músicos les importa el equipo. Nuestro hardware y software están meticulosamente curados para ofrecer el estándar de la industria. Cada cable, cada interfaz, cada amplificador es una herramienta de precisión.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {gearList.map((item, idx) => (
                            <div key={idx} className="border-b border-surface-dark pb-4">
                                <span className="block text-primary-neon text-xs tracking-widest uppercase mb-1">{item.category}</span>
                                <span className="block text-white font-semibold">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
