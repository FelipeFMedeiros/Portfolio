import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMetadata, serializeJsonLd } from '@/lib/seo';

export default function SeoManager() {
    const { pathname } = useLocation();
    useEffect(() => {
        const metadata = getPageMetadata(pathname);
        document.title = metadata.title;
        const meta = (attribute: 'name' | 'property', key: string, value: string) => {
            let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
            if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.append(element); }
            element.content = value;
        };
        meta('name', 'description', metadata.description);
        meta('name', 'robots', metadata.robots);
        for (const [key, value] of Object.entries({ title: metadata.title, description: metadata.description, url: metadata.canonical ?? '', image: metadata.image, 'image:alt': metadata.imageAlt })) {
            meta('property', `og:${key}`, value);
            meta('name', `twitter:${key}`, value);
        }
        let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (metadata.canonical) {
            if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
            canonical.href = metadata.canonical;
        } else canonical?.remove();
        let schema = document.getElementById('structured-data') as HTMLScriptElement | null;
        if (metadata.structuredData) {
            if (!schema) { schema = document.createElement('script'); schema.id = 'structured-data'; schema.type = 'application/ld+json'; document.head.append(schema); }
            schema.textContent = serializeJsonLd(metadata.structuredData);
        } else schema?.remove();
    }, [pathname]);
    return null;
}
