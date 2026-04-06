// ── Types ─────────────────────────────────────────────────────────────────────

export type ProjectCategory = 'profissional' | 'freelancer' | 'pessoal' | 'academico';

export interface ProjectScreenshot {
    src: string;
    caption?: string;
}

export interface Project {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    highlights: readonly string[];
    category: ProjectCategory;
    tags: readonly string[];
    repoUrl?: string;
    liveUrl?: string;
    coverImage?: string;
    screenshots: readonly ProjectScreenshot[];
    year: string;
    featured: boolean;
}

// ── Display helpers ────────────────────────────────────────────────────────────

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
    profissional: 'Profissional',
    freelancer: 'Freelancer',
    pessoal: 'Pessoal',
    academico: 'Acadêmico',
};

export const CATEGORY_STYLES: Record<ProjectCategory, { badge: string; gradient: string }> = {
    profissional: {
        badge: 'bg-primary/10 text-primary border-primary/20',
        gradient: 'from-cyan-500/20 to-sky-600/10',
    },
    freelancer: {
        badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
        gradient: 'from-violet-500/20 to-purple-600/10',
    },
    pessoal: {
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        gradient: 'from-amber-500/20 to-orange-600/10',
    },
    academico: {
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        gradient: 'from-emerald-500/20 to-green-600/10',
    },
};

// ── Projects data ─────────────────────────────────────────────────────────────

export const PROJECTS: readonly Project[] = [
    {
        slug: 'dna-do-brasil',
        title: 'DNA do Brasil',
        tagline: 'Plataforma de detecção de talentos esportivos para 20 mil+ alunos',
        description:
            'Sistema web e mobile completo para detecção e desenvolvimento de talentos esportivos e vocacionais, desenvolvido para o Instituto Idecace. A plataforma inclui portal EAD, geração automatizada de laudos técnicos, carteirinhas estudantis e um aplicativo multiplataforma publicado na App Store e Play Store.',
        highlights: [
            'Desenvolvi o aplicativo mobile multiplataforma (iOS e Android) com Expo e React Native do zero, conduzindo todo o ciclo — do desenvolvimento à publicação nas lojas.',
            'Implementei funcionalidade de leitura de QR Code para registro automático de frequência e captura de fotos de perfil, otimizando o fluxo de trabalho dos professores.',
            'Criei sistema de geração de carteirinhas estudantis em PDF com configuração de cores CMYK profissional, impactando positivamente mais de 20 mil alunos cadastrados.',
            'Desenvolvi geração automática de laudos técnicos individuais com sistema de download em massa em PDF.',
            'Construí o front-end completo do sistema EAD, garantindo que milhares de alunos acessem aulas, cursos e conteúdos com experiência fluida.',
            'Refatorei a landing page principal com React, TypeScript e TailwindCSS, melhorando SEO e engajamento dos visitantes.',
        ],
        category: 'profissional',
        tags: ['React', 'TypeScript', 'React Native', 'Expo', 'C#', '.NET', 'SQL Server', 'Figma'],
        liveUrl: 'https://dnadobrasil.org.br',
        coverImage: '/projects/dna-1.png',
        screenshots: [{ src: '/projects/dna-1.png', caption: 'Tela Principal do Site' }],
        year: '2024 - 2026',
        featured: true,
    },
    {
        slug: 'focoquali',
        title: 'FocoQuali',
        tagline: 'Solução Full-Stack com Landing Page e Painel Administrativo para captação de leads',
        description:
            'Plataforma web completa desenvolvida como freelancer para alavancar a captação de clientes. A solução engloba uma landing page moderna com integrações para agendamentos e avaliações, conectada a uma API RESTful robusta e um painel administrativo para gestão de e-books, leads e contatos.',
        highlights: [
            'Desenvolvi landing page responsiva e interativa com React, TypeScript e TailwindCSS, integrando widgets do Instagram, avaliações do Google (Elfsight) e Calendly para agendamentos automatizados.',
            'Implementei validação de formulários com Zod no frontend e estratégias avançadas de SEO, colaborando na maximização de conversões.',
            'Arquitetei e desenvolvi API RESTful robusta com Node.js, Express e TypeScript, utilizando MySQL com Prisma ORM, autenticação JWT/Bcrypt e documentação completa via Swagger.',
            'Criei painel administrativo completo para gerenciamento de ebooks, categorias, leads e mensagens de contato, com sistema de upload de PDFs em VPS Ubuntu 24.04.',
            'Implementei sistema automatizado de notificações via email para usuários que baixam ebooks e logs para administradores.',
            'A entrega contínua resultou na captação de centenas de novos clientes e maior visibilidade empresarial.',
        ],
        category: 'freelancer',
        tags: ['React', 'TypeScript', 'TailwindCSS', 'Node.js', 'Express.js', 'Prisma', 'MySQL', 'Zod', 'Swagger'],
        liveUrl: 'https://focoquali.com',
        coverImage: '/projects/focoquali-1.png',
        screenshots: [{ src: '/projects/focoquali-1.png', caption: 'Tela Principal da Landing Page' }],
        year: '2025',
        featured: true,
    },
] as const;
