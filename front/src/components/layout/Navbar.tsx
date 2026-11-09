"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { INSTAGRAM_MENSAJE } from '@/lib/contacto';

const enlaces = [
    { href: '#servicios', texto: 'Servicios' },
    { href: '#equipamiento', texto: 'Equipamiento' },
    { href: '#reservas', texto: 'Reservas' },
];

const claseEnlace =
    'text-text-main hover:text-accent-cyan active:opacity-70 ui-motion text-sm uppercase tracking-widest font-semibold';

const claseReservar =
    'bg-primary-neon hover:bg-[#6E3786] text-white rounded-sm font-display text-sm uppercase tracking-wide whitespace-nowrap glow-btn ui-motion active:scale-[0.97] cursor-pointer';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav aria-label="Principal" className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-surface-dark/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <Link href="/" aria-label="D'mente Estudio, inicio" className="flex items-center gap-2 group rounded-sm">
                            <div className="w-10 h-10 rounded-full bg-primary-neon/20 border border-primary-neon/50 group-hover:border-primary-soft flex items-center justify-center">
                                <span className="text-primary-soft font-display font-bold text-xl leading-none">D&apos;</span>
                            </div>
                            <span className="font-display font-bold text-xl tracking-wider text-text-main group-hover:text-primary-soft">
                                MENTE
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {enlaces.map((e) => (
                            <Link key={e.href} href={e.href} className={claseEnlace}>{e.texto}</Link>
                        ))}

                        <a
                            href={INSTAGRAM_MENSAJE}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Reservar por Instagram (abre un mensaje directo en una pestaña nueva)"
                            className={`${claseReservar} px-6 py-2.5`}
                        >
                            Reservar por Instagram
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={isOpen}
                            aria-controls="menu-movil"
                            className="p-2 -mr-2 rounded-sm text-text-main hover:text-primary-soft active:scale-90 ui-motion disabled:opacity-40"
                        >
                            {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div id="menu-movil" className="lg:hidden bg-bg-abyss border-b border-surface-dark">
                    <div className="px-4 pt-2 pb-6 space-y-4">
                        {enlaces.map((e) => (
                            <Link key={e.href} href={e.href} className={`block py-1 ${claseEnlace}`} onClick={() => setIsOpen(false)}>{e.texto}</Link>
                        ))}
                        <a
                            href={INSTAGRAM_MENSAJE}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            aria-label="Reservar por Instagram (abre un mensaje directo en una pestaña nueva)"
                            className={`block w-full text-center px-6 py-3 mt-6 ${claseReservar}`}
                        >
                            Reservar por Instagram
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
