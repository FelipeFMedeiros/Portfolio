import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Gerencia o comportamento do scroll entre páginas e navegação por hash.
 */
export default function ScrollToTop() {
    const { pathname, hash } = useLocation();
    const navType = useNavigationType();

    useEffect(() => {
        // Se a navegação for "voltar/avançar" (POP), o navegador manterá a posição de scroll nativamente
        if (navType === 'POP') {
            return;
        }

        // Se houver um hash na URL (ex: /#projetos), leva pra lá de maneira instantânea (não smooth)
        if (hash) {
            const id = hash.slice(1);
            const timer = setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'auto' });
                }
            }, 100);
            return () => clearTimeout(timer);
        }

        // Sem hash e não sendo retorno (POP), vai instantaneamente para o topo
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname, hash, navType]);

    return null;
}
