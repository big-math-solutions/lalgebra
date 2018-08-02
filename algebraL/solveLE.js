'use strict';
const _det = require('./det'),
    _product = require('./product'),
    _inv = require('./inverse');


const solve = (Matrix) => {
    let det = _det(Matrix),
        product = _product(Matrix),
        inv = _inv(Matrix);
    return function solve(M, R) {
        if (!M || !R) return;

        const A = new Matrix(M);
        if (!A) return;
        const dett = det(A);
        if (dett !== 0) {
            let length = R.length,
                _B = [ ];
            for (let i = 0; i < length; i++)
                _B[i] = [ R[i] ];

            const B = new Matrix(_B);
            const _R = product(inv(A), B);
            return _R.trans().array[0];
        }
    };
};
module.exports = solve;
