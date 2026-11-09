// Tots els textos de la web, en català i en castellà.
// Per canviar una frase, canvia-la aquí i executa `npm run web`.

// Els serveis. `pagina: true` vol dir que ja té pàgina pròpia.
// `paraula` és la paraula gegant del capítol; `fons` el color de la peça.
// L'ordre d'aquesta llista és l'ordre de l'índex de la portada i del menú.
// Per servei i llengua:
//   nom      nom complet (h1 de la pàgina, menú, índex)
//   linia    una frase curta per a l'índex de la portada
//   text     el text del capítol gran de la portada (només Telèfon, Albarans i Webs en tenen)
//   punts    les tessel·les del capítol gran
//   wa       el missatge de WhatsApp ja escrit des d'aquest servei
//   correu   (opcional) assumpte del correu, si el servei ofereix el correu com a segona via
//   etiqueta (opcional) una línia sobre el nom, com «Per a empreses»
//   vos      (opcional) textos comuns en «vosaltres», per a les pàgines per a empreses
const SERVEIS = [
  {
    id: 'telefon', foto: 'forn-pizza', galeria: ['comandes', 'telefon-paret'], fons: 'calc', demo: true, pagina: true,
    ruta: { ca: '/serveis/assistent-telefonic/', es: '/es/servicios/asistente-telefonico/' },
    ca: {
      paraula: 'Telèfon', nom: 'Assistent telefònic per a restaurants',
      linia: 'Contesta el telèfon del restaurant quan tu no hi arribes.',
      text: 'Un assistent amb IA que contesta les trucades del teu restaurant, en català i en castellà. Pren les comandes i les reserves mentre tu cuines.',
      punts: ["Contesta a l'hora punta, quan no arribes al telèfon", 'Parla català i castellà, segons qui truqui', 'Et deixa la comanda o la reserva per escrit'],
      wa: "Hola Bilal, tinc un restaurant i vull saber si l'assistent telefònic m'aniria bé.",
    },
    es: {
      paraula: 'Teléfono', nom: 'Asistente telefónico para restaurantes',
      linia: 'Contesta el teléfono del restaurante cuando tú no llegas.',
      text: 'Un asistente con IA que contesta las llamadas de tu restaurante, en catalán y en castellano. Toma los pedidos y las reservas mientras tú cocinas.',
      punts: ['Contesta en la hora punta, cuando no llegas al teléfono', 'Habla catalán y castellano, según quién llame', 'Te deja el pedido o la reserva por escrito'],
      wa: 'Hola Bilal, tengo un restaurante y quiero saber si el asistente telefónico me iría bien.',
    },
  },
  // Per a empreses: aquí es parla de vosaltres, no de tu.
  {
    id: 'albarans', foto: 'albara-1969', posicio: 'center 40%', galeria: ['nau-miralcamp'], fons: 'rostoll', pagina: true,
    ruta: { ca: '/serveis/albarans-factures-ia/', es: '/es/servicios/albaranes-facturas-ia/' },
    ca: {
      paraula: 'Albarans', nom: 'Albarans i factures amb IA', etiqueta: 'Per a empreses',
      linia: "Una foto de l'albarà, i la IA en passa les dades a un Excel.",
      text: "El personal fa una foto de l'albarà o la factura, i la IA en llegeix les dades i les passa a un Excel o al programa de l'empresa, sense picar-les a mà.",
      punts: ['Una foto amb el mòbil, sense picar res', 'Les dades a un Excel o al vostre programa', 'Una prova amb albarans reals abans de començar'],
      wa: 'Hola Bilal, som una empresa i ens interessa la prova amb albarans reals.',
      correu: "Prova d'albarans",
      vos: {
        whatsapp: 'Escriviu-me per WhatsApp',
        notaBoto: 'Us contesto jo, en Bilal.',
        correuVia: 'o escriviu-me a',
        contacte: {
          titol: 'Escriviu-me i en parlem.',
          text: "Expliqueu-me quins papers passeu a mà cada dia i us dic si val la pena fer la prova.",
        },
      },
    },
    es: {
      paraula: 'Albaranes', nom: 'Albaranes y facturas con IA', etiqueta: 'Para empresas',
      linia: 'Una foto del albarán, y la IA pasa los datos a un Excel.',
      text: 'El personal hace una foto del albarán o la factura, y la IA lee los datos y los pasa a un Excel o al programa de la empresa, sin teclearlos a mano.',
      punts: ['Una foto con el móvil, sin teclear nada', 'Los datos a un Excel o a vuestro programa', 'Una prueba con albaranes reales antes de empezar'],
      wa: 'Hola Bilal, somos una empresa y nos interesa la prueba con albaranes reales.',
      correu: 'Prueba de albaranes',
      vos: {
        whatsapp: 'Escribidme por WhatsApp',
        notaBoto: 'Os contesto yo, Bilal.',
        correuVia: 'o escribidme a',
        contacte: {
          titol: 'Escribidme y lo hablamos.',
          text: 'Contadme qué papeles pasáis a mano cada día y os digo si vale la pena hacer la prueba.',
        },
      },
    },
  },
  {
    id: 'webs', galeria: ['calaix-tipus'], fons: 'calc', pagina: true,
    ruta: { ca: '/serveis/webs-a-mida/', es: '/es/servicios/webs-a-medida/' },
    ca: {
      paraula: 'Webs', nom: 'Webs per a negocis i entitats',
      linia: 'Una web clara, que es llegeix bé al mòbil.',
      text: 'Una web que es llegeix bé al mòbil i diu el que el client busca: què fas, on ets i a quina hora obres.',
      punts: ['Amb les teves fotos i els teus textos', 'Amb WordPress, si la vols canviar tu'],
      wa: 'Hola Bilal, voldria una web per al meu negoci o entitat.',
      correu: 'Una web per al nostre negoci o entitat',
    },
    es: {
      paraula: 'Webs', nom: 'Webs para negocios y entidades',
      linia: 'Una web clara, que se lee bien en el móvil.',
      text: 'Una web que se lee bien en el móvil y dice lo que el cliente busca: qué haces, dónde estás y a qué hora abres.',
      punts: ['Con tus fotos y tus textos', 'Con WordPress, si quieres cambiarla tú'],
      wa: 'Hola Bilal, querría una web para mi negocio o entidad.',
      correu: 'Una web para nuestro negocio o entidad',
    },
  },
  {
    id: 'botiga', foto: 'mercat-roba', posicio: 'center 80%', detall: 'queviures', galeria: ['caixes-pressecs', 'queviures'], fons: 'rostoll', pagina: true,
    ruta: { ca: '/serveis/botigues-woocommerce/', es: '/es/servicios/tiendas-woocommerce/' },
    ca: {
      paraula: 'Botiga', nom: 'Botigues en línia amb WooCommerce',
      linia: 'Per vendre també quan tens la persiana abaixada.',
      text: 'Una botiga amb catàleg, cistella, pagament i enviaments, que ven també quan tens la persiana abaixada.',
      punts: ['Pagament amb targeta i Bizum', 'Enviament a casa o recollida a la botiga', 'La gestiones tu, també des del mòbil'],
      wa: 'Hola Bilal, voldria vendre per internet i m\'interessa una botiga en línia.',
    },
    es: {
      paraula: 'Tienda', nom: 'Tiendas online con WooCommerce',
      linia: 'Para vender también cuando tienes la persiana bajada.',
      text: 'Una tienda con catálogo, carrito, pago y envíos, que vende también cuando tienes la persiana bajada.',
      punts: ['Pago con tarjeta y Bizum', 'Envío a casa o recogida en tienda', 'La gestionas tú, también desde el móvil'],
      wa: 'Hola Bilal, querría vender por internet y me interesa una tienda online.',
    },
  },
  {
    id: 'google', detall: 'retol-tarrega', galeria: ['retol-tarrega', 'porxos-balaguer'], fons: 'calc', pagina: true,
    ruta: { ca: '/serveis/google-business-seo-local/', es: '/es/servicios/google-business-seo-local/' },
    ca: {
      paraula: 'Google', nom: 'Sortir a Google i al mapa',
      linia: 'La fitxa de Google al dia, perquè et trobin quan busquen a prop.',
      text: 'Que et trobin quan algú busca el que fas a prop de casa: la fitxa de Google Business ben feta i la web preparada per a les cerques de la zona.',
      punts: ['La fitxa de Google Business creada o posada al dia', 'La web preparada per a les cerques de la zona', "T'explico com respondre les ressenyes"],
      wa: 'Hola Bilal, voldria sortir millor a Google i al mapa.',
    },
    es: {
      paraula: 'Google', nom: 'Salir en Google y en el mapa',
      linia: 'La ficha de Google al día, para que te encuentren cuando buscan cerca.',
      text: 'Que te encuentren cuando alguien busca lo que haces cerca de casa: la ficha de Google Business bien hecha y la web preparada para las búsquedas de la zona.',
      punts: ['La ficha de Google Business creada o puesta al día', 'La web preparada para las búsquedas de la zona', 'Te explico cómo responder las reseñas'],
      wa: 'Hola Bilal, querría salir mejor en Google y en el mapa.',
    },
  },
  {
    id: 'xat', detall: 'picaportes', galeria: ['picaportes'], fons: 'verd', pagina: true,
    ruta: { ca: '/serveis/assistent-xat/', es: '/es/servicios/asistente-chat/' },
    ca: {
      paraula: 'Xat', nom: 'Assistent de xat per a webs',
      linia: 'Respon els dubtes de sempre a la teva web, també de nit.',
      text: 'Una finestreta a la teva web que respon els dubtes de sempre: horaris, preus, on sou, com reservar. Contesta també de nit. Cada mes té un màxim de converses, que mirem segons el que necessitis.',
      punts: ['Respon amb la informació que tu li dones', 'Si no sap una cosa, ho diu i passa el teu WhatsApp'],
      wa: "Hola Bilal, m'interessa l'assistent de xat per a la meva web.",
    },
    es: {
      paraula: 'Chat', nom: 'Asistente de chat para webs',
      linia: 'Responde las dudas de siempre en tu web, también de noche.',
      text: 'Una ventanita en tu web que responde las dudas de siempre: horarios, precios, dónde estáis, cómo reservar. Contesta también de noche. Cada mes tiene un máximo de conversaciones, que miramos según lo que necesites.',
      punts: ['Responde con la información que tú le das', 'Si no sabe algo, lo dice y pasa tu WhatsApp'],
      wa: 'Hola Bilal, me interesa el asistente de chat para mi web.',
    },
  },
  {
    id: 'carta', foto: 'terrassa-placa', galeria: [], fons: 'verd', pagina: true,
    ruta: { ca: '/serveis/carta-qr/', es: '/es/servicios/carta-qr/' },
    ca: {
      paraula: 'Carta', nom: 'Carta QR',
      linia: 'La carta al mòbil del client, amb els al·lèrgens marcats.',
      text: "La carta del restaurant al mòbil del client, amb un codi QR a cada taula. Quan canvia un plat o un preu, m'ho dius i el canvio.",
      punts: ['Els al·lèrgens marcats a cada plat', 'Plaques QR per a les taules'],
      wa: "Hola Bilal, m'interessa la carta QR per al meu restaurant.",
    },
    es: {
      paraula: 'Carta', nom: 'Carta QR',
      linia: 'La carta en el móvil del cliente, con los alérgenos marcados.',
      text: 'La carta del restaurante en el móvil del cliente, con un código QR en cada mesa. Cuando cambia un plato o un precio, me lo dices y lo cambio.',
      punts: ['Los alérgenos marcados en cada plato', 'Placas QR para las mesas'],
      wa: 'Hola Bilal, me interesa la carta QR para mi restaurante.',
    },
  },
  {
    id: 'manteniment', detall: 'comporta-sequia', galeria: ['comportes', 'comporta-sequia'], fons: 'calc', pagina: true,
    ruta: { ca: '/serveis/manteniment-web/', es: '/es/servicios/mantenimiento-web/' },
    ca: {
      paraula: 'Manteniment', nom: 'Manteniment i seguretat web',
      linia: 'Actualitzacions i canvis petits, amb una còpia abans de cada canvi.',
      text: 'Actualitzacions, una còpia de seguretat abans de cada canvi i els canvis petits del dia a dia, com un horari o un plat nou.',
      punts: ['Actualitzacions de WordPress i dels plugins', 'Còpia de seguretat abans de cada canvi', 'Canvis petits per WhatsApp'],
      wa: 'Hola Bilal, ja tinc web i voldria que te\'n fessis càrrec.',
    },
    es: {
      paraula: 'Mantenimiento', nom: 'Mantenimiento y seguridad web',
      linia: 'Actualizaciones y cambios pequeños, con una copia antes de cada cambio.',
      text: 'Actualizaciones, una copia de seguridad antes de cada cambio y los cambios pequeños del día a día, como un horario o un plato nuevo.',
      punts: ['Actualizaciones de WordPress y de los plugins', 'Copia de seguridad antes de cada cambio', 'Cambios pequeños por WhatsApp'],
      wa: 'Hola Bilal, ya tengo web y querría que te encargaras de ella.',
    },
  },
];

