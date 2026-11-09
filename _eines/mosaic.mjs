// Generador del mosaic de Bildane: el Pla d'Urgell vist des de dalt,
// tallat com un trencadís. El canal principal i les sèquies són franges
// d'aigua; la resta són parcel·les que es van partint com es parteix una
// rajola. Tot és determinista: la mateixa llavor dona el mateix mosaic.

// ---------- geometria ----------
const area = p => p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0) / 2;
const centre = p => {
  let x = 0, y = 0, A = 0;
  p.forEach((a, i) => { const b = p[(i + 1) % p.length]; const c = a[0] * b[1] - b[0] * a[1]; A += c; x += (a[0] + b[0]) * c; y += (a[1] + b[1]) * c; });
  return [x / (3 * A), y / (3 * A)];
};
const caixa = p => {
  const xs = p.map(v => v[0]), ys = p.map(v => v[1]);
  return { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
};

// Parteix un polígon convex amb la recta que passa per `o` amb direcció `d`.
function parteix(p, o, d) {
  const n = [-d[1], d[0]];
  const s = v => (v[0] - o[0]) * n[0] + (v[1] - o[1]) * n[1];
  const A = [], B = [];
  p.forEach((a, i) => {
    const b = p[(i + 1) % p.length], sa = s(a), sb = s(b);
    if (sa >= 0) A.push(a);
    if (sa <= 0) B.push(a);
    if (sa * sb < 0) { const t = sa / (sa - sb); const q = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; A.push(q); B.push(q); }
  });
  return [A, B].filter(q => q.length >= 3 && Math.abs(area(q)) > 1);
}

// Encongeix un polígon convex `d` unitats cap endins (la junta).
function encongeix(p, d) {
  if (area(p) < 0) p = [...p].reverse();
  const L = p.map((a, i) => {
    const b = p[(i + 1) % p.length], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy);
    const n = [-dy / l, dx / l];
    return { o: [a[0] + n[0] * d, a[1] + n[1] * d], d: [dx, dy] };
  });
  const r = L.map((l2, i) => {
    const l1 = L[(i - 1 + L.length) % L.length];
    const den = l1.d[0] * l2.d[1] - l1.d[1] * l2.d[0];
    if (Math.abs(den) < 1e-9) return l2.o;
    const t = ((l2.o[0] - l1.o[0]) * l2.d[1] - (l2.o[1] - l1.o[1]) * l2.d[0]) / den;
    return [l1.o[0] + l1.d[0] * t, l1.o[1] + l1.d[1] * t];
  });
  if (area(r) <= 4) return null;
  // si algun costat s'ha girat, la peça era massa petita per a la junta
  for (let i = 0; i < r.length; i++) {
    const a = r[i], b = r[(i + 1) % r.length];
    if ((b[0] - a[0]) * L[i].d[0] + (b[1] - a[1]) * L[i].d[1] <= 0) return null;
  }
  return r;
}

