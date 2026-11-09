// Vinyetes: el que fa cada servei, dibuixat pla dins del sistema del mosaic (director D8).
// Només colors de la paleta, sense degradats ni ombres; peces retallades a mà i separades
// per la junta de calç; el text en Archivo dins de l'SVG. Les dades són d'exemple i ho diuen.
// vinyeta(id, lang) → <svg> (o null si el servei no en té). Totes fan 640 × 480.
import { qrCami } from './qr.mjs';

const C = { calc: '#F2F3EE', blanc: '#FAFAF6', blau: '#1F3590', verd: '#0F6B4B', rostoll: '#E0A13A', sequia: '#3C9C98' };
const W = 640, H = 480;

// Una peça: un quadrilàter amb les cantonades desviades uns pocs punts (cap angle recte).
let llavor = 1;
const atzar = () => (llavor = (llavor * 16807) % 2147483647) / 2147483647;
function peca(x, y, w, h, color, { tremol = 3, junta = 0, extra = '' } = {}) {
  const t = () => ((atzar() - .5) * 2 * tremol).toFixed(1);
  const p = [[x + +t(), y + +t()], [x + w + +t(), y + +t()], [x + w + +t(), y + h + +t()], [x + +t(), y + h + +t()]];
  return `<polygon points="${p.map(q => q.map(n => +n.toFixed(1)).join(',')).join(' ')}" fill="${color}"${junta ? ` stroke="${C.calc}" stroke-width="${junta}" stroke-linejoin="miter"` : ''}${extra}/>`;
}
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
// text: mida en unitats de l'SVG; pes; amplada d'Archivo
function text(x, y, s, { mida = 26, pes = 600, color = C.blau, ample = 100, ancora = 'start' } = {}) {
  return `<text x="${x}" y="${y}" font-size="${mida}" font-weight="${pes}" fill="${color}"${ancora !== 'start' ? ` text-anchor="${ancora}"` : ''} style="font-stretch:${ample}%">${esc(s)}</text>`;
}
// la marca «Exemple»: una peça petita de rostoll
const exemple = (x, y, s, fons = C.rostoll) => `<g>${peca(x, y, s.length * 12 + 26, 36, fons, { tremol: 1.5 })}${text(x + 13, y + 25, s, { mida: 20, pes: 700 })}</g>`;
// una tessel·la girada, com les de les llistes de la web
const tessela = (x, y, m, color) => `<rect x="${x}" y="${y}" width="${m}" height="${m}" fill="${color}" transform="rotate(7 ${x + m / 2} ${y + m / 2})"/>`;

const T = {
  ca: {
    exemple: 'Exemple',
    telefon: { pizzeria: 'Pizzeria del Pla', tipus: 'Per emportar', linies: ['2 margarites', '1 quatre formatges'], recollida: 'Recollida 21:15', atesa: 'Trucada atesa', hora: '20:47',
      alt: "Exemple de tiquet de cuina: dues margarites i una quatre formatges per emportar, recollida a les 21:15. Al costat, «Trucada atesa, 20:47»." },
    albarans: { albara: 'Albarà 0214', cap: ['Data', 'Proveïdor', 'Quilos'], files: [['03/11', 'Soci 014', '1.240'], ['03/11', 'Soci 027', '860'], ['04/11', 'Soci 031', 'revisar']],
      alt: "Exemple d'un albarà de paper convertit en una taula amb la data, el proveïdor i els quilos. Una dada dubtosa queda marcada per revisar." },
    botiga: { nova: 'Comanda nova', linies: ['1 caixa de préssecs', 'Pagat amb Bizum', 'Recollida a la botiga'],
      alt: "Exemple d'avís d'una comanda nova a la botiga en línia: una caixa de préssecs, pagada amb Bizum, per recollir a la botiga." },
    google: { negoci: 'El teu negoci', horari: 'Obert, tanca a les 20:00', arribar: 'Com arribar',
      alt: "Exemple de fitxa al mapa de Google: el nom del negoci, l'horari i el botó «Com arribar»." },
    xat: { client: 'Obriu diumenge?', resposta: 'Sí, de 9 a 14 h.', web: 'la teva web',
      alt: "Exemple de conversa al xat d'una web: «Obriu diumenge?» i la resposta «Sí, de 9 a 14 h»." },
    carta: { carta: 'Carta', escaneja: 'Escaneja-ho', plats: [['Coca de recapte', 'Gluten'], ['Truita de patates', 'Ou']], ruta: 'https://bildane.com/serveis/carta-qr/',
      alt: "Una placa de taula amb un codi QR que porta a la pàgina de la Carta QR, i dos plats d'exemple amb els al·lèrgens marcats." },
    manteniment: { linies: ['Còpia de seguretat', 'Plugins al dia', 'Canvi de preus fet'],
      alt: "Exemple de llista de manteniment: còpia de seguretat, plugins al dia i canvi de preus fet." },
  },
  es: {
    exemple: 'Ejemplo',
    telefon: { pizzeria: 'Pizzería del Pla', tipus: 'Para llevar', linies: ['2 margaritas', '1 cuatro quesos'], recollida: 'Recogida 21:15', atesa: 'Llamada atendida', hora: '20:47',
      alt: 'Ejemplo de ticket de cocina: dos margaritas y una cuatro quesos para llevar, recogida a las 21:15. Al lado, «Llamada atendida, 20:47».' },
    albarans: { albara: 'Albarán 0214', cap: ['Fecha', 'Proveedor', 'Kilos'], files: [['03/11', 'Socio 014', '1.240'], ['03/11', 'Socio 027', '860'], ['04/11', 'Socio 031', 'revisar']],
      alt: 'Ejemplo de un albarán de papel convertido en una tabla con la fecha, el proveedor y los kilos. Un dato dudoso queda marcado para revisar.' },
    botiga: { nova: 'Pedido nuevo', linies: ['1 caja de melocotones', 'Pagado con Bizum', 'Recogida en la tienda'],
      alt: 'Ejemplo de aviso de un pedido nuevo en la tienda online: una caja de melocotones, pagada con Bizum, para recoger en la tienda.' },
    google: { negoci: 'Tu negocio', horari: 'Abierto, cierra a las 20:00', arribar: 'Cómo llegar',
      alt: 'Ejemplo de ficha en el mapa de Google: el nombre del negocio, el horario y el botón «Cómo llegar».' },
    xat: { client: '¿Abrís el domingo?', resposta: 'Sí, de 9 a 14 h.', web: 'tu web',
      alt: 'Ejemplo de conversación en el chat de una web: «¿Abrís el domingo?» y la respuesta «Sí, de 9 a 14 h».' },
    carta: { carta: 'Carta', escaneja: 'Escanéalo', plats: [['Coca de recapte', 'Gluten'], ['Tortilla de patatas', 'Huevo']], ruta: 'https://bildane.com/es/servicios/carta-qr/',
      alt: 'Una placa de mesa con un código QR que lleva a la página de la Carta QR, y dos platos de ejemplo con los alérgenos marcados.' },
    manteniment: { linies: ['Copia de seguridad', 'Plugins al día', 'Cambio de precios hecho'],
      alt: 'Ejemplo de lista de mantenimiento: copia de seguridad, plugins al día y cambio de precios hecho.' },
  },
};

