  'use strict';
  /**@module
   * lalgebra module, with all the properties defined into the proyect.
   */
  let matrix = require('./algebraL/Mat'),
    solveLE = require('./algebraL/solveLE'),
    vector = require('./algebraL/vector'),
    lalgebra = {
      matrix: matrix,
      solveLE: solveLE,
      vector: vector,
    };
  lalgebra.utils = require('./utils/utils');
  module.exports= lalgebra
