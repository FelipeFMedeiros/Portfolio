import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Educação', href: '#educacao' },
    { label: 'Experiência', href: '#experiencia' },
    { label: 'Habilidades', href: '#habilidades' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Contato', href: '#contato' },
] as const;

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id);
                },
                { rootMargin: '-40% 0px -55% 0px' },
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const id = href.slice(1);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none pt-4 px-4"
        >
            <div className="relative pointer-events-auto">
                <div
                    className={cn(
                        'flex items-center gap-1 px-3 py-2 rounded-2xl border transition-all duration-300',
                        scrolled
                            ? 'bg-card/90 backdrop-blur-xl border-border shadow-lg shadow-black/30'
                            : 'bg-card/60 backdrop-blur-lg border-border/60',
                    )}
                >
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2 mr-1 group cursor-pointer"
                        aria-label="Topo"
                    >
                        <span className="size-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0">
                            FM
                        </span>
                        <span className="hidden lg:block text-sm font-semibold text-foreground group-hover:text-primary transition-colors pr-1">
                            Felipe
                        </span>
                    </button>

                    <div className="hidden md:block w-px h-4 bg-border mx-1 shrink-0" />

                    <nav className="hidden md:flex items-center gap-0.5">
                        {NAV_LINKS.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className={cn(
                                        'relative px-3 py-1.5 text-sm font-medium rounded-xl transition-colors cursor-pointer',
                                        isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                                    )}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="pill-indicator"
                                            className="absolute inset-0 bg-primary/10 rounded-xl"
                                            transition={{
                                                type: 'spring',
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    <button
                        className="md:hidden ml-1 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {mobileOpen ? (
                                <motion.span
                                    key="x"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <X size={17} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <Menu size={17} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                {/* Mobile dropdown */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.nav
                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.96 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-52 flex flex-col gap-0.5 p-2 rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-lg shadow-black/30"
                        >
                            {NAV_LINKS.map((link) => {
                                const isActive = activeSection === link.href.slice(1);
                                return (
                                    <button
                                        key={link.href}
                                        onClick={() => handleNavClick(link.href)}
                                        className={cn(
                                            'w-full text-left px-3 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer',
                                            isActive
                                                ? 'text-primary bg-primary/10'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
                                        )}
                                    >
                                        {link.label}
                                    </button>
                                );
                            })}
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}
