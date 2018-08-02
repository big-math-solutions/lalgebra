
const concat = (Matrix) => function(A, B) {
    if (!B || !A) return;

    if (!(B instanceof Matrix)) B = new Matrix(B);

    if (!(A instanceof Matrix)) A = new Matrix(A);

    let ii = B.row,
        array = [ ],
        i;
    for (i = 1; i <= ii; i++)
        array[i - 1] = A.array[i - 1].concat(B.array[i - 1]);

    return new Matrix(array);
};

const addd = (Matrix) => function(array) {
    let l = array.length,
        A = array[0],
        B, p;
    for (p = 1; p < l; p++) {
        B = array[p];
        A = concat(Matrix)(A, B);
    }
    return A;
};
module.exports = addd;
