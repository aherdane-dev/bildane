// Construeix la web v2.
//   index.html, es/index.html                       portada
//   serveis/<servei>/index.html, es/servicios/…     pàgines de servei (les que tenen `pagina: true`)
//   sitemap.xml
// Els textos són a _eines/textos.mjs. Executa: npm run web
import fs from 'node:fs';
import path from 'node:path';
import { mosaic, pinta, html, fita } from './mosaic.mjs';
import { T, SERVEIS, FEINES } from './textos.mjs';
import { PAGINES } from './textos-serveis.mjs';
import { ENDPOINTS, LEGAL } from './config.mjs';
import { assistent as assistentHtml } from './assistent.mjs';
import { vinyeta } from './vinyetes.mjs';
const assistent = (t, nivell) => assistentHtml(t.lang, nivell, ENDPOINTS.assistent);

// El retrat d'en Bilal (director D3). Encara no n'hi ha cap: no s'hi posa cap foto de banc,
// ni generada, ni cap silueta. Quan n'hi hagi una, s'afegeix a _fotos/ com la resta
// (duotò i gra) i se'n posa aquí l'id: surt al bloc del Pla, al contacte i, petita, al hero,
// en llocs que el CSS ja té preparats (.retrat). Vegeu _disseny/REVISAR.md.
const RETRAT = null;

// La peça de color de la vinyeta de cada servei (director D16): les pàgines no són còpies.
const COLOR_SERVEI = { telefon: 'blau', webs: 'blau', xat: 'verd', carta: 'verd', botiga: 'rostoll', albarans: 'rostoll', google: 'blanc', manteniment: 'blanc' };

// Textos curts que són del disseny (director D1 i D23), no de la redacció.
const DISSENY = {
  ca: { tira: { telefon: 'Assistent telefònic', albarans: 'Albarans amb IA', webs: 'Webs i botigues', google: 'Google i el mapa' }, tiraNom: 'Els serveis principals',
    captura: 'Captura de la web publicada', copia: 'Copia', copiat: 'Copiat', copiaCorreu: 'Copia el correu', copiaTelefon: 'Copia el telèfon', retrat: 'En Bilal, a Mollerussa' },
  es: { tira: { telefon: 'Asistente telefónico', albarans: 'Albaranes con IA', webs: 'Webs y tiendas', google: 'Google y el mapa' }, tiraNom: 'Los servicios principales',
    captura: 'Captura de la web publicada', copia: 'Copiar', copiat: 'Copiado', copiaCorreu: 'Copiar el correo', copiaTelefon: 'Copiar el teléfono', retrat: 'Bilal, en Mollerussa' },
};

const NOMS_FOTOS = JSON.parse(fs.readFileSync('_fotos/noms.json', 'utf8'));

const URL_WEB = 'https://bildane.com';
const mides = JSON.parse(fs.readFileSync('assets/fotos/mides.json', 'utf8'));
const credits = JSON.parse(fs.readFileSync('_fotos/credits.json', 'utf8'));
// retalls: es citen com la foto de la qual surten
credits['planol-detall'] = credits['planol-1890'];

// ---------- utilitats ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const llavor = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
// L'enllaç de WhatsApp amb el missatge ja escrit: el general de la pàgina o el del servei.
const whatsapp = (t, text = t.whatsappText) => `https://wa.me/34643844107?text=${encodeURIComponent(text)}`;
// El correu amb l'assumpte ja escrit (Albarans i Webs el donen com a segona via).
const correu = assumpte => `mailto:hola@bildane.com${assumpte ? `?subject=${encodeURIComponent(assumpte)}` : ''}`;
// Com parla cada pàgina: el missatge de WhatsApp, el botó, la línia de sota, el correu
// i el bloc de contacte. Sense servei, els de la portada; a Albarans, en «vosaltres».
function veu(t, s) {
  const x = s?.[t.lang] || {};
  return {
    wa: x.wa || t.whatsappText,
    boto: x.vos?.whatsapp || t.whatsapp,
    nota: x.vos?.notaBoto || t.notaBoto,
    correu: x.correu ? { assumpte: x.correu, via: x.vos?.correuVia || t.correuVia } : null,
    contacte: { ...t.contacte, ...x.vos?.contacte },
  };
}
// La línia de sota el botó i, si n'hi ha, el correu com a segona via.
const notes = v => `<p class="nota-boto">${v.nota}</p>${v.correu ? `
        <p class="nota-correu">${v.correu.via} <a href="${correu(v.correu.assumpte)}">hola@bildane.com</a></p>` : ''}`;
const marca =() => fita({ mida: '1.15em', color: 'var(--blau)', junta: 'none', gruix: 0 });

let usades = new Set();
const srcset = id => { usades.add(id); return mides[id].amplades.map(w => `/assets/fotos/${id}-${w}.webp ${w}w`).join(', '); };
const foto = (id, sizes, { alt = '', carrega = 'lazy', posicio = '' } = {}) =>
  `<img${posicio ? ` style="object-position:${posicio}"` : ''} src="/assets/fotos/${id}-800.webp" srcset="${srcset(id)}" sizes="${sizes}" alt="${esc(alt)}" loading="${carrega}" decoding="async">`;

// Una peça de trencadís per a cada foto: quatre o cinc vèrtexs, cap angle recte.
// La cantonada trencada només surt a les peces grans (més de 40vw), una per pantalla
// com a molt (director D19): a les petites semblava un error de pintat.
function tall(seed, gran = false) {
  const r = llavor(seed * 977 + 13);
  const v = n => (r() * n).toFixed(1);
  const pts = [`${v(4)}% ${v(5)}%`, `${(100 - r() * 3).toFixed(1)}% 0%`, `100% ${(96 - r() * 6).toFixed(1)}%`, `${(97 - r() * 4).toFixed(1)}% 100%`, `0% ${(98 - r() * 4).toFixed(1)}%`];
  // la meitat de les peces tenen una cantonada trencada
  if (r() > .5 && gran) pts.splice(1, 0, `${(62 + r() * 20).toFixed(1)}% ${(r() * 2).toFixed(1)}%`, `${(78 + r() * 10).toFixed(1)}% ${(7 + r() * 6).toFixed(1)}%`);
  return `polygon(${pts.join(', ')})`;
}

// ---------- el mosaic del hero ----------
const PESOS = { verd: 26, blanc: 32, rostoll: 18, blau: 12 };
// Fotos reals del Pla (detector IA5 i IA38): el tractor de la rotonda i el canal a Mollerussa.
const FOTOS_HERO = ['perers-flor', 'planol-detall', 'mercat', 'canal-mollerussa', 'tractor-fordson', 'canal-boira'];

