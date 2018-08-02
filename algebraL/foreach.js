
const foreach = (Matrix) => function(map, B) {
    if (!B || !map)
        return;

    if (!(B instanceof Matrix))
        B = new Matrix(B);

    if (typeof map === 'function') {
        let ii = B.row,
            kk, array = [ ],
            i, k;
        for (i = 1; i <= ii; i++) {
            kk = B.getColumn(i);
            for (k = 1; k <= kk; k++)
                map.call(B, B._(i, k), i, k);
        }
    }
    return this;
};
module.exports = foreach;
