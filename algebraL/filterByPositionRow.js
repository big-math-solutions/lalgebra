const filter = (Matrix) => function(B, _map) {
    let test;
    if (_map === undefined || !B)
        return;

    if (!(B instanceof Matrix))
        B = new Matrix(B);

    const map = new Matrix(_map);
    let i, k, array, kk;
    array = [ ];
    for (i = 1; i <= map.row; i++) {
        array[i - 1] = [ ];
        kk = B.getColumn(map._(i, 1));
        for (k = 1; k <= kk; k++)
            if (B._(i, k) instanceof Matrix)
                B.array[i - 1][k - 1] = filter(B._(i, k), map._(i, 1));
            else {
                test = typeof map._(i, k) === 'function' ? map._(i, k).call(B, B
                    ._(i, k), i, k) : map._(i, k);
                array[i - 1][k - 1] = B._(test, k);
            }
    }
    return new Matrix(array, map.row, B._column, B.opt);
};

const addd = (Matrix) => function(array) {
    let l = array.length,
        A = array[0],
        B, p;
    for (p = 1; p < l; p++) {
        B = array[p];
        A = filter(Matrix)(A, B);
    }
    return A;
};
module.exports = addd;