// Peces esbotzades al voltant de Mollerussa: cada una s'allunya de la fita
// i gira; el scroll les torna al seu lloc. Les del costat del titular es
// desvien en vertical perquè no hi passin per sobre.
function esbotza(w, centre, forca, s) {
  const r = llavor(s);
  return p => {
    const dx = (p.c[0] - centre[0]) / w * 100, dy = (p.c[1] - centre[1]) / w * 100;
    const d = Math.hypot(dx, dy) || 1;
    const m = forca * (0.35 + d / 60) * (0.7 + r() * 0.6);
    const ex = dx < 0 ? dx * 0.25 : dx, ey = dx < 0 ? dy * 1.6 + Math.sign(dy || 1) * 4 : dy;
    const k = Math.min(1, d / 75);
    return `;--dx:${(ex / d * m).toFixed(2)};--dy:${(ey / d * m).toFixed(2)};--gir:${((r() - .5) * 40).toFixed(1)};--k:${k.toFixed(3)}${p.amagada ? ';--t:1' : ''}`;
  };
}

function capaMosaic({ w, h, poble, cfg, fotos, mult, lloc, s }) {
  const peces = mosaic({ w, h, junta: 4, trencat: .06, parcela: [4200, 60000], reservesAmagades: true, ...cfg });
  pinta(peces, { llavor: cfg.llavor, fotos, minFotoArea: cfg.minFoto ?? 20000, separacio: cfg.separacio ?? 260, pesos: PESOS });
  const imatge = (id, frac) => `<img src="/assets/fotos/${id}-800.webp" srcset="${srcset(id)}" sizes="${Math.max(8, Math.ceil(frac * 100 * mult))}vw" alt="" loading="lazy" decoding="async">`;
  const cx = poble[0] / w * 100, cy = poble[1] / h * 100;
  const cos = html(peces, { w, h, imatge, vars: esbotza(w, poble, 9, s) })
    + `\n<div class="fita" style="left:${cx}%;top:${cy}%">${fita({ mida: 'var(--fita, 4.6rem)' })}</div>`
    + `\n<p class="lloc" style="left:${cx}%;top:${cy}%">${lloc}</p>`;
  return { cos, estil: `--prop:${w / h};--ox:${cx}%;--oy:${cy}%;--sx:${(cx - 50).toFixed(2)}%;--sy:${(cy - 50).toFixed(2)}%` };
}

function heroi(t) {
  const gran = capaMosaic({
    w: 1600, h: 900, poble: [1230, 560], fotos: FOTOS_HERO, mult: 1.1, lloc: t.lloc, s: 3,
    cfg: {
      llavor: 21, poble: { punt: [1230, 560], radi: 420 }, separacio: 280,
      canal: { punt: [1200, 230], angle: -15, ample: 24 },
      sequies: [{ punt: [1100, 700], angle: 72, ample: 13 }, { punt: [1440, 700], angle: 80, ample: 13 }],
      reserves: [[[0, 0], [1060, 0], [960, 690], [0, 760]]],
    },
  });
  const petit = capaMosaic({
    w: 900, h: 1700, poble: [450, 1430], fotos: FOTOS_HERO.slice(0, 4), mult: 1.1, lloc: t.lloc, s: 5,
    cfg: {
      llavor: 6, poble: { punt: [450, 1430], radi: 320 }, parcela: [6000, 60000], minFoto: 18000, separacio: 260,
      canal: { punt: [450, 1290], angle: -16, ample: 22 },
      sequies: [{ punt: [280, 1560], angle: 70, ample: 12 }, { punt: [690, 1560], angle: 80, ample: 12 }],
      reserves: [[[0, 0], [900, 0], [900, 1130], [0, 1230]]],
    },
  });
  // la tira de quatre peces (director D1): els serveis principals, enllaçats, dins la primera pantalla
  const d = DISSENY[t.lang];
  const tira = ['telefon', 'albarans', 'webs', 'google'].map(id => SERVEIS.find(s => s.id === id))
    .map(s => `<li class="tira-${s.id}"><a href="${s.ruta[t.lang]}">${d.tira[s.id]}</a></li>`).join('');
  return `
  <section class="heroi" data-scroll data-quiet="0.55" aria-labelledby="titol">
    <div class="escena">
      <div class="pla" aria-hidden="true">
        <div class="mosaic mosaic-gran" style="${gran.estil}">${gran.cos}</div>
        <div class="mosaic mosaic-petit" style="${petit.estil}">${petit.cos}</div>
      </div>
      <div class="titular">
        <h1 id="titol">${t.h1.map(l => `<span>${l}</span>`).join(' ')}</h1>
        <p class="sub">${t.sub}</p>
        <ul class="tira" aria-label="${d.tiraNom}">${tira}</ul>
        <div class="accions"><a class="boto" href="${whatsapp(t)}">${t.whatsapp}</a></div>
        <p class="nota-boto">${RETRAT ? `<span class="retrat retrat-petit gra">${foto(RETRAT, '56px', { carrega: 'eager' })}</span>` : ''}${t.notaBoto}</p>
      </div>
      <p class="coords">${t.coords}</p>
    </div>
  </section>`;
}

// Text alternatiu de les fotos que diuen alguna cosa (les de decoració porten alt="").
const fotosJson = JSON.parse(fs.readFileSync('_fotos/fotos.json', 'utf8'));
const altFoto = (id, t) => fotosJson.find(x => x.id === id)?.['alt_' + t.lang] || '';

