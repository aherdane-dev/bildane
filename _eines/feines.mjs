// Captures dels projectes reals per a la secció Feines.
// node _eines/feines.mjs  →  assets/feines/{id}-{escriptori|mobil}-{amplada}.webp
// Si la web té avís de galetes, es rebutja abans de capturar.
// Es captura la part que ensenya la feina (el catàleg, la classificació), no el titular
// de la portada (detector IA1). `amaga` treu el que tapa (barres de galetes, xats flotants).
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';

const FEINES = [
  { id: 'reve-padel', url: 'https://revepadel.es/tienda/palas-de-padel/' },
  { id: 'la-llantia', url: 'https://adlallantia.com/clasificacion.html', catala: true, baixa: { escriptori: 380, mobil: 352 } },
];
const MIDES = {
  escriptori: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, amplades: [1440, 960] },
  mobil: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, amplades: [780, 390] },
};
const sortida = process.argv[2] || 'assets/feines';

fs.mkdirSync(sortida, { recursive: true });
const nav = await chromium.launch({ channel: 'msedge' });
for (const f of FEINES) {
  for (const [nom, { amplades, ...m }] of Object.entries(MIDES)) {
    const ctx = await nav.newContext({ ...m, locale: 'es-ES' });
    const p = await ctx.newPage();
    await p.goto(f.url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    const rebutja = p.getByRole('button', { name: /^(rechazar|rebutjar|rechazar todo|denegar|solo necesarias)$/i }).first();
    if (await rebutja.isVisible().catch(() => false)) { await rebutja.click(); await p.waitForTimeout(600); }
    // la web del club en català, i la taula a dalt de tot
    if (f.catala) await p.getByRole('button', { name: /^CA$/ }).first().click({ timeout: 3000 }).then(() => p.waitForTimeout(800)).catch(() => {});
    if (f.baixa) await p.evaluate(y => scrollTo(0, y), f.baixa[nom]);
    await p.waitForTimeout(2500);
    const png = await p.screenshot();
    for (const w of amplades) {
      await sharp(png).resize({ width: w }).webp({ quality: 80 }).toFile(`${sortida}/${f.id}-${nom}-${w}.webp`);
    }
    console.log('ok', f.id, nom);
    await ctx.close();
  }
}
await nav.close();
