import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';

const label = process.argv[2] ?? 'latest';
if (!/^[a-z0-9-]+$/i.test(label)) throw new Error('Use um nome de relatório com letras, números e hífens.');
const url = process.env.AUDIT_URL ?? 'http://localhost:4173/';
const directory = path.resolve('.reports/lighthouse');
await mkdir(directory, { recursive: true });
const chrome = await launch({
    chromeFlags: ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check'],
});
const summaries = [];
try {
    for (const mode of ['mobile', 'desktop']) {
        const result = await lighthouse(url, {
            port: chrome.port,
            logLevel: 'error',
            output: ['html', 'json'],
            onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        }, mode === 'desktop' ? desktopConfig : undefined);
        if (!result || result.lhr.runtimeError) throw new Error(result?.lhr.runtimeError?.message ?? 'Auditoria sem resultado.');
        if (result.lhr.configSettings.formFactor !== mode) throw new Error(`Perfil incorreto na auditoria ${mode}.`);
        await Promise.all([
            writeFile(path.join(directory, `${label}-${mode}.html`), result.report[0]),
            writeFile(path.join(directory, `${label}-${mode}.json`), result.report[1]),
        ]);
        const { lhr } = result;
        const summary = {
            mode, url: lhr.finalDisplayedUrl, lighthouse: lhr.lighthouseVersion,
            viewport: lhr.configSettings.screenEmulation,
            scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])),
            metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index']
                .map((key) => [key, lhr.audits[key].numericValue])),
            warnings: lhr.runWarnings,
        };
        summaries.push(summary);
        console.log(JSON.stringify(summary, null, 2));
    }
    await writeFile(path.join(directory, `${label}-summary.json`), JSON.stringify(summaries, null, 2));
} finally {
    await chrome.kill();
}
