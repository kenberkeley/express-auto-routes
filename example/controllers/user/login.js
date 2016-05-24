exports.url = '/login'; // rewrite default /user/login => /login

exports.get = function () {
  res.send('GET /login');
};

// method case insensitive
exports.POST = {
  url: '/log', // rewrite /login => /log
  handler: function (req, res, next) {
    res.send('POST /log (instead of /login)');
  }
};

exports.post = function (req, res, next) {
  res.send('POST /login');
};

/*
  // app.use('/user', ...) can not handle this controller
  
  // This controller equals to
  app.get('/login', [handler]);
  app.post('/login', [handler]);

  app.post('/log', [handler]);

 */
