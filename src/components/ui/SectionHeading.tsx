import type { ReactNode } from 'react';
import { motion } from 'motion/react';

export default function SectionHeading({ number, eyebrow, children }: {
    number: string; eyebrow: string; children: ReactNode;
}) {
    return (
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }} className="section-heading">
            <div className="section-eyebrow"><span>{number} /</span><span>{eyebrow}</span></div>
            <h2>{children}</h2>
        </motion.div>
    );
}
