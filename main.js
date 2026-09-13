const { log } = require('console');
const http = require('http');

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === 'GET') {
      const name = parsedUrl.searchParams.get('name') || 'Guest';

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Hello, ${name}!` }));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