const FEINES = [
  {
    id: 'reve-padel', nom: 'Reve Padel', url: 'https://revepadel.es/', domini: 'revepadel.es',
    ca: { tipus: 'Botiga en línia amb WooCommerce', text: 'Botiga de pàdel amb catàleg de pales, pilotes, roba i accessoris, cistella i pagament en línia.', fitxa: [['Plataforma', 'WordPress i WooCommerce'], ['Llengua', 'Castellà']], alt: ["El catàleg de pales de revepadel.es a l'ordinador", 'La mateixa pàgina al mòbil'] },
    es: { tipus: 'Tienda online con WooCommerce', text: 'Tienda de pádel con catálogo de palas, pelotas, ropa y accesorios, carrito y pago online.', fitxa: [['Plataforma', 'WordPress y WooCommerce'], ['Idioma', 'Castellano']], alt: ['El catálogo de palas de revepadel.es en el ordenador', 'La misma página en el móvil'] },
  },
  {
    id: 'la-llantia', nom: 'A.D. La Llàntia', lloc: 'Mataró', url: 'https://adlallantia.com/', domini: 'adlallantia.com',
    ca: { tipus: "Web d'un club de futbol de Mataró", text: 'La web del club, en català i castellà. La classificació de la lliga s\'actualitza sola.', fitxa: [['Llengües', 'Català i castellà'], ['En directe', 'Classificació de la lliga'], ['Tecnologia', 'HTML, CSS i JavaScript']], alt: ["La classificació de la lliga a adlallantia.com, a l'ordinador", 'La mateixa pàgina al mòbil'] },
    es: { tipus: 'Web de un club de fútbol de Mataró', text: 'La web del club, en catalán y castellano. La clasificación de la liga se actualiza sola.', fitxa: [['Idiomas', 'Catalán y castellano'], ['En directo', 'Clasificación de la liga'], ['Tecnología', 'HTML, CSS y JavaScript']], alt: ['La clasificación de la liga en adlallantia.com, en el ordenador', 'La misma página en el móvil'] },
  },
];

