var getFileMapCol = require('./lib/getFileMapCol'),
  MountToApp = require('./lib/mountToApp'),
  beginsWithSlash = require('./lib/utils/beginsWithSlash'),
  beginsWithColon = require('./lib/utils/beginsWithColon'),
  allowMethod = { use:1, all:1, get:1, post:1, put:1, patch:1, delete:1 };

module.exports = function (app) {
  var mountToApp = new MountToApp(app);

  return function (pathToCtrlDir) {
    // a sorted collection contains maps of url(mount path) => pathToFile
    // why it must be sorted? turn to the end of lib/mountToApp.js for more detail
    var ctrlCol = getFileMapCol(pathToCtrlDir);

    ctrlCol.forEach(function(fileMap) {
      var url = Object.keys(fileMap)[0],
        pathToCtrlFile = fileMap[url],
        ctrl = require(pathToCtrlFile); // load controller file dynamically

        // allow rewrite url(mount path) / :params(access by req.params) / middlewares
        // P.S. url takes precedence over :params, if provided then :params would be ignored
      var ctrlUrl = beginsWithSlash(ctrl.url),
        ctrlParams = beginsWithColon(ctrl.params),
        ctrlMiddlewares = ctrl.middlewares;

      for (var method in ctrl) {
        // make request method case insensitive
        var _method = method.toLowerCase();
        if (!allowMethod[_method]) continue;

        var config = [],
          mountPath = ctrlUrl || (url + (ctrlParams || '')),
          middlewares = ctrlMiddlewares,
          handler = ctrl[method];
        
        // override single method with object
        if (typeof handler === 'object') {
          if (!Object.keys(handler).length) {
            console.info('[Error]', method, mountPath, 'is an empty object');
            return;
          }

          if (handler.url) {
            mountPath = beginsWithSlash(handler.url);
          } else {
            switch (handler.params) {
              case undefined:
                // use default
                break;
              case '':
              case null:
              case false:
                mountPath = ctrlUrl || url;
                break;
              default:
                mountPath = (ctrlUrl || url) + beginsWithColon(handler.params);
                break;
            }
          }

          switch (handler.middlewares) {
            case undefined:
              // use default
              break;
            case '':
            case null:
            case false:
              middlewares = false;
              break;
            default:
              middlewares = handler.middlewares;
              break;
          }

          handler = handler.handler;
        }

        config.push(mountPath);
        middlewares && config.push(middlewares);
        handler && config.push(handler);

        if (config.length === 1) { // only mountPath is included
          console.info('[Error]', method, mountPath, 'is missing middlewares/handler');
          return;
        }

        mountToApp.mount(_method, config);
      }
    });

    mountToApp.runMount();
  };
};
