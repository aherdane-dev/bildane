# «On treballo»: les pàgines de comarca

Una pàgina índex (`/on-treballo/`, `/es/donde-trabajo/`) amb un mapa de les 13 comarques i una pàgina per comarca, en català i en castellà (28 pàgines). Surten de `npm run web`.

## On és cada cosa

| Què | On |
|---|---|
| Llista de comarques, distàncies, fonts fixes i el context que fa servir cada text | `_eines/comarques.mjs` |
| Textos (català i castellà) i índex | `_eines/textos-comarques-ca.mjs`, `_eines/textos-comarques-es.mjs` |
| Xifres d'Idescat (població, afiliacions, cens agrari, allotjaments) | `_eines/comarques-idescat.json`, que es baixa amb `node _eines/dades-idescat.mjs` |
| Límits de les comarques per al mapa (ICGC, 1:50 000) | `_eines/mapa-comarques.json`, amb `node _eines/mapa-comarques.mjs` |
| Dibuix del mapa en SVG | `_eines/mapa-svg.mjs` i `assets/comarques.css` |
| Distància i temps per carretera des de Mollerussa | `km` i `min` de `_eines/comarques.mjs`, calculats amb `node _eines/distancies.mjs` (OSRM, OpenStreetMap) |
| Comprovació de semblança entre pàgines | `node _eines/similitud.mjs` (falla si un parell passa del 30 %) |

## Regles dels textos

- **Cap xifra escrita a mà.** Els textos agafen les xifres de `x.n('poblacio')`, `x.af('Industria')`, etc.; si Idescat les actualitza, es tornen a baixar i es reconstrueix.
- **Cada afirmació de fets porta la seva font** (`x.cita('clau')`), que surt numerada al final de la pàgina. Una dada que no es pot citar no es posa.
- **Res d'inventat:** ni clients, ni projectes, ni opinions, ni premis.
- **Honestedat sobre la distància.** Pla d'Urgell, Urgell, Segrià, Noguera, Garrigues i Segarra: en persona. Les altres set: sobretot en remot, amb visita si cal. El camp `mode` de cada comarca ho fixa.
- **Cada pàgina diu coses diferents.** Títols de bloc propis, sense paràgrafs repetits. `similitud.mjs` ho mesura; el límit és el 30 %.

## Quan cal tornar-hi

- Cada any, o quan Idescat publiqui dades noves: `node _eines/dades-idescat.mjs` i `npm run web`.
- Si canvia un servei, el text d'`encaix` de cada comarca l'enllaça amb `x.s('id-del-servei', 'text')`.
- Si afegeixes una comarca: una entrada a `COMARQUES`, a `CODIS` de `dades-idescat.mjs` i de `mapa-comarques.mjs`, i el text en les dues llengües.
