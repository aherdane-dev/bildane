// Baixa de l'API pública d'Idescat les dades de les 13 comarques de la pàgina «On treballo»
// i les desa a _eines/comarques-idescat.json, amb el període i l'enllaç a la taula de cada dada.
// Cap xifra de les pàgines s'escriu a mà: surt d'aquest fitxer.
// node _eines/dades-idescat.mjs
import fs from 'node:fs';

// codi d'Idescat de cada comarca (api.idescat.cat/emex/v1/nodes.json?tipus=com)
export const CODIS = { 'pla-urgell': '27', urgell: '38', segria: '33', noguera: '23', garrigues: '18', segarra: '32', solsones: '35',
  'alt-urgell': '04', 'pallars-jussa': '25', 'pallars-sobira': '26', 'alta-ribagorca': '05', aran: '39', cerdanya: '15' };

const EMEX = 'https://api.idescat.cat/emex/v1/dades.json';
// indicadors que fem servir (nom de la dada -> codi d'Idescat)
const INDICADORS = {
  poblacio: 'f171', superficie: 'f271', densitat: 'f262',
  afAgricultura: 'f273', afIndustria: 'f278', afConstruccio: 'f279', afServeis: 'f280', afTotal: 'f282',
  sau: 'f345', fruiters: 'f347', oliveres: 'f348', vinya: 'f349', cereals: 'f391', bovins: 'f141', porcins: 'f144', aviram: 'f145', ovins: 'f142',
  hotels: 'f215', placesHotels: 'f216', campings: 'f217', placesCampings: 'f218', turismeRural: 'f219', placesTurismeRural: 'f220',
};

const num = v => { const x = parseFloat(String(v).split(',')[0]); return Number.isFinite(x) ? x : null; };

async function json(url) {
  for (let i = 0; i < 3; i++) {
    try { const r = await fetch(url); if (r.ok) return await r.json(); } catch {}
    await new Promise(r => setTimeout(r, 800));
  }
  throw new Error('No he pogut baixar ' + url);
}

const sortida = { _font: 'Idescat, API pública (api.idescat.cat)', _baixat: new Date().toISOString().slice(0, 10), comarques: {} };
for (const [slug, id] of Object.entries(CODIS)) {
  const dades = {}, fonts = {};
  // l'Emex dóna fins a 232 indicadors de cop; per a Segarra i Solsonès només dóna les afiliacions, i la resta s'hi demana a part
  const j = await json(`${EMEX}?id=${id}&tipus=com&lang=cat`);
  const taules = [];
  (function w(o) {
    if (Array.isArray(o)) o.forEach(w);
    else if (o && typeof o === 'object') {
      if (o.ff) taules.push(o);
      Object.values(o).forEach(w);
    }
  })(j);
  for (const t of taules) for (const f of [].concat(t.ff.f || [])) {
    const nom = Object.keys(INDICADORS).find(k => INDICADORS[k] === f.id);
    if (!nom || !('v' in f)) continue;
    dades[nom] = num(f.v);
    // Idescat dóna també el valor de Catalunya (el segon): el desem per poder comparar
    const cat = parseFloat(String(f.v).split(',')[1]);
    if (Number.isFinite(cat)) dades['cat_' + nom] = cat;
    fonts[nom] = { periode: t.r || '', enllac: (t.l || '').replace(/&amp;/g, '&'), font: t.s || '' };
  }
  // Segarra i Solsonès: l'Emex no té la població; la baixem de la taula de població (cens anual)
  if (dades.poblacio == null) {
    // l'API retorna el cub sencer (JSON-stat): any × comarca × edat × sexe; en triem una cel·la
    const p = await json('https://api.idescat.cat/taules/v2/censph/539/5976/com/data?lang=ca');
    const pos = { YEAR: '2025', COM: id, AGE: 'TOTAL', SEX: 'TOTAL', CONCEPT: 'POP' };
    let idx = 0;
    p.id.forEach((dim, k) => { idx = idx * p.size[k] + p.dimension[dim].category.index.indexOf(pos[dim]); });
    const v = p.value[idx];
    if (Number.isFinite(Number(v))) {
      dades.poblacio = Number(v);
      fonts.poblacio = { periode: '2025', enllac: `https://www.idescat.cat/pub/?id=censph&n=539&geo=com:${id}`, font: "Idescat, a partir del Cens de població anual de l'INE." };
    }
  }
  sortida.comarques[slug] = { codi: id, dades, fonts };
  console.log(slug.padEnd(15), JSON.stringify({ pob: dades.poblacio, km2: dades.superficie, afTotal: dades.afTotal, hotels: dades.hotels, sau: dades.sau }));
}
fs.writeFileSync('_eines/comarques-idescat.json', JSON.stringify(sortida, null, 1) + '\n');
console.log('ok: _eines/comarques-idescat.json');