// El Pla en fotos: un trencadís on cada peça és una foto real de la comarca.
// Totes del Pla d'Urgell (detector IA38): fora Aitona i Alcoletge, que són del Segrià.
const FOTOS_PLA = ['mollerussa-aire', 'mercat', 'nau-miralcamp', 'pla-tempesta', 'canal-bicis', 'tractor', 'boira-estany', 'torregrossa-aire', 'estany-ivars'];
// només els pobles que sabem segur (de la fitxa de Wikimedia)
const POBLES = { 'mollerussa-aire': 'Mollerussa', mercat: 'Mollerussa', 'nau-miralcamp': 'Miralcamp', 'canal-bicis': 'Tornabous', 'boira-estany': 'Bellpuig', 'torregrossa-aire': 'Torregrossa', 'estany-ivars': "Ivars d'Urgell" };
function pla(t) {
  // amb retrat, el retrat ocupa la segona peça (director D3); sense, hi va la foto
  const fotos = RETRAT ? [FOTOS_PLA[0], RETRAT, ...FOTOS_PLA.slice(2)] : FOTOS_PLA;
  return `
  <section class="capitol pla-fotos fons-calc" id="pla" aria-labelledby="t-pla">
    <div class="pla-text">
      <h2 class="seccio-titol" id="t-pla">${t.pla.titol}</h2>
      <p class="seccio-intro">${t.pla.text}</p>
      <p class="pla-jo">${fita({ mida: null, color: 'var(--rostoll)', junta: 'none', gruix: 0 })}<span>${t.pla.jo}</span></p>
    </div>
    <div class="pla-peces">${fotos.map((id, i) => {
      const retrat = id === RETRAT, peu = retrat ? DISSENY[t.lang].retrat : POBLES[id];
      return `
      <figure class="pp pp-${i + 1}${retrat ? ' retrat' : ''}"><div class="pp-foto foto-moguda gra" data-prog style="clip-path:${tall(i + 70, i === 0)}">${foto(id, i ? '(max-width: 760px) 50vw, 30vw' : '(max-width: 760px) 100vw, 60vw', { alt: altFoto(id, t) })}</div>${peu ? `<figcaption>${peu}</figcaption>` : ''}</figure>`; }).join('')}
    </div>
  </section>`;
}

// ---------- peces de pàgina ----------
function capcalera(t, altraRuta, aquesta, v = veu(t)) {
  return `
<a class="salt" href="#inici">${t.salt}</a>
<header class="cap">
  <a class="marca" href="${t.inici}" aria-label="${t.marcaInici}">${marca()}bildane</a>
  <a class="llengua" href="${altraRuta}" lang="${t.altraLang}" hreflang="${t.altraLang}">${t.altraNom}</a>
  <a class="wa" href="${whatsapp(t, v.wa)}">${t.menuWhatsapp}</a>
  <button class="obre" type="button" aria-expanded="false" aria-controls="menu">${t.menu}</button>
</header>
<nav class="menu sobre-fosc" id="menu" aria-label="${t.menu}" hidden>
  <div class="menu-contacte">
    <a class="boto" href="${whatsapp(t, v.wa)}">${v.boto}</a>
    <a href="tel:+34643844107">643 844 107</a>
    <a href="${altraRuta}" lang="${t.altraLang}" hreflang="${t.altraLang}">${t.altraNom}</a>
  </div>
  <button class="tanca" type="button">${t.tanca}</button>
  <ul class="menu-serveis">
    ${SERVEIS.map(s => `<li><a href="${s.ruta[t.lang]}">${s[t.lang].nom}</a></li>`).join('\n    ')}
  </ul>
  <ul class="menu-altres">
    <li><a href="${t.inici}#feines">${t.feinesTitol}</a></li>
    <li><a href="${t.inici}#com-treballo">${t.passosTitol}</a></li>
    ${ENDPOINTS.radiografia ? `<li><a href="${t.inici}#radiografia">${t.radiografiaMenu}</a></li>\n    ` : ''}<li><a href="${t.inici}#preguntes">${t.faqTitol}</a></li>
    <li><a href="${t.inici}#contacte">${t.contacte.menu}</a></li>
  </ul>
</nav>`;
}

// La radiografia. Amb worker analitza la web; sense worker, el formulari demana
// la radiografia per WhatsApp i no ensenya cap resultat (res d'exemples que puguin enganyar).
function radiografia(t) {
  const r = t.radiografia, viva = Boolean(ENDPOINTS.radiografia);
  const textos = { notes: r.notes, analitzant: r.analitzant, errors: r.errors, arreglaText: r.arreglaText, demanaText: r.demanaText, enviada: r.enviada };
  return `
  <section class="capitol radiografia fons-calc" id="radiografia" aria-labelledby="t-radiografia" data-endpoint="${ENDPOINTS.radiografia}">
    <script type="application/json" class="rg-textos">${JSON.stringify(textos)}</script>
    <div class="rg-cap">
      <h2 class="seccio-titol" id="t-radiografia">${r.titol}</h2>
      <p class="seccio-intro">${viva ? r.intro : r.introManual}</p>
      <form class="rg-form" novalidate>
        <label for="rg-url">${r.etiqueta}</label>
        <div class="rg-fila">
          <input id="rg-url" name="url" inputmode="url" autocomplete="url" spellcheck="false" placeholder="${esc(r.placeholder)}" aria-describedby="rg-error">
          <button class="boto" type="submit">${viva ? r.boto : r.botoManual}</button>
        </div>
        <p class="rg-error" id="rg-error" role="alert"></p>
        <p class="rg-enviada" aria-live="polite"></p>
      </form>
    </div>${viva ? `
    <div class="rg-resultat" aria-live="polite" aria-busy="false" hidden>
      <p class="rg-estat"></p>
      <div class="rg-trencadis"></div>
      <ul class="rg-troballes"></ul>
      <a class="boto rg-arregla" href="https://wa.me/34643844107">${r.arregla}</a>
    </div>` : ''}
  </section>`;
}

// La vinyeta d'un servei dins la seva peça de color (si el fons ja és d'aquest color, en blanc).
function pecaVinyeta(s, t, classe = '', fons = '') {
  const v = vinyeta(s.id, t.lang);
  if (!v) return '';
  const color = COLOR_SERVEI[s.id] === fons ? 'blanc' : COLOR_SERVEI[s.id];
  return `<div class="vinyeta v-${color}${classe ? ` ${classe}` : ''}">${v}</div>`;
}

function capitolServei(s, i, t) {
  const x = s[t.lang];
  const mes = s.pagina ? `<a class="mes-sobre" href="${s.ruta[t.lang]}">${t.mesSobre}<span class="visualment-amagat">: ${x.nom}</span></a>` : '';
  // la segona peça ensenya el producte (director D8): la vinyeta; si no n'hi ha, la foto de detall
  const detall = pecaVinyeta(s, t, 'detall', s.fons) || (s.detall ? `<div class="detall foto-moguda gra" data-prog style="clip-path:${tall(i + 31)}">${foto(s.detall, '(max-width: 860px) 60vw, 30vw', { alt: altFoto(s.detall, t) })}</div>` : '');
  return `
  <section class="capitol servei fons-${s.fons}${i % 2 ? ' revers' : ''}${s.fons === 'verd' ? ' sobre-fosc' : ''}${s.foto ? '' : ' sense-foto'}" id="${s.id}" aria-labelledby="nom-${s.id}">
    <p class="paraula" aria-hidden="true" style="--n:${x.paraula.length}">${x.paraula}</p>${s.foto ? `
    <div class="foto foto-moguda gra" data-prog style="clip-path:${tall(i + 1, true)}">${foto(s.foto, '(max-width: 860px) 100vw, 80vw', { posicio: s.posicio })}</div>
    ${detall}` : ''}
    <div class="text">
      ${x.etiqueta ? `<p class="servei-etiqueta">${x.etiqueta}</p>\n      ` : ''}<h2 class="nom" id="nom-${s.id}">${x.nom}</h2>
      <p>${x.text}</p>
      <ul class="tesseles">${x.punts.map(p => `<li>${p}</li>`).join('')}</ul>
      ${mes}
    </div>${s.demo ? assistent(t) : ''}
  </section>`;
}

