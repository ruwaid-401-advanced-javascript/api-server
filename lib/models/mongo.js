'use strict';

/**
 * Generic mongo model: will be extended in other models
 * @class mongo
 * @property {object} schema - mongo schema
 * @property {function} read - get data
 * @property {function} creat  - post data to the database
 * @property {function} update  - update data using id
 * @property {function} delete  - delete data using id
 */

class Model {
  /**
   * Model Constructor
   * @param {Object} schema - mongo schema
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * 
   * @param {String} _id optional mongo record id
   * @return {*}
   */
  read(_id) {
    let queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }
  /**
   * 
   * @param {object} record matches the schema format
   * @return {*}
   */
  creat(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
  /**
   * 
   * @param {string} _id mongo record id
   * @param {object} record shcema object format
   * @return {*}
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }
  /**
   * 
   * @param {string} _id 
   * @return {*}
   */
  delete(_id) {
    // return promise
    return this.schema.findByIdAndDelete(_id);
  }

}


module.exports = Model;