'use strict';
const _ = {};
_.clone = require('../utils/clone');
let slice = Array.prototype.slice,
    x = require('./multi'),
    plus = require('./sum'),
    join = require('./join'),
    scalar = require('./pscalar'),
    pow = require('./pow'),
    adj = require('./adj'),
    det = require('./det'),
    filter = require('./filter'),
    filterByPositionRow = require('./filterByPositionRow'),
    filterByPositionColumn = require('./filterByPositionColumn'),
    inv = require('./inverse'),
    minor = require('./minor'),
    trans = require('./trans'),
    matrix_nxm = require('./matrix_nxm'),
    map = require('./map'),
    truncate = require('../utils/truncate'),
    forEach = require('./foreach'),
    forEachColumn = require('./foreachColumn'),
    forEachRow = require('./foreachRow'),
    identM = require('./identM'),
    zeros = require('./zeros'),
    ones = require('./ones'),
    _x = require('./multiDirect'),
    _pow = require('./powDirect'),
    diagonal = require('./diagonal'),
    concatDown = require('./concatDown'),
    concatLeft = require('./concatLeft'),
    concatRight = require('./concatRight'),
    concatUp = require('./concatUp'),
    apply = require('./apply'),
    applyLeft = require('./applyLeft'),
    applyByRow = require('./applyByRow'),
    applyByColumn = require('./applyByColumn'),
    Vector = require('./vector'),
    toArray = require('./toArray'),
    toObject = require('./toObject'),
    toVectorWithRow = require('./toVectorWithRow'),
    toVectorWithColumn = require('./toVectorWithColumn');
require('../utils/objectEquals')();
require('../utils/arraySimilarly')();

function countColumn(array) {
    const res = [ ];
    for (let i = 0; i < array.length; i++) {
        res.push(array[i].length);
    }
    return res;
}

/** @constructor
 * Constructor of a matrix.
 * @param {Array} array to build the matrix, {Number} matrix's row , {Array} matrix's column
 */
function _validate(array, row, column, opt) {
    if (typeof row === 'object') {
        opt = row;
        row = undefined;
        column = undefined;
    } else if (typeof array === 'number' && !opt && row && (column ? typeof column ===
      'object' : true)) {
        const pivot = row;
        row = array;
        array = [
            [ ]
        ];
        opt = _.clone(column, true);
        column = _.clone(pivot, true);
    }
    opt = opt || {
        deep: true
    };
    return {
        opt,
        row,
        column,
        array
    };
}

