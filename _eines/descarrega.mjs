// Descarrega els originals de _fotos/fotos.json a _fotos/originals/
// i desa autor, llicència i enllaç a _fotos/credits.json.
import fs from 'node:fs';

const UA = { headers: { 'User-Agent': 'BildaneWeb/1.0 (hola@bildane.com)' } };
const fotos = JSON.parse(fs.readFileSync('_fotos/fotos.json', 'utf8'));
const credits = {};
const net = (s = '') => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

for (const f of fotos) {
  // `desti` permet desar fora d'originals (fonts de retalls, que no van a la web)
  const desti = f.desti || `_fotos/originals/${f.id}.jpg`;
  if (f.font === 'wikimedia') {
    const amplada = f.amplada ? `&iiurlwidth=${f.amplada}` : '';
    const api = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(f.titol)}&prop=imageinfo&iiprop=url|size|extmetadata${amplada}&format=json`;
    const ii = Object.values((await (await fetch(api, UA)).json()).query.pages)[0].imageinfo[0];
    const m = ii.extmetadata;
    credits[f.id] = {
      font: 'Wikimedia Commons',
      autor: net(m.Artist?.value),
      llicencia: m.LicenseShortName?.value,
      llicencia_url: m.LicenseUrl?.value || null,
      enllac: ii.descriptionurl,
      mida_original: `${ii.width}×${ii.height}`,
    };
    if (!fs.existsSync(desti)) {
      const url = ii.thumburl && f.amplada ? ii.thumburl : ii.url;
      fs.writeFileSync(desti, Buffer.from(await (await fetch(url, UA)).arrayBuffer()));
    }
  } else {
    credits[f.id] = {
      font: 'Unsplash',
      autor: f.autor,
      llicencia: 'Llicència Unsplash',
      llicencia_url: 'https://unsplash.com/license',
      enllac: `https://unsplash.com/photos/${f.uid}`,
      mida_original: `${f.amplada_orig} px d'amplada`,
    };
    if (!fs.existsSync(desti)) {
      const w = Math.min(f.amplada_orig, 6000);
      const url = `https://images.unsplash.com/${f.cdn}?fm=jpg&q=95&w=${w}`;
      fs.writeFileSync(desti, Buffer.from(await (await fetch(url)).arrayBuffer()));
    }
  }
  console.log('ok', f.id, credits[f.id].llicencia, '·', credits[f.id].autor);
}
fs.writeFileSync('_fotos/credits.json', JSON.stringify(credits, null, 2));
