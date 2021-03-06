const pscalar = require('./pscalar');
const sum = require('./sum');
const crossp = require('./crossp');
const dotp = require('./dotp');
const toArray = require('./toArray');

module.exports = (Matrix) => {
    function Vector(array, dim) {
        this._toArray = toArray(Vector);
        array = typeof array === 'object' && !Array.isArray(array) ?
            this._toArray(array) :
            array;
        if (!(this instanceof Vector))
            return new Vector(array);

        if (!array)
            return;

        this._ = function(i) {
            return this.matrix._(i, 1);
        };
        this._array = array;
        this.dim = dim || array.length;
        const _array = [ ];
        for (let i = 0; i < this.dim; i++)
            _array[i] = [ array[i % array.length] ];

        // Vector are behave as this.dimx1 matrix
        this.matrix = new Matrix(_array, this.dim, 1);
        this.array = this.matrix.array;
        // Define the sum method.
        this._sum = sum(Matrix);
        this.sum = function(A) {
            const __array = this._sum(this.matrix, A.matrix).array;
            const _array = [ ];
            for (let i = 0; i < this.dim; i++)
                _array[i] = __array[i][0];

            return new Vector(_array);
        };
        // Define the product by a scalar method.
        this._pscalar = pscalar(Matrix);
        this.pscalar = function(a) {
            const __array = this._pscalar(a, this.matrix).array;
            const _array = [ ];
            for (let i = 0; i < this.dim; i++) _array[i] = __array[i][0];

            return new Vector(_array);
        };
        // Define the map over the Vector.
        this.map = function(cb) {
            const __array = this.matrix.array;
            const _array = [ ];
            for (let i = 0; i < this.dim; i++)
                _array[i] = cb(__array[i][0], i);

            return new Vector(_array);
        };
        // Define the dot product method.
        this._dotp = dotp(Vector);
        this.dot = function(A) {
            return this._dotp(A, this);
        };
        // Define the filter method
        this.filter = function(map) {
            return this.matrix.filter(map);
        };
        // Define the cross product method
        this._cross = crossp(Vector);
        this.cross = function() {
            const arg = Array.prototype.slice.call(arguments);
            arg.unshift(this);
            return this._cross(arg);
        };
    }
    // Define the class method dotp.
    Vector.dotp = dotp;
    // DEfine the class method sum.
    Vector.sum = function(A, B) {
        const __array = this._sum(B.matrix, A.matrix).array;
        const _array = [ ];
        for (let i = 0; i < this.dim; i++)
            _array[i] = __array[i][0];

        return new Vector(_array);
    };
    // Define the product by a scalar class method.
    Vector.pscalar = function(a, B) {
        const __array = this._pscalar(a, B.matrix).array;
        const _array = [ ];
        for (let i = 0; i < this.dim; i++)
            _array[i] = __array[i][0];

        return new Vector(_array);
    };
    // Define the cross producto class method.
    Vector.crossp = crossp;
    Vector.create_n = function(n, map) {
        let i, array = [ ];
        for (i = 0; i < n; i++)
            array[i] = map(i);

        return new Vector(array);
    };
    // Define the mapping class method.
    Vector.map = function(cb, B) {
        const __array = B.matrix.array;
        const _array = [ ];
        for (let i = 0; i < this.dim; i++)
            _array[i] = cb(__array[i][0], i);

        return new Vector(_array);
    };
    return Vector;
};
