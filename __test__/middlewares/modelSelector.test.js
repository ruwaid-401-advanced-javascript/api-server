'use strict';

const modelSelector = require('../../middleware/modelSelector');
let res = {};
let next = jest.fn(); //function;

describe('model selector', () => {
  it('correct model  /categories', () => {
    let req = { params: { model: 'categories' } };
    modelSelector(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('correct model  /categories', () => {
    let req = { params: { model: 'categories' } };
    modelSelector(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('correct model /products', () => {
    let req = { params: { model: 'products' } };
    modelSelector(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('should respond with 500', () => {
    let req = { params: { model: 'no' } };
    modelSelector(req, res, next);
    expect(next).toHaveBeenCalledWith('invalid model');
  });
});
