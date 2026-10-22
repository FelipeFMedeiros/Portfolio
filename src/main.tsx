import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/styles/index.css';
import App from './App.tsx';
import { ThemeProvider } from '@/contexts/ThemeProvider.tsx';

const application = (
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
const root = document.getElementById('root')!;
if (root.dataset.prerendered === 'true') {
    // O HTML estático pode pintar antes do trabalho de hidratação e das animações.
    requestAnimationFrame(() => window.setTimeout(() => hydrateRoot(root, application), 0));
} else createRoot(root).render(application);
