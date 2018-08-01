'use strict';
let det = require('./det'),
    product = require('./product'),
    inv = require('./inverse');

/** @function
 * Solve a system of linear equations written in matrix form as Ax=B.
 * Example :
 *    A =  [[4,8],      B = [3,1]   found x = [x_1 , x_2]
 *         [3,2]]
 * @param {Array} A  {Array} B
 * @return {Object} matrix
 */
function solve(M, R) {
    const Matrix = require('../algebraL/Mat');
    if (!M || !R) {
        return;
    }
    const A = new Matrix(M);
    if (A) {
        const dett = det(A);
        if (dett !== 0) {
            let length = R.length,
                _B = [ ];
            for (let i = 0; i < length; i++) {
                _B[i] = [ R[i] ];
            }
            const B = new Matrix(_B);
            const _R = product(inv(A), B);
            return _R.trans().array[0];
        }
    }
}
module.exports = function(M, R, cb) {
    if (cb && typeof cb === 'function') {
        return new Promise((full, rej) => {
            try {
                full(cb(null, solve(M, R)));
            } catch (e) {
                rej(cb(e, null));
            }
        });
    }
    return solve(M, R);
};
