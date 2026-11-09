// Converses "rares" contra el simulador local de l'assistent (20 de la primera tanda
// i 10 més amb els casos que va trobar el crític final, escrivint com un client real).
// Ús: node _disseny/proves/assistent/converses.mjs   (servidor a http://localhost:8130)
// Comprova: (a) cap resposta repetida dins una conversa, (b) cap error de JavaScript,
// (c) les converses amb totes les dades acaben amb la comanda confirmada al tiquet,
// (d) l'assistent respon en la llengua del client, encara que no sigui la de la pàgina.
// I, on toca: que no respongui mai "no ho sé" a coses que ha d'entendre, que una pregunta
// no apunti cap pizza, el resum de la comanda al mòbil, la mida dels botons i el títol honest.
// Desa les transcripcions a converses.md i captures de l'estat final en aquesta carpeta.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE || 'http://localhost:8130';
const CA = '/serveis/assistent-telefonic/', ES = '/es/servicios/asistente-telefonico/';
const NO_HO_SAP = /Això no ho sé|No t'he entès|Em perdo|Eso no lo sé|No te he entendido|Me pierdo/;

// Cada pas: un text (s'escriu i s'envia), o { t, ll } amb la llengua esperada a partir d'aquí,
// { xip } per prémer una resposta ràpida, { tecles } per fer-ho amb el teclat, { t, envia } per enviar amb Tab i Enter des d'«Envia», { buit } per enviar
// un text buit, { llarg } per enviar un text de més de 300 caràcters, { t, senseComanda } per
// comprovar que després d'aquell pas el tiquet no té cap pizza.
// Per conversa: completa (valors del tiquet), mai (cap resposta hi pot encaixar),
// cal (cada patró l'ha de complir alguna resposta), mobil (390×844, amb el resum i els botons).
const converses = [
  { nom: '"hola", "si", "que" repetits (portada)', ruta: '/', ll: 'ca', passos: ['hola', 'si', 'que', 'hola', 'si', 'que', 'hola', 'si', 'que', 'hola', 'si', 'que'] },
  { nom: '"hola", "si", "que" repetits (portada castellana)', ruta: '/es/', ll: 'es', passos: ['hola', 'si', 'que', 'hola', 'si', 'que', 'hola', 'si', 'que', 'hola'] },
  { nom: 'Només salutacions', ruta: CA, ll: 'ca', passos: ['hola', 'bon dia', 'bona nit', 'bones', 'ei', { t: 'hola qué tal', ll: 'es' }, 'buenas'] },
  { nom: "Respostes d'una lletra", ruta: CA, ll: 'ca', passos: ['a', 's', 'n', 'x', 'j', '?', '1'] },
  { nom: '"què?" tres cops i més', ruta: CA, ll: 'ca', passos: ['què?', 'què?', 'què?', 'com?', 'perdona?', "no t'entenc", { t: '¿qué?', ll: 'es' }] },
  { nom: 'Canvi de llengua a mig camí (pàgina catalana)', ruta: CA, ll: 'ca', completa: { Tipus: 'Per emportar', Comanda: '2 margarites', Nom: 'Laura', Hora: '21:00' },
    passos: ['vull dues margarita per emportar', { t: 'perdona, mejor en castellano: me llamo Laura', ll: 'es' }, 'a las nueve', 'ok', 'sí'] },
  { nom: 'Client en català a la pàgina castellana', ruta: ES, ll: 'ca', completa: { Tipo: 'Reserva de mesa', Personas: '4', Día: 'Mañana', Nombre: 'Jordi', Hora: '21:30' },
    passos: ['Hola, vull reservar taula', 'som quatre', 'demà', 'em dic Jordi', 'a les 21:30', 'sí'] },
  { nom: 'Corregir la quantitat', ruta: CA, ll: 'ca', completa: { Comanda: '3 margarites, 1 barbacoa', Nom: 'Pere', Hora: '21:00' },
    passos: ['dues margarita per emportar', 'no, tres margarita', 'i una barbacoa', 'em dic Pere', 'a les 21:00', 'millor a les 22:00', 'no, a les 21:00', 'sí'] },
  { nom: "Canviar d'emportar a reserva", ruta: CA, ll: 'ca', completa: { Tipus: 'Reserva de taula', Persones: '2', Dia: 'Dissabte', Nom: 'Núria', Hora: '20:30' },
    passos: ['per emportar', 'una vegetal', 'canvia-ho a reserva', 'som 2 per dissabte', 'a nom de Núria', 'a les 20:30', 'sí'] },
  { nom: 'Pizza que no hi és', ruta: ES, ll: 'es', completa: { Pedido: '1 barbacoa', Nombre: 'Iván', Hora: '22:00' },
    passos: ['quiero una hawaiana', 'pues una carbonara', 'vale, una barbacoa', 'me llamo Iván', '22:00', 'sí'] },
  { nom: 'Preus, horari, adreça i persona', ruta: CA, ll: 'ca', passos: ['quant val una margarita?', 'a quina hora obriu?', 'on sou?', 'ets una persona?', 'vull parlar amb una persona', 'quins preus teniu?', 'quant costa?'] },
  { nom: 'Preguntes en castellà', ruta: ES, ll: 'es', passos: ['¿cuánto cuesta la pizza?', '¿qué horario tenéis?', '¿dónde estáis?', '¿qué pizzas hay?', '¿cuánto vale?', '¿eres un robot?'] },
  { nom: 'Números en lletra i en xifra', ruta: CA, ll: 'ca', completa: { Comanda: '2 margarites, 3 de quatre formatges', Nom: 'Marc', Hora: '21:30' },
    passos: ['vull 2 margarita i tres quatre formatges per emportar', 'a nom de Marc', 'a les nou i mitja', 'sí'] },
  { nom: 'Majúscules i sense accents', ruta: CA, ll: 'ca', completa: { Tipus: 'Reserva de taula', Persones: '6', Dia: 'Demà', Nom: 'Anna', Hora: '22:00' },
    passos: ['QUE TENIU', 'VULL RESERVAR TAULA', 'SOM SIS', 'DEMA', 'EM DIC ANNA', 'A LES 22:00', 'SI', 'gracies'] },
  { nom: 'Text buit', ruta: CA, ll: 'ca', passos: [{ buit: '' }, { buit: '   ' }, 'hola', { buit: '' }] },
  { nom: '300 caràcters', ruta: ES, ll: 'es', passos: [{ llarg: 'quiero pedir unas pizzas para llevar pero antes quiero contarte una historia muy larga '.repeat(5) }, 'dos margaritas', { llarg: 'x'.repeat(400) }] },
  { nom: 'Només amb els botons i el teclat (català)', ruta: CA, ll: 'ca', completa: { Tipus: 'Reserva de taula', Persones: '4', Dia: 'Dissabte', Nom: 'Marta', Hora: '21:00' }, captura: 'final-ca',
    passos: [{ xip: 'Reservar taula' }, { tecles: ['Tab', 'Enter'], diu: '4' }, { xip: 'Dissabte' }, 'Marta', { xip: '21:00' }, { xip: 'Sí' }] },
  { nom: 'Només amb els botons (castellà)', ruta: ES, ll: 'es', completa: { Pedido: '2 margaritas, 1 de jamón', Nombre: 'Pau', Hora: '22:00' }, captura: 'final-es',
    passos: [{ xip: 'Para llevar' }, { xip: 'Margarita' }, { xip: 'Margarita' }, { xip: 'Jamón' }, 'Pau', { xip: '20:00' }, { xip: 'No, quiero cambiar' }, { xip: 'La hora' }, { xip: '22:00' }, { xip: 'Sí' }] },
  { nom: 'Seguir escrivint després de completar', ruta: CA, ll: 'ca', completa: { Comanda: '1 vegetal', Nom: 'Joan', Hora: '20:00' },
    passos: ['dues pernil per emportar a nom de Joan a les 21:00', 'sí', 'gràcies', 'hola', 'gràcies', 'que', 'millor a les 22:00', 'sí', 'adéu', 'si', 'ok', { xip: 'Fer-ne una altra' }, 'per emportar', 'una vegetal', 'em dic Joan', 'a les 20:00', 'sí'] },
  { nom: 'Reserva, correcció i anul·lació (portada)', ruta: '/', ll: 'es', completa: { Tipus: 'Per emportar', Comanda: '2 de quatre formatges', Nom: 'Sara', Hora: '21:00' },
    passos: ['Hola, qué tal', 'quiero reservar mesa', 'somos 5', 'no, somos seis', 'anula todo', 'vale, para llevar', 'dos cuatro quesos', 'me llamo Sara', 'a las 21', 'sí'] },

  // ---- casos del crític final (_disseny/equip/critica.md, P2) ----
  { nom: '«vale», «ok» i «dos 4 quesos» no canvien la llengua', ruta: CA, ll: 'ca', mai: NO_HO_SAP, completa: { Comanda: '2 de quatre formatges', Nom: 'Jordi', Hora: '21:00' },
    passos: ['hola bona nit', 'ok', 'dos 4 quesos', 'vale', 'recollir', '21h', 'Jordi', 'vale gracies'] },
  { nom: '«per emportar» sol, amb pizzes ja apuntades', ruta: CA, ll: 'ca', mai: NO_HO_SAP, completa: { Tipus: 'Per emportar', Comanda: '3 de pernil', Nom: 'Pep', Hora: '21:00' },
    passos: [{ t: 'vull 3 pizzes de pernil', envia: true }, { t: 'per emportar', envia: true }, 'per enportar', 'pep', 'a les 9', { t: 'si', envia: true }] },
  { nom: '«para llevar» solo, con pizzas ya apuntadas', ruta: ES, ll: 'es', mai: NO_HO_SAP, completa: { Tipo: 'Para llevar', Pedido: '1 de jamón', Nombre: 'Antonio', Hora: '21:00' },
    passos: ['hola', 'quiero una pizza de jamon', 'para llevar', 'a las 9', 'Antonio', 'si gracias'] },
  { nom: 'Una pregunta no és una comanda', ruta: CA, ll: 'ca', mai: NO_HO_SAP, completa: { Comanda: '2 de pernil, 1 margarita', Nom: 'Pep', Hora: '21:00' }, cal: [/tenim la de pernil|la de pernil la fem|La de pernil, sí/],
    passos: [{ t: 'teniu pizza de pernil?', senseComanda: true }, '2', 'i una margarita', 'em dic Pep', 'a les 21', 'sí'] },
  { nom: 'Faltes habituals', ruta: CA, ll: 'ca', mai: NO_HO_SAP, completa: { Comanda: '3 de pernil', Nom: 'Josep', Hora: '21:30' }, cal: [/tres de pernil/],
    passos: ['ola', 'vui 3 pizes de pernill', 'k teniu', 'grasies', 'em dic Josep', 'a 2/4 de 10', 'si'] },
  { nom: 'Faltas en castellano', ruta: ES, ll: 'es', mai: NO_HO_SAP, completa: { Pedido: '2 margaritas', Nombre: 'Lucía', Hora: '20:00' },
    passos: ['ola', 'kiero 2 pizas margarita', 'q teneis', 'grasias', 'me llamo Lucía', 'a las 8', 'vale'] },
  { nom: 'Reserva amb dia i «tres quarts de deu»', ruta: CA, ll: 'ca', mai: NO_HO_SAP, completa: { Tipus: 'Reserva de taula', Persones: '6', Dia: 'Dissabte', Nom: 'Maria', Hora: '21:45' }, cal: [/dissabte a les 21:45/],
    passos: ['ola', 'voldria reservar taula per dissabte', 'som 6', 'Maria', 'tres quarts de deu', 'perfecte'] },
  { nom: 'Reserva sin día: lo pregunta', ruta: ES, ll: 'es', mai: NO_HO_SAP, completa: { Tipo: 'Reserva de mesa', Personas: '4', Día: 'Viernes', Nombre: 'Ana', Hora: '22:00' }, cal: [/qué día|Para hoy/, /el viernes a las 22:00/],
    passos: ['quiero reservar mesa', 'somos 4', 'el viernes', 'me llamo Ana', 'a las 22:00', 'sí'] },
  { nom: 'Plurals i concordança', ruta: CA, ll: 'ca', completa: { Comanda: '2 margarites, 3 barbacoes, 1 vegetal', Nom: 'Rosa', Hora: '20:30' }, cal: [/dues margarites, tres barbacoes i una vegetal/],
    passos: ['dues margarites, tres barbacoes i una vegetal per emportar', 'em dic Rosa', 'a les 20:30', 'sí'] },
  { nom: 'Treure una pizza no confirma el tipus', ruta: CA, ll: 'ca', mai: /per endur|Per emportar, molt/, completa: { Comanda: '1 vegetal', Nom: 'Pau', Hora: '21:00' },
    passos: ['una margarita', 'treu la margarita', 'una vegetal', 'em dic Pau', 'a les 21', 'sí'] },
  { nom: 'Al mòbil: resum de la comanda, botons grans, al·lèrgies i recomanació', ruta: CA, ll: 'ca', mobil: /Comanda: Per emportar. 1 margarita/, mai: NO_HO_SAP,
    passos: ['teniu sense gluten?', 'es pot pagar amb targeta?', 'quina em recomanes?', { xip: 'Margarita' }] },
];

