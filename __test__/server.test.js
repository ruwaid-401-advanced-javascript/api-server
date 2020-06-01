'use strict';

const { server } = require('../lib/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

jest.spyOn(global.console, 'log');

describe('server.js', () => {

  it('should respond with 500', () => {
    return mockRequest.get('/error500')
      .then(results => {
        expect(results.status).toBe(500);
      }).catch(console.error);
  });

  it('should respond 404 of an invalid route', () => {
    return mockRequest
      .get('/invalidroute')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.error);
  });

  it('should respond properly /', () => {
    return mockRequest
      .get('/')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should respond properly /categories', () => {
    return mockRequest
      .get('/categories')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should respond properly /categories/:id', () => {
    return mockRequest
      .get('/categories/:id')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should post properly /categories', () => {
    return mockRequest
      .post('/categories')
      .send({ 'name': 'test name' })
      .then(results => {
        expect(results.status).toBe(201);
      });
  });

  it('should PUT properly /categories/:id', () => {
    return mockRequest
      .put('/categories/1')
      .send({ 'name': 'test name update' })
      .then(results => {
        expect(results.status).toBe(201);
      });
  });
  it('should DELETE properly /categories/:id', () => {
    return mockRequest
      .delete('/categories/1')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });



  it('should respond properly /products', () => {
    return mockRequest
      .get('/products')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should respond properly /products/:id', () => {
    return mockRequest
      .get('/products/:id')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });
  it('should PUT properly /products/:id', () => {
    return mockRequest
      .put('/products/1')
      .send({ 'name': 'test name update' })
      .then(results => {
        expect(results.status).toBe(201);
      });
  });


  it('should DELETE properly /products/:id', () => {
    return mockRequest
      .delete('/products/1')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should post properly /products', () => {
    return mockRequest
      .post('/products')
      .send({ 'name': 'test name' })
      .then(results => {
        expect(results.status).toBe(201);
      });
  });
});
