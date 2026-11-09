// Imatge per compartir (1200×630) de cada pàgina de servei: la paraula gegant
// i la foto del servei dins una peça de trencadís. Els serveis sense foto hi porten
// la vinyeta (Webs, la captura de La Llàntia al mòbil), en el color de la peça del servei.
// node _eines/og-serveis.mjs   (cal el servidor local a http://localhost:8130)
import fs from 'node:fs';
import sharp from 'sharp';
import { chromium } from 'playwright';
import { fita } from './mosaic.mjs';
import { SERVEIS } from './textos.mjs';
import { vinyeta } from './vinyetes.mjs';
const COLOR = { telefon: 'blau', webs: 'blau', xat: 'verd', carta: 'verd', botiga: 'rostoll', albarans: 'rostoll', google: 'blanc', manteniment: 'blanc' };

fs.mkdirSync('assets/og', { recursive: true });
const nav = await chromium.launch({ channel: 'msedge' });
const p = await nav.newPage({ viewport: { width: 1200, height: 630 } });
for (const s of SERVEIS) {
  for (const lang of ['ca', 'es']) {
    const x = s[lang];
    const peca = s.foto ? `<img src="/assets/fotos/${s.foto}-1600.webp" alt="">`
      : s.id === 'webs' ? '<img class="pantalla" src="/assets/feines/la-llantia-mobil-780.webp" alt="">' : vinyeta(s.id, lang);
    // sense foto, la paraula no entra dins la peça de la vinyeta (la «s» de Webs no es veia)
    const mida = Math.min(180, Math.round(1180 / x.paraula.length), 999);
    const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8">
<link rel="stylesheet" href="/assets/bildane.css">
<style>
body { width: 1200px; height: 630px; overflow: hidden; position: relative; background: var(--calc); }
.foto { position: absolute; right: 0; top: 0; width: 720px; height: 630px; overflow: hidden; background: var(--blau);
  clip-path: polygon(14% 0, 100% 0, 100% 100%, 0 100%); }
.foto img { width: 100%; height: 100%; object-fit: cover; }
.foto.sense { display: grid; place-items: center; padding: 40px 30px 40px 150px; }
.foto.sense svg { width: 100%; height: auto; }
.foto .pantalla { width: auto; height: 560px; object-fit: contain; box-shadow: 0 0 0 6px var(--calc); }
.v-blau { background: var(--blau); } .v-verd { background: var(--verd); } .v-rostoll { background: var(--rostoll); } .v-blanc { background: var(--blanc); }
.marca { position: absolute; left: 56px; top: 52px; font-size: 1.9rem; }
.paraula { position: absolute; left: 50px; bottom: 150px; margin: 0; font-weight: 900; font-stretch: var(--ample-gegant); letter-spacing: -.02em; line-height: .8;
  font-size: ${mida}px; z-index: 2; }
.nom { position: absolute; left: 56px; bottom: 56px; margin: 0; font-size: 1.6rem; font-weight: 700; max-width: 520px; line-height: 1.2; }
.sense ~ .nom { max-width: 420px; }
.fita { position: absolute; right: 48px; bottom: 44px; z-index: 2; }
</style></head><body>
<div class="foto${s.foto ? '' : ` sense v-${COLOR[s.id]}`}">${peca}</div>
<p class="marca">${fita({ mida: '1.15em', color: 'var(--blau)', junta: 'none', gruix: 0 })}bildane</p>
<p class="paraula">${x.paraula}</p>
<p class="nom">${x.nom}. Mollerussa, Pla d'Urgell</p>
<div class="fita">${fita({ mida: '4rem' })}</div>
</body></html>`;
    fs.writeFileSync('_disseny/og-servei.html', html);
    await p.goto('http://localhost:8130/_disseny/og-servei.html', { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    // sense foto, la paraula s'encongeix fins que no toca la peça de la vinyeta
    if (!s.foto) await p.evaluate(() => { const e = document.querySelector('.paraula'); let m = parseFloat(getComputedStyle(e).fontSize); while (e.getBoundingClientRect().right > 470 && m > 40) e.style.fontSize = `${--m}px`; });
    await sharp(await p.screenshot()).jpeg({ quality: 82, mozjpeg: true }).toFile(`assets/og/${s.id}-${lang}.jpg`);
  }
}
await nav.close();
fs.rmSync('_disseny/og-servei.html');
console.log('ok', fs.readdirSync('assets/og').length, 'imatges');
