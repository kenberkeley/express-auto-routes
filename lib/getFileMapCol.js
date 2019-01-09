var traverseDir = require('./utils/traverseDir'),
  jsExtReg = /\.(ts|js)$/,
  indexReg = /index$/,
  endWithSlashReg = /[\/|\\]$/,
  fileMap = {};

/**
 * get a collection of file maps in the given dir
 * @param  {String} pathToCtrlDir
 * @return {Array} a sorted collection
 */
module.exports = function (pathToCtrlDir) {
  let fileMapCol = [];

  // clear the last slash
  if (endWithSlashReg.test(pathToCtrlDir)) {
    pathToCtrlDir = pathToCtrlDir.replace(endWithSlashReg, '');
  }

  // filter js files
  var files = traverseDir(pathToCtrlDir).filter(function(pathToFile) {
    return jsExtReg.test(pathToFile);
  });

  files.forEach(function(pathToFile) {
    // e.g. [rootPath]/controllers/user/login => /user/login
    var routeName = pathToFile.replace(pathToCtrlDir, '');

    routeName = routeName
      .replace(/\\/g, '/') // transfer to posix pattern
      .replace(jsExtReg, '')
      .replace(indexReg, ''); // default index as '/'
    
    // e.g. /user/login => /user/login/
    if (!endWithSlashReg.test(routeName)) {
      routeName += '/';
    }

    fileMap[routeName] = pathToFile;
    fileMapCol.push(fileMap);
    fileMap = {};
  });

  return fileMapCol;
};
