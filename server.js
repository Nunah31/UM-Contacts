const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const PORT = 3456;

http.createServer((req, res) => {
  let filePath = path.join(BASE, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  try {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath).slice(1);
    const ct = { html: 'text/html', json: 'application/json', js: 'text/javascript', css: 'text/css' }[ext] || 'text/plain';
    res.writeHead(200, { 'Content-Type': ct + ';charset=utf-8', 'Access-Control-Allow-Origin': '*' });
    res.end(data);
  } catch (e) {
    res.writeHead(404);
    res.end('Not found: ' + req.url);
  }
}).listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
