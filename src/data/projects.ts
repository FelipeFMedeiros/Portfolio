// ── Images ──────────────────────────────────────────────────────────────────────

import dnaCover from '../assets/projects-images/dna-1.png';
import focoqualiCover from '../assets/projects-images/focoquali-1.png';
import simmonsCover from '../assets/projects-images/simmons-1.png';
import simmons2 from '../assets/projects-images/simmons-2.png';
import santoriniCover from '../assets/projects-images/santorini-1.png';
import santorini2 from '../assets/projects-images/santorini-2.png';
//import poupouCover from '../assets/projects-images/poupou-1.png';


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

// ── Projects data ──────────────────────────────────────────────────────────────

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
            'Otimizei a performance de dados mobile, reduzindo em 50% o tamanho dos payloads JSON e melhorando o tempo de carregamento em 30% através da refatoração de endpoints e estratégias de cache no backend.',
            'Liderei a transição tecnológica da interface principal, refatorando a landing page para React, TypeScript e TailwindCSS, elevando o engajamento através de SEO avançado e práticas de UI/UX moderno.',
            'Implementei um sistema crítico de emissão de documentos (PDF/CMYK) para 20 mil alunos, integrando Razor Pages e JavaScript para atender aos requisitos técnicos de produção gráfica em larga escala.',
            'Projetei interfaces de alta fidelidade no Figma, garantindo a consistência visual entre web e mobile e acelerando o processo de desenvolvimento frontend.'
        ],
        category: 'profissional',
        tags: ['React', 'TypeScript', 'React Native', 'Expo', 'C#', '.NET', 'SQL Server', 'Figma'],
        liveUrl: 'https://dnadobrasil.org.br',
        coverImage: dnaCover,
        screenshots: [{ src: dnaCover, caption: 'Tela Principal do Site' }],
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
            'Arquitetei e desenvolvi API RESTful robusta com Node.js, Express e TypeScript, utilizando PostgreSQL com Prisma ORM, autenticação JWT/Bcrypt e documentação completa via Swagger.',
            'Criei painel administrativo completo para gerenciamento de ebooks, categorias, leads e mensagens de contato, com sistema de upload de PDFs em VPS Ubuntu 24.04.',
            'Implementei sistema automatizado de notificações via email para usuários que baixam ebooks e logs para administradores.',
            'A entrega contínua resultou na captação de centenas de novos clientes e maior visibilidade empresarial.',
            'Atuo no acompanhamento técnico contínuo (PJ) para a evolução full-stack da plataforma, garantindo escalabilidade e alinhamento com as metas de negócio do cliente.'
        ],
        category: 'freelancer',
        tags: ['React', 'TypeScript', 'TailwindCSS', 'Node.js', 'Express.js', 'Prisma', 'PostgreSQL', 'Zod', 'Swagger'],
        liveUrl: 'https://focoquali.com',
        coverImage: focoqualiCover,
        screenshots: [{ src: focoqualiCover, caption: 'Tela Principal da Landing Page' }],
        year: '2025',
        featured: true,
    },
    {
        slug: 'simmons-colchoes-itaipava',
        title: 'Simmons Colchões Itaipava',
        tagline: 'Landing page de alta performance para aumento de conversão de leads',
        description:
            'Landing page responsiva desenvolvida utilizando React e TypeScript, aplicando o React Compiler para otimização automática de renderização e Shadcn/UI com TailwindCSS para uma interface moderna e consistente. Foco em estratégias de SEO técnico para maximização de captura de leads.',
        highlights: [
            'Desenvolvi landing page responsiva utilizando React e TypeScript, aplicando o React Compiler para otimização automática de renderização e Shadcn/UI com TailwindCSS para uma interface moderna e consistente.',
            'Reduzi em 60% o tempo de carregamento (LCP/FCP) através da otimização de build e assets, atingindo o score máximo (100/100) em Performance, Acessibilidade e SEO no Google Lighthouse.',
            'Implementei estratégias de SEO Técnico focadas em conversão, estruturando a página para máxima captura de leads e visibilidade nos motores de busca.',
            'Entreguei uma solução de ponta a ponta que fortaleceu a credibilidade da marca e a presença digital da loja através de uma experiência de usuário (UX) fluida e intuitiva.'
        ],
        category: 'freelancer',
        tags: ['React', 'TypeScript', 'React Compiler', 'Shadcn/UI', 'TailwindCSS'],
        liveUrl: 'https://simmonsitaipava.com.br',
        coverImage: simmonsCover,
        screenshots: [
            { src: simmonsCover, caption: 'Tela Principal da Landing Page' },
            { src: simmons2, caption: 'Seção de Produtos em Destaque' }
        ],
        year: '2026',
        featured: true,
    },
    {
        slug: 'santorini-home-design',
        title: 'Santorini Home Design',
        tagline: 'Landing page de alta performance para móveis de luxo',
        description:
            'Landing page de alta performance para o nicho de móveis de luxo, utilizando React, TypeScript e TailwindCSS, com foco em uma interface visualmente refinada e responsiva. Otimizada para alinhamento com campanhas de tráfego pago e maximização de conversão.',
        highlights: [
            'Desenvolvi landing page de alta performance para o nicho de móveis de luxo, utilizando React, TypeScript e TailwindCSS, com foco em uma interface visualmente refinada e responsiva.',
            'Colaborei com o Gestor de Tráfego para alinhar a performance técnica (LCP/FCP) às campanhas de anúncios, reduzindo a taxa de rejeição e maximizando a taxa de conversão dos leads.',
            'Otimizei a jornada de compra através de uma navegação intuitiva de catálogo, facilitando o acesso a especificações de produtos e acelerando a tomada de decisão do cliente.',
            'Implementei renderização eficiente com React Compiler, garantindo uma experiência fluida mesmo em dispositivos mobile com conexões limitadas.'
        ],
        category: 'freelancer',
        tags: ['React', 'TypeScript', 'React Compiler', 'TailwindCSS'],
        liveUrl: 'https://santorinihomedesign.com.br',
        coverImage: santoriniCover,
        screenshots: [
            { src: santoriniCover, caption: 'Tela Principal da Landing Page' },
            { src: santorini2, caption: 'Catálogo de Produtos' }
        ],
        year: '2025',
        featured: true,
    },
    {
        slug: 'poupou-legal',
        title: 'Poupou Legal',
        tagline: 'Plataforma de afiliados para ofertas e cupons com alto volume de acesso',
        description:
            'Plataforma de afiliados end-to-end para ofertas e cupons, arquitetada com ecossistema escalável para suportar alto volume de acessos em escala nacional. Inclui motor de busca otimizado, painéis administrativos e infraestrutura moderna com Docker e CI/CD.',
        highlights: [
            'Liderei o desenvolvimento end-to-end de uma plataforma de afiliados, arquitetando um ecossistema escalável com React, TypeScript e Node.js para suportar alto volume de acessos em escala nacional.',
            'Implementei infraestrutura moderna com Docker e CI/CD via GitHub Actions, automatizando o ciclo de entrega e garantindo 99.9% de disponibilidade da plataforma em ambiente VPS.',
            'Desenvolvi um motor de busca e filtragem otimizado para ofertas e cupons, integrando painéis administrativos para gestão dinâmica de lojistas parceiros e métricas de conversão.',
            'Atuei em sinergia com a gestão de tráfego pago, otimizando o funil de conversão técnico e o SEO, o que resultou em um crescimento exponencial e diário da base de usuários ativos.',
            'Projetei uma arquitetura de banco de dados (PostgreSQL) focada em performance, garantindo tempos de resposta baixos mesmo durante picos de tráfego originados por campanhas de anúncios.'
        ],
        category: 'freelancer',
        tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'GitHub Actions'],
        liveUrl: 'https://poupoulegal.com.br',
        coverImage: '/projects/poupou-1.png',
        screenshots: [
            { src: '/projects/poupou-1.png', caption: 'Página Inicial da Plataforma' },
            { src: '/projects/poupou-2.png', caption: 'Painel Administrativo' }
        ],
        year: '2025',
        featured: true,
    }
] as const;