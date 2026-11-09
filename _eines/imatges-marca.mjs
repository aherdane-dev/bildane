// Favicons (fita de rostoll sobre blau) i og.png (1200×630).
// node _eines/imatges-marca.mjs   (cal el servidor local a http://localhost:8130)
import fs from 'node:fs';
import sharp from 'sharp';
import { chromium } from 'playwright';
import { mosaic, pinta, html, fita } from './mosaic.mjs';

// ---------- favicons ----------
const fitaSvg = fita({ mida: null, color: '#E0A13A', junta: 'none', gruix: 0 })
  .replace('<svg ', '<svg x="0" y="0" width="100" height="100" ');
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="#1F3590"/><g transform="translate(14 14) scale(.72)">${fitaSvg.replace(' aria-hidden="true" focusable="false"', '')}</g></svg>`;
fs.writeFileSync('favicon.svg', favicon);
for (const [nom, mida] of [['favicon-32.png', 32], ['favicon-96.png', 96], ['apple-touch-icon.png', 180], ['icon-512.png', 512]]) {
  await sharp(Buffer.from(favicon), { density: 72 * mida / 100 * 4 }).resize(mida, mida).png().toFile(nom);
}

// ---------- og.png ----------
const w = 700, h = 700, poble = [400, 380];
const peces = mosaic({
  w, h, llavor: 21, junta: 4, trencat: .06, parcela: [4200, 52000],
  poble: { punt: poble, radi: 300 },
  canal: { punt: [400, 170], angle: -27, ample: 22 },
  sequies: [{ punt: [260, 520], angle: 70, ample: 12 }, { punt: [560, 520], angle: 79, ample: 12 }],
  reserves: [[[0, 0], [160, 0], [40, 700], [0, 700]]],
});
pinta(peces, { llavor: 21, fotos: ['perers-flor', 'planol-detall', 'tractor-fordson'], minFotoArea: 16000, separacio: 220, pesos: { verd: 26, blanc: 32, rostoll: 18, blau: 12 } });
const cos = html(peces, { w, h, imatge: id => `<img src="/assets/fotos/${id}-800.webp" alt="">` })
  + `<div class="fita" style="left:${poble[0] / w * 100}%;top:${poble[1] / h * 100}%">${fita({ mida: '3.4rem' })}</div>`;
fs.writeFileSync('_disseny/og.html', `<!doctype html><html lang="ca"><head><meta charset="utf-8">
<link rel="stylesheet" href="/assets/bildane.css">
<style>
body { width: 1200px; height: 630px; overflow: hidden; display: grid; grid-template-columns: 560px 1fr; }
.text { padding: 64px 0 0 64px; display: flex; flex-direction: column; }
.marca { font-size: 1.9rem; }
h1 { font-size: 4.5rem; line-height: .98; letter-spacing: -.02em; font-weight: 800; font-stretch: var(--ample); margin: auto 0 1.1rem; text-wrap: balance; max-width: 9.5ch; }
p { font-size: 1.35rem; margin: 0 0 64px; }
.mosaic { width: 640px; height: 640px; margin-top: -5px; }
.mosaic .t, .mosaic .fita { animation: none; }
</style></head><body>
<div class="text"><p class="marca">${fita({ mida: '1.15em', color: 'var(--blau)', junta: 'none', gruix: 0 })}bildane</p>
<h1>Faig webs per als negocis del Pla.</h1><p>Mollerussa, Pla d'Urgell</p></div>
<div class="mosaic">${cos}</div>
</body></html>`);

const nav = await chromium.launch({ channel: 'msedge' });
const p = await nav.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto('http://localhost:8130/_disseny/og.html', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: 'og.png' });
await nav.close();
console.log('ok: favicons i og.png');
