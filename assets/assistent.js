// Assistent de la Pizzeria del Pla: worker (_docs/workers.md) o, sense endpoint, simulador local.
(() => {
const pagina = document.documentElement.lang === 'es' ? 'es' : 'ca';
const json = n => n && JSON.parse(n.textContent);
const norm = s => s.toLowerCase().replace(/l[·.]l/g, 'll').normalize('NFD').replace(/\p{M}/gu, '');
const el = (tag, props) => Object.assign(document.createElement(tag), props);
const crida = (url, cos) => fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(cos), signal: AbortSignal.timeout(20000) })
  .then(async r => ({ estat: r.status, dades: await r.json().catch(() => ({})) }));

document.querySelectorAll('.assistent').forEach(caixa => {
  const $ = s => caixa.querySelector(s), tx = json($('.as-textos')), url = caixa.dataset.simulador;
  // el vocabulari del simulador es baixa la primera vegada que algú escriu
  let simP = null;
  const sim = (...a) => (simP ||= fetch(url).then(r => r.json()).then(simulador)).then(f => f(...a));
  const llista = $('.as-conversa'), form = $('.as-escriu'), opc = $('.as-opcions'), dl = $('.as-comanda dl'), reinicia = $('.as-reinicia'), rellotge = $('.rellotge'), resum = $('.as-resum'), titolTiquet = $('.as-comanda-titol');
  const input = form.querySelector('input'), envia = $('.as-envia'), mic = $('.as-mic');
  const endpoint = caixa.dataset.endpoint, placeholder = input.placeholder, inicials = [...opc.children].map(b => b.textContent);
  let missatges = [{ rol: 'assistent', text: tx.salutacio }], comanda = {}, ocupat = false, inici = 0, perVeu = false, conv = pagina, sessio;
  try { sessio = sessionStorage['bildane-sessio'] ||= crypto.randomUUID(); } catch { sessio = String(Math.random()); }
  setInterval(() => { if (inici) rellotge.textContent = new Date(Date.now() - inici).toISOString().slice(14, 19); }, 500);

  const diu = (rol, text, veu, classe = '') => {
    const li = el('li', { className: `as-msg ${rol === 'client' ? 'c' : 'a'} ${classe}`.trim() });
    li.append(el('span', { className: 'qui', textContent: rol === 'client' ? (veu ? `${tx.client}, ${tx.perVeu}` : tx.client) : tx.assistent }), text);
    llista.append(li);
    llista.scrollTop = llista.scrollHeight;
    return li;
  };
  const xips = (ops, focus) => {
    opc.replaceChildren(...ops.filter(o => typeof o === 'string' && o.length <= 40).slice(0, 6).map(o => el('button', { type: 'button', textContent: o })));
    if (focus) (opc.firstElementChild || input).focus();
  };
  opc.onclick = e => { const b = e.target.closest('button'); if (b) respon(b.textContent, false, true); };
  const pintaComanda = () => {
    const c = comanda, k = tx.camps, f = [
      [k.tipus, tx.tipus[c.tipus] || c.tipus], [k.productes, c.productes?.map(p => p.text || `${p.quantitat} ${p.nom}`).join(', ')],
      [k.persones, c.persones], [k.dia, c.dia], [k.nom, c.nom], [k.hora, c.hora], [k.estat, c.confirmada && tx.confirmada],
    ].filter(([, v]) => v);
    dl.replaceChildren(...f.map(([a, b]) => { const d = el('div'); d.append(el('dt', { textContent: a }), el('dd', { textContent: b })); return d; }));
    // al mòbil, la comanda queda sota el xat: una línia de resum la fa visible mentre s'escriu
    // una taula no és una comanda: el tiquet diu «Reserva» (detector IA42)
    const titol = c.tipus === 'reserva' ? tx.reserva : tx.comanda;
    titolTiquet.textContent = titol;
    resum.textContent = `${titol}: ${f.map(([, b]) => b).join('. ')}`;
    reinicia.hidden = resum.hidden = !f.length;
  };
  const parla = text => {
    if (!perVeu || !('speechSynthesis' in window)) return;
    const veu = speechSynthesis.getVoices().find(v => v.lang.toLowerCase().startsWith(conv));
    if (veu) speechSynthesis.speak(Object.assign(new SpeechSynthesisUtterance(text), { voice: veu, lang: veu.lang }));
  };

  async function respon(text, veu, perXip) {
    text = text.trim().slice(0, 300);
    if (!text || ocupat) return;
    // sense desactivar res: el focus es queda on era (camp, Envia o botó de resposta ràpida)
    ocupat = true; envia.ariaDisabled = opc.ariaBusy = 'true'; perVeu = veu; inici ||= Date.now(); rellotge.hidden = false;
    diu('client', text, veu); missatges.push({ rol: 'client', text });
    const pensant = diu('assistent', tx.escrivint, 0, 'pensant');
    let res;
    try {
      res = endpoint ? await crida(endpoint, { lang: pagina, sessio, missatges: missatges.slice(-20) })
        : { estat: 200, dades: await sim(missatges, comanda) };
    } catch { res = { estat: 0 }; }
    pensant.remove();
    const d = res.dades || {};
    if (res.estat === 200 && typeof d.resposta === 'string' && d.resposta) {
      if (/^(ca|es)$/.test(d.llengua)) conv = d.llengua;
      diu('assistent', d.resposta); missatges.push({ rol: 'assistent', text: d.resposta });
      comanda = { ...comanda, ...d.comanda };
      pintaComanda(); parla(d.resposta); xips(Array.isArray(d.opcions) ? d.opcions : [], perXip);
    } else {
      diu('assistent', res.estat === 429 ? tx.limit : tx.error, 0, 'avis');
      if (res.estat === 429) input.disabled = mic.disabled = true;
    }
    ocupat = false; envia.ariaDisabled = opc.ariaBusy = 'false';
  }

  form.onsubmit = e => { e.preventDefault(); const v = input.value; input.value = ''; respon(v); };
  reinicia.onclick = () => {
    missatges = [missatges[0]]; comanda = {}; inici = 0; conv = pagina; rellotge.textContent = '00:00'; rellotge.hidden = true;
    llista.replaceChildren(llista.firstElementChild); pintaComanda(); xips(inicials); input.focus();
  };

  // Veu, si el navegador en té, en la llengua de la conversa.
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Rec) return;
  mic.hidden = false;
  let rec = null;
  mic.onclick = () => {
    if (rec) return rec.stop();
    rec = new Rec(); rec.lang = conv === 'es' ? 'es-ES' : 'ca-ES'; rec.interimResults = false;
    mic.ariaPressed = 'true'; input.placeholder = tx.escolta;
    rec.onresult = e => respon(e.results[0][0].transcript, true);
    rec.onend = () => { rec = null; mic.ariaPressed = 'false'; input.placeholder = placeholder; };
    rec.onerror = () => rec?.stop();
    rec.start();
  };
});

