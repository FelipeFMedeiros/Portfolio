import { useId, useRef, useState } from 'react';
import type { ComponentType, CSSProperties } from 'react';
import { motion, useInView } from 'motion/react';
import { usePrefersReducedMotion as useReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { Variants } from 'motion/react';
import { Database } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { usePointerEffects } from '@/hooks/usePointerEffects';
import {
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiNextdotjs,
    SiVite,
    SiNodedotjs,
    SiDotnet,
    SiExpo,
    SiMysql,
    SiPrisma,
    SiGit,
    SiGithub,
    SiFigma,
    SiRedis,
    SiSwagger,
    SiShadcnui,
    SiMongodb,
    SiDocker,
    SiAngular,
    SiAxios,
    SiPostman,
    SiCloudflare,
    SiVercel,
    SiNginx,
    SiLinux,
    SiDigitalocean,
    SiExpress,
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

// Tipo compatível com lucide-react + react-icons
type TechIcon = ComponentType<{
    size?: number;
    style?: CSSProperties;
    className?: string;
}>;

// ── Types ─────────────────────────────────────────────────────────────────────

interface RadarSkill {
    readonly label: string;
    readonly lines: readonly string[];
    readonly description: string;
    readonly value: number; // 0–100
}

interface StackItem {
    readonly name: string;
    readonly icon: TechIcon;
    readonly color?: string;
}

interface StackCategory {
    readonly category: string;
    readonly items: readonly StackItem[];
}

// ── Data ──────────────────────────────────────────────────────────────────────

const RADAR_SKILLS: readonly RadarSkill[] = [
    { label: 'Front-end', lines: ['Front-end'], description: 'Interfaces com React e TypeScript.', value: 90 },
    { label: 'Back-end', lines: ['Back-end'], description: 'APIs com Node.js e C# / .NET.', value: 80 },
    { label: 'Mobile', lines: ['Mobile'], description: 'Aplicativos com React Native e Expo.', value: 78 },
    { label: 'Banco de Dados', lines: ['Banco de', 'Dados'], description: 'Modelagem e integração de bancos de dados.', value: 72 },
    { label: 'UI/UX', lines: ['UI/UX'], description: 'Prototipação no Figma e experiência de uso.', value: 70 },
    { label: 'DevOps & Cloud', lines: ['DevOps &', 'Cloud'], description: 'Containers, infraestrutura e publicação.', value: 65 },
] as const;

const STACK: readonly StackCategory[] = [
    {
        category: 'Front-end',
        items: [
            { name: 'React', icon: SiReact, color: '#61DAFB' },
            { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
            { name: 'TailwindCSS', icon: SiTailwindcss, color: '#06B6D4' },
            { name: 'ShadcnUi', icon: SiShadcnui, color: '#06B6D4' },
            { name: 'Next.js', icon: SiNextdotjs },
            { name: 'Vite', icon: SiVite, color: '#646CFF' },
            { name: 'Angular', icon: SiAngular, color: '#DD0031' },
            { name: 'Axios', icon: SiAxios, color: '#5A29E4' },
        ],
    },
    {
        category: 'Back-end',
        items: [
            { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
            { name: 'Express', icon: SiExpress, color: '#339933' },
            { name: 'C# / .NET', icon: SiDotnet, color: '#512BD4' },
            { name: 'Swagger', icon: SiSwagger, color: '#512BD4' },
        ],
    },
    {
        category: 'Mobile',
        items: [
            { name: 'React Native', icon: SiReact, color: '#61DAFB' },
            { name: 'Expo', icon: SiExpo },
        ],
    },
    {
        category: 'Banco de Dados',
        items: [
            { name: 'SQL Server', icon: Database, color: '#CC2927' },
            { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
            { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
            { name: 'Prisma', icon: SiPrisma },
            { name: 'Redis', icon: SiRedis, color: '#DC382D' },
        ],
    },
    {
        category: 'Ferramentas',
        items: [
            { name: 'Git', icon: SiGit, color: '#F05032' },
            { name: 'GitHub', icon: SiGithub },
            { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
            { name: 'Postman', icon: SiPostman, color: '#2496ED' },
            { name: 'Swagger', icon: SiSwagger, color: '#2496ED' },
        ],
    },
    {
        category: 'Cloud & Infraestrutura',
        items: [
            { name: 'Cloudflare', icon: SiCloudflare, color: '#F38020' },
            { name: 'Vercel', icon: SiVercel, color: '#000000' },
            { name: 'Docker', icon: SiDocker, color: '#2496ED' },
            { name: 'Azure', icon: VscAzure, color: '#0078D4' },
            { name: 'DigitalOcean', icon: SiDigitalocean, color: '#008BCF' },
            { name: 'Nginx', icon: SiNginx, color: '#009688' },
            { name: 'Linux', icon: SiLinux, color: '#F6821F' },
        ],
    },
] as const;

// ── Radar geometry (computed once, outside render) ────────────────────────────

const CX = 250;
const CY = 250;
const MAX_R = 130;
const LABEL_R = 188;
const N = RADAR_SKILLS.length;
const LINE_H = 15; // px between label lines
const RINGS = [0.25, 0.5, 0.75, 1.0] as const;

function angle(i: number) {
    return -Math.PI / 2 + (2 * Math.PI * i) / N;
}

function pt(i: number, r: number) {
    const a = angle(i);
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

function polyPoints(radii: readonly number[]) {
    return radii
        .map((r, i) => {
            const p = pt(i, r);
            return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
        })
        .join(' ');
}

const ringPolys = RINGS.map((r) => polyPoints(Array.from({ length: N }, () => MAX_R * r)));
const dataCoords = RADAR_SKILLS.map((s, i) => pt(i, (MAX_R * s.value) / 100));
const dataPoly = dataCoords.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

// ── Framer Motion variants ────────────────────────────────────────────────────

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const rowFade: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ── RadarChart ────────────────────────────────────────────────────────────────

function RadarChart() {
    const chartRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(chartRef, { once: true, amount: 0.35 });
    const reducedMotion = useReducedMotion();
    const [selected, setSelected] = useState<number | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);
    const [focused, setFocused] = useState<number | null>(null);
    const tooltipId = useId();
    const active = hovered ?? focused ?? selected;
    const activeSkill = active === null ? null : RADAR_SKILLS[active];
    const centerPoly = RADAR_SKILLS.map(() => `${CX},${CY}`).join(' ');

    return (
        <div ref={chartRef} className="radar-panel" onKeyDown={(event) => {
            if (event.key === 'Escape') { setSelected(null); setHovered(null); setFocused(null); }
        }}>
            <p className="skills-label">Visão Geral</p>
            <div className="radar-explorer" onMouseLeave={() => setHovered(null)}>
            <div className="radar-plot">
            <svg viewBox="0 0 500 500" className="radar-chart" role="img" aria-labelledby="radar-title radar-description">
                <title id="radar-title">Gráfico radar de habilidades</title>
                <desc id="radar-description">{RADAR_SKILLS.map((skill) => `${skill.label}: ${skill.value}%`).join('; ')}</desc>
                {ringPolys.map((points, index) => <polygon key={index} points={points} fill="none" stroke="var(--border)" strokeWidth={1} />)}
                {RADAR_SKILLS.map((_, index) => {
                    const end = pt(index, MAX_R);
                    return <line key={index} x1={CX} y1={CY} x2={end.x} y2={end.y} stroke="var(--border)" strokeWidth={1} />;
                })}
                <motion.polygon initial={{ points: reducedMotion ? dataPoly : centerPoly, opacity: 0 }}
                    animate={isInView ? { points: dataPoly, opacity: 1 } : {}}
                    transition={{ duration: reducedMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
                    fill="color-mix(in srgb, var(--primary) 13%, transparent)" stroke="var(--primary)" strokeWidth={1.8} strokeLinejoin="round" />
                {dataCoords.map((coordinate, index) => <motion.circle key={index}
                    initial={{ cx: reducedMotion ? coordinate.x : CX, cy: reducedMotion ? coordinate.y : CY, opacity: 0 }}
                    animate={isInView ? { cx: coordinate.x, cy: coordinate.y, opacity: 1, r: active === index ? 7 : 4 } : {}}
                    transition={{ duration: reducedMotion ? 0 : 1, ease: 'easeOut', r: { duration: reducedMotion ? 0 : 0.15 } }}
                    fill="var(--primary)" stroke="var(--card)" strokeWidth={2} />)}
                <g aria-hidden="true" className="radar-scale">
                    {[0.25, 0.5, 0.75].map((ring) => <g key={ring} transform={`translate(${CX + 6}, ${CY - MAX_R * ring - 20})`}>
                        <rect width="40" height="20" rx="4" fill="var(--card)" stroke="var(--border)" />
                        <text x="20" y="13.5" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--foreground)" fontFamily="var(--font-mono)">{Math.round(ring * 100)}%</text>
                    </g>)}
                </g>
                {RADAR_SKILLS.map((skill, index) => {
                    const a = angle(index);
                    const lx = CX + LABEL_R * Math.cos(a);
                    const ly = CY + LABEL_R * Math.sin(a);
                    const cos = Math.cos(a);
                    const anchor = cos < -0.3 ? 'end' : cos > 0.3 ? 'start' : 'middle';
                    return <text key={skill.label} textAnchor={anchor} fill={active === index ? 'var(--primary)' : 'var(--muted-foreground)'} fontSize={13.5} fontFamily="var(--font-display)">
                        {skill.lines.map((line, j) => <tspan key={line} x={lx} y={j === 0 ? ly - ((skill.lines.length - 1) * LINE_H) / 2 : undefined} dy={j === 0 ? '0.35em' : LINE_H}>{line}</tspan>)}
                    </text>;
                })}
            </svg>
            {RADAR_SKILLS.map((skill, index) => <button key={skill.label} type="button" className={`radar-point-button ${active === index ? 'is-active' : ''}`}
                style={{ left: `${dataCoords[index].x / 5}%`, top: `${dataCoords[index].y / 5}%` }}
                aria-label={`${skill.label}: ${skill.value}%`} aria-pressed={selected === index} aria-describedby={active === index ? tooltipId : undefined}
                onMouseEnter={() => setHovered(index)} onFocus={() => setFocused(index)} onBlur={() => setFocused(null)}
                onClick={() => setSelected(selected === index ? null : index)} />)}
            </div>
            <div className="radar-readout">
            {activeSkill ? <div id={tooltipId} role="tooltip" className="radar-tooltip">
                <div><strong>{activeSkill.label}</strong><span>{activeSkill.value}%</span></div>
                <p>{activeSkill.description}</p>
            </div> : <p className="radar-hint">Passe o mouse, toque ou foque um ponto para explorar.</p>}
            </div>
            </div>
            <div className="radar-values" aria-label="Valores das habilidades">
                {RADAR_SKILLS.map((skill, index) => <button key={skill.label} onClick={() => setSelected(selected === index ? null : index)}
                    onFocus={() => setFocused(index)} onBlur={() => setFocused(null)} aria-describedby={active === index ? tooltipId : undefined}
                    aria-pressed={selected === index} className={selected === index ? 'is-selected' : ''}>
                    <span>{skill.label}</span><strong>{skill.value}<span>%</span></strong>
                </button>)}
            </div>
        </div>
    );
}

export default function Skills() {
    const pointerEffects = usePointerEffects();
    return (
        <section id="habilidades" className="section-shell skills-section">
            <div className="content-shell">
                <SectionHeading number="04" eyebrow="Ferramentas & fundamentos">Minhas skills.</SectionHeading>
                <div className="skills-layout">
                    <RadarChart />
                    <div className="skills-stack">
                        <p className="skills-label">Tech Stack</p>
                        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                            {STACK.map(({ category, items }, categoryIndex) => <motion.div key={category} variants={rowFade} className="stack-category">
                                <div className="stack-category-label"><span>0{categoryIndex + 1}</span><h3>{category}</h3><span>{String(items.length).padStart(2, '0')}</span></div>
                                <motion.div className="stack-items" initial="rest" whileHover={pointerEffects ? 'wave' : undefined}>
                                    {items.map(({ name, icon: Icon, color }, index) => <motion.div key={name} className="tech-item"
                                        variants={{ rest: { y: 0, scale: 1, transition: { duration: 0.3 } }, wave: { y: -3, scale: 1.025, transition: { delay: index * 0.035, type: 'spring', stiffness: 300, damping: 18 } } }}>
                                        <Icon aria-hidden="true" size={15} style={{ color: color === '#000000' ? 'currentColor' : color ?? 'currentColor' }} />{name}
                                    </motion.div>)}
                                </motion.div>
                            </motion.div>)}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
