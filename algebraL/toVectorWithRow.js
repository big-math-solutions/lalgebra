

const toVectorWithRow = (Matrix, Vector) => function(A, opt) {
    opt = opt || {
        column: 1
    };
    opt.column = opt.column || 1;

    if (!(A instanceof Matrix))
        A = new Matrix(A);

    let array = [ ];
    const l = A.getColumn(opt.column);
    for (let i = 1; i <= l; i++)
        array = array.concat(A._(undefined, i).trans().array[0]);

    return new Vector(array);
};
module.exports = toVectorWithRow;
