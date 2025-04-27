const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const path = require('path');

const PORT = 8080;
const PAGES_DIR = './pages';

async function serveFile(filePath, res) {
  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    await serve404(res);
  }
}

async function serve404(res) {
  try {
    const data = await fs.readFile(path.join(PAGES_DIR, '404.html'));
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404 Not Found');
  }
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  let filePath;
  if (pathname === '/') {
    filePath = './index.html';
  } else {
    filePath = path.join(PAGES_DIR, `${pathname}.html`);
  }

  await serveFile(filePath, res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});