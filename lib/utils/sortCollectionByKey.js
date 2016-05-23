/**
 * get the first key's length of obj
 * 
 * e.g.
 * getKeyLen({ helloWorld: 1 })
 * > 10
 * 
 * @param  {Object} obj
 * @return {Number} the length of the 1st key
 */
function getKeyLen(obj) {
  return Object.keys(obj)[0].length;
}


/**
 * sort a collection by its elements' key(length)
 *
 * e.g.
 * sortCollectionByKey([ {abc: 1}, {ab: 1}, {abcd: 1}, {a: 1} ])
 * > [ {a: 1}, {ab: 1}, {abc: 1}, {abcd: 1} ]
 * 
 * @param  {Array}   col
 * @param  {Boolean} isDESC
 * @return {Array}   (a sorted col)
 */
function sortCollectionByKey(col, isDESC) {
  col.sort(function(a, b) {
    return getKeyLen(a) - getKeyLen(b);
  });

  if (isDESC) col.reverse();

  return col;
}

module.exports = sortCollectionByKey;