// Preguntes freqüents: [pregunta, resposta] o [pregunta, resposta, { wa, enllac }]
// quan la resposta acaba amb un enllaç de WhatsApp amb el missatge ja escrit.
export const T = {
  ca: {
    lang: 'ca', locale: 'ca_ES', inici: '/', altraLang: 'es', altraNom: 'Castellano',
    titol: 'Webs, botigues i assistents amb IA a Mollerussa | Bildane',
    descripcio: "Webs, botigues en línia, un assistent que agafa comandes per telèfon i albarans llegits amb IA per a empreses. Des de Mollerussa, en català i castellà.",
    salt: 'Anar al contingut', marcaInici: 'Bildane, inici', menu: 'Menú', tanca: 'Tanca',
    h1: ['Faig webs', 'per als negocis', 'del Pla.'],
    sub: 'Webs, botigues en línia, un assistent que agafa comandes per telèfon i, per a empreses, albarans llegits amb IA. En català i en castellà, des de Mollerussa.',
    whatsapp: 'Escriu-me per WhatsApp', whatsappText: "Hola Bilal, t'escric des de la web.",
    // la línia sota els botons de WhatsApp
    notaBoto: 'Et contesto jo, en Bilal.',
    correuVia: 'o escriu-me a',
    coords: 'Mollerussa, 41,63° N 0,89° E', lloc: 'Mollerussa',
    serveisIndex: 'Vuit coses que faig, de la web al telèfon.',
    serveisTitol: 'Què faig',
    menuWhatsapp: 'WhatsApp',
    legal: { avis: 'Avís legal', privacitat: 'Privacitat', creditsResum: 'Crèdits de les fotos' },
    pla: {
      titol: 'Treballo des de Mollerussa.',
      text: "Penso en les botigues del mercat, les fruiteres, els restaurants i els clubs de la comarca. Molts no tenen temps de pensar en la web, i per això me n'encarrego jo.",
      jo: 'Soc en Bilal i visc a Mollerussa. Les webs les faig jo, i si em truques, el telèfon també l\'agafo jo.',
    },
    mesSobre: 'Com funciona',
    radiografia: {
      titol: 'Radiografia de la teva web.',
      intro: "Posa l'adreça de la teva web i en un minut veus què li passa, en paraules normals. Cada peça trencada és una cosa per arreglar.",
      introManual: "Posa l'adreça de la teva web i te la miro jo: com es veu al mòbil, si carrega ràpid i com la troba Google. T'envio el que hi vegi, explicat clar.",
      botoManual: 'Demana-me-la per WhatsApp',
      demanaText: "Hola Bilal, em pots fer la radiografia de {url}?",
      enviada: "S'obre el WhatsApp amb el missatge escrit. Només l'has d'enviar.",
      etiqueta: 'Adreça de la teva web', placeholder: 'lateva-web.cat', boto: 'Fes la radiografia',
      analitzant: 'Analitzant la web tal com es veu des d\'un mòbil. Pot trigar fins a un minut…',
      exemple: "Resultat d'exemple: l'eina encara no analitza webs de veritat. És bildane.com, analitzada el 2 de novembre de 2026.",
      notes: { rendiment: 'Rendiment', accessibilitat: 'Accessibilitat', seo: 'Google (SEO)', bonesPractiques: 'Bones pràctiques', pes: 'Pes de la pàgina' },
      arregla: "Vull que m'ho arreglis",
      arreglaText: "Hola Bilal, he fet la radiografia de {url} i voldria que m'ajudessis.",
      errors: { url: 'Aquesta adreça no sembla una web. Prova amb una cosa com lateva-web.cat.', limit: 'Has fet moltes radiografies avui. Torna-hi demà o escriu-me per WhatsApp.', servei: "No he pogut analitzar la web ara mateix. Torna-ho a provar d'aquí a una estona." },
    },
    feinesTitol: 'Feines', feinesIntro: 'Dues webs reals que ja funcionen, de fora de la comarca. Obre-les i remena.',
    feinesIntroUna: 'Una botiga real que ja funciona, de fora de la comarca. Obre-la i remena.', obre: 'Obre',
    passosTitol: 'Com treballo', passosIntro: '',
    passos: [
      ['Parlem.', "M'expliques què fas i què et falla. Si ets a prop vinc al local; si no, per videotrucada."],
      ['Preu i dates.', 'Et passo un preu tancat i les dates per escrit. Fins que no em dius que sí, no començo.'],
      ['Ho faig.', "T'ho ensenyo abans de publicar-ho. Els canvis que vulguis en aquesta fase no es cobren a part."],
      ['I després.', "Quan ja funciona, si cal canviar res, m'escrius per WhatsApp."],
    ],
    faqTitol: 'Preguntes freqüents',
    radiografiaMenu: 'Radiografia de la teva web',
    faq: [
      ['Quant costa?', "Depèn de la feina: no és el mateix una web senzilla que una botiga amb molts productes, ni un assistent per a un bar que per a un restaurant amb molta feina al telèfon. Ho parlem, fins i tot fent un cafè si ets a prop, i et passo un preu tancat per escrit abans de començar."],
      ['Quant es triga?', 'El pressupost porta un calendari amb les dates. Saps quan ho tindràs abans de dir que sí.'],
      ["I si no m'agrada?", "Abans de publicar res t'ho ensenyo, i els canvis que demanis en aquesta fase van inclosos. Com es paga i què passa si ho deixem a mitges ho posem per escrit al pressupost."],
      ['Hi ha alguna quota cada mes?', 'Depèn del servei. Al pressupost hi veuràs què es paga un sol cop, què es paga cada mes o cada any, i com es dona de baixa.'],
      ['Treballes fora de Mollerussa?', "Sí. Al Pla d'Urgell ens podem veure en persona; per a la resta de Catalunya i Espanya, treballem per WhatsApp i videotrucada."],
      ['I si després vull canviar alguna cosa?', "M'ho envies per WhatsApp i ho canvio. Si prefereixes fer-ho tu, t'ensenyo com."],
      ['Ja tinc web. Me la pots mirar?', "Sí. Passa'm l'adreça i te la miro: com es veu al mòbil, si carrega ràpid i com la troba Google. T'envio el que hi vegi, explicat clar.", { wa: 'Hola Bilal, ja tinc web. Me la pots mirar? És aquesta: ', enllac: "Envia'm l'adreça" }],
    ],
    contacte: {
      menu: 'Contacte', titol: 'Escriu-me i en parlem.',
      text: "Explica'm què fas i què et cal. Si no és cosa meva, també t'ho diré.",
      correu: 'Correu', telefon: 'Telèfon',
      on: "Soc en Bilal, de Mollerussa. Treballo en persona al Pla d'Urgell i en remot a tot Catalunya i Espanya.",
    },
    peu: {
      signatura: 'Fet a Mollerussa.',
      credits: 'Crèdits de les fotos',
      nota: 'Totes les fotos es mostren modificades: en duotò, retallades i amb gra.',
      llicencia: 'llicència', modificada: 'modificada', domini: 'domini públic', unsplash: 'a Unsplash',
    },
    pagina: { tornar: 'Tots els serveis', altres: 'Altres serveis', etSona: 'Et sona?', etSonaVos: 'Us sona?', perAQui: 'Per a qui és', perAQuiText: 'Restaurants, pizzeries, bars i qualsevol negoci que agafi comandes o reserves per telèfon i que a l\'hora punta no hi arribi.' },
  },
  es: {
    lang: 'es', locale: 'es_ES', inici: '/es/', altraLang: 'ca', altraNom: 'Català',
    titol: 'Webs, tiendas y asistentes con IA en Mollerussa | Bildane',
    descripcio: 'Webs, tiendas online, un asistente que coge pedidos por teléfono y albaranes leídos con IA para empresas. Desde Mollerussa, en catalán y castellano.',
    salt: 'Ir al contenido', marcaInici: 'Bildane, inicio', menu: 'Menú', tanca: 'Cerrar',
    h1: ['Hago webs', 'para los negocios', 'del Pla.'],
    sub: 'Webs, tiendas online, un asistente que coge pedidos por teléfono y, para empresas, albaranes leídos con IA. En catalán y en castellano, desde Mollerussa.',
    whatsapp: 'Escríbeme por WhatsApp', whatsappText: 'Hola Bilal, te escribo desde la web.',
    notaBoto: 'Te contesto yo, Bilal.',
    correuVia: 'o escríbeme a',
    coords: 'Mollerussa, 41,63° N 0,89° E', lloc: 'Mollerussa',
    serveisIndex: 'Ocho cosas que hago, de la web al teléfono.',
    serveisTitol: 'Qué hago',
    menuWhatsapp: 'WhatsApp',
    legal: { avis: 'Aviso legal', privacitat: 'Privacidad', creditsResum: 'Créditos de las fotos' },
    pla: {
      titol: 'Trabajo desde Mollerussa.',
      text: 'Pienso en las tiendas del mercado, las fruterías, los restaurantes y los clubes de la comarca. Muchos no tienen tiempo de pensar en la web, y por eso me encargo yo.',
      jo: 'Soy Bilal y vivo en Mollerussa. Las webs las hago yo, y si me llamas, el teléfono también lo cojo yo.',
    },
    mesSobre: 'Cómo funciona',
    radiografia: {
      titol: 'Radiografía de tu web.',
      intro: 'Pon la dirección de tu web y en un minuto ves qué le pasa, en palabras normales. Cada pieza rota es algo que arreglar.',
      introManual: 'Pon la dirección de tu web y te la miro yo: cómo se ve en el móvil, si carga rápido y cómo la encuentra Google. Te mando lo que vea, explicado claro.',
      botoManual: 'Pídemela por WhatsApp',
      demanaText: 'Hola Bilal, ¿me puedes hacer la radiografía de {url}?',
      enviada: 'Se abre WhatsApp con el mensaje escrito. Solo tienes que enviarlo.',
      etiqueta: 'Dirección de tu web', placeholder: 'tu-web.es', boto: 'Haz la radiografía',
      analitzant: 'Analizando la web tal como se ve desde un móvil. Puede tardar hasta un minuto…',
      exemple: 'Resultado de ejemplo: la herramienta todavía no analiza webs de verdad. Es bildane.com, analizada el 2 de noviembre de 2026.',
      notes: { rendiment: 'Rendimiento', accessibilitat: 'Accesibilidad', seo: 'Google (SEO)', bonesPractiques: 'Buenas prácticas', pes: 'Peso de la página' },
      arregla: 'Quiero que me lo arregles',
      arreglaText: 'Hola Bilal, he hecho la radiografía de {url} y querría que me ayudaras.',
      errors: { url: 'Esta dirección no parece una web. Prueba con algo como tu-web.es.', limit: 'Has hecho muchas radiografías hoy. Vuelve mañana o escríbeme por WhatsApp.', servei: 'No he podido analizar la web ahora mismo. Vuelve a probar dentro de un rato.' },
    },
    feinesTitol: 'Trabajos', feinesIntro: 'Dos webs reales que ya funcionan, de fuera de la comarca. Ábrelas y curiosea.',
    feinesIntroUna: 'Una tienda real que ya funciona, de fuera de la comarca. Ábrela y curiosea.', obre: 'Abrir',
    passosTitol: 'Cómo trabajo', passosIntro: '',
    passos: [
      ['Hablamos.', 'Me cuentas qué haces y qué te falla. Si estás cerca voy al local; si no, por videollamada.'],
      ['Precio y fechas.', 'Te paso un precio cerrado y las fechas por escrito. Hasta que no me dices que sí, no empiezo.'],
      ['Lo hago.', 'Te lo enseño antes de publicarlo. Los cambios que quieras en esta fase no se cobran aparte.'],
      ['Y después.', 'Cuando ya funciona, si hay que cambiar algo, me escribes por WhatsApp.'],
    ],
    faqTitol: 'Preguntas frecuentes',
    radiografiaMenu: 'Radiografía de tu web',
    faq: [
      ['¿Cuánto cuesta?', 'Depende del trabajo: no es lo mismo una web sencilla que una tienda con muchos productos, ni un asistente para un bar que para un restaurante con mucho trabajo al teléfono. Lo hablamos, incluso tomando un café si estás cerca, y te paso un precio cerrado por escrito antes de empezar.'],
      ['¿Cuánto se tarda?', 'El presupuesto lleva un calendario con las fechas. Sabes cuándo lo tendrás antes de decir que sí.'],
      ['¿Y si no me gusta?', 'Antes de publicar nada te lo enseño, y los cambios que pidas en esta fase van incluidos. Cómo se paga y qué pasa si lo dejamos a medias lo ponemos por escrito en el presupuesto.'],
      ['¿Hay alguna cuota cada mes?', 'Depende del servicio. En el presupuesto verás qué se paga una sola vez, qué se paga cada mes o cada año, y cómo darse de baja.'],
      ['¿Trabajas fuera de Mollerussa?', "Sí. En el Pla d'Urgell podemos vernos en persona; para el resto de Cataluña y España, trabajamos por WhatsApp y videollamada."],
      ['¿Y si después quiero cambiar algo?', 'Me lo mandas por WhatsApp y lo cambio. Si prefieres hacerlo tú, te enseño cómo.'],
      ['Ya tengo web. ¿Me la puedes mirar?', 'Sí. Pásame la dirección y te la miro: cómo se ve en el móvil, si carga rápido y cómo la encuentra Google. Te mando lo que vea, explicado claro.', { wa: 'Hola Bilal, ya tengo web. ¿Me la puedes mirar? Es esta: ', enllac: 'Mándame la dirección' }],
    ],
    contacte: {
      menu: 'Contacto', titol: 'Escríbeme y lo hablamos.',
      text: 'Cuéntame qué haces y qué necesitas. Si no es lo mío, también te lo diré.',
      correu: 'Correo', telefon: 'Teléfono',
      on: "Soy Bilal, de Mollerussa. Trabajo en persona en el Pla d'Urgell y en remoto en toda Cataluña y España.",
    },
    peu: {
      signatura: 'Hecho en Mollerussa.',
      credits: 'Créditos de las fotos',
      nota: 'Todas las fotos se muestran modificadas: en duotono, recortadas y con grano.',
      llicencia: 'licencia', modificada: 'modificada', domini: 'dominio público', unsplash: 'en Unsplash',
    },
    pagina: { tornar: 'Todos los servicios', altres: 'Otros servicios', etSona: '¿Te suena?', etSonaVos: '¿Os suena?', perAQui: 'Para quién es', perAQuiText: 'Restaurantes, pizzerías, bares y cualquier negocio que coja pedidos o reservas por teléfono y que en la hora punta no llegue.' },
  },
};

export { SERVEIS, FEINES };