// Simulador: mateix format que el worker; mai repeteix una resposta.
function simulador(S) {
  const X = S.lex, N = X.n, set = s => new Set(s.split(' ')), CA = set(X.ca), ES = set(X.es), STOP = set(X.stop);
  const NUM = `(\\d{1,2}|${Object.keys(N).join('|')})`, R = (s, f) => RegExp(s.replace(/N/g, NUM), f);
  const num = s => /^\d/.test(s) ? +s : N[s], quina = w => X.piz.findIndex(p => R(`^(?:${p})$`).test(w));
  const reP = R(`(?:\\b${NUM}\\s+(?:pizz\\w*\\s+)?(?:de\\s+(?:la\\s+)?)?)?\\b(${X.piz.join('|')})`, 'g');
  const INT = X.int.map(([k, s]) => [k, R(s)]), SI = INT.at(-1)[1], CAMPS = ['tipus', 'productes', 'persones', 'dia', 'nom', 'hora'];
  const prop = w => CA.has(w) || ES.has(w) || STOP.has(w) || Object.hasOwn(N, w) || quina(w) >= 0;
  // text en minúscules, sense accents ni puntuació i amb les faltes habituals corregides
  const neteja = s => norm(s).replace(/\b([123])\/4\b/g, '$1 quarts ').replace(/(\d)[.h](\d\d)/g, '$1:$2').replace(/[^a-z0-9:]+/g, ' ').trim()
    .split(' ').map(w => X.faltes[w] || w).join(' ');
  // indicis de llengua: positiu, català; negatiu, castellà
  const punts = t => 2 * (/[àèòç·]/i.test(t) - /[ñ¿¡á]|qué|cómo/i.test(t)) + neteja(t).split(' ').reduce((n, w) => n + CA.has(w) - ES.has(w), 0);
  const falta = c => c._pend || (!c.tipus ? 'tipus' : c.tipus === 'emportar' ? !c.productes?.length && 'productes' : !c.persones ? 'persones' : !c.dia && 'dia')
    || (!c.nom ? 'nom' : !c.hora ? 'hora' : !c.confirmada ? 'confirma' : 'fet');

  return async (missatges, A) => {
  const raw = missatges.at(-1).text, t = neteja(raw);
  // la llengua canvia amb un indici clar, o amb dos missatges seguits que hi apunten
  let L = pagina, feble = 0, info = '', fi = false, m;
  for (const m of missatges) if (m.rol === 'client') { const n = punts(m.text); if (n * n > 1 || n && n === feble) L = n > 0 ? 'ca' : 'es'; feble = n * n === 1 ? n : 0; }
  const T = S[L], P = T.pre, c = structuredClone(A), p0 = falta(c), pre = [], toc = {}, v = {}, has = k => R(X[k]).test(t);
  const preg = A._preg; c._preg = null;
  const buida = ks => { for (const k of ks) c[k] = null; };

  if (has('anula')) { buida([...CAMPS, 'confirmada', '_pend']); pre.push(P.anula); }
  else if (p0 === 'fet' && has('nova') && !t.match(reP)) { buida([...CAMPS, 'confirmada']); pre.push(P.nova); }
  else {
    const ie = t.search(R(X.emportar)), ir = t.search(R(X.reserva)), nt = ie > ir ? 'emportar' : ir > ie ? 'reserva' : 0;
    if (nt) { if (nt !== c.tipus && nt === 'reserva' && c.productes) pre.push(P.aReserva); if (nt !== c.tipus) buida([nt === 'reserva' ? 'productes' : 'persones']); c.tipus = nt; toc.tipus = 1; }
    // si pregunta preus o carta, no demana pizzes
    let pz = INT.some(([k, r]) => /carta|preus/.test(k) && r.test(t)) ? [] : [...t.matchAll(reP)].map(m => [quina(m[2]), m[1] ? num(m[1]) : 0]);
    // "teniu pernil?" pregunta: diu que sí i en demana quantes; la resposta ("2") va a aquella pizza
    if (pz.length && (/\?/.test(raw) || has('pregunta')) && !has('demana')) { v.x = T.formes[pz[0][0]][0]; c._preg = pz[0][0]; pre.push(P.tenim); info = 'tenim'; pz = []; }
    else if (!pz.length && preg != null && (m = t.match(R('^(?:(?:si|vale|ok|doncs|pues) )?N\\b')) || SI.test(t))) pz = [[preg, m ? num(m[1]) : 1]];
    const raro = t.match(R(X.raro)), rx = raro && (raro[1] || !pz.length && raro[2]);
    if (rx && !prop(rx)) { v.x = rx; pre.push(P.raro); info = 'carta'; }
    if (pz.length && c.tipus === 'reserva') pre.push(P.ataula);
    else if (pz.length) {
      let ps = has('nomes') || c._pend === 'productes' ? [] : (c.productes || []).map(p => ({ ...p }));
      for (const [i, q] of pz) {
        const nom = S[pagina].carta[i], e = ps.find(p => p.nom === nom);
        if (has('treu')) ps = ps.filter(p => p !== e);
        else if (e) e.quantitat = q || e.quantitat + 1;
        else ps.push({ quantitat: q || 1, nom });
      }
      // al tiquet, en la llengua de la pàgina i amb concordança ("3 margarites", "2 de pernil")
      c.tipus = 'emportar'; c.productes = ps.length ? ps.map(p => ({ ...p, text: `${p.quantitat} ${S[pagina].formes[S[pagina].carta.indexOf(p.nom)][+(p.quantitat > 1)]}` })) : null; toc.productes = 1;
    }
    m = t.match(R(X.persones)) || (c.tipus === 'reserva' && t.match(R(X.perA))) || (p0 === 'persones' && t.match(R('^N$')));
    const np = m && num(m[1] || m[2]);
    if (np > 0 && c.tipus !== 'emportar') { c.tipus = 'reserva'; c.persones = np; toc.persones = 1; }
    // hora: obert de 19 a 23; "a les 9" vol dir 21:00 i "2/4 de 10", 21:30
    let hh, mi = 0;
    if (m = t.match(R(X.quarts))) { hh = num(m[2]) - 1; mi = num(m[1]) * 15; }
    else {
      for (const s of [...X.hores, p0 === 'hora' && '^N$']) if (s && (m = t.match(R(s)))) break;
      if (m) { hh = num(m[1]); mi = /^\d/.test(m[2]) ? +m[2] : m[2] ? (m[2][0] === 'm' ? 30 : 15) : 0; }
    }
    if (hh != null) {
      const h = hh % 12 + 12, hs = `${h}:${String(mi).padStart(2, '0')}`;
      if (h > 18 && h * 60 + mi <= 1380) { c.hora = hs; toc.hora = 1; } else { v.x = hs; pre.push(P.tancat); }
    }
    const di = X.dies.findIndex(p => R(p).test(t));
    if (di >= 0) { c.dia = S[pagina].dies[di]; toc.dia = 1; }
    const nom = raw.match(RegExp(X.nom, 'i'))?.[1] || (p0 === 'nom' && !Object.keys(toc).length && !pre.length && !INT.some(([, r]) => r.test(t)) && raw), w = [];
    for (const p of nom ? nom.split(/[\s,.;:!?¿¡()]+/).filter(Boolean) : []) {
      if (!w.length && /^(la|el|en|na)$/i.test(p)) continue;
      if (w.length === 3 || !/^[a-zà-ÿñç·'-]{2,20}$/i.test(p) || norm(p).split(/[-']/).some(prop)) break;
      w.push(p[0].toUpperCase() + p.slice(1).toLowerCase());
    }
    if (w.length) { c.nom = w.join(' '); toc.nom = 1; }
    if (toc[c._pend]) c._pend = null;
  }

  const ch = CAMPS.filter(k => JSON.stringify(c[k] ?? null) !== JSON.stringify(A[k] ?? null));
  if (ch.length && A.confirmada && c.tipus) c.confirmada = false;
  const junta = ps => ps.length > 1 ? ps.slice(0, -1).join(', ') + T.i + ps.at(-1) : ps[0] || '';
  // "dues margarites", "una de pernil"; el dia, en la llengua de la conversa
  const id = S[pagina].dies.indexOf(c.dia), dl = T.dies[id] || c.dia || '';
  Object.assign(v, { tipus: T.tipus[c.tipus], carta: junta(T.carta), nom: c.nom, hora: c.hora, persones: c.persones, diaL: dl,
    dia: dl && ' ' + (L === 'es' && id > 2 ? 'el ' : '') + dl.toLowerCase(),
    llista: junta((c.productes || []).map(p => { const q = p.quantitat, i = S[pagina].carta.indexOf(p.nom); return `${T.quantes[q - 1] || q} ${T.formes[i]?.[+(q > 1)] || p.nom}`; })) });
  if ((ch.length || toc.tipus) && c.tipus && !pre.includes(P.anula) && !pre.includes(P.nova)) {
    const k = toc.tipus && A.tipus && A.tipus !== c.tipus ? 'tipus' : ['productes', 'persones', 'tipus', 'dia', 'hora', 'nom'].find(k => ch.includes(k) && c[k]) || (toc.tipus && 'tipus');
    const corregeix = k === 'tipus' ? A.tipus && A.tipus !== c.tipus : A[k] != null && has('corregeix');
    // un torn de cada tres, sense eco: passa directament a la pregunta (detector IA25).
    // Les pizzes sempre es repeteixen, perquè el client vegi què s'ha apuntat.
    const senseEco = !corregeix && k !== 'productes' && missatges.filter(m => m.rol !== 'client').length % 3 === 0;
    if (k && !senseEco && !pre.includes(P.aReserva) && (corregeix || falta(c) !== 'confirma')) pre.push(corregeix ? P.canvi[k] : P.ack[k === 'tipus' ? c.tipus : k]);
  } else if (!pre.length) {
    const si = SI.test(t), no = /^nop?\b/.test(t), cv = has('canvi');
    const f = Object.keys(X.camp).find(k => R(X.camp[k]).test(t) && (k !== 'persones' || c.tipus === 'reserva'));
    if (/confirma|quin/.test(p0) && si && !no) { c.confirmada = fi = true; c._pend = null; }
    else if ((p0 === 'quin' || cv) && f && c.tipus) { c._pend = f; c.confirmada = false; }
    else if (p0 === 'confirma' && (no || cv) || p0 === 'fet' && cv) { c._pend = 'quin'; c.confirmada = false; }
    else {
      info = (INT.find(([, r]) => r.test(t)) || ['fora'])[0];
      if (p0 === 'fet' && info === 'no') info = 'adeu';
      pre.push(info === 'adeu' && p0 === 'fet' ? P.adeuFet : P[info]);
    }
  }

  const p1 = falta(c), omple = s => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '');
  v.resum = omple(c.tipus === 'reserva' ? T.resumR : T.resumE);
  // encallat: la pista només surt a partir del tercer torn encallat (detector IA26)
  c._bucle = /^(que|fora|si|no|hola)$/.test(info) ? (A._bucle || 0) + 1 : ch.length || fi || p1 !== p0 ? 0 : A._bucle || 0;
  const mes = toc.productes && p1 === 'nom', pista = T.pista[p1];
  const parts = fi ? [P.final] : [...pre, ...(/adeu|tenim/.test(info) || p1 === 'fet' && info === 'gracies' ? [] : [mes ? T.q.nomMes : T.q[p1]]), ...(c._bucle > 2 ? [pista] : [])];
  // la combinació no dita que menys repeteix trossos
  const abans = missatges.filter(m => m.rol !== 'client').map(m => norm(m.text));
  const tria = ps => {
    let cs = [[]], millor, punts = 1e9;
    for (const p of ps) cs = cs.flatMap(a => p.map(b => [...a, omple(b)]));
    cs.forEach((_, i) => {
      const a = cs[(i + abans.length) % cs.length], s = a.join(' ');
      const n = abans.includes(norm(s)) ? 1e9 : a.reduce((n, b) => n + abans.filter(x => x.includes(norm(b))).length, 0);
      if (n < punts) { millor = s; punts = n; }
    });
    return millor;
  };
  const resposta = tria(parts) || tria([...parts, p1 === 'fet' ? T.q.fet : pista]) || tria([P.si, ...parts, pista]);
  const opcions = info === 'tenim' ? T.x.tenim : mes || p1 === 'productes' || /carta|recomana/.test(info) && p1 === 'tipus' ? T.x.productes : T.x[p1 === 'quin' && c.tipus === 'reserva' ? 'quinR' : p1] || [];
  await new Promise(r => setTimeout(r, 350 + Math.random() * 300));
  return { resposta, comanda: c, final: !!c.confirmada, opcions, llengua: L };
  };
}
})();
