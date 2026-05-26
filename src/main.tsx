import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/styles/index.css';
import App from './App.tsx';
import { ThemeProvider } from '@/contexts/ThemeProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