// Els serveis amb capítol gran a la portada; la resta només surten a l'índex.
const GRANS = ['telefon', 'albarans', 'webs'];

// Índex de serveis (segona pantalla de la portada): una fila per servei, en l'ordre de
// SERVEIS, amb la paraula, una frase i el nom complet enllaçat a la pàgina.
// Marcatge nou (D10): l'ha d'estilitzar el dissenyador.
function indexServeis(t) {
  return `
  <section class="capitol index-serveis fons-calc" id="serveis" aria-labelledby="t-serveis">
    <h2 class="seccio-titol" id="t-serveis">${t.serveisIndex}</h2>
    <ol class="is-files">${SERVEIS.map(s => { const x = s[t.lang]; return `
      <li class="is-fila is-${s.id}"${GRANS.includes(s.id) ? '' : ` id="${s.id}"`}>
        <span class="is-paraula" aria-hidden="true">${x.paraula}</span>
        <p class="is-linia">${x.linia}</p>
        <a class="is-nom" href="${s.ruta[t.lang]}">${x.nom}</a>${x.etiqueta ? `
        <span class="is-etiqueta">${x.etiqueta}</span>` : ''}
      </li>`; }).join('')}
    </ol>
  </section>`;
}

function feines(t, quines = FEINES.map(f => f.id), titol = t.feinesTitol) {
  return `
  <section class="capitol fons-blau sobre-fosc" id="feines" aria-labelledby="t-feines">
    <div class="feines-cap">
      <h2 id="t-feines">${titol}</h2>
      <p>${quines.length === 1 ? t.feinesIntroUna : t.feinesIntro}</p>
    </div>
    ${FEINES.filter(f => quines.includes(f.id)).map(f => { const x = f[t.lang]; return `
    <article class="feina" aria-labelledby="feina-${f.id}">
      <h3 id="feina-${f.id}">${f.nom}</h3>
      <figure class="escriptori">
        <div class="captura"><img src="/assets/feines/${f.id}-escriptori-960.webp" srcset="/assets/feines/${f.id}-escriptori-960.webp 960w, /assets/feines/${f.id}-escriptori-1440.webp 1440w" sizes="(max-width: 860px) 85vw, 65vw" alt="${esc(x.alt[0])}" width="1440" height="900" loading="lazy" decoding="async"></div>
        <figcaption>${DISSENY[t.lang].captura}</figcaption>
      </figure>
      <figure class="mobil">
        <img src="/assets/feines/${f.id}-mobil-390.webp" srcset="/assets/feines/${f.id}-mobil-390.webp 390w, /assets/feines/${f.id}-mobil-780.webp 780w" sizes="(max-width: 860px) 40vw, 22vw" alt="${esc(x.alt[1])}" width="390" height="844" loading="lazy" decoding="async">
      </figure>
      <div class="dades">
        <p class="tipus">${x.tipus}${f.lloc && !x.tipus.includes(f.lloc) ? `, ${f.lloc}` : ''}</p>
        <p>${x.text}</p>
        <dl class="fitxa">${x.fitxa.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
        <a class="enllac-fort" href="${f.url}">${t.obre} ${f.domini}</a>
      </div>
    </article>`; }).join('')}
  </section>`;
}

function passos(t) {
  return `
  <section class="capitol fons-calc" id="com-treballo" aria-labelledby="t-passos">
    <h2 class="seccio-titol" id="t-passos">${t.passosTitol}</h2>${t.passosIntro ? `
    <p class="seccio-intro">${t.passosIntro}</p>` : ''}
    <ol class="passos">${t.passos.map(([titol, text]) => `
      <li class="pas">
        <h3>${titol}</h3>
        <p>${text}</p>
      </li>`).join('')}
    </ol>
  </section>`;
}

// Preguntes freqüents. Cada parell és [pregunta, resposta] o [pregunta, resposta, { wa, enllac }]:
// amb el tercer, la resposta acaba amb un enllaç de WhatsApp amb el missatge ja escrit.
function preguntes(t, parells = t.faq) {
  // la creu de dues barres que passa a «−» quan la pregunta és oberta (director D20)
  const creu = '<span class="creu" aria-hidden="true"></span>';
  return `
  <section class="capitol fons-calc" id="preguntes" aria-labelledby="t-faq">
    <h2 class="seccio-titol" id="t-faq">${t.faqTitol}</h2>
    <div class="preguntes">${parells.map(([q, r, enllac]) => `
      <details>
        <summary>${q}${creu}</summary>
        <p>${r}${enllac ? ` <a href="${whatsapp(t, enllac.wa)}">${enllac.enllac}</a>` : ''}</p>
      </details>`).join('')}
    </div>
  </section>`;
}

// Un botó per copiar el correu o el telèfon, que diu «Copiat» (director D17, recerca 3).
// Surt amagat i el mostra assets/v2.js si el navegador pot copiar.
const copia = (t, valor, etiqueta) => `<button class="copia" type="button" data-copia="${valor}" data-fet="${DISSENY[t.lang].copiat}" aria-label="${etiqueta}" hidden>${DISSENY[t.lang].copia}</button>`;

function contacte(t, v = veu(t)) {
  const c = v.contacte, d = DISSENY[t.lang];
  return `
  <section class="capitol contacte fons-blau sobre-fosc${RETRAT ? ' amb-retrat' : ''}" id="contacte" data-prog aria-labelledby="t-contacte">
    <div class="fita-gran" aria-hidden="true">${fita({ mida: null, color: 'var(--rostoll)', junta: 'var(--blau)', gruix: .05 })}</div>
    <h2 id="t-contacte">${c.titol}</h2>
    <p>${c.text}</p>
    <div class="accions">${RETRAT ? `<span class="retrat retrat-contacte gra" style="clip-path:${tall(201)}">${foto(RETRAT, '7rem', { alt: d.retrat })}</span>` : ''}<a class="boto" href="${whatsapp(t, v.wa)}">${v.boto}</a></div>
    <p class="nota-boto">${v.nota}</p>
    <ul class="vies">
      <li><span class="via-nom">${c.correu}:</span> <a href="${correu(v.correu?.assumpte)}">hola@bildane.com</a> ${copia(t, 'hola@bildane.com', d.copiaCorreu)}</li>
      <li><span class="via-nom">${c.telefon}:</span> <a href="tel:+34643844107">643 844 107</a> ${copia(t, '643 844 107', d.copiaTelefon)}</li>
    </ul>
    <p class="copia-estat visualment-amagat" aria-live="polite"></p>
    <p class="on">${c.on}</p>
  </section>`;
}

// crèdit de la lletra: va lligat als fitxers d'assets/fonts/, no als textos
const LLETRA = {
  ca: `Tipografia Archivo, d'Omnibus-Type, amb llicència <a href="/assets/fonts/OFL.txt">SIL Open Font License</a>.`,
  es: 'Tipografía Archivo, de Omnibus-Type, con licencia <a href="/assets/fonts/OFL.txt">SIL Open Font License</a>.',
};

function peu(t) {
  const p = { ...t.peu, lletra: LLETRA[t.lang] };
  const files = [...usades].filter(id => credits[id]).map(id => {
    const c = credits[id], nom = NOMS_FOTOS[id]?.[t.lang] || id;
    const autor = c.autor.replace(/^User:/, '').replace(/ \(talk\)$/, '').replace(/^Author of the assembly: (.+?) Author.*$/, '$1');
    if (c.font === 'Unsplash') return `<li><a href="${c.enllac}">${nom}</a>, de ${autor} ${p.unsplash}.</li>`;
    if (/^(CC0|Public domain)$/i.test(c.llicencia)) return `<li><a href="${c.enllac}">${nom}</a>, ${p.domini} (Wikimedia Commons).</li>`;
    const llic = c.llicencia_url ? `<a href="${c.llicencia_url}">${c.llicencia}</a>` : c.llicencia;
    return `<li><a href="${c.enllac}">${nom}</a>, de ${autor}, ${p.llicencia} ${llic}, ${p.modificada} (Wikimedia Commons).</li>`;
  });
  return `
<footer class="peu">
  <div>
    <p class="marca">${marca()}bildane</p>
    <p>© 2026 Bildane, Mollerussa (Pla d'Urgell).</p>
    <p>${p.signatura}</p>
    <p class="legal"><a href="${RUTES_LEGALS.avis[t.lang]}">${t.legal.avis}</a> <a href="${RUTES_LEGALS.privacitat[t.lang]}">${t.legal.privacitat}</a></p>
  </div>
  <div class="peu-vies">
    <p class="peu-titol">${t.contacte.menu}</p>
    <ul>
      <li><a href="${whatsapp(t)}">WhatsApp</a></li>
      <li><a href="tel:+34643844107">643 844 107</a></li>
      <li><a href="mailto:hola@bildane.com">hola@bildane.com</a></li>
    </ul>
  </div>
  <nav class="peu-serveis" aria-label="${t.serveisTitol}">
    <p class="peu-titol">${t.serveisTitol}</p>
    <ul>${SERVEIS.map(s => `<li><a href="${s.ruta[t.lang]}">${s[t.lang].nom}</a></li>`).join('')}</ul>
  </nav>
  ${files.length ? '' : `<p class="credits-sols">${p.lletra}</p>`}<details class="credits-plegats"${files.length ? '' : ' hidden'}>
    <summary>${t.legal.creditsResum} (${files.length}) <span class="creu" aria-hidden="true"></span></summary>
    <p>${p.nota}</p>
    <ul class="credits">
      ${files.join('\n      ')}
      <li>${p.lletra}</li>
    </ul>
  </details>
</footer>`;
}

const RUTES_LEGALS = {
  avis: { ca: '/avis-legal/', es: '/es/aviso-legal/' },
  privacitat: { ca: '/privacitat/', es: '/es/privacidad/' },
};

function negoci(t) {
  return {
    '@type': 'ProfessionalService', '@id': `${URL_WEB}/#negoci`, name: 'Bildane',
    url: `${URL_WEB}${t.inici}`, description: t.descripcio, image: `${URL_WEB}/og.png`, logo: `${URL_WEB}/icon-512.png`,
    email: 'hola@bildane.com', telephone: '+34643844107', priceRange: '€',
    founder: { '@type': 'Person', name: 'Bilal' },
    address: { '@type': 'PostalAddress', addressLocality: 'Mollerussa', postalCode: '25230', addressRegion: 'Lleida', addressCountry: 'ES' },
    geo: { '@type': 'GeoCoordinates', latitude: 41.6311, longitude: 0.8939 },
    areaServed: [{ '@type': 'City', name: 'Mollerussa' }, { '@type': 'AdministrativeArea', name: "Pla d'Urgell" }, { '@type': 'AdministrativeArea', name: 'Lleida' }, { '@type': 'AdministrativeArea', name: 'Catalunya' }],
    knowsLanguage: ['ca', 'es'],
    hasOfferCatalog: { '@type': 'OfferCatalog', name: t.serveisTitol, itemListElement: SERVEIS.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s[t.lang].nom } })) },
  };
}

