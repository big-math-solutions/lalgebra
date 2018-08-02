const _det = require('./det'),
    _minor = require('./minor'),
    _trans = require('./trans');
const adj = (Matrix) => {
    const det = _det(Matrix),
        minor = _minor(Matrix),
        trans = _trans(Matrix);
    return (B) => {
        if (!B) return;
        if (!(B instanceof Matrix)) B = new Matrix(B);
        if (B.row === 0) return new Matrix([
            [ 1 ]
        ]);
        let ii = B.row,
            kk, array = [ ],
            i, k;
        for (i = 1; i <= ii; i++) {
            array[i - 1] = [ ];
            kk = B.getColumn(i);
            for (k = 1; k <= kk; k++)
                array[i - 1][k - 1] = Math.pow(-1, i + k) * det(minor(i, k, B));
        }
        return trans(new Matrix(array));
    };
};
module.exports = adj;
