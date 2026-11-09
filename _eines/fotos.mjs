// Tractament de fotos de Bildane.
// Agafa qualsevol imatge de _fotos/originals/ i en fa versions WebP
// a 2400, 1600 i 800 px amb el duotò de la marca (blau de la marca → calç).
// Per canviar una foto de stock per una de pròpia: desa-la a
// _fotos/originals/ amb el mateix nom (p. ex. telefon.jpg) i executa
// `npm run fotos` (només refà les fotos que han canviat; `--tot` les refà totes).
// El disseny no s'ha de tocar.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ORIGEN = '_fotos/originals';
const DESTI = 'assets/fotos';
const AMPLADES = [2400, 1600, 800];

// Colors de la marca (els mateixos que a assets/bildane.css)
const FOSC = [0x1f, 0x35, 0x90];  // blau de la marca
const CLAR = [0xf2, 0xf3, 0xee];  // calç

// Corba de to: una mica de contrast perquè les ombres siguin blau ple
// i els clars quedin nets, com una rajola esmaltada.
const corba = new Float32Array(256);
for (let i = 0; i < 256; i++) {
  let t = Math.min(1, Math.max(0, (i / 255 - 0.06) / 0.88));
  t = t * t * (3 - 2 * t) * 0.6 + t * 0.4;
  corba[i] = t;
}
const taula = [0, 1, 2].map(c => Uint8Array.from(corba, t => Math.round(FOSC[c] + (CLAR[c] - FOSC[c]) * t)));

fs.mkdirSync(DESTI, { recursive: true });
// Es conserven les mides ja fetes: només es refan les fotos que han canviat.
const fitxerMides = path.join(DESTI, 'mides.json');
const mides = fs.existsSync(fitxerMides) ? JSON.parse(fs.readFileSync(fitxerMides, 'utf8')) : {};
const refer = process.argv.includes('--tot');
const espera = ms => new Promise(r => setTimeout(r, ms));
// Windows de vegades bloqueja un fitxer un instant (antivirus, servidor): es reintenta.
async function desa(img, desti) {
  for (let i = 0; ; i++) {
    try { return await img.clone().toFile(desti); }
    catch (e) { if (i >= 4) throw e; await espera(400 * (i + 1)); }
  }
}

// `retall` a _fotos/fotos.json: [esquerra, dalt, amplada, alçada] en píxels de l'original.
// Serveix per deixar fora un rètol, una matrícula o una persona.
const RETALLS = Object.fromEntries(JSON.parse(fs.readFileSync('_fotos/fotos.json', 'utf8')).filter(f => f.retall).map(f => [f.id, f.retall]));

for (const fitxer of fs.readdirSync(ORIGEN).filter(f => /\.(jpe?g|png|webp|tiff?)$/i.test(f))) {
  const nom = path.parse(fitxer).name;
  const original = path.join(ORIGEN, fitxer);
  const primer = path.join(DESTI, `${nom}-${AMPLADES.at(-1)}.webp`);
  if (!refer && mides[nom] && fs.existsSync(primer) && fs.statSync(primer).mtimeMs > fs.statSync(original).mtimeMs) continue;
  const r = RETALLS[nom];
  const { data, info } = await sharp(r ? await sharp(original).rotate().extract({ left: r[0], top: r[1], width: r[2], height: r[3] }).toBuffer() : original)
    .rotate()
    .resize({ width: AMPLADES[0], withoutEnlargement: true })
    .grayscale()
    .normalise({ lower: 1, upper: 99.5 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgb = Buffer.alloc(info.width * info.height * 3);
  for (let i = 0; i < info.width * info.height; i++) {
    const g = data[i * info.channels];
    rgb[i * 3] = taula[0][g];
    rgb[i * 3 + 1] = taula[1][g];
    rgb[i * 3 + 2] = taula[2][g];
  }
  const base = sharp(rgb, { raw: { width: info.width, height: info.height, channels: 3 } });

  const fetes = [];
  for (const w of AMPLADES) {
    if (w > info.width && w !== AMPLADES.at(-1)) continue;
    const ample = Math.min(w, info.width);
    await desa(base.clone().resize({ width: ample }).webp({ quality: 74, effort: 6 }), path.join(DESTI, `${nom}-${w}.webp`));
    fetes.push(w);
  }
  mides[nom] = { amplades: fetes, proporcio: +(info.width / info.height).toFixed(4) };
  console.log('ok', nom, fetes.join('/'));
}

// les fotos que ja no tenen original deixen de constar
for (const nom of Object.keys(mides)) if (!fs.readdirSync(ORIGEN).some(f => path.parse(f).name === nom)) delete mides[nom];
fs.writeFileSync(fitxerMides, JSON.stringify(mides, null, 2));
