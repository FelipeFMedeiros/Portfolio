import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';

const { publicRoutes, getPageMetadata, SITE_URL } = await import(pathToFileURL(path.resolve('.prerender/entry-server.js')).href);
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const titles = new Set();
for (const route of publicRoutes) {
    const html = await readFile(path.join('dist', route, 'index.html'), 'utf8');
    const metadata = getPageMetadata(route);
    assert.match(html, /data-prerendered="true"/);
    assert.match(html, /<h1\b/);
    assert(html.includes(metadata.title), `Título ausente: ${route}`);
    assert(html.includes(`rel="canonical" href="${metadata.canonical}"`), `Canonical incorreto: ${route}`);
    assert(!titles.has(metadata.title), 'Títulos duplicados');
    titles.add(metadata.title);
    const schema = JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema['@context'], 'https://schema.org');
    assert(schema['@graph'].some((entity) => entity['@type'] === 'Person' && entity.name === 'Felipe Medeiros'));
    assert(sitemap.includes(`<loc>${SITE_URL}${route}</loc>`));
    assert(!html.includes('fonts.googleapis.com'));
    for (const match of html.matchAll(/(?:src|href)="(\/(?:assets|generated)\/[^"?#]+)"/g)) await access(path.join('dist', decodeURIComponent(match[1])));
    console.log(`HTML, canonical, schema e assets: ${route}`);
}
const home = await readFile('dist/index.html', 'utf8');
assert.match(home, /<style data-critical-css>/, 'CSS crítico não foi embutido.');
const initialScripts = new Set([...home.matchAll(/(?:src|href)="(\/assets\/[^"?]+\.js)"/g)].map((match) => match[1]));
let initialJavaScript = 0;
for (const asset of initialScripts) initialJavaScript += gzipSync(await readFile(path.join('dist', asset))).byteLength;
assert(initialJavaScript <= 200 * 1024, `JavaScript inicial excedeu 200 KiB gzip: ${initialJavaScript} bytes`);
assert(gzipSync(home).byteLength <= 75 * 1024, 'HTML inicial excedeu 75 KiB gzip.');
console.log(`JavaScript inicial: ${(initialJavaScript / 1024).toFixed(1)} KiB gzip; limite: 200 KiB.`);
for (const text of ['20', 'Vidas impactadas', 'UERN', 'Ciência da Computação', 'DNA do Brasil', 'FocoQuali']) assert(home.includes(text), `Conteúdo ausente: ${text}`);
for (const filename of ['dist/success/index.html', 'dist/404.html']) {
    const html = await readFile(filename, 'utf8');
    assert.match(html, /name="robots" content="noindex,follow"/);
    assert(!html.includes('data-prerendered="true"'));
}
assert(!sitemap.includes('/success'));
assert(!sitemap.includes('/404'));
console.log(`${publicRoutes.length} páginas verificadas; confirmação e 404 fora do índice.`);
