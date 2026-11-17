// «On treballo»: les 13 comarques de Lleida on treballa Bildane, amb la distància des de Mollerussa,
// les dades d'Idescat (_eines/comarques-idescat.json) i les fonts de cada afirmació.
// Els textos de cada comarca són a textos-comarques-ca.mjs i textos-comarques-es.mjs.
// Les xifres no s'escriuen a mà als textos: surten de les dades a través de `x` (vegeu `contextDe`).
import fs from 'node:fs';

export const IDESCAT = JSON.parse(fs.readFileSync('_eines/comarques-idescat.json', 'utf8'));

// Distància i temps per carretera des de Mollerussa fins a la «capital» de referència de cada comarca.
// Calculats amb OSRM (OpenStreetMap), novembre del 2026: _eines/distancies.mjs. Es mostren arrodonits.
// `mode`: persona = hi vaig en persona; remot = sobretot en remot, amb visita si cal.
export const COMARQUES = [
  { id: 'pla-urgell', mode: 'persona', cap: 'Mollerussa', km: 0, min: 0, slug: 'pla-d-urgell', nom: { ca: "Pla d'Urgell", es: "Pla d'Urgell" }, veines: ['urgell', 'garrigues', 'segria'] },
  { id: 'urgell', mode: 'persona', cap: 'Tàrrega', km: 24.2, min: 20, slug: 'urgell', nom: { ca: 'Urgell', es: 'Urgel' }, veines: ['pla-urgell', 'segarra', 'noguera'] },
  { id: 'segria', mode: 'persona', cap: 'Lleida', km: 28.4, min: 24, slug: 'segria', nom: { ca: 'Segrià', es: 'Segrià' }, veines: ['pla-urgell', 'garrigues', 'noguera'] },
  { id: 'noguera', mode: 'persona', cap: 'Balaguer', km: 24.6, min: 26, slug: 'noguera', nom: { ca: 'Noguera', es: 'Noguera' }, veines: ['segria', 'pallars-jussa', 'urgell'] },
  { id: 'garrigues', mode: 'persona', cap: 'les Borges Blanques', capEs: 'Les Borges Blanques', km: 14.5, min: 17, slug: 'garrigues', nom: { ca: 'Garrigues', es: 'Garrigues' }, veines: ['pla-urgell', 'segria', 'urgell'] },
  { id: 'segarra', mode: 'persona', cap: 'Cervera', km: 35.0, min: 28, slug: 'segarra', nom: { ca: 'Segarra', es: 'Segarra' }, veines: ['urgell', 'solsones', 'noguera'] },
  { id: 'solsones', mode: 'remot', cap: 'Solsona', km: 77.1, min: 66, slug: 'solsones', nom: { ca: 'Solsonès', es: 'Solsonés' }, veines: ['segarra', 'alt-urgell', 'noguera'] },
  { id: 'alt-urgell', mode: 'remot', cap: "la Seu d'Urgell", capEs: "La Seu d'Urgell", km: 125.7, min: 113, slug: 'alt-urgell', nom: { ca: 'Alt Urgell', es: 'Alto Urgel' }, veines: ['cerdanya', 'pallars-sobira', 'solsones'] },
  { id: 'pallars-jussa', mode: 'remot', cap: 'Tremp', km: 77.8, min: 72, slug: 'pallars-jussa', nom: { ca: 'Pallars Jussà', es: 'Pallars Jussà' }, veines: ['pallars-sobira', 'noguera', 'alta-ribagorca'] },
  { id: 'pallars-sobira', mode: 'remot', cap: 'Sort', km: 118.5, min: 113, slug: 'pallars-sobira', nom: { ca: 'Pallars Sobirà', es: 'Pallars Sobirà' }, veines: ['pallars-jussa', 'aran', 'alt-urgell'] },
  { id: 'alta-ribagorca', mode: 'remot', cap: 'el Pont de Suert', capEs: 'El Pont de Suert', km: 144.1, min: 119, slug: 'alta-ribagorca', nom: { ca: 'Alta Ribagorça', es: 'Alta Ribagorza' }, veines: ['pallars-jussa', 'pallars-sobira', 'aran'] },
  { id: 'aran', mode: 'remot', cap: 'Vielha', km: 184.3, min: 158, slug: 'val-d-aran', nom: { ca: "Val d'Aran", es: 'Valle de Arán' }, veines: ['pallars-sobira', 'alta-ribagorca', 'pallars-jussa'] },
  { id: 'cerdanya', mode: 'remot', cap: 'Puigcerdà', km: 182.1, min: 134, slug: 'cerdanya', nom: { ca: 'Cerdanya', es: 'Cerdaña' }, veines: ['alt-urgell', 'solsones', 'pallars-sobira'] },
];
export const PER_ID = Object.fromEntries(COMARQUES.map(c => [c.id, c]));

