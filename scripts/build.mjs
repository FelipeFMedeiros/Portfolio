import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const started = performance.now();
await build({ mode: process.argv.includes('--analyze') ? 'analyze' : 'production' });
await build({ mode: 'production', build: { ssr: 'src/entry-server.tsx', outDir: '.prerender', emptyOutDir: true, rollupOptions: { output: { inlineDynamicImports: true, manualChunks: undefined } } } });
const { render, getPageMetadata, publicRoutes, serializeJsonLd, responsiveImages, SITE_URL } = await import(pathToFileURL(path.resolve('.prerender/entry-server.js')).href);
let template = await readFile('dist/index.html', 'utf8');
// A folha completa é pequena após compressão; embuti-la elimina uma viagem de rede bloqueante.
// Os arquivos CSS continuam no dist para os preloads dos chunks e caches de navegação.
for (const match of [...template.matchAll(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"?]+\.css)"[^>]*>/g)]) {
    const css = await readFile(path.join('dist', match[1]), 'utf8');
    if (Buffer.byteLength(css) <= 100_000) template = template.replace(match[0], `<style data-critical-css>${css.replaceAll('</style', '<\\/style')}</style>`);
}
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
function head(metadata) {
    const tags = [
        `<title>${escape(metadata.title)}</title>`,
        `<meta name="description" content="${escape(metadata.description)}">`,
        `<meta name="robots" content="${escape(metadata.robots)}">`,
        '<meta property="og:type" content="website">', '<meta property="og:locale" content="pt_BR">',
        '<meta name="twitter:card" content="summary_large_image">',
    ];
    if (metadata.canonical) tags.push(`<link rel="canonical" href="${escape(metadata.canonical)}">`);
    for (const [key, value] of Object.entries({ title: metadata.title, description: metadata.description, url: metadata.canonical ?? '', image: metadata.image, 'image:alt': metadata.imageAlt })) {
        tags.push(`<meta property="og:${key}" content="${escape(value)}">`, `<meta name="twitter:${key}" content="${escape(value)}">`);
    }
    if (metadata.structuredData) tags.push(`<script id="structured-data" type="application/ld+json">${serializeJsonLd(metadata.structuredData)}</script>`);
    return tags.join('\n        ');
}
function page(route, markup = '') {
    let html = template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head(getPageMetadata(route)));
    html = html.replace('<div id="root"></div>', markup ? `<div id="root" data-prerendered="true">${markup}</div>` : '<div id="root"></div>');
    const profile = responsiveImages['/profile.webp'];
    html = html.replace('<!--image-preload-->', route === '/' ? `<link rel="preload" as="image" href="${profile.src}" imagesrcset="${profile.srcSet}" imagesizes="(max-width: 767px) 60vw, (max-width: 1023px) 238px, 322px">` : '');
    return html;
}
for (const route of publicRoutes) {
    const directory = route === '/' ? 'dist' : path.join('dist', route);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), page(route, render(route)));
}
// A confirmação depende dos parâmetros da URL; permanece renderizada no cliente e fora do índice.
await mkdir('dist/success', { recursive: true });
await writeFile('dist/success/index.html', page('/success'));
await writeFile('dist/404.html', page('/404').replace('<div id="root"></div>', '<div id="root"></div><noscript><main><h1>Página não encontrada.</h1><a href="/">Voltar ao portfólio</a></main></noscript>'));
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicRoutes.map((route) => `\n  <url><loc>${escape(`${SITE_URL}${route}`)}</loc></url>`).join('')}\n</urlset>\n`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`Build estático: ${publicRoutes.length} páginas públicas, sitemap, confirmação com noindex e 404 em ${((performance.now() - started) / 1000).toFixed(2)}s.`);
