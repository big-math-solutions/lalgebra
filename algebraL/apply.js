function apply(A, B) {
    const thisArg = {
        A,
        B
    };
    let a;
    if (!A || !B) {
        return;
    }
    const Matrix = require('./Mat');
    if (!(A instanceof Matrix)) {
        A = new Matrix(A);
    }
    if (!(B instanceof Matrix)) {
        B = new Matrix(B);
    }
    let ii = A.row,
        array = [ ],
        i, k, kk;
    for (i = 1; i <= ii; i++) {
        array[i - 1] = [ ];
        kk = A.getColumn(i);
        for (k = 1; k <= kk; k++) {
            a = typeof B._(i, k) === 'function' ? B._(i, k).call(thisArg) :
                B._(i, k);
            array[i - 1][k - 1] = typeof A._(i, k) === 'function' ?
                A._(i, k).call(thisArg, a) :
                typeof A._(i, k) === 'object' ? apply(
                    A._(i, k), a) : A._(i, k) * a;
        }
    }
    return new Matrix(array);
}

function addd(array) {
    let l = array.length,
        A = array[0],
        B, p;
    for (p = 1; p < l; p++) {
        B = array[p];
        A = apply.call(this, A, B);
    }
    return A;
}
module.exports = function(arg) {
    if (arg === undefined) {
        return;
    }
    if (arguments.length > 1) {
        arg = Array.prototype.slice.call(arguments);
    }
    const cb = arg[arg.length - 1];
    if (cb && typeof cb === 'function' && arg.length > 2) {
        arg.pop();
        return new Promise(function(full, rej) {
            try {
                full(cb.call(this, null, addd.call(this, arg)));
            } catch (e) {
                rej(cb.call(this, e, null));
            }
        });
    }
    return addd.call(this, arg);
};