// ---------- rutes ----------
export const RUTA_INDEX = { ca: '/on-treballo/', es: '/es/donde-trabajo/' };
export const rutaComarca = (c, lang) => `${RUTA_INDEX[lang]}${c.slug}/`;

// ---------- textos de la interfície d'aquestes pàgines ----------
export const UI = {
  ca: {
    index: 'On treballo', tornar: 'Totes les comarques', enPersona: 'En persona', remot: 'Sobretot en remot',
    desDe: 'Des de Mollerussa', enCotxe: 'en cotxe', aprox: 'Estimació amb OpenStreetMap, sense trànsit ni neu.',
    fonts: 'Fonts', fontsIntro: 'Les xifres i els fets d\'aquesta pàgina surten d\'aquestes fonts, consultades el novembre del 2026. Les opinions són meves.',
    altres: 'Altres comarques', altresIntro: 'Les que tenen més a prop:', consultat: 'consultat el 11/2026',
    legendaPersona: 'Hi vaig en persona', legendaRemot: 'Sobretot en remot, amb visita si cal', legendaFita: 'Mollerussa, on visc',
    mapaTitol: 'Mapa de les 13 comarques de Ponent i del Pirineu on treballa Bildane', mapaDescripcio: 'Les comarques on hi vaig en persona són blaves; les altres, blanques. La fita marca Mollerussa.',
    mapaMini: nom => `Mapa de situació: la comarca ${nom} destacada entre les 13 on treballa Bildane`,
    pobles: 'Pobles', km: 'km', min: 'min', tema: 'Tema',
    nota: 'La nota número',
  },
  es: {
    index: 'Dónde trabajo', tornar: 'Todas las comarcas', enPersona: 'En persona', remot: 'Sobre todo en remoto',
    desDe: 'Desde Mollerussa', enCotxe: 'en coche', aprox: 'Estimación con OpenStreetMap, sin tráfico ni nieve.',
    fonts: 'Fuentes', fontsIntro: 'Las cifras y los hechos de esta página salen de estas fuentes, consultadas en noviembre de 2026. Las opiniones son mías.',
    altres: 'Otras comarcas', altresIntro: 'Las que tienes más cerca:', consultat: 'consultado el 11/2026',
    legendaPersona: 'Voy en persona', legendaRemot: 'Sobre todo en remoto, con visita si hace falta', legendaFita: 'Mollerussa, donde vivo',
    mapaTitol: 'Mapa de las 13 comarcas de Poniente y del Pirineo donde trabaja Bildane', mapaDescripcio: 'Las comarcas a las que voy en persona son azules; las otras, blancas. La fita marca Mollerussa.',
    mapaMini: nom => `Mapa de situación: la comarca ${nom} destacada entre las 13 donde trabaja Bildane`,
    pobles: 'Pueblos', km: 'km', min: 'min', tema: 'Tema',
    nota: 'La nota número',
  },
};

