# localstorage-with-expires

Tiny localStorage api with data auto-expired, auto JSON stringlify, etc.

## Usage

```
npm i localstorage-with-expires
```

## Example

```
import * as ls from 'localstorage-with-expires';

ls.set('user-loginInfo', {
  userName: 'blablabla',
  age: 18
}, 24 * 60 * 60 * 1000); // userinfo will be expired in 24 hours

ls.get('user-loginInfo'); // 24 hours later you will get 'null' here, expired data will be remove from localStorage
```

Typescript supported
```
import ls, { get, set } from 'localstorage-with-expires';

interface UserInfo {
  userName: string;
  age: number;
}

get<UserInfo>('user-loginInfo');
set<UserInfo>('user-loginInfo', {
  userName: 'blablabla',
  age: 18
});

// factory function `ls`
const loginStorage = ls<UserInfo>('user-loginInfo', 24 * 60 * 60 * 1000);

const login = (loginInfo: UserInfo) => {
  loginStorage.set(loginInfo);
}

const getUserInfo = () => loginStorage.get();

const logout = () => loginStorage.remove(); 

```
