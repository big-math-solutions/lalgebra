'use strict';
let assert = require('assert'),
    sinon = require('sinon'),
    JNsolve = require('../index'),
    array1 = [
        [ 1, 4 ],
        [ 1, 3 ]
    ],
    A = new JNsolve.matrix(array1),
    vector1 = new JNsolve.vector([ 3, 2, 1 ]),
    vector2 = new JNsolve.vector([ 0, -1, 1 ]),
    mat = [];
Number.prototype.truncate = function(n) {
    return Math.floor(this * Math.pow(10, n)) / Math.pow(10, n);
};
mat = require('./mat_test');
const mattest = new JNsolve.matrix(mat);

describe('Linear Algebra', () => {
    it(
        'The adjunted matrix should be a matrix with (2,1) component equal to -1',
        () => {
            assert.equal(JNsolve.matrix.adj(A)._(2, 1), -1); // should returns true
        });
    it('The matrix method ones generates a matrix with only ones', () => {
        assert.equal(JNsolve.matrix.ones(6, 8)._(6, 8), 1); // should returns true
    });
    it('The matrix method zeros generates a matrix with only zeros',
        () => {
            assert.equal(JNsolve.matrix.zeros(15, 18)._(3, 11), 0); // should returns true
        });
    it('The product direct of A with itself has 1,2 component equal 1 ',
        () => {
            assert.equal(A._x(A)._(1, 2), 16); // should returns true
        });
    it(
        'The sum a matrix with itself and multiply for two is the same result ',
        () => {
            assert.equal(A._x(2)._(1, 2), A.plus(A)._(1, 2)); // should returns true
            assert.equal(A._x(3)._(2, 2), A.plus(A, A)._(2, 2)); // should returns true
            assert.equal(A._x(5)._(1, 2), A.plus(A, A, A, A)._(1, 2)); // should returns true
            assert.equal(A.scalar(2)._(1, 2), A.plus(A)._(1, 2)); // should returns true
            assert.equal(A.scalar(3)._(1, 2), A.plus(A, A)._(1, 2)); // should returns true
            assert.equal(A.scalar(4)._(2, 1), A.plus(A, A, A)._(2, 1)); // should returns true
        });
    it(
        'The product a matrix with itself and power for two is the same result ',
        () => {
            assert.equal(A.x(A)._(1, 2), A.pow(2)._(1, 2)); // should returns true
            assert.equal(A.x(A, A)._(2, 2), A.pow(3)._(2, 2)); // should returns true
            assert.equal(A.x(A, A, A, A)._(1, 2), A.pow(5)._(1, 2)); // should returns true
            assert.equal(A._x(A)._(1, 2), A._pow(2)._(1, 2)); // should returns true
            assert.equal(A._x(A, A)._(2, 2), A._pow(3)._(2, 2)); // should returns true
            assert.equal(A._x(A, A, A, A)._(1, 2), A._pow(5)._(1, 2)); // should returns true
        });
    it(
        'Build a matrix of matrix and the subindex methods return the deep matrix elements',
        () => {
            const AA = JNsolve.matrix([
                [ A, A.scalar(2.5) ],
                [ A.x(A), A.pow(2) ]
            ]);
            assert.equal(AA._(1, 1, 1, 1), A._(1, 1));
            assert.equal(AA._(1, 2, 1, 2), A.scalar(2.5)._(1, 2));
            assert.equal(AA._(2, 1, 2, 1), A.x(A)._(2, 1));
            assert.equal(AA._(2, 2, 2, 2), A.pow(2)._(2, 2));
        });
    it(
        'The apply method with matrix [[cos,sin],[tan,sqrt]] return a matrix with the correct array',
        () => {
            const matFunc = JNsolve.matrix([
                [ Math.cos, Math.sin ],
                [ Math.tan, Math.sqrt ]
            ]);
            const matApply = matFunc.apply(A);
            assert.equal(matApply._(1, 1), Math.cos(A._(1, 1))); // should returns true
            assert.equal(matApply._(1, 2), Math.sin(A._(1, 2))); // should returns true
            assert.equal(matApply._(2, 1), Math.tan(A._(2, 1))); // should returns true
            assert.equal(matApply._(2, 2), Math.sqrt(A._(2, 2))); // should returns true
        });
    it('The join methos return the correct result', () => {
        const _B = JNsolve.matrix([
            [ 0, 0 ],
            [ 0, -1 ]
        ]).join([
            [ 1, 0 ],
            [ 3, 2 ]
        ], 3, 3);
        assert.equal(_B._(4, 4), 2); // should returns true
    });
    it('The applyByColumn method return a matrix with the correct array',
        () => {
            const matFunc = JNsolve.matrix([
                [ function(column) {
                    return column.array;
                },
                function(column) {
                    return column.array;
                }
                ]
            ]);
            const matApply = matFunc.applyByColumn(A);
            assert.equal(matApply._(1, 1)[0][0], 1); // should returns true
            assert.equal(matApply._(1, 2)[0][0], 4); // should returns true
        });
    it('The applyByRow method  return a matrix with the correct array',
        () => {
            const matFunc = JNsolve.matrix([
                [ function(row) {
                    return row.array;
                } ],
                [ function(row) {
                    return row.array;
                } ]
            ]);
            const matApply = matFunc.applyByRow(A);
            assert.equal(matApply._(1, 1)[0][0], 1); // should returns true
            assert.equal(matApply._(2, 1)[0][1], 3); // should returns true
        });
    it('The pow direct of A to seven power has 2,2 component equal 0 ',
        () => {
            assert.equal(A._pow(7)._(2, 2), Math.pow(3, 7)); // should returns true
        });
    it('The toVectorWithColumn return  a vector [1,4,1,3]', () => {
        assert.equal(A.toVectorWithColumn().dim, 4);
        // should returns true
        assert.equal(A.toVectorWithColumn().matrix._(4, 1), 3); // should returns true
    });
    it('The toVectorWithRow return  a vector [1,1,4,3]', () => {
        assert.equal(A.toVectorWithRow().matrix._(1, 1), 1);
        // should returns true
        assert.equal(A.toVectorWithRow().matrix._(3, 1), 4); // should returns true
    });
    it(
        'The cuadratic power of  matrix should be a matrix with (2,2) component equal to 13 ',
        () => {
            assert.equal(A.pow(2)._(2, 2), 13); // should returns true
        });
    it(
        ' Calculate the product of mattest matrix, a array of 10000x10000 and confirm that is a array of 10000x10000',
        () => {
            assert.equal(mattest.x(mattest).array.length, 11); // should returns true
        });
    it(
        'The multiply of  matrix with itself should be a matrix with (1,2) component equal to 16 ',
        () => {
            const res = JNsolve.matrix.multiply(A, A);
            assert.equal(res._(1, 2), 16); // should returns true
        });
    it(
        'The multiply of  matrix with a scalar 3 should be a matrix with (2,1) component equal to 3',
        () => {
            assert.equal(JNsolve.matrix.pscalar(3, A)._(2, 1), 3); // should returns true
        });
    it(
        'The sum of  matrix with itself should be a matrix with (2,2) component equal to 6',
        () => {
            assert.equal(JNsolve.matrix.sum(A, A)._(2, 2), 6);
        });
    it(
        'The transposed of  matrix  should be a matrix with (1,2) component equal to 1',
        () => {
            assert.equal(JNsolve.matrix.trans(A)._(1, 2), 1);
        });
    it(
        'The inverse of a matrix should be a matrix with (1,1) component equal to -3',
        () => {
            assert.equal(JNsolve.matrix.inv(A)._(1, 1), -3);
        });
    it(
        'The product of inverse of a matrix with itself should be a matrix with (1,1) component equal to 1 ever',
        () => {
            assert.equal(JNsolve.matrix.multiply(JNsolve.matrix.inv(A),
                A)._(1, 1), 1);
        });
    it('The dot product vector_1 =[3,2,1] with vector_2 =[0,-1,1] is -1 ',
        () => {
            assert.equal(vector1.dot(vector2), -1);
        });
    it(
        'The cross product vector_1 =[3,2,1] with vector_2 =[0,-1,1] is [3,-3,-3] ',
        () => {
            assert.equal(vector1.cross(vector2).array[2][0], -3);
        });
    it('The scalar product vector_1 =[3,2,1] with scalar 0 is [0,0,0] ',
        () => {
            assert.equal(vector1.pscalar(0).array[1][0], 0);
        });
    it('The sum of vector_1 =[3,2,1] and  vector_2 =[0,-1,1] is [3,1,2] ',
        () => {
            assert.equal(vector1.sum(vector2).array[0][0], 3);
        });
    const C = JNsolve.matrix([
        [ 2, 0 ],
        [ 8, 9 ]
    ]);
    it('The rightconcat of matrix  has 4 column', () => {
        assert.equal(A.concatRight(C).column[0], 4);
        assert.equal(A.concatRight(C)._(2, 4), 9);
        assert.equal(A.concatRight(C)._(1, 1), 1);
        assert.equal(A.concatRight(C, A)._(2, 6), 3);
        assert.equal(A.concatRight(C, A)._column[0], 6);
        assert.equal(A.concatRight(C, A, C)._column[0], 8);
    });
    it('The Leftconcat of matrix  has 4 column', () => {
        assert.equal(A.concatLeft(C)._(2, 1), 8);
        assert.equal(A.concatLeft(C, C, A, A)._column[0], 10);
    });
    it('The Upconcat of matrix  has 4 column', () => {
        assert.equal(A.concatUp(C)._(1, 2), 0);
        assert.equal(A.concatUp(C, C, A, A).row, 10);
    });
    it('The downconcat of matrix  has 4 column', () => {
        assert.equal(A.concatDown(C, C)._(5, 1), 2);
        assert.equal(A.concatDown(C, C, C, C, C).row, 12);
    });
    it('The solution of system 2x+2y = 1  2x+y = 4  is y = -3 and x = 3.5',
        () => {
            const sol = JNsolve.solveLE([
                [ 2, 2 ],
                [ 2, 1 ]
            ], [ 1, 4 ]);
            assert.equal(sol[0], 3.5);
            assert.equal(sol[1], -3);
        });
});
