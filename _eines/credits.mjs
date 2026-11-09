// Genera CREDITOS.md a partir de _fotos/credits.json i _fotos/fotos.json.
import fs from 'node:fs';
const credits = JSON.parse(fs.readFileSync('_fotos/credits.json', 'utf8'));
const fotos = JSON.parse(fs.readFileSync('_fotos/fotos.json', 'utf8'));
const autor = a => a.replace(/^User:/, '').replace(/^Author of the assembly: (.+?) Author of the original maps.*$/, '$1 (muntatge); autor original del plànol desconegut');
const fila = (id, c, nota = '') => `| \`${id}\` | ${autor(c.autor)} | [${c.font}](${c.enllac}) | ${c.llicencia_url ? `[${c.llicencia}](${c.llicencia_url})` : c.llicencia} | ${c.mida_original}${nota} |`;
const files = fotos.map(f => fila(f.id, credits[f.id]));
files.splice(files.findIndex(l => l.includes('`planol-1890`')) + 1, 0, fila('planol-detall', credits['planol-1890'], '. Retall del centre del plànol anterior'));
fs.writeFileSync('CREDITOS.md', `# Crèdits de les fotos

Totes les imatges són de Wikimedia Commons, amb llicència lliure per a ús comercial.

**Tractament.** A la web, totes les fotos es mostren modificades: convertides a duotò (blau de la marca \`#1F3590\` a calç \`#F2F3EE\`), amb nivells ajustats, retallades en forma de peça de mosaic i amb una capa de gra. Els fitxers modificats són a \`assets/fotos/\`.

**Llicències CC BY-SA.** Les fotos de Wikimedia amb llicència CC BY-SA s'han de citar amb autor, enllaç i llicència, i les versions modificades es comparteixen amb la mateixa llicència. Per això la web les cita al peu de pàgina.

| Fitxer | Autor | Font | Llicència | Mida original |
|---|---|---|---|---|
${files.join('\n')}

## Tipografia

Archivo, d'Omnibus-Type ([Omnibus-Type/Archivo](https://github.com/Omnibus-Type/Archivo)). Llicència [SIL Open Font License 1.1](assets/fonts/OFL.txt).

## Com canviar una foto per una de pròpia

1. Desa la foto a \`_fotos/originals/\` amb el mateix nom que la que vols substituir (per exemple, \`telefon.jpg\`).
2. Executa \`npm run fotos\`. Es tornen a fer les versions de 2400, 1600 i 800 px amb el mateix tractament.
3. Esborra l'entrada d'aquella foto de \`_fotos/credits.json\` (i, si vols, la fila d'aquesta taula).
4. Executa \`npm run web\`. El peu de la web deixa de citar-la.

## Com regenerar la web

- \`npm run web\` torna a fer \`index.html\` (català) i \`es/index.html\` (castellà) a partir de \`_eines/construeix.mjs\`. Els textos són a dins d'aquest fitxer.
- \`npm run servidor\` obre la web a http://localhost:8130 per provar-la.
`);
console.log('ok');
