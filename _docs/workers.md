# Workers de la web de Bildane

La web té dues eines que necessiten un servidor: **l'assistent de la Pizzeria del Pla** i **la radiografia de la web**. Mentre no hi ha worker, la web funciona igual:

- l'assistent respon amb un **simulador local** (`assets/assistent.js`, funció `simulador`, amb el vocabulari a `assets/assistent-simulador.json`, que es baixa només quan algú escriu);
- la radiografia no ensenya cap resultat: el formulari obre WhatsApp amb el missatge «em pots fer la radiografia de {url}?» perquè en Bilal la faci a mà.

Quan el worker estigui publicat:

1. Posa les URL a `_eines/config.mjs` (`ENDPOINTS.assistent` i `ENDPOINTS.radiografia`).
2. Executa `npm run web`.

A la web **no hi va cap clau**. Les claus viuen al worker com a secrets (`wrangler secret put NOM`).

Ha de ser un worker **nou i només per a aquesta web**. No es reutilitza cap altre worker.

---

## Requisits comuns

| Què | Com |
|---|---|
| CORS | `Access-Control-Allow-Origin` només per a `https://bildane.com` (i `http://localhost:8130` per provar). Respon `OPTIONS` amb `Access-Control-Allow-Methods: POST` i `Access-Control-Allow-Headers: content-type`. |
| Mètode | Només `POST` amb cos JSON. La resta, `405`. |
| Mida | Rebutja cossos de més de 16 KB amb `413`. |
| Límits | Per visitant: identifica'l amb un hash de la IP (`CF-Connecting-IP`) i, a l'assistent, també amb `sessio`. Desa els comptadors a KV o Durable Objects amb caducitat. Si se supera, `429`. |
| Privacitat | **No desis les converses ni les adreces analitzades.** Només els comptadors (hash, sense IP en clar) i, a la radiografia, la memòria cau del resultat. La web ho promet al costat del micròfon. |
| Errors | Respon sempre JSON: `{ "error": "codi" }`. La web només mira el codi d'estat HTTP. |

---

## 1. Assistent: `POST /xat`

### Rep

```json
{
  "lang": "ca",
  "sessio": "8f0c2e4a-…",
  "missatges": [
    { "rol": "assistent", "text": "Pizzeria del Pla, bona nit. Vols fer una comanda o reservar taula?" },
    { "rol": "client", "text": "Dues margarita per emportar" }
  ]
}
```

| Camp | Tipus | Notes |
|---|---|---|
| `lang` | `"ca"` \| `"es"` | Llengua de la pàgina. L'assistent ha de respondre en la llengua del client, encara que no coincideixi. |
| `sessio` | text (UUID) | La web el genera i el guarda a `sessionStorage`. Serveix per comptar missatges. No identifica ningú. |
| `missatges` | llista | Tota la conversa, de més antic a més nou, màxim 20. `rol`: `"client"` o `"assistent"`. Cada `text`, màxim 300 caràcters (la web ja ho limita; el worker ho ha de tornar a comprovar). |

### Torna (`200`)

```json
{
  "resposta": "Apuntat: dues margarites. Vols res més? Si ja està, digue'm un nom.",
  "comanda": {
    "tipus": "emportar",
    "productes": [{ "quantitat": 2, "nom": "margarita", "text": "2 margarites" }],
    "persones": null,
    "dia": null,
    "nom": null,
    "hora": null,
    "confirmada": false
  },
  "final": false,
  "opcions": ["Margarita", "Quatre formatges", "Barbacoa", "Vegetal", "Pernil"],
  "llengua": "ca"
}
```

