var express = require('express'),
  path = require('path'),
  app = express();

// simple logger
app.use(require('./middlewares/logger'));

/** routes auto mounting **/
var autoRoutes = require('..')(app);
// good habit: using path.join/resolve for the sake of cross-platform
autoRoutes(path.join(__dirname, './controllers'));


// 404
app.use(function(req, res, next) {
  var err = new Error();
  err.status = 404;
  err.msg = 'Not found';
  next(err);
});

// err handler
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500);
  res.json(err);
});

// run node app.js and visit localhost:8080 in your browser
app.listen(8080);
