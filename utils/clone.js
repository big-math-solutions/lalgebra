'use strict';
// recursive function to clone an object. If a non object parameter
// is passed in, that parameter is returned and no recursion occurs.
function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object')
        return obj;

    const temp = obj.constructor(); // give temp the original obj's constructor
    for (const key in obj)
        temp[key] = cloneObject(obj[key]);

    return temp;
}
module.exports = cloneObject;