function document_({ t, titol, descripcio, ruta, rutes, jsonld, cos, imatge = '/og.png', indexable = true }) {
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titol}</title>
<meta name="description" content="${esc(descripcio)}">${indexable ? '' : '\n<meta name="robots" content="noindex">'}
<link rel="canonical" href="${URL_WEB}${ruta}">
<link rel="alternate" hreflang="ca" href="${URL_WEB}${rutes.ca}">
<link rel="alternate" hreflang="es" href="${URL_WEB}${rutes.es}">
<link rel="alternate" hreflang="x-default" href="${URL_WEB}${rutes.ca}">
<meta name="theme-color" content="#F2F3EE">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Bildane">
<meta property="og:title" content="${esc(titol)}">
<meta property="og:description" content="${esc(descripcio)}">
<meta property="og:url" content="${URL_WEB}${ruta}">
<meta property="og:locale" content="${t.locale}">
<meta property="og:image" content="${URL_WEB}${imatge}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/bildane.css">
<link rel="stylesheet" href="/assets/v2.css">${cos.includes('class="assistent"') ? '\n<link rel="stylesheet" href="/assets/assistent.css">\n<script src="/assets/assistent.js" defer></script>' : ''}
<script src="/assets/v2.js" defer></script>
${jsonld.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': jsonld })}</script>` : ''}
</head>
<body>
${cos}
${peu(t)}
</body>
</html>
`;
}

// ---------- portada ----------
function portada(lang) {
  const t = T[lang];
  usades = new Set();
  const rutes = { ca: '/', es: '/es/' };
  const cos = `${capcalera(t, rutes[t.altraLang], t.inici)}
<main id="inici">
${heroi(t)}
${indexServeis(t)}
${SERVEIS.filter(s => GRANS.includes(s.id)).map((s, i) => capitolServei(s, i, t) + (s.id === 'webs' ? feines(t) : '')).join('\n')}
${pla(t)}
${passos(t)}
${preguntes(t)}
${ENDPOINTS.radiografia ? radiografia(t) : ''}
${contacte(t)}
</main>`;
  return document_({ t, titol: t.titol, descripcio: t.descripcio, ruta: t.inici, rutes, jsonld: [negoci(t), faqSchema(t.faq)], cos });
}

// ---------- pàgina de servei ----------
// Textos de cada pàgina: PAGINES (textos-serveis.mjs). Si encara no hi són,
// fa servir els de la portada perquè la pàgina no quedi mai buida.
function textosPagina(s, lang) {
  const x = s[lang], p = PAGINES[s.id]?.[lang];
  return p || {
    titolSeo: x.nom, descripcio: x.text, entradeta: x.text, etSona: [],
    comFunciona: null, perAQui: T[lang].pagina.perAQuiText, preguntes: [],
  };
}

// Altres serveis: una llista de noms en dues columnes, sense fotos (director D15 i D18).
function altresServeis(s, t) {
  return SERVEIS.filter(o => o !== s).map(o => `
      <li class="altre"><a href="${o.ruta[t.lang]}"><span class="altre-nom">${o[t.lang].paraula}</span> <span class="altre-linia">${o[t.lang].nom}</span></a></li>`).join('');
}

// La peça de la capçalera de servei: la foto (si n'hi ha) i la vinyeta del servei al costat.
// Webs no té vinyeta dibuixada: hi va la captura real de La Llàntia al mòbil (director D8).
function bandaServei(s, t) {
  const vin = s.id === 'webs'
    ? `<div class="vinyeta v-${COLOR_SERVEI.webs} vinyeta-pantalla"><img src="/assets/feines/la-llantia-mobil-390.webp" srcset="/assets/feines/la-llantia-mobil-390.webp 390w, /assets/feines/la-llantia-mobil-780.webp 780w" sizes="(max-width: 860px) 46vw, 16rem" alt="${esc(FEINES.find(f => f.id === 'la-llantia')[t.lang].alt[1])}" width="390" height="844" loading="eager" decoding="async"></div>`
    : pecaVinyeta(s, t);
  return `
    <div class="banda${s.foto ? '' : ' sense-foto'}">${s.foto ? `
      <div class="foto foto-moguda gra" data-prog style="clip-path:${tall(11, true)}">${foto(s.foto, '(max-width: 860px) 100vw, 66vw', { carrega: 'eager', posicio: s.posicio })}</div>` : ''}
      ${vin}
    </div>`;
}

function paginaServei(s, lang) {
  const t = T[lang], x = s[lang], pg = t.pagina, p = textosPagina(s, lang);
  usades = new Set();
  const ruta = s.ruta[lang];
  const galeria = (s.galeria || [s.detall]).filter(Boolean).slice(0, 2);
  const preguntesServei = p.preguntes.length ? p.preguntes : t.faq.slice(0, 3);
  const v = veu(t, s);
  // L'ordre segueix el que es pregunta qui arriba (psicologia.md, director.md D16):
  // és per a mi? (capçalera i «Et sona?») → ho veig (demo, prova o feines) → com és
  // (Com funciona) → les pors (Preguntes) → Contacte; «Altres serveis», al final.
  // «Què fa» i «Com treballo» ja no hi són (detector IA31 i IA32).
  const peca = s.demo ? `
  <section class="capitol fons-calc demo-servei">${assistent(t, 2)}
  </section>` : p.prova ? `
  <section class="capitol prova fons-calc" aria-labelledby="t-prova">
    <h2 class="seccio-titol" id="t-prova">${p.prova.titol}</h2>
    ${p.prova.paragrafs.map(par => `<p>${par}</p>`).join('\n    ')}
  </section>` : s.id === 'webs' ? feines(t) : s.id === 'botiga' ? feines(t, ['reve-padel']) : '';
  const cos = `${capcalera(t, s.ruta[t.altraLang], ruta, v)}
<main id="inici">
  <section class="capitol fons-calc servei-cap" aria-labelledby="t-servei">
    <a class="tornar" href="${t.inici}#serveis">${pg.tornar}</a>
    <p class="paraula" aria-hidden="true" style="--n:${x.paraula.length}">${x.paraula}</p>
    <div class="text">
      <h1 id="t-servei">${x.nom}</h1>
      <div>
        <p class="entradeta">${p.entradeta}</p>
        <p class="servei-per-a-qui"><strong>${pg.perAQui}:</strong> ${p.perAQui}</p>
        <div class="accions"><a class="boto" href="${whatsapp(t, v.wa)}">${v.boto}</a></div>
        ${notes(v)}
      </div>
    </div>${bandaServei(s, t)}
  </section>
${p.etSona?.length ? `
  <section class="capitol et-sona fons-calc" aria-labelledby="t-et-sona">
    <h2 class="seccio-titol" id="t-et-sona">${x.vos ? pg.etSonaVos : pg.etSona}</h2>
    <ul class="et-sona-llista">${p.etSona.map(f => `
      <li>${f}</li>`).join('')}
    </ul>
  </section>` : ''}
${peca}
${p.comFunciona ? `
  <section class="capitol com-funciona fons-calc${galeria.length ? '' : ' sense-fotos'}" aria-labelledby="t-com-funciona">
    <div class="cf-text">
      <h2 class="seccio-titol" id="t-com-funciona">${p.comFunciona.titol}</h2>
      ${p.comFunciona.paragrafs.map(par => `<p>${par}</p>`).join('\n      ')}
    </div>
${galeria.length ? `
    <div class="cf-fotos">${galeria.map((id, i) => `
      <figure class="cf-foto cf-foto-${i + 1} foto-moguda gra" data-prog style="clip-path:${tall(i + 120 + s.id.length)}">${foto(id, '(max-width: 860px) 90vw, 40vw', { alt: altFoto(id, t) })}</figure>`).join('')}
    </div>` : ''}
  </section>` : ''}
${preguntes(t, preguntesServei)}
${contacte(t, v)}
  <section class="capitol fons-calc altres-serveis" aria-labelledby="t-altres">
    <h2 class="seccio-titol" id="t-altres">${pg.altres}</h2>
    <ul class="altres">${altresServeis(s, t)}
    </ul>
  </section>
</main>`;
  const servei = {
    '@type': 'Service', '@id': `${URL_WEB}${ruta}#servei`, name: x.nom, description: p.descripcio, url: `${URL_WEB}${ruta}`,
    serviceType: x.nom, provider: { '@id': `${URL_WEB}/#negoci` }, inLanguage: lang,
    areaServed: [{ '@type': 'City', name: 'Mollerussa' }, { '@type': 'AdministrativeArea', name: "Pla d'Urgell" }],
  };
  const molles = {
    '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Bildane', item: `${URL_WEB}${t.inici}` },
      { '@type': 'ListItem', position: 2, name: x.nom, item: `${URL_WEB}${ruta}` },
    ],
  };
  return document_({ t, titol: `${p.titolSeo} | Bildane`, descripcio: p.descripcio, ruta, rutes: s.ruta, jsonld: [negoci(t), servei, molles, faqSchema(preguntesServei)], cos, imatge: `/assets/og/${s.id}-${lang}.jpg` });
}