// ---------- fonts ----------
// Cada font té un id, un enllaç, i un títol i un editor en cada llengua.
const idescatFont = (id, lang, quina) => {
  const c = IDESCAT.comarques[id], f = c.fonts[quina] || {};
  const t = {
    poblacio: { ca: 'Població. Per sexe i edat (cens de població anual de l\'INE)', es: 'Población. Por sexo y edad (censo de población anual del INE)', per: '2025' },
    superficie: { ca: 'Indicadors del territori: superfície i densitat', es: 'Indicadores del territorio: superficie y densidad', per: '2025' },
    afTotal: { ca: 'Afiliacions al règim general de la Seguretat Social per sectors, segons la ubicació del compte de cotització', es: 'Afiliaciones al régimen general de la Seguridad Social por sectores, según la ubicación de la cuenta de cotización', per: 'setembre del 2026 (dada provisional)', perEs: 'septiembre de 2026 (dato provisional)' },
    sau: { ca: 'Cens agrari 2020. Superfície agrícola utilitzada i terres llaurades per tipus de conreu (ha)', es: 'Censo agrario 2020. Superficie agrícola utilizada y tierras labradas por tipo de cultivo (ha)', per: '2020' },
    bovins: { ca: 'Cens agrari 2020. Caps de bestiar per espècies', es: 'Censo agrario 2020. Cabezas de ganado por especies', per: '2020' },
    hotels: { ca: 'Allotjaments turístics (hotels, càmpings i turisme rural)', es: 'Alojamientos turísticos (hoteles, campings y turismo rural)', per: '2025' },
  }[quina];
  const enllac = f.enllac || IDESCAT.comarques[id].fonts.poblacio?.enllac;
  return { url: enllac, titol: t[lang], editor: 'Idescat, Institut d\'Estadística de Catalunya', periode: lang === 'es' && t.perEs ? t.perEs : t.per };
};

