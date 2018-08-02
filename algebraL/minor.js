const _ = {};
_.clone = require('../utils/clone');
const Matrix = require('./Mat');


const minor = (Matrix) => function minor(m, n, B) {
    if (!(B instanceof Matrix))
        B = Matrix(B);

    if (!m || !m || !B)
        return;

    if (typeof m === 'number' && typeof n === 'number' && m > 0 && n > 0) {
        let ii = B.row,
            array, i;
        array = _.clone(B.array, true);
        for (i = 1; i <= ii; i++)
            array[i - 1].splice(n - 1, 1);

        array.splice(m - 1, 1);
        return new Matrix(array);
    }
};
module.exports = minor;
