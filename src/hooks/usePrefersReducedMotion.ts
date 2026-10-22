import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
const subscribe = (onChange: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
};
const getSnapshot = () => typeof window !== 'undefined' && window.matchMedia(query).matches;
const getServerSnapshot = () => false;

/** Mantém a primeira renderização igual ao HTML estático e responde a mudanças do sistema. */
export function usePrefersReducedMotion() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
