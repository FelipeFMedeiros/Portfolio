import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Download, ArrowRight, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TECH_BADGES = ['React', 'Node.js', 'TypeScript', 'C#', 'React Native'];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const photoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: 'easeOut', delay: 0.3 },
    },
};

export default function Hero() {
    const [imgError, setImgError] = useState(false);

    const scrollToProjects = () => {
        document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 hero-dot-grid opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,oklch(0.76_0.15_207/0.08),transparent)]" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-32 lg:pb-16 flex flex-col lg:flex-row items-center gap-10 xl:gap-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
                >
                    <motion.p variants={itemVariants} className="text-primary font-medium text-lg mb-2">
                        Olá, eu sou 👋
                    </motion.p>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-none mb-4"
                    >
                        <span className="text-gradient-cyan">Felipe</span>{' '}
                        <span className="text-foreground">Medeiros</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl sm:text-2xl text-muted-foreground font-medium mb-6"
                    >
                        Desenvolvedor <span className="text-foreground font-semibold">Full-Stack</span>
                    </motion.p>

                    <motion.p
                        variants={itemVariants}
                        className="text-muted-foreground leading-relaxed max-w-xl mb-8 text-base"
                    >
                        Estudante de Ciência da Computação na <span className="text-foreground font-medium">UERN</span>,
                        apaixonado por construir soluções web e mobile modernas. Tenho experiência com sistemas de larga
                        escala, integrações mobile e interfaces que encantam.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10"
                    >
                        {TECH_BADGES.map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground border border-border"
                            >
                                {tech}
                            </span>
                        ))}
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
                    >
                        <Button size="lg" onClick={scrollToProjects} className="gap-2 font-semibold cursor-pointer">
                            Ver Projetos
                            <ArrowRight size={16} />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            asChild
                            className="gap-2 font-semibold hover:text-white hover:border-white"
                        >
                            <a href="/CV_FullStack_FelipeMedeiros.pdf" download="CV_FullStack_FelipeMedeiros.pdf">
                                <Download size={16} />
                                Download CV
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex justify-center lg:justify-start gap-3">
                        <a
                            href="https://github.com/FelipeFMedeiros"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-sm font-medium"
                        >
                            <Github size={17} />
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/felipe-fmedeiros/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-sm font-medium"
                        >
                            <Linkedin size={17} />
                            LinkedIn
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={photoVariants}
                    initial="hidden"
                    animate="visible"
                    className="shrink-0 flex items-center justify-center order-1 lg:order-2"
                >
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-110" />
                        <div className="absolute inset-0 rounded-full border-2 border-primary/30 scale-[1.06]" />

                        <div className="relative size-44 sm:size-56 lg:size-72 xl:size-80 rounded-full overflow-hidden border-2 border-primary/60 glow-cyan">
                            {imgError ? (
                                <div className="w-full h-full bg-linear-to-br from-primary/20 to-secondary flex items-center justify-center">
                                    <span className="text-4xl lg:text-6xl font-bold text-primary select-none">FM</span>
                                </div>
                            ) : (
                                <img
                                    src="/profile.webp"
                                    alt="Felipe Medeiros"
                                    className="w-full h-full object-cover"
                                    fetchPriority="high"
                                    onError={() => setImgError(true)}
                                />
                            )}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="hidden lg:block absolute -bottom-3 -right-4 bg-card border border-border rounded-xl px-3 py-2 shadow-xl"
                        >
                            <p className="text-xs text-muted-foreground">Experiência</p>
                            <p className="text-sm font-bold text-foreground">+2 anos</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5"
            >
                <span className="text-xs text-muted-foreground">Role para baixo</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="size-5 border-b-2 border-r-2 border-primary/60 rotate-45"
                />
            </motion.div>
        </section>
    );
}
