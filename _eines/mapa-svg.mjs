// El mapa de «On treballo»: cada comarca és una peça de trencadís (límits de l'ICGC, _eines/mapa-comarques.json)
// amb la junta de calç, com el mosaic de la portada. Es dibuixa a mà: cap llibreria de mapes.
import fs from 'node:fs';

const MAPA = JSON.parse(fs.readFileSync('_eines/mapa-comarques.json', 'utf8'));
export const { w: AMPLE, h: ALT } = MAPA;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Posició de l'etiqueta de cada comarca (en coordenades del dibuix): el centre de l'anell, mogut a mà
// en les peces on el centre no cau bé. [dx, dy] en unitats del dibuix.
const AJUST = { 'pla-urgell': [-4, -22] };
// peces massa petites per a l'etiqueta quan el mapa es veu a mida de mòbil: allà s'amaga (el nom és a la llista)
const PETITES = ['pla-urgell', 'urgell', 'segarra', 'garrigues', 'alta-ribagorca'];

// La fita de la marca: la mateixa polígona que el logotip, sobre Mollerussa.
// (els colors, a assets/comarques.css, classe .mollerussa)
const fitaSvg = (x, y, mida) =>
  `<polygon points="-1,-0.86 0.96,-1 0.62,1.04 -0.68,-0.06" transform="translate(${x} ${y}) scale(${mida})"/>`;

/**
 * @param comarques  [{ id, nom, ruta, mode }]  (mode: 'persona' | 'remot')
 * @param opcions    { actual: id resaltat, etiquetes: bool, enllacos: bool, titol, descripcio, classe }
 */
export function mapa(comarques, { actual = null, etiquetes = true, enllacos = true, mini = false, titol = '', descripcio = '', classe = '' } = {}) {
  const peces = comarques.map(c => {
    const m = MAPA.comarques[c.id];
    const tipus = c.id === actual ? 'actual' : mini ? 'altra' : c.mode;
    const forma = `<path class="peca peca-${tipus}" d="${m.d}" fill-rule="evenodd"/>`;
    const [dx, dy] = AJUST[c.id] || [0, 0];
    const text = etiquetes ? `<text class="etiqueta${PETITES.includes(c.id) ? ' etiqueta-petita' : ''}${c.id === 'pla-urgell' ? ' etiqueta-mini' : ''}" x="${m.centre[0] + dx}" y="${m.centre[1] + dy}" text-anchor="middle" dominant-baseline="middle">${esc(c.nom)}</text>` : '';
    const cos = `${forma}${text}`;
    return enllacos && c.ruta
      ? `<a href="${c.ruta}" aria-label="${esc(c.nom)}"><title>${esc(c.nom)}</title>${cos}</a>`
      : `<g>${cos}</g>`;
  }).join('\n    ');
  const [mx, my] = MAPA.mollerussa;
  return `<svg class="mapa${classe ? ' ' + classe : ''}" viewBox="0 0 ${AMPLE} ${ALT}" role="${enllacos ? 'group' : 'img'}" aria-labelledby="mapa-t mapa-d" xmlns="http://www.w3.org/2000/svg">
    <title id="mapa-t">${esc(titol)}</title>
    <desc id="mapa-d">${esc(descripcio)}</desc>
    ${peces}
    <g class="mollerussa" aria-hidden="true">${fitaSvg(mx.toFixed(1), my.toFixed(1), 14)}</g>
  </svg>`;
}
