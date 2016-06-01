'use strict';
let gauss = require('gauss-jordan-inverse')
  /** @function
   * The inverse matrix.
   * @param  {Object} matrix
   * @return {Object} matrix
   */
function inverse(B) {
  if (!B) {
    return;
  }
  let Matrix = require('./Mat');
  if (!(B instanceof Matrix)) {
    B = new Matrix(B)
  }
  return new Matrix(gauss(B.array))
}
module.exports = function(B, cb) {
  if (cb && typeof cb === 'function') {
    return new Promise(function(full, rej) {
      try {
        full(cb.call(B, null, inverse(B)))
      } catch (e) {
        rej(cb.call(B, e, null))
      }
    })
  } else {
    return inverse(B);
  }
};