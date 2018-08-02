const product = (Matrix) => {
    const _product = function(A, B) {
    let test = false;
    if (!A || !B)
        return;

    if (!(A instanceof Matrix))
        A = new Matrix(A);

    if (!(B instanceof Matrix))
        B = new Matrix(B);

    let ii = A.row + 1,
        jj, kk, array = [ ];
    let i, j, k;
    for (i = 1; i < ii; i++) {
        array[i - 1] = [ ];
        kk = B.getColumn(i) + 1;
        for (k = 1; k < kk; k++) {
            array[i - 1][k - 1] = 0;
            jj = A.getColumn(i) + 1;
            test = false;
            for (j = 1; j < jj; j++) {
                test = test || typeof A._(i, j) === 'object' || typeof B._(j, k) === 'object';
                if (test) array[i - 1][k - 1] = _product(A._(i, j), B._(j, k));
                else array[i - 1][k - 1] += A._(i, j) * B._(j, k);
            }
        }
    }
    return new Matrix(array);
};
return _product
}
module.exports = product;
