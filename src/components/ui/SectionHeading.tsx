import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function SectionHeading({ number, eyebrow, children }: {
    number: string; eyebrow: string; children: ReactNode;
}) {
    const reducedMotion = usePrefersReducedMotion();
    return (
        <motion.div initial={{ y: reducedMotion ? 0 : 12 }} whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.4 }} transition={{ duration: reducedMotion ? 0 : 0.45 }} className="section-heading">
            <div className="section-eyebrow heading-register"><span>{number} <span aria-hidden="true">//</span></span><span>{eyebrow}</span></div>
            <h2>{children}</h2>
        </motion.div>
    );
}
