var getFileMapCol = require('./lib/getFileMapCol');

module.exports = function (app) {
  return function (pathToCtrlDir) {

    var controllersCol = getFileMapCol(pathToCtrlDir),
      validRequestMethod = { all: 1, get: 1, post: 1, put: 1, patch: 1, delete: 1 };

    controllersCol.forEach(function(fileMap) {
      var url = Object.keys(fileMap)[0],
        ctrl = require(fileMap[url]); // load controller file dynamically

      for (var method in ctrl) {
        if (!ctrl.hasOwnProperty(method)) return;

        // make req verbs case insensitive
        var _method = method.toLowerCase();

        if(!validRequestMethod[_method]) continue;

        var config = [];
        config.push(ctrl.url || (url + (ctrl.params || ''))); // support url rewrite
        ctrl.middlewares && config.push(ctrl.middlewares); // support middlewares
        config.push(ctrl[method]); // handler
        
        app[_method].apply(app, config);
      }
    });

  };
};
