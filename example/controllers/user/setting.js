var authentication = require('../../middlewares/authentication'),
  settingMiddleware = require('../../middlewares/settingMiddleware');

exports.middlewares = settingMiddleware;
exports.params = ':uid';

exports.all = {
  params: '', // set to [''|null|false] means overriding the above exports
  middlewares: false,
  handler: function (req, res, next) {
    console.info('Hi here is /user/setting');
    next();
  }
};

exports.get = function (req, res, next) {
  res.send('GET /user/setting');
};

exports.post = {
  url: '/setting',
  params: ':hello', // since url is provided, params would be ignored
  middlewares: [authentication, settingMiddleware],
  handler: function (req, res, next) {
    res.send('POST /user/setting');
  }
};

/*
  // This controller equals to
  app.all('/user/setting', [handler]);
  app.get('/user/setting/:uid', settingMiddleware, [handler]);
  app.post('/setting', [authentication, settingMiddleware], [handler]);
 */
