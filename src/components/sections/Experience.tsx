import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';

interface ExperienceEntry {
    role: string;
    company: string;
    location: string;
    start: string;
    end: string;
    current: boolean;
    bullets: readonly string[];
    tags: readonly string[];
}

const EXPERIENCES: ExperienceEntry[] = [
    {
        role: 'Desenvolvedor Full Stack',
        company: 'Foco Quali',
        location: 'Remoto',
        start: 'Jan 2026',
        end: 'Presente',
        current: true,
        bullets: [
            'Desenvolvimento ponta a ponta da plataforma (Landing Page, Painel Admin e API REST) utilizando React, TypeScript, Node.js e PostgreSQL.',
            'Implementação de validações robustas (Zod), estratégias avançadas de SEO e automações, resultando na captação de centenas de novos clientes.',
            'Arquitetura de infraestrutura em VPS Ubuntu, englobando autenticação (JWT), documentação (Swagger) e gestão automatizada de leads.',
        ],
        tags: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'TailwindCSS'],
    },
    {
        role: 'Desenvolvedor Full Stack',
        company: 'Instituto IDECACE — DNA do Brasil',
        location: 'Remoto',
        start: 'Out 2024',
        end: 'Abr 2026',
        current: false,
        bullets: [
            'Atuação full-stack no ecossistema digital para mais de 20 mil usuários, desenvolvendo e mantendo APIs em C# .NET e SQL Server.',
            'Arquitetura e publicação do aplicativo mobile (iOS/Android) usando React Native e Expo, integrando funcionalidades nativas de hardware e gestão de lojas.',
            'Otimização de performance de dados, reduzindo em 50% o tamanho dos payloads JSON e melhorando o tempo de carregamento no backend.',
        ],
        tags: ['C#', '.NET', 'React Native', 'TypeScript', 'React', 'SQL Server'],
    },
    {
        role: 'Monitor de Técnicas de Programação',
        company: 'Universidade do Estado do Rio Grande do Norte (UERN)',
        location: 'Presencial',
        start: 'Ago 2025',
        end: 'Dez 2025',
        current: false,
        bullets: [
            'Mentoria técnica em Engenharia de Software, focando nos fundamentos da linguagem C (ponteiros, alocação de memória e manipulação de arquivos).',
            'Condução de code reviews práticos, auxiliando no debug de códigos e fortalecendo a base dos alunos em estruturas de dados e lógica computacional.',
            'Desenvolvimento de comunicação didática, traduzindo conceitos computacionais complexos de forma acessível para diferentes perfis de turmas de graduação.',
        ],
        tags: ['C', 'Estruturas de Dados', 'Code Review', 'Mentoria', 'Lógica'],
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
    return (
        <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: index * 0.18 }}
            className="relative pl-6 sm:pl-8 md:pl-14"
        >
            {/* Timeline dot */}
            <div className="absolute left-0.75 md:left-0 top-2 md:top-2.5 flex items-center justify-center">
                {exp.current ? (
                    <>
                        {/* Pulse ring */}
                        <span className="absolute size-4 md:size-5 rounded-full bg-primary/20 animate-ping" />
                        <span className="relative size-2.5 md:size-3.5 rounded-full bg-primary shadow-[0_0_10px_oklch(0.76_0.15_207/0.6)]" />
                    </>
                ) : (
                    <span className="size-2.5 md:size-3.5 rounded-full bg-background border-2 border-primary/50" />
                )}
            </div>

            {/* Card / Container */}
            <div className="md:bg-card md:border md:border-border md:rounded-2xl pb-6 md:p-6 md:hover:border-primary/30 md:hover:-translate-y-0.5 transition-all duration-300 group">

                {/* Headers */}
                <div className="flex flex-col gap-1.5 mb-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-bold text-lg md:text-xl text-foreground leading-tight">
                            {exp.role}
                        </h3>
                        {exp.current && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                                Atual
                            </span>
                        )}
                    </div>
                    <h4 className="text-base font-semibold text-primary">
                        {exp.company}
                    </h4>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] md:text-sm text-muted-foreground mb-5">
                    <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {exp.start} — {exp.end}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {exp.location}
                    </span>
                </div>

                {/* Bullets */}
                <ul className="flex flex-col gap-3.5 mb-6">
                    {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm md:text-[0.965rem] text-muted-foreground/90 leading-relaxed">
                            <span className="mt-2 shrink-0 size-1.5 rounded-full bg-primary/50" />
                            <span className="flex-1">
                                {bullet}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground border border-border hover:border-primary/40 hover:text-foreground transition-all duration-200"
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
                        className="absolute left-1.75 md:left-1.5 top-2 bottom-4 w-0.5 bg-linear-to-b from-primary/50 via-border to-transparent"
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
