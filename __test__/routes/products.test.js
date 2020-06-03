'use strict';

const express = require('express');
const server = express();

const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

const route = require('../../routes/product');
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use('/products', route);

let idProducts = null;

it('should post properly /products', () => {
  let testObj = { name: 'test 1', category: 'test cat', description: 'test test 1 ', price: 2, inStock: 4 };
  return mockRequest
    .post('/products')
    .send(testObj)
    .then(results => {
      idProducts = results.body._id;
      expect(results.status).toBe(201);
      Object.keys(testObj).forEach(key => {
        expect(results.body[key]).toEqual(testObj[key]);
      });
    });
});

describe('products.js', () => {

  it('should respond properly /products', () => {
    return mockRequest
      .get('/products')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should respond properly /products/:id', () => {
    return mockRequest
      .get(`/products/${idProducts}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should PUT properly /products/:id', () => {
    let updateTestObj = { name: 'test 4 updated', category: 'test cat', description: 'test test 4 updated', price: 2, inStock: 4 };
    return mockRequest
      .put(`/products/${idProducts}`)
      .send(updateTestObj)
      .then(results => {
        expect(results.status).toBe(201);
      });
  });


  it('should DELETE properly /products/:id', () => {
    return mockRequest
      .delete(`/products/${idProducts}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

});

