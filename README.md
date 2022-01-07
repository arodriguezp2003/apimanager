[![Node.js Package](https://github.com/arodriguezp2003/apimanager/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/arodriguezp2003/apimanager/actions/workflows/npm-publish.yml)
## RapiManager

connect with your api rest faster! Json and interface!. 

### Configuration

```javascript
// Env variables
URL_BASE = 'https://yourapi.com/v1';
//or
RapiManager.shared.setUrlBase("https://yourapi.com/v1")
```

### Configure your Response Interface
We will use this example interface, it is the response that the backend delivers for each request

```javascript
export interface IResponse<T> {
  statusCode: number;
  message?: string;
  payload: T;
}
```
### Headers 
```javascript
//add new header 
RapiManager.shared.setHeader("x-custom-headers", "123456")

//remove header
RapiManager.shared.removeHeader("x-custom-headers")
```
### Authorization Bearer
this feature is preconfigured, you should only set the token.
```javascript
interface PayloadAuth {
  token: string;
}

const req = await RapiManager.shared.post<IResponse<PayloadAuth>>('/auth/login', {
  email: 'a@a,cl',
  password: 123123
});

if(req.statusCode === 200) {
   RapiManager.shared.setTokenAuthBearer(req.payload.token);
} else {
   RapiManager.shared.removeTokenAuthBearer()
}

```
### GET

```javascript
export interface Client {
  name: string;
}
const req = await RapiManager.shared.get<IResponse<IClient>>('/clients');
if(req.statusCode === 200) {
  //IClient payload
  console.log(req.payload.name)
} else {
  //error message
  console.log(req.message)
}
```

### POST

```javascript
export interface IClient {
  name: string;
}

const data: IClient = {
  name: 'Alejandro Rodriguez',
};
const req = await RapiManager.shared.post<IResponse<IClient>>('/clients', data);

if(req.statusCode === 200) {
  //IClient payload
  console.log(req.payload.name)
} else {
  //error message
  console.log(req.message)
}

```

### PUT

```javascript
export interface IClient {
  name: string;
}

const data: IClient = {
  name: 'Alejandro Rodriguez',
};
const req =  await RapiManager.shared.put <IResponse<IClient>>('/clients/1', data);

if(req.statusCode === 200) {
  //IClient payload
  console.log(req.payload.name)
} else {
  //error message
  console.log(req.message)
}
```

### PATH

```javascript
export interface IClient {
  name: string;
}

const data: IClient = {
  name: 'Alejandro Rodriguez',
};
const req =  await RapiManager.shared.path <IResponse<IClient>>('/clients/1', data);

if(req.statusCode === 200) {
  //IClient payload
  console.log(req.payload.name)
} else {
  //error message
  console.log(req.message)
}
```

### Delete

```javascript
const req = await RapiManager.shared.delete<IResponse<any>>('/clients/1');
if(req.statusCode === 200) {
  //delete register
  console.log(req.message)
}
```
