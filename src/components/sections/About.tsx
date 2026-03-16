import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Code2, GraduationCap, Rocket } from 'lucide-react';

const STATS = [
    { value: '20k+', label: 'Alunos impactados' },
    { value: '+2', label: 'Anos de experiência' },
] as const;

const HIGHLIGHTS = [
    {
        icon: Code2,
        title: 'Código Limpo',
        description:
            'Arquiteturas bem fundamentadas, código legível e manutenível em cada projeto — do backend ao mobile.',
    },
    {
        icon: GraduationCap,
        title: 'Ensino & Mentoria',
        description:
            'Professor em 3 projetos de extensão da UERN e monitor acadêmico de Técnicas de Programação.',
    },
    {
        icon: Rocket,
        title: 'Impacto Real',
        description:
            'Soluções que alcançaram mais de 20 mil pessoas — de alunos a comunidades periféricas.',
    },
] as const;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

// ── Counter helpers ───────────────────────────────────────────────────────────

function useCountUp(target: number, isActive: boolean, duration = 1600) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isActive) return;
        let startTime: number | null = null;
        let rafId = 0;

        const step = (ts: number) => {
            if (startTime === null) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const eased = 1 - (1 - progress) ** 3; // easeOutCubic
            setCount(Math.round(eased * target));
            if (progress < 1) rafId = requestAnimationFrame(step);
        };

        rafId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafId);
    }, [isActive, target, duration]);

    return count;
}

function parseStatValue(raw: string) {
    const match = raw.match(/^(\+?)(\d+)(.*)$/);
    if (!match) return { prefix: '', number: 0, suffix: raw };
    return { prefix: match[1], number: parseInt(match[2], 10), suffix: match[3] };
}

function AnimatedCounter({ raw, isActive }: { raw: string; isActive: boolean }) {
    const { prefix, number, suffix } = parseStatValue(raw);
    const count = useCountUp(number, isActive);
    return (
        <span className="text-3xl font-extrabold text-gradient-cyan leading-none">
            {prefix}{count}{suffix}
        </span>
    );
}

export default function About() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} id="sobre" className="relative py-24 overflow-hidden">
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
                        Quem sou eu
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Sobre{' '}
                        <span className="text-gradient-cyan">mim</span>
                    </h2>
                </motion.div>

                {/* ── Main content: text + stats ── */}
                <div className="grid lg:grid-cols-[1fr,320px] gap-12 xl:gap-16 items-start mb-14">

                    {/* Text */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="flex flex-col gap-5 text-muted-foreground leading-relaxed text-[0.965rem]"
                    >
                        <motion.p variants={fadeUp}>
                            Olá! Sou Felipe, estudante de Ciência da Computação na{' '}
                            <span className="text-foreground font-medium">UERN</span> (atualmente no 7º período) e desenvolvedor
                            Full-Stack. Comecei a programar durante a graduação e logo mergulhei em
                            projetos reais — sistemas que impactaram mais de{' '}
                            <span className="text-foreground font-medium">20 mil alunos</span>, apps
                            mobile publicados na App Store e Play Store, e soluções web que
                            impulsionaram o crescimento de empresas.
                        </motion.p>
                        <motion.p variants={fadeUp}>
                            Tenho visão completa do desenvolvimento: da modelagem de banco de dados e
                            construção de APIs robustas com{' '}
                            <span className="text-foreground font-medium">Node.js e C# .NET</span>,
                            até interfaces React responsivas e aplicativos multiplataforma com{' '}
                            <span className="text-foreground font-medium">Expo</span>. Priorizo código
                            limpo, arquiteturas bem fundamentadas e soluções que equilibram
                            performance e experiência do usuário.
                        </motion.p>
                        <motion.p variants={fadeUp}>
                            Além da engenharia, tenho uma forte ligação com{' '}
                            <span className="text-foreground font-medium">ensino</span>. Atuei como
                            professor voluntário em três projetos de extensão da UERN — ensinando
                            programação a crianças, IoT com Arduino a jovens e inclusão digital a
                            comunidades periféricas. Acredito que compartilhar conhecimento transforma
                            tanto quanto construir software.
                        </motion.p>
                    </motion.div>

                    {/* Stats grid */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="grid grid-cols-2 gap-3"
                    >
                        {STATS.map((stat) => (
                            <motion.div
                                key={stat.label}
                                variants={fadeUp}
                                className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-1.5 hover:border-primary/40 transition-colors duration-300"
                            >
                                <AnimatedCounter raw={stat.value} isActive={isInView} />
                                <span className="text-xs text-muted-foreground leading-snug">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Highlights row ── */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid sm:grid-cols-3 gap-4"
                >
                    {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
                        <motion.div
                            key={title}
                            variants={fadeUp}
                            className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
                        >
                            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                <Icon size={20} className="text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground">{title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
