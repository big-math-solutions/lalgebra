
const _filter = (Matrix) => (_B, _map) => {
    let test;
    if (_map === undefined || !_B)
        return;

    if (!(_B instanceof Matrix))
        _B = new Matrix(_B);

    const B = _B.trans();
    const map = new Matrix(_map);
    let i, k, array, kk;
    array = [ ];
    for (i = 1; i <= map.row; i++) {
        array[i - 1] = [ ];
        kk = B.getColumn(map._(i, 1));
        for (k = 1; k <= kk; k++)
            if (B._(i, k) instanceof Matrix)
                B.array[i - 1][k - 1] = Matrix.filterByPositionColumn(B._(i, k), map._(i, 1));
            else {
                test = typeof map._(i, 1) === 'function' ? map._(i, 1).call(B, B
                    ._(i, k), i) : map._(i, 1);
                array[i - 1][k - 1] = B._(test, k);
            }
    }
    return Matrix(array, map.row, B._column, B.opt).trans();
};

const addd = (Matrix) => function(array) {
    let l = array.length,
        A = array[0],
        B, p;
    for (p = 1; p < l; p++) {
        B = array[p];
        A = _filter(Matrix)(A, B);
    }
    return A;
};
module.exports = addd;
