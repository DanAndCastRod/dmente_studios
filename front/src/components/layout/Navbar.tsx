"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-surface-dark/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-full bg-primary-neon/20 border border-primary-neon/50 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(91,44,111,0.5)] transition-all">
                                <span className="text-primary-neon font-display font-bold text-xl leading-none">D'</span>
                            </div>
                            <span className="font-display font-bold text-xl tracking-wider text-text-main group-hover:text-primary-neon transition-colors">
                                MENTE
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#servicios" className="text-text-main hover:text-accent-cyan transition-colors text-sm uppercase tracking-widest font-semibold">Servicios</Link>
                        <Link href="#equipamiento" className="text-text-main hover:text-accent-cyan transition-colors text-sm uppercase tracking-widest font-semibold">Equipamiento</Link>
                        <Link href="#estudio" className="text-text-main hover:text-accent-cyan transition-colors text-sm uppercase tracking-widest font-semibold">El Estudio</Link>
                        <Link href="#contacto" className="text-text-main hover:text-accent-cyan transition-colors text-sm uppercase tracking-widest font-semibold">Contacto</Link>

                        <Link
                            href="#reservas"
                            className="bg-primary-neon text-white px-6 py-2.5 rounded-sm font-display text-sm tracking-wide glow-btn"
                        >
                            Reserva tu Sesión
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-text-main hover:text-primary-neon transition-colors"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-bg-abyss border-b border-surface-dark">
                    <div className="px-4 pt-2 pb-6 space-y-4">
                        <Link href="#servicios" className="block text-text-main hover:text-accent-cyan text-sm uppercase tracking-widest font-semibold" onClick={() => setIsOpen(false)}>Servicios</Link>
                        <Link href="#equipamiento" className="block text-text-main hover:text-accent-cyan text-sm uppercase tracking-widest font-semibold" onClick={() => setIsOpen(false)}>Equipamiento</Link>
                        <Link href="#estudio" className="block text-text-main hover:text-accent-cyan text-sm uppercase tracking-widest font-semibold" onClick={() => setIsOpen(false)}>El Estudio</Link>
                        <Link href="#contacto" className="block text-text-main hover:text-accent-cyan text-sm uppercase tracking-widest font-semibold" onClick={() => setIsOpen(false)}>Contacto</Link>
                        <Link
                            href="#reservas"
                            className="block w-full text-center bg-primary-neon text-white px-6 py-3 rounded-sm font-display text-sm tracking-wide glow-btn mt-6"
                            onClick={() => setIsOpen(false)}
                        >
                            Reserva tu Sesión
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
