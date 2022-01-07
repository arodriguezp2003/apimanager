enum METHOD {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  path = 'PATH',
  delete = 'DELETE',
}

export default class JapiManager {
  static shared: JapiManager = new JapiManager();
  urlbase = process.env.URL_BASE || 'https://dev.pimi.tech';
  token = '';
  headers: { [x: string]: string } = {};

  setUrlBase(url: string) {
    this.urlbase = url;
  }

  setTokenAuthBearer(token: string) {
    this.token = token;
  }
  removeTokenAuthBearer() {
    this.token = '';
  }

  setHeader(name: string, value: string) {
    this.headers[name] = value;
  }

  removeHeader(name: string) {
    delete this.headers[name];
  }

  async get<T>(path: string): Promise<T> {
    const uri = `${this.urlbase}${path}`;
    const response = await this.request(uri, METHOD.get);
    return await response.json();
  }

  async post<T>(path: string, body: any): Promise<T> {
    const uri = `${this.urlbase}${path}`;
    return this.request(uri, METHOD.post, body).then((response) => response.json());
  }

  async put<T>(path: string, body: any): Promise<T> {
    const uri = `${this.urlbase}${path}`;
    return this.request(uri, METHOD.put, body).then((response) => response.json());
  }

  async delete<T>(path: string): Promise<T> {
    const uri = `${this.urlbase}${path}`;
    return this.request(uri, METHOD.delete).then((response) => response.json());
  }

  private async request(uri: string, method: METHOD, body: any = null) {
    return fetch(uri, {
      method,
      headers: this.getHeader(),
      body: method === METHOD.get ? null : JSON.stringify(body),
    });
  }

  private getHeader() {
    const token = `Bearer ${this.token}`;

    const header: { [x: string]: string } = {
      Authorization: token,
      'Content-Type': 'application/json',
    };
    // this.headers.forEach((key, value) => (header[key] = value));
    return header;
  }
}
