import ResponsiveImage from '@/components/ui/ResponsiveImage';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { usePrefersReducedMotion as useReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { Variants } from 'motion/react';
import { Award, ChevronLeft, ChevronRight, ExternalLink, MapPin, Calendar, Maximize2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import InteractiveSurface from '@/components/ui/InteractiveSurface';
import ImagePreview from '@/components/ui/ImagePreview';

const DISCIPLINES = [
    'Algoritmos e Estruturas de Dados',
    'Inteligência Artificial',
    'Redes Neurais',
    'Engenharia de Software',
    'Banco de Dados',
    'Sistemas Operacionais',
    'Arquitetura de Computadores',
    'Redes de Computadores',
    'Complexidade de Algoritmos',
    'Sistemas Embarcados',
    'Programação Orientada a Objetos',
    'Técnicas de Programação',
    'Processamento de Imagens e Visão Computacional',
] as const;

interface Certificate {
    title: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
    imageUrl?: string;
}

const CERTIFICATES: Certificate[] = [
    {
        title: 'NLW Operator - Fullstack',
        issuer: 'Rocketseat',
        date: 'Mar 2026',
        credentialUrl: 'https://app.rocketseat.com.br/certificates/f77fed0d-9554-41e6-837b-4889b2ab3bed',
        imageUrl: '/certs/Certificate_NLW_Operator_Fullstack.webp',
    },
    {
        title: 'Neural Mechanisms of Cognitive Function Meeting',
        issuer: 'Santos Dumont Institute - Science and Education',
        date: 'Apr 2025',
        credentialUrl: '/certs/certificado_Felipe_Freitas_de_Medeiros_Neural.pdf',
        imageUrl: '/certs/certificado_Felipe_Freitas_de_Medeiros.webp',
    },
    {
        title: 'Complete React v9',
        issuer: 'Frontend Masters',
        date: 'Mar 2025',
        credentialUrl: 'https://static.frontendmasters.com/ud/c/44c0ee8b71/hixpadIGiV/complete-react-v9.pdf',
        imageUrl: '/certs/complete-react-v9.webp',
    },
    {
        title: 'React and TypeScript, v2',
        issuer: 'Frontend Masters',
        date: 'Mar 2025',
        credentialUrl: 'https://static.frontendmasters.com/ud/c/44c0ee8b71/XgkBlJxZQC/react-typescript-v2.pdf',
        imageUrl: '/certs/react-typescript-v2.webp',
    },
    {
        title: 'The Origins III: JavaScript',
        issuer: 'Codédex',
        date: 'Feb 2025',
        credentialUrl: 'https://www.codedex.io/certificates/0f89352f-aa64-401c-a283-a90b98abc379',
        imageUrl: '/certs/The_Origins III_JavaScript.webp',
    },
    {
        title: 'Everything Git',
        issuer: 'Frontend Masters',
        date: 'Jan 2025',
        credentialUrl: 'https://static.frontendmasters.com/ud/c/44c0ee8b71/tNgMJoASup/everything-git.pdf',
        imageUrl: '/certs/everything-git.webp',
    },
];

// ─────────────────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

export default function Education() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [preview, setPreview] = useState<Certificate | null>(null);
    const closePreview = useCallback(() => setPreview(null), []);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const update = () => {
            const maxScroll = el.scrollWidth - el.clientWidth;
            setCanScrollLeft(el.scrollLeft > 4);
            setCanScrollRight(el.scrollLeft < maxScroll - 4);
            setScrollProgress(maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0);
        };

        update();
        el.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            el.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    const handleScrollLeft = () => scrollRef.current?.scrollBy({ left: -340, behavior: reducedMotion ? 'instant' : 'smooth' });

    const handleScrollRight = () => scrollRef.current?.scrollBy({ left: 340, behavior: reducedMotion ? 'instant' : 'smooth' });

    return (
        <section ref={sectionRef} id="educacao" className="section-shell education-section">
            {/* Section separator */}
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

            <div className="content-shell">
                {/* ── Section heading ── */}
                <SectionHeading number="05" eyebrow="Formação & repertório">Formação & certificações.</SectionHeading>

                {/* ── UERN Card ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="education-degree"
                >
                    <div className="flex flex-col sm:flex-row gap-5 md:gap-6 items-start mb-7 md:mb-8">
                        {/* Logo */}
                        <div className="shrink-0 size-16 md:size-20 rounded-2xl bg-[#104A90] overflow-hidden flex items-center justify-center p-2 border border-border/30">
                            <ResponsiveImage sizes="64px" src="/uern-logo.png" loading="lazy" alt="UERN" className="size-full object-contain" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 pr-2">
                            {/* Headers */}
                            <div className="flex flex-col gap-1.5 mb-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="font-bold text-lg md:text-xl text-foreground leading-tight">
                                        Bacharelado em Ciência da Computação
                                    </h3>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                                        <span className="size-1.5 rounded-full bg-primary" />
                                        Em andamento
                                    </span>
                                </div>
                                <h4 className="text-base font-semibold text-primary">
                                    Universidade do Estado do Rio Grande do Norte
                                </h4>
                            </div>

                            {/* Meta row */}
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] md:text-sm text-muted-foreground mt-4">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    Abr 2023 — Presente · 7º período
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin size={14} />
                                    Natal, RN
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Disciplines */}
                    <div className="border-t border-border/50 md:border-border pt-5 md:pt-6">
                        <p className="text-[0.68rem] md:text-xs font-semibold text-muted-foreground uppercase tracking-[0.18em] mb-4">
                            Disciplinas destacadas
                        </p>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.25 }}
                            className="flex flex-wrap gap-2 discipline-chips"
                        >
                            {DISCIPLINES.map((d) => (
                                <motion.span
                                    key={d}
                                    variants={fadeUp}
                                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground border border-border hover:border-primary/40 hover:text-foreground transition-all duration-200 cursor-default"
                                >
                                    {d}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* ── Certificates ── */}
                <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-2xl">
                            Cursos & <span className="text-gradient-cyan">Certificações</span>
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={handleScrollLeft}
                                disabled={!canScrollLeft}
                                aria-label="Anterior"
                                className="size-9 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={handleScrollRight}
                                disabled={!canScrollRight}
                                aria-label="Próximo"
                                className="size-9 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Horizontal scroll carousel */}
                    <div
                        ref={scrollRef}
                        className="certificate-carousel scrollbar-hide"
                        role="region"
                        aria-label="Carrossel de certificados"
                        tabIndex={0}
                    >
                        {CERTIFICATES.map((cert) => (
                            <InteractiveSurface
                                key={cert.title}
                                tilt
                                className="certificate-card group"
                            >
                                {/* Visual header */}
                                <div className="certificate-image">
                                    {cert.imageUrl ? (
                                        <button onClick={() => setPreview(cert)} aria-label={`Ampliar certificado: ${cert.title}`}>
                                            <ResponsiveImage sizes="(max-width: 767px) 290px, 320px"
                                                src={cert.imageUrl}
                                                alt={cert.title}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            <span className="certificate-zoom"><Maximize2 size={16} /></span>
                                        </button>
                                    ) : (
                                        <Award
                                            size={44}
                                            className="text-primary/30 group-hover:text-primary/50 transition-colors duration-300"
                                        />
                                    )}
                                    {/* Top shine overlay */}
                                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
                                </div>

                                {/* Card body */}
                                <div className="p-5 flex flex-col flex-1 gap-1">
                                    <h4 className="font-semibold text-sm text-foreground leading-snug">
                                        {cert.title}
                                    </h4>
                                    <p className="text-xs text-primary font-medium mt-0.5">{cert.issuer}</p>
                                    <p className="text-xs text-muted-foreground">{cert.date}</p>

                                    {cert.credentialUrl && (
                                        <a
                                            href={cert.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-auto pt-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-200 w-fit"
                                        >
                                            <ExternalLink size={12} />
                                            Ver Certificado
                                        </a>
                                    )}
                                </div>
                            </InteractiveSurface>
                        ))}
                    </div>

                    {/* Scroll Progress Bar Minimalista */}
                    <div className="mt-8 mx-auto max-w-md h-1 bg-border/40 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${scrollProgress}%` }}
                            transition={{ ease: 'easeOut', duration: 0.1 }}
                        />
                    </div>
                </motion.div>
            </div>
            <AnimatePresence>{preview?.imageUrl && <ImagePreview image={preview.imageUrl} title={preview.title}
                href={preview.credentialUrl} onClose={closePreview} />}</AnimatePresence>
        </section>
    );
}
