const toObject = (Matrix) => function(array) {
    if (!Array.isArray(array)) return array;

    const obj = {};
    for (let i = 0; i < array.length; i++)
        if (Array.isArray(array[i])) {
            if (array[i].length > 2)
                obj[array[i][0]] = array[i].slice(1);
            else if (array[i].length === 2)
                obj[array[i][0]] = array[i][1];
            else if (array[i].length === 1)
                Object.assign(obj, Matrix.toObject(array[i][0]));
        } else if (i + 1 < array.length) {
            Object.assign(obj, Matrix.toObject([
                [ array[i], array.slice(i + 1).length > 1 ? array.slice(i +
          1) : array[i + 1] ]
            ]));
            break;
        }

    return obj;
};
module.exports = toObject;
