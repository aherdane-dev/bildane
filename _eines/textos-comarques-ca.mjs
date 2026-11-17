// Textos de les pàgines de comarca, en català. Cada comarca és una funció de `x` (vegeu comarques.mjs):
// les xifres surten de les dades d'Idescat i cada fet porta la nota de la seva font; les opinions, en primera persona.
// Regles: res d'inventat (clients, projectes, opinions, xifres, comportaments de clients); cada pàgina té el seu fil
// i la seva estructura (nombre de blocs, ordre, mida, xifra destacada): no són una plantilla amb el nom canviat.
// Criteri únic de distància: fins a uns 35 minuts de Mollerussa hi vaig en persona; més lluny, sobretot en remot,
// amb visita quan val la pena. Els noms de comarca en castellà (Urgel, Alto Urgel, Solsonés, Alta Ribagorza,
// Cerdaña, Valle de Arán) són els que tenen forma castellana usual; els altres es deixen en català.
// Camps: titol (h1), seoTitol, seoDescripcio (≤ 155), entradeta, destacat { valor, text }, blocs [{ titol, p: [] }], wa.

export const CA = {
  'pla-urgell': x => ({
    titol: "Mollerussa, casa meva: el Pla d'Urgell",
    seoTitol: "Webs i albarans al Pla d'Urgell, des de Mollerussa",
    seoDescripcio: "Visc a Mollerussa i treballo per a negocis i empreses del Pla d'Urgell: webs, albarans llegits amb IA, assistents i botigues en línia. Hi vaig en persona.",
    entradeta: "Visc a Mollerussa. Els pobles del Pla d'Urgell em queden a menys de mitja hora, i hi vaig a veure el negoci quan cal.",
    destacat: { valor: '1853', text: `any en què es va establir a Mollerussa l'administració dels canals d'Urgell${x.cita('ec_canal')}` },
    blocs: [
      { titol: 'On ens veiem', p: [
        "A Mollerussa, Linyola, Bellvís, Vila-sana o Fondarella m'assec al teu mostrador, a la nau o a la cuina, i mirem què fa falta amb el negoci davant. A Miralcamp, Castellnou de Seana, el Poal o Torregrossa és igual; només canvien els minuts de carretera. Entre una visita i l'altra ens escrivim per WhatsApp.",
      ] },
      { titol: 'El canal', p: [
        `Segons l'Enciclopèdia Catalana, el 1964, en acabar la concessió, la propietat dels canals va passar als regants, i el 1900 ja s'havien alliberat del guaret almenys 41.000 ha a les terres que rega arreu de la plana${x.cita('ec_canal')}. Avui, de les ${x.n('sau')} ha de superfície agrícola del Pla d'Urgell, ${x.n('cereals')} són de cereals i ${x.n('fruiters')} de fruiters${x.cita('idescat_sau')}.`,
        `Les afiliacions al règim general (setembre del 2026, dada provisional) es compten per la ubicació del compte de cotització, no per on viu qui treballa. Dins d'aquest recompte, la indústria és el ${x.af('Industria')} % a la comarca (a Catalunya, el ${x.afCat('Industria')} %) i els serveis, el ${x.af('Serveis')} %${x.cita('idescat_afTotal')}.`,
      ] },
      { titol: 'Què hi poso jo', p: [
        `Per a les empreses que reben mercaderia cada dia i en passen els albarans a mà, hi ha ${x.s('albarans', 'la lectura d\'albarans amb IA')}. Per a un comerç o un bar de Mollerussa, ${x.s('webs', 'una web')}; i si a l'hora punta no pots agafar el telèfon, ${x.s('telefon', 'un assistent que el contesti')}.`,
      ] },
    ],
    wa: "Hola Bilal, tinc un negoci al Pla d'Urgell i voldria parlar amb tu.",
  }),

  urgell: x => ({
    titol: "L'Urgell: Tàrrega, la Fira i molt de camp",
    seoTitol: "Webs i Google Business a Tàrrega i l'Urgell",
    seoDescripcio: "Webs, fitxa de Google, carta QR i albarans llegits amb IA per a negocis de Tàrrega, Bellpuig, Agramunt i l'Urgell. Hi vaig en persona des de Mollerussa.",
    entradeta: `Tàrrega és a uns ${x.km} km de Mollerussa, uns ${x.min} minuts: hi vaig i torno a mig matí.`,
    destacat: { valor: x.n('cereals'), text: `ha de cereal, el ${x.pct('cereals', 'sau')} % de la superfície agrícola de la comarca${x.cita('idescat_sau')}` },
    blocs: [
      { titol: 'La Fira', p: [
        `La Fira de Teatre al Carrer de Tàrrega es va fundar el 1981 i se celebra cada any el segon cap de setmana de setembre${x.cita('ec_fira')}. Si tens un comerç al centre, la fitxa de Google pot dir l'horari d'aquells dies i no el de sempre: ${x.s('google', 'ho faig jo')}. I per a un bar o un restaurant, ${x.s('carta', 'la carta al mòbil del client, amb un QR a la taula')}.`,
      ] },
      { titol: 'El camp', p: [
        `A l'Urgell hi ha també ${x.n('vinya')} ha de vinya i ${x.n('oliveres')} d'olivera${x.cita('idescat_sau')}. Viuen a la comarca ${x.n('poblacio')} persones, ${x.dens()} per km²${x.cita('idescat_poblacio')}. Per a les empreses que arrosseguen papers d'entrada i sortida de mercaderia, ${x.s('albarans', 'els albarans a l\'Excel')}.`,
      ] },
      { titol: 'Com hi arribo', p: [
        "A Tàrrega, Bellpuig, Anglesola, Verdú o Agramunt hi vaig en persona, i intento agrupar les visites de la comarca en un sol dia. Guimerà o Maldà, més endins, són uns 35 minuts: hi vaig igual, però abans miro per telèfon què cal veure al lloc.",
      ] },
    ],
    wa: "Hola Bilal, tinc un negoci a l'Urgell (Tàrrega o voltants) i voldria parlar amb tu.",
  }),

  segria: x => ({
    titol: 'Albarans de fruita: Lleida i el Segrià',
    seoTitol: 'Albarans, webs i Google a Lleida i al Segrià',
    seoDescripcio: 'Albarans llegits amb IA per a magatzems i centrals de fruita, i webs i assistents per a negocis de Lleida, Alpicat o Almacelles. Hi vaig en persona.',
    entradeta: `Lleida és a uns ${x.km} km de Mollerussa, uns ${x.min} minuts: la ciutat gran més a prop, i la comarca amb més gent de totes on treballo.`,
    destacat: { valor: `${x.pct('fruiters', 'sau')} %`, text: `de la superfície agrícola són fruiters a l'aire lliure: ${x.n('fruiters')} ha de ${x.n('sau')}${x.cita('idescat_sau')}` },
    blocs: [
      { titol: 'On més falten els números', p: [
        `Una central de fruita rep i envia mercaderia amb albarà; si algú els acaba picant a un full de càlcul, això és el que faig amb ${x.s('albarans', 'els albarans llegits amb IA')}: una foto de l'albarà i les dades a l'Excel. Per a magatzems i centrals de fruita és el servei on em sembla que puc aportar més.`,
      ] },
      { titol: 'La ciutat', p: [
        `Al Segrià viuen ${x.n('poblacio')} persones${x.cita('idescat_poblacio')}, i el ${x.af('Serveis')} % de les afiliacions al règim general (setembre del 2026, dada provisional) són de serveis${x.cita('idescat_afTotal')}. Per a un bar, un restaurant o una consulta de Lleida, hi ha ${x.s('telefon', 'l\'assistent telefònic')}, ${x.s('google', 'la fitxa de Google i el mapa')}.`,
      ] },
      { titol: 'Com treballo aquí', p: [
        "Hi vaig en persona: Lleida, Alpicat, Torrefarrera, Almacelles, Alcarràs, Aitona. Soc un de sol; si busques una agència amb equip, no soc jo.",
      ] },
    ],
    wa: 'Hola Bilal, tinc un negoci a Lleida / al Segrià i voldria parlar amb tu.',
  }),

  noguera: x => ({
    titol: 'La Noguera: Balaguer, el Montsec i molt de terreny',
    seoTitol: 'Webs i Google per a negocis de la Noguera',
    seoDescripcio: 'Webs, fitxa de Google i botigues en línia per a negocis i allotjaments de Balaguer, Artesa de Segre, Ponts i el Montsec. Hi vaig en persona.',
    entradeta: `Balaguer és a uns ${x.km} km de Mollerussa, uns ${x.min} minuts; Artesa de Segre, Ponts i Àger, a prop d'una hora.`,
    destacat: { valor: x.dens(), text: `habitants per km², quan a Catalunya en són ${x.densCat()}${x.cita('idescat_poblacio')}` },
    blocs: [
      { titol: 'El cereal i la vinya', p: [
        `La comarca fa ${x.km2()} km² i hi viuen ${x.n('poblacio')} persones${x.cita('idescat_poblacio')}. Dos terços de la superfície agrícola són de cereal (${x.n('cereals')} ha de ${x.n('sau')}) i hi ha ${x.n('vinya')} ha de vinya${x.cita('idescat_sau')}.`,
      ] },
      { titol: 'El Parc Astronòmic', p: [
        `A Àger hi ha el Parc Astronòmic del Montsec, que es presenta com el millor lloc de Catalunya per observar el cel i ho avala amb el premi internacional Starlight${x.cita('parc_montsec')}. Idescat compta a la comarca ${x.n('campings')} càmpings (${x.n('placesCampings')} places) i ${x.n('turismeRural')} allotjaments de turisme rural (${x.n('placesTurismeRural')} places)${x.cita('idescat_hotels')}. Per a un càmping o una casa rural, el que et troba és ${x.s('google', 'la fitxa de Google')} i ${x.s('webs', 'una web clara')}.`,
      ] },
      { titol: 'Els quilòmetres', p: [
        "Balaguer, Térmens, Menàrguens, Vallfogona de Balaguer o Camarasa són a mitja hora o poc més: hi vaig en persona. Artesa de Segre, Ponts i Àger són a prop d'una hora: hi vaig si la visita val el viatge, i la resta ho fem en remot.",
      ] },
    ],
    wa: 'Hola Bilal, tinc un negoci a la Noguera i voldria parlar amb tu.',
  }),

  garrigues: x => ({
    titol: "Les Garrigues: l'oli i la botiga en línia",
    seoTitol: "Botigues en línia per a l'oli de les Garrigues",
    seoDescripcio: "Botigues en línia amb WooCommerce i webs per a productors i comerços de les Garrigues. Les Borges Blanques és a 15 minuts de Mollerussa.",
    entradeta: `Les Borges Blanques és a uns ${x.km} km de Mollerussa, uns ${x.min} minuts: després del Pla d'Urgell, la comarca que em queda més a prop.`,
    destacat: { valor: '1975', text: `any en què Les Garrigues va ser la primera DOP alimentària reconeguda a l'Estat espanyol${x.cita('dop')}` },
    blocs: [
      { titol: "L'oli amb nom", p: [
        `La Unió Europea va certificar la denominació com a DOP el 1996, i el consell regulador diu que és un oli d'oliva arbequina${x.cita('dop')}. Les oliveres ocupen el ${x.pct('oliveres', 'sau')} % de la superfície agrícola: ${x.n('oliveres')} ha de ${x.n('sau')}${x.cita('idescat_sau')}. En afiliacions al règim general (setembre del 2026, dada provisional), l'agricultura pesa el ${x.af('Agricultura')} % a la comarca i el ${x.afCat('Agricultura')} % a Catalunya${x.cita('idescat_afTotal')}.`,
      ] },
      { titol: 'Què faig', p: [
        `Faig la botiga en línia: ${x.s('botiga', 'catàleg, cistella, pagament i preus d\'enviament')}, i després la pots gestionar tu des del mòbil. Per a un oli, decidim junts quins formats es venen. Un cop feta, ${x.s('manteniment', 'el manteniment')} la manté al dia.`,
      ] },
      { titol: 'Per aquí', p: [
        `Les Borges Blanques, Juneda i Arbeca són a un quart d'hora i Vinaixa a uns 30 minuts: hi vaig en persona. El Cogul (uns 40 minuts) i la Granadella (uns 55) els porto més en remot, i hi vaig si val la pena. A la comarca hi viuen ${x.n('poblacio')} persones en ${x.km2()} km² (${x.dens()} per km²)${x.cita('idescat_poblacio')}.`,
      ] },
    ],
    wa: 'Hola Bilal, tinc un negoci o una cooperativa a les Garrigues i voldria parlar amb tu.',
  }),

  segarra: x => ({
    titol: "La Segarra: Cervera, Guissona i el 65 % de les afiliacions a la indústria",
    seoTitol: 'Albarans, webs i Google a Cervera i a la Segarra',
    seoDescripcio: 'Albarans llegits amb IA, webs i fitxes de Google per a empreses i comerços de Cervera, Guissona i la Segarra. Cervera és a mitja hora de Mollerussa.',
    entradeta: `Cervera és a uns ${x.km} km de Mollerussa, uns ${x.min} minuts; Guissona, a uns 35 minuts.`,
    destacat: { valor: `${x.af('Industria')} %`, text: `de les afiliacions al règim general són d'indústria; a Catalunya, el ${x.afCat('Industria')} %${x.cita('idescat_afTotal')}` },
    blocs: [
      { titol: 'La xifra', p: [
        `Les afiliacions al règim general (setembre del 2026, dada provisional) compten per la ubicació del compte de cotització de l'empresa, no per la residència de qui hi treballa. A Guissona hi ha la Corporació Alimentària Guissona, que l'Enciclopèdia Catalana situa entre les empreses més importants de la província de Lleida i entre les indústries alimentàries més grans de l'Estat${x.cita('ec_guissona')}. La xifra no diu què necessita cada empresa; això ho he de preguntar a cada una.`,
      ] },
      { titol: 'On hi vaig', p: [
        `Cervera, Sant Guim de Freixenet, Ribera d'Ondara, Torrefeta i Florejacs o Guissona: hi vaig en persona. A la comarca viuen ${x.n('poblacio')} persones${x.cita('idescat_poblacio')}, repartides per pobles com Talavera, Sanaüja o les Oluges.`,
      ] },
      { titol: 'Papers i fitxes', p: [
        `Una empresa que carrega, transporta o repara per a la indústria sol tenir albarans de paper o en foto de mòbil; si és el teu cas, ${x.s('albarans', 'els passo a l\'Excel a partir d\'una foto')}. Per a un comerç de Cervera o de Talavera, ${x.s('google', 'una fitxa de Google al dia')}.`,
      ] },
    ],
    wa: 'Hola Bilal, tinc una empresa o un comerç a la Segarra i voldria parlar amb tu.',
  }),

  solsones: x => ({
    titol: 'El Solsonès: la Festa Major i 146 cases rurals',
    seoTitol: 'Webs i fitxa de Google per a negocis del Solsonès',
    seoDescripcio: "Webs, fitxa de Google i assistent de xat per a cases rurals, restaurants i comerços de Solsona. Sobretot en remot, amb visita quan val la pena.",
    entradeta: `Solsona és a uns ${x.km} km de Mollerussa, uns ${x.min} minuts: hi treballo sobretot en remot, i vinc quan val la pena.`,
    destacat: { valor: x.n('turismeRural'), text: `allotjaments de turisme rural, de ${x.allotj()} allotjaments turístics (hotels, càmpings i turisme rural)${x.cita('idescat_hotels')}` },
    blocs: [
      { titol: 'La festa i les places', p: [
        `La Festa Major de Solsona, amb els gegants, l'Àliga i els Nans, va ser declarada festa patrimonial d'interès nacional el 2008${x.cita('festa')}. A l'allotjament, per nombre d'establiments, el que més hi ha és la casa rural; per places, els càmpings en tenen més (${x.n('placesCampings')}), seguits del turisme rural (${x.n('placesTurismeRural')}) i dels hotels (${x.n('placesHotels')}): ${x.places()} places per a ${x.n('poblacio')} habitants${x.cita('idescat_poblacio')}.`,
      ] },
      { titol: 'Remot, amb visita quan toca', p: [
        `Amb negocis de Solsona, Olius, Riner o Sant Llorenç de Morunys, ens veiem per vídeo o per WhatsApp: m'envies fotos i m'expliques què hi ha, i jo faig la feina. Si val la pena veure el lloc, hi vaig; a més d'una hora de carretera no et prometo ser-hi cada setmana. Si et fan cada dia les mateixes preguntes de preus o de condicions, ${x.s('xat', 'un assistent de xat')} les respon per tu.`,
      ] },
    ],
    wa: 'Hola Bilal, tinc un negoci al Solsonès i voldria parlar amb tu.',
  }),

  'alt-urgell': x => ({
    titol: "L'Alt Urgell: la Seu, el Segre i piragües olímpiques",
    seoTitol: "Webs i Google per a negocis de l'Alt Urgell",
    seoDescripcio: "Webs i fitxa de Google per a allotjaments, restaurants i empreses d'aventura de la Seu d'Urgell. Treball en remot, amb visita si cal.",
    entradeta: `La Seu d'Urgell queda a uns ${x.km} km de Mollerussa, uns ${x.min} minuts: gairebé dues hores. Per això no hi vaig com vaig a Tàrrega, i t'ho explico.`,
    destacat: { valor: '1992', text: `any dels Jocs de Barcelona: a la Seu es va fer l'eslàlom de piragüisme, al Parc Olímpic del Segre${x.cita('parc_olimpic')}` },
    blocs: [
      { titol: 'El Parc Olímpic', p: [
        `El parc es va construir per als Jocs de Barcelona i després va acollir els mundials del 1999 i del 2009${x.cita('parc_olimpic')}. Idescat compta a la comarca ${x.n('hotels')} hotels, ${x.n('campings')} càmpings i ${x.n('turismeRural')} allotjaments de turisme rural, amb ${x.places()} places en total; hi viuen ${x.n('poblacio')} persones en ${x.km2()} km²${x.cita('idescat_hotels')}${x.cita('idescat_poblacio')}. Per a una empresa d'aventura o un allotjament, ${x.s('google', 'la fitxa de Google')} i ${x.s('webs', 'una web')}.`,
      ] },
      { titol: 'Com ho porto des de lluny', p: [
        "Per a la Seu, Oliana, Organyà, Coll de Nargó o Bassella treballo en remot: reunió per vídeo, les fotos que m'envies, i jo faig la web. Una visita, si cal, la fem un dia que combini coses; el viatge és llarg, i a l'hivern més.",
      ] },
    ],
    wa: "Hola Bilal, tinc un negoci a l'Alt Urgell i voldria parlar amb tu.",
  }),

  'pallars-jussa': x => ({
    titol: 'El Pallars Jussà: Tremp i un geoparc de la UNESCO',
    seoTitol: 'Webs i Google per a negocis del Pallars Jussà',
    seoDescripcio: "Webs, botigues en línia i fitxa de Google per a productors, allotjaments i comerços de Tremp i el Pallars Jussà. Sobretot en remot.",
    entradeta: `Tremp és a uns ${x.km} km de Mollerussa, uns ${x.min} minuts: hi treballo en remot, i vaig als llocs quan val la pena. Isona, Senterada o la Torre de Cabdella són més lluny, i hi arribo després de mirar què es pot resoldre per telèfon.`,
    destacat: { valor: x.n('ovins'), text: `caps d'oví: més de tres per habitant${x.cita('idescat_bovins')}${x.cita('idescat_poblacio')}` },
    blocs: [
      { titol: 'El Geoparc', p: [
        `El Geoparc mundial UNESCO Orígens ensenya la història geològica de la zona amb georutes, museus i centres d'interpretació${x.cita('geoparc')}. Té 19 municipis de quatre comarques, i 14 són del Pallars Jussà${x.cita('geoparc_wp')}. Idescat compta a la comarca ${x.n('hotels')} hotels (${x.n('placesHotels')} places), ${x.n('campings')} càmpings (${x.n('placesCampings')}) i ${x.n('turismeRural')} allotjaments de turisme rural (${x.n('placesTurismeRural')}), per a ${x.n('poblacio')} habitants en ${x.km2()} km²${x.cita('idescat_hotels')}${x.cita('idescat_poblacio')}.`,
      ] },
      { titol: 'Productors i visitants', p: [
        `Un productor de formatge, carn o mel pot vendre fora de la comarca amb ${x.s('botiga', 'una botiga en línia')}. Per a qui treballa amb visitants del geoparc, ${x.s('google', 'la fitxa de Google')}.`,
      ] },
    ],
    wa: 'Hola Bilal, tinc un negoci al Pallars Jussà i voldria parlar amb tu.',
  }),

  'pallars-sobira': x => ({
    titol: 'El Pallars Sobirà: Sort, Espot i 22 càmpings',
    seoTitol: 'Webs per a càmpings del Pallars Sobirà',
    seoDescripcio: "Webs i assistent de xat per a càmpings, allotjaments i restaurants de Sort, Espot i el Pallars Sobirà. Sobretot en remot, amb visita si cal.",
    entradeta: `Sort és a uns ${x.km} km de Mollerussa, uns ${x.min} minuts: gairebé dues hores. Aquí viuen cinc persones per km².`,
    destacat: { valor: x.n('campings'), text: `càmpings, amb ${x.n('placesCampings')} places: cap de les altres dotze comarques on treballo en té tants${x.cita('idescat_hotels')}` },
    blocs: [
      { titol: 'Un parc nacional', p: [
        `El Parc Nacional d'Aigüestortes i Estany de Sant Maurici, declarat el 21 d'octubre de 1955, s'estén per quatre comarques; el Pallars Sobirà és una d'elles, i Espot és un dels dos municipis on es troba la zona interna del parc${x.cita('aiguestortes')}. Idescat hi compta també ${x.n('hotels')} hotels (${x.n('placesHotels')} places) i ${x.n('turismeRural')} allotjaments de turisme rural (${x.n('placesTurismeRural')}): ${x.places()} places per a ${x.n('poblacio')} habitants${x.cita('idescat_poblacio')}.`,
      ] },
      { titol: 'En remot', p: [
        `Treballo en remot. Un càmping rep cada dia les mateixes preguntes (tarifes, condicions, com arribar): ${x.s('xat', 'un assistent de xat')} les respon per tu.`,
      ] },
    ],
    wa: 'Hola Bilal, tinc un negoci al Pallars Sobirà i voldria parlar amb tu.',
  }),

  'alta-ribagorca': x => ({
    titol: "L'Alta Ribagorça: la Vall de Boí i els nou temples romànics",
    seoTitol: 'Webs i Google per a negocis de la Vall de Boí',
    seoDescripcio: "Webs i fitxa de Google per a allotjaments i restaurants de la Vall de Boí, Vilaller i el Pont de Suert. Sobretot en remot, amb visita si cal.",
    entradeta: `El Pont de Suert és a uns ${x.km} km de Mollerussa, uns ${x.min} minuts: dues hores de carretera.`,
    destacat: { valor: x.n('poblacio'), text: `habitants, ${x.dens()} per km²: la comarca amb menys gent de les tretze on treballo${x.cita('idescat_poblacio')}` },
    blocs: [
      { titol: 'Boí i les places', p: [
        `L'any 2000 la UNESCO va declarar Patrimoni de la Humanitat nou esglésies romàniques de la vall de Boí${x.cita('vall_boi')}. Entre hotels (${x.n('placesHotels')} places), càmpings (${x.n('placesCampings')}) i turisme rural (${x.n('placesTurismeRural')}), Idescat suma ${x.places()} places d'allotjament${x.cita('idescat_hotels')}: unes ${x.placesPer10()} per cada deu habitants.`,
      ] },
      { titol: 'En remot', p: [
        `Amb negocis del Pont de Suert, Vilaller, Boí o Taüll treballo en remot; si cal una visita, abans ho parlem per telèfon perquè valgui el viatge. Per a un allotjament o un restaurant d'aquí, em sembla que el primer és ${x.s('google', 'una fitxa de Google amb l\'horari real')}.`,
      ] },
    ],
    wa: "Hola Bilal, tinc un negoci a l'Alta Ribagorça i voldria parlar amb tu.",
  }),

  aran: x => ({
    titol: "La Val d'Aran: Vielha, Baqueira i l'aranès",
    seoTitol: "Webs per a hotels de la Val d'Aran",
    seoDescripcio: "Webs i fitxa de Google per a hotels de Vielha, Baqueira, Arties i la Val d'Aran. Només en remot; webs en català i castellà.",
    entradeta: `Vielha és a uns ${x.km} km de Mollerussa, uns ${x.min} minuts: gairebé tres hores. Hi treballo només en remot.`,
    destacat: { valor: x.n('placesHotels'), text: `places d'hotel per a ${x.n('poblacio')} habitants: set per cada deu${x.cita('idescat_hotels')}${x.cita('idescat_poblacio')}` },
    blocs: [
      { titol: 'Una llengua que jo no escric', p: [
        `L'aranès, la llengua pròpia de la vall, és un dels tres idiomes oficials de Catalunya, juntament amb el català i el castellà${x.cita('aranes')}. Les meves webs són en català i en castellà; en aranès, o en francès, les hauria d'escriure algú que domini la llengua.`,
      ] },
      { titol: 'Més places que habitants', p: [
        `Baqueira-Beret és, segons la Viquipèdia, l'estació amb més quilòmetres esquiables de Catalunya${x.cita('baqueira')}. Idescat compta a la vall ${x.n('hotels')} hotels, ${x.n('campings')} càmpings i ${x.n('turismeRural')} allotjaments de turisme rural: ${x.places()} places, més que les ${x.n('poblacio')} persones que hi viuen. Per a un hotel, ${x.s('google', 'la fitxa de Google')} al dia; si cal una visita, la fem fora de les setmanes amb més neu.`,
      ] },
    ],
    wa: "Hola Bilal, tinc un negoci a la Val d'Aran i voldria parlar amb tu.",
  }),

  cerdanya: x => ({
    titol: 'La Cerdanya: una comarca partida entre Girona i Lleida',
    seoTitol: 'Webs per a negocis de Puigcerdà i la Cerdanya',
    seoDescripcio: "Webs per a hotels, càmpings i restaurants de Puigcerdà, Bellver, Llívia i la Cerdanya. Treballo en remot, amb les visites planificades.",
    entradeta: `Puigcerdà és a uns ${x.km} km de Mollerussa, uns ${x.min} minuts: hi treballo en remot.`,
    destacat: { valor: '11 + 6', text: `municipis de la comarca a la província de Girona i a la de Lleida${x.cita('cerdanya')}` },
    blocs: [
      { titol: 'Entre Girona i Lleida', p: [
        `La comarca es reparteix entre les províncies de Girona (11 municipis) i de Lleida (6); Puigcerdà és a la de Girona. Idescat la compta sencera: ${x.n('poblacio')} persones, ${x.dens()} per km²${x.cita('idescat_poblacio')}. Té ${x.n('campings')} càmpings amb ${x.n('placesCampings')} places, més que els ${x.n('hotels')} hotels amb ${x.n('placesHotels')}${x.cita('idescat_hotels')}.`,
      ] },
      { titol: 'La frontera', p: [
        `L'Hospital de Cerdanya, a Puigcerdà, va obrir el 19 de setembre de 2014 i és el primer centre de salut transfronterer de la Unió Europea${x.cita('hospital')}. Jo només faig webs en català i en castellà; si necessites francès, l'ha de portar algú altre. Per a un càmping o un hotel, ${x.s('webs', 'una web')}: la parlem per vídeo i, si cal veure el lloc, la visita la planifiquem fora de les setmanes de neu.`,
      ] },
    ],
    wa: 'Hola Bilal, tinc un negoci a la Cerdanya i voldria parlar amb tu.',
  }),
};

