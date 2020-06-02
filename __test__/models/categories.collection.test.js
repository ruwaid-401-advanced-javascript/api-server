'use strict';

require('@code-fellows/supergoose');

const Model = require('../../lib/models/categories/categories.collection');

describe('server.js', () => {

  it('can get() all categories', () => {
    let testObj = { name: 'test 1', description: 'test test 1 ' };
    return Model.creat(testObj)
      .then(() => {
        return Model.read()
          .then(data => {
            Object.keys(testObj).forEach(key => {
              expect(data[0][key]).toEqual(testObj[key]);
            });
          });
      });
  });

  it('can get() a category', () => {
    let testObj = { name: 'test 2', description: 'test test 2 ' };
    return Model.creat(testObj)
      .then(postedData => {
        return Model.read(postedData._id)
          .then(data => {
            Object.keys(testObj).forEach(key => {
              expect(data[0][key]).toEqual(testObj[key]);
            });
          });
      });
  });

  it('can post() a category', () => {
    let testObj = { name: 'test 3', description: 'test test 3' };
    return Model.creat(testObj)
      .then(data => {
        Object.keys(testObj).forEach(key => {
          expect(data[key]).toEqual(testObj[key]);
        });
      });
  });

  it('can put() a category', () => {
    let testObj = { name: 'test 4 ', description: 'test test 4  ' };
    let updateTestObj = { name: 'test 4 updated', description: 'test test 4 updated ' };
    return Model.creat(testObj)
      .then(postedData => {
        return Model.update(postedData._id, updateTestObj)
          .then(data => {
            Object.keys(testObj).forEach(key => {
              expect(data[key]).toEqual(updateTestObj[key]);
            });
          });
      });
  });

  it('can delete() a category', () => {
    let testObj = { name: 'test 5 updated', description: 'test test 5 updated ' };
    return Model.creat(testObj)
      .then(postedData => {
        return Model.delete(postedData._id)
          .then(() => {
            return Model.read()
              .then(data => {
                data.forEach(element => {
                  Object.keys(testObj).forEach(key => {
                    expect(element[key]).not.toEqual(testObj[key]);
                  });
                });

              });
          });
      });
  });



});
