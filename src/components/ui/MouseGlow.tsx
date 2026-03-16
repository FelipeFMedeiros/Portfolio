import { useRef, useEffect } from 'react';

export default function MouseGlow() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
            el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, oklch(0.76 0.15 207 / 0.07), transparent 50%)`;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return <div ref={ref} className="pointer-events-none fixed inset-0 z-30" />;
}
