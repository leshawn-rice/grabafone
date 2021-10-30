# Grabaphone

Grabaphone is a REST API that allows developers to get information on over 5000+ cellular devices

## Installation

Download the source code, then use the package manager [npm](https://docs.www.npmjs.com/) to install grabaphone.

```bash
npm install
```

## Usage

### Basic Endpoints

```javascript
const {user, token} = await axios.post('/register', {username: 'testuser', password: 'testpassword', email: 'test@test.com'});
// returns {token: 'userToken', user: {username: 'testuser', email: 'test@test.com' ...}}
const {user, token} = await axios.post('/login', {username: 'testuser', password: 'testpassword'});
// returns {token: 'userToken', user: {username: 'testuser', email: 'test@test.com' ...}}
```
### Basic Database Usage
```javascript
const db = require('./db');

const users = await db.query(`SELECT * FROM Users`);
return users.rows;

// [{id: 1, username: 'testuser' ...} ...]
```

### Basic Tokens Usage
```javascript
const {createUserToken, isTokenValid} = require('./helpers/tokens');

let token = createUserToken();
isTokenValid(token); //true
isTokenValid('random00fake11Token22'); //false
```

### Basic routing/authorization
```javascript
const express = require('express');
const User = require('./models/user');
const {ensureCorrectUser} = require('./middleware/auth');
const router = express.Router();

router.delete('/users/:id', ensureCorrectUser, async (req, res, next) => {
  try {
    const {id} = req.params;
    let message = await User.delete(id);
    return res.json(message);
  }
  catch (err) {
    return next(err);
  }
});
```

## Default .gitignore
```bash
*node_modules/
*.env
*secrets*
*secret*
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)