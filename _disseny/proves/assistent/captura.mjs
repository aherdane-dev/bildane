// Captures de l'assistent a diverses mides. Ús: node _disseny/proves/assistent/captura.mjs [prefix] [ruta]
// Comprova també que l'avís de privacitat no queda tallat ni tapat.
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const prefix = process.argv[2] || 'estat';
const ruta = process.argv[3] || '/serveis/assistent-telefonic/';
const mides = [[1440, 900, 'escriptori'], [390, 844, 'mobil'], [320, 600, '320x600'], [1920, 1080, '1920x1080'], [1024, 600, '1024x600'], [768, 1024, '768x1024']];
const browser = await chromium.launch({ channel: 'msedge' });
let mal = 0;
for (const [w, h, nom] of mides) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  // Simula un navegador amb reconeixement de veu perquè el micròfon i l'avís hi siguin.
  await page.addInitScript(() => { window.webkitSpeechRecognition ||= class { start() {} stop() {} }; });
  await page.goto('http://localhost:8130' + ruta, { waitUntil: 'networkidle' });
  const caixa = page.locator('.as-trucada').first();
  await caixa.scrollIntoViewIfNeeded();
  const r = await page.evaluate(() => {
    const p = document.querySelector('.as-privacitat'), t = document.querySelector('.as-trucada');
    if (!p) return { sense: true };
    const a = p.getBoundingClientRect(), b = t.getBoundingClientRect();
    // tallat: el contingut del paràgraf és més alt que la caixa, o surt de la trucada
    const tallat = p.scrollHeight > p.clientHeight + 1 || a.bottom > b.bottom + 1 || a.top < b.top - 1;
    // tapat: algun element de la conversa o del formulari se li posa a sobre
    const altres = [...t.querySelectorAll('.as-conversa, .as-escriu, .as-opcions')].map(e => e.getBoundingClientRect());
    const tapat = altres.some(o => o.height && o.bottom > a.top + 1 && o.top < a.bottom - 1);
    return { tallat, tapat, alt: Math.round(a.height), caixa: Math.round(b.height) };
  });
  if (r.tallat || r.tapat) mal++;
  console.log(nom, JSON.stringify(r));
  await caixa.screenshot({ path: path.join(dir, `${prefix}-${nom}.png`) });
  await page.close();
}
await browser.close();
process.exit(mal ? 1 : 0);
