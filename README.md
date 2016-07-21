# Express Auto Routes
[![Node.js Version][node-image]][node-url]
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Dependency Status][dep-image]][dep-url]
[![Coverage Status][cov-img]][cov-url]

---------
In most of the time, we need to mount handlers/controllers to routes manually.  

***e.g.***

```javascript
/** now we are in [root]/routes/index.js **/
var homeRouter = require('./home/'),
  userCtrl = require('../controllers/user');

// Method 1: mount a sub router to a path. kinda code splitting but still complicated
app.use('/', homeRouter);

// Method 2: mount controllers to routes directly, sucks
app.get('/user', userCtrl.index);
app.post('/user/login', userCtrl.login);
app.get('/user/logout', userCtrl.logout);
...
```

----------
It's hardly elegant, so here comes **express-auto-routes**.
Firstly, ```npm install express-auto-routes --save``` please.

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
/** now we are in [root]/controllers/hello/world.js **/
exports.get = function (req, res, next) {
  res.send('hello world');
};
```

Then visit `localhost:8080/hello/world`, you will see `hello world`

----------
The magic is just globbing all the **valid** controller files and resolve them based on relative path.
Since we glob file recursively, without doubt it supports **unlimited** sub folders.

***e.g.***
```javascript
[root]/controllers/a/b/c/d/e/f/g.js => localhost:8080/a/b/c/d/e/f/g
```


----------
Here I highly recommend you checking out the `example/` folder for more detail.

```
> cd example
> npm install
> npm run test (or node app.js)

[AutoMount] use /home/
[AutoMount] use /user/
[AutoMount] use /user/logout/
[AutoMount] all /user/setting/
[AutoMount] get /home/foo/bar/world/
[AutoMount] get /user/setting/:uid
[AutoMount] delete /user/logout/:uid
[AutoMount] get /home/foo/hello/
[AutoMount] get /home/foo/bar/
[AutoMount] get /user/logout/
[AutoMount] get /user/:uid?
[AutoMount] get /home/foo/
[AutoMount] get /home/xyz/
[AutoMount] post /setting
[AutoMount] get /login
[AutoMount] get /home/
[AutoMount] post /login
[AutoMount] put /user/
[AutoMount] post /log
[AutoMount] get /
```

then visit `localhost:8080` to test the above APIs

[node-image]: https://img.shields.io/node/v/express-auto-routes.svg?style=flat-square
[node-url]: https://nodejs.org
[npm-image]: https://img.shields.io/npm/v/express-auto-routes.svg?style=flat-square
[npm-url]: https://npmjs.org/package/express-auto-routes
[travis-image]: https://secure.travis-ci.org/kenberkeley/express-auto-routes.svg?branch=master
[travis-url]: https://travis-ci.org/kenberkeley/express-auto-routes
[dep-image]: http://david-dm.org/kenberkeley/express-auto-routes.svg?style=flat-square
[dep-url]:http://david-dm.org/kenberkeley/express-auto-routes
[cov-img]:https://coveralls.io/repos/kenberkeley/express-auto-routes/badge.svg?branch=master&service=github
[cov-url]:https://coveralls.io/github/kenberkeley/express-auto-routes?branch=master
