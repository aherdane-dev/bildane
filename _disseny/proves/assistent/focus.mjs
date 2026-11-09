// Captura del focus de teclat en una resposta ràpida (accessibilitat).
import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await p.goto('http://localhost:8130/serveis/assistent-telefonic/', { waitUntil: 'networkidle' });
await p.locator('.as-escriu input').focus();
await p.keyboard.press('Shift+Tab'); // de l'entrada al darrer botó de resposta ràpida
const actiu = await p.evaluate(() => document.activeElement.textContent);
await p.locator('.as-trucada').screenshot({ path: new URL('./focus-xip.png', import.meta.url).pathname.slice(1) });
console.log('focus a:', actiu);
await b.close();