| Camp | Tipus | Notes |
|---|---|---|
| `resposta` | text | El que diu l'assistent. Curt (1–2 frases): es pot llegir en veu alta. **Mai idèntica a una resposta anterior de la mateixa conversa.** |
| `comanda.tipus` | `"emportar"` \| `"reserva"` \| `null` | La web ho tradueix ("Per emportar", "Reserva de taula"). |
| `comanda.productes` | llista `{ quantitat, nom, text? }` \| `null` | Només pizzes de la carta. `nom` en la llengua de la **pàgina** (`lang`). `text` (opcional) és com surt al tiquet, amb concordança: "3 margarites", "2 de pernil" ("3 margaritas", "2 de jamón"); si no hi és, la web hi posa `quantitat nom`. Passar a reserva el buida (`null`). |
| `comanda.persones` | nombre \| `null` | Només per a reserves. Passar a emportar el buida (`null`). |
| `comanda.dia` | text \| `null` | El dia, en la llengua de la **pàgina** i tal com ha de sortir al tiquet: "Avui", "Demà", "Dissabte" ("Hoy", "Mañana", "Sábado"). A les reserves és obligatori: si el client no el diu, es pregunta. Per emportar s'entén que és avui i no cal; si el client en diu un altre, s'hi posa. |
| `comanda.nom` | text \| `null` | |
| `comanda.hora` | text `"HH:MM"` \| `null` | Format 24 h, dins l'horari (19:00–23:00). |
| `comanda.confirmada` | booleà | `true` quan el client ha dit que sí al resum. El tiquet hi afegeix "Estat: Confirmada". Si després canvia alguna dada, torna a `false` i es demana confirmació de nou. |
| `final` | booleà | `true` quan la comanda o la reserva és completa i confirmada (igual que `comanda.confirmada`). |
| `opcions` | llista de text (opcional) | Respostes ràpides que la web ensenya com a botons sota la conversa (màxim 6, de 40 caràcters com a molt; la resta s'ignoren). En prémer-ne un, la web l'envia com si el client l'hagués escrit. En la llengua de la **conversa**. Si no ve o és buida, no surt cap botó. |
| `llengua` | `"ca"` \| `"es"` (opcional) | Llengua en què ha respost. La web la fa servir per a la veu (síntesi i reconeixement). Si no ve, es manté la de la pàgina. |

La web fusiona `comanda` amb la que ja té (`{ ...anterior, ...nova }`), així que els camps que no canvien poden no venir o venir repetits. Per esborrar un camp, envia'l a `null`.

Botons que fa servir el simulador, com a referència (el worker en pot tornar uns altres):

| Moment | `opcions` (ca) | `opcions` (es) |
|---|---|---|
| Inici (també els posa la web a l'HTML) | Per emportar · Reservar taula · Què teniu? | Para llevar · Reservar mesa · ¿Qué tenéis? |
| Demana pizzes, o just després d'apuntar-ne | les cinc de la carta | les cinc de la carta |
| Persones | 2 · 4 · 6 | 2 · 4 · 6 |
| Dia (reserves) | Avui · Demà · Dissabte · Diumenge | Hoy · Mañana · Sábado · Domingo |
| "Teniu pernil?" (quantes?) | 1 · 2 · 3 | 1 · 2 · 3 |
| Hora | 20:00 · 21:00 · 22:00 | 20:00 · 21:00 · 22:00 |
| Resum | Sí · No, vull canviar | Sí · No, quiero cambiar |
| Què vols canviar? | Les pizzes · L'hora · El nom (reserva: Les persones · El dia · L'hora · El nom) | Las pizzas · La hora · El nombre (reserva: Las personas · El día · La hora · El nombre) |
| Comanda confirmada | Fer-ne una altra · Gràcies | Hacer otro pedido · Gracias |

### Errors

| Estat | Quan | Què ensenya la web |
|---|---|---|
| `400` | Cos mal format | "Ara mateix no puc respondre…" |
| `429` | Límit superat | "Has arribat al límit de missatges de la demo…" i desactiva el formulari |
| `5xx` o més de 20 s | Error del model o del worker | "Ara mateix no puc respondre…" |

### Límits recomanats

- **20 missatges** per `sessio`.
- **60 missatges al dia** per IP (hash).
- Un **pressupost diari global** (per exemple, 2.000 missatges) perquè una pujada de visites no disparés la factura del model.

### Instruccions per al model (resum)

- És l'assistent telefònic de la **Pizzeria del Pla**, un restaurant inventat de Mollerussa. Si li ho pregunten (adreça, si és una persona, si és real), ho diu.
- Carta: margarita, quatre formatges, barbacoa, vegetal i pernil. Obert cada dia de 19:00 a 23:00. "A les 9" vol dir 21:00. Si demanen una hora fora de l'horari, ho diu i en demana una altra.
- **No té preus**: és una demo. Si els pregunten, ho diu així, sense inventar-ne cap.
- Pren comandes per emportar i reserves de taula. Demana, per ordre: tipus; productes (per emportar) o persones i dia (reserva); nom i hora. Entén "demà", "dissabte", "mañana" o "el viernes", i les hores com es diuen aquí: "a les 9", "2/4 de 10", "tres quarts de nou". Amb tot, fa un resum i demana confirmació; quan diuen que sí, `final: true` i s'acomiada.
- Entén salutacions, sí/no (sí, vale, d'acord, ok…), "què?" o "no t'entenc", agraïments i comiats, preguntes sobre la carta i l'horari, i correccions ("no, tres margarita", "millor a les 22:00", "canvia-ho a reserva", "anul·la"). Si demanen una pizza que no hi és, ho diu i recorda la carta.
- **Llengua**: respon en la del client, encara que la pàgina sigui de l'altra. Només la canvia amb indicis clars. Les paraules que es diuen igual parlant català ("vale", "ok", "venga"), els noms de pizza i els números no la canvien. Ho indica a `llengua`.
- **Una pregunta no és una comanda.** A "teniu pizza de pernil?" respon "Sí, tenim la de pernil. Quantes en vols?" i no apunta res fins que el client diu quantes.
- Tolera les faltes habituals: "vui", "pizes", "kiero", "k teniu", "ola", "grasies". "Per emportar" o "para llevar" sols posen el tipus, en qualsevol moment de la conversa.
- **Parla amb concordança**: "dues margarites", "tres de pernil", "dos margaritas", "una de jamón".
- **Mai repeteix una resposta idèntica** dins la conversa. Si el client no avança (respon "hola", "si", "que"…), reformula la pregunta i, a partir del tercer cop, hi afegeix una pista concreta (un exemple o els botons). El worker ho ha de garantir comparant la resposta amb les anteriors abans de tornar-la.
- Després de confirmar, si el client continua, respon amb sentit: agraïments i comiats curts, canvis (tornen a demanar confirmació) o una comanda nova.
- Frases curtes, de telèfon. No parla de res més: si li demanen una altra cosa, torna a la comanda.
- No demana ni accepta dades de pagament, telèfons ni adreces.
- Torna sempre el JSON de dalt: millor amb sortida estructurada (*structured output* / *tool use*) que no pas analitzant text lliure.

El simulador local (`assets/assistent.js`, amb el vocabulari i les frases a `_eines/assistent.mjs`) fa exactament aquest paper i és la referència de comportament. Les proves són a `_disseny/proves/assistent/converses.mjs`.

**Secret:** la clau del proveïdor del model (per exemple `ANTHROPIC_API_KEY`), amb `wrangler secret put`.

---

## 2. Radiografia: `POST /radiografia`

### Rep

```json
{ "url": "https://lateva-web.cat/", "lang": "ca" }
```

La web ja normalitza l'adreça (hi afegeix `https://` si falta). El worker ho ha de tornar a comprovar:

- Només `http:` o `https:`.
- Ni IP, ni `localhost`, ni dominis sense punt.
- Màxim 2.048 caràcters.

Si no compleix, `400`.

### Què fa

1. Mira la memòria cau (KV), amb clau = URL normalitzada + llengua. Si hi ha un resultat de menys de 24 h, el torna.
2. Crida **PageSpeed Insights v5**:
   `GET https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=…&strategy=mobile&category=performance&category=accessibility&category=seo&category=best-practices&key=…`
3. En treu les notes i les troballes (vegeu més avall) i les escriu en paraules normals, en la llengua demanada.
4. Ho desa a la memòria cau i ho torna.

**Secret:** `PSI_API_KEY`, una clau de Google Cloud amb l'API PageSpeed Insights activada. Sense clau, Google limita molt les consultes: avui mateix n'ha rebutjat una per quota.

### Torna (`200`)

```json
{
  "url": "https://bildane.com/",
  "analitzada": "2026-11-02T22:19:00.000Z",
  "notes": { "rendiment": 92, "accessibilitat": 100, "seo": 100, "bonesPractiques": 100 },
  "pes": { "bytes": 21458734 },
  "carrega": { "lcpMs": 2676 },
  "troballes": [
    { "nivell": "malament", "titol": "La pàgina pesa 20 MB.", "text": "Al mòbil, amb mala cobertura, es fa llarga i gasta dades del client." },
    { "nivell": "millorable", "titol": "Les imatges es poden aprimar uns 9 MB.", "text": "Amb formats moderns es veuen igual i carreguen molt més ràpid." },
    { "nivell": "be", "titol": "Accessible, ben indexada a Google i sense errors.", "text": "Contrast, textos alternatius, títol i descripció: tot al seu lloc." }
  ]
}
```

Quan el worker estigui actiu, la web ensenya aquest resultat directament. Mai no s'han d'ensenyar dades d'exemple després que l'usuari hagi escrit la seva adreça.

| Camp | D'on surt (resposta de PSI → `lighthouseResult`) |
|---|---|
| `notes.*` | `categories.{performance, accessibility, seo, best-practices}.score × 100`, arrodonit |
| `pes.bytes` | `audits['total-byte-weight'].numericValue` |
| `carrega.lcpMs` | `audits['largest-contentful-paint'].numericValue` |
| `troballes` | Entre 3 i 5. Prioritza: pes total, `modern-image-formats`, `uses-responsive-images`, `largest-contentful-paint`, `color-contrast`, `image-alt`, `meta-description`, `document-title`, `tap-targets`. `nivell`: `"malament"` \| `"millorable"` \| `"be"`. Sempre n'hi ha almenys una de `"be"`: la radiografia ha de ser honesta, no fer por. |

La web pinta les notes de 90 o més en verd i les de menys en rostoll, esquerdades si són de menys de 50. El pes surt verd fins a 2 MB, rostoll fins a 5 MB i esquerdat a partir de 5 MB.

### Errors

| Estat | Quan | Què ensenya la web |
|---|---|---|
| `400` | Adreça no vàlida o no accessible per a PSI | "Aquesta adreça no sembla una web…" |
| `429` | Límit superat | "Has fet moltes radiografies avui…" |
| `5xx` o més de 70 s | PSI no respon o falla | "No he pogut analitzar la web ara mateix…" |

### Límits recomanats

- **5 radiografies al dia** per IP (hash).
- **200 al dia** en total. La quota gratuïta de PSI amb clau és molt més alta, però així queda acotat.

---

## Provar-ho en local

1. `npm run servidor` obre la web a http://localhost:8130.
2. Amb el worker en marxa (`wrangler dev` sol escoltar a http://localhost:8787), posa `http://localhost:8787/xat` i `http://localhost:8787/radiografia` a `_eines/config.mjs`.
3. Executa `npm run web`.
4. Abans de publicar, torna a posar les URL bones.
