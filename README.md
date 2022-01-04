## RapiManager

connect with your api rest faster! Json and interface!. 

###Configuration

```javascript
// Env variables
URL_BASE = 'https://yourapi.com/v1/';
```

###Backend Interface

```javascript
export interface IRequest<T> {
  statusCode: number;
  message?: string;
  payload: T;
}
```

###GET

```javascript
export interface Client {
  name: string;
}
const req = await RapiManager.shared.get<IClient>('/clients');
if(req.statusCode === 200) {
  //IClient payload
  console.log(req.payload.name)
} else {
  //error message
  console.log(req.error)
}
```

###POST

```javascript
export interface IClient {
  name: string;
}

const data: IClient = {
  name: 'Alejandro Rodriguez',
};
const req = await RapiManager.shared.post<IClient>('/clients', data);
```

###PUT

```javascript
export interface IClient {
  name: string;
}

const data: IClient = {
  name: 'Alejandro Rodriguez',
};
const req =  await RapiManager.shared.update <IClient>('/clients', data);
```

###Delete

```javascript
const req = await RapiManager.shared.delete<any>('/clients/1');
```
