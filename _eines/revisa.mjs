// Pes de la primera càrrega (mòbil), axe (escriptori), scroll horitzontal i errors JS a totes les pàgines del sitemap.
// Cal el servidor local (npm run servidor) i axe-core: npm i --no-save axe-core
import { chromium } from 'playwright';
import fs from 'node:fs';
const axe = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const rutes = [...new Set([...sitemap.matchAll(/<loc>https:\/\/bildane\.com([^<]*)<\/loc>/g)].map(m => m[1]))];
const nav = await chromium.launch({ channel: 'msedge' });
const kb = n => Math.round(n / 1024);
let pitjor = 0;
for (const r of [...rutes, '/avis-legal/', '/es/privacidad/', '/no-existeix']) {
  const mob = await nav.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 });
  const p = await mob.newPage();
  await p.goto('http://localhost:8130' + r, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  const bytes = await p.evaluate(() => [...performance.getEntriesByType('navigation'), ...performance.getEntriesByType('resource')].reduce((a, e) => a + (e.encodedBodySize || e.transferSize || 0), 0));
  const ample = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  await mob.close();
  const esc = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  const q = await esc.newPage(); const errs = [];
  q.on('pageerror', e => errs.push(e.message));
  await q.goto('http://localhost:8130' + r, { waitUntil: 'networkidle' });
  await q.addScriptTag({ content: axe });
  const v = await q.evaluate(() => axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] }).then(x => x.violations.map(v => `${v.id}(${v.nodes.length})`)));
  const t = await q.title(); const d = await q.$eval('meta[name=description]', m => m.content).catch(() => '');
  await esc.close();
  pitjor = Math.max(pitjor, bytes);
  console.log(`${r.padEnd(42)} ${String(kb(bytes)).padStart(4)} KB  axe:${v.length ? v.join(',') : 'ok'}  ${ample ? 'SCROLL-X ' : ''}${errs.length ? 'JS:' + errs.join('|') : ''}  t:${t.length} d:${d.length}`);
}
console.log('pitjor mòbil:', kb(pitjor), 'KB');
await nav.close();