// ---------- atzar amb llavor ----------
function llavor(s) {
  return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
const dir = graus => [Math.cos(graus * Math.PI / 180), Math.sin(graus * Math.PI / 180)];

// ---------- el mosaic ----------
// opcions:
//   w, h            mida del domini
//   llavor          número
//   canal           { punt:[x,y], angle, ample }   el canal principal
//   sequies         [{ punt, angle, ample }]       branques cap al sud
//   reserves        [{ talls:[{punt,angle}], dins:[x,y] }]  zones lliures per al text
//   parcela         [min, max] àrea objectiu de les parcel·les
//   junta           gruix de la junta
//   trencat         probabilitat d'un tall en angle lliure
export function mosaic(o) {
  const rnd = llavor(o.llavor);
  let peces = [{ p: [[0, 0], [o.w, 0], [o.w, o.h], [0, o.h]], tipus: 'camp' }];

  const talla = (filtre, punt, angle, marca) => {
    const d = dir(angle), nou = [];
    for (const pc of peces) {
      if (!filtre(pc)) { nou.push(pc); continue; }
      for (const q of parteix(pc.p, punt, d)) nou.push({ ...pc, p: q, ...(marca ? marca(q) : {}) });
    }
    peces = nou;
  };
  const costat = (punt, angle) => { const d = dir(angle), n = [-d[1], d[0]]; return v => (v[0] - punt[0]) * n[0] + (v[1] - punt[1]) * n[1]; };

  // 1. zones reservades (s'hi posarà text): un polígon convex que es talla
  //    primer i ja no es toca més. Les prolongacions dels talls queden com
  //    camins que travessen el mosaic.
  for (const [i, forma] of (o.reserves || []).entries()) {
    forma.forEach((a, k) => {
      const b = forma[(k + 1) % forma.length];
      talla(pc => pc.tipus === 'camp', a, Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI);
    });
    const dins = v => forma.every((a, k) => { const b = forma[(k + 1) % forma.length]; return (b[0] - a[0]) * (v[1] - a[1]) - (b[1] - a[1]) * (v[0] - a[0]) >= 0; });
    // amb `reservesAmagades` la zona es parteix i es pinta com un camp més, però
    // les peces queden marcades (`amagada`) per mostrar-les quan el text se'n va
    peces.forEach(pc => {
      if (pc.tipus !== 'camp' || !dins(centre(pc.p))) return;
      if (o.reservesAmagades) pc.amagada = true; else { pc.tipus = 'reserva'; pc.reserva = i; }
    });
  }

  // 2. canal principal i sèquies: franges d'aigua
  const aigua = (c, filtre, nom) => {
    const s = costat(c.punt, c.angle), n = [-dir(c.angle)[1], dir(c.angle)[0]];
    const a = [c.punt[0] + n[0] * c.ample / 2, c.punt[1] + n[1] * c.ample / 2];
    const b = [c.punt[0] - n[0] * c.ample / 2, c.punt[1] - n[1] * c.ample / 2];
    talla(filtre, a, c.angle);
    talla(filtre, b, c.angle);
    peces.forEach(pc => { if (filtre(pc) && Math.abs(s(centre(pc.p))) < c.ample / 2) pc.tipus = nom; });
    return s;
  };
  const s = o.canal ? aigua(o.canal, pc => pc.tipus === 'camp', 'canal') : () => 1;
  const signeSud = Math.sign(s([o.w / 2, o.h * 2])) || 1;
  const alSud = v => s(v) * signeSud > (o.canal?.ample ?? 0) / 2;
  for (const sq of o.sequies || []) aigua(sq, pc => pc.tipus === 'camp' && alSud(centre(pc.p)), 'sequia');

  // 3. parcel·les: cada zona té l'orientació de la sèquia més propera
  const angles = [o.canal?.angle ?? 0, ...(o.sequies || []).map(s => s.angle)];
  const fulles = [];
  const parteixCamp = (pc, prof) => {
    const A = Math.abs(area(pc.p));
    const c = centre(pc.p);
    // prop del poble les parcel·les són més petites, com a la vora de Mollerussa
    const aprop = o.poble ? 0.22 + 0.78 * Math.min(1, Math.hypot(c[0] - o.poble.punt[0], c[1] - o.poble.punt[1]) / o.poble.radi) : 1;
    const objectiu = (o.parcela[0] + (o.parcela[1] - o.parcela[0]) * rnd() ** 1.6) * aprop;
    if (A < objectiu || prof > 14) { fulles.push(pc); return; }
    const base = pc.angle ?? angles[Math.floor(rnd() * angles.length)];
    const u = dir(base), v = [-u[1], u[0]];
    const ext = e => { const pr = pc.p.map(q => q[0] * e[0] + q[1] * e[1]); return Math.max(...pr) - Math.min(...pr); };
    const [eu, ev] = [ext(u), ext(v)];
    let angle = eu > ev * 1.15 ? base + 90 : ev > eu * 1.15 ? base : base + (rnd() < .5 ? 0 : 90);
    angle += (rnd() - .5) * 6;
    if (rnd() < o.trencat) angle = rnd() * 180;
    const t = (rnd() - .5) * .34;
    const e = dir(angle), m = [-e[1], e[0]];
    const ex = ext(m);
    const punt = [c[0] + m[0] * ex * t, c[1] + m[1] * ex * t];
    const parts = parteix(pc.p, punt, e);
    if (parts.length < 2) { fulles.push(pc); return; }
    parts.forEach(q => parteixCamp({ ...pc, p: q, angle: base }, prof + 1));
  };
  peces.forEach(pc => pc.tipus === 'camp' ? parteixCamp(pc, 0) : fulles.push(pc));

  // 4. junta
  return fulles
    .map(pc => {
      const g = pc.tipus === 'reserva' ? o.junta * 1.5 : o.junta;
      const p = encongeix(pc.p, g);
      return p && { ...pc, p, area: Math.abs(area(p)), c: centre(p), caixa: caixa(p) };
    })
    .filter(Boolean);
}

// ---------- colors ----------
// Pesos de cada esmalt. La variació de to imita les rajoles fetes a mà.
export const ESMALTS = {
  blau: '#1F3590', verd: '#0F6B4B', rostoll: '#E0A13A',
  sequia: '#3C9C98', mangan: '#2B1C22', blanc: '#FAFAF6',
};

function variacio(hex, k) {
  const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  return '#' + v.map(c => Math.max(0, Math.min(255, Math.round(c * (1 + k)))).toString(16).padStart(2, '0')).join('');
}

// Assigna fotos a les peces grans i esmalts a la resta, evitant que dues
// peces veïnes tinguin el mateix color.
export function pinta(peces, { llavor: s, fotos = [], pesos, minFotoArea = 0, separacio = 0 }) {
  const rnd = llavor(s + 7);
  const camps = peces.filter(p => p.tipus === 'camp' && !p.amagada);
  // fotos: peces grans, no gaire allargades i allunyades entre elles
  const triades = [];
  for (const pc of [...camps].sort((a, b) => b.area - a.area)) {
    if (triades.length >= fotos.length) break;
    const prop = pc.caixa.w / pc.caixa.h;
    if (pc.area < minFotoArea || prop > 3.2 || prop < .32) continue;
    if (triades.some(t => Math.hypot(t.c[0] - pc.c[0], t.c[1] - pc.c[1]) < separacio)) continue;
    triades.push(pc);
  }
  triades.forEach((pc, i) => { pc.foto = fotos[i]; });

  const noms = Object.keys(pesos), total = noms.reduce((s, n) => s + pesos[n], 0);
  const tria = exclou => {
    for (let k = 0; k < 12; k++) {
      let r = rnd() * total;
      for (const n of noms) { r -= pesos[n]; if (r <= 0) { if (!exclou.includes(n) || k > 10) return n; break; } }
    }
    return noms[0];
  };
  const fets = [];
  for (const pc of peces) {
    if (pc.tipus === 'canal' || pc.tipus === 'sequia') { pc.esmalt = 'sequia'; }
    else if (pc.tipus === 'reserva') { pc.esmalt = 'reserva'; }
    else if (!pc.foto) {
      const veins = fets.filter(f => Math.hypot(f.c[0] - pc.c[0], f.c[1] - pc.c[1]) < Math.sqrt(pc.area) * 1.1 + 40).map(f => f.esmalt);
      pc.esmalt = tria(veins);
      fets.push(pc);
    }
    if (pc.esmalt && ESMALTS[pc.esmalt]) pc.color = variacio(ESMALTS[pc.esmalt], (rnd() - .5) * .09);
  }
  return peces;
}

// La fita: un tros de trencadís tallat a mà, amb una punta que marca on som,
// com les fites de pedra que marquen els camps. Quatre vèrtexs i cap eix de simetria:
// el costat llarg de dalt és la vora recta de la rajola, i la punta (uns 50°) va avall
// a la dreta. Ja està girada 8°, perquè no es llegeixi com un escut ni com una agulla
// (director D14). És la mateixa peça a 16 px i a 28 rem.
const FITA = [[-1.0, -0.86], [0.96, -1.0], [0.62, 1.04], [-0.68, -0.06]];
export function fita({ mida = 1, color = 'var(--rostoll)', junta = 'var(--calc)', gruix = 0.14 } = {}) {
  const pts = FITA.map(p => p.join(','));
  return `<svg viewBox="-1.2 -1.2 2.4 2.4" aria-hidden="true" focusable="false"${mida ? ` style="width:${mida};height:${mida}"` : ''}><polygon points="${pts.join(' ')}" fill="${color}" stroke="${junta}" stroke-width="${gruix}" stroke-linejoin="miter"/></svg>`;
}

// ---------- sortida ----------
const pc = (v, t) => +(v / t * 100).toFixed(3);

// HTML: cada peça és un div retallat amb clip-path dins la seva caixa.
// `vars(p, i)` permet afegir variables CSS pròpies a cada peça (p. ex. per moure-la amb el scroll).
export function html(peces, { w, h, imatge, classe = 'mosaic', vars = () => '' }) {
  const ordre = peces.map(p => p.c[0] - p.c[1] * .6);
  const [mn, mx] = [Math.min(...ordre), Math.max(...ordre)];
  return peces.map((p, i) => {
    if (p.tipus === 'reserva') return '';
    const b = p.caixa;
    const clip = p.p.map(([x, y]) => `${pc(x - b.x, b.w)}% ${pc(y - b.y, b.h)}%`).join(',');
    // l'aigua entra pel nord-est: les peces apareixen en aquest ordre
    const retard = Math.round((1 - (ordre[i] - mn) / (mx - mn)) * 900);
    const estil = `left:${pc(b.x, w)}%;top:${pc(b.y, h)}%;width:${pc(b.w, w)}%;height:${pc(b.h, h)}%;clip-path:polygon(${clip});--r:${retard}ms${vars(p, i)}`;
    if (p.foto) return `<div class="t t-foto" style="${estil}">${imatge(p.foto, b.w / w)}</div>`;
    return `<div class="t t-${p.esmalt}" style="${estil};--c:${p.color}"></div>`;
  }).join('\n');
}

// SVG per a previsualitzar ràpid.
export function svg(peces, { w, h, fons = '#F2F3EE' }) {
  const cos = peces.map(p => `<polygon points="${p.p.map(v => v.map(n => n.toFixed(1)).join(',')).join(' ')}" fill="${p.foto ? '#8A93C0' : p.tipus === 'reserva' ? 'none' : p.color}"${p.foto ? ' stroke="#1F3590" stroke-width="2"' : ''}/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><rect width="100%" height="100%" fill="${fons}"/>${cos}</svg>`;
}
