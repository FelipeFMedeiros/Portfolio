import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowUpRight, Github, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { PROJECTS, CATEGORY_LABELS, CATEGORY_STYLES } from '@/data/projects';
import type { Project, ProjectCategory } from '@/data/projects';

// ── Filter tabs ───────────────────────────────────────────────────────────────

type FilterTab = 'todos' | ProjectCategory;

const ALL_TABS: { label: string; value: FilterTab }[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'Profissional', value: 'profissional' },
    { label: 'Freelancer', value: 'freelancer' },
    { label: 'Pessoal', value: 'pessoal' },
    { label: 'Acadêmico', value: 'academico' },
];

// ── Variants ──────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ── ProjectCard ───────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
    const styles = CATEGORY_STYLES[project.category];
    const visibleTags = project.tags.slice(0, 4);
    const overflow = project.tags.length - 4;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
        >
            {/* Top gradient area / Cover Image */}
            <Link
                to={`/projects/${project.slug}`}
                className={cn(
                    'relative h-48 bg-linear-to-br flex items-center justify-center overflow-hidden hover:cursor-pointer',
                    styles.gradient,
                )}
            >
                {project.coverImage ? (
                    <>
                        {/* Imagem de Capa com animação de scale */}
                        <img
                            src={project.coverImage}
                            alt={`Capa do projeto ${project.title}`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Overlay sutil com o gradiente da categoria, clareia no hover */}
                        <div
                            className={cn(
                                'absolute inset-0 bg-linear-to-br mix-blend-multiply opacity-50 transition-opacity duration-500 group-hover:opacity-20',
                                styles.gradient,
                            )}
                        />
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 hero-dot-grid opacity-30" />
                        <div className="relative size-12 rounded-2xl bg-card/60 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                            <Layers size={22} className="text-primary" />
                        </div>
                    </>
                )}
            </Link>

            {/* Body */}
            <div className="flex flex-col flex-1 p-5">
                {/* Category + year */}
                <div className="flex items-center gap-2 mb-3">
                    <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full border', styles.badge)}>
                        {CATEGORY_LABELS[project.category]}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">{project.year}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base text-foreground mb-1.5 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-2">
                    {project.tagline}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {visibleTags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-md bg-secondary border border-border text-secondary-foreground"
                        >
                            {tag}
                        </span>
                    ))}
                    {overflow > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-secondary border border-border text-muted-foreground">
                            +{overflow}
                        </span>
                    )}
                </div>

                {/* Footer actions */}
                <div className="flex items-center gap-2 mt-auto">
                    <Link
                        to={`/projects/${project.slug}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-colors duration-200"
                    >
                        Ver Detalhes <ArrowUpRight size={14} />
                    </Link>
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors duration-200"
                            aria-label="Repositório"
                        >
                            <Github size={15} />
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors duration-200"
                            aria-label="Ver online"
                        >
                            <ArrowUpRight size={15} />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
    const [activeFilter, setActiveFilter] = useState<FilterTab>('todos');

    // Only render tabs that have at least one project
    const usedCategories = new Set(PROJECTS.map((p) => p.category));
    const tabs = ALL_TABS.filter((t) => t.value === 'todos' || usedCategories.has(t.value as ProjectCategory));

    const filtered = (
        activeFilter === 'todos' ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter)
    ) as Project[];

    return (
        <section ref={sectionRef} id="projetos" className="relative py-24 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

            <div className="max-w-6xl mx-auto px-6">
                {/* ── Heading ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="mb-10"
                >
                    <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3 block">
                        Projetos
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        O que eu <span className="text-gradient-cyan">construí</span>
                    </h2>
                </motion.div>

                {/* ── Filter tabs ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex flex-wrap gap-2 mb-10"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveFilter(tab.value)}
                            className={cn(
                                'relative px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 cursor-pointer',
                                activeFilter === tab.value
                                    ? 'text-primary border-primary/30'
                                    : 'text-muted-foreground border-border hover:text-foreground',
                            )}
                        >
                            {activeFilter === tab.value && (
                                <motion.span
                                    layoutId="filter-pill"
                                    className="absolute inset-0 rounded-full bg-primary/10"
                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    ))}
                </motion.div>

                {/* ── Cards grid ── */}
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
