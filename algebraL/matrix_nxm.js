

const nxm = (Matrix) => function(n, m, map) {
    if (!n || !m || !map)
        return;

    let array = [ ],
        i, j;
    for (i = 1; i <= n; i++) {
        array[i - 1] = [ ];
        for (j = 1; j <= m; j++)
            array[i - 1][j - 1] = map.call(this, i, j);
    }
    return new Matrix(array);
};
module.exports = nxm;
