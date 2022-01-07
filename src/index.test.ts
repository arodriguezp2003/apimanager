import RapiManager from './index';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  }),
) as jest.Mock;

beforeEach(() => {});

test('set url base ', async () => {
  const url = 'https://google.com';
  RapiManager.shared.setUrlBase(url);
  expect(RapiManager.shared.urlbase).toBe(url);
});

test('setTokenAuthBearer', async () => {
  const token = 'arp';
  RapiManager.shared.setTokenAuthBearer(token);
  expect(RapiManager.shared.token).toBe(token);
});

test('removeTokenAuthBearer', async () => {
  const token = 'arp';
  RapiManager.shared.setTokenAuthBearer(token);
  RapiManager.shared.removeTokenAuthBearer();
  expect(RapiManager.shared.token).not.toBe(token);
  expect(RapiManager.shared.token).toBe('');
});

test('set header', async () => {
  RapiManager.shared.setHeader('arp', '123');
  for (let p in RapiManager.shared.headers) {
    expect(RapiManager.shared.headers[p]).toBe('123');
  }
});

test('remove header', async () => {
  RapiManager.shared.setHeader('arp', '123');
  RapiManager.shared.removeHeader('arp');
  for (let p in RapiManager.shared.headers) {
    expect(RapiManager.shared.headers[p]).toBe('123');
  }
});

test('GET method', async () => {
  RapiManager.shared.setUrlBase('http://localhost:8080');
  let req = await RapiManager.shared.get<{ test: number }>('client');
  expect(req.test).toBe(100);
});

test('POST method', async () => {
  RapiManager.shared.setUrlBase('http://localhost:8080');
  let req = await RapiManager.shared.post<{ test: number }>('client', {});
  expect(req.test).toBe(100);
});

test('PUT method', async () => {
  RapiManager.shared.setUrlBase('http://localhost:8080');
  let req = await RapiManager.shared.put<{ test: number }>('client/1', {});
  expect(req.test).toBe(100);
});

test('DELETE method', async () => {
  RapiManager.shared.setUrlBase('http://localhost:8080');
  let req = await RapiManager.shared.delete<{ test: number }>('client/1');
  expect(req.test).toBe(100);
});
