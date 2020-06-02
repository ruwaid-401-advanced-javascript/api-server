'use strict';

const Model = require('../mongo');
const schema = require('./products.schema');

class product extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new product();