const levicivita = require('../utils/levi_civita');

const crossp = (Vector) => function(A, B) {
    if (!A && !B) return;

    if (!(A instanceof Vector) && Array.isArray(A))
        A = new Vector(A);

    if (!(B instanceof Vector) && Array.isArray(B))
        B = new Vector(B);

    let i, j, k, array = [ ];
    for (i = 0; i < 3; i++) {
        array[i] = 0;
        for (j = 0; j < 3; j++)
            for (k = 0; k < 3; k++)
                array[i] = array[i] + A.array[j][0] * B.array[k][0] *
          levicivita[i][j][k];
    }
    return new Vector(array);
};

const addd = (Vector) => function(array) {
    let l = array.length,
        A = array[0],
        B, p;
    for (p = 1; p < l; p++) {
        B = array[p];
        A = crossp(Vector)(A, B);
    }
    return A;
};
module.exports = addd;
