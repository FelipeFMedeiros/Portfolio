import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { usePrefersReducedMotion as useReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { Variants } from 'motion/react';
import { Code2, GraduationCap, Rocket } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import InteractiveSurface from '@/components/ui/InteractiveSurface';

const STATS = [
    { value: '20k+', label: 'Vidas impactadas' },
    { value: '+2', label: 'Anos construindo software' },
] as const;

const HIGHLIGHTS = [
    {
        icon: Code2,
        title: 'Arquitetura & Performance',
        description: 'Foco em aplicações rápidas e otimizadas, reduzindo payloads e garantindo 100/100 no Lighthouse.',
    },
    {
        icon: GraduationCap,
        title: 'Fundamentos Sólidos',
        description: 'De jovem aprendiz no hardware à monitoria em C, priorizo entender a computação em baixo nível.',
    },
    {
        icon: Rocket,
        title: 'Ecossistemas Escaláveis',
        description:
            'Desenvolvimento Full-Stack que suporta alto volume, como plataformas rodando para mais de 20 mil usuários.',
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
    const [count, setCount] = useState(target);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion) return;
        if (!isActive) { setCount(0); return; }
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
    }, [isActive, target, duration, reducedMotion]);

    return reducedMotion ? target : count;
}

function parseStatValue(raw: string) {
    const match = raw.match(/^(\+?)(\d+)(.*)$/);
    if (!match) return { prefix: '', number: 0, suffix: raw };
    return { prefix: match[1], number: parseInt(match[2], 10), suffix: match[3] };
}

function AnimatedCounter({ raw }: { raw: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isActive = useInView(ref, { once: true, amount: 0.8 });
    const { prefix, number, suffix } = parseStatValue(raw);
    const count = useCountUp(number, isActive);
    return (
        <span ref={ref} className="about-counter">
            <span className="sr-only">{raw}</span>
            <span aria-hidden="true">
            {prefix}
            {count}
            {suffix}
            </span>
        </span>
    );
}

export default function About() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} id="sobre" className="section-shell about-section">
            {/* Section separator */}
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

            <div className="content-shell">
                {/* ── Section heading ── */}
                <SectionHeading number="01" eyebrow="Quem sou eu">Sobre <span>mim.</span></SectionHeading>

                {/* ── Main content: text + stats ── */}
                <div className="about-layout">
                    {/* Text */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="about-narrative"
                    >
                        <motion.p variants={fadeUp}>
                            Olá! Sou Felipe, estudante de Ciência da Computação na{' '}
                            <span className="text-foreground font-medium">UERN</span> e desenvolvedor Full-Stack. Minha
                            história com a tecnologia não começou no código, mas abrindo máquinas. Comecei como{' '}
                            <span className="text-foreground font-medium">
                                jovem aprendiz na manutenção de computadores e notebooks
                            </span>
                            , o que me deu uma base prática e curiosidade para entender como a computação funciona desde
                            o hardware.
                        </motion.p>
                        <motion.p variants={fadeUp}>
                            Hoje, traduzo essa mesma curiosidade para o desenvolvimento de software. Tenho visão
                            completa do ciclo de vida de uma aplicação: da modelagem de bancos de dados robustos e APIs
                            com <span className="text-foreground font-medium">Node.js e C# .NET</span>, à construção de
                            interfaces de alta performance e apps nativos com{' '}
                            <span className="text-foreground font-medium">React Native</span>. Trabalho focado em criar
                            sistemas que equilibram arquitetura limpa e métricas reais de negócio.
                        </motion.p>
                        <motion.p variants={fadeUp}>
                            Acredito que dominar a base é fundamental. Por isso, atuei como monitor acadêmico ensinando
                            a <span className="text-foreground font-medium">linguagem C e alocação de memória</span>, e
                            participo de projetos de extensão levando tecnologia para a comunidade. Já desenvolvi
                            plataformas que impactaram diretamente mais de{' '}
                            <span className="text-foreground font-medium">20 mil pessoas</span>, provando que um bom
                            software vai muito além de telas bonitas, ele resolve problemas em escala.
                        </motion.p>
                    </motion.div>

                    {/* Stats grid */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="about-stats"
                    >
                        {STATS.map((stat) => (
                            <motion.div
                                key={stat.label}
                                variants={fadeUp}
                                className="about-stat"
                            >
                                <AnimatedCounter raw={stat.value} />
                                <span className="text-xs text-muted-foreground leading-snug">{stat.label}</span>
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
                    {HIGHLIGHTS.map(({ icon: Icon, title, description }, index) => (
                        <motion.div
                            key={title}
                            variants={fadeUp}
                            className="h-full"
                        >
                            <InteractiveSurface className="highlight-card">
                            <div className="highlight-topline"><div className="highlight-icon">
                                <Icon size={20} className="text-primary" />
                            </div><span>0{index + 1}</span></div>
                            <h3 className="font-semibold text-foreground">{title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                            </InteractiveSurface>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
