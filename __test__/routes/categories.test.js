'use strict';

const express = require('express');
const server = express();

const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

const route  = require('../../routes/categories');
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use('/categories', route);


let idCategory =null;
describe('categories.js', () => {
  it('should respond properly /categories', () => {
    return mockRequest
      .get('/categories')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should post properly /categories', () => {
    let testObj = { 'name': 'test name 1', description: 'test test 1 ' };
    return mockRequest
      .post('/categories')
      .send(testObj)
      .then(results => {
        idCategory = results.body._id;
        expect(results.status).toBe(201);
        Object.keys(testObj).forEach(key => {
          expect(results.body[key]).toEqual(testObj[key]);
        });
      });
  });

  it('should respond properly /categories/:id', () => {
    return mockRequest
      .get(`/categories/${idCategory}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should PUT properly /categories/:id', () => {
    let testObj = { 'name': 'test name 1 updated', description: 'test test 1 updated ' };
    return mockRequest
      .put(`/categories/${idCategory}`,testObj)
      .send(testObj)
      .then(results => {
        expect(results.status).toBe(201);
        Object.keys(testObj).forEach(key => {
          expect(results.body[key]).toEqual(testObj[key]);
        });
      });
  });

  it('should DELETE properly /categories/:id', () => {
    return mockRequest
      .delete(`/categories/${idCategory}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });
});
