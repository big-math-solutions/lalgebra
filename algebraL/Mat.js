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
    Matrix_nxm = require('./matrix_nxm'),
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
    getVector = require('./vector'),
    toArray = require('./toArray'),
    toObject = require('./toObject'),
    toVectorWithRow = require('./toVectorWithRow'),
    toVectorWithColumn = require('./toVectorWithColumn');
require('../utils/objectEquals')();
require('../utils/arraySimilarly')();

function countColumn(array) {
    const res = [ ];
    for (let i = 0; i < array.length; i++)
        res.push(array[i].length);

    return res;
}

/** @constructor
 * Constructor of a Matrix.
 * @param {Array} array to build the Matrix, {Number} Matrix's row , {Array} Matrix's column
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
const Vector = getVector(Matrix)
function Matrix(array, row, column, opt) {
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
    if (array instanceof Vector) return array.Matrix;
    else if (array instanceof Matrix) return array;
    else if (!(this instanceof Matrix)) return new Matrix(array, row, column, opt);

    array = typeof array === 'object' && !Array.isArray(array) && opt.force ?
        toArray(array, opt) : array;
    array = Array.isArray(array) ? array : [
        [ array ]
    ];
    for (let i = 0; i < array.length; i++)
        array[i] = Array.isArray(array[i]) ? array[i] : [ array[i] ];

    if (!array.length) return;
    // get elements of Matrix
    this._ = function(i, j) {
        if (arguments.length < 3) {
            if (i !== undefined && j !== undefined) {
                const _i = (i - 1) % this.row % this._row;
                const _j = (j - 1) % this.getColumn(i) % this._array[_i].length;
                return this._array[_i][_j];
            } else if (i !== undefined && j === undefined)
                return Matrix([ this.array[(i - 1) % this._row] ], this.opt);
            else if (i === undefined && j !== undefined)
                return this.trans()._(j).trans();
        } else {
            const _i = (i - 1) % this.row % this._row;
            const _j = _i !== undefined ? (j - 1) % this.getColumn(i) %
          this._array[_i].length : j - 1;
            const toReturn = this._array[_i][_j];
            return toReturn._ ? toReturn._(...slice.call(
                arguments, 2)) : toReturn;
        }
    } .bind(this);
    // get column of Matrix
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
            for (let i = 0; i < array.length; i++)
                array[i] = Array.isArray(array[i]) ? array[i] : [
                    array[i]
                ];

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
    // Adjunt of  Matrix
    this._adj = adj(Matrix)
    this.adj = function() {
        return this._adj(this);
    }.bind(this);
    // Diagonal of Matrix
    this._diagonal = diagonal(Matrix)
    this.diagonal = function() {
        return this._diagonal(this, );
    } .bind(this);
    // Inverse of Matrix
    this._inv = inv(Matrix)

    this.inv = function() {
        return this._inv(this, );
    } .bind(this);
    // The comparation function
    this.isEqual = function(A) {
        return this.array.equals(A.array);
    } .bind(this);
    // similarly function to Matrix, the elements compared
    // by rows
    this.isSimilarlyByRow = function(A) {
        return this.array.similarly(A.array);
    } .bind(this);
    // similarly function to Matrix, the elements compared
    // by columns
    this.isSimilarlyByColumn = function(A) {
        return this.trans().array.similarly(A.array);
    } .bind(this);
    // Determinant of Matrix
    this._det = det(Matrix)
    this.det = function() {
        return this._det(this, );
    } .bind(this);
    // The join method of Matrix
    this._join = join(Matrix)
    this.join = function(A, i, j, ) {
        return this._join(this, A, i, j, );
    } .bind(this);
    // transpose of Matrix
    this._trans = trans(Matrix)
    this.trans = function( opt) {
        return this._trans(this, opt);
    } .bind(this);
    // Transform a Matrix to a object
    this._toObject = toObject(Matrix)
    this.toObject = function() {
        return this._toObject(this.array);
    } .bind(this);
    // concatRight of Matrix
    this._concatRight = concatRight(Matrix)
    this.concatRight = function() {
        const arg = slice.call(arguments);
        arg.unshift(this);
        return this._concatRight(arg);
    } .bind(this);
    // concatLeft of Matrix
    this._concatLeft = concatLeft(Matrix)

    this.concatLeft = function() {
        const arg = slice.call(arguments);
        arg.unshift(this);
        return this._concatLeft(arg);
    } .bind(this);
    // concatDown of Matrix
    this._concatDown = concatDown(Matrix)

    this.concatDown = function() {
        const arg = slice.call(arguments);
        arg.unshift(this);
        return this._concatDown(arg);
    } .bind(this);
    // concatUp of Matrix
    this._concatUp = concatUp(Matrix)

    this.concatUp = function() {
        const arg = slice.call(arguments);
        arg.unshift(this);
        return this._concatUp(arg);
    } .bind(this);
    // multiply of Matrix
    this.multi = x(Matrix)
    this.x = function(...args) {
        if (typeof A === 'number') return this.scalar(A);
        return this.multi(this, ...args);
    } .bind(this);
    this.__x = _x(Matrix)
    // Direct multiply of Matrix
    this._x = function() {
        const arg = slice.call(arguments);
        arg.unshift(this);
        return this.__x(arg);
    } .bind(this);
    // sum of Matrix
    this._plus = plus(Matrix)
    this.plus = function(...args) {
        return this._plus(this,...args);
    } .bind(this);
    // Scalar product of Matrix
    this._scalar = scalar(Matrix)
    this.scalar = function(alpha, ) {
        return this._scalar(alpha, this, );
    } .bind(this);
    // Power a Matrix
    this._pow_ = pow(Matrix)
    this.pow = function(n, ) {
        return this._pow_(this, n, );
    } .bind(this);
    // apply a Matrix over other Matrix
    this._apply = apply(Matrix)
    this.apply = function() {
        const arg = slice.call(arguments);
        arg.unshift(this);
        return this._apply.call(this, arg);
    } .bind(this);
    // applyLeft a Matrix over other Matrix
    this._applyLeft = applyLeft(Matrix)

    this.applyLeft = function() {
        const arg = slice.call(arguments);
        arg.unshift(this);
        return this._applyLeft.call(this, arg);
    } .bind(this);
    // apply by row
    this._applyByRow = applyByRow(Matrix)

    this.applyByRow = function() {
        const arg = slice.call(arguments);
        arg.unshift(this);
        return this._applyByRow.call(this, arg);
    } .bind(this);
    // apply by column
    this._applyByColumn = applyByColumn(Matrix)
    this.applyByColumn = function() {
        const arg = slice.call(arguments);
        arg.unshift(this);
        return this._applyByColumn.call(this, arg);
    } .bind(this);
    // the power direct  product
    this.__pow = _pow(Matrix)
    this._pow = function(n, ) {
        return this.__pow(this, n, );
    } .bind(this);
    // calculate the minor of a Matrix
    this._minor = minor(Matrix)
    this.minor = function(i, j, ) {
        return minor(i, j, this, );
    } .bind(this);
    // applicate the map to a Matrix
    this._map = map(Matrix)
    this.map = function(_) {
        return this._map(this, _);
    } .bind(this);
    // filter the Matrix
    this._filter = filter(Matrix)

    this.filter = function(_map) {
        return this._filter(this, _map);
    } .bind(this);
    // filterBypositionRow a Matrix
    this._filterByPositionRow = filterByPositionRow(Matrix)

    this.filterByPositionRow = function() {
        const arg = slice.call(arguments);
        arg.unshift(this);
        return this._filterByPositionRow(arg);
    } .bind(this);
    // filterByPositionColumn a Matrix
    this._filterByPositionColumn = filterByPositionColumn(Matrix)

    this.filterByPositionColumn = function() {
        const arg = slice.call(arguments);
        arg.unshift(this);
        return this._filterByPositionColumn(arg);
    } .bind(this);
    // truncate the values of a Matrix
    this.truncate = function(n ) {
        return this._map((item) =>truncate(item, n), this );
    } .bind(this);
    // apply a function to every element of a Matrix
    this._forEach = forEach(Matrix)
    this.forEach = function(map, ) {
        this._forEach.call(this, map, this, );
    } .bind(this);
    // apply a function given to every column
    this._forEachColumn = forEachColumn(Matrix)

    this.forEachColumn = function(map, ) {
        this._forEachColumn.call(this, map, this, );
    } .bind(this);
    // apply a function given to every row
    this._forEachRow = forEachRow(Matrix)

    this.forEachRow = function(map, ) {
        this._forEachRow.call(this, map, this, );
    } .bind(this);
    // convert a Matrix to a vector using the row
    // up-down taken
    this._toVectorWithRow = toVectorWithRow(Matrix, Vector)

    this.toVectorWithRow = function(opt) {
        return this._toVectorWithRow(this, opt);
    } .bind(this);
    // convert a Matrix to a vector using the column
    // left-rigth taken
    this._toVectorWithColumn = toVectorWithColumn(Matrix, Vector)

    this.toVectorWithColumn = function() {
        return this._toVectorWithColumn(this);
    } .bind(this);
};
Matrix.toVectorWithRow = toVectorWithRow(Matrix).bind(Matrix);
Matrix.toVectorWithColumn = toVectorWithColumn(Matrix).bind(Matrix);
Matrix.diagonal = diagonal(Matrix).bind(Matrix);
Matrix.adj = adj(Matrix).bind(Matrix);
Matrix.applyByRow = applyByRow(Matrix).bind(Matrix);
Matrix.applyByColumn = applyByColumn(Matrix).bind(Matrix);
Matrix.apply = apply(Matrix).bind(Matrix);
Matrix.applyLeft = applyLeft(Matrix).bind(Matrix);
Matrix.det = det(Matrix).bind(Matrix);
Matrix.inv = inv(Matrix).bind(Matrix);
Matrix.minor = minor(Matrix).bind(Matrix);
Matrix.pscalar = scalar(Matrix).bind(Matrix);
Matrix.sum = plus(Matrix).bind(Matrix);
Matrix.trans = trans(Matrix).bind(Matrix);
Matrix.multiply = x(Matrix).bind(Matrix);
Matrix.multiplyDirect = _x(Matrix).bind(Matrix);
Matrix.pow = pow(Matrix).bind(Matrix);
Matrix._pow = _pow(Matrix).bind(Matrix);
Matrix.map = map(Matrix).bind(Matrix);
const _toObject = toObject(Matrix)
Matrix.toObject = function(A) {
    if (A instanceof Matrix) {
        if (A.getColumn(1) === 1)
            return A.trans().array[0];

        return _toObject(A.array);
    }
    return _toObject(A);
};
Matrix.forEach = forEach(Matrix).bind(Matrix);
Matrix.create = Matrix_nxm(Matrix).bind(Matrix);
Matrix.ident = identM(Matrix).bind(Matrix);
Matrix.filter = filter(Matrix).bind(Matrix);
Matrix.filterByPositionRow = filterByPositionRow(Matrix).bind(Matrix);
Matrix.filterByPositionColumn = filterByPositionColumn(Matrix).bind(Matrix);
Matrix.zeros = zeros(Matrix).bind(Matrix);
Matrix.ones = ones(Matrix).bind(Matrix);
Matrix.concatDown = concatDown(Matrix).bind(Matrix);
Matrix.concatLeft = concatLeft(Matrix).bind(Matrix);
Matrix.concatRight = concatRight(Matrix).bind(Matrix);
Matrix.concatUp = concatUp(Matrix).bind(Matrix);
module.exports = Matrix;
