
const toArray = (Matrix) => function(obj, opt) {
    opt = opt || {
        deep: true
    };
    opt.deep = opt.deep === undefined ? true : opt.deep;
    let array = [ ],
        value;
    for (const variable in obj)
        if (obj.hasOwnProperty(variable)) {
            value = typeof obj[variable] === 'object' && opt.deep ? new Matrix(
                obj[variable], opt) : obj[variable];
            array.push([ variable, value ]);
        }

    return array;
};
module.exports = toArray;
