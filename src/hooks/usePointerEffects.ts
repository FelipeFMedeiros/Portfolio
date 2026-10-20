import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export function usePointerEffects() {
    const reducedMotion = useReducedMotion();
    const [finePointer, setFinePointer] = useState(false);
    useEffect(() => {
        const query = window.matchMedia('(hover: hover) and (pointer: fine)');
        const update = () => setFinePointer(query.matches);
        update();
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    }, []);
    return finePointer && !reducedMotion;
}
