## RapiManager

connect with your api rest faster! Json and interface!. 

### Configuration

```javascript
// Env variables
URL_BASE = 'https://yourapi.com/v1';
//or
ApiManager.shared.setUrlBase("https://yourapi.com/v1")
```

### Backend Interface

```javascript
export interface IRequest<T> {
  statusCode: number;
  message?: string;
  payload: T;
}
```
### Authorization Bearer
```javascript

//interface from your backend
interface AccessToken {
  token: string;
}

const req = await ApiManager.shared.post<AccessToken>('/auth/login', {
  email: 'a@a,cl',
  password: 123123
});

if(req.statusCode === 200) {
  // now the new request implement bearer token whit this token!.
   ApiManager.shared.setToken(req.payload.token);
}

```
### GET

```javascript
export interface Client {
  name: string;
}
const req = await ApiManager.shared.get<IClient>('/clients');
if(req.statusCode === 200) {
  //IClient payload
  console.log(req.payload.name)
} else {
  //error message
  console.log(req.error)
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
const req = await ApiManager.shared.post<IClient>('/clients', data);
```

### PUT

```javascript
export interface IClient {
  name: string;
}

const data: IClient = {
  name: 'Alejandro Rodriguez',
};
const req =  await ApiManager.shared.update <IClient>('/clients', data);
```

### Delete

```javascript
const req = await ApiManager.shared.delete<any>('/clients/1');
```
