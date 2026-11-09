// Codi QR mínim (versió 3, correcció L, mode byte, màscara 0): prou per a una adreça
// de fins a 53 caràcters. Serveix per a la placa de la vinyeta de la Carta QR, que porta
// de veritat a la pàgina del servei. Segueix l'esquema de la norma ISO/IEC 18004.
const MIDA = 29, DADES = 55, CORRECCIO = 15;

// aritmètica de GF(256) amb el polinomi 0x11D
const mul = (x, y) => { let z = 0; for (let i = 7; i >= 0; i--) { z = (z << 1) ^ ((z >>> 7) * 0x11d); z ^= ((y >>> i) & 1) * x; } return z & 0xff; };
function divisor(grau) {
  const d = Array(grau - 1).fill(0).concat([1]);
  let arrel = 1;
  for (let i = 0; i < grau; i++) {
    for (let j = 0; j < d.length; j++) { d[j] = mul(d[j], arrel); if (j + 1 < d.length) d[j] ^= d[j + 1]; }
    arrel = mul(arrel, 2);
  }
  return d;
}
function residu(dades, d) {
  const r = d.map(() => 0);
  for (const b of dades) { const f = b ^ r.shift(); r.push(0); d.forEach((c, i) => { r[i] ^= mul(c, f); }); }
  return r;
}

export function qr(text) {
  const bytes = [...new TextEncoder().encode(text)];
  if (bytes.length > 53) throw new Error('QR: text massa llarg');
  // bits: mode byte (0100), longitud (8 bits), dades, terminador i farciment
  const bits = [];
  const posa = (v, n) => { for (let i = n - 1; i >= 0; i--) bits.push((v >>> i) & 1); };
  posa(4, 4); posa(bytes.length, 8); bytes.forEach(b => posa(b, 8));
  posa(0, Math.min(4, DADES * 8 - bits.length));
  while (bits.length % 8) bits.push(0);
  const cw = [];
  for (let i = 0; i < bits.length; i += 8) cw.push(parseInt(bits.slice(i, i + 8).join(''), 2));
  for (let p = 0xec; cw.length < DADES; p ^= 0xec ^ 0x11) cw.push(p);
  const tot = cw.concat(residu(cw, divisor(CORRECCIO)));

  const m = Array.from({ length: MIDA }, () => Array(MIDA).fill(false));
  const fn = Array.from({ length: MIDA }, () => Array(MIDA).fill(false));
  const fixa = (x, y, v) => { m[y][x] = v; fn[y][x] = true; };
  for (let i = 0; i < MIDA; i++) { fixa(6, i, i % 2 === 0); fixa(i, 6, i % 2 === 0); }
  for (const [cx, cy] of [[3, 3], [MIDA - 4, 3], [3, MIDA - 4]])
    for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
      const x = cx + dx, y = cy + dy, d = Math.max(Math.abs(dx), Math.abs(dy));
      if (x >= 0 && x < MIDA && y >= 0 && y < MIDA) fixa(x, y, d !== 2 && d !== 4);
    }
  for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) fixa(22 + dx, 22 + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
  // informació de format: correcció L (01) i màscara 0
  let rem = 1 << 3;
  const dadesFormat = rem;
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
  const f = ((dadesFormat << 10) | rem) ^ 0x5412, bit = i => ((f >>> i) & 1) === 1;
  for (let i = 0; i <= 5; i++) fixa(8, i, bit(i));
  fixa(8, 7, bit(6)); fixa(8, 8, bit(7)); fixa(7, 8, bit(8));
  for (let i = 9; i < 15; i++) fixa(14 - i, 8, bit(i));
  for (let i = 0; i < 8; i++) fixa(MIDA - 1 - i, 8, bit(i));
  for (let i = 8; i < 15; i++) fixa(8, MIDA - 15 + i, bit(i));
  fixa(8, MIDA - 8, true);
  // dades en ziga-zaga, de baix a la dreta cap amunt, i màscara 0 ((x + y) parell)
  let i = 0;
  for (let dreta = MIDA - 1; dreta >= 1; dreta -= 2) {
    if (dreta === 6) dreta = 5;
    for (let v = 0; v < MIDA; v++) for (let j = 0; j < 2; j++) {
      const x = dreta - j, amunt = ((dreta + 1) & 2) === 0, y = amunt ? MIDA - 1 - v : v;
      if (fn[y][x]) continue;
      const b = i < tot.length * 8 ? ((tot[i >>> 3] >>> (7 - (i & 7))) & 1) === 1 : false;
      i++;
      m[y][x] = b !== ((x + y) % 2 === 0);
    }
  }
  return m;
}

// Camí SVG dels mòduls foscos, amb el costat d'un mòdul = `pas`.
export function qrCami(text, x0 = 0, y0 = 0, pas = 1) {
  const m = qr(text);
  let d = '';
  m.forEach((fila, y) => fila.forEach((v, x) => { if (v) d += `M${+(x0 + x * pas).toFixed(2)} ${+(y0 + y * pas).toFixed(2)}h${pas}v${pas}h-${pas}z`; }));
  return d;
}
