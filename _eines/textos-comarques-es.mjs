// Textos de las páginas de comarca, en castellano. Mismas reglas que en catalán (textos-comarques-ca.mjs):
// nada inventado (clientes, proyectos, opiniones, cifras, comportamientos de clientes), cada hecho con su fuente,
// las opiniones en primera persona, y un hilo y una estructura propios en cada página.
// Criterio único de distancia: hasta unos 35 minutos de Mollerussa voy en persona; más lejos, sobre todo en remoto,
// con visita cuando vale la pena. Nombres de comarca: se traducen los que tienen forma castellana usual (Urgel,
// Alto Urgel, Solsonés, Alta Ribagorza, Cerdaña, Valle de Arán); los demás se dejan en catalán. No se «corrigen».

export const ES = {
  'pla-urgell': x => ({
    titol: "Mollerussa, mi casa: el Pla d'Urgell",
    seoTitol: "Webs y albaranes en el Pla d'Urgell, desde Mollerussa",
    seoDescripcio: "Vivo en Mollerussa y trabajo para negocios y empresas del Pla d'Urgell: webs, albaranes leídos con IA, asistentes y tiendas online. Voy en persona.",
    entradeta: "Vivo en Mollerussa. Los pueblos del Pla d'Urgell me quedan a menos de media hora, y voy a ver el negocio cuando hace falta.",
    destacat: { valor: '1853', text: `año en que se estableció en Mollerussa la administración de los canales de Urgell${x.cita('ec_canal')}` },
    blocs: [
      { titol: 'Dónde nos vemos', p: [
        "En Mollerussa, Linyola, Bellvís, Vila-sana o Fondarella me siento contigo en el mostrador, en la nave o en la cocina, y miramos qué hace falta con el negocio delante. En Miralcamp, Castellnou de Seana, el Poal o Torregrossa es igual; solo cambian los minutos de carretera. Entre una visita y otra nos escribimos por WhatsApp.",
      ] },
      { titol: 'El canal', p: [
        `Según la Enciclopèdia Catalana, en 1964, al acabar la concesión, la propiedad de los canales pasó a los regantes, y en 1900 ya se habían liberado del barbecho al menos 41.000 ha en las tierras que riega a lo largo de la llanura${x.cita('ec_canal')}. Hoy, de las ${x.n('sau')} ha de superficie agrícola del Pla d'Urgell, ${x.n('cereals')} son de cereales y ${x.n('fruiters')} de frutales${x.cita('idescat_sau')}.`,
        `Las afiliaciones al régimen general (septiembre de 2026, dato provisional) se cuentan por la ubicación de la cuenta de cotización, no por dónde vive quien trabaja. Dentro de ese recuento, la industria es el ${x.af('Industria')} % en la comarca (en Cataluña, el ${x.afCat('Industria')} %) y los servicios, el ${x.af('Serveis')} %${x.cita('idescat_afTotal')}.`,
      ] },
      { titol: 'Qué pongo yo', p: [
        `Para las empresas que reciben mercancía cada día y pasan los albaranes a mano, está ${x.s('albarans', 'la lectura de albaranes con IA')}. Para un comercio o un bar de Mollerussa, ${x.s('webs', 'una web')}; y si en hora punta no puedes coger el teléfono, ${x.s('telefon', 'un asistente que lo conteste')}.`,
      ] },
    ],
    wa: "Hola Bilal, tengo un negocio en el Pla d'Urgell y quisiera hablar contigo.",
  }),

  urgell: x => ({
    titol: 'El Urgel: Tàrrega, la Fira y mucho campo',
    seoTitol: 'Webs y Google Business en Tàrrega y el Urgel',
    seoDescripcio: 'Webs, ficha de Google, carta QR y albaranes leídos con IA para negocios de Tàrrega, Bellpuig, Agramunt y el Urgel. Voy en persona desde Mollerussa.',
    entradeta: `Tàrrega está a unos ${x.km} km de Mollerussa, unos ${x.min} minutos: voy y vuelvo a media mañana.`,
    destacat: { valor: x.n('cereals'), text: `ha de cereal, el ${x.pct('cereals', 'sau')} % de la superficie agrícola de la comarca${x.cita('idescat_sau')}` },
    blocs: [
      { titol: 'La Fira', p: [
        `La Fira de Teatre al Carrer de Tàrrega se fundó en 1981 y se celebra cada año el segundo fin de semana de septiembre${x.cita('ec_fira')}. Si tienes un comercio en el centro, la ficha de Google puede decir el horario de esos días y no el de siempre: ${x.s('google', 'lo hago yo')}. Y para un bar o un restaurante, ${x.s('carta', 'la carta en el móvil del cliente, con un QR en la mesa')}.`,
      ] },
      { titol: 'El campo', p: [
        `En el Urgel hay también ${x.n('vinya')} ha de viña y ${x.n('oliveres')} de olivar${x.cita('idescat_sau')}. En la comarca viven ${x.n('poblacio')} personas, ${x.dens()} por km²${x.cita('idescat_poblacio')}. Para las empresas que arrastran papeles de entrada y salida de mercancía, ${x.s('albarans', 'los albaranes a Excel')}.`,
      ] },
      { titol: 'Cómo llego', p: [
        "A Tàrrega, Bellpuig, Anglesola, Verdú o Agramunt voy en persona, e intento agrupar las visitas de la comarca en un solo día. Guimerà o Maldà, más adentro, están a unos 35 minutos: voy igual, pero antes miro por teléfono qué hay que ver en el sitio.",
      ] },
    ],
    wa: 'Hola Bilal, tengo un negocio en el Urgel (Tàrrega o alrededores) y quisiera hablar contigo.',
  }),

  segria: x => ({
    titol: 'Albaranes de fruta: Lleida y el Segrià',
    seoTitol: 'Albaranes, webs y Google en Lleida y el Segrià',
    seoDescripcio: 'Albaranes leídos con IA para almacenes y centrales de fruta, y webs y asistentes para negocios de Lleida, Alpicat o Almacelles. Voy en persona.',
    entradeta: `Lleida está a unos ${x.km} km de Mollerussa, unos ${x.min} minutos: la ciudad grande más cercana, y la comarca con más gente de todas donde trabajo.`,
    destacat: { valor: `${x.pct('fruiters', 'sau')} %`, text: `de la superficie agrícola son frutales al aire libre: ${x.n('fruiters')} ha de ${x.n('sau')}${x.cita('idescat_sau')}` },
    blocs: [
      { titol: 'Donde más faltan los números', p: [
        `Una central de fruta recibe y envía mercancía con albarán; si alguien acaba tecleándolos en una hoja de cálculo, eso es lo que hago con ${x.s('albarans', 'los albaranes leídos con IA')}: una foto del albarán y los datos en Excel. Para almacenes y centrales de fruta es el servicio donde creo que más puedo aportar.`,
      ] },
      { titol: 'La ciudad', p: [
        `En el Segrià viven ${x.n('poblacio')} personas${x.cita('idescat_poblacio')}, y el ${x.af('Serveis')} % de las afiliaciones al régimen general (septiembre de 2026, dato provisional) son de servicios${x.cita('idescat_afTotal')}. Para un bar, un restaurante o una consulta de Lleida, están ${x.s('telefon', 'el asistente telefónico')}, ${x.s('google', 'la ficha de Google y el mapa')}.`,
      ] },
      { titol: 'Cómo trabajo aquí', p: [
        "Voy en persona: Lleida, Alpicat, Torrefarrera, Almacelles, Alcarràs, Aitona. Soy uno solo; si buscas una agencia con equipo, no soy yo.",
      ] },
    ],
    wa: 'Hola Bilal, tengo un negocio en Lleida / en el Segrià y quisiera hablar contigo.',
  }),

  noguera: x => ({
    titol: 'La Noguera: Balaguer, el Montsec y mucho terreno',
    seoTitol: 'Webs y Google para negocios de la Noguera',
    seoDescripcio: 'Webs, ficha de Google y tiendas online para negocios y alojamientos de Balaguer, Artesa de Segre, Ponts y el Montsec. Voy en persona.',
    entradeta: `Balaguer está a unos ${x.km} km de Mollerussa, unos ${x.min} minutos; Artesa de Segre, Ponts y Àger, a cerca de una hora.`,
    destacat: { valor: x.dens(), text: `habitantes por km², cuando en Cataluña son ${x.densCat()}${x.cita('idescat_poblacio')}` },
    blocs: [
      { titol: 'El cereal y la viña', p: [
        `La comarca mide ${x.km2()} km² y viven ${x.n('poblacio')} personas${x.cita('idescat_poblacio')}. Dos tercios de la superficie agrícola son de cereal (${x.n('cereals')} ha de ${x.n('sau')}) y hay ${x.n('vinya')} ha de viña${x.cita('idescat_sau')}.`,
      ] },
      { titol: 'El Parc Astronòmic', p: [
        `En Àger está el Parc Astronòmic del Montsec, que se presenta como el mejor lugar de Cataluña para observar el cielo y lo avala con el premio internacional Starlight${x.cita('parc_montsec')}. Idescat cuenta en la comarca ${x.n('campings')} campings (${x.n('placesCampings')} plazas) y ${x.n('turismeRural')} alojamientos de turismo rural (${x.n('placesTurismeRural')} plazas)${x.cita('idescat_hotels')}. Para un camping o una casa rural, lo que te encuentra es ${x.s('google', 'la ficha de Google')} y ${x.s('webs', 'una web clara')}.`,
      ] },
      { titol: 'Los kilómetros', p: [
        "Balaguer, Térmens, Menàrguens, Vallfogona de Balaguer o Camarasa están a media hora o poco más: voy en persona. Artesa de Segre, Ponts y Àger están a cerca de una hora: voy si la visita merece el viaje, y el resto lo hacemos en remoto.",
      ] },
    ],
    wa: 'Hola Bilal, tengo un negocio en la Noguera y quisiera hablar contigo.',
  }),

  garrigues: x => ({
    titol: 'Les Garrigues: el aceite y la tienda online',
    seoTitol: 'Tiendas online para el aceite de Les Garrigues',
    seoDescripcio: 'Tiendas online con WooCommerce y webs para productores y comercios de Les Garrigues. Les Borges Blanques está a 15 minutos de Mollerussa.',
    entradeta: `Les Borges Blanques está a unos ${x.km} km de Mollerussa, unos ${x.min} minutos: después del Pla d'Urgell, la comarca que me queda más cerca.`,
    destacat: { valor: '1975', text: `año en que Les Garrigues fue la primera DOP alimentaria reconocida en el Estado español${x.cita('dop')}` },
    blocs: [
      { titol: 'El aceite con nombre', p: [
        `La Unión Europea certificó la denominación como DOP en 1996, y el consejo regulador dice que es un aceite de oliva arbequina${x.cita('dop')}. Los olivos ocupan el ${x.pct('oliveres', 'sau')} % de la superficie agrícola: ${x.n('oliveres')} ha de ${x.n('sau')}${x.cita('idescat_sau')}. En afiliaciones al régimen general (septiembre de 2026, dato provisional), la agricultura pesa el ${x.af('Agricultura')} % en la comarca y el ${x.afCat('Agricultura')} % en Cataluña${x.cita('idescat_afTotal')}.`,
      ] },
      { titol: 'Qué hago', p: [
        `Hago la tienda online: ${x.s('botiga', 'catálogo, carrito, pago y precios de envío')}, y después la puedes gestionar tú desde el móvil. Para un aceite, decidimos juntos qué formatos se venden. Una vez hecha, ${x.s('manteniment', 'el mantenimiento')} la mantiene al día.`,
      ] },
      { titol: 'Por aquí', p: [
        `Les Borges Blanques, Juneda y Arbeca están a un cuarto de hora y Vinaixa a unos 30 minutos: voy en persona. El Cogul (unos 40 minutos) y La Granadella (unos 55) los llevo más en remoto, y voy si merece la pena. En la comarca viven ${x.n('poblacio')} personas en ${x.km2()} km² (${x.dens()} por km²)${x.cita('idescat_poblacio')}.`,
      ] },
    ],
    wa: 'Hola Bilal, tengo un negocio o una cooperativa en Les Garrigues y quisiera hablar contigo.',
  }),

  segarra: x => ({
    titol: 'La Segarra: Cervera, Guissona y el 65 % de las afiliaciones en la industria',
    seoTitol: 'Albaranes, webs y Google en Cervera y la Segarra',
    seoDescripcio: 'Albaranes leídos con IA, webs y fichas de Google para empresas y comercios de Cervera, Guissona y la Segarra. Cervera está a media hora de Mollerussa.',
    entradeta: `Cervera está a unos ${x.km} km de Mollerussa, unos ${x.min} minutos; Guissona, a unos 35 minutos.`,
    destacat: { valor: `${x.af('Industria')} %`, text: `de las afiliaciones al régimen general son de industria; en Cataluña, el ${x.afCat('Industria')} %${x.cita('idescat_afTotal')}` },
    blocs: [
      { titol: 'La cifra', p: [
        `Las afiliaciones al régimen general (septiembre de 2026, dato provisional) cuentan por la ubicación de la cuenta de cotización de la empresa, no por la residencia de quien trabaja. En Guissona está la Corporació Alimentària Guissona, que la Enciclopèdia Catalana sitúa entre las empresas más importantes de la provincia de Lleida y entre las industrias alimentarias más grandes del Estado${x.cita('ec_guissona')}. La cifra no dice qué necesita cada empresa; eso se lo tengo que preguntar a cada una.`,
      ] },
      { titol: 'Dónde voy', p: [
        `Cervera, Sant Guim de Freixenet, Ribera d'Ondara, Torrefeta i Florejacs o Guissona: voy en persona. En la comarca viven ${x.n('poblacio')} personas${x.cita('idescat_poblacio')}, repartidas por pueblos como Talavera, Sanaüja o Les Oluges.`,
      ] },
      { titol: 'Papeles y fichas', p: [
        `Una empresa que carga, transporta o repara para la industria suele tener albaranes en papel o en foto de móvil; si es tu caso, ${x.s('albarans', 'los paso a Excel a partir de una foto')}. Para un comercio de Cervera o de Talavera, ${x.s('google', 'una ficha de Google al día')}.`,
      ] },
    ],
    wa: 'Hola Bilal, tengo una empresa o un comercio en la Segarra y quisiera hablar contigo.',
  }),

  solsones: x => ({
    titol: 'El Solsonés: la Festa Major y 146 casas rurales',
    seoTitol: 'Webs y ficha de Google para negocios del Solsonés',
    seoDescripcio: 'Webs, ficha de Google y asistente de chat para casas rurales, restaurantes y comercios de Solsona. Sobre todo en remoto, con visita si vale la pena.',
    entradeta: `Solsona está a unos ${x.km} km de Mollerussa, unos ${x.min} minutos: allí trabajo sobre todo en remoto, y voy cuando vale la pena.`,
    destacat: { valor: x.n('turismeRural'), text: `alojamientos de turismo rural, de ${x.allotj()} alojamientos turísticos (hoteles, campings y turismo rural)${x.cita('idescat_hotels')}` },
    blocs: [
      { titol: 'La fiesta y las plazas', p: [
        `La Festa Major de Solsona, con los gigantes, la Àliga y los Nans, fue declarada fiesta patrimonial de interés nacional en 2008${x.cita('festa')}. En el alojamiento, por número de establecimientos, lo que más hay es la casa rural; por plazas, los campings tienen más (${x.n('placesCampings')}), seguidos del turismo rural (${x.n('placesTurismeRural')}) y de los hoteles (${x.n('placesHotels')}): ${x.places()} plazas para ${x.n('poblacio')} habitantes${x.cita('idescat_poblacio')}.`,
      ] },
      { titol: 'Remoto, con visita cuando toca', p: [
        `Con negocios de Solsona, Olius, Riner o Sant Llorenç de Morunys, nos vemos por vídeo o por WhatsApp: me mandas fotos y me cuentas qué hay, y yo hago el trabajo. Si vale la pena ver el sitio, voy; a más de una hora de carretera no te prometo estar cada semana. Si te hacen cada día las mismas preguntas de precios o de condiciones, ${x.s('xat', 'un asistente de chat')} las responde por ti.`,
      ] },
    ],
    wa: 'Hola Bilal, tengo un negocio en el Solsonés y quisiera hablar contigo.',
  }),

  'alt-urgell': x => ({
    titol: 'El Alto Urgel: la Seu, el Segre y piraguas olímpicas',
    seoTitol: 'Webs y Google para negocios del Alto Urgel',
    seoDescripcio: 'Webs y ficha de Google para alojamientos, restaurantes y empresas de aventura de La Seu d\'Urgell. Trabajo en remoto, con visita si hace falta.',
    entradeta: `La Seu d'Urgell queda a unos ${x.km} km de Mollerussa, unos ${x.min} minutos: casi dos horas. Por eso no voy como voy a Tàrrega, y te lo explico.`,
    destacat: { valor: '1992', text: `año de los Juegos de Barcelona: en La Seu se hizo el eslalon de piragüismo, en el Parc Olímpic del Segre${x.cita('parc_olimpic')}` },
    blocs: [
      { titol: 'El Parc Olímpic', p: [
        `El parque se construyó con motivo de los Juegos de Barcelona y después acogió los mundiales de 1999 y de 2009${x.cita('parc_olimpic')}. Idescat cuenta en la comarca ${x.n('hotels')} hoteles, ${x.n('campings')} campings y ${x.n('turismeRural')} alojamientos de turismo rural, con ${x.places()} plazas en total; viven ${x.n('poblacio')} personas en ${x.km2()} km²${x.cita('idescat_hotels')}${x.cita('idescat_poblacio')}. Para una empresa de aventura o un alojamiento, ${x.s('google', 'la ficha de Google')} y ${x.s('webs', 'una web')}.`,
      ] },
      { titol: 'Cómo lo llevo desde lejos', p: [
        "Para La Seu, Oliana, Organyà, Coll de Nargó o Bassella trabajo en remoto: reunión por vídeo, las fotos que me mandas, y yo hago la web. Una visita, si hace falta, la hacemos un día que combine cosas; el viaje es largo, y en invierno más.",
      ] },
    ],
    wa: 'Hola Bilal, tengo un negocio en el Alto Urgel y quisiera hablar contigo.',
  }),

  'pallars-jussa': x => ({
    titol: 'El Pallars Jussà: Tremp y un geoparque de la UNESCO',
    seoTitol: 'Webs y Google para negocios del Pallars Jussà',
    seoDescripcio: 'Webs, tiendas online y ficha de Google para productores, alojamientos y comercios de Tremp y el Pallars Jussà. Sobre todo en remoto.',
    entradeta: `Tremp está a unos ${x.km} km de Mollerussa, unos ${x.min} minutos: trabajo en remoto, y voy a los sitios cuando vale la pena. Isona, Senterada o La Torre de Cabdella están más lejos, y llego allí después de mirar qué se puede resolver por teléfono.`,
    destacat: { valor: x.n('ovins'), text: `cabezas de ovino: más de tres por habitante${x.cita('idescat_bovins')}${x.cita('idescat_poblacio')}` },
    blocs: [
      { titol: 'El Geoparque', p: [
        `El Geoparque mundial UNESCO Orígens enseña la historia geológica de la zona con georrutas, museos y centros de interpretación${x.cita('geoparc')}. Tiene 19 municipios de cuatro comarcas, y 14 son del Pallars Jussà${x.cita('geoparc_wp')}. Idescat cuenta en la comarca ${x.n('hotels')} hoteles (${x.n('placesHotels')} plazas), ${x.n('campings')} campings (${x.n('placesCampings')}) y ${x.n('turismeRural')} alojamientos de turismo rural (${x.n('placesTurismeRural')}), para ${x.n('poblacio')} habitantes en ${x.km2()} km²${x.cita('idescat_hotels')}${x.cita('idescat_poblacio')}.`,
      ] },
      { titol: 'Productores y visitantes', p: [
        `Un productor de queso, carne o miel puede vender fuera de la comarca con ${x.s('botiga', 'una tienda online')}. Para quien trabaja con visitantes del geoparque, ${x.s('google', 'la ficha de Google')}.`,
      ] },
    ],
    wa: 'Hola Bilal, tengo un negocio en el Pallars Jussà y quisiera hablar contigo.',
  }),

  'pallars-sobira': x => ({
    titol: 'El Pallars Sobirà: Sort, Espot y 22 campings',
    seoTitol: 'Webs para campings del Pallars Sobirà',
    seoDescripcio: 'Webs y asistente de chat para campings, alojamientos y restaurantes de Sort, Espot y el Pallars Sobirà. Sobre todo en remoto, con visita si hace falta.',
    entradeta: `Sort está a unos ${x.km} km de Mollerussa, unos ${x.min} minutos: casi dos horas. Aquí viven cinco personas por km².`,
    destacat: { valor: x.n('campings'), text: `campings, con ${x.n('placesCampings')} plazas: ninguna de las otras doce comarcas donde trabajo tiene tantos${x.cita('idescat_hotels')}` },
    blocs: [
      { titol: 'Un parque nacional', p: [
        `El Parc Nacional d'Aigüestortes i Estany de Sant Maurici, declarado el 21 de octubre de 1955, se extiende por cuatro comarcas; el Pallars Sobirà es una de ellas, y Espot es uno de los dos municipios donde está la zona interna del parque${x.cita('aiguestortes')}. Idescat cuenta además ${x.n('hotels')} hoteles (${x.n('placesHotels')} plazas) y ${x.n('turismeRural')} alojamientos de turismo rural (${x.n('placesTurismeRural')}): ${x.places()} plazas para ${x.n('poblacio')} habitantes${x.cita('idescat_poblacio')}.`,
      ] },
      { titol: 'En remoto', p: [
        `Trabajo en remoto. Un camping recibe cada día las mismas preguntas (tarifas, condiciones, cómo llegar): ${x.s('xat', 'un asistente de chat')} las responde por ti.`,
      ] },
    ],
    wa: 'Hola Bilal, tengo un negocio en el Pallars Sobirà y quisiera hablar contigo.',
  }),

  'alta-ribagorca': x => ({
    titol: 'La Alta Ribagorza: la Vall de Boí y sus nueve templos románicos',
    seoTitol: 'Webs y Google para negocios de la Vall de Boí',
    seoDescripcio: 'Webs y ficha de Google para alojamientos y restaurantes de la Vall de Boí, Vilaller y El Pont de Suert. Sobre todo en remoto, con visita si hace falta.',
    entradeta: `El Pont de Suert está a unos ${x.km} km de Mollerussa, unos ${x.min} minutos: dos horas de carretera.`,
    destacat: { valor: x.n('poblacio'), text: `habitantes, ${x.dens()} por km²: la comarca con menos gente de las trece donde trabajo${x.cita('idescat_poblacio')}` },
    blocs: [
      { titol: 'Boí y las plazas', p: [
        `En el año 2000 la UNESCO declaró Patrimonio de la Humanidad nueve iglesias románicas del valle de Boí${x.cita('vall_boi')}. Entre hoteles (${x.n('placesHotels')} plazas), campings (${x.n('placesCampings')}) y turismo rural (${x.n('placesTurismeRural')}), Idescat suma ${x.places()} plazas de alojamiento${x.cita('idescat_hotels')}: unas ${x.placesPer10()} por cada diez habitantes.`,
      ] },
      { titol: 'En remoto', p: [
        `Con negocios de El Pont de Suert, Vilaller, Boí o Taüll trabajo en remoto; si hace falta una visita, antes lo hablamos por teléfono para que valga el viaje. Para un alojamiento o un restaurante de aquí, me parece que lo primero es ${x.s('google', 'una ficha de Google con el horario real')}.`,
      ] },
    ],
    wa: 'Hola Bilal, tengo un negocio en la Alta Ribagorza y quisiera hablar contigo.',
  }),

  aran: x => ({
    titol: 'El Valle de Arán: Vielha, Baqueira y el aranés',
    seoTitol: 'Webs para hoteles del Valle de Arán',
    seoDescripcio: 'Webs y ficha de Google para hoteles de Vielha, Baqueira, Arties y el Valle de Arán. Solo en remoto; webs en catalán y castellano.',
    entradeta: `Vielha está a unos ${x.km} km de Mollerussa, unos ${x.min} minutos: casi tres horas. Trabajo solo en remoto.`,
    destacat: { valor: x.n('placesHotels'), text: `plazas de hotel para ${x.n('poblacio')} habitantes: siete de cada diez${x.cita('idescat_hotels')}${x.cita('idescat_poblacio')}` },
    blocs: [
      { titol: 'Una lengua que yo no escribo', p: [
        `El aranés, la lengua propia del valle, es uno de los tres idiomas oficiales de Cataluña, junto con el catalán y el castellano${x.cita('aranes')}. Mis webs son en catalán y en castellano; en aranés, o en francés, las tendría que escribir alguien que domine la lengua.`,
      ] },
      { titol: 'Más plazas que habitantes', p: [
        `Baqueira-Beret es, según la Viquipèdia, la estación con más kilómetros esquiables de Cataluña${x.cita('baqueira')}. Idescat cuenta en el valle ${x.n('hotels')} hoteles, ${x.n('campings')} campings y ${x.n('turismeRural')} alojamientos de turismo rural: ${x.places()} plazas, más que las ${x.n('poblacio')} personas que viven allí. Para un hotel, ${x.s('google', 'la ficha de Google')} al día; si hace falta una visita, la hacemos fuera de las semanas con más nieve.`,
      ] },
    ],
    wa: 'Hola Bilal, tengo un negocio en el Valle de Arán y quisiera hablar contigo.',
  }),

  cerdanya: x => ({
    titol: 'La Cerdaña: una comarca partida entre Girona y Lleida',
    seoTitol: 'Webs para negocios de Puigcerdà y la Cerdaña',
    seoDescripcio: 'Webs para hoteles, campings y restaurantes de Puigcerdà, Bellver, Llívia y la Cerdaña. Trabajo en remoto, con las visitas planificadas.',
    entradeta: `Puigcerdà está a unos ${x.km} km de Mollerussa, unos ${x.min} minutos: trabajo en remoto.`,
    destacat: { valor: '11 + 6', text: `municipios de la comarca en la provincia de Girona y en la de Lleida${x.cita('cerdanya')}` },
    blocs: [
      { titol: 'Entre Girona y Lleida', p: [
        `La comarca se reparte entre las provincias de Girona (11 municipios) y de Lleida (6); Puigcerdà está en la de Girona. Idescat la cuenta entera: ${x.n('poblacio')} personas, ${x.dens()} por km²${x.cita('idescat_poblacio')}. Tiene ${x.n('campings')} campings con ${x.n('placesCampings')} plazas, más que los ${x.n('hotels')} hoteles con ${x.n('placesHotels')}${x.cita('idescat_hotels')}.`,
      ] },
      { titol: 'La frontera', p: [
        `El Hospital de Cerdanya, en Puigcerdà, abrió el 19 de septiembre de 2014 y es el primer centro de salud transfronterizo de la Unión Europea${x.cita('hospital')}. Yo solo hago webs en catalán y en castellano; si necesitas francés, lo tiene que traer otra persona. Para un camping o un hotel, ${x.s('webs', 'una web')}: la hablamos por vídeo y, si hace falta ver el sitio, planificamos la visita fuera de las semanas de nieve.`,
      ] },
    ],
    wa: 'Hola Bilal, tengo un negocio en la Cerdaña y quisiera hablar contigo.',
  }),
};

