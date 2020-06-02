'use strict';

/**
 * Schema for categories
 * @module categorySchema 
 */

/**
 * @property  {string} name -required
 * @property {string} description -required
 */
const mongoose = require('mongoose');

const category = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('category', category);
