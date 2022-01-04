import { IRequest } from './irequest.interface';
enum METHOD {
  get = 'GET',
  post = 'POST',
  delete = 'DELETE',
}

export default class RapiManager {
  static shared: RapiManager = new RapiManager();
  urlbase = process.env.URL_BASE || 'https://dev.pimi.tech';
  token = '';

  setToken(token: string) {
    this.token = token;
  }

  removeToken() {
    this.token = '';
  }

  get<T>(path: string): Promise<IRequest<T>> {
    const uri = `${this.urlbase}${path}`;
    return this.request(uri, METHOD.get).then((response) => response.json());
  }

  post<T>(path: string, body: any): Promise<IRequest<T>> {
    const uri = `${this.urlbase}${path}`;
    return this.request(uri, METHOD.post, body).then((response) => response.json());
  }

  put<T>(path: string, body: any): Promise<IRequest<T>> {
    const uri = `${this.urlbase}${path}`;
    return this.request(uri, METHOD.post, body).then((response) => response.json());
  }

  delete<T>(path: string): Promise<IRequest<T>> {
    const uri = `${this.urlbase}${path}`;
    return this.request(uri, METHOD.delete).then((response) => response.json());
  }

  private async request(uri: string, method: METHOD, body: any = null) {
    const token = `Bearer ${this.token}`;
    return fetch(uri, {
      method,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: method === METHOD.get ? null : JSON.stringify(body),
    });
  }
}
