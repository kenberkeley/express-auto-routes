var expect = require('chai').expect,
  beginsWithSlash = require('../../../lib/utils/beginsWithSlash');

describe('test lib/utils/beginsWithSlash.js', function() {
  it('return itself if faulty', function() {
    expect(beginsWithSlash()).to.be.undefined;
    expect(beginsWithSlash(false)).to.be.false;
    expect(beginsWithSlash(null)).to.be.null;
    expect(beginsWithSlash('')).to.equal('');
  })

  it('always return string begins with a slash', function() {
    expect(beginsWithSlash('hello')).to.equal('/hello');
    expect(beginsWithSlash('/world')).to.equal('/world');
  })
});
