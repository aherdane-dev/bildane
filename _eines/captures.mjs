// Captures amb Playwright: node _eines/captures.mjs sortida/ fitxer1.html fitxer2.html ...
// Fa servir l'Edge del sistema (canal msedge).
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
const [sortida, ...fitxers] = process.argv.slice(2);
fs.mkdirSync(sortida, { recursive: true });
const nav = await chromium.launch({ channel: 'msedge' });
const mides = { escriptori: { width: 1440, height: 900, deviceScaleFactor: 1 }, mobil: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } };
for (const f of fitxers) {
  for (const [nom, m] of Object.entries(mides)) {
    const { width, height, ...resta } = m;
    const ctx = await nav.newContext({ viewport: { width, height }, ...resta });
    const p = await ctx.newPage();
    const errors = [];
    p.on('console', msg => msg.type() === 'error' && errors.push(msg.text()));
    p.on('requestfailed', r => errors.push('falla: ' + r.url()));
    await p.goto(f.startsWith('http') ? f : pathToFileURL(path.resolve(f)).href, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(2200);
    const out = path.join(sortida, `${path.parse(new URL(f, 'file:///').pathname).name || 'index'}-${nom}.png`);
    if (process.env.FULL === '1') {
      // Pàgina sencera fent scroll pantalla a pantalla, com un visitant:
      // així es carreguen les imatges diferides i 100svh no s'estira.
      const total = await p.evaluate(() => document.documentElement.scrollHeight);
      const trossos = [];
      for (let y = 0; y < total; y += height) {
        await p.evaluate(top => window.scrollTo(0, top), y);
        await p.waitForTimeout(450);
        const real = await p.evaluate(() => window.scrollY);
        trossos.push({ buf: await p.screenshot(), y: real });
      }
      const dsf = resta.deviceScaleFactor || 1;
      await sharp({ create: { width: width * dsf, height: total * dsf, channels: 3, background: '#ffffff' } })
        .composite(trossos.map(t => ({ input: t.buf, left: 0, top: Math.round(t.y * dsf) })))
        .png().toFile(out);
    } else {
      await p.screenshot({ path: out });
    }
    console.log('ok', out, errors.length ? errors : '');
    await ctx.close();
  }
}
await nav.close();