// Les fonts que no són d'Idescat (comuns a diverses comarques).
const FIXES = {
  osrm: { url: 'https://project-osrm.org/', ca: { titol: 'Distància i temps per carretera, des de Mollerussa', editor: 'OSRM amb dades d\'OpenStreetMap (© col·laboradors d\'OpenStreetMap)', nota: 'Estimació de novembre del 2026, sense trànsit ni neu; a l\'hivern a la muntanya compta més temps.' },
    es: { titol: 'Distancia y tiempo por carretera, desde Mollerussa', editor: 'OSRM con datos de OpenStreetMap (© colaboradores de OpenStreetMap)', nota: 'Estimación de noviembre de 2026, sin tráfico ni nieve; en invierno en la montaña cuenta más tiempo.' } },
  ec_canal: { url: 'https://www.enciclopedia.cat/gran-enciclopedia-catalana/canal-durgell', ca: { titol: 'Canal d\'Urgell', editor: 'Gran Enciclopèdia Catalana' }, es: { titol: 'Canal d\'Urgell', editor: 'Gran Enciclopèdia Catalana' } },
  ec_fira: { url: 'https://www.enciclopedia.cat/EC-GEC-0244645', ca: { titol: 'Fira de Teatre al Carrer de Tàrrega', editor: 'Gran Enciclopèdia Catalana' }, es: { titol: 'Fira de Teatre al Carrer de Tàrrega', editor: 'Gran Enciclopèdia Catalana' } },
  udl: { url: 'https://ca.wikipedia.org/wiki/Universitat_de_Lleida', ca: { titol: 'Universitat de Lleida', editor: 'Viquipèdia' }, es: { titol: 'Universitat de Lleida', editor: 'Viquipèdia (en catalán)' } },
  parc_montsec: { url: 'https://www.parcastronomic.cat/en/', ca: { titol: 'Parc Astronòmic del Montsec', editor: 'Web oficial del parc', nota: 'Són paraules del mateix parc.' }, es: { titol: 'Parc Astronòmic del Montsec', editor: 'Web oficial del parque', nota: 'Son palabras del propio parque.' } },
  dop: { url: 'https://www.olidoplesgarrigues.com', ca: { titol: 'DOP Les Garrigues. Oli d\'oliva arbequina verge extra', editor: 'Consell Regulador de la DOP Les Garrigues' }, es: { titol: 'DOP Les Garrigues. Aceite de oliva arbequina virgen extra', editor: 'Consejo Regulador de la DOP Les Garrigues' } },
  ec_guissona: { url: 'https://www.enciclopedia.cat/gran-enciclopedia-catalana/guissona', ca: { titol: 'Guissona', editor: 'Gran Enciclopèdia Catalana' }, es: { titol: 'Guissona', editor: 'Gran Enciclopèdia Catalana' } },
  festa: { url: 'https://ca.wikipedia.org/wiki/Festa_Major_de_Solsona', ca: { titol: 'Festa Major de Solsona', editor: 'Viquipèdia', nota: 'Cita el Catàleg del patrimoni festiu de Catalunya, de la Generalitat.' }, es: { titol: 'Festa Major de Solsona', editor: 'Viquipèdia (en catalán)', nota: 'Cita el Catálogo del patrimonio festivo de Cataluña, de la Generalitat.' } },
  parc_olimpic: { url: 'https://ca.wikipedia.org/wiki/Parc_Ol%C3%ADmpic_del_Segre', ca: { titol: 'Parc Olímpic del Segre', editor: 'Viquipèdia' }, es: { titol: 'Parc Olímpic del Segre', editor: 'Viquipèdia (en catalán)' } },
  geoparc: { url: 'https://www.geoparcorigens.cat/', ca: { titol: 'Geoparc mundial UNESCO Orígens', editor: 'Web oficial del Geoparc' }, es: { titol: 'Geoparque mundial UNESCO Orígens', editor: 'Web oficial del Geoparque' } },
  aiguestortes: { url: 'https://ca.wikipedia.org/wiki/Parc_Nacional_d%27Aig%C3%BCestortes_i_Estany_de_Sant_Maurici', ca: { titol: 'Parc Nacional d\'Aigüestortes i Estany de Sant Maurici', editor: 'Viquipèdia' }, es: { titol: 'Parc Nacional d\'Aigüestortes i Estany de Sant Maurici', editor: 'Viquipèdia (en catalán)' } },
  vall_boi: { url: 'https://en.wikipedia.org/wiki/Catalan_Romanesque_Churches_of_the_Vall_de_Bo%C3%AD', ca: { titol: 'Catalan Romanesque Churches of the Vall de Boí (ref. UNESCO 988)', editor: 'Wikipedia (en anglès)' }, es: { titol: 'Catalan Romanesque Churches of the Vall de Boí (ref. UNESCO 988)', editor: 'Wikipedia (en inglés)' } },
  baqueira: { url: 'https://ca.wikipedia.org/wiki/Baqueira-Beret', ca: { titol: 'Baqueira-Beret', editor: 'Viquipèdia' }, es: { titol: 'Baqueira-Beret', editor: 'Viquipèdia (en catalán)' } },
  aranes: { url: 'https://ca.wikipedia.org/wiki/Aran%C3%A8s', ca: { titol: 'Aranès', editor: 'Viquipèdia' }, es: { titol: 'Aranès', editor: 'Viquipèdia (en catalán)' } },
  hospital: { url: 'https://ca.wikipedia.org/wiki/Hospital_de_Cerdanya', ca: { titol: 'Hospital de Cerdanya', editor: 'Viquipèdia' }, es: { titol: 'Hospital de Cerdanya', editor: 'Viquipèdia (en catalán)' } },
  geoparc_wp: { url: 'https://ca.wikipedia.org/wiki/Geoparc_Or%C3%ADgens', ca: { titol: 'Geoparc Orígens', editor: 'Viquipèdia' }, es: { titol: 'Geoparc Orígens', editor: 'Viquipèdia (en catalán)' } },
  cerdanya: { url: 'https://ca.wikipedia.org/wiki/Cerdanya', ca: { titol: 'Cerdanya', editor: 'Viquipèdia' }, es: { titol: 'Cerdanya', editor: 'Viquipèdia (en catalán)' } },
  icgc: { url: 'https://www.icgc.cat/en/Geoinformation-and-Maps/Online-services-Geoservices/WMS-and-WFS-Administrative-Boundaries/WMS-and-WFS-Administrative-divisions', ca: { titol: 'Divisions administratives (WFS), 1:50 000', editor: 'Institut Cartogràfic i Geològic de Catalunya', nota: 'Els límits del mapa.' }, es: { titol: 'Divisiones administrativas (WFS), 1:50 000', editor: 'Institut Cartogràfic i Geològic de Catalunya', nota: 'Los límites del mapa.' } },
};
// Les fonts d'Idescat canvien de comarca (l'enllaç porta el codi).

