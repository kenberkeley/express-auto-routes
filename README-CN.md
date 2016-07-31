# Express 自动(挂载)路由
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Dependency Status][dep-image]][dep-url]
[![Coverage Status][cov-img]][cov-url]

大多数情况下，我们都需要手动将控制器挂载到挂载路由上。

***例子***

```javascript
/** 当前位置 routes/index.js **/
var homeRouter = require('./home/'),
  userCtrl = require('../controllers/user');

// 方式 1: 把子路由挂载到路径。有点代码分离的感觉但还是很复杂
app.use('/', homeRouter);

// 方式 2: 直接一个一个地挂载控制器，坑爹
app.get('/user', userCtrl.index);
app.post('/user/login', userCtrl.login);
app.get('/user/logout', userCtrl.logout);
...
```

****

这真的很难称得上是优雅。因此我们的  **express-auto-routes** 应运而生。  
首先，需要安装一下 **```npm install express-auto-routes --save```**  

***例子***

```javascript
/** 当前位置 app.js **/
var path = require('path'),
  express = require('express'),
  app = express();

var autoRoutes = require('express-auto-routes')(app); // 你再也不需要 `routes` 目录
autoRoutes(path.join(__dirname, './controllers')); // 自动路由中...搞定！

// ...其他配置

app.listen(8080);
```

```javascript
/** 当前位置 controllers/hello/world.js **/
exports.get = function (req, res, next) {
  res.send('hello world');
};
```

随后访问 `localhost:8080/hello/world`, 你会看到 `hello world`

****

这实际上就是遍历文件夹，基于相对路径提取、解析**有效的**控制器文件。  
既然是递归遍历文件夹，因此毫无疑问是支持无限子目录。

***例子***

```javascript
controllers/a/b/c/d/e/f/g.js => localhost:8080/a/b/c/d/e/f/g
```

****

在这里我推荐您浏览 `example/` 目录了解使用方法。

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

运行后，可使用 [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) 访问 `localhost:8080` 测试上面的接口。

****

> [ 一个更实际的例子 ] 请点击 [留言板API](https://github.com/kenberkeley/msg-board-api)


[npm-url]: https://npmjs.org/package/express-auto-routes
[downloads-image]: http://img.shields.io/npm/dm/express-auto-routes.svg
[npm-image]: http://img.shields.io/npm/v/express-auto-routes.svg
[travis-image]: https://secure.travis-ci.org/kenberkeley/express-auto-routes.svg?branch=master
[travis-url]: https://travis-ci.org/kenberkeley/express-auto-routes
[dep-image]: http://david-dm.org/kenberkeley/express-auto-routes.svg?style=flat-square
[dep-url]: http://david-dm.org/kenberkeley/express-auto-routes
[cov-img]: https://coveralls.io/repos/github/kenberkeley/express-auto-routes/badge.svg?branch=master
[cov-url]: https://coveralls.io/github/kenberkeley/express-auto-routes?branch=master

