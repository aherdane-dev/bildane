// Baixa del servei WFS de l'ICGC (divisions administratives, 1:250 000) els límits de les 13 comarques
// de «On treballo», els simplifica i els desa a _eines/mapa-comarques.json (ja en coordenades d'SVG).
// El mapa de la pàgina es dibuixa d'aquest fitxer; res no s'hi inventa.
// node _eines/mapa-comarques.mjs
import fs from 'node:fs';

const WFS = 'https://geoserveis.icgc.cat/servei/catalunya/divisions-administratives/wfs?service=WFS&version=2.0.0&request=GetFeature&outputFormat=GEOJSON&srsName=EPSG:4326';
const CODIS = { 'pla-urgell': 27, urgell: 38, segria: 33, noguera: 23, garrigues: 18, segarra: 32, solsones: 35, 'alt-urgell': 4, 'pallars-jussa': 25, 'pallars-sobira': 26, 'alta-ribagorca': 5, aran: 39, cerdanya: 15 };
const MOLLERUSSA = [0.8939, 41.6311];
const W = 900;               // amplada del dibuix; l'alçada surt de la proporció
const TOLERANCIA = 0.0035;   // graus: com més gran, més simple (≈ 300 m)

const llegeix = async tipus => {
  const r = await fetch(`${WFS}&typeNames=divisions_administratives_wfs:${tipus}`);
  return JSON.parse((await r.text()));
};
const comarques = await llegeix('divisions_administratives_comarques_50000');
console.log('comarques al servei:', comarques.features.length, Object.keys(comarques.features[0].properties).join(','));

const codiDe = f => Number(f.properties.CODICOMAR ?? f.properties.codicomar ?? f.properties.CODI_COMARCA ?? f.properties.codi_comarca);
const seleccio = comarques.features.filter(f => Object.values(CODIS).includes(codiDe(f)));
if (seleccio.length !== 13) throw new Error(`He trobat ${seleccio.length} comarques, n'espero 13. Propietats: ${JSON.stringify(comarques.features[0].properties)}`);

// Ramer–Douglas–Peucker
function simplifica(pts, tol) {
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  let dmax = 0, imax = 0;
  const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy || 1e-12;
  for (let i = 1; i < pts.length - 1; i++) {
    const t = Math.max(0, Math.min(1, ((pts[i][0] - a[0]) * dx + (pts[i][1] - a[1]) * dy) / l2));
    const d = Math.hypot(pts[i][0] - (a[0] + t * dx), pts[i][1] - (a[1] + t * dy));
    if (d > dmax) { dmax = d; imax = i; }
  }
  if (dmax <= tol) return [a, b];
  return [...simplifica(pts.slice(0, imax + 1), tol).slice(0, -1), ...simplifica(pts.slice(imax), tol)];
}

// el servei no ordena els anells (el primer pot ser un forat): els agafem tots i el farciment «evenodd» fa la resta
const anells = f => (f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates).flat();
let [x0, x1, y0, y1] = [1e9, -1e9, 1e9, -1e9];
for (const f of seleccio) for (const r of anells(f)) for (const [x, y] of r) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
const cosLat = Math.cos(((y0 + y1) / 2) * Math.PI / 180);
const esc = (x1 - x0) * cosLat;
const k = (W - 40) / esc;                  // marge de 20 a cada banda
const H = Math.round((y1 - y0) * k + 40);
const proj = ([x, y]) => [20 + (x - x0) * cosLat * k, 20 + (y1 - y) * k];

const area = r => Math.abs(r.reduce((s, [x, y], i) => { const [x2, y2] = r[(i + 1) % r.length]; return s + (x * y2 - x2 * y); }, 0) / 2);
const sortida = { _font: 'ICGC, Divisions administratives (WFS), 1:250 000', _baixat: new Date().toISOString().slice(0, 10), w: W, h: H, comarques: {} };
for (const [slug, codi] of Object.entries(CODIS)) {
  const f = seleccio.find(f => codiDe(f) === codi);
  // només els anells que importen (descarta illes minúscules, com els enclavaments)
  const rs = anells(f).sort((a, b) => area(b) - area(a));
  const gran = area(rs[0]);
  const camins = rs.filter(r => area(r) > gran * 0.003).map(r => {
    const s = simplifica(r, TOLERANCIA).map(proj).map(([x, y]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
    return 'M' + s.map(p => p.join(' ')).join('L') + 'Z';
  });
  // el centre de l'etiqueta: la mitjana dels vèrtexs de l'anell més gran (prou bona per a peces gairebé convexes)
  const gr = rs[0].map(proj);
  // centroide de l'àrea (fórmula del polígon), millor que la mitjana dels vèrtexs en vores dentades
  let A = 0, cx = 0, cy = 0;
  for (let i = 0; i < gr.length; i++) { const [x1, y1] = gr[i], [x2, y2] = gr[(i + 1) % gr.length]; const f = x1 * y2 - x2 * y1; A += f; cx += (x1 + x2) * f; cy += (y1 + y2) * f; }
  cx /= 3 * A; cy /= 3 * A;
  sortida.comarques[slug] = { d: camins.join(''), centre: [Math.round(cx), Math.round(cy)], punts: camins.join('').split(/[ML]/).length };
  console.log(slug.padEnd(15), 'anells', camins.length, 'punts', sortida.comarques[slug].punts);
}
sortida.mollerussa = proj(MOLLERUSSA).map(v => Math.round(v * 10) / 10);
fs.writeFileSync('_eines/mapa-comarques.json', JSON.stringify(sortida) + '\n');
console.log('ok: _eines/mapa-comarques.json', W + 'x' + H);
