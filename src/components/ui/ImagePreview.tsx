import ResponsiveImage from '@/components/ui/ResponsiveImage';
import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';

export default function ImagePreview({ image, title, href, linkLabel = 'Ver Certificado', onClose }: {
    image: string; title: string; href?: string; linkLabel?: string; onClose: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const titleId = useId();
    useEffect(() => {
        const previousFocus = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        ref.current?.querySelector('button')?.focus();
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
            if (event.key !== 'Tab') return;
            const controls = ref.current?.querySelectorAll<HTMLElement>('button, a');
            if (!controls?.length) return;
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = previousOverflow;
            previousFocus?.focus();
        };
    }, [onClose]);
    return createPortal(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="image-preview-backdrop" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <motion.div ref={ref} role="dialog" aria-modal="true" aria-labelledby={titleId}
                initial={{ opacity: 0, y: 15, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }} className="image-preview">
                <div className="image-preview-header"><h3 id={titleId}>{title}</h3>
                    <button onClick={onClose} aria-label="Fechar visualização" className="header-icon"><X size={20} /></button></div>
                <ResponsiveImage sizes="(min-width: 1050px) 1000px, 95vw" src={image} alt={title} />
                {href && <a href={href} target="_blank" rel="noopener noreferrer" className="image-preview-link">{linkLabel}<ArrowUpRight size={16} /></a>}
            </motion.div>
        </motion.div>, document.body,
    );
}
