// Toy HTTP listener — exists only so the deploy pipeline has something
// to deploy. Real services in the AcmeShop platform (see infra-docs-template)
// are Spring Boot or FastAPI; the templates don't care which.
const http = require('node:http');

const PORT = process.env.PORT || 8080;
const VERSION = process.env.APP_VERSION || 'unknown';

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', version: VERSION }));
    return;
  }
  res.writeHead(404).end();
});

server.listen(PORT, () => {
  console.log(`demo-app listening on :${PORT} (version=${VERSION})`);
});