function faqSchema(parells) {
  return { '@type': 'FAQPage', mainEntity: parells.map(([q, r]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: r } })) };
}

// ---------- 404: aquí falta una peça ----------
function pagina404() {
  const t = T.ca, w = 1200, h = 640;
  usades = new Set();
  const peces = mosaic({ w, h, llavor: 404, junta: 5, trencat: .06, parcela: [5000, 52000], poble: { punt: [600, 330], radi: 360 },
    canal: { punt: [600, 140], angle: -10, ample: 22 }, sequies: [{ punt: [360, 480], angle: 72, ample: 12 }, { punt: [860, 480], angle: 80, ample: 12 }] });
  pinta(peces, { llavor: 404, fotos: [], pesos: PESOS });
  // la peça que falta: el camp més gran prop del centre
  const forat = peces.filter(p => p.tipus === 'camp' && Math.abs(p.c[0] - 640) < 220 && Math.abs(p.c[1] - 360) < 150).sort((a, b) => b.area - a.area)[0];
  forat.tipus = 'reserva';
  const b = forat.caixa;
  const clip = `clip-path:polygon(${forat.p.map(([x, y]) => `${((x - b.x) / b.w * 100).toFixed(2)}% ${((y - b.y) / b.h * 100).toFixed(2)}%`).join(',')})`;
  const mida = `width:${b.w / w * 100}%;height:${b.h / h * 100}%`;
  // el forat mostra el morter; la peça que hi anava ha caigut a fora, girada
  const mosaicHtml = html(peces, { w, h, imatge: () => '' })
    + `<div class="forat gra" style="left:${b.x / w * 100}%;top:${b.y / h * 100}%;${mida};${clip}"></div>`
    + `<div class="caiguda" style="left:6%;top:${(h - b.h * .45) / h * 100}%;${mida};${clip}"></div>`;
  return `<!doctype html>
<html lang="ca">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Aquí falta una peça | Bildane</title>
<meta name="robots" content="noindex">
<meta name="theme-color" content="#F2F3EE">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/bildane.css">
<link rel="stylesheet" href="/assets/v2.css">
<script>
// Adreces antigues o escrites a mà: si sabem on anaven, hi portem el visitant.
(() => {
  let p = location.pathname.toLowerCase();
  if (!p.endsWith('/') && !p.includes('.')) p += '/';
  const mapa = {
    '/index.html': '/', '/ca/': '/', '/es/index.html': '/es/',
    '/serveis/': '/#serveis', '/servicios/': '/es/#serveis', '/es/servicios/': '/es/#serveis', '/es/serveis/': '/es/#serveis',
    '/contacte/': '/#contacte', '/contacto/': '/es/#contacte', '/es/contacto/': '/es/#contacte',
  };
  let desti = mapa[p];
  if (!desti && p.startsWith('/img/')) desti = '/';
  if (desti) location.replace(desti);
})();
</script>
</head>
<body>
<header class="cap">
  <a class="marca" href="/" aria-label="Bildane">${marca()}bildane</a>
  <a class="wa" href="${whatsapp(T.ca)}">WhatsApp</a>
</header>
<main class="error-404">
  <div class="mosaic e404-mosaic" aria-hidden="true" style="aspect-ratio:${w}/${h}">${mosaicHtml}</div>
  <div class="e404-text">
    <h1>Aquí falta una peça.</h1>
    <p>Aquesta pàgina no existeix o ha canviat de lloc.</p>
    <p class="e404-enllacos"><a class="boto" href="/">Torna a l'inici</a></p>
    <p><a class="e404-wa" href="${whatsapp(T.ca)}">o escriu-me per WhatsApp</a></p>
    <div lang="es">
      <p class="e404-es"><strong>Aquí falta una pieza.</strong> Esta página no existe o ha cambiado de sitio.</p>
      <p><a href="/es/">Volver al inicio</a></p>
    </div>
  </div>
</main>
</body>
</html>
`;
}

