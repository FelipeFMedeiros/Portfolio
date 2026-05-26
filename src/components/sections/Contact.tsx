import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Mail, Linkedin, Check, Copy } from 'lucide-react';

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
    const [copied, setCopied] = useState(false);

    const email = 'contato@felipefmedeiros.com';

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Falha ao copiar email', err);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="contato"
            className="relative py-32 overflow-hidden flex items-center justify-center min-h-[50vh]"
        >
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex flex-col items-center"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
                        Vamos conversar sobre seu <span className="text-gradient-cyan">próximo projeto.</span>
                    </h2>

                    <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
                        Seja para desenvolvimento web full-stack, revisão de arquitetura ou para construir experiências
                        incríveis — eu estou sempre aberto para bater um papo.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a
                            href={`mailto:${email}`}
                            aria-label="Enviar e-mail correspondente"
                            className="group relative flex items-center justify-center h-12 w-full sm:w-36 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 overflow-hidden cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                <Mail size={18} />
                                <span>Email</span>
                            </span>
                        </a>

                        <a
                            href="https://linkedin.com/in/felipe-fmedeiros"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-12 gap-2 px-6 rounded-full bg-card border border-border text-foreground font-medium hover:border-primary/40 hover:bg-secondary/50 transition-colors duration-300 w-full sm:w-auto"
                        >
                            <Linkedin size={18} />
                            <span>LinkedIn</span>
                        </a>
                    </div>

                    <button
                        onClick={handleCopyEmail}
                        className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-300 cursor-pointer"
                        aria-label="Copiar email"
                    >
                        {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
                        <span className={copied ? 'text-primary' : ''}>{copied ? 'Email copiado!' : email}</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
