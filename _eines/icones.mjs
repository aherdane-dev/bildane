// Icones de la web, a partir del logo de la marca (la fita + «bildane», el mateix del perfil de LinkedIn).
//   · 16, 32, 48 i 96 px, favicon.ico i favicon.svg: només la fita, gran. El nom no es llegeix a 16 px.
//   · 180 (apple-touch), 192 i 512 px: el logo complet, que sí es llegeix a aquesta mida.
// node _eines/icones.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { chromium } from 'playwright';

const BLAU = '#1F3590', ROSTOLL = '#E0A13A', CALC = '#F2F3EE';
const FITA = '-1,-0.86 0.96,-1 0.62,1.04 -0.68,-0.06'; // la mateixa polígona que el logo
const font = pathToFileURL(path.resolve('assets/fonts/archivo-latin.woff2')).href;

// ---------- només la fita: quadrat ple de blau (el navegador i Google ja el retallen com volen) ----------
const fitaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${BLAU}"/><polygon points="${FITA}" fill="${ROSTOLL}" transform="translate(50.7 49.3) scale(33)"/></svg>\n`;
fs.writeFileSync('favicon.svg', fitaSvg);
const petites = {};
for (const mida of [16, 32, 48, 96]) {
  petites[mida] = await sharp(Buffer.from(fitaSvg), { density: 72 * mida / 100 * 4 }).resize(mida, mida).png().toBuffer();
  fs.writeFileSync(`favicon-${mida}.png`, petites[mida]);
}

// ---------- favicon.ico amb 16, 32 i 48 (cada entrada és un PNG) ----------
const mides = [16, 32, 48];
const capcalera = Buffer.alloc(6 + 16 * mides.length);
capcalera.writeUInt16LE(0, 0); capcalera.writeUInt16LE(1, 2); capcalera.writeUInt16LE(mides.length, 4);
let desp = capcalera.length;
mides.forEach((m, i) => {
  const o = 6 + 16 * i, png = petites[m];
  capcalera.writeUInt8(m, o); capcalera.writeUInt8(m, o + 1); capcalera.writeUInt8(0, o + 2); capcalera.writeUInt8(0, o + 3);
  capcalera.writeUInt16LE(1, o + 4); capcalera.writeUInt16LE(32, o + 6);
  capcalera.writeUInt32LE(png.length, o + 8); capcalera.writeUInt32LE(desp, o + 12);
  desp += png.length;
});
fs.writeFileSync('favicon.ico', Buffer.concat([capcalera, ...mides.map(m => petites[m])]));

// ---------- el logo complet, a mida gran (el dibuix i la lletra són els del logo de LinkedIn) ----------
const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" style="display:block">
<style>@font-face{font-family:"Archivo";src:url("${font}") format("woff2");font-weight:100 900;font-stretch:62% 125%}
text{font-family:"Archivo",Arial,sans-serif}</style>
<rect width="400" height="400" fill="${BLAU}"/>
<g transform="translate(201.3 146) scale(64)"><polygon points="${FITA}" fill="${ROSTOLL}"/></g>
<text x="200" y="308" font-size="76" text-anchor="middle" fill="${CALC}" style="font-weight:800;font-stretch:115%;letter-spacing:-.02em">bildane</text>
</svg>`;
const tmp = path.join(os.tmpdir(), 'bildane-logo-icona.html');
fs.writeFileSync(tmp, `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:${BLAU}}</style>${logo}`);
let browser;
try { browser = await chromium.launch(); } catch { browser = await chromium.launch({ channel: 'msedge' }); }
for (const [nom, mida] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  const page = await browser.newPage({ viewport: { width: 400, height: 400 }, deviceScaleFactor: mida / 400 });
  await page.goto(pathToFileURL(tmp).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: nom, clip: { x: 0, y: 0, width: 400, height: 400 } });
  await page.close();
}
await browser.close();
fs.unlinkSync(tmp);

// ---------- manifest ----------
fs.writeFileSync('site.webmanifest', JSON.stringify({
  name: 'Bildane',
  short_name: 'Bildane',
  description: 'Webs, botigues en línia, assistents amb IA i albarans llegits amb IA, des de Mollerussa.',
  lang: 'ca',
  start_url: '/',
  display: 'browser',
  theme_color: CALC,
  background_color: CALC,
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
}, null, 2) + '\n');
console.log('ok: icones i manifest');
