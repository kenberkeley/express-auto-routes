var expect = require('chai').expect,
  sortCollectionByKey = require('../../../lib/utils/sortCollectionByKey');

describe('test lib/utils/sortCollectionByKey.js', function() {
  it('sort a collection', function() {
    var sample1 = [{abc: 1}, {ab: 1}, {abcd: 1}, {a: 1}];
    expect(sortCollectionByKey(sample1))
      .to.deep.equal([{a: 1}, {ab: 1}, {abc: 1}, {abcd: 1}]);
  });

  it('sort a collection DESC', function() {
    var sample2 = [{abc: 1}, {ab: 1}, {abcd: 1}, {a: 1}];
    expect(sortCollectionByKey(sample2, 'DESC'))
      .to.deep.equal([{abcd: 1}, {abc: 1}, {ab: 1}, {a: 1}]);
  });
});