const DIBUIX = {
  // un tiquet de cuina blanc, girat, i la peça de la trucada atesa
  telefon: (t, ex) => {
    const x = 70, y = 34, w = 330, h = 404;
    const dents = Array.from({ length: 11 }, (_, i) => `${x + w - i * w / 10},${y + h + (i % 2 ? 14 : 0)}`).join(' ');
    return `<g transform="rotate(-3 ${x + w / 2} ${y + h / 2})">
  <polygon points="${x},${y + 2} ${x + w},${y} ${dents} ${x},${y + h}" fill="${C.blanc}" stroke="${C.calc}" stroke-width="6"/>
  ${text(x + 28, y + 56, t.pizzeria, { mida: 28, pes: 800, ample: 112 })}
  ${text(x + 28, y + 96, t.tipus, { mida: 22, pes: 500 })}
  <path d="M${x + 28} ${y + 120}h${w - 56}" stroke="${C.blau}" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>
  ${text(x + 28, y + 170, t.linies[0], { mida: 30, pes: 700 })}
  ${text(x + 28, y + 216, t.linies[1], { mida: 30, pes: 700 })}
  <path d="M${x + 28} ${y + 250}h${w - 56}" stroke="${C.blau}" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>
  ${text(x + 28, y + 300, t.recollida, { mida: 30, pes: 800 })}
  ${exemple(x + 28, y + 336, ex)}
</g>
${peca(400, 250, 220, 132, C.rostoll, { junta: 6 })}
${text(420, 296, t.atesa, { mida: t.atesa.length > 14 ? 20 : 24, pes: 700 })}
${text(420, 354, t.hora, { mida: 50, pes: 800, ample: 115 })}`;
  },
  // l'albarà de paper girat i la taula verda que en surt
  albarans: (t, ex) => {
    const ratlles = [0, 1, 2, 3].map(i => `<path d="M118 ${170 + i * 44}c18 -10 30 8 46 -2s30 6 48 -4s28 4 44 -3" fill="none" stroke="${C.blau}" stroke-width="4" stroke-linecap="round"/>`).join('');
    const cel = (x, y, w, s, revisar, cap) => `${peca(x, y, w, 52, revisar ? C.rostoll : cap ? C.blau : C.verd, { tremol: 1.5 })}${text(x + 12, y + 34, s, { mida: 21, pes: cap || revisar ? 700 : 500, color: revisar ? C.blau : C.calc })}`;
    const cols = [[300, 86], [392, 138], [536, 92]];
    const files = [t.cap, ...t.files].map((f, r) => f.map((s, c) => cel(cols[c][0], 150 + r * 58, cols[c][1], s, s === 'revisar', r === 0)).join('')).join('');
    return `<g transform="rotate(4 180 250)">
  ${peca(76, 70, 224, 300, C.blanc, { junta: 6 })}
  ${text(100, 120, t.albara, { mida: 22, pes: 700 })}
  ${ratlles}
</g>
${peca(292, 142, 344, 300, C.calc, { tremol: 2 })}
${files}
${exemple(300, 386, ex, C.blanc)}`;
  },
  botiga: (t, ex) => `${peca(120, 56, 400, 352, C.blanc, { junta: 6 })}
${peca(150, 92, 230, 56, C.blau, { tremol: 2 })}
${text(168, 130, t.nova, { mida: 26, pes: 700, color: C.calc })}
${t.linies.map((l, i) => `${tessela(158, 190 + i * 56, 16, i ? C.verd : C.rostoll)}${text(190, 206 + i * 56, l, { mida: 26, pes: i ? 500 : 700 })}`).join('')}
${exemple(150, 350, ex, C.rostoll)}`,
  // un tros de mapa fet de peces, la fita com a agulla i la fitxa
  google: (t, ex) => {
    const camps = [[40, 40, 150, 110, C.verd], [200, 30, 120, 90, C.blanc], [330, 40, 160, 100, C.rostoll], [500, 36, 100, 130, C.verd],
      [40, 160, 120, 100, C.blanc], [170, 130, 140, 120, C.rostoll], [440, 150, 160, 100, C.blanc]].map(([x, y, w, h, c]) => peca(x, y, w, h, c, { tremol: 4 })).join('');
    return `${camps}
<path d="M20 268 L620 118" stroke="${C.sequia}" stroke-width="10"/>
<g transform="translate(372 150)"><polygon points="-34,-30 33,-34 21,36 -23,-2" fill="${C.blau}" stroke="${C.calc}" stroke-width="5"/></g>
${peca(130, 262, 380, 180, C.blanc, { junta: 6 })}
${text(158, 314, t.negoci, { mida: 32, pes: 800, ample: 112 })}
${text(158, 356, t.horari, { mida: 22, pes: 500 })}
${peca(158, 376, t.arribar.length * 14 + 40, 46, C.blau, { tremol: 1.5 })}
${text(178, 407, t.arribar, { mida: 22, pes: 700, color: C.calc })}
${exemple(500, 30, ex)}`;
  },
  xat: (t, ex) => `${peca(90, 50, 460, 380, C.blanc, { junta: 6 })}
${peca(90, 50, 460, 50, C.verd, { tremol: 1 })}
${text(114, 84, t.web, { mida: 20, pes: 600, color: C.calc })}
${peca(250, 140, 270, 70, C.rostoll, { tremol: 2 })}
${text(272, 184, t.client, { mida: 26, pes: 700 })}
${peca(120, 236, 260, 70, C.blau, { tremol: 2 })}
${text(142, 280, t.resposta, { mida: 26, pes: 600, color: C.calc })}
${exemple(120, 360, ex)}`,
  // la placa de la taula amb un QR que porta de debò a la pàgina, i dos plats amb al·lèrgens
  carta: (t, ex) => `${peca(60, 50, 250, 380, C.blanc, { junta: 6 })}
${text(185, 104, t.carta, { mida: 36, pes: 800, ample: 115, ancora: 'middle' })}
<rect x="88" y="126" width="194" height="194" fill="${C.blanc}"/>
<path d="${qrCami(t.ruta, 98, 136, 6)}" fill="${C.blau}"/>
${text(185, 368, t.escaneja, { mida: 22, pes: 600, ancora: 'middle' })}
${t.plats.map(([plat, al], i) => `${peca(340, 110 + i * 130, 260, 110, C.blanc, { junta: 6 })}${text(362, 154 + i * 130, plat, { mida: 23, pes: 700 })}${peca(362, 172 + i * 130, al.length * 13 + 28, 34, C.rostoll, { tremol: 1 })}${text(376, 196 + i * 130, al, { mida: 19, pes: 700 })}`).join('')}
${exemple(340, 380, ex)}`,
  manteniment: (t, ex) => `${t.linies.map((l, i) => `${peca(90, 60 + i * 104, 460, 88, C.blau, { junta: 6 })}${tessela(118, 92 + i * 104, 24, C.rostoll)}${text(162, 114 + i * 104, l, { mida: 28, pes: 600, color: C.calc })}`).join('')}
${exemple(90, 384, ex)}`,
};

export const TE_VINYETA = id => id in DIBUIX;

export function vinyeta(id, lang) {
  if (!DIBUIX[id]) return null;
  llavor = [...id].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) % 2147483646 + 1;
  const t = T[lang][id];
  const cos = DIBUIX[id](t, T[lang].exemple);
  return `<svg class="vinyeta-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t.alt).replace(/"/g, '&quot;')}" font-family="Archivo, Arial, sans-serif">${cos}</svg>`;
}
