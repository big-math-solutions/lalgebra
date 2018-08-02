const gauss = require('gauss-jordan-inverse');
const inverse = (Matrix) => function(B) {
    if (!B)
        return;

    if (!(B instanceof Matrix))
        B = new Matrix(B);

    return new Matrix(gauss(B.array));
};
module.exports = inverse;
