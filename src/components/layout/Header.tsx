import { useState, useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll } from 'motion/react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
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
    const { theme, systemTheme, setTheme } = useTheme();
    const isDark = (theme === 'system' ? systemTheme : theme) === 'dark';
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const menuRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            setScrolled(window.scrollY > 40);
            let active = '';
            for (const link of NAV_LINKS) {
                const section = document.getElementById(link.href.slice(1));
                if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
                    active = link.href.slice(1);
                }
            }
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 30) active = 'contato';
            setActiveSection(active);
        };
        const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
    }, []);

    useEffect(() => {
        if (!mobileOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const menuLinks = menuRef.current?.querySelectorAll<HTMLAnchorElement>('a');
        menuLinks?.[0]?.focus();
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') { setMobileOpen(false); toggleRef.current?.focus(); }
            if (event.key !== 'Tab' || !menuLinks?.length) return;
            const first = menuLinks[0];
            const last = menuLinks[menuLinks.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); toggleRef.current?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); toggleRef.current?.focus();
            } else if (document.activeElement === toggleRef.current) {
                event.preventDefault(); (event.shiftKey ? last : first).focus();
            }
        };
        const desktop = window.matchMedia('(min-width: 1024px)');
        const onResize = () => { if (desktop.matches) setMobileOpen(false); };
        desktop.addEventListener('change', onResize);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            desktop.removeEventListener('change', onResize);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [mobileOpen]);

    const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        setMobileOpen(false);
        if (mobileOpen) toggleRef.current?.focus();
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' });
        window.history.replaceState(window.history.state, '', href);
    };

    return (
        <>
            <motion.header initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                className="site-header">
                <div className={cn('header-glass', scrolled && 'is-scrolled')}>
                    <a href="#hero" onClick={(event) => navigate(event, '#hero')} className="brand" aria-label="FelipeFMedeiros — Topo">
                        <span className="brand-mark">f<span>.</span>m</span>
                        <span className="brand-name">Felipe<span className="text-primary">.</span></span>
                    </a>
                    <nav aria-label="Navegação principal" className="desktop-nav">
                        {NAV_LINKS.map((link) => {
                            const active = activeSection === link.href.slice(1);
                            return <a key={link.href} href={link.href} onClick={(event) => navigate(event, link.href)}
                                aria-current={active ? 'location' : undefined} className={cn('nav-link', active && 'is-active')}>
                                {active && <motion.span layoutId="activeSection" className="nav-active"
                                    transition={{ type: 'spring', stiffness: 320, damping: 30 }} />}
                                <span>{link.label}</span>
                            </a>;
                        })}
                    </nav>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="header-icon"
                            aria-label="Alternar tema" title={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}>
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button ref={toggleRef} className="header-icon header-menu-toggle" onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen} aria-controls="mobile-menu">
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.header>
            <motion.div aria-hidden="true" className="reading-progress" style={{ scaleX: scrollYProgress }} />
            <AnimatePresence>
                {mobileOpen && <motion.div id="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Menu de navegação"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mobile-menu lg:hidden">
                    <p className="font-mono text-xs text-primary tracking-widest mb-8">EXPLORE O PORTFÓLIO</p>
                    <nav aria-label="Navegação mobile" className="w-full max-w-md">
                        {NAV_LINKS.map((link, index) => <a key={link.href} href={link.href}
                            onClick={(event) => navigate(event, link.href)} aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}>
                            <span className="font-mono text-xs text-primary">0{index + 1}</span>
                            <span>{link.label}</span><ArrowUpRight size={20} className="ml-auto text-muted-foreground" />
                        </a>)}
                    </nav>
                </motion.div>}
            </AnimatePresence>
        </>
    );
}

