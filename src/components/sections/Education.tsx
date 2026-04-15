import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, ExternalLink, MapPin, Calendar } from 'lucide-react';

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
        imageUrl: '/certs/Certificate_NLW_Operator_Fullstack.png',
    },
    {
        title: 'Neural Mechanisms of Cognitive Function Meeting',
        issuer: 'Santos Dumont Institute - Science and Education',
        date: 'Apr 2025',
        imageUrl: '/certs/certificado_Felipe_Freitas_de_Medeiros.png',
    },
    {
        title: 'Complete React v9',
        issuer: 'Frontend Masters',
        date: 'Mar 2025',
        credentialUrl: 'https://static.frontendmasters.com/ud/c/44c0ee8b71/hixpadIGiV/complete-react-v9.pdf',
        imageUrl: '/certs/complete-react-v9.png',
    },
    {
        title: 'React and TypeScript, v2',
        issuer: 'Frontend Masters',
        date: 'Mar 2025',
        credentialUrl: 'https://static.frontendmasters.com/ud/c/44c0ee8b71/XgkBlJxZQC/react-typescript-v2.pdf',
        imageUrl: '/certs/react-typescript-v2.png',
    },
    {
        title: 'The Origins III: JavaScript',
        issuer: 'Codédex',
        date: 'Feb 2025',
        credentialUrl: 'https://www.codedex.io/certificates/0f89352f-aa64-401c-a283-a90b98abc379',
        imageUrl: '/certs/The_Origins III_JavaScript.png',
    },
    {
        title: 'Everything Git',
        issuer: 'Frontend Masters',
        date: 'Jan 2025',
        credentialUrl: 'https://static.frontendmasters.com/ud/c/44c0ee8b71/tNgMJoASup/everything-git.pdf',
        imageUrl: '/certs/everything-git.png',
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

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const update = () => {
            setCanScrollLeft(el.scrollLeft > 4);
            setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
        };

        update();
        el.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            el.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    const handleScrollLeft = () =>
        scrollRef.current?.scrollBy({ left: -308, behavior: 'smooth' });

    const handleScrollRight = () =>
        scrollRef.current?.scrollBy({ left: 308, behavior: 'smooth' });

    return (
        <section ref={sectionRef} id="educacao" className="relative py-24 overflow-hidden">
            {/* Section separator */}
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

            <div className="max-w-6xl mx-auto px-6">

                {/* ── Section heading ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="mb-14"
                >
                    <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3 block">
                        Educação
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Formação &{' '}
                        <span className="text-gradient-cyan">Certificações</span>
                    </h2>
                </motion.div>

                {/* ── UERN Card ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="bg-card border border-border rounded-3xl p-6 sm:p-8 mb-16 hover:border-primary/30 transition-colors duration-300"
                >
                    <div className="flex flex-col sm:flex-row gap-5 items-start mb-7">
                        {/* Logo */}
                        <div className="shrink-0 size-16 sm:size-20 rounded-2xl bg-[#104A90] overflow-hidden flex items-center justify-center p-2 border border-border/30">
                            <img
                                src="/uern-logo.png"
                                alt="UERN"
                                className="size-full object-contain"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                                <h3 className="font-bold text-xl text-foreground leading-tight">
                                    Bacharelado em Ciência da Computação
                                </h3>
                                <span className="inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                                    Em andamento
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                                <span>Universidade do Estado do Rio Grande do Norte</span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin size={13} />
                                    Natal, RN
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={13} />
                                    Abr 2023 — Presente · 7º período
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Disciplines */}
                    <div className="border-t border-border pt-6">
                        <p className="text-[0.68rem] font-semibold text-muted-foreground uppercase tracking-[0.18em] mb-4">
                            Disciplinas destacadas
                        </p>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="flex flex-wrap gap-2"
                        >
                            {DISCIPLINES.map((d) => (
                                <motion.span
                                    key={d}
                                    variants={fadeUp}
                                    className="px-3 py-1 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground border border-border hover:border-primary/40 hover:text-foreground transition-all duration-200 cursor-default"
                                >
                                    {d}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* ── Certificates ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-2xl">
                            Cursos &{' '}
                            <span className="text-gradient-cyan">Certificações</span>
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
                        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
                        role="region"
                        aria-label="Carrossel de certificados"
                    >
                        {CERTIFICATES.map((cert) => (
                            <div
                                key={cert.title}
                                className="snap-start shrink-0 w-72 bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                            >
                                {/* Visual header */}
                                <div className="h-45 bg-linear-to-br from-primary/15 via-primary/5 to-secondary relative overflow-hidden flex items-center justify-center">
                                    {cert.imageUrl ? (
                                        <a href={cert.credentialUrl} target='_blank'>
                                            <img
                                                src={cert.imageUrl}
                                                alt={cert.title}
                                                className="w-full h-full object-cover"
                                                />
                                        </a>
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
                                    <h4 className="font-semibold text-sm text-foreground leading-snug line-clamp-2">
                                        {cert.title}
                                    </h4>
                                    <p className="text-xs text-primary font-medium mt-0.5">
                                        {cert.issuer}
                                    </p>
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
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
