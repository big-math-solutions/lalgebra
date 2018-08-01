'use strict';
let dkronecker = require('../utils/dkronecker'),
    product = require('./productDirect');

/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
function pow(A, n) {
    const Matrix = require('./Mat');
    if (!A) {
        return;
    }
    if (!(A instanceof Matrix)) {
        A = new Matrix(A);
    }
    if (typeof n === 'number' && Math.floor(n) === n) {
        let array = [ ],
            B;
        for (let i = 0; i < A.row; i++) {
            array[i] = [ ];
            for (let j = 0; j < A.getColumn(i + 1); j++) {
                array[i][j] = dkronecker(i, j);
            }
        }
        if (n === 0 || !n) {
            return new Matrix(array);
        } else if (n === 1) {
            return A;
        } else if (n === 2) {
            return product(A, A);
        }
        B = product(A, A);
        for (let i = 3; i <= n; i++) {
            B = product(B, A);
        }

        return B;
    }
}
module.exports = function(A, n, cb) {
    if (cb && typeof cb === 'function') {
        return new Promise((full, rej) => {
            try {
                full(cb.call(A, null, pow(A, n)));
            } catch (e) {
                rej(cb.call(A, e, null));
            }
        });
    }
    return pow(A, n);
};
