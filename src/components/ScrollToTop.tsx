import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/** Restaura o scroll nativo ao voltar e resolve âncoras depois da montagem do React. */
export default function ScrollToTop() {
    const { pathname, hash } = useLocation();
    const navType = useNavigationType();
    const mounted = useRef(false);

    useEffect(() => {
        const initialNavigation = !mounted.current;
        const frame = requestAnimationFrame(() => {
            if (hash && (initialNavigation || navType !== 'POP')) {
                document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
            } else if (navType !== 'POP') {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }
            mounted.current = true;
        });
        return () => cancelAnimationFrame(frame);
    }, [pathname, hash, navType]);

    return null;
}
