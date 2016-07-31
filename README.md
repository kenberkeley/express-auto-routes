# Express Auto Routes
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Dependency Status][dep-image]][dep-url]
[![Coverage Status][cov-img]][cov-url]

> 中文介绍请点击 [这里](./README-CN.md)

In most of the time, we need to mount handlers / controllers to routes manually.  

***e.g.***

```javascript
/** now we are in routes/index.js **/
var homeRouter = require('./home/'),
  userCtrl = require('../controllers/user');

// Method 1: mount a sub router to a path. kinda code splitting but still complicated
app.use('/', homeRouter);

// Method 2: mount controllers to routes one by one, sucks
app.get('/user', userCtrl.index);
app.post('/user/login', userCtrl.login);
app.get('/user/logout', userCtrl.logout);
...
```

****

It's hardly elegant, so here comes **express-auto-routes**.  
Firstly, **```npm install express-auto-routes --save```**  

***e.g.***

```javascript
/** now we are in app.js **/
var path = require('path'),
  express = require('express'),
  app = express();

var autoRoutes = require('express-auto-routes')(app); // you don't need `routes` folder any more
autoRoutes(path.join(__dirname, './controllers')); // auto mounting... done!

// ...other configures

app.listen(8080);
```

```javascript
/** now we are in controllers/hello/world.js **/
exports.get = function (req, res, next) {
  res.send('hello world');
};
```

Then visit `localhost:8080/hello/world`, you will see `hello world`

****

The magic is just globbing all the **valid** controller files and resolve them based on relative path.  
Since we glob files recursively, without doubt it supports **unlimited** sub folders.

***e.g.***
```javascript
controllers/a/b/c/d/e/f/g.js => localhost:8080/a/b/c/d/e/f/g
```


----------
Here I highly recommend you checking out the `example/` folder for more detail.

```
> npm install
> npm run example

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

then visit `localhost:8080` and test the above APIs with [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)

****
> [ A more practical project ] checkout [Message Board API](https://github.com/kenberkeley/msg-board-api) which based on this package.

[npm-url]: https://npmjs.org/package/express-auto-routes
[downloads-image]: http://img.shields.io/npm/dm/express-auto-routes.svg
[npm-image]: http://img.shields.io/npm/v/express-auto-routes.svg
[travis-image]: https://secure.travis-ci.org/kenberkeley/express-auto-routes.svg?branch=master
[travis-url]: https://travis-ci.org/kenberkeley/express-auto-routes
[dep-image]: http://david-dm.org/kenberkeley/express-auto-routes.svg?style=flat-square
[dep-url]: http://david-dm.org/kenberkeley/express-auto-routes
[cov-img]: https://coveralls.io/repos/github/kenberkeley/express-auto-routes/badge.svg?branch=master
[cov-url]: https://coveralls.io/github/kenberkeley/express-auto-routes?branch=master
