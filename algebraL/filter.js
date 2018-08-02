
const filter = (Matrix) => function(B, _map) {
    let test;
    if (_map === undefined || !B) return;

    if (!(B instanceof Matrix)) B = new Matrix(B);

    const map = new Matrix(_map);
    let i, k, j = 1,
        l = 1,
        array;
    array = [ ];
    for (i = 1; i <= B.row; i++) {
        array[j - 1] = [ ];
        for (k = 1; k <= B.getColumn(i); k++)
            if (B._(i, k) instanceof Matrix) B.array[i - 1][k - 1] = Matrix.filter(B._(i, k), map._(i, k));
            else {
                test = typeof map._(i, k) === 'function' ? map._(i, k).call(B, B
                    ._(i, k), i, k) : Boolean(map._(i, k));
                if (test) {
                    array[j - 1][l - 1] = B._(i, k);
                    l++;
                }
            }

        l = 1;
        if (array[j - 1].length) j++;
        else array.splice(j - 1, 1);
    }
    return new Matrix(array, B.row, B._column, B.opt);
};

module.exports = filter;
