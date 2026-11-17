// Calcula la distància i el temps per carretera des de Mollerussa fins a la «capital» de referència de cada comarca
// (OSRM, amb dades d'OpenStreetMap) i els imprimeix perquè es copiïn a comarques.mjs (km i min).
// Servei públic de demostració d'OSRM: poques peticions i amb pausa. Cada resultat és una estimació sense trànsit ni neu.
// node _eines/distancies.mjs
const ORIGEN = [0.8939, 41.6311]; // Mollerussa (lon, lat)
const PUNTS = {
  'pla-urgell': ['Mollerussa', 0.8939, 41.6311], urgell: ['Tàrrega', 1.1396, 41.6469], segria: ['Lleida', 0.6200, 41.6176],
  noguera: ['Balaguer', 0.8068, 41.7904], garrigues: ['les Borges Blanques', 0.8681, 41.5226], segarra: ['Cervera', 1.2731, 41.6700],
  solsones: ['Solsona', 1.5163, 41.9942], 'alt-urgell': ["la Seu d'Urgell", 1.4592, 42.3580], 'pallars-jussa': ['Tremp', 0.8946, 42.1664],
  'pallars-sobira': ['Sort', 1.1295, 42.4130], 'alta-ribagorca': ['el Pont de Suert', 0.7414, 42.4083], aran: ['Vielha', 0.7966, 42.7028], cerdanya: ['Puigcerdà', 1.9283, 42.4318],
};
for (const [id, [nom, lon, lat]] of Object.entries(PUNTS)) {
  const r = await (await fetch(`https://router.project-osrm.org/route/v1/driving/${ORIGEN.join(',')};${lon},${lat}?overview=false`)).json();
  const rt = r.routes?.[0];
  console.log(id.padEnd(15), nom.padEnd(20), rt ? `km: ${(rt.distance / 1000).toFixed(1)}, min: ${Math.round(rt.duration / 60)}` : '?');
  await new Promise(s => setTimeout(s, 1200));
}

// Pobles concrets que es citen als textos (minuts de carretera des de Mollerussa, OSRM, novembre del 2026).
// Les coordenades surten de Nominatim (OpenStreetMap) i es dónen aquí perquè el càlcul es pugui repetir.
const EXTRES = {
  Vinaixa: [0.9746, 41.4282], 'el Cogul': [0.6894, 41.4670], 'la Granadella': [0.6649, 41.3555],
  'Artesa de Segre': [1.0983, 41.9377], Ponts: [1.1863, 41.9155], Àger: [0.7632, 42.0000],
  Guissona: [1.2890, 41.7852], Isona: [1.0451, 42.1180],
};
console.log('\nPobles concrets:');
for (const [nom, [lon, lat]] of Object.entries(EXTRES)) {
  const r = await (await fetch(`https://router.project-osrm.org/route/v1/driving/${ORIGEN.join(',')};${lon},${lat}?overview=false`)).json();
  const rt = r.routes?.[0];
  console.log(nom.padEnd(16), rt ? `km: ${(rt.distance / 1000).toFixed(1)}, min: ${Math.round(rt.duration / 60)}` : '?');
  await new Promise(s => setTimeout(s, 1200));
}
