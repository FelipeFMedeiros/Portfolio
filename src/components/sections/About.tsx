import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Code2, GraduationCap, Rocket } from 'lucide-react';

const STATS = [
    { value: '20k+', label: 'Vidas impactadas' },
    { value: '+2', label: 'Anos construindo software' },
] as const;

const HIGHLIGHTS = [
    {
        icon: Code2,
        title: 'Arquitetura & Performance',
        description:
            'Foco em aplicações rápidas e otimizadas, reduzindo payloads e garantindo 100/100 no Lighthouse.',
    },
    {
        icon: GraduationCap,
        title: 'Fundamentos Sólidos',
        description:
            'De jovem aprendiz no hardware à monitoria em C, priorizo entender a computação em baixo nível.',
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
                            Olá! Sou Felipe, estudante de Ciência da Computação na <span className="text-foreground font-medium">UERN</span> e desenvolvedor Full-Stack. Minha história com a tecnologia não começou no código, mas abrindo máquinas. Comecei como <span className="text-foreground font-medium">jovem aprendiz na manutenção de computadores e notebooks</span>, o que me deu uma base prática e curiosidade para entender como a computação funciona desde o hardware.
                        </motion.p>
                        <motion.p variants={fadeUp}>
                            Hoje, traduzo essa mesma curiosidade para o desenvolvimento de software. Tenho visão completa do ciclo de vida de uma aplicação: da modelagem de bancos de dados robustos e APIs com <span className="text-foreground font-medium">Node.js e C# .NET</span>, à construção de interfaces de alta performance e apps nativos com <span className="text-foreground font-medium">React Native</span>. Trabalho focado em criar sistemas que equilibram arquitetura limpa e métricas reais de negócio.
                        </motion.p>
                        <motion.p variants={fadeUp}>
                            Acredito que dominar a base é fundamental. Por isso, atuei como monitor acadêmico ensinando a <span className="text-foreground font-medium">linguagem C e alocação de memória</span>, e participo de projetos de extensão levando tecnologia para a comunidade. Já desenvolvi plataformas que impactaram diretamente mais de <span className="text-foreground font-medium">20 mil pessoas</span>, provando que um bom software vai muito além de telas bonitas, ele resolve problemas em escala.
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
