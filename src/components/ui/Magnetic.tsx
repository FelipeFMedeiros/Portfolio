import type { ReactNode, PointerEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { usePointerEffects } from '@/hooks/usePointerEffects';

export default function Magnetic({ children, className, strength = 0.2 }: {
    children: ReactNode; className?: string; strength?: number;
}) {
    const enabled = usePointerEffects();
    const targetX = useMotionValue(0);
    const targetY = useMotionValue(0);
    const x = useSpring(targetX, { stiffness: 220, damping: 18 });
    const y = useSpring(targetY, { stiffness: 220, damping: 18 });
    const reset = () => { targetX.set(0); targetY.set(0); };
    const move = (event: PointerEvent<HTMLSpanElement>) => {
        if (!enabled) return;
        const rect = event.currentTarget.getBoundingClientRect();
        targetX.set((event.clientX - rect.left - rect.width / 2) * strength);
        targetY.set((event.clientY - rect.top - rect.height / 2) * strength);
    };
    return (
        <motion.span className={className ?? 'inline-flex'} style={{ x: enabled ? x : 0, y: enabled ? y : 0 }}
            onPointerMove={move} onPointerLeave={reset} onBlur={reset}>
            {children}
        </motion.span>
    );
}
