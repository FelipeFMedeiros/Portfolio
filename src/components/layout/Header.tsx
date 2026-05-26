import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

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
    const location = useLocation();
    const isHome = location.pathname === '/';
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);

            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
                setActiveSection('contato');
            }
        };
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

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        if (!isHome) {
            // Navigate to home page then scroll to section
            window.location.href = '/' + href;
            return;
        }
        const id = href.slice(1);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="fixed top-0 left-0 right-0 z-50 flex md:justify-center pointer-events-none md:pt-4 md:px-4"
            >
                <div className="relative pointer-events-auto w-full md:w-auto">
                    <div
                        className={cn(
                            'flex items-center justify-between md:justify-start gap-1 transition-all duration-300',
                            scrolled
                                ? 'bg-card/90 backdrop-blur-xl border-b md:border-b-0 md:border md:shadow-lg shadow-black/30 border-border md:rounded-2xl'
                                : 'bg-card/60 backdrop-blur-lg border-b md:border-b-0 md:border border-border/60 md:rounded-2xl',
                            'px-4 py-3 md:px-3 md:py-2',
                        )}
                    >
                        <button
                            onClick={() => {
                                setMobileOpen(false);
                                if (!isHome) {
                                    window.location.href = '/';
                                } else {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                            className="flex items-center gap-2 group cursor-pointer"
                            aria-label="Topo"
                        >
                            {/* Logo Mobile */}
                            <div className="flex md:hidden items-center gap-2 font-bold text-lg tracking-tight">
                                <span className="size-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0">
                                    FM
                                </span>
                                <span className="text-foreground">FelipeFMedeiros</span>
                            </div>

                            {/* Logo Desktop */}
                            <span className="hidden md:flex size-7 rounded-lg bg-primary items-center justify-center text-primary-foreground font-bold text-xs shrink-0">
                                FM
                            </span>
                            <span className="hidden md:block text-sm font-semibold text-foreground group-hover:text-primary transition-colors pr-1">
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

                            {/* Theme Toggle Button Desktop */}
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="ml-2 flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 cursor-pointer transition-colors"
                                aria-label="Alternar tema"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {theme === 'dark' ? (
                                        <motion.span
                                            key="sun"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="block"
                                        >
                                            <Sun size={17} />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="moon"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="block"
                                        >
                                            <Moon size={17} />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </nav>

                        <div className="flex md:hidden items-center gap-1">
                            {/* Theme Toggle Button Mobile */}
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-secondary/60 cursor-pointer transition-colors relative z-50 mr-1"
                                aria-label="Alternar tema"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {theme === 'dark' ? (
                                        <motion.span
                                            key="sun"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="block"
                                        >
                                            <Sun size={20} />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="moon"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="block"
                                        >
                                            <Moon size={20} />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>

                            <button
                                className="p-1.5 rounded-lg text-foreground hover:bg-secondary/60 transition-colors cursor-pointer relative z-50"
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
                                            className="block"
                                        >
                                            <X size={24} />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="block"
                                        >
                                            <Menu size={24} />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Full Screen Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-6 w-full px-6">
                            {NAV_LINKS.map((link) => {
                                const isActive = activeSection === link.href.slice(1);
                                return (
                                    <button
                                        key={link.href}
                                        onClick={() => handleNavClick(link.href)}
                                        className={cn(
                                            'w-full text-center py-3 text-2xl font-semibold transition-colors cursor-pointer',
                                            isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                                        )}
                                    >
                                        {link.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
