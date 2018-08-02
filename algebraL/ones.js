

const ones = (builder) => function ones(n, m) {
    m = m || n;
    const res =  builder(1, n, m);
    return res
};
module.exports = ones;
