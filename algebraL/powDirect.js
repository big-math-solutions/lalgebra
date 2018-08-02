const Matrix = require('./Mat');
let dkronecker = require('../utils/dkronecker'),
    _product = require('./productDirect');

const pow = (Matrix) => {
    const product = _product(Matrix);
    return function pow(A, n) {
        if (!A)
            return;

        if (!(A instanceof Matrix))
            A = new Matrix(A);

        if (typeof n === 'number' && Math.floor(n) === n) {
            let array = [ ],
                B;
            for (let i = 0; i < A.row; i++) {
                array[i] = [ ];
                for (let j = 0; j < A.getColumn(i + 1); j++)
                    array[i][j] = dkronecker(i, j);
            }
            if (n === 0 || !n)
                return new Matrix(array);
            else if (n === 1)
                return A;
            else if (n === 2)
                return product(A, A);

            B = product(A, A);
            for (let i = 3; i <= n; i++)
                B = product(B, A);


            return B;
        }
    };
};
module.exports = pow;
