import type { ReactNode, PointerEvent } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'motion/react';
import { usePointerEffects } from '@/hooks/usePointerEffects';
import { cn } from '@/lib/utils';

export default function InteractiveSurface({ children, className, tilt = false }: {
    children: ReactNode; className?: string; tilt?: boolean;
}) {
    const enabled = usePointerEffects();
    const x = useMotionValue(-500);
    const y = useMotionValue(-500);
    const targetX = useMotionValue(0);
    const targetY = useMotionValue(0);
    const rotateX = useSpring(targetX, { stiffness: 180, damping: 22 });
    const rotateY = useSpring(targetY, { stiffness: 180, damping: 22 });
    const background = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, color-mix(in srgb, var(--primary) 12%, transparent), transparent 70%)`;
    const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, var(--primary), transparent 80%)`;
    const move = (event: PointerEvent<HTMLDivElement>) => {
        if (!enabled) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
        if (tilt) {
            targetX.set(((event.clientY - rect.top) / rect.height - 0.5) * -5);
            targetY.set(((event.clientX - rect.left) / rect.width - 0.5) * 5);
        }
    };
    const reset = () => { targetX.set(0); targetY.set(0); };
    return (
        <motion.div className={cn('interactive-surface', className)} onPointerMove={move} onPointerLeave={reset}
            style={{ rotateX: enabled ? rotateX : 0, rotateY: enabled ? rotateY : 0, transformPerspective: 1000 }}>
            {enabled && <><motion.div aria-hidden="true" className="surface-light" style={{ background }} />
                <motion.div aria-hidden="true" className="surface-border" style={{ background: border }} /></>}
            <div className="surface-content">{children}</div>
        </motion.div>
    );
}
