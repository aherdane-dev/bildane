// Adreces dels workers que fa servir la web. Buides = la web fa servir el
// simulador local (assistent) o el resultat d'exemple (radiografia).
// Quan tinguis el worker publicat, posa-hi la URL i executa `npm run web`.
// Aquí NO hi van claus: les claus viuen al worker (`wrangler secret put`).
// El contracte de cada endpoint és a _docs/workers.md.
export const ENDPOINTS = {
  assistent: '',    // p. ex. 'https://bildane-web.<compte>.workers.dev/xat'
  radiografia: '',  // p. ex. 'https://bildane-web.<compte>.workers.dev/radiografia'
};

// Dades del titular per a l'avís legal i la privacitat. Quan tinguis el NIF, posa'l a `nif` (el mateix en les dues llengües).
export const LEGAL = {
  titular: 'Bilal Aherdane Aherdane',
  nif: { ca: 'en tràmit', es: 'en trámite' },
  domicili: 'Mollerussa (Lleida)',
};
