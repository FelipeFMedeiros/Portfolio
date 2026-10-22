import { useRef, useState, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import SectionHeading from '@/components/ui/SectionHeading';

const FOCUS_AREAS = ['Arquitetura Web', 'Mobile', 'APIs & Bancos de Dados', 'Deploy/VPS'];
const STATS = [
    { value: '20k+', label: 'Vidas impactadas', context: 'Ecossistema DNA do Brasil', code: 'alcance' },
    { value: '+2', label: 'Anos construindo software', context: 'Experiência prática', code: 'trajetória' },
] as const;

const TERMINAL_VIEWS = [
    { id: 'stack', label: 'stack.sh', command: './stack.sh', lines: [
        ['web', 'React · TypeScript'],
        ['mobile', 'React Native · Expo'],
        ['api', 'Node.js · C# / .NET'],
        ['dados', 'PostgreSQL · SQL Server'],
    ] },
    { id: 'deploy', label: 'deploy.yml', command: 'cat deploy.yml', lines: [
        ['portfólio', 'Bun → HTML pré-renderizado'],
        ['entrega', 'GitHub Actions → Hostinger'],
        ['projetos', 'VPS Ubuntu · Docker'],
        ['ciclo', 'Build → validação → deploy'],
    ] },
    { id: 'status', label: 'status', command: './status', lines: [
        ['atuação', 'Web · iOS · Android'],
        ['alcance', '20k+ vidas impactadas'],
        ['prática', '+2 anos construindo software'],
        ['foco', 'Arquitetura → produção'],
    ] },
] as const;

function DevTerminal() {
    const [activeTab, setActiveTab] = useState(0);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const navigateTabs = (event: KeyboardEvent<HTMLDivElement>) => {
        let next = activeTab;
        if (event.key === 'ArrowRight') next = (activeTab + 1) % TERMINAL_VIEWS.length;
        else if (event.key === 'ArrowLeft') next = (activeTab + TERMINAL_VIEWS.length - 1) % TERMINAL_VIEWS.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = TERMINAL_VIEWS.length - 1;
        else return;
        event.preventDefault();
        setActiveTab(next);
        tabRefs.current[next]?.focus();
    };
    return <>
        <div className="terminal-bar"><h3 className="sr-only">Ambiente de desenvolvimento</h3><span>felipe@arch:~</span><span aria-hidden="true">~/workspace</span></div>
        <div role="tablist" aria-label="Explorar ambiente de desenvolvimento" className="terminal-tabs" onKeyDown={navigateTabs}>
            {TERMINAL_VIEWS.map((view, index) => <button key={view.id} type="button" role="tab"
                ref={(element) => { tabRefs.current[index] = element; }} id={`about-tab-${view.id}`}
                aria-selected={activeTab === index} aria-controls={`about-panel-${view.id}`} tabIndex={activeTab === index ? 0 : -1}
                onClick={() => setActiveTab(index)}>{view.label}</button>)}
        </div>
        {TERMINAL_VIEWS.map((view, index) => <div key={view.id} id={`about-panel-${view.id}`} role="tabpanel"
            aria-labelledby={`about-tab-${view.id}`} hidden={activeTab !== index} tabIndex={0} className="terminal-panel">
            <p className="terminal-command"><span aria-hidden="true">$</span> {view.command}</p>
            <dl>{view.lines.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
        </div>)}
        <p className="terminal-footnote">Stacks e entregas dos projetos deste portfólio.</p>
    </>;
}

function useCountUp(target: number, isActive: boolean, duration = 1400) {
    const [count, setCount] = useState(target);
    const reducedMotion = usePrefersReducedMotion();
    useEffect(() => {
        if (reducedMotion) return;
        if (!isActive) { setCount(0); return; }
        let startTime: number | null = null;
        let frame = 0;
        const step = (timestamp: number) => {
            if (startTime === null) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.round((1 - (1 - progress) ** 3) * target));
            if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [isActive, target, duration, reducedMotion]);
    return reducedMotion ? target : count;
}

function AnimatedCounter({ raw }: { raw: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isActive = useInView(ref, { once: true, amount: 0.8 });
    const [, prefix = '', number = '0', suffix = ''] = raw.match(/^(\+?)(\d+)(.*)$/) ?? [];
    const count = useCountUp(Number(number), isActive);
    return <span ref={ref} className="about-counter"><span className="sr-only">{raw}</span><span aria-hidden="true">{prefix}{count}{suffix}</span></span>;
}

function MetricGraphic({ index }: { index: number }) {
    return <svg className="metric-graphic" viewBox="0 0 200 36" fill="none" aria-hidden="true" focusable="false">
        {index === 0 ? Array.from({ length: 20 }, (_, bar) => <rect key={bar} x={bar * 10} y={30 - (bar % 5) * 5}
            width="5" height={6 + (bar % 5) * 5} rx="1" fill="currentColor" opacity={0.3 + bar / 30} />)
            : <><path d="M0 31H200M0 16H200" stroke="currentColor" opacity=".15" /><path d="M1 30H32V25H64V25H96V17H128V17H160V7H199" stroke="currentColor" strokeWidth="1.5" /><circle cx="199" cy="7" r="2.5" fill="currentColor" /></>}
    </svg>;
}

export default function About() {
    const reducedMotion = usePrefersReducedMotion();
    const reveal = { initial: { y: reducedMotion ? 0 : 14 }, whileInView: { y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: reducedMotion ? 0 : 0.45 } };
    return (
        <section id="sobre" className="section-shell about-section">
            <div className="content-shell">
                <SectionHeading number="03" eyebrow="Arquitetura & bio">Sobre mim.</SectionHeading>
                <div className="about-bento">
                    <motion.article {...reveal} className="bento-cell bento-bio">
                        <span className="bento-label">README.md / Felipe Medeiros</span>
                        <h3>Do primeiro endpoint<br className="hidden lg:block" /> ao deploy.</h3>
                        <p className="bio-description">Sou Felipe Medeiros, desenvolvedor Full-Stack e estudante de Ciência da Computação na UERN. Construo sistemas web e mobile em produção, da modelagem de dados ao deploy, com arquitetura limpa e foco em desempenho.</p>
                        <ul className="bio-focus" aria-label="Frentes de atuação">{FOCUS_AREAS.map((area) => <li key={area}>{area}</li>)}</ul>
                    </motion.article>
                    <motion.article {...reveal} className="bento-cell bento-terminal" aria-label="Terminal demonstrativo de desenvolvimento">
                        <DevTerminal />
                    </motion.article>
                    <motion.article {...reveal} className="bento-cell bento-telemetry" aria-labelledby="telemetry-heading">
                        <h3 id="telemetry-heading" className="bento-label">Registros de prática</h3>
                        <div className="telemetry-readings">{STATS.map((stat, index) => <div key={stat.code} className="telemetry-item">
                            <span className="metric-code">{stat.code} / 0{index + 1}</span>
                            <AnimatedCounter raw={stat.value} />
                            <span className="metric-label">{stat.label}</span>
                            <MetricGraphic index={index} />
                            <span className="metric-context">{stat.context}</span>
                        </div>)}</div>
                    </motion.article>
                    <motion.article {...reveal} className="bento-cell bento-operation">
                        <span className="bento-label">Base & operação</span>
                        <div className="operation-location"><span className="location-marker" aria-hidden="true"><MapPin size={28} strokeWidth={1.25} /></span><div><h3>Natal, RN.</h3><p>Brasil · atuação remota</p></div></div>
                        <p className="operation-description">Arquitetura, desenvolvimento e publicação. Projetos reais, de ponta a ponta.</p>
                        <a className="operation-availability" href="#contato"><span className="status-dot" aria-hidden="true" />Disponível para novos projetos<ArrowUpRight size={16} aria-hidden="true" /></a>
                    </motion.article>
                </div>
            </div>
        </section>
    );
}
