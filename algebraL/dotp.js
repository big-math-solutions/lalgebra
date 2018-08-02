
const dot = (Vector) => function(A, B) {
    if (!A && !B) return;

    if (!(A instanceof Vector)) A = new Vector(A);

    if (!(B instanceof Vector)) B = new Vector(B);

    return A.matrix.trans().x(B.matrix).array[0][0];
};
module.exports = dot;
