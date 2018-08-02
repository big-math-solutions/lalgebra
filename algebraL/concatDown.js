
const concat = (Matrix) => function(A, B) {
    if (!B || !A) return;

    if (!(B instanceof Matrix)) B = new Matrix(B);

    if (!(A instanceof Matrix)) A = new Matrix(A);

    const array = A.array.concat(B.array);
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
