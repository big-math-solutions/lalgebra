
const apply = (Matrix) => function(A, B) {
    let a;
    if (!A || !B) return;

    if (!(A instanceof Matrix)) A = new Matrix(A);

    if (!(B instanceof Matrix)) B = new Matrix(B);

    let ii = A.row,
        array = [ ],
        i, k, kk;
    for (i = 1; i <= ii; i++) {
        array[i - 1] = [ ];
        kk = A.getColumn(i);
        for (k = 1; k <= kk; k++)
            array[i - 1][k - 1] = typeof A._(i, k) === 'function' ? A._(i,
                k).call({
                A,
                B
            }, B._(undefined, k)) : typeof A._(i, k) === 'object' ? apply(
                A._(i, k), B._(undefined, k)) : Matrix.multiply(A._(i, k), B._(
                undefined, k));
    }
    return new Matrix(array);
};

const addd = (Matrix) => function(array) {
    let l = array.length,
        A = array[0],
        B, p;
    for (p = 1; p < l; p++) {
        B = array[p];
        A = apply(Matrix)(A, B);
    }
    return A;
};
module.exports = addd;
