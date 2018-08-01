'use strict';
const product = require('./product');

/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
function multi(array) {
    const Matrix = require('./Mat');
    let l = array.length,
        A = array[0],
        B;
    if (!(A instanceof Matrix)) {
        A = new Matrix(A);
    }
    for (let p = 1; p < l; p++) {
        B = array[p];
        if (!(B instanceof Matrix)) {
            B = new Matrix(B);
        }
        A = product(A, B);
    }
    return A;
}
module.exports = function(arg) {
    if (arg === undefined) {
        return;
    }
    if (arguments.length > 1) {
        arg = Array.prototype.slice.call(arguments);
    }
    const cb = arg[arg.length - 1];
    if (typeof cb === 'function') {
        arg.pop();
        return new Promise((full, rej) => {
            try {
                full(cb(null, multi(arg)));
            } catch (e) {
                rej(cb(e, null));
            }
        });
    } else if (cb === undefined) {
        arg.pop();
        return multi(arg);
    }
    return multi(arg);
};
