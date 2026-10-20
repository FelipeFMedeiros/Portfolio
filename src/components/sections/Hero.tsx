import { useState, useEffect } from 'react';
import type { PointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { Github, Download, ArrowUpRight, Linkedin, ArrowDown, Pause, Play } from 'lucide-react';
import { SiReact, SiTypescript, SiNodedotjs } from 'react-icons/si';
import Magnetic from '@/components/ui/Magnetic';
import { usePointerEffects } from '@/hooks/usePointerEffects';

const TECH_BADGES = ['React', 'Node.js', 'TypeScript', 'C#', 'React Native'];
const SPECIALTIES = ['Full-Stack', 'React & TypeScript', 'Node.js & C#', 'React Native'];

function Typewriter({ paused }: { paused: boolean }) {
    const [typing, setTyping] = useState({ word: 0, length: SPECIALTIES[0].length, deleting: false });
    useEffect(() => {
        if (paused) return;
        const text = SPECIALTIES[typing.word];
        const complete = typing.length === text.length;
        const timer = window.setTimeout(() => {
            setTyping((current) => {
                if (!current.deleting && complete) return { ...current, deleting: true };
                if (current.deleting && current.length === 0) return { word: (current.word + 1) % SPECIALTIES.length, length: 0, deleting: false };
                return { ...current, length: current.length + (current.deleting ? -1 : 1) };
            });
        }, complete && !typing.deleting ? 2400 : typing.deleting ? 35 : 85);
        return () => clearTimeout(timer);
    }, [typing, paused]);
    return <><span className="sr-only">Full-Stack, React, TypeScript, Node.js, C# e React Native</span>
        <span aria-hidden="true">{SPECIALTIES[typing.word].slice(0, typing.length)}<span className="typing-caret">_</span></span></>;
}

export default function Hero() {
    const [imgError, setImgError] = useState(false);
    const [paused, setPaused] = useState(false);
    const reducedMotion = useReducedMotion();
    const pointerEffects = usePointerEffects();
    const still = paused || !!reducedMotion;
    const targetX = useMotionValue(0);
    const targetY = useMotionValue(0);
    const rotateX = useSpring(targetX, { stiffness: 150, damping: 20 });
    const rotateY = useSpring(targetY, { stiffness: 150, damping: 20 });
    const gridX = useSpring(0, { stiffness: 40, damping: 25 });
    const gridY = useSpring(0, { stiffness: 40, damping: 25 });
    const reset = () => { targetX.set(0); targetY.set(0); gridX.set(0); gridY.set(0); };
    const move = (event: PointerEvent<HTMLElement>) => {
        if (!pointerEffects || still) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        targetX.set(y * -10); targetY.set(x * 12);
        gridX.set(x * 14); gridY.set(y * 14);
    };
    const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' });

    return (
        <section id="hero" className={`hero-section ${still ? 'is-paused' : ''}`} onPointerMove={move} onPointerLeave={reset}>
            <motion.div aria-hidden="true" className="hero-grid" style={{ x: still ? 0 : gridX, y: still ? 0 : gridY }} />
            <div aria-hidden="true" className="hero-ambient" />
            <div className="content-shell hero-content">
                <div className="hero-topline"><span>DESENVOLVEDOR FULL-STACK</span><span className="hidden sm:inline">WEB / MOBILE / SOFTWARE</span></div>
                <div className="hero-main">
                    <div className="hero-copy">
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hero-greeting">Olá, eu sou <span>👋</span></motion.p>
                        <h1 aria-label="Felipe Medeiros" className="hero-name">
                            {['Felipe', 'Medeiros'].map((word, wordIndex) => <span key={word} aria-hidden="true" className="hero-word">
                                {Array.from(word).map((character, index) => <motion.span key={index} className="inline-block"
                                    initial={reducedMotion ? false : { y: '105%', opacity: 0, rotate: 6 }} animate={{ y: 0, opacity: 1, rotate: 0 }}
                                    transition={{ duration: 0.75, delay: 0.12 + wordIndex * 0.16 + index * 0.045, ease: [0.22, 1, 0.36, 1] }}>{character}</motion.span>)}
                                {wordIndex === 1 && <span className="hero-period">.</span>}
                            </span>)}
                        </h1>
                        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
                            <p className="hero-specialty">Desenvolvedor <strong><Typewriter paused={still} /></strong></p>
                            <p className="hero-description">Estudante de Ciência da Computação na <span>UERN</span>, apaixonado por construir soluções web e mobile modernas. Tenho experiência com sistemas de larga escala, integrações mobile e interfaces que encantam.</p>
                            <div className="hero-tech">{TECH_BADGES.map((tech) => <span key={tech}>{tech}</span>)}</div>
                            <div className="flex flex-wrap gap-3">
                                <Magnetic><button className="action-primary" onClick={() => scrollTo('projetos')}>Ver Projetos <ArrowUpRight size={18} /></button></Magnetic>
                                <Magnetic><a className="action-secondary" href="/CV_FullStack_FelipeMedeiros.pdf" download="CV_FullStack_FelipeMedeiros.pdf"><Download size={16} />Download CV</a></Magnetic>
                            </div>
                            <div className="hero-socials">
                                <a href="https://github.com/FelipeFMedeiros" target="_blank" rel="noopener noreferrer"><Github size={16} />GitHub<ArrowUpRight size={12} /></a>
                                <a href="https://www.linkedin.com/in/felipe-fmedeiros/" target="_blank" rel="noopener noreferrer"><Linkedin size={16} />LinkedIn<ArrowUpRight size={12} /></a>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div className="hero-portrait-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.35 }}>
                        <motion.div className="hero-portrait-tilt" style={{ rotateX: pointerEffects && !still ? rotateX : 0, rotateY: pointerEffects && !still ? rotateY : 0, transformStyle: 'preserve-3d' }}>
                            <span aria-hidden="true" className="portrait-cross cross-top">+</span><span aria-hidden="true" className="portrait-cross cross-bottom">+</span>
                            <svg aria-hidden="true" viewBox="0 0 460 460" className="portrait-orbit orbit-one"><circle cx="230" cy="230" r="216" /><circle cx="230" cy="14" r="4" className="orbit-dot" /></svg>
                            <svg aria-hidden="true" viewBox="0 0 460 460" className="portrait-orbit orbit-two"><ellipse cx="230" cy="230" rx="226" ry="163" /><circle cx="456" cy="230" r="3" className="orbit-dot" /></svg>
                            <div className="portrait-photo-wrap">
                                {imgError ? <div className="portrait-fallback">FM</div> : <img src="/profile.webp" alt="Felipe Medeiros" width="400" height="400" fetchPriority="high" onError={() => setImgError(true)} />}
                            </div>
                            <div className="orbit-badge badge-react"><SiReact size={21} /><span>React</span></div>
                            <div className="orbit-badge badge-node"><SiNodedotjs size={20} /><span>Node.js</span></div>
                            <div className="orbit-badge badge-ts"><SiTypescript size={18} /><span>TypeScript</span></div>
                            <div className="portrait-caption"><span className="status-dot" /><div><span>Experiência</span><strong>+2 anos</strong></div><span aria-hidden="true" className="portrait-code">&lt;/&gt;</span></div>
                        </motion.div>
                    </motion.div>
                </div>
                <div className="hero-bottomline">
                    <button onClick={() => scrollTo('sobre')} className="hero-scroll"><span className="scroll-arrow"><ArrowDown size={15} /></span>Role para baixo</button>
                    <span className="hidden sm:block font-mono text-[10px] tracking-widest text-muted-foreground">CÓDIGO COM PROPÓSITO.</span>
                    {!reducedMotion && <button onClick={() => { setPaused(!paused); reset(); }} className="animation-toggle" aria-label={paused ? 'Retomar animações' : 'Pausar animações'} title={paused ? 'Retomar animações' : 'Pausar animações'}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>}
                </div>
            </div>
        </section>
    );
}
