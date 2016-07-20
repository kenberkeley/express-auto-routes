var expect = require('chai').expect,
  beginsWithColon = require('../../../lib/utils/beginsWithColon');

describe('test lib/utils/beginsWithColon.js', function() {
  it('return itself if faulty', function() {
    expect(beginsWithColon()).to.be.undefined;
    expect(beginsWithColon(false)).to.be.false;
    expect(beginsWithColon(null)).to.be.null;
    expect(beginsWithColon('')).to.equal('');
  })

  it('always return string begins with a colon', function() {
    expect(beginsWithColon('hello')).to.equal(':hello');
    expect(beginsWithColon(':world')).to.equal(':world');
  })
});
