const clone = require('../utils/clone');

const _join = (Matrix) => function(A, B, p, t) {
    if (!A || !B) return;
    if (!(A instanceof Matrix)) A = new Matrix(A);

    if (!(B instanceof Matrix)) B = new Matrix(B);
    let ii = B.row,
        array = clone(A.array),
        i, k, kk;
    for (i = 1; i <= ii; i++) {
        array[i + p - 2] = array[i + p - 2] || [ ];
        kk = B.getColumn(i);
        for (k = 1; k <= kk; k++)
            array[i + p - 2][k + t - 2] = B._(i, k);
    }
    return new Matrix(array);
};

module.exports = _join
