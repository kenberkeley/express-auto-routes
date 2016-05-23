Express Auto Routes
---------
In most of the time, we need to mount handlers/controllers to routes manually.  

***e.g.***

```javascript
/** now we are in [root]/routes/index.js **/
var home = require('../controllers/home'),
  userCtrl = require('../controllers/user');
    
var authentication = require('../services/auth');

// Method 1: mount a sub router to a path. kinda code splitting but still complicated
app.use('/', home);

// Method 2: mount controllers to routes directly, sucks
app.get('/user', authentication, userCtrl.index);
app.post('/user/login', userCtrl.login);
app.get('/user/logout', userCtrl.logout);
// ...
```

----------
It's hardly elegant, so here comes **express-auto-routes**.

***e.g.***

```javascript
/** now we are in [root]/app.js **/
var path = require('path'),
  express = require('express'),
  app = express();

var autoRoutes = require('express-auto-routes')(app); // you don't need a `routes` folder now
autoRoutes(path.join(__dirname, './controllers')); // auto mounting... done!

// ...other configures

app.listen(8080);
```

```javascript
/** now we are in [root]/controllers/user/index.js **/

exports.params = ':uid'; // so mount path is `/user/:uid` now
// exports.url = '/userXXX'; // rewrite mount path (url). default is `/user`
// exports.middlewares = require('../../services/auth'); // can be in an array

exports.get = function (req, res, next) {
  res.send('hi there: ' + req.params.uid);
};

// verbs case insensitive
exports.POST = function (req, res, next) {
  // database operation...
};
```

Then visit `localhost:8080/user/1`, you will see `hi there: 1`

----------
The magic is just globbing all the valid controller files and resolve them based on relative path.
Since we glob file recursively, without doubt it supports **unlimited** sub folders.
***e.g.***
```javascript
[root]/controllers/a/b/c/d/e/f/g => localhost:8080/a/b/c/d/e/f/g
```
