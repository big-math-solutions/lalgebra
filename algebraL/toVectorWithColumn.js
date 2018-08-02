
const toVectorWithColumn = (Matrix, Vector) => function(A) {
    if (!(A instanceof Matrix))
        A = new Matrix(A);

    let array = [ ],
        _array;
    for (let i = 1; i <= A.row; i++) {
        _array = A._(i).array[0];
        array = array.concat(_array);
    }
    return new Vector(array);
};
module.exports = toVectorWithColumn;
