const dkronecker = require('../utils/dkronecker');

/** @function
 * Builder of Unit matrix.
 * @param {Number} the length of matrix.
 * @return {Object} matrix
 */
const ident = (Matrix) => function(n, m) {
    m = m || n;
    if (!n)
        return;

    const array = [ ];
    for (let i = 0; i < n; i++) {
        array[i] = [ ];
        for (let j = 0; j < m; j++)
            array[i][j] = dkronecker(i, j);
    }
    return new Matrix(array);
};
module.exports = ident;