export const INDEX_ES = {
  titol: 'Dónde trabajo',
  seoTitol: 'Dónde trabajo: 13 comarcas de Poniente y del Pirineo',
  seoDescripcio: "Las 13 comarcas donde trabaja Bildane: seis en persona (Pla d'Urgell, Urgel, Segrià, Noguera, Garrigues, Segarra) y siete sobre todo en remoto.",
  entradeta: 'Vivo en Mollerussa. En seis comarcas voy en persona; en las otras siete trabajo sobre todo en remoto, y te lo digo claro.',
  blocs: [
    { titol: 'En persona y en remoto', p: [
      "El criterio es uno solo: hasta unos 35 minutos de Mollerussa voy a ver el negocio. Es el caso de las capitales de las seis comarcas más cercanas (el Pla d'Urgell, el Urgel, el Segrià, la Noguera, Les Garrigues y la Segarra), que están a media hora o menos. Algunos pueblos de esas comarcas, como Àger o Ponts, quedan a casi una hora: allí lo llevo como en las comarcas más lejanas, sobre todo en remoto, con visita si merece la pena.",
      "Las otras siete están más lejos: de poco más de una hora (el Solsonés, el Pallars Jussà) a casi tres (el Valle de Arán). Allí trabajo en remoto: reuniones por vídeo o por WhatsApp, fotos y documentos que me mandas, y una visita cuando vale la pena.",
    ] },
    { titol: 'Cada comarca tiene su página', p: [
      "Cada una dice cómo trabajo allí, qué cifras públicas la hacen distinta y qué puedo hacer. Los hechos llevan su fuente al final; la opinión es mía y lo digo en primera persona.",
    ] },
  ],
};