// Llengua d'una resposta, per paraules que només fa servir una de les dues llengües.
const mots = s => new Set(s.split(' '));
const MCA = mots("per taula comanda nom les vols tenim hi d'acord gràcies fins molt ho et i què com perfecte sense només està som obrim preus restaurant això aquí digue'm pots quantes quants altra fet corregit canviat apuntat tinc anem comencem adéu bona nit seria llavors em res entesos reservem endur recollir canviar sereu persones quina quin vindreu demanareu prefereixes repasso confirmem tocar soc ningú dues margarites barbacoes dubtes demanen voleu al·lèrgens");
const MES = mots('para mesa pedido nombre las quieres tenemos hay vale gracias hasta muy lo te y qué cómo perfecto sin solo está estamos abrimos precios restaurante eso aquí dime puedes cuántas cuántos otro hecho corregido cambiado apuntado tengo vamos empezamos adiós buenas noches sería entonces me nada entendido reservamos llevar recoger cambiar seréis personas cuál vendréis pediréis prefieres repaso confirmamos soy nadie pongo dos margaritas barbacoas dudas piden queréis alérgenos');
const llengua = s => {
  let n = /[¿¡ñ]/.test(s) ? -3 : 0;
  for (const w of s.toLowerCase().split(/[^a-zà-ÿñç·']+/)) n += MCA.has(w) - MES.has(w);
  return n > 0 ? 'ca' : n < 0 ? 'es' : null;
};

const browser = await chromium.launch({ channel: 'msedge' });
const informe = ['# Converses de prova de l\'assistent', '', `Generat per \`converses.mjs\` el ${new Date().toISOString().slice(0, 16).replace('T', ' ')} contra el simulador local.`, ''];
let fallades = 0;

for (const [i, cv] of converses.entries()) {
  const page = await browser.newPage({ viewport: cv.mobil ? { width: 390, height: 844 } : { width: 1440, height: 900 } });
  await page.addInitScript(() => { window.webkitSpeechRecognition ||= class { start() {} stop() {} }; });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(BASE + cv.ruta, { waitUntil: 'networkidle' });
  const caixa = page.locator('.assistent').first();
  await caixa.scrollIntoViewIfNeeded();
  const respostes = caixa.locator('.as-msg.a:not(.pensant)');
  const clients = caixa.locator('.as-msg.c');
  const problemes = [];
  let ll = cv.ll;

  // sense worker, el títol no pot prometre una trucada ni "el mateix assistent"
  const titol = await caixa.locator('#as-titol').textContent();
  if (/^(Truca|Llama)/.test(titol)) problemes.push(`el títol encara promet una trucada: «${titol}»`);
  if (await caixa.evaluate(n => n.tagName) !== 'SECTION') problemes.push("l'assistent no és una <section> amb nom (regió)");

  const espera = async (abans, nClients) => {
    await page.waitForFunction(([n, sel]) => document.querySelectorAll(sel + ' .as-msg.a:not(.pensant)').length > n && !document.querySelector(sel + ' .pensant'), [abans, '.assistent'], { timeout: 8000 });
    if ((await clients.count()) !== nClients + 1) problemes.push('no ha sortit el missatge del client');
  };
  const llegeixTiquet = async () => Object.fromEntries(await caixa.locator('.as-comanda dl > div').evaluateAll(ds => ds.map(d => [d.querySelector('dt').textContent, d.querySelector('dd').textContent])));

  for (const pas of cv.passos) {
    const p = typeof pas === 'string' ? { t: pas } : pas;
    if (p.ll) ll = p.ll;
    const abans = await respostes.count(), nClients = await clients.count();
    const input = caixa.locator('.as-escriu input');
    if (p.buit !== undefined) {
      await input.fill(p.buit); await input.press('Enter'); await page.waitForTimeout(900);
      if ((await clients.count()) !== nClients || (await respostes.count()) !== abans) problemes.push(`s'ha enviat un text buit (${JSON.stringify(p.buit)})`);
      continue;
    }
    if (p.xip) {
      const b = caixa.locator('.as-opcions button', { hasText: new RegExp(`^${p.xip.replace(/[?¿]/g, '\\$&')}$`) });
      if (!(await b.count())) { problemes.push(`no hi ha el botó «${p.xip}»`); break; }
      await b.first().click();
    } else if (p.tecles) {
      for (const k of p.tecles) await page.keyboard.press(k);
    } else if (p.envia) {
      // escriu i envia amb el teclat des del botó «Envia» (Tab i Enter)
      await input.fill(p.t); await input.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
    } else {
      await input.fill(p.llarg ?? p.t); await input.press('Enter');
    }
    // el focus no pot caure al <body>, ni mentre l'assistent pensa ni quan ja ha respost
    const focus = () => page.evaluate(() => document.activeElement?.closest('.assistent') ? '' : document.activeElement?.tagName);
    const durant = await focus();
    if (durant) problemes.push(`mentre respon, el focus és a <${durant}> després de «${p.t || p.xip || 'teclat'}»`);
    try { await espera(abans, nClients); } catch { problemes.push(`sense resposta després de «${p.t || p.xip || p.diu || 'llarg'}»`); break; }
    const despres = await focus();
    if (despres) problemes.push(`després de respondre, el focus és a <${despres}> («${p.t || p.xip || 'teclat'}»)`);
    const dit = await clients.last().evaluate(n => n.lastChild.textContent);
    if (p.diu && dit !== p.diu) problemes.push(`amb el teclat s'esperava «${p.diu}» i s'ha enviat «${dit}»`);
    if (p.llarg !== undefined && dit.length > 300) problemes.push(`el missatge llarg fa ${dit.length} caràcters`);
    const r = await respostes.last().evaluate(n => n.lastChild.textContent);
    const lr = llengua(r);
    if (lr && lr !== ll) problemes.push(`(d) «${p.t || p.xip || dit}» havia de tenir resposta en ${ll} i ha estat en ${lr}: «${r}»`);
    if (!lr) problemes.push(`(d) no es reconeix la llengua de «${r}»`);
    if (cv.mai?.test(r)) problemes.push(`«${dit}» ha rebut una resposta de no entendre: «${r}»`);
    if (p.senseComanda) { const tq = await llegeixTiquet(); if (tq.Comanda || tq.Pedido) problemes.push(`una pregunta ha apuntat pizzes: ${tq.Comanda || tq.Pedido}`); }
  }

  // (a) cap resposta repetida, comptant la salutació inicial
  const totes = await respostes.evaluateAll(ns => ns.map(n => n.lastChild.textContent));
  const vistes = new Set();
  for (const r of totes) { if (vistes.has(r)) problemes.push(`(a) resposta repetida: «${r}»`); vistes.add(r); }
  for (const re of cv.cal || []) if (!totes.some(r => re.test(r))) problemes.push(`cap resposta diu ${re}`);
  // (b) errors de JavaScript
  for (const e of errors) problemes.push(`(b) error de JavaScript: ${e}`);
  // (c) comanda completa al tiquet
  const tiquet = await llegeixTiquet();
  if (cv.completa) {
    const estat = tiquet.Estat || tiquet.Estado;
    if (!/Confirmad[ao]/.test(estat || '')) problemes.push(`(c) el tiquet no està confirmat: ${JSON.stringify(tiquet)}`);
    for (const [k, val] of Object.entries(cv.completa)) if (tiquet[k] !== val) problemes.push(`(c) al tiquet, ${k} hauria de ser «${val}» i és «${tiquet[k] ?? '(buit)'}»`);
  }
  // al mòbil: el resum de la comanda és visible sota el xat, i els botons fan ≥ 16 px de lletra i ≥ 44 px d'alt
  if (cv.mobil) {
    const resum = caixa.locator('.as-resum');
    if (!(await resum.isVisible())) problemes.push('al mòbil no es veu el resum de la comanda');
    else if (!cv.mobil.test(await resum.textContent())) problemes.push(`el resum del mòbil diu «${await resum.textContent()}»`);
    const mides = await caixa.locator('.as-opcions button').evaluateAll(bs => bs.map(b => [parseFloat(getComputedStyle(b).fontSize), b.getBoundingClientRect().height]));
    if (!mides.length) problemes.push('no hi ha botons de resposta ràpida');
    for (const [lletra, alt] of mides) if (lletra < 16 || alt < 44) problemes.push(`botó de resposta ràpida massa petit: ${lletra}px de lletra, ${alt}px d'alt`);
    await caixa.locator('.as-conversa').evaluate(n => { n.scrollTop = n.scrollHeight; });
    await caixa.locator('.as-trucada').screenshot({ path: path.join(dir, 'mobil-resum.png') });
  }

  // transcripció
  const linies = await caixa.locator('.as-msg:not(.pensant)').evaluateAll(ns => ns.map(n => [n.classList.contains('c') ? 'Client' : 'Assistent', n.lastChild.textContent]));
  informe.push(`## ${i + 1}. ${cv.nom}`, '', `Pàgina \`${cv.ruta}\`${cv.mobil ? ' (mòbil)' : ''}. ${problemes.length ? '**FALLA**' : 'Passa.'}`, '');
  for (const [qui, text] of linies) informe.push(`- **${qui}:** ${text.length > 160 ? text.slice(0, 160) + '…' : text}`);
  if (Object.keys(tiquet).length) informe.push('', `Tiquet: ${Object.entries(tiquet).map(([k, v]) => `${k} = ${v}`).join(' · ')}`);
  if (problemes.length) informe.push('', ...problemes.map(p => `> ${p}`));
  informe.push('');
  console.log(`${problemes.length ? 'FALLA' : 'passa'}  ${i + 1}. ${cv.nom}`);
  for (const p of problemes) console.log('       ' + p);
  if (problemes.length) fallades++;

  if (cv.captura) {
    for (const [nom, w, h] of [['escriptori', 1440, 900], ['mobil', 390, 844]]) {
      await page.setViewportSize({ width: w, height: h });
      await page.waitForTimeout(300);
      await caixa.scrollIntoViewIfNeeded();
      await caixa.locator('.as-conversa').evaluate(n => { n.scrollTop = n.scrollHeight; });
      await caixa.screenshot({ path: path.join(dir, `${cv.captura}-${nom}.png`) });
    }
  }
  await page.close();
}

informe.splice(3, 0, `**Resultat: ${converses.length - fallades} de ${converses.length} converses passen.**`, '');
writeFileSync(path.join(dir, 'converses.md'), informe.join('\n'));
await browser.close();
console.log(`\n${converses.length - fallades}/${converses.length} converses passen`);
process.exit(fallades ? 1 : 0);
