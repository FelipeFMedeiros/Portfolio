import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { usePrefersReducedMotion as useReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { Variants } from 'motion/react';
import { MapPin, Calendar } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

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

const fadeRight: Variants = {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

// ─────────────────────────────────────────────────────────────────────────────

function TimelineItem({ exp, index }: { exp: ExperienceEntry; index: number }) {
    const itemRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(itemRef, { once: true, amount: 0.2 });
    return (
        <motion.div
            ref={itemRef}
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={`timeline-item ${isInView ? 'is-revealed' : ''}`}
        >
            {/* Timeline dot */}
            <span aria-hidden="true" className="timeline-dot" />
            <span aria-hidden="true" className="timeline-index">0{index + 1}</span>

            {/* Card / Container */}
            <div className="timeline-card group">
                {/* Headers */}
                <div className="flex flex-col gap-1.5 mb-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-bold text-lg md:text-xl text-foreground leading-tight">{exp.role}</h3>
                        {exp.current && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                                <span className="size-1.5 rounded-full bg-primary" />
                                Atual
                            </span>
                        )}
                    </div>
                    <h4 className="text-base font-semibold text-primary">{exp.company}</h4>
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
                        <li
                            key={i}
                            className="flex items-start gap-3 text-sm md:text-[0.965rem] text-muted-foreground/90 leading-relaxed"
                        >
                            <span className="mt-2 shrink-0 size-1.5 rounded-full bg-primary/50" />
                            <span className="flex-1">{bullet}</span>
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
    const timelineRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 60%', 'end 65%'] });
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="experiencia" className="section-shell experience-section">
            {/* Section separator */}
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

            <div className="content-shell">
                {/* ── Section heading ── */}
                <SectionHeading number="02" eyebrow="Trajetória & engenharia">Trajetória profissional.</SectionHeading>

                {/* ── Timeline ── */}
                <div ref={timelineRef} className="experience-timeline">
                    {/* Vertical line */}
                    <div aria-hidden="true" className="timeline-track"><motion.div className="timeline-fill"
                        style={{ scaleY: reducedMotion ? 1 : scaleY, originY: 0 }} /></div>

                    {/* Entries */}
                    <div className="flex flex-col gap-8 sm:gap-12">
                        {EXPERIENCES.map((exp, i) => (
                            <TimelineItem key={exp.company} exp={exp} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
