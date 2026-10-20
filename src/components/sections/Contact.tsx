import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion as useReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Mail, Linkedin, Check, Copy, ArrowUpRight, ArrowUp } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const [copyError, setCopyError] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const reducedMotion = useReducedMotion();
    const email = 'contato@felipefmedeiros.com';
    useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);
    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setCopyError(false);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopyError(true);
        }
    };
    return (
        <section id="contato" className="contact-section">
            <div aria-hidden="true" className="contact-orbit" />
            <div className="content-shell relative">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="contact-main">
                    <div className="section-eyebrow"><span>06 /</span><span>Contato</span></div>
                    <h2>Vamos conversar<br />sobre seu <motion.span className="contact-gradient"
                        initial={{ backgroundPosition: '100% 50%' }} whileInView={{ backgroundPosition: '0% 50%' }}
                        viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 4, ease: 'easeInOut' }}>próximo projeto.</motion.span></h2>
                    <p>Seja para desenvolvimento web full-stack, revisão de arquitetura ou para construir experiências incríveis — eu estou sempre aberto para bater um papo.</p>
                    <div className="contact-actions">
                        <Magnetic><a href={`mailto:${email}`} aria-label="Enviar e-mail correspondente" className="action-primary"><Mail size={17} />Email<ArrowUpRight size={17} /></a></Magnetic>
                        <Magnetic><a href="https://linkedin.com/in/felipe-fmedeiros" target="_blank" rel="noopener noreferrer" className="action-secondary"><Linkedin size={17} />LinkedIn<ArrowUpRight size={17} /></a></Magnetic>
                    </div>
                    <button onClick={handleCopyEmail} className="contact-copy" aria-label="Copiar email">
                        {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}<span>{email}</span>
                    </button>
                    <span className="contact-copy-status" role="status" aria-live="polite">{copied ? 'Email copiado!' : copyError ? 'Não foi possível copiar. Selecione o email acima.' : ''}</span>
                </motion.div>
                <footer className="site-footer"><a href="#hero" className="footer-name" onClick={(event) => { event.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' }); }}>Felipe Medeiros<span>.</span></a><span>DESENVOLVEDOR FULL-STACK</span>
                    <button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' })} aria-label="Voltar ao topo">Voltar ao topo<ArrowUp size={14} /></button>
                </footer>
            </div>
        </section>
    );
}
