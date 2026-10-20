import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { usePointerEffects } from '@/hooks/usePointerEffects';

export default function MouseGlow() {
    const enabled = usePointerEffects();
    const targetX = useMotionValue(-1000);
    const targetY = useMotionValue(-1000);
    const x = useSpring(targetX, { stiffness: 70, damping: 25 });
    const y = useSpring(targetY, { stiffness: 70, damping: 25 });

    useEffect(() => {
        if (!enabled) return;
        const handleMouseMove = (event: PointerEvent) => {
            targetX.set(event.clientX - 350);
            targetY.set(event.clientY - 350);
        };

        window.addEventListener('pointermove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('pointermove', handleMouseMove);
    }, [enabled, targetX, targetY]);

    if (!enabled) return null;
    return <motion.div aria-hidden="true" className="mouse-glow" style={{ x, y }} />;
}