// La pàgina índex «On treballo».
export const INDEX_CA = {
  titol: 'On treballo',
  seoTitol: 'On treballo: 13 comarques de Ponent i del Pirineu',
  seoDescripcio: "Les 13 comarques on treballa Bildane: sis en persona (Pla d'Urgell, Urgell, Segrià, Noguera, Garrigues i Segarra) i set sobretot en remot.",
  entradeta: "Visc a Mollerussa. A sis comarques hi vaig en persona; a les altres set hi treballo sobretot en remot, i t'ho dic clar.",
  blocs: [
    { titol: 'En persona i en remot', p: [
      "El criteri és un de sol: fins a uns 35 minuts de Mollerussa hi vaig a veure el negoci. Això és el cas de les capitals de les sis comarques més properes (el Pla d'Urgell, l'Urgell, el Segrià, la Noguera, les Garrigues i la Segarra), que són a mitja hora o menys. Alguns pobles d'aquestes comarques, com Àger o Ponts, queden a gairebé una hora: allà ho porto com a les comarques de més lluny, sobretot en remot, amb visita si val la pena.",
      "Les altres set són més lluny: de poc més d'una hora (el Solsonès, el Pallars Jussà) a gairebé tres (la Val d'Aran). Allà treballo en remot: reunions per vídeo o per WhatsApp, fotos i documents que m'envies, i una visita quan val la pena.",
    ] },
    { titol: 'Cada comarca té la seva pàgina', p: [
      "Cada una diu com hi treballo, quines xifres públiques la fan diferent i què hi puc fer. Els fets porten la seva font al final; l'opinió és meva i ho dic en primera persona.",
    ] },
  ],
};
