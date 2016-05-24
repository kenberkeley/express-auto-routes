exports.use = require('../../middlewares/userMiddleware');

exports.get = {
  params: ':uid?',
  handler: function (req, res, next) {
    res.send('GET /user');
  }
};

exports.put = function (req, res, nest) {
  res.send('PUT /user');
};

/*
  // This controller equals to
  app.use('/user', userMiddleware);
  app.get('/user/:uid?', [handler]);
  app.put('/user', [handler]);
 */
