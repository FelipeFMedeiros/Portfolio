import { useEffect, useState, ReactNode } from 'react';
import { ThemeContext, Theme } from './ThemeContext';

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
}: {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const getSystemTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(storageKey) as Theme | null;
      if (saved) return saved;
    }
    return defaultTheme;
  });
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);
  const [mounted, setMounted] = useState(false);

  const effectiveTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    const root = window.document.documentElement;
    if (effectiveTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [effectiveTheme, mounted]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, theme);
    }
  }, [theme, storageKey]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setSystemTheme(getSystemTheme());
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
