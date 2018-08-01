'use strict';

/** @function
 * Generates a array from a object with the pattern [[key,value]]
 * @param {Object} obj.
 * @return {Array}
 */
function toArray(obj, opt) {
    opt = opt || {
        deep: true
    };
    opt.deep = opt.deep === undefined ? true : opt.deep;
    const Matrix = require('./Mat');
    let array = [ ],
        value;
    for (const variable in obj) {
        if (obj.hasOwnProperty(variable)) {
            value = typeof obj[variable] === 'object' && opt.deep ? new Matrix(
                obj[variable], opt) : obj[variable];
            array.push([ variable, value ]);
        }
    }
    return array;
}
module.exports = toArray;
