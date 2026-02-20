const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { requestHandler } = require('../src/app');

function createTestClient() {
  const server = http.createServer(requestHandler);

  return new Promise((resolve) => {
    server.listen(0, () => {
      const { port } = server.address();
      resolve({
        close: () => new Promise((done) => server.close(done)),
        request: async (path, headers) => {
          const response = await fetch(`http://127.0.0.1:${port}${path}`, { headers });
          const contentType = response.headers.get('content-type') || '';
          const payload = contentType.includes('application/json')
            ? await response.json()
            : await response.text();

          return {
            status: response.status,
            body: payload
          };
        }
      });
    });
  });
}

const baseHeaders = { 'x-user-id': 'u-1' };

test('dashboard is accessible to any authenticated role', async () => {
  const client = await createTestClient();
  const response = await client.request('/dashboard', {
    ...baseHeaders,
    'x-user-role': 'USER',
    'x-user-subscription': 'FREE'
  });

  assert.equal(response.status, 200);
  assert.match(response.body, /Dashboard/);
  await client.close();
});

test('admin route denies non-admin role', async () => {
  const client = await createTestClient();
  const response = await client.request('/admin', {
    ...baseHeaders,
    'x-user-role': 'RESOLVER',
    'x-user-subscription': 'PROFESSIONAL'
  });

  assert.equal(response.status, 403);
  await client.close();
});

test('resolver route allows resolver and admin', async () => {
  const client = await createTestClient();
  const resolverRes = await client.request('/resolver', {
    ...baseHeaders,
    'x-user-role': 'RESOLVER',
    'x-user-subscription': 'FREE'
  });
  const adminRes = await client.request('/resolver', {
    ...baseHeaders,
    'x-user-role': 'ADMIN',
    'x-user-subscription': 'FREE'
  });

  assert.equal(resolverRes.status, 200);
  assert.equal(adminRes.status, 200);
  await client.close();
});

test('free users cannot access premium routes', async () => {
  const client = await createTestClient();
  const doubtSessionRes = await client.request('/doubt-session', {
    ...baseHeaders,
    'x-user-role': 'USER',
    'x-user-subscription': 'FREE'
  });
  const interviewRes = await client.request('/interview-module', {
    ...baseHeaders,
    'x-user-role': 'USER',
    'x-user-subscription': 'FREE'
  });

  assert.equal(doubtSessionRes.status, 403);
  assert.equal(interviewRes.status, 403);
  await client.close();
});

test('moderate users can access doubt session but not interview module', async () => {
  const client = await createTestClient();
  const doubtSessionRes = await client.request('/doubt-session', {
    ...baseHeaders,
    'x-user-role': 'USER',
    'x-user-subscription': 'MODERATE'
  });
  const interviewRes = await client.request('/interview-module', {
    ...baseHeaders,
    'x-user-role': 'USER',
    'x-user-subscription': 'MODERATE'
  });

  assert.equal(doubtSessionRes.status, 200);
  assert.equal(interviewRes.status, 403);
  await client.close();
});

test('professional users can access interview module', async () => {
  const client = await createTestClient();
  const response = await client.request('/interview-module', {
    ...baseHeaders,
    'x-user-role': 'USER',
    'x-user-subscription': 'PROFESSIONAL'
  });

  assert.equal(response.status, 200);
  await client.close();
});

test('api route checks role and subscription constraints', async () => {
  const client = await createTestClient();
  const adminApi = await client.request('/api/admin/audit', {
    ...baseHeaders,
    'x-user-role': 'ADMIN',
    'x-user-subscription': 'FREE'
  });
  const resolverApiDenied = await client.request('/api/admin/audit', {
    ...baseHeaders,
    'x-user-role': 'RESOLVER',
    'x-user-subscription': 'PROFESSIONAL'
  });
  const premiumApiDenied = await client.request('/api/premium/interview-module', {
    ...baseHeaders,
    'x-user-role': 'USER',
    'x-user-subscription': 'MODERATE'
  });

  assert.equal(adminApi.status, 200);
  assert.equal(resolverApiDenied.status, 403);
  assert.equal(premiumApiDenied.status, 403);
  await client.close();
});
