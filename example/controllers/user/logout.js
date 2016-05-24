exports.use = {
  middlewares: require('../../middlewares/authentication'),
  handler: function (req, res, next) {
    console.info('routes begin with /user/logout must pass auth to get here');
    next();
  }
};

exports.get = function (req, res, next) {
  res.send('GET /user/logout');
};

exports.delete = {
  params: ':uid',
  handler: function (req, res, next) {
    res.send('DELETE /user/logout/' + req.params.uid);
  }
};

/*
  // This controller equals to
  app.use('/user/logout', authentication, [handler]);
  app.get('/user/logout', [handler]);
  app.delete('/user/logout/:uid', [handler]);
*/
