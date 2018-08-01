'use strict';
const gauss = require('gauss-jordan-inverse');

/** @function
   * The inverse matrix.
   * @param  {Object} matrix
   * @return {Object} matrix
   */
function inverse(B) {
    if (!B) {
        return;
    }
    const Matrix = require('./Mat');
    if (!(B instanceof Matrix)) {
        B = new Matrix(B);
    }
    return new Matrix(gauss(B.array));
}
module.exports = function(B, cb) {
    if (cb && typeof cb === 'function') {
        return new Promise((full, rej) => {
            try {
                full(cb.call(B, null, inverse(B)));
            } catch (e) {
                rej(cb.call(B, e, null));
            }
        });
    }
    return inverse(B);
};
