const test = require('node:test');
const assert = require('node:assert');
const http = require('http');
const { requestHandler } = require('./main');

const sleep = (ms) => {
  const pro = new Promise((resolve) => setTimeout(() => resolve(), ms))
}

test('GET request returns greeting with query param', async () => {
  const server = http.createServer(requestHandler);

  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;

  const res = await fetch(`http://localhost:${port}/?name=AWS`);
  const data = await res.json();

  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(data, { message: 'Hello, i am AWS!' });
  sleep(10000);
  await new Promise((resolve) => server.close(resolve));
});
