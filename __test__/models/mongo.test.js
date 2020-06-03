'use strict';

require('@code-fellows/supergoose');

const Modelmongo = require('../../lib/models/mongo');


const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
  name: { type: String, required: true },
});

let testModel = mongoose.model('testSchema', testSchema);

let testClass = new Modelmongo(testModel);



describe('mongo.js', () => {

  afterEach(async () => {
    await testModel.deleteMany();
  });

  it('can get() all categories', () => {
    let testObj = { name: 'test 1' };
    return testClass.creat(testObj)
      .then(() => {
        return testClass.read()
          .then(data => {
            Object.keys(testObj).forEach(key => {
              expect(data[0][key]).toEqual(testObj[key]);
            });
          });
      });
  });

  it('can get() a category', () => {
    let testObj = { name: 'test 2' };
    return testClass.creat(testObj)
      .then(postedData => {
        return testClass.read(postedData._id)
          .then(data => {
            Object.keys(testObj).forEach(key => {
              expect(data[0][key]).toEqual(testObj[key]);
            });
          });
      });
  });

  it('can post() a category', () => {
    let testObj = { name: 'test 3' };
    return testClass.creat(testObj)
      .then(data => {
        Object.keys(testObj).forEach(key => {
          expect(data[key]).toEqual(testObj[key]);
        });
      });
  });

  it('can put() a category', () => {
    let testObj = { name: 'test 4 ' };
    let updateTestObj = { name: 'test 4 updated' };
    return testClass.creat(testObj)
      .then(postedData => {
        return testClass.update(postedData._id, updateTestObj)
          .then(data => {
            Object.keys(testObj).forEach(key => {
              expect(data[key]).toEqual(updateTestObj[key]);
            });
          });
      });
  });

  it('can delete() a category', () => {
    let testObj = { name: 'test 5 updated' };
    return testClass.creat(testObj)
      .then(postedData => {
        return testClass.delete(postedData._id)
          .then(() => {
            return testClass.read()
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



