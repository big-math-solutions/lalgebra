
const trans = (Matrix) => function trans(B, opt) {
    opt = opt || {
        column: 1
    };
    opt.column = opt.column || 1;
    if (!B)
        return;

    if (!(B instanceof Matrix))
        B = new Matrix(B);

    let ii = B.getColumn(opt.column),
        kk = B.row,
        array = [ ],
        i, k;
    for (i = 1; i <= ii; i++) {
        array[i - 1] = [ ];
        for (k = 1; k <= kk; k++)
            array[i - 1][k - 1] = B._(k, i);
    }
    return new Matrix(array);
};
module.exports = trans;
