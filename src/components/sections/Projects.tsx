import ResponsiveImage from '@/components/ui/ResponsiveImage';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePrefersReducedMotion as useReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ArrowUpRight, Github, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { PROJECTS, CATEGORY_LABELS } from '@/data/projects';
import type { Project, ProjectCategory } from '@/data/projects';
import InteractiveSurface from '@/components/ui/InteractiveSurface';
import SectionHeading from '@/components/ui/SectionHeading';

type FilterTab = 'todos' | ProjectCategory;
const ALL_TABS: { label: string; value: FilterTab }[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'Profissional', value: 'profissional' },
    { label: 'Freelancer', value: 'freelancer' },
    { label: 'Pessoal', value: 'pessoal' },
    { label: 'Acadêmico', value: 'academico' },
];

function ProjectCard({ project }: { project: Project }) {
    const number = String(PROJECTS.indexOf(project) + 1).padStart(2, '0');
    const address = project.liveUrl ? new URL(project.liveUrl).hostname.replace(/^www\./, '') : `app://${project.slug}`;
    const systemType = project.tags.includes('React Native') ? 'Mobile & API' : project.tags.includes('Node.js') ? 'Full-Stack' : 'Web & performance';
    return (
        <InteractiveSurface className="project-card group">
            <Link to={`/projects/${project.slug}/`} state={{ fromPortfolio: true }} className="project-cover">
                <div className="project-window-bar" aria-hidden="true">
                    <span className="window-controls"><span /><span /><span /></span>
                    <span className="window-address">{address}</span><span className="window-index">{number}</span>
                </div>
                <div className="project-viewport">
                {project.coverImage ? <ResponsiveImage sizes="(max-width: 767px) calc(100vw - 40px), (min-width: 1280px) 660px, 55vw" src={project.coverImage} alt={`Capa do projeto ${project.title}`} loading="lazy" width="800" height="500" /> : <Layers size={38} className="text-primary" />}
                <div className="project-image-shade" />
                <span className="project-explore">Explorar projeto<span className="sr-only">: {project.title}</span><ArrowUpRight size={18} /></span>
                </div>
            </Link>
            <div className="project-body">
                <div className="project-meta"><div><span className="project-status"><span aria-hidden="true" />{systemType}</span><span className="project-category">{CATEGORY_LABELS[project.category]}</span></div><span>{project.year}</span></div>
                <h3><Link to={`/projects/${project.slug}/`} state={{ fromPortfolio: true }}>{project.title}</Link></h3>
                <p>{project.tagline}</p>
                <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="project-actions">
                    <Link to={`/projects/${project.slug}/`} state={{ fromPortfolio: true }} className="project-detail-link" aria-label={`Ver Detalhes: ${project.title}`}>Ver Detalhes<ArrowUpRight size={17} /></Link>
                    {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Repositório de ${project.title}`}><Github size={17} /></a>}
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${project.title} online`}><ArrowUpRight size={17} /></a>}
                </div>
            </div>
        </InteractiveSurface>
    );
}

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState<FilterTab>('todos');
    useEffect(() => {
        try {
            const saved = window.sessionStorage.getItem('portfolio-project-filter');
            if (ALL_TABS.some((tab) => tab.value === saved && (saved === 'todos' || PROJECTS.some((project) => project.category === saved)))) setActiveFilter(saved as FilterTab);
        } catch { /* O filtro continua disponível sem armazenamento do navegador. */ }
    }, []);
    const reducedMotion = useReducedMotion();
    const tabs = ALL_TABS.filter((tab) => tab.value === 'todos' || PROJECTS.some((project) => project.category === tab.value));
    const filtered = activeFilter === 'todos' ? PROJECTS : PROJECTS.filter((project) => project.category === activeFilter);
    const selectFilter = (value: FilterTab) => {
        setActiveFilter(value);
        try { window.sessionStorage.setItem('portfolio-project-filter', value); } catch { /* Preferência apenas nesta página. */ }
    };

    return (
        <section id="projetos" className="section-shell projects-section">
            <div className="content-shell">
                <SectionHeading number="01" eyebrow="Projetos em produção">O que eu construí.</SectionHeading>
                <div className="project-filter-bar">
                    <div role="group" aria-label="Filtrar projetos por categoria" className="project-filters">
                        {tabs.map((tab) => <button key={tab.value} onClick={() => selectFilter(tab.value)} aria-pressed={activeFilter === tab.value}
                            className={cn('project-filter', activeFilter === tab.value && 'is-active')}>
                            {activeFilter === tab.value && <motion.span layoutId="filter-pill" className="filter-active" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
                            <span>{tab.label}</span><span className="filter-count">{tab.value === 'todos' ? PROJECTS.length : PROJECTS.filter((project) => project.category === tab.value).length}</span>
                        </button>)}
                    </div>
                    <span className="project-result-count" role="status" aria-live="polite">{String(filtered.length).padStart(2, '0')} {filtered.length === 1 ? 'projeto' : 'projetos'}</span>
                </div>
                <motion.div layout className="projects-grid" id="project-results">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {filtered.map((project) => <motion.article key={project.slug} layout
                            initial={{ opacity: 0, y: reducedMotion ? 0 : 20, scale: reducedMotion ? 1 : 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
                            transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className={cn('project-entry', project.slug === PROJECTS[0].slug && 'is-featured')}>
                            <ProjectCard project={project} />
                        </motion.article>)}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
