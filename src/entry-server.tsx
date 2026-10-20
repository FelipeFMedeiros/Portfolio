import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import ProjectDetail from '@/pages/ProjectDetail';
import PaymentConfirmation from '@/pages/PaymentConfirmation';

export { getPageMetadata, publicRoutes, serializeJsonLd, SITE_URL } from '@/lib/seo';
export { responsiveImages } from '@/generated/images';
export function render(pathname: string) {
    return renderToString(<ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <StaticRouter location={pathname}><App ProjectPage={ProjectDetail} PaymentPage={PaymentConfirmation} /></StaticRouter>
    </ThemeProvider>);
}
