'use strict';

/** @function
 * Function iterating over elements of  matrix object with params the item and indexs.
 * @param {Function} map whose params are the item and matrix's indexs.
 */
const foreach = (Matrix) => function(map, B, opt) {
    opt = opt || {
        column: 1
    };
    opt.column = opt.column || 1;
    if (!B || !map)
        return;

    if (!(B instanceof Matrix))
        B = new Matrix(B);

    if (typeof map === 'function') {
        let ii = B.getColumn(opt.column),
            i;
        for (i = 1; i <= ii; i++)
            map.call(B, B._(undefined, i), i);
    }
    return this;
};
module.exports = foreach;
