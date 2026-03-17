import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';

interface ExperienceEntry {
    role: string;
    company: string;
    location: string;
    start: string;
    end: string;
    current: boolean;
    bullets: readonly string[];
    tags: readonly string[];
    icon: 'briefcase' | 'graduation';
}

const EXPERIENCES: ExperienceEntry[] = [
    {
        role: 'Desenvolvedor Full-Stack',
        company: 'Instituto Idecace — DNA do Brasil',
        location: 'Remoto',
        start: 'Out 2024',
        end: 'Presente',
        current: true,
        bullets: [
            'Construí e aprimorei funcionalidades core em C# .NET, SQL Server, React e TypeScript para o sistema de detecção de talentos esportivos e vocacionais DNA do Brasil, servindo mais de 20 mil alunos em produção.',
            'Implementei geração de carteirinhas estudantis em PDF com configuração de cores CMYK, utilizando C#, Razor Pages e JavaScript, em colaboração com a equipe gráfica — impactando positivamente todos os 20 mil+ alunos cadastrados.',
            'Desenhei no Figma e desenvolvi a geração automática de laudos técnicos individuais com download em massa em PDF, utilizando JavaScript, HTML e Bootstrap.',
            'Desenvolvi o front-end completo do sistema de EAD, garantindo que milhares de alunos acessem aulas e conteúdos dos seus cursos com experiência fluida.',
            'Criei do zero a versão mobile multiplataforma (iOS e Android) com Expo e React Native, incluindo funcionalidades de leitura de QR Code e captura de fotos, consumindo APIs via Axios.',
            'Gerenciei o ciclo completo de build, versionamento e publicação do app mobile na App Store e Play Store a cada release.',
        ],
        tags: ['React', 'TypeScript', 'React Native', 'C#', 'Razor Pages', 'SQL Server', 'Azure'],
        icon: 'briefcase',
    },
    {
        role: 'Monitor de Técnicas de Programação',
        company: 'UERN — Universidade do Estado do Rio Grande do Norte',
        location: 'Natal, RN',
        start: 'Ago 2025',
        end: 'Dez 2025',
        current: false,
        bullets: [
            'Auxiliei alunos no aprendizado de conceitos fundamentais de programação em C, incluindo strings, funções, manipulação de arquivos, ponteiros e alocação dinâmica de memória.',
            'Orientei estudantes em exercícios práticos, fortalecendo a compreensão de estruturas de dados e gerenciamento eficiente de memória.',
            'Adaptei explicações técnicas para diferentes perfis de conhecimento, desenvolvendo habilidades de comunicação didática para tornar conceitos abstratos acessíveis.',
        ],
        tags: ['C', 'Algoritmos', 'Estruturas de Dados', 'Monitoria'],
        icon: 'graduation',
    },
] as const;

// ─────────────────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeRight: Variants = {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

// ─────────────────────────────────────────────────────────────────────────────

function TimelineItem({
    exp,
    index,
    isInView,
}: {
    exp: ExperienceEntry;
    index: number;
    isInView: boolean;
}) {
    const Icon = exp.icon === 'briefcase' ? Briefcase : GraduationCap;

    return (
        <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: index * 0.18 }}
            className="relative pl-10 sm:pl-14"
        >
            {/* Timeline dot */}
            <div className="absolute left-0 top-1 flex items-center justify-center">
                {exp.current ? (
                    <>
                        {/* Pulse ring */}
                        <span className="absolute size-5 rounded-full bg-primary/20 animate-ping" />
                        <span className="relative size-3.5 rounded-full bg-primary shadow-[0_0_10px_oklch(0.76_0.15_207/0.6)]" />
                    </>
                ) : (
                    <span className="size-3.5 rounded-full bg-background border-2 border-primary/50" />
                )}
            </div>

            {/* Card */}
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 group">

                {/* Top row */}
                <div className="flex flex-wrap items-start gap-3 mb-4">
                    {/* Icon badge */}
                    <div className="shrink-0 size-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon size={18} className="text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-bold text-base sm:text-lg text-foreground leading-tight">
                                {exp.role}
                            </h3>
                            {exp.current && (
                                <span className="inline-flex shrink-0 items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                                    Atual
                                </span>
                            )}
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
                    </div>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                        <MapPin size={12} />
                        {exp.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {exp.start} — {exp.end}
                    </span>
                </div>

                {/* Bullets */}
                <ul className="flex flex-col gap-2 mb-4">
                    {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                            <span className="mt-1.75 shrink-0 size-1.5 rounded-full bg-primary/50" />
                            {bullet}
                        </li>
                    ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground border border-border hover:border-primary/40 hover:text-foreground transition-all duration-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

    return (
        <section ref={sectionRef} id="experiencia" className="relative py-24 overflow-hidden">
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
                        Experiência
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Trajetória{' '}
                        <span className="text-gradient-cyan">Profissional</span>
                    </h2>
                </motion.div>

                {/* ── Timeline ── */}
                <div className="relative max-w-3xl">

                    {/* Vertical line */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        style={{ originY: 0 }}
                        className="absolute left-1.5 top-2 bottom-4 w-px bg-linear-to-b from-primary/50 via-border to-transparent"
                    />

                    {/* Entries */}
                    <div className="flex flex-col gap-8 sm:gap-10">
                        {EXPERIENCES.map((exp, i) => (
                            <TimelineItem
                                key={exp.role}
                                exp={exp}
                                index={i}
                                isInView={isInView}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
