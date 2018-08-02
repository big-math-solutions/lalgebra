const sum = (Matrix) => function(A, B) {
    let test = false;
    if (!A || !B)
        return;

    if (!(B instanceof Matrix))
        B = new Matrix(B);

    if (!(A instanceof Matrix))
        A = new Matrix(A);

    let ii = A.row,
        array = [ ],
        i, k, kk;
    for (i = 1; i <= ii; i++) {
        array[i - 1] = [ ];
        kk = B.getColumn(i);
        for (k = 1; k <= kk; k++) {
            test = test || typeof A._(i, k) === 'object' || typeof B._(i, k) === 'object';
            if (test)
                array[i - 1][k - 1] = sum(A._(i, k), B._(i, k));
            else
                array[i - 1][k - 1] = A._(i, k) + B._(i, k);
        }
    }
    return new Matrix(array);
};

const addd = (Matrix) => function(...array) {
    let l = array.length,
        A = array[0],
        B, p;
    for (p = 1; p < l; p++) {
        B = array[p];
        A = sum(Matrix)(A, B);
    }
    return A;
};
module.exports = addd;
