[![Node.js Package](https://github.com/arodriguezp2003/apimanager/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/arodriguezp2003/apimanager/actions/workflows/npm-publish.yml)
## JapiManager

Connect your api very fast!!, using generic interfaces!!.

### Configuration

```javascript
// Env variables
URL_BASE = 'https://yourapi.com/v1';
//or set directly
JapiManager.shared.setUrlBase("https://yourapi.com/v1")
```

### Configure your Response Interface
This is an example to interface provide your backend
*In the next methods we will use this interface to return the request*

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
JapiManager.shared.setHeader("x-custom-headers", "123456")

//remove header
JapiManager.shared.removeHeader("x-custom-headers")
```
### Authorization Bearer
This feature is preconfigured in the headers, you only need to set the token
```javascript
interface PayloadAuth {
  token: string;
}

const req = await JapiManager.shared.post<IResponse<PayloadAuth>>('/auth/login', {
  email: 'a@a,cl',
  password: 123123
});

if(req.statusCode === 200) {
   JapiManager.shared.setTokenAuthBearer(req.payload.token);
} else {
   JapiManager.shared.removeTokenAuthBearer()
}

```
### GET METHOD

```javascript
export interface Client {
  name: string;
}
const req = await JapiManager.shared.get<IResponse<IClient>>('/clients');
if(req.statusCode === 200) {
  //IClient payload
  console.log(req.payload.name)
} else {
  //error message
  console.log(req.message)
}
```

### POST METHOD

```javascript
export interface IClient {
  name: string;
}

const data: IClient = {
  name: 'Alejandro Rodriguez',
};
const req = await JapiManager.shared.post<IResponse<IClient>>('/clients', data);

if(req.statusCode === 200) {
  //IClient payload
  console.log(req.payload.name)
} else {
  //error message
  console.log(req.message)
}

```

### PUT METHOD

```javascript
export interface IClient {
  name: string;
}

const data: IClient = {
  name: 'Alejandro Rodriguez',
};
const req =  await JapiManager.shared.put <IResponse<IClient>>('/clients/1', data);

if(req.statusCode === 200) {
  //IClient payload
  console.log(req.payload.name)
} else {
  //error message
  console.log(req.message)
}
```

### PATH METHOD

```javascript
export interface IClient {
  name: string;
}

const data: IClient = {
  name: 'Alejandro Rodriguez',
};
const req =  await JapiManager.shared.path <IResponse<IClient>>('/clients/1', data);

if(req.statusCode === 200) {
  //IClient payload
  console.log(req.payload.name)
} else {
  //error message
  console.log(req.message)
}
```

### DELETE METHOD

```javascript
const req = await JapiManager.shared.delete<IResponse<any>>('/clients/1');
if(req.statusCode === 200) {
  //delete register
  console.log(req.message)
}
```
