require('dotenv').config();
const http = require('http');

const requestHandler = (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === 'GET') {
    const name = parsedUrl.searchParams.get('name') || process.env.MYNAME || 'Guest';
    console.log("log nenenene")
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Hello, i am ${name}!` }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};

const server = http.createServer(requestHandler);

if (require.main === module) {
  server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
  });
}

module.exports = { server, requestHandler };
