'use strict';

/** @module
   * lalgebra module, with all the properties defined into the proyect.
   */
let matrix = require('./algebraL/Mat'),
    solveLE = require('./algebraL/solveLE')(matrix),
    vector = require('./algebraL/vector')(matrix),
    lalgebra = {
        matrix,
        solveLE,
        vector
    };
lalgebra.utils = require('./utils/utils');
module.exports = lalgebra;
