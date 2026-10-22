import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme } from './ThemeContext';

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'vite-ui-theme' }: {
    children: ReactNode; defaultTheme?: Theme; storageKey?: string;
}) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);
    const [systemTheme, setSystemTheme] = useState<Theme>('light');
    const [hydrated, setHydrated] = useState(false);
    const effectiveTheme = theme === 'system' ? systemTheme : theme;
    useEffect(() => {
        try {
            const saved = window.localStorage.getItem(storageKey);
            if (saved === 'light' || saved === 'dark' || saved === 'system') setTheme(saved);
        } catch { /* O tema funciona mesmo sem armazenamento. */ }
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const update = () => setSystemTheme(media.matches ? 'dark' : 'light');
        update();
        setHydrated(true);
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, [storageKey]);
    useEffect(() => {
        if (!hydrated) return;
        document.documentElement.classList.toggle('dark', effectiveTheme === 'dark');
        try { window.localStorage.setItem(storageKey, theme); } catch { /* Preferência apenas nesta sessão. */ }
    }, [effectiveTheme, hydrated, storageKey, theme]);
    return <ThemeContext.Provider value={{ theme, setTheme, systemTheme }}>{children}</ThemeContext.Provider>;
}
