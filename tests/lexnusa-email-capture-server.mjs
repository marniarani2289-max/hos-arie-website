import http from 'node:http';

const port = Number(process.env.LEXNUSA_EMAIL_CAPTURE_PORT || 4010);
let lastPayload = null;
let counter = 0;

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.method === 'GET' && req.url === '/last') {
    res.writeHead(lastPayload ? 200 : 404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(lastPayload || { error: 'no-email-captured' }));
    return;
  }

  if (req.method === 'POST' && req.url === '/emails') {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');
    try {
      lastPayload = JSON.parse(raw);
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'invalid-json' }));
      return;
    }
    counter += 1;
    const id = `e2e-proposal-email-${String(counter).padStart(3, '0')}`;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ id }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not-found' }));
});

server.listen(port, '127.0.0.1', () => {
  console.log(`LEXNUSA_EMAIL_CAPTURE_READY http://127.0.0.1:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
