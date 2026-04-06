import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import MouseGlow from '@/components/ui/MouseGlow';
import { PROJECTS, CATEGORY_LABELS, CATEGORY_STYLES } from '@/data/projects';
import { cn } from '@/lib/utils';

export default function ProjectDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const project = PROJECTS.find((p) => p.slug === slug);

    // ── Not found ──────────────────────────────────────────────────────────────
    if (!project) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-muted-foreground">Projeto não encontrado.</p>
                    <button
                        onClick={() => navigate('/#projetos')}
                        className="text-primary hover:underline text-sm cursor-pointer"
                    >
                        ← Voltar para projetos
                    </button>
                </div>
            </div>
        );
    }

    const styles = CATEGORY_STYLES[project.category];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <MouseGlow />

            <main className="pt-12 sm:pt-16 pb-24">
                <div className="max-w-4xl mx-auto px-6">
                    {/* ── Back button ── */}
                    <motion.button
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35 }}
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 cursor-pointer"
                    >
                        <ArrowLeft
                            size={15}
                            className="group-hover:-translate-x-0.5 transition-transform duration-200"
                        />
                        Voltar
                    </motion.button>

                    {/* ── Hero header ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className={cn(
                            'relative rounded-3xl overflow-hidden mb-10 p-8 sm:p-12 bg-linear-to-br',
                            styles.gradient,
                        )}
                    >
                        <div className="absolute inset-0 hero-dot-grid opacity-20" />

                        <div className="relative">
                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-3 mb-5">
                                <span
                                    className={cn('text-xs font-medium px-2.5 py-1 rounded-full border', styles.badge)}
                                >
                                    {CATEGORY_LABELS[project.category]}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Calendar size={12} /> {project.year}
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">{project.title}</h1>
                            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                                {project.tagline}
                            </p>

                            {/* CTA buttons */}
                            {(project.repoUrl ?? project.liveUrl) && (
                                <div className="flex flex-wrap gap-3 mt-7">
                                    {project.repoUrl && (
                                        <a
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/70 backdrop-blur-sm border border-border text-sm font-medium hover:border-primary/40 hover:text-primary transition-all duration-200"
                                        >
                                            <Github size={15} /> Repositório
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-all duration-200"
                                        >
                                            <ExternalLink size={15} /> Ver online
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* ── Screenshots ── */}
                    {project.screenshots.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.18 }}
                            className="mb-12"
                        >
                            <h2 className="text-lg font-bold mb-5">Capturas de tela</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {project.screenshots.map((ss, i) => (
                                    <figure
                                        key={i}
                                        className="rounded-2xl overflow-hidden border border-border bg-card"
                                    >
                                        <img
                                            src={ss.src}
                                            alt={ss.caption ?? `Screenshot ${i + 1}`}
                                            className="w-full h-auto object-cover"
                                        />
                                        {ss.caption && (
                                            <figcaption className="px-4 py-2 text-xs text-muted-foreground">
                                                {ss.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Description ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.22 }}
                        className="mb-12"
                    >
                        <h2 className="text-lg font-bold mb-3">Sobre o projeto</h2>
                        <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                    </motion.div>

                    {/* ── What was built ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.28 }}
                        className="mb-12"
                    >
                        <h2 className="text-lg font-bold mb-5">O que eu construí</h2>
                        <ul className="flex flex-col gap-3.5">
                            {project.highlights.map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                    <span className="mt-1.75 shrink-0 size-1.5 rounded-full bg-primary/60" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* ── Tech stack ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.33 }}
                        className="border-t border-border pt-10"
                    >
                        <h2 className="flex items-center gap-2 text-lg font-bold mb-5">
                            <Tag size={15} className="text-primary" />
                            Stack utilizada
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-card border border-border text-foreground hover:border-primary/40 transition-colors duration-200"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
