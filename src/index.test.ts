import JapiManager from './index';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  }),
) as jest.Mock;

beforeEach(() => {
  JapiManager.shared.setUrlBase('http://localhost:8080');
});

test('set url base ', async () => {
  const url = 'https://google.com';
  JapiManager.shared.setUrlBase(url);
  expect(JapiManager.shared.urlbase).toBe(url);
});

test('setTokenAuthBearer', async () => {
  const token = 'arp';
  JapiManager.shared.setTokenAuthBearer(token);
  expect(JapiManager.shared.token).toBe(token);
});

test('removeTokenAuthBearer', async () => {
  const token = 'arp';
  JapiManager.shared.setTokenAuthBearer(token);
  JapiManager.shared.removeTokenAuthBearer();
  expect(JapiManager.shared.token).not.toBe(token);
  expect(JapiManager.shared.token).toBe('');
});

test('set header', async () => {
  const key = 'arp';
  JapiManager.shared.setHeader(key, '123');
  expect(JapiManager.shared.headers[key]).toBe('123');
});

test('remove header', async () => {
  const key = 'arp';
  JapiManager.shared.setHeader(key, '123');
  JapiManager.shared.removeHeader(key);
  expect(JapiManager.shared.headers[key]).toBe(undefined);
});

test('GET method', async () => {
  const req = await JapiManager.shared.get<{ test: number }>('client');
  expect(req.test).toBe(100);
});

test('POST method', async () => {
  const req = await JapiManager.shared.post<{ test: number }>('client', {});
  expect(req.test).toBe(100);
});

test('PUT method', async () => {
  const req = await JapiManager.shared.put<{ test: number }>('client/1', {});
  expect(req.test).toBe(100);
});

test('DELETE method', async () => {
  const req = await JapiManager.shared.delete<{ test: number }>('client/1');
  expect(req.test).toBe(100);
});
