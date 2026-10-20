import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';
import { launch } from 'chrome-launcher';

const base = process.env.AUDIT_URL ?? 'http://localhost:4173';
const chrome = await launch({ chromeFlags: ['--headless=new', '--disable-gpu', '--no-first-run'] });
const browser = await puppeteer.connect({ browserURL: `http://localhost:${chrome.port}` });
const errors = [];
try {
    await mkdir('.reports/screenshots', { recursive: true });
    const page = await browser.newPage();
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error' && !message.text().includes('404 (Not Found)')) errors.push(message.text()); });
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    await page.setJavaScriptEnabled(false);
    await page.goto(base, { waitUntil: 'networkidle0' });
    assert(await page.$eval('.hero-name', (element) => element.textContent.includes('Felipe')));
    assert.equal(await page.$eval('.hero-description', (element) => getComputedStyle(element).opacity), '1');
    assert.equal(await page.$$eval('.project-entry', (elements) => elements.length), 5);
    console.log('Conteúdo público acessível sem JavaScript.');
    await page.setJavaScriptEnabled(true);
    await page.reload({ waitUntil: 'networkidle0' });
    await page.click('.header-menu-toggle');
    await page.waitForSelector('#mobile-menu', { visible: true });
    assert(await page.$eval('#mobile-menu a', (element) => document.activeElement === element));
    await page.keyboard.press('Escape');
    await page.waitForSelector('#mobile-menu', { hidden: true });
    assert(await page.$eval('.header-menu-toggle', (element) => document.activeElement === element));
    await page.click('.project-filter:nth-child(2)');
    await page.waitForFunction(() => document.querySelectorAll('.project-entry').length === 1);
    await page.click('.project-filter:nth-child(3)');
    await page.waitForFunction(() => document.querySelectorAll('.project-entry').length === 4);
    await page.click('a.project-detail-link[href="/projects/focoquali/"]');
    await page.waitForSelector('.detail-intro');
    assert.equal(await page.$eval('.detail-intro h1', (element) => element.textContent), 'FocoQuali.');
    await page.click('.detail-gallery button');
    await page.waitForSelector('[role="dialog"]', { visible: true });
    await page.keyboard.press('Escape');
    await page.waitForSelector('[role="dialog"]', { hidden: true });
    assert(await page.$eval('.detail-gallery button', (element) => document.activeElement === element));
    await page.click('.detail-back');
    await page.waitForFunction(() => document.querySelectorAll('.project-entry').length === 4);
    assert((await page.$eval('.project-filter[aria-pressed="true"]', (element) => element.textContent)).includes('Freelancer'));
    console.log('Hidratação, menu, filtros, galeria, foco e navegação validados.');
    await page.evaluate(() => localStorage.setItem('portfolio-theme', 'light'));
    await page.goto(`${base}/projects/focoquali/`, { waitUntil: 'networkidle0' });
    assert.equal(await page.evaluate(() => document.documentElement.classList.contains('dark')), false);
    assert((await page.title()).startsWith('FocoQuali'));
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(base, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.hero-section.is-paused');
    assert.equal(await page.$('.mouse-glow'), null);
    console.log('Tema persistido e movimento reduzido sem erros de hidratação.');
    for (const width of [320, 390, 768, 1280]) {
        await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `Overflow em ${width}px`);
    }
    for (const [query, expected] of [['?type=project', 'Projeto'], ['?type=maintenance', 'Plano de Manutenção'], ['', 'A transação foi um sucesso']]) {
        await page.goto(`${base}/success/${query}`, { waitUntil: 'networkidle0' });
        assert((await page.$eval('main, #root', (element) => element.textContent)).includes(expected));
        assert((await page.$eval('meta[name="robots"]', (element) => element.content)).includes('noindex'));
    }
    const missing = await page.goto(`${base}/projects/inexistente/`, { waitUntil: 'networkidle0' });
    assert.equal(missing.status(), 404);
    assert((await page.$eval('h1', (element) => element.textContent)).includes('não encontrado'));
    await page.evaluate(() => localStorage.setItem('portfolio-theme', 'dark'));
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
    await page.goto(base, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: '.reports/screenshots/home-desktop.png' });
    assert.deepEqual(errors, []);
    console.log('320–1280px, pagamentos, 404 e console validados.');
} finally {
    await browser.disconnect();
    await chrome.kill();
}