// ---------- avís legal i privacitat ----------
// Les dades del titular són a _eines/config.mjs (LEGAL). Si falten, la pàgina ho diu
// clarament: s'han d'omplir abans de publicar (vegeu _disseny/REVISAR.md).
const LEGALS = {
  ca: {
    avis: { titol: 'Avís legal', cos: l => `
      <p>Aquesta web, bildane.com, és d'en ${l.titular || '<mark>[nom i cognoms del titular, pendent]</mark>'}, amb NIF ${l.nif || '<mark>[pendent]</mark>'} i domicili a ${l.domicili}.</p>
      <p>Contacte: <a href="mailto:hola@bildane.com">hola@bildane.com</a> i <a href="tel:+34643844107">643 844 107</a>.</p>
      <h2>Què hi trobaràs</h2>
      <p>La web explica els serveis que ofereixo i com contactar-me. Els textos, el disseny i el codi són meus. Les fotos són d'altres autors, amb llicència lliure, i a cada pàgina hi ha els crèdits.</p>
      <h2>Les demos</h2>
      <p>L'assistent de la Pizzeria del Pla és una demostració: el restaurant és inventat i no s'hi pot fer cap comanda de veritat.</p>
      <h2>Enllaços</h2>
      <p>Hi ha enllaços a webs d'altres (els projectes, WhatsApp, Wikimedia Commons). No me'n faig responsable del contingut.</p>` },
    privacitat: { titol: 'Privacitat', cos: l => `
      <p>Responsable: ${l.titular || '<mark>[nom i cognoms del titular, pendent]</mark>'}, NIF ${l.nif || '<mark>[pendent]</mark>'}. Contacte: <a href="mailto:hola@bildane.com">hola@bildane.com</a>.</p>
      <h2>Quines dades tracto</h2>
      <p>Només les que tu m'envies quan m'escrius per WhatsApp, per correu o per telèfon: el teu nom, la manera de contactar-te i el que m'expliques del teu negoci. Les faig servir per respondre't i, si arribem a treballar junts, per fer la feina. No les cedeixo a ningú.</p>
      <h2>Galetes i estadístiques</h2>
      <p>Aquesta web no fa servir galetes ni eines d'estadístiques. La lletra i les imatges es carreguen des de la mateixa web. El navegador guarda una dada tècnica a la memòria de la pestanya (un identificador de sessió de la demo de l'assistent) que s'esborra en tancar-la.</p>
      <h2>La demo de l'assistent</h2>
      <p>El que escrius a la demo es fa servir només per respondre't i no es desa. Si fas servir el micròfon, el reconeixement de veu és del teu navegador: a Chrome i Edge l'àudio s'envia a Google o Microsoft per convertir-lo en text, amb les seves condicions. Si prefereixes, escriu.</p>
      <h2>Els teus drets</h2>
      <p>Pots demanar quines dades tinc teves, corregir-les o esborrar-les escrivint a <a href="mailto:hola@bildane.com">hola@bildane.com</a>. Si no estàs d'acord amb com les tracto, pots reclamar a l'Agència Espanyola de Protecció de Dades (aepd.es).</p>` },
  },
  es: {
    avis: { titol: 'Aviso legal', cos: l => `
      <p>Esta web, bildane.com, es de ${l.titular || '<mark>[nombre y apellidos del titular, pendiente]</mark>'}, con NIF ${l.nif || '<mark>[pendiente]</mark>'} y domicilio en ${l.domicili}.</p>
      <p>Contacto: <a href="mailto:hola@bildane.com">hola@bildane.com</a> y <a href="tel:+34643844107">643 844 107</a>.</p>
      <h2>Qué encontrarás</h2>
      <p>La web explica los servicios que ofrezco y cómo contactarme. Los textos, el diseño y el código son míos. Las fotos son de otros autores, con licencia libre, y en cada página están los créditos.</p>
      <h2>Las demos</h2>
      <p>El asistente de la Pizzería del Pla es una demostración: el restaurante es inventado y no se puede hacer ningún pedido de verdad.</p>
      <h2>Enlaces</h2>
      <p>Hay enlaces a webs de otros (los proyectos, WhatsApp, Wikimedia Commons). No me hago responsable de su contenido.</p>` },
    privacitat: { titol: 'Privacidad', cos: l => `
      <p>Responsable: ${l.titular || '<mark>[nombre y apellidos del titular, pendiente]</mark>'}, NIF ${l.nif || '<mark>[pendiente]</mark>'}. Contacto: <a href="mailto:hola@bildane.com">hola@bildane.com</a>.</p>
      <h2>Qué datos trato</h2>
      <p>Solo los que tú me envías cuando me escribes por WhatsApp, por correo o por teléfono: tu nombre, la forma de contactarte y lo que me cuentas de tu negocio. Los uso para responderte y, si llegamos a trabajar juntos, para hacer el trabajo. No los cedo a nadie.</p>
      <h2>Cookies y estadísticas</h2>
      <p>Esta web no usa cookies ni herramientas de estadísticas. La letra y las imágenes se cargan desde la misma web. El navegador guarda un dato técnico en la memoria de la pestaña (un identificador de sesión de la demo del asistente) que se borra al cerrarla.</p>
      <h2>La demo del asistente</h2>
      <p>Lo que escribes en la demo se usa solo para responderte y no se guarda. Si usas el micrófono, el reconocimiento de voz es de tu navegador: en Chrome y Edge el audio se envía a Google o Microsoft para pasarlo a texto, con sus condiciones. Si prefieres, escribe.</p>
      <h2>Tus derechos</h2>
      <p>Puedes pedir qué datos tengo tuyos, corregirlos o borrarlos escribiendo a <a href="mailto:hola@bildane.com">hola@bildane.com</a>. Si no estás de acuerdo con cómo los trato, puedes reclamar a la Agencia Española de Protección de Datos (aepd.es).</p>` },
  },
};

