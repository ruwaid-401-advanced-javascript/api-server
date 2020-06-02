'use strict';

const Model = require('../mongo');
const schema = require('./categories.schema');

class category extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new category();