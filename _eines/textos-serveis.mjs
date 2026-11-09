// Textos de les pàgines de servei (/serveis/... i /es/servicios/...).
// Un bloc per servei i llengua. L'ordre i les fotos són a SERVEIS (textos.mjs).
//
// Camps:
//   titolSeo     <title> de la pàgina, màxim 50 caràcters, amb "Mollerussa" o "Pla d'Urgell"
//                (sense "Bildane": el codi hi afegeix " | Bildane")
//   descripcio   meta description, màxim 155 caràcters
//   entradeta    1 o 2 frases sota el títol de la pàgina; que no repeteixi el text de la portada
//   perAQui      una frase que va a la capçalera, sota l'entradeta
//   etSona       situacions del dia a dia, en segona persona (no són cites de clients)
//   prova        (opcional) { titol, paragrafs }: la prova que es pot fer abans de decidir
//   comFunciona  { titol, paragrafs }: com és el servei de veritat
//   preguntes    parells [pregunta, resposta], concrets d'aquest servei (els que calguin)
//
// Regles: primera persona ("faig", "et preparo"), frases clares, sense exagerar,
// sense xifres, clients, opinions ni promeses que no puguem complir. Cap llista amb
// un nombre fix d'elements: que mani el contingut. Si un detall del servei no és
// segur, frase prudent i apunta-ho a _disseny/REVISAR.md.

const PREU_CA = "Depèn del que necessitis. Quan m'ho has explicat, et passo un preu tancat per escrit, abans de començar.";
const PREU_ES = 'Depende de lo que necesites. Cuando me lo has explicado, te paso un precio cerrado por escrito, antes de empezar.';

