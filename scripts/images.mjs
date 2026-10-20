import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export async function prepareImages() {
    const output = path.resolve('public/generated');
    await mkdir(output, { recursive: true });
    await mkdir('src/generated', { recursive: true });
    const entries = [
        { file: 'public/profile.webp', key: '/profile.webp', widths: [240, 400, 640] },
        { file: 'public/uern-logo.png', key: '/uern-logo.png', widths: [80, 160] },
        ...(await readdir('src/assets/projects-images')).filter((name) => name.endsWith('.webp')).sort()
            .map((name) => ({ file: `src/assets/projects-images/${name}`, widths: [480, 960, 1440] })),
        ...(await readdir('public/certs')).filter((name) => name.endsWith('.webp')).sort()
            .map((name) => ({ file: `public/certs/${name}`, key: `/certs/${name}`, widths: [360, 720, 1440] })),
    ];
    const imports = [];
    const records = [];
    let generated = 0;
    for (const [index, entry] of entries.entries()) {
        const bytes = await readFile(entry.file);
        const metadata = await sharp(bytes).metadata();
        const original = metadata.autoOrient ?? metadata;
        const hash = createHash('sha256').update('webp-v1:75').update(bytes).digest('hex').slice(0, 10);
        const name = path.parse(entry.file).name.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
        const widths = [...new Set(entry.widths.map((width) => Math.min(width, original.width)))];
        const variants = await Promise.all(widths.map(async (width) => {
            const filename = `${name}-${hash}-${width}.webp`;
            const destination = path.join(output, filename);
            if (!(await stat(destination).catch(() => null))) {
                await sharp(bytes).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 75, effort: 4 }).toFile(destination);
                generated++;
            }
            return { width, url: `/generated/${filename}` };
        }));
        const preferred = variants.find((variant) => variant.width >= (entry.key === '/profile.webp' ? 400 : 720)) ?? variants[variants.length - 1];
        const key = entry.key ? JSON.stringify(entry.key) : `[image${index}]`;
        if (!entry.key) imports.push(`import image${index} from '../assets/projects-images/${path.basename(entry.file)}';`);
        records.push(`    ${key}: ${JSON.stringify({ src: preferred.url, srcSet: variants.map((variant) => `${variant.url} ${variant.width}w`).join(', '), width: original.width, height: original.height })},`);
    }
    const source = `// Gerado por scripts/images.mjs. Os arquivos originais permanecem intactos.\n${imports.join('\n')}\n\nexport const responsiveImages: Record<string, { src: string; srcSet: string; width: number; height: number }> = {\n${records.join('\n')}\n};\n`;
    const manifest = 'src/generated/images.ts';
    if (await readFile(manifest, 'utf8').catch(() => '') !== source) await writeFile(manifest, source);
    console.log(`Imagens: ${entries.length} originais, ${generated} variantes geradas; restantes em cache.`);
}

if (process.argv[1]?.replaceAll('\\', '/').endsWith('/images.mjs')) await prepareImages();
