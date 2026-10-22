import ResponsiveImage from '@/components/ui/ResponsiveImage';
import { useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import type { Variants } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Github, Calendar, Tag, Maximize2 } from 'lucide-react';
import MouseGlow from '@/components/ui/MouseGlow';
import Magnetic from '@/components/ui/Magnetic';
import ImagePreview from '@/components/ui/ImagePreview';
import { PROJECTS, CATEGORY_LABELS, CATEGORY_STYLES } from '@/data/projects';
import type { ProjectScreenshot } from '@/data/projects';
import { cn } from '@/lib/utils';

const reveal: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [preview, setPreview] = useState<ProjectScreenshot | null>(null);
    const closePreview = useCallback(() => setPreview(null), []);
    const project = PROJECTS.find((entry) => entry.slug === slug);
    const goBack = () => location.state?.fromPortfolio ? navigate(-1) : navigate('/#projetos');

    if (!project) return (
        <main className="project-not-found"><span className="font-mono text-sm text-primary">404 /</span><h1>Projeto não encontrado.</h1>
            <Link className="action-secondary" to="/#projetos"><ArrowLeft size={16} />Voltar para projetos</Link></main>
    );
    const styles = CATEGORY_STYLES[project.category];
    const next = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];

    return (
        <div className="project-detail-page">
            <MouseGlow />
            <a className="skip-link" href="#project-content">Pular para o conteúdo</a>
            <header className="detail-header content-shell"><Link to="/" className="brand"><span className="brand-mark" aria-hidden="true">f<span>.</span>m</span><span className="brand-name">Felipe<span className="text-primary">.</span></span><span className="sr-only"> Medeiros — início</span></Link>
                <button onClick={goBack} className="detail-back"><ArrowLeft size={16} />Voltar</button>
            </header>
            <motion.main key={project.slug} id="project-content" tabIndex={-1} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible" className="content-shell detail-main">
                <motion.div variants={reveal} className="detail-intro">
                    <div className="detail-meta"><span className={cn('text-xs px-3 py-1.5 rounded-full border', styles.badge)}>{CATEGORY_LABELS[project.category]}</span><span><Calendar size={13} />{project.year}</span><span className="ml-auto font-mono text-[10px]">PROJETO / {String(PROJECTS.indexOf(project) + 1).padStart(2, '0')}</span></div>
                    <h1>{project.title}<span>.</span></h1><p>{project.tagline}</p>
                    {(project.repoUrl || project.liveUrl) && <div className="flex flex-wrap gap-3 mt-7">
                        {project.liveUrl && <Magnetic><a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="action-primary">Ver online<ArrowUpRight size={17} /></a></Magnetic>}
                        {project.repoUrl && <Magnetic><a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="action-secondary"><Github size={16} />Repositório</a></Magnetic>}
                    </div>}
                </motion.div>
                {project.coverImage && <motion.div variants={reveal} className="detail-cover"><div className="detail-cover-bar"><span aria-hidden="true">● ● ●</span><span>{project.title}</span><ArrowUpRight size={13} /></div><ResponsiveImage sizes="(min-width: 1280px) 1200px, calc(100vw - 40px)" src={project.coverImage} alt={`Capa do projeto ${project.title}`} fetchPriority="high" /></motion.div>}
                <div className="detail-content-grid">
                    <div>
                        <motion.section variants={reveal} className="detail-description"><div className="section-eyebrow"><span>01 /</span><span>Sobre o projeto</span></div><h2>Sobre o projeto</h2><p>{project.description}</p></motion.section>
                        <motion.section variants={reveal} className="detail-highlights"><div className="section-eyebrow"><span>02 /</span><span>Desenvolvimento</span></div><h2>O que eu construí</h2><ul>{project.highlights.map((item, index) => <li key={item}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ul></motion.section>
                    </div>
                    <motion.aside variants={reveal} className="detail-stack"><h2><Tag size={16} />Stack utilizada</h2><div>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></motion.aside>
                </div>
                {project.screenshots.length > 0 && <section className="detail-screenshots"><div className="section-eyebrow"><span>03 /</span><span>Galeria</span></div><h2>Capturas de tela</h2><div className={cn('detail-gallery', project.screenshots.length === 1 && 'single-image')}>
                    {project.screenshots.map((screenshot, index) => <motion.figure key={screenshot.src} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}>
                        <button onClick={() => setPreview(screenshot)} aria-label={`Ampliar: ${screenshot.caption ?? `Screenshot ${index + 1}`}`}><ResponsiveImage sizes="(min-width: 1280px) 1200px, calc(100vw - 40px)" src={screenshot.src} alt={screenshot.caption ?? `Screenshot ${index + 1}`} loading="lazy" /><span><Maximize2 size={17} /></span></button>
                        {screenshot.caption && <figcaption><span>{String(index + 1).padStart(2, '0')}</span>{screenshot.caption}</figcaption>}
                    </motion.figure>)}
                </div></section>}
                <Link to={`/projects/${next.slug}/`} className="next-project"><span className="font-mono text-xs text-muted-foreground">PRÓXIMO PROJETO</span><span>{next.title}<ArrowUpRight /></span></Link>
                <footer className="detail-footer"><span>Felipe Medeiros</span><Link to="/#projetos">Todos os projetos<ArrowLeft size={14} /></Link></footer>
            </motion.main>
            <AnimatePresence>{preview && <ImagePreview image={preview.src} title={preview.caption ?? project.title} onClose={closePreview} />}</AnimatePresence>
        </div>
    );
}
