var expect = require('chai').expect,
  getFileMapCol = require('../../lib/getFileMapCol');

describe('test lib/getFileMapCol.js', function() {
  it('get file map of current directory recursively', function() {
    var fileMap = getFileMapCol(__dirname);
    expect(fileMap).not.to.be.empty;
  });
});
