'use strict';
const _product = require('./productDirect');

const multi = (Matrix) => {
    const product = _product(Matrix)
    return function multi(array) {
    let l = array.length,
        A = array[0],
        B;
    if (!(A instanceof Matrix))
        A = new Matrix(A);

    for (let p = 1; p < l; p++) {
        B = array[p];
        if (!(B instanceof Matrix))
            B = new Matrix(B);

        A = product(A, B);
    }
    return A;
};
}
module.exports = multi;
