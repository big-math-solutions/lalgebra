const mapp = (Matrix) => function(map, B) {
    if (!map || !B)
        return;

    if (!(B instanceof Matrix))
        B = new Matrix(B);

    if (typeof map === 'function') {
        let ii = B.row,
            kk, array = [ ],
            i, k;
        for (i = 1; i <= ii; i++) {
            array[i - 1] = [ ];
            kk = B.getColumn(i);
            for (k = 1; k <= kk; k++)
                array[i - 1][k - 1] = map.call(B, B._(i, k), i, k);
        }
        return new Matrix(array);
    }
};
module.exports = mapp;
