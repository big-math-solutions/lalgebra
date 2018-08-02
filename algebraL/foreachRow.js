const foreach = (Matrix) => function(map, B) {
    if (!B || !map)
        return;

    if (!(B instanceof Matrix))
        B = new Matrix(B);

    if (typeof map === 'function') {
        let ii = B.row,
            i;
        for (i = 1; i <= ii; i++)
            map.call(B, B._(i), i);
    }
    return this;
};
module.exports = foreach;
