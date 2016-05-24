var sortCollectionByKey = require('./utils/sortCollectionByKey');

function MountToApp(app) {
  this.app = app;
  this.useRoutes = [];
  this.allRoutes = [];
  this.ordinaryRoutes = [];
}

MountToApp.prototype.mount = function (method, config) {
  var mountMap = {}, // mountPath(url) => {Function} route launcher
    mountPath = config[0];

  mountMap[mountPath] = function () {
    this.app[method].apply(this.app, config);

    // logger
    if (this.app.get('env') === 'development') {
      console.info('[AutoMount]', method, mountPath);
    }
  }.bind(this);

  switch (method) {
    case 'use':
      this.useRoutes.push(mountMap);
      break;
    case 'all':
      this.allRoutes.push(mountMap);
      break;
    default:
      this.ordinaryRoutes.push(mountMap);
      break;
  }
};

MountToApp.prototype.runMount = function () {
  var runFn = function (map) { map[Object.keys(map)[0]](); };
  
  // before establish the mounted routes, we need to sort
  // 
  // e.g. [USE /user] and [USER /user/login]
  // obviously the former should trigger earlier
  // 
  // e.g. [GET /user/:uid] and [GET /user/logout]
  // if mount the former at first, the latter would never route
  sortCollectionByKey(this.useRoutes).forEach(runFn);
  sortCollectionByKey(this.allRoutes).forEach(runFn);
  sortCollectionByKey(this.ordinaryRoutes, 'DESC').forEach(runFn);
};

module.exports = MountToApp;
