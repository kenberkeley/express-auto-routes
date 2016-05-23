var fs = require('fs'),
  path = require('path');

/**
 * detect the path to target whether is a directory
 * @param  {String}  pathToTarget
 * @return {Boolean}
 */
function isDir(pathToTarget) {
  return fs.statSync(pathToTarget).isDirectory();
}

/**
 * get all the valid files/folders of current dir
 * @param  {String} pathToDir
 * @return {Array}
 */
var hiddenReg = /^[\.|_]/; // exclude hidden/private files/folders

function getContentOfDir(pathToDir) {
  return fs.readdirSync(pathToDir).filter(function(fileName) {
    return !hiddenReg.test(fileName);
  });
}

/**
 * glob files recursively
 * @param  {String} baseDir
 * @return {Array}
 */
var files = [];

function traverseDir(baseDir) {

  var contents = getContentOfDir(baseDir);

  if (!contents.length) return;

  contents.forEach(function(item) {
    var pathToTarget = path.join(baseDir, item);

    isDir(pathToTarget) ?
      traverseDir(pathToTarget):
      files.push(pathToTarget);
  });

  return files;
}

module.exports = traverseDir;
