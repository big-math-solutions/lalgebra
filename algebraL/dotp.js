'use strict';

/** @function
 * Dot Product beetwen vectors.
 * @param {Object} vector {Object} vector.
 * @return {Number} dot product
 */
function dot(A, B) {
    if (!A && !B) {
        return;
    }
    const Vector = require('./vector');
    if (!(A instanceof Vector)) {
        A = new Vector(A);
    }
    if (!(B instanceof Vector)) {
        B = new Vector(B);
    }
    return A.matrix.trans().x(B.matrix).array[0][0];
}
module.exports = function(A, B, cb) {
    if (cb && typeof cb === 'function') {
        return new Promise((full, rej) => {
            try {
                full(cb.call({
                    A,
                    B
                }, null, dot(A, B)));
            } catch (e) {
                rej(cb.call({
                    A,
                    B
                }, e, null));
            }
        });
    }
    return dot(A, B);
};
