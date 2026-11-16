// og.png (1200×630). Els favicons i les icones es fan amb _eines/icones.mjs.
// node _eines/imatges-marca.mjs   (cal el servidor local a http://localhost:8130)
import fs from 'node:fs';
import { chromium } from 'playwright';
import { mosaic, pinta, html, fita } from './mosaic.mjs';

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
