import { useRef, useState } from 'react';
import type { ComponentType, CSSProperties } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Database } from 'lucide-react';
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
    { label: 'Front-end',     lines: ['Front-end'],      value: 90 },
    { label: 'Back-end',      lines: ['Back-end'],       value: 80 },
    { label: 'Mobile',        lines: ['Mobile'],         value: 78 },
    { label: 'Banco de Dados',lines: ['Banco de','Dados'],value: 72 },
    { label: 'UI/UX',         lines: ['UI/UX'],          value: 70 },
    { label: 'DevOps & Cloud', lines: ['DevOps &','Cloud'], value: 65 },
] as const;

const STACK: readonly StackCategory[] = [
    {
        category: 'Front-end',
        items: [
            { name: 'React',       icon: SiReact,       color: '#61DAFB' },
            { name: 'TypeScript',  icon: SiTypescript,  color: '#3178C6' },
            { name: 'TailwindCSS', icon: SiTailwindcss, color: '#06B6D4' },
            { name: 'ShadcnUi',      icon: SiShadcnui, color: '#06B6D4' },
            { name: 'Next.js',     icon: SiNextdotjs                     },
            { name: 'Vite',        icon: SiVite,        color: '#646CFF' },
            { name: 'Angular',     icon: SiAngular,     color: '#DD0031' },
            { name: 'Axios',       icon: SiAxios,       color: '#5A29E4' }
        ],
    },
    {
        category: 'Back-end',
        items: [
            { name: 'Node.js',   icon: SiNodedotjs, color: '#339933' },
            { name: 'Express',   icon: SiExpress, color: '#339933' },
            { name: 'C# / .NET', icon: SiDotnet,    color: '#512BD4' },
            { name: 'Swagger', icon: SiSwagger,    color: '#512BD4' },
        ],
    },
    {
        category: 'Mobile',
        items: [
            { name: 'React Native', icon: SiReact, color: '#61DAFB' },
            { name: 'Expo',         icon: SiExpo                    },
        ],
    },
    {
        category: 'Banco de Dados',
        items: [
            { name: 'SQL Server', icon: Database, color: '#CC2927' },
            { name: 'MySQL',      icon: SiMysql,  color: '#4479A1' },
            { name: 'MongoDB',     icon: SiMongodb,  color: '#47A248' },
            { name: 'Prisma',     icon: SiPrisma                   },
            { name: 'Redis',     icon: SiRedis,  color: '#DC382D' },
        ],
    },
    {
        category: 'Ferramentas',
        items: [
            { name: 'Git',    icon: SiGit,    color: '#F05032' },
            { name: 'GitHub', icon: SiGithub                   },
            { name: 'Figma',  icon: SiFigma,  color: '#F24E1E' },
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
            { name: 'Azure',  icon: VscAzure, color: '#0078D4' },
            { name: 'DigitalOcean', icon: SiDigitalocean, color: '#008BCF' },
            { name: 'Nginx',  icon: SiNginx, color: '#009688' },
            { name: 'Linux',  icon: SiLinux,  color: '#F6821F' }

        ],
    },
] as const;

// ── Radar geometry (computed once, outside render) ────────────────────────────

const CX          = 250;
const CY          = 250;
const MAX_R       = 130;
const LABEL_R     = 188;
const N           = RADAR_SKILLS.length;
const LINE_H      = 15;   // px between label lines
const RINGS       = [0.25, 0.5, 0.75, 1.0] as const;

function angle(i: number) {
    return -Math.PI / 2 + (2 * Math.PI * i) / N;
}