function paginaLegal(quina, lang) {
  const t = T[lang], d = LEGALS[lang][quina], ruta = RUTES_LEGALS[quina][lang];
  usades = new Set();
  const cos = `${capcalera(t, RUTES_LEGALS[quina][t.altraLang], ruta)}
<main id="inici" class="legal-pagina">
  <h1>${d.titol}</h1>
  <div class="legal-text">${d.cos({ ...LEGAL, nif: LEGAL.nif?.[t.lang] ?? LEGAL.nif })}
  </div>
</main>`;
  return document_({ t, titol: `${d.titol} | Bildane`, descripcio: `${d.titol}. Bildane, Mollerussa.`, ruta, rutes: RUTES_LEGALS[quina], jsonld: [], cos, indexable: false });
}

// ---------- escriptura ----------
const escriu = (fitxer, contingut) => { fs.mkdirSync(path.dirname(fitxer), { recursive: true }); fs.writeFileSync(fitxer, contingut); };
for (const lang of ['ca', 'es']) {
  escriu(lang === 'ca' ? 'index.html' : 'es/index.html', portada(lang));
  for (const s of SERVEIS.filter(s => s.pagina)) {
    escriu(`.${s.ruta[lang]}index.html`, paginaServei(s, lang));
  }
}
escriu('404.html', pagina404());
for (const quina of ['avis', 'privacitat']) for (const lang of ['ca', 'es']) escriu(`.${RUTES_LEGALS[quina][lang]}index.html`, paginaLegal(quina, lang));
const parelles = [{ ca: '/', es: '/es/' }, ...SERVEIS.filter(s => s.pagina).map(s => s.ruta)];
escriu('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${parelles.flatMap(p => ['ca', 'es'].map(l => `  <url>
    <loc>${URL_WEB}${p[l]}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <xhtml:link rel="alternate" hreflang="ca" href="${URL_WEB}${p.ca}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${URL_WEB}${p.es}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${URL_WEB}${p.ca}"/>
  </url>`)).join('\n')}
</urlset>
`);
console.log('ok:', parelles.flatMap(p => [p.ca, p.es]).join('  '));
// vocabulari del simulador de l'assistent (es baixa només quan algú hi escriu)
escriu('assets/assistent-simulador.json', JSON.stringify((await import('./assistent.mjs')).SIMULADOR));
