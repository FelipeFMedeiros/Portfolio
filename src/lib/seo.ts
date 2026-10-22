import { PROJECTS } from '@/data/projects';

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://felipefmedeiros.com').replace(/\/+$/, '');
const personId = `${SITE_URL}/#felipe-medeiros`;
const websiteId = `${SITE_URL}/#website`;
const person = {
    '@type': 'Person', '@id': personId, name: 'Felipe Medeiros',
    url: `${SITE_URL}/`, image: `${SITE_URL}/profile.webp`,
    jobTitle: 'Desenvolvedor Full-Stack',
    description: 'Estudante de Ciência da Computação na UERN e desenvolvedor de soluções web e mobile.',
    sameAs: ['https://github.com/FelipeFMedeiros', 'https://www.linkedin.com/in/felipe-fmedeiros/'],
    knowsAbout: ['React', 'TypeScript', 'Node.js', 'C#', '.NET', 'React Native', 'Desenvolvimento web', 'Desenvolvimento mobile'],
};

export interface PageMetadata {
    title: string;
    description: string;
    canonical?: string;
    image: string;
    imageAlt: string;
    robots: string;
    structuredData?: Record<string, unknown>;
}

export const publicRoutes = ['/', ...PROJECTS.map((project) => `/projects/${project.slug}/`)];

export function getPageMetadata(pathname: string): PageMetadata {
    const normalized = pathname.replace(/\/+$/, '') || '/';
    const base = {
        image: `${SITE_URL}/logo-square.png`,
        imageAlt: 'Felipe Medeiros — Desenvolvedor Full-Stack',
        robots: 'index,follow,max-image-preview:large',
    };
    if (normalized === '/') return {
        ...base,
        title: 'Felipe Medeiros | Desenvolvedor Full-Stack, React e React Native',
        description: 'Conheça os projetos de Felipe Medeiros, desenvolvedor Full-Stack e estudante de Ciência da Computação na UERN. React, TypeScript, Node.js, C# e React Native.',
        canonical: `${SITE_URL}/`,
        structuredData: { '@context': 'https://schema.org', '@graph': [
            person,
            { '@type': 'WebSite', '@id': websiteId, url: `${SITE_URL}/`, name: 'Portfólio de Felipe Medeiros', inLanguage: 'pt-BR', publisher: { '@id': personId } },
            { '@type': 'ProfilePage', '@id': `${SITE_URL}/#profile`, url: `${SITE_URL}/`, name: 'Felipe Medeiros — Desenvolvedor Full-Stack', inLanguage: 'pt-BR', mainEntity: { '@id': personId }, isPartOf: { '@id': websiteId } },
            { '@type': 'ItemList', name: 'Projetos de Felipe Medeiros', numberOfItems: PROJECTS.length,
                itemListElement: PROJECTS.map((project, index) => ({ '@type': 'ListItem', position: index + 1, name: project.title, url: `${SITE_URL}/projects/${project.slug}/` })) },
        ] },
    };
    const project = PROJECTS.find((entry) => normalized === `/projects/${entry.slug}`);
    if (project) {
        const canonical = `${SITE_URL}/projects/${project.slug}/`;
        const image = project.coverImage ? new URL(project.coverImage, `${SITE_URL}/`).href : base.image;
        return {
            ...base, title: `${project.title} | Projeto de Felipe Medeiros`, description: project.tagline,
            canonical, image, imageAlt: `Capa do projeto ${project.title}`,
            structuredData: { '@context': 'https://schema.org', '@graph': [
                person,
                { '@type': 'CreativeWork', '@id': `${canonical}#project`, url: canonical, name: project.title,
                    description: project.description, image, inLanguage: 'pt-BR', author: { '@id': personId },
                    keywords: [...project.tags], ...(project.liveUrl ? { relatedLink: project.liveUrl } : {}) },
                { '@type': 'WebPage', '@id': canonical, url: canonical, name: project.title, inLanguage: 'pt-BR', mainEntity: { '@id': `${canonical}#project` } },
                { '@type': 'BreadcrumbList', itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Portfólio', item: `${SITE_URL}/` },
                    { '@type': 'ListItem', position: 2, name: project.title, item: canonical },
                ] },
            ] },
        };
    }
    return { ...base, robots: 'noindex,follow', title: normalized === '/success' ? 'Pagamento Confirmado! | Felipe Medeiros' : 'Página não encontrada | Felipe Medeiros',
        description: normalized === '/success' ? 'Confirmação de pagamento de projeto ou plano de manutenção.' : 'Esta página não foi encontrada no portfólio de Felipe Medeiros.',
        ...(normalized === '/success' ? { canonical: `${SITE_URL}/success/` } : {}),
    };
}

export function serializeJsonLd(data: Record<string, unknown>) {
    return JSON.stringify(data).replace(/</g, '\\u003c');
}
