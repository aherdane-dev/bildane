// Servidor estàtic per provar la web en local: node _eines/servidor.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const port = +(process.argv[2] || 8123);
const tipus = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon' };
http.createServer((req, res) => {
  let f = path.join(process.cwd(), decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  // com GitHub Pages: el que no existeix torna 404.html amb estat 404
  if (!fs.existsSync(f)) { res.writeHead(404, { 'Content-Type': tipus['.html'] }); return fs.createReadStream(path.join(process.cwd(), '404.html')).pipe(res); }
  res.writeHead(200, { 'Content-Type': tipus[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log('http://localhost:' + port));
