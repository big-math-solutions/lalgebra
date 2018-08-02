
const diagonal = (Matrix) => function(B) {
    if (!B)
        return;

    if (!(B instanceof Matrix))
        B = new Matrix(B);

    let ii = B.row > B.getColumn(1) ? B.getColumn(1) : B.row,
        array = [ ],
        i;
    for (i = 1; i <= ii; i++)
        array[i - 1] = [ B._(i, i) ];

    return new Matrix(array);
};
module.exports = diagonal;
