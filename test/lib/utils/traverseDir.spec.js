var expect = require('chai').expect,
  traverseDir = require('../../../lib/utils/traverseDir');

describe('test lib/utils/traverseDir.js', function() {
  it('traverse current directory', function() {
    var dirContent = traverseDir(__dirname);
    expect(dirContent).not.to.be.empty;
  });
});