function toReturnElement(i, j) {
    return this.array[(i - 1) % this.row % this._row]
        [(j - 1) % this.getColumn(i) % this.array[(i - 1) % this.array.length]
            .length
        ];
}
var matrix = function(array, row, column, opt) {
    const validate = _validate(array, row, column, opt);
    opt = validate.opt;
    array = validate.array;
    row = validate.row;
    column = validate.column;
    opt = opt || {
        deep: true,
        force: true
    };
    opt.deep = opt.deep !== undefined ? opt.deep : true;
    opt.force = opt.force !== undefined ? opt.force : true;
    if (array instanceof Vector) {
        return array.matrix;
    } else if (array instanceof matrix) {
        return array;
    } else if (!(this instanceof matrix)) {
        return new matrix(array, row, column, opt);
    }
    array = typeof array === 'object' && !Array.isArray(array) && opt.force ?
        toArray(array, opt) : array;
    array = Array.isArray(array) ? array : [
        [ array ]
    ];
    for (let i = 0; i < array.length; i++) {
        array[i] = Array.isArray(array[i]) ? array[i] : [ array[i] ];
    }
    const test = Boolean(array.length);
    if (test) {
    // get elements of matrix
        this._ = function(i, j) {
            if (arguments.length < 3) {
                if (i !== undefined && j !== undefined) {
                    const _i = (i - 1) % this.row % this._row;
                    const _j = (j - 1) % this.getColumn(i) % this._array[_i].length;
                    return this._array[_i][_j];
                } else if (i !== undefined && j === undefined) {
                    return matrix([ this.array[(i - 1) % this._row] ], this.opt);
                } else if (i === undefined && j !== undefined) {
                    return this.trans()._(j).trans();
                }
            } else {
                const _i = (i - 1) % this.row % this._row;
                const _j = _i !== undefined ? (j - 1) % this.getColumn(i) %
          this._array[_i].length : j - 1;
                const toReturn = this._array[_i][_j];
                return toReturn._ ? toReturn._(...slice.call(
                    arguments, 2)) : toReturn;
            }
        } .bind(this);
        // get column of matrix
        this.getColumn = function(i) {
            return this._column[(i - 1) % this._column.length];
        } .bind(this);
        // Define de array property
        Object.defineProperty(this, 'array', {
            get() {
                return this._array;
            },
            set(array) {
                array = Array.isArray(array) ? array : [
                    [ array ]
                ];
                for (let i = 0; i < array.length; i++) {
                    array[i] = Array.isArray(array[i]) ? array[i] : [
                        array[i]
                    ];
                }
                this._row = array.length;
                this._array = array;
            }
        });
        this.opt = opt;
        this._array = array;
        this._row = array.length;
        this.row = row || array.length;
        this.column = column || countColumn(this.array);
        this._column = Array.isArray(this.column) ? this.column : [
            this.column
        ];
        // Adjunt of  matrix
        this.adj = function() {
            return adj(this);
        } .bind(this);
        // Diagonal of matrix
        this.diagonal = function(cb) {
            return diagonal(this, cb);
        } .bind(this);
        // Inverse of matrix
        this.inv = function(cb) {
            return inv(this, cb);
        } .bind(this);
        // The comparation function
        this.isEqual = function(A) {
            return this.array.equals(A.array);
        } .bind(this);
        // similarly function to matrix, the elements compared
        // by rows
        this.isSimilarlyByRow = function(A) {
            return this.array.similarly(A.array);
        } .bind(this);
        // similarly function to matrix, the elements compared
        // by columns
        this.isSimilarlyByColumn = function(A) {
            return this.trans().array.similarly(A.array);
        } .bind(this);
        // Determinant of matrix
        this.det = function(cb) {
            return det(this, cb);
        } .bind(this);
        // The join method of matrix
        this.join = function(A, i, j, cb) {
            return join(this, A, i, j, cb);
        } .bind(this);
        // transpose of matrix
        this.trans = function(cb, opt) {
            return trans(this, cb, opt);
        } .bind(this);
        // Transform a matrix to a object
        this.toObject = function() {
            return toObject(this.array);
        } .bind(this);
        // concatRight of matrix
        this.concatRight = function() {
            const arg = slice.call(arguments);
            arg.unshift(this);
            return concatRight(arg);
        } .bind(this);
        // concatLeft of matrix
        this.concatLeft = function() {
            const arg = slice.call(arguments);
            arg.unshift(this);
            return concatLeft(arg);
        } .bind(this);
        // concatDown of matrix
        this.concatDown = function() {
            const arg = slice.call(arguments);
            arg.unshift(this);
            return concatDown(arg);
        } .bind(this);
        // concatUp of matrix
        this.concatUp = function() {
            const arg = slice.call(arguments);
            arg.unshift(this);
            return concatUp(arg);
        } .bind(this);
        // multiply of matrix
        this.x = function(A, cb) {
            if (typeof A === 'number') {
                return this.scalar(A, cb);
            }
            const arg = slice.call(arguments);
            arg.unshift(this);
            return x(arg);
        } .bind(this);
        // Direct multiply of matrix
        this._x = function() {
            const arg = slice.call(arguments);
            arg.unshift(this);
            return _x(arg);
        } .bind(this);
        // sum of matrix
        this.plus = function() {
            const arg = slice.call(arguments);
            arg.unshift(this);
            return plus(arg);
        } .bind(this);
        // Scalar product of matrix
        this.scalar = function(alpha, cb) {
            return scalar(alpha, this, cb);
        } .bind(this);
        // Power a matrix
        this.pow = function(n, cb) {
            return pow(this, n, cb);
        } .bind(this);
        // apply a matrix over other matrix
        this.apply = function() {
            const arg = slice.call(arguments);
            arg.unshift(this);
            return apply.call(this, arg);
        } .bind(this);
        // applyLeft a matrix over other matrix
        this.applyLeft = function() {
            const arg = slice.call(arguments);
            arg.unshift(this);
            return applyLeft.call(this, arg);
        } .bind(this);
        // apply by row
        this.applyByRow = function() {
            const arg = slice.call(arguments);
            arg.unshift(this);
            return applyByRow.call(this, arg);
        } .bind(this);
        // apply by column
        this.applyByColumn = function() {
            const arg = slice.call(arguments);
            arg.unshift(this);
            return applyByColumn.call(this, arg);
        } .bind(this);
        // the power direct  product
        this._pow = function(n, cb) {
            return _pow(this, n, cb);
        } .bind(this);
        // calculate the minor of a matrix
        this.minor = function(i, j, cb) {
            return minor(i, j, this, cb);
        } .bind(this);
        // applicate the map to a matrix
        this.map = function(cb, _cb) {
            return map(cb, this, _cb);
        } .bind(this);
        // filter the matrix
        this.filter = function() {
            const arg = slice.call(arguments);
            arg.unshift(this);
            return filter(arg);
        } .bind(this);
        // filterBypositionRow a matrix
        this.filterByPositionRow = function() {
            const arg = slice.call(arguments);
            arg.unshift(this);
            return filterByPositionRow(arg);
        } .bind(this);
        // filterByPositionColumn a matrix
        this.filterByPositionColumn = function() {
            const arg = slice.call(arguments);
            arg.unshift(this);
            return filterByPositionColumn(arg);
        } .bind(this);
        // truncate the values of a matrix
        this.truncate = function(n, cb) {
            const _truncate = function(item) {
                return truncate(item, n);
            };
            return map(_truncate, this, cb);
        } .bind(this);
        // apply a function to every element of a matrix
        this.forEach = function(map, cb) {
            forEach.call(this, map, this, cb);
        } .bind(this);
        // apply a function given to every column
        this.forEachColumn = function(map, cb) {
            forEachColumn.call(this, map, this, cb);
        } .bind(this);
        // apply a function given to every row
        this.forEachRow = function(map, cb) {
            forEachRow.call(this, map, this, cb);
        } .bind(this);
        // convert a matrix to a vector using the row
        // up-down taken
        this.toVectorWithRow = function(opt) {
            return toVectorWithRow(this, opt);
        } .bind(this);
        // convert a matrix to a vector using the column
        // left-rigth taken
        this.toVectorWithColumn = function() {
            return toVectorWithColumn(this);
        } .bind(this);
    }
};
matrix.toVectorWithRow = toVectorWithRow .bind(matrix);
matrix.toVectorWithColumn = toVectorWithColumn.bind(matrix);
matrix.diagonal = diagonal.bind(matrix);
matrix.adj = adj.bind(matrix);
matrix.applyByRow = applyByRow.bind(matrix);
matrix.applyByColumn = applyByColumn.bind(matrix);
matrix.apply = apply.bind(matrix);
matrix.applyLeft = applyLeft.bind(matrix);
matrix.det = det.bind(matrix);
matrix.inv = inv.bind(matrix);
matrix.minor = minor.bind(matrix);
matrix.pscalar = scalar.bind(matrix);
matrix.sum = plus.bind(matrix);
matrix.trans = trans.bind(matrix);
matrix.multiply = x.bind(matrix);
matrix.multiplyDirect = _x.bind(matrix);
matrix.pow = pow.bind(matrix);
matrix._pow = _pow.bind(matrix);
matrix.map = map.bind(matrix);
matrix.toObject = function(A) {
    if (A instanceof matrix) {
        if (A.getColumn(1) === 1) {
            return A.trans().array[0];
        }
        return toObject(A.array);
    }
    return toObject(A);
};
matrix.forEach = forEach.bind(matrix);
matrix.create = matrix_nxm.bind(matrix);
matrix.ident = identM.bind(matrix);
matrix.filter = filter.bind(matrix);
matrix.filterByPositionRow = filterByPositionRow.bind(matrix);
matrix.filterByPositionColumn = filterByPositionColumn.bind(matrix);
matrix.zeros = zeros.bind(matrix);
matrix.ones = ones.bind(matrix);
matrix.concatDown = concatDown.bind(matrix);
matrix.concatLeft = concatLeft.bind(matrix);
matrix.concatRight = concatRight.bind(matrix);
matrix.concatUp = concatUp.bind(matrix);
module.exports = matrix;
