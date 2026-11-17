// Mesura quant s'assemblen entre si les pàgines de comarca (mateixa llengua) i falla si alguna passa del límit.
// Es compara el text que és de la pàgina (entradeta, títols i paràgrafs), no la capçalera, el peu ni el contacte.
// Mesures, per a cada parell: (1) Jaccard de «shingles» de 4 paraules; (2) contingut compartit: la part de la pàgina més
// curta que apareix a l'altra (la que més s'enganya amb frases repetides). Límit: 30 %.
// node _eines/similitud.mjs [límit=0.30]
import fs from 'node:fs';

const LIMIT = Number(process.argv[2] ?? 0.30);
const SHINGLE = 4;
const MIDES = ['pla-d-urgell', 'urgell', 'segria', 'noguera', 'garrigues', 'segarra', 'solsones', 'alt-urgell', 'pallars-jussa', 'pallars-sobira', 'alta-ribagorca', 'val-d-aran', 'cerdanya'];
const RUTES = { ca: s => `on-treballo/${s}/index.html`, es: s => `es/donde-trabajo/${s}/index.html` };

const text = html => {
  const cap = (html.match(/<section class="capitol fons-calc com-cap"[\s\S]*?<\/section>/) || [''])[0];
  const cos = (html.match(/<section class="capitol fons-calc com-text">[\s\S]*?<\/section>/) || [''])[0];
  const net = s => s.replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<dl[\s\S]*?<\/dl>/g, ' ').replace(/<sup[\s\S]*?<\/sup>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ');
  return (net(cap) + ' ' + net(cos)).toLowerCase().replace(/[^\p{L}\p{N}\s'’·-]/gu, ' ').replace(/\s+/g, ' ').trim();
};
const shingles = t => { const p = t.split(' '); const s = new Set(); for (let i = 0; i + SHINGLE <= p.length; i++) s.add(p.slice(i, i + SHINGLE).join(' ')); return s; };

let pitjor = 0, fallen = 0;
for (const lang of ['ca', 'es']) {
  const pag = MIDES.map(s => ({ s, t: text(fs.readFileSync(RUTES[lang](s), 'utf8')) })).map(p => ({ ...p, sh: shingles(p.t), n: p.t.split(' ').length }));
  const parells = [];
  for (let i = 0; i < pag.length; i++) for (let j = i + 1; j < pag.length; j++) {
    const a = pag[i].sh, b = pag[j].sh;
    let inter = 0; for (const x of a) if (b.has(x)) inter++;
    parells.push({ a: pag[i].s, b: pag[j].s, jac: inter / (a.size + b.size - inter), comp: inter / Math.min(a.size, b.size) });
  }
  parells.sort((x, y) => y.comp - x.comp);
  console.log(`\n== ${lang}: ${pag.length} pàgines, de ${Math.min(...pag.map(p => p.n))} a ${Math.max(...pag.map(p => p.n))} paraules ==`);
  for (const p of parells.slice(0, 5)) console.log(`  ${(p.comp * 100).toFixed(1).padStart(5)} % compartit  ${(p.jac * 100).toFixed(1).padStart(5)} % Jaccard  ${p.a} ~ ${p.b}`);
  const max = Math.max(...parells.map(p => Math.max(p.comp, p.jac)));
  pitjor = Math.max(pitjor, max);
  fallen += parells.filter(p => Math.max(p.comp, p.jac) > LIMIT).length;
}
console.log(`\nPitjor parell: ${(pitjor * 100).toFixed(1)} % (límit ${(LIMIT * 100).toFixed(0)} %). ${fallen ? `FALLEN: ${fallen} parells` : 'Cap parell passa del límit.'}`);
process.exit(fallen ? 1 : 0);
