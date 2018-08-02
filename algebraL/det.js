const _minor = require('./minor');

const __det = (Matrix) => (B) => {
    if (!B)return;

    if (!(B instanceof Matrix)) B = new Matrix(B);

    let _det;
    if (B.row >= 0) {
        if (B.row > 2) {
            let ii = B.getColumn(1),
                i, arrayminor = [ ];
            _det = 0;
            for (i = 1; i <= ii; i++) {
                arrayminor[i - 1] = Matrix.minor(1, i, B);
                _det = _det + Math.pow(-1, 1 + i) * Matrix.det(arrayminor[i - 1]) * B._(1, i);
            }
        } else if (B.row === 2)
            _det = B._(1, 1) * B._(2, 2) - B._(1, 2) * B._(2, 1);
        else if (B.row === 1)
            _det = B._(1, 1);

        return _det;
    }
};
module.exports = __det;