export const PAGINES = {
  telefon: {
    ca: {
      titolSeo: 'Assistent telefònic per a restaurants, Mollerussa',
      descripcio: "Un assistent amb IA que contesta les trucades del teu restaurant en català i castellà i pren comandes i reserves. Des de Mollerussa.",
      entradeta: "Un assistent amb IA que contesta les trucades que tu no pots agafar i t'apunta la comanda o la reserva, en català o en castellà.",
      perAQui: "Restaurants, pizzeries, bars i qualsevol negoci que agafi comandes o reserves per telèfon i que a l'hora punta no hi arribi.",
      etSona: ["A les nou tens el forn ple, sona el telèfon i no hi arribes.", "Quan tornes la trucada, el client ja ha demanat a un altre lloc."],
      comFunciona: {
        titol: 'Com funciona',
        paragrafs: [
          "Li explico la teva carta, els horaris i com treballes. A partir d'aquí, quan truca un client i tu no pots agafar el telèfon, contesta ell.",
          "Pren nota de la comanda o de la reserva i te la deixa per escrit: per correu o en una pantalla o tiquet a la cuina, segons el que faci servir el restaurant.",
          "Abans de posar-lo en marxa, el provem junts amb trucades de prova. Si canvies la carta o els horaris, m'ho dius i li ho explico.",
        ],
      },
      preguntes: [
        ['Hauré de canviar el número del restaurant?', "Normalment no: es configura un desviament de trucades perquè les que no pots agafar passin a l'assistent. Ho miro amb la teva companyia de telèfon."],
        ['Els clients sabran que parlen amb un assistent?', "Sí. Quan agafa la trucada, diu que és l'assistent del restaurant, i així el client sap des del principi amb qui parla."],
        ["I si el client vol parlar amb una persona, o l'assistent no l'entén?", "Si no l'entén, li ho torna a preguntar d'una altra manera, com veus a la demo. Si el client vol parlar amb tu, o si tot i així no s'entenen, es pot configurar perquè et passi la trucada."],
        ['Hi ha una quota cada mes?', 'Al pressupost hi veuràs per escrit què es paga una sola vegada, què es paga cada mes i com el pots donar de baixa.'],
        ['Quant costa?', "Depèn de si ha d'agafar comandes, reserves o totes dues coses, de com t'han d'arribar i de quantes trucades rep el restaurant. Quan ho he vist, et passo un preu tancat per escrit."],
      ],
    },
    es: {
      titolSeo: 'Asistente telefónico para restaurantes, Mollerussa',
      descripcio: 'Un asistente con IA que contesta las llamadas de tu restaurante en catalán y castellano y toma pedidos y reservas. Desde Mollerussa.',
      entradeta: 'Un asistente con IA que contesta las llamadas que tú no puedes coger y te apunta el pedido o la reserva, en catalán o en castellano.',
      perAQui: 'Restaurantes, pizzerías, bares y cualquier negocio que coja pedidos o reservas por teléfono y que en la hora punta no llegue.',
      etSona: ["A las nueve tienes el horno lleno, suena el teléfono y no llegas.", "Cuando devuelves la llamada, el cliente ya ha pedido en otro sitio."],
      comFunciona: {
        titol: 'Cómo funciona',
        paragrafs: [
          'Le explico tu carta, los horarios y cómo trabajas. A partir de ahí, cuando llama un cliente y tú no puedes coger el teléfono, contesta él.',
          'Toma nota del pedido o de la reserva y te lo deja por escrito: por correo o en una pantalla o tique en la cocina, según lo que use el restaurante.',
          'Antes de ponerlo en marcha, lo probamos juntos con llamadas de prueba. Si cambias la carta o los horarios, me lo dices y se lo explico.',
        ],
      },
      preguntes: [
        ['¿Tendré que cambiar el número del restaurante?', 'Normalmente no: se configura un desvío de llamadas para que las que no puedes coger pasen al asistente. Lo miro con tu compañía de teléfono.'],
        ['¿Los clientes sabrán que hablan con un asistente?', 'Sí. Al coger la llamada, dice que es el asistente del restaurante, y así el cliente sabe desde el principio con quién habla.'],
        ['¿Y si el cliente quiere hablar con una persona, o el asistente no le entiende?', 'Si no le entiende, se lo vuelve a preguntar de otra manera, como ves en la demo. Si el cliente quiere hablar contigo, o si aun así no se entienden, se puede configurar para que te pase la llamada.'],
        ['¿Hay una cuota cada mes?', 'En el presupuesto verás por escrito qué se paga una sola vez, qué se paga cada mes y cómo darlo de baja.'],
        ['¿Cuánto cuesta?', 'Depende de si tiene que coger pedidos, reservas o las dos cosas, de cómo te tienen que llegar y de cuántas llamadas recibe el restaurante. Cuando lo he visto, te paso un precio cerrado por escrito.'],
      ],
    },
  },

  xat: {
    ca: {
      titolSeo: 'Assistent de xat per a webs de Mollerussa',
      descripcio: "Una finestreta a la teva web que respon els dubtes dels clients en català i castellà, amb la informació del teu negoci. Per a negocis del Pla d'Urgell.",
      entradeta: 'Una finestreta a la teva web que respon els dubtes de sempre: horaris, preus, on sou, com reservar. Contesta també de nit. Cada mes té un màxim de converses, que mirem segons el que necessitis.',
      perAQui: 'Negocis que reben sempre les mateixes preguntes: restaurants, botigues, acadèmies, clubs, allotjaments.',
      etSona: ["Cada dia et pregunten el mateix: a quina hora obres i si cal reservar.", "Els missatges de la nit els veus l'endemà, quan ja és tard."],
      comFunciona: {
        titol: 'Com funciona',
        paragrafs: [
          "M'expliques el que et pregunten cada dia: horaris, preus, on ets, com es reserva, si hi ha aparcament. Amb això preparo l'assistent i el poso en una finestreta de la teva web.",
          'El client hi escriu com en un missatge qualsevol i rep la resposta al moment.',
          "Quan canvies horaris o preus, m'ho dius i li ho actualitzo.",
        ],
      },
      preguntes: [
        ["I si l'assistent no sap la resposta?", "El preparo perquè ho digui clarament i passi el teu WhatsApp o el teu telèfon, en lloc d'inventar-se res. Abans de posar-lo, el provem amb les preguntes que et fan de veritat."],
        ['Pot fer reserves o agafar comandes?', 'Pot explicar com es reserva i portar el client on toca: el teu telèfon, el teu WhatsApp o la teva pàgina de reserves. Si vols que faci alguna cosa més, ho mirem quan en parlem.'],
        ['Funciona si la web no me l\'has feta tu?', "Sí. Te l'afegeixo encara que la web te l'hagi feta una altra persona."],
        ["És el mateix que l'assistent telefònic?", "S'hi assembla: tots dos responen amb la informació del teu negoci. L'un contesta trucades i l'altre, missatges escrits a la web. Pots tenir-ne un o tots dos."],
        ['Quant costa?', "Depèn sobretot de quantes converses rep al mes, perquè cada pla té un màxim. Ho mirem segons el que necessitis i et passo el preu per escrit."],
      ],
    },
    es: {
      titolSeo: 'Asistente de chat para webs en Mollerussa',
      descripcio: "Una ventanita en tu web que responde las dudas de los clientes en catalán y castellano, con la información de tu negocio. Para negocios del Pla d'Urgell.",
      entradeta: 'Una ventanita en tu web que responde las dudas de siempre: horarios, precios, dónde estáis, cómo reservar. Contesta también de noche. Cada mes tiene un máximo de conversaciones, que miramos según lo que necesites.',
      perAQui: 'Negocios que reciben siempre las mismas preguntas: restaurantes, tiendas, academias, clubes, alojamientos.',
      etSona: ["Cada día te preguntan lo mismo: a qué hora abres y si hay que reservar.", "Los mensajes de la noche los ves al día siguiente, cuando ya es tarde."],
      comFunciona: {
        titol: 'Cómo funciona',
        paragrafs: [
          'Me cuentas lo que te preguntan cada día: horarios, precios, dónde estás, cómo se reserva, si hay aparcamiento. Con eso preparo el asistente y lo pongo en una ventanita de tu web.',
          'El cliente escribe como en un mensaje cualquiera y recibe la respuesta al momento.',
          'Cuando cambias horarios o precios, me lo dices y se lo actualizo.',
        ],
      },
      preguntes: [
        ['¿Y si el asistente no sabe la respuesta?', 'Lo preparo para que lo diga claramente y pase tu WhatsApp o tu teléfono, en lugar de inventarse nada. Antes de ponerlo, lo probamos con las preguntas que te hacen de verdad.'],
        ['¿Puede hacer reservas o coger pedidos?', 'Puede explicar cómo se reserva y llevar al cliente donde toca: tu teléfono, tu WhatsApp o tu página de reservas. Si quieres que haga algo más, lo miramos cuando lo hablemos.'],
        ['¿Funciona si la web no me la has hecho tú?', 'Sí. Te lo añado aunque la web te la haya hecho otra persona.'],
        ['¿Es lo mismo que el asistente telefónico?', 'Se parece: los dos responden con la información de tu negocio. Uno contesta llamadas y el otro, mensajes escritos en la web. Puedes tener uno o los dos.'],
        ['¿Cuánto cuesta?', 'Depende sobre todo de cuántas conversaciones recibe al mes, porque cada plan tiene un máximo. Lo miramos según lo que necesites y te paso el precio por escrito.'],
      ],
    },
  },

  webs: {
    ca: {
      titolSeo: "Webs a mida per a negocis del Pla d'Urgell",
      descripcio: 'Webs ràpides i clares, pensades per al mòbil, que expliquen què fas, on ets i com contactar-te. En català i en castellà. Des de Mollerussa.',
      entradeta: 'Webs ràpides i clares, pensades primer per al mòbil, que expliquen què fas, on ets i com contactar-te. Segons el cas, la faig amb WordPress o programada a mà.',
      perAQui: "Botigues, restaurants, professionals, clubs i entitats que encara no tenen web, o que en tenen una de vella que no s'entén al mòbil.",
      etSona: ["Et busquen a internet i surt una web vella que al mòbil no es llegeix.", "Et pregunten l'horari per telèfon perquè a internet no el troben."],
      comFunciona: {
        titol: 'Com funciona',
        paragrafs: [
          "Primer m'expliques el teu negoci, què et pregunten els clients i què vols que hi trobin. Amb això et proposo com serà la web i què hi haurà a cada pàgina.",
          "Preparem els textos, en català i en castellà, i hi poso les teves fotos. La revises abans de publicar-la, i els canvis d'aquesta fase van inclosos.",
          "Si la faig amb WordPress, podràs canviar textos i fotos tu mateix. Si és programada a mà, com la web de l'A.D. La Llàntia, els canvis els faig jo.",
        ],
      },
      preguntes: [
        ['Quant costa?', "Depèn de quantes pàgines tingui, de si porta reserves o botiga i de si els textos i les fotos ja els tens. Quan ho he vist, et passo un preu tancat per escrit."],
        ['Quant es triga?', 'Depèn de quantes pàgines tingui i de quan tinguem els textos i les fotos. Al pressupost hi va un calendari amb les dates, perquè ho sàpigues abans de començar.'],
        ['Després la podré canviar jo?', "Si la faig amb WordPress, sí: t'ensenyo a canviar textos, fotos i horaris. I si no la vols tocar, m'ho dius i ho canvio."],
        ["T'encarregues també del domini i l'allotjament?", "El domini és l'adreça de la web, i l'allotjament, el lloc on es guarda perquè es pugui veure. Me n'encarrego jo, i tu els pagues a part; al pressupost hi veuràs què costa cada cosa."],
        ['La web i el domini seran meus?', "Sí. El domini va a nom teu, i si un dia vols canviar de proveïdor, t'ho passo tot."],
        ['La web serà accessible?', 'Hi cuido el contrast dels colors, que la lletra es pugui ampliar i que les imatges tinguin text per als lectors de pantalla. La reviso abans de publicar-la.'],
      ],
    },
    es: {
      titolSeo: "Webs a medida para negocios del Pla d'Urgell",
      descripcio: 'Webs rápidas y claras, pensadas para el móvil, que explican qué haces, dónde estás y cómo contactarte. En catalán y en castellano. Desde Mollerussa.',
      entradeta: 'Webs rápidas y claras, pensadas primero para el móvil, que explican qué haces, dónde estás y cómo contactarte. Según el caso, la hago con WordPress o programada a mano.',
      perAQui: 'Tiendas, restaurantes, profesionales, clubes y entidades que todavía no tienen web, o que tienen una antigua que no se entiende en el móvil.',
      etSona: ["Te buscan en internet y sale una web antigua que en el móvil no se lee.", "Te preguntan el horario por teléfono porque en internet no lo encuentran."],
      comFunciona: {
        titol: 'Cómo funciona',
        paragrafs: [
          'Primero me cuentas tu negocio, qué te preguntan los clientes y qué quieres que encuentren. Con eso te propongo cómo será la web y qué habrá en cada página.',
          'Preparamos los textos, en catalán y en castellano, y pongo tus fotos. La revisas antes de publicarla, y los cambios de esta fase van incluidos.',
          'Si la hago con WordPress, podrás cambiar textos y fotos tú mismo. Si es programada a mano, como la web de la A.D. La Llàntia, los cambios los hago yo.',
        ],
      },
      preguntes: [
        ['¿Cuánto cuesta?', 'Depende de cuántas páginas tenga, de si lleva reservas o tienda y de si los textos y las fotos ya los tienes. Cuando lo he visto, te paso un precio cerrado por escrito.'],
        ['¿Cuánto se tarda?', 'Depende de cuántas páginas tenga y de cuándo tengamos los textos y las fotos. El presupuesto lleva un calendario con las fechas, para que lo sepas antes de empezar.'],
        ['¿Después podré cambiarla yo?', 'Si la hago con WordPress, sí: te enseño a cambiar textos, fotos y horarios. Y si no quieres tocarla, me lo dices y lo cambio.'],
        ['¿Te encargas también del dominio y el alojamiento?', 'El dominio es la dirección de la web, y el alojamiento, el sitio donde se guarda para que se pueda ver. Me encargo yo, y tú los pagas aparte; en el presupuesto verás qué cuesta cada cosa.'],
        ['¿La web y el dominio serán míos?', 'Sí. El dominio va a tu nombre, y si un día quieres cambiar de proveedor, te lo paso todo.'],
        ['¿La web será accesible?', 'Cuido el contraste de los colores, que la letra se pueda ampliar y que las imágenes tengan texto para los lectores de pantalla. La reviso antes de publicarla.'],
      ],
    },
  },

  botiga: {
    ca: {
      titolSeo: 'Botigues en línia amb WooCommerce, Mollerussa',
      descripcio: "Botigues en línia amb WooCommerce per a comerços i productors del Pla d'Urgell: catàleg, cistella i pagament, i la gestiones tu, també des del mòbil.",
      entradeta: 'Una botiga a internet amb catàleg, cistella i pagament, que ven també quan tens la persiana abaixada. La faig amb WooCommerce i la gestiones tu.',
      perAQui: 'Botigues que ja venen al taulell i volen vendre també per internet, i productors de la zona que volen arribar a clients de fora de la comarca.',
      etSona: ["Clients de fora et pregunten si els pots enviar el producte a casa.", "Quan tanques, ja no vens res fins l'endemà."],
      comFunciona: {
        titol: 'Com funciona',
        paragrafs: [
          'WooCommerce és un programa per fer botigues en línia que funciona damunt de WordPress. És molt conegut i la botiga és teva, no d\'una plataforma.',
          'Muntem el catàleg amb les teves fotos, preus i variants, com talles o colors, i deixem preparat com cobres i com envies. Abans d\'obrir, fem comandes de prova de principi a fi. Així està feta la botiga de Reve Padel.',
          "Després t'ensenyo a afegir productes, canviar preus i preparar les comandes. Si un dia no hi arribes, m'ho dius i ho faig jo.",
        ],
      },
      preguntes: [
        ['Quant costa?', "Depèn de quants productes hi hagi, de si tenen variants com talles o colors i de com vols cobrar i enviar. Quan ho he vist, et passo un preu tancat per escrit. WooCommerce no cobra per venda; el banc aplica la seva comissió de targeta."],
        ['Com cobraré les vendes?', "Amb targeta i amb Bizum, a través del teu banc. També pots deixar que el client pagui quan passi a recollir la comanda per la botiga."],
        ["Qui s'encarrega dels enviaments?", "L'enviament el fas tu, amb la missatgeria que ja facis servir o amb la que triïs. Jo deixo la botiga preparada amb els preus d'enviament i l'opció de recollir a la botiga."],
        ['Podré afegir productes jo?', "Sí. T'ensenyo a afegir productes, canviar preus i veure les comandes, també des del mòbil."],
      ],
    },
    es: {
      titolSeo: 'Tiendas online con WooCommerce en Mollerussa',
      descripcio: "Tiendas online con WooCommerce para comercios y productores del Pla d'Urgell: catálogo, carrito y pago, y la gestionas tú, también desde el móvil.",
      entradeta: 'Una tienda en internet con catálogo, carrito y pago, que vende también cuando tienes la persiana bajada. La hago con WooCommerce y la gestionas tú.',
      perAQui: 'Tiendas que ya venden en el mostrador y quieren vender también por internet, y productores de la zona que quieren llegar a clientes de fuera de la comarca.',
      etSona: ["Clientes de fuera te preguntan si les puedes enviar el producto a casa.", "Cuando cierras, ya no vendes nada hasta el día siguiente."],
      comFunciona: {
        titol: 'Cómo funciona',
        paragrafs: [
          'WooCommerce es un programa para hacer tiendas online que funciona sobre WordPress. Es muy conocido y la tienda es tuya, no de una plataforma.',
          'Montamos el catálogo con tus fotos, precios y variantes, como tallas o colores, y dejamos preparado cómo cobras y cómo envías. Antes de abrir, hacemos pedidos de prueba de principio a fin. Así está hecha la tienda de Reve Padel.',
          'Después te enseño a añadir productos, cambiar precios y preparar los pedidos. Si un día no llegas, me lo dices y lo hago yo.',
        ],
      },
      preguntes: [
        ['¿Cuánto cuesta?', 'Depende de cuántos productos haya, de si tienen variantes como tallas o colores y de cómo quieres cobrar y enviar. Cuando lo he visto, te paso un precio cerrado por escrito. WooCommerce no cobra por venta; el banco aplica su comisión de tarjeta.'],
        ['¿Cómo cobraré las ventas?', 'Con tarjeta y con Bizum, a través de tu banco. También puedes dejar que el cliente pague cuando pase a recoger el pedido por la tienda.'],
        ['¿Quién se encarga de los envíos?', 'El envío lo haces tú, con la mensajería que ya uses o con la que elijas. Yo dejo la tienda preparada con los precios de envío y la opción de recoger en tienda.'],
        ['¿Podré añadir productos yo?', 'Sí. Te enseño a añadir productos, cambiar precios y ver los pedidos, también desde el móvil.'],
      ],
    },
  },

  google: {
    ca: {
      titolSeo: 'Google Business i SEO local a Mollerussa',
      descripcio: "Que et trobin quan busquen a prop el que fas: creo o poso al dia la teva fitxa de Google Business i preparo la web per a les cerques del Pla d'Urgell.",
      entradeta: 'Que et trobin quan algú busca el que fas a prop de casa. Creo o poso al dia la teva fitxa de Google Business, i preparo la web perquè Google entengui què fas i on.',
      perAQui: 'Qualsevol negoci amb un local on van els clients: bars, restaurants, botigues, tallers, perruqueries, clíniques.',
      etSona: ["Busquen el teu negoci a Google i surt amb l'horari d'abans.", "La fitxa de Google la va fer algú altre i no saps com entrar-hi."],
      comFunciona: {
        titol: 'Com funciona',
        paragrafs: [
          'Google Business és la fitxa que surt a Google i a Google Maps quan algú busca el teu negoci: horaris, telèfon, fotos, com arribar-hi i ressenyes. Si no la tens, la creem; si ja existeix, comprovem que sigui teva i la completem.',
          'El SEO local vol dir que la teva web expliqui clarament què fas i on ho fas, perquè Google la mostri a qui busca a la zona. Reviso els textos, els títols i les dades de contacte perquè coincideixin amb la fitxa.',
          "Les ressenyes les respons tu, que és qui coneix els clients. T'explico com fer-ho perquè la resposta sigui clara i amable.",
        ],
      },
      preguntes: [
        ['Sortiré el primer a Google?', "Ningú t'ho pot prometre: l'ordre el decideix Google i depèn de qui busca i des d'on. El que sí faig és que la teva informació sigui completa, correcta i igual a tot arreu, que és la part que depèn de tu."],
        ['Ja tinc fitxa a Google. Me la pots arreglar?', 'Sí. Primer mirem que la fitxa estigui al teu nom. Si no ho està, Google té una manera de demostrar que el negoci és teu, i et dic pas a pas què has de fer. Després la completem.'],
        ['Es poden esborrar les ressenyes dolentes?', "Normalment no. Si una ressenya incompleix les normes de Google, es pot denunciar. Les altres, el que toca és respondre-les amb calma, i t'explico com fer-ho."],
        ['Necessito tenir web?', 'No és imprescindible: la fitxa funciona sola. Però amb una web, Google té més informació sobre el teu negoci i el client hi troba el que la fitxa no explica.'],
      ],
    },
    es: {
      titolSeo: 'Google Business y SEO local en Mollerussa',
      descripcio: "Que te encuentren cuando buscan cerca lo que haces: creo o pongo al día tu ficha de Google Business y preparo la web para búsquedas del Pla d'Urgell.",
      entradeta: 'Que te encuentren cuando alguien busca lo que haces cerca de casa. Creo o pongo al día tu ficha de Google Business, y preparo la web para que Google entienda qué haces y dónde.',
      perAQui: 'Cualquier negocio con un local al que van los clientes: bares, restaurantes, tiendas, talleres, peluquerías, clínicas.',
      etSona: ["Buscan tu negocio en Google y sale con el horario de antes.", "La ficha de Google la hizo otra persona y no sabes cómo entrar."],
      comFunciona: {
        titol: 'Cómo funciona',
        paragrafs: [
          'Google Business es la ficha que sale en Google y en Google Maps cuando alguien busca tu negocio: horarios, teléfono, fotos, cómo llegar y reseñas. Si no la tienes, la creamos; si ya existe, comprobamos que sea tuya y la completamos.',
          'El SEO local consiste en que tu web explique claramente qué haces y dónde lo haces, para que Google la muestre a quien busca en la zona. Reviso los textos, los títulos y los datos de contacto para que coincidan con la ficha.',
          'Las reseñas las respondes tú, que eres quien conoce a los clientes. Te explico cómo hacerlo para que la respuesta sea clara y amable.',
        ],
      },
      preguntes: [
        ['¿Saldré el primero en Google?', 'Nadie te lo puede prometer: el orden lo decide Google y depende de quién busca y desde dónde. Lo que sí hago es que tu información sea completa, correcta e igual en todas partes, que es la parte que depende de ti.'],
        ['Ya tengo ficha en Google. ¿Me la puedes arreglar?', 'Sí. Primero miramos que la ficha esté a tu nombre. Si no lo está, Google tiene una forma de demostrar que el negocio es tuyo, y te digo paso a paso qué tienes que hacer. Después la completamos.'],
        ['¿Se pueden borrar las reseñas malas?', 'Normalmente no. Si una reseña incumple las normas de Google, se puede denunciar. Las demás, lo que toca es responderlas con calma, y te explico cómo hacerlo.'],
        ['¿Necesito tener web?', 'No es imprescindible: la ficha funciona sola. Pero con una web, Google tiene más información sobre tu negocio y el cliente encuentra lo que la ficha no explica.'],
      ],
    },
  },

  carta: {
    ca: {
      titolSeo: 'Carta QR per a bars i restaurants, Mollerussa',
      descripcio: "La carta del teu restaurant al mòbil del client, amb un codi QR a cada taula, en català i castellà. Per a bars i restaurants del Pla d'Urgell.",
      entradeta: 'La carta del restaurant al mòbil del client, amb un codi QR a cada taula i els al·lèrgens marcats a cada plat.',
      perAQui: 'Restaurants, bars, pizzeries, cafeteries i terrasses que canvien sovint de plats o de preus, o que volen la carta en català i en castellà sense haver-ne d\'imprimir dues.',
      etSona: ["Cada cop que canvies un preu, has de tornar a imprimir les cartes.", "Et pregunten pels al·lèrgens i has d'anar a la cuina a mirar-ho."],
      comFunciona: {
        titol: 'Com funciona',
        paragrafs: [
          "M'envies la carta tal com la tens, encara que sigui una foto, amb els preus i el que porta cada plat. La passo a una pàgina que s'obre al mòbil, clara i fàcil de llegir.",
          "El client escaneja el codi QR amb la càmera del mòbil i la carta s'obre al moment. Pot triar si la vol en català o en castellà.",
          "Quan canvies un plat, un preu o el menú del dia, m'ho dius i ho canvio. El QR de les taules no canvia.",
        ],
      },
      preguntes: [
        ["Els clients s'han de descarregar alguna aplicació?", "No. Obren la càmera del mòbil, apunten al codi i la carta s'obre al navegador."],
        ['Hi surten els al·lèrgens?', "Sí, cada plat porta marcats els seus al·lèrgens. La informació me la dones tu, perquè ets qui sap què porta cada plat; jo m'encarrego que es vegi clara."],
        ['Com es canvien els preus?', "Me'ls demanes i els canvio jo. El codi QR no canvia, així que no cal tornar a imprimir les plaques."],
        ['I els clients que prefereixen la carta en paper?', 'La pots continuar tenint. El QR és una opció més, i va bé per a la terrassa o quan la carta canvia sovint.'],
      ],
    },
    es: {
      titolSeo: 'Carta QR para bares y restaurantes, Mollerussa',
      descripcio: "La carta de tu restaurante en el móvil del cliente, con un código QR en cada mesa, en catalán y castellano. Para bares y restaurantes del Pla d'Urgell.",
      entradeta: 'La carta del restaurante en el móvil del cliente, con un código QR en cada mesa y los alérgenos marcados en cada plato.',
      perAQui: 'Restaurantes, bares, pizzerías, cafeterías y terrazas que cambian a menudo de platos o de precios, o que quieren la carta en catalán y en castellano sin imprimir dos.',
      etSona: ["Cada vez que cambias un precio, tienes que volver a imprimir las cartas.", "Te preguntan por los alérgenos y tienes que ir a la cocina a mirarlo."],
      comFunciona: {
        titol: 'Cómo funciona',
        paragrafs: [
          'Me mandas la carta tal como la tienes, aunque sea una foto, con los precios y lo que lleva cada plato. La paso a una página que se abre en el móvil, clara y fácil de leer.',
          'El cliente escanea el código QR con la cámara del móvil y la carta se abre al momento. Puede elegir si la quiere en catalán o en castellano.',
          'Cuando cambias un plato, un precio o el menú del día, me lo dices y lo cambio. El QR de las mesas no cambia.',
        ],
      },
      preguntes: [
        ['¿Los clientes tienen que descargarse alguna aplicación?', 'No. Abren la cámara del móvil, apuntan al código y la carta se abre en el navegador.'],
        ['¿Salen los alérgenos?', 'Sí, cada plato lleva marcados sus alérgenos. La información me la das tú, porque eres quien sabe qué lleva cada plato; yo me encargo de que se vea clara.'],
        ['¿Cómo se cambian los precios?', 'Me los pides y los cambio yo. El código QR no cambia, así que no hace falta volver a imprimir las placas.'],
        ['¿Y los clientes que prefieren la carta en papel?', 'Puedes seguir teniéndola. El QR es una opción más, y va bien para la terraza o cuando la carta cambia a menudo.'],
      ],
    },
  },

  manteniment: {
    ca: {
      titolSeo: 'Manteniment i seguretat web a Mollerussa',
      descripcio: "Actualitzacions, còpies de seguretat i canvis petits a la teva web. M'envies un WhatsApp i ho canvio. Per a negocis de Mollerussa i el Pla d'Urgell.",
      entradeta: "Mantinc al dia la teva web de WordPress i hi faig els canvis petits que em demanis, perquè no hagis d'entrar-hi tu.",
      perAQui: "Negocis que ja tenen web i prefereixen enviar-me un WhatsApp abans que entrar al WordPress.",
      etSona: ["La web et demana actualitzacions i no t'atreveixes a tocar res.", "Vols canviar l'horari i ja no recordes ni la contrasenya."],
      comFunciona: {
        titol: 'Com funciona',
        paragrafs: [
          "Una web feta amb WordPress s'ha d'actualitzar de tant en tant, com el mòbil. Si no es fa, pot començar a fallar o quedar més exposada a atacs. M'encarrego d'actualitzar-la i de comprovar que tot continua funcionant.",
          'Faig una còpia de seguretat abans de cada canvi. Si alguna cosa no surt bé, la puc tornar a deixar com estava.',
          "I quan canvies l'horari, tens un plat nou o vols canviar una foto, m'envies un WhatsApp i ho canvio.",
        ],
      },
      preguntes: [
        ['Quins canvis entren al manteniment?', 'Els canvis petits del dia a dia: un horari, un text, unes fotos, un plat nou. Si és una secció nova o un canvi de disseny, et passo un pressupost a part abans de començar.'],
        ["La web no me l'has feta tu. Te'n pots fer càrrec?", "Sí, després de revisar-la: primer miro com està feta i en quin estat es troba."],
        ['I si la web deixa de funcionar?', "M'avises i ho miro com més aviat millor. Si el problema ve d'un canvi, amb la còpia que en faig abans la puc tornar a deixar com estava."],
        ['Com es paga el manteniment?', "Ho parlem segons el que necessiti la teva web. Al pressupost hi veuràs què inclou, què costa, cada quant es paga i com donar-lo de baixa."],
      ],
    },
    es: {
      titolSeo: 'Mantenimiento y seguridad web en Mollerussa',
      descripcio: "Actualizaciones, copias de seguridad y cambios pequeños en tu web. Me mandas un WhatsApp y lo cambio. Para negocios de Mollerussa y el Pla d'Urgell.",
      entradeta: 'Mantengo al día tu web de WordPress y le hago los cambios pequeños que me pidas, para que no tengas que entrar tú.',
      perAQui: 'Negocios que ya tienen web y prefieren mandarme un WhatsApp antes que entrar en el WordPress.',
      etSona: ["La web te pide actualizaciones y no te atreves a tocar nada.", "Quieres cambiar el horario y ya no recuerdas ni la contraseña."],
      comFunciona: {
        titol: 'Cómo funciona',
        paragrafs: [
          'Una web hecha con WordPress se tiene que actualizar de vez en cuando, como el móvil. Si no se hace, puede empezar a fallar o quedar más expuesta a ataques. Me encargo de actualizarla y de comprobar que todo sigue funcionando.',
          'Hago una copia de seguridad antes de cada cambio. Si algo no sale bien, puedo volver a dejarla como estaba.',
          'Y cuando cambias el horario, tienes un plato nuevo o quieres cambiar una foto, me mandas un WhatsApp y lo cambio.',
        ],
      },
      preguntes: [
        ['¿Qué cambios entran en el mantenimiento?', 'Los cambios pequeños del día a día: un horario, un texto, unas fotos, un plato nuevo. Si es una sección nueva o un cambio de diseño, te paso un presupuesto aparte antes de empezar.'],
        ['La web no me la has hecho tú. ¿Te puedes encargar?', 'Sí, después de revisarla: primero miro cómo está hecha y en qué estado está.'],
        ['¿Y si la web deja de funcionar?', 'Me avisas y lo miro lo antes posible. Si el problema viene de un cambio, con la copia que hago antes puedo volver a dejarla como estaba.'],
        ['¿Cómo se paga el mantenimiento?', 'Lo hablamos según lo que necesite tu web. En el presupuesto verás qué incluye, qué cuesta, cada cuánto se paga y cómo darlo de baja.'],
      ],
    },
  },

  // Per a empreses: aquí es parla de vosaltres, no de tu.
  albarans: {
    ca: {
      titolSeo: "Albarans i factures amb IA al Pla d'Urgell",
      descripcio: "Feu una foto de l'albarà o la factura i la IA en passa les dades a un Excel o al vostre programa. Per a centrals fruiteres, magatzems i logística.",
      entradeta: "El personal fa una foto de l'albarà o la factura amb el mòbil, i la IA en llegeix les dades i les passa a un Excel o al programa de l'empresa.",
      perAQui: "Centrals fruiteres, cooperatives, magatzems i empreses de logística que cada dia passen a mà les dades d'albarans i factures de paper.",
      etSona: ["Cada matí algú de l'oficina pica a mà els albarans del dia abans.", "Si algú pica malament un quilo, no us n'adoneu fins que els comptes no quadren."],
      prova: {
        titol: 'Primer, una prova',
        paragrafs: [
          "Abans de començar, fem una prova amb els vostres albarans reals, també els escrits a mà. Així veiem què llegeix bé i què no, i decidiu si us val la pena. No us prometo cap percentatge: ho veureu amb els vostres papers.",
          'Si la prova no us convenç, ho deixem aquí.',
        ],
      },
      comFunciona: {
        titol: 'Com funciona',
        paragrafs: [
          "Abans de la prova mirem quins papers us arriben (albarans d'entrada i de sortida, factures de proveïdors) i quines dades en necessiteu: la data, el proveïdor, el producte, els quilos, el preu.",
          "Si la prova va bé, el personal fa la foto amb el mòbil i les dades queden en un Excel o passen al programa que ja feu servir, si s'hi pot connectar. Es pot preparar perquè les dades dubtoses quedin marcades i una persona les revisi.",
        ],
      },
      preguntes: [
        ['Funciona amb el nostre programa de gestió?', "Depèn del programa. Les dades sempre poden quedar en un Excel, i molts programes en poden importar un. Si es pot connectar directament, ho mirem durant la prova; no us ho dic abans de veure-ho."],
        ['On es guarden les fotos i les dades?', 'Abans de començar signem un contracte d\'encàrrec del tractament, com demana la llei de protecció de dades. Hi diu on es guarden les fotos i les dades, qui hi té accés i quan s\'esborren. Les dades són vostres.'],
        ['I si un dia deixem el servei?', 'Les dades queden en el vostre Excel o en el vostre programa, no en el meu. Si ho deixem, no perdeu res del que ja s\'ha llegit.'],
        ['Quant costa?', "Depèn de quants documents feu i d'on hagin d'anar les dades. Després de la prova us passo un pressupost tancat per escrit: sabeu què pagueu abans de començar."],
      ],
    },
    es: {
      titolSeo: "Albaranes y facturas con IA en el Pla d'Urgell",
      descripcio: 'Haced una foto del albarán o la factura y la IA pasa los datos a un Excel o a vuestro programa. Para centrales fruteras, almacenes y logística.',
      entradeta: 'El personal hace una foto del albarán o la factura con el móvil, y la IA lee los datos y los pasa a un Excel o al programa de la empresa.',
      perAQui: 'Centrales fruteras, cooperativas, almacenes y empresas de logística que cada día pasan a mano los datos de albaranes y facturas en papel.',
      etSona: ["Cada mañana alguien de la oficina teclea a mano los albaranes del día anterior.", "Si alguien teclea mal un kilo, no os dais cuenta hasta que las cuentas no cuadran."],
      prova: {
        titol: 'Primero, una prueba',
        paragrafs: [
          'Antes de empezar, hacemos una prueba con vuestros albaranes reales, también los escritos a mano. Así vemos qué lee bien y qué no, y decidís si os vale la pena. No os prometo ningún porcentaje: lo veréis con vuestros papeles.',
          'Si la prueba no os convence, lo dejamos aquí.',
        ],
      },
      comFunciona: {
        titol: 'Cómo funciona',
        paragrafs: [
          'Antes de la prueba miramos qué papeles os llegan (albaranes de entrada y de salida, facturas de proveedores) y qué datos necesitáis: la fecha, el proveedor, el producto, los kilos, el precio.',
          'Si la prueba va bien, el personal hace la foto con el móvil y los datos quedan en un Excel o pasan al programa que ya usáis, si se puede conectar. Se puede preparar para que los datos dudosos queden marcados y una persona los revise.',
        ],
      },
      preguntes: [
        ['¿Funciona con nuestro programa de gestión?', 'Depende del programa. Los datos siempre pueden quedar en un Excel, y muchos programas pueden importar uno. Si se puede conectar directamente, lo miramos durante la prueba; no os lo digo antes de verlo.'],
        ['¿Dónde se guardan las fotos y los datos?', 'Antes de empezar firmamos un contrato de encargo del tratamiento, como pide la ley de protección de datos. Ahí pone dónde se guardan las fotos y los datos, quién tiene acceso y cuándo se borran. Los datos son vuestros.'],
        ['¿Y si un día dejamos el servicio?', 'Los datos quedan en vuestro Excel o en vuestro programa, no en el mío. Si lo dejamos, no perdéis nada de lo que ya se ha leído.'],
        ['¿Cuánto cuesta?', 'Depende de cuántos documentos hagáis y de adónde tengan que ir los datos. Después de la prueba os paso un presupuesto cerrado por escrito: sabéis qué pagáis antes de empezar.'],
      ],
    },
  },
};