export function fontsInfo(id, clau, lang) {
  if (clau.startsWith('idescat_')) return idescatFont(id, lang, clau.slice(8));
  const f = FIXES[clau];
  if (!f) throw new Error(`Font desconeguda: ${clau}`);
  return { url: f.url, ...f[lang] };
}

// ---------- format de nombres ----------
const miles = (n, lang) => {
  // amb punt des dels quatre dígits, en les dues llengües: dins d'una frase no es barregen «7500» i «10.651»
  const s = Math.round(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
const decimal = (n, lang, d = 1) => n.toFixed(d).replace('.', ',');

// La distància que es mostra: números rodons, que no semblin mesurats al metre.
export const kmRodo = km => (km === 0 ? 0 : km < 30 ? Math.round(km) : Math.round(km / 5) * 5);
export const minRodo = m => (m === 0 ? 0 : Math.round(m / 5) * 5);

/**
 * El context d'una comarca per a un text: dades formatades i funcions per citar fonts i enllaçar serveis.
 * `x.n('poblacio')` → «38.529»; `x.cita('idescat_poblacio')` → una nota numerada que es registra;
 * `x.s('albarans', 'els albarans')` → un enllaç a la pàgina del servei.
 */
export function contextDe(id, lang, serveis) {
  const c = PER_ID[id], d = IDESCAT.comarques[id].dades;
  const notes = [];        // fonts citades, en ordre
  const n = k => (d[k] == null ? '' : miles(d[k], lang));
  const placesN = (d.placesHotels ?? 0) + (d.placesCampings ?? 0) + (d.placesTurismeRural ?? 0);
  const pc = (a, b, dec = 0) => decimal(100 * a / b, lang, dec).replace(/,0$/, '');
  const x = {
    c, d, lang, notes,
    n,
    km: String(kmRodo(c.km)), min: String(minRodo(c.min)),
    // percentatge d'un sector sobre el total d'afiliacions de la comarca i de Catalunya
    af: sector => pc(d['af' + sector], d.afTotal),
    afCat: sector => pc(d['cat_af' + sector], d.cat_afTotal, 1),
    pct: (a, b, dec = 0) => pc(d[a], d[b], dec),
    dens: () => (d.densitat != null ? decimal(d.densitat, lang) : ''),
    km2: () => (d.superficie != null ? miles(d.superficie, lang) : ''),
    // suma de places d'allotjament (hotels + càmpings + turisme rural), i la seva proporció per habitant
    places: () => miles(placesN, lang),
    pesPlaces: () => pc(placesN, d.poblacio),
    placesH: () => decimal(placesN / d.poblacio, lang, 2),
    placesHCat: () => decimal((d.cat_placesHotels + d.cat_placesCampings + d.cat_placesTurismeRural) / d.cat_poblacio, lang, 2),
    placesPer10: () => String(Math.round(placesN / d.poblacio * 10)),
    porcsHab: () => String(Math.round(d.porcins / d.poblacio)),
    densCat: () => miles(d.cat_densitat, lang),
    allotj: () => miles((d.hotels ?? 0) + (d.campings ?? 0) + (d.turismeRural ?? 0), lang),
    cita(clau) {
      let i = notes.findIndex(f => f.clau === clau);
      if (i < 0) { notes.push({ clau, usos: 0, ...fontsInfo(id, clau, lang) }); i = notes.length - 1; }
      const k = i + 1, u = ++notes[i].usos;
      return `<sup class="nota"><a href="#font-${k}" id="ref-${k}-${u}" aria-label="${UI[lang].nota} ${k}">[${k}]</a></sup>`;
    },
    s(servei, text) {
      const sv = serveis.find(s => s.id === servei);
      if (!sv) throw new Error('Servei desconegut: ' + servei);
      return `<a href="${sv.ruta[lang]}">${text || sv[lang].nom}</a>`;
    },
  };
  return x;
}
