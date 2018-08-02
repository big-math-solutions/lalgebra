

const zeros = (builder) => function(n, m) {
    m = m || n;
    return builder(0, n, m);
};

module.exports = zeros;