function pt(i: number, r: number) {
    const a = angle(i);
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

function polyPoints(radii: readonly number[]) {
    return radii.map((r, i) => {
        const p = pt(i, r);
        return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    }).join(' ');
}

const ringPolys   = RINGS.map(r => polyPoints(Array.from({ length: N }, () => MAX_R * r)));
const dataCoords  = RADAR_SKILLS.map((s, i) => pt(i, MAX_R * s.value / 100));
const dataPoly    = dataCoords.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

// ── Framer Motion variants ────────────────────────────────────────────────────

const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const rowFade: Variants = {
    hidden:  { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ── RadarChart ────────────────────────────────────────────────────────────────

function RadarChart({ isInView }: { isInView: boolean }) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <svg
            viewBox="0 0 500 500"
            className="w-full h-auto max-w-105 mx-auto block select-none"
            aria-label="Gráfico radar de habilidades"
        >
            {/* ── Background rings ── */}
            {ringPolys.map((pts, ri) => (
                <polygon
                    key={ri}
                    points={pts}
                    fill="none"
                    stroke="oklch(0.28 0.01 264)"
                    strokeWidth={1}
                />
            ))}

            {/* ── Axis lines ── */}
            {RADAR_SKILLS.map((_, i) => {
                const end = pt(i, MAX_R);
                return (
                    <line
                        key={i}
                        x1={CX} y1={CY}
                        x2={end.x} y2={end.y}
                        stroke="oklch(0.28 0.01 264)"
                        strokeWidth={1}
                    />
                );
            })}

            {/* ── Ring % hints ── */}
            {[0.25, 0.5, 0.75].map(r => (
                <text
                    key={r}
                    x={CX + 4}
                    y={CY - MAX_R * r - 3}
                    fontSize="9"
                    fill="oklch(0.42 0.01 264)"
                    fontFamily="Inter, sans-serif"
                >
                    {Math.round(r * 100)}%
                </text>
            ))}

            {/* ── Data polygon (animated) ── */}
            <motion.g
                initial={{ opacity: 0, scale: 0.15 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
            >
                <polygon
                    points={dataPoly}
                    fill="oklch(0.76 0.15 207 / 0.10)"
                    stroke="oklch(0.76 0.15 207 / 0.65)"
                    strokeWidth={1.8}
                    strokeLinejoin="round"
                />
            </motion.g>

            {/* ── Vertex dots ── */}
            {dataCoords.map((coord, i) => (
                <motion.circle
                    key={i}
                    cx={coord.x}
                    cy={coord.y}
                    r={5.5}
                    strokeWidth={8}
                    className="fill-primary stroke-transparent hover:stroke-primary/30 transition-all duration-200 cursor-crosshair"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.55 + i * 0.07, duration: 0.3 }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                />
            ))}

            {/* ── Tooltip ── */}
            {hovered !== null && (() => {
                const coord   = dataCoords[hovered];
                const sin     = Math.sin(angle(hovered));
                const W = 46, H = 24;
                const ty      = sin < 0
                    ? coord.y + 10             // dot in upper half → tooltip below
                    : coord.y - H - 10;        // dot in lower half → tooltip above
                return (
                    <g pointerEvents="none">
                        <rect
                            x={coord.x - W / 2} y={ty}
                            width={W} height={H} rx={6}
                            fill="oklch(0.13 0.01 264)"
                            stroke="oklch(0.76 0.15 207 / 0.45)"
                            strokeWidth={1}
                        />
                        <text
                            x={coord.x} y={ty + H / 2}
                            textAnchor="middle" dominantBaseline="middle"
                            fill="oklch(0.76 0.15 207)"
                            fontSize="11" fontWeight="600"
                            fontFamily="Inter, sans-serif"
                        >
                            {RADAR_SKILLS[hovered].value}%
                        </text>
                    </g>
                );
            })()}

            {/* ── Axis labels ── */}
            {RADAR_SKILLS.map((skill, i) => {
                const a   = angle(i);
                const lx  = CX + LABEL_R * Math.cos(a);
                const ly  = CY + LABEL_R * Math.sin(a);
                const cos = Math.cos(a);
                const anchor: 'start' | 'middle' | 'end' =
                    cos < -0.3 ? 'end' : cos > 0.3 ? 'start' : 'middle';

                return (
                    <text
                        key={i}
                        textAnchor={anchor}
                        fill="oklch(0.78 0.01 264)"
                        className="text-[13.5px]"
                        fontWeight="500"
                        fontFamily="Inter, sans-serif"
                    >
                        {skill.lines.map((line, j) => (
                            <tspan
                                key={j}
                                x={lx}
                                y={j === 0
                                    ? ly - ((skill.lines.length - 1) * LINE_H) / 2
                                    : undefined}
                                dy={j === 0 ? '0.35em' : LINE_H}
                            >
                                {line}
                            </tspan>
                        ))}
                    </text>
                );
            })}
        </svg>
    );
}

// ── Skills (main export) ──────────────────────────────────────────────────────

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView   = useInView(sectionRef, { once: true, margin: '-80px' });

    return (
        <section ref={sectionRef} id="habilidades" className="relative py-24 overflow-hidden">
            {/* Section separator */}
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

            <div className="max-w-6xl mx-auto px-6">

                {/* ── Heading ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="mb-14"
                >
                    <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3 block">
                        Habilidades
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Minhas{' '}
                        <span className="text-gradient-cyan">Skills</span>
                    </h2>
                </motion.div>

                {/* ── Radar block ── */}
                <div className="mb-16">
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-8"
                    >
                        Visão Geral
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        <RadarChart isInView={isInView} />
                    </motion.div>
                </div>

                {/* ── Tech stack block ── */}
                <div>
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-6"
                    >
                        Tech Stack
                    </motion.p>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="flex flex-col divide-y divide-border rounded-2xl border border-border overflow-hidden"
                    >
                        {STACK.map(({ category, items }) => (
                            <motion.div
                                key={category}
                                variants={rowFade}
                                className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 px-5 py-4 bg-card hover:bg-primary/5 transition-colors duration-200"
                            >
                                <span className="sm:w-32 shrink-0 text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground sm:pt-1.5">
                                    {category}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {items.map(({ name, icon: Icon, color }) => (
                                        <div
                                            key={name}
                                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-default"
                                        >
                                            <Icon size={14} style={{ color: color ?? 'currentColor' }} />
                                            {name}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
