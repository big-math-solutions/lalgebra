const det = require('./det'),
    minor = require('./minor'),
    trans = require('./trans');

/** @function
 * The adjunted matrix.
 * @param  {Object} matrix
 * @return {Object} matrix
 */
function adj(B) {
    if (!B) {
        return;
    }
    const Matrix = require('./Mat');
    if (!(B instanceof Matrix)) {
        B = new Matrix(B);
    }
    if (B.row > 1) {
        let ii = B.row,
            kk, array = [ ],
            i, k;
        for (i = 1; i <= ii; i++) {
            array[i - 1] = [ ];
            kk = B.getColumn(i);
            for (k = 1; k <= kk; k++) {
                array[i - 1][k - 1] = Math.pow(-1, i + k) * det(minor(i, k, B));
            }
        }
        return trans(new Matrix(array));
    }
    return new Matrix([
        [ 1 ]
    ]);
}
module.exports = adj;
