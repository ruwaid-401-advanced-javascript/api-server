'use strict';

const { server } = require('../lib/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

jest.spyOn(global.console, 'log');

let idCategory = null;
let idProducts = null;
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

  it('should post properly /categories', () => {
    let testObj = { 'name': 'test name 1', description: 'test test 1 ' };
    return mockRequest
      .post('/api/v1/categories')
      .send(testObj)
      .then(results => {
        idCategory = results.body._id;
        expect(results.status).toBe(201);
        Object.keys(testObj).forEach(key => {
          expect(results.body[key]).toEqual(testObj[key]);
        });
      });
  });

  it('should respond properly /categories', () => {
    return mockRequest
      .get('/api/v1/categories')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should respond properly /categories/:id', () => {
    return mockRequest
      .get(`/api/v1/categories/${idCategory}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });


  it('should PUT properly /categories/:id', () => {
    let testObj = { 'name': 'test name 1 updated', description: 'test test 1 updated ' };
    return mockRequest
      .put(`/api/v1/categories/${idCategory}`, testObj)
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
      .delete(`/api/v1/categories/${idCategory}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });


  it('should post properly /products', () => {
    let testObj = { name: 'test 1', category: 'test cat', description: 'test test 1 ', price: 2, inStock: 4 };
    return mockRequest
      .post('/api/v1/products')
      .send(testObj)
      .then(results => {
        idProducts = results.body._id;
        expect(results.status).toBe(201);
        Object.keys(testObj).forEach(key => {
          expect(results.body[key]).toEqual(testObj[key]);
        });
      });
  });


  it('should respond properly /products', () => {
    return mockRequest
      .get('/api/v1/products')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should respond properly /products/:id', () => {
    return mockRequest
      .get(`/api/v1/products/${idProducts}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should PUT properly /products/:id', () => {
    let updateTestObj = { name: 'test 4 updated', category: 'test cat', description: 'test test 4 updated', price: 2, inStock: 4 };
    return mockRequest
      .put(`/api/v1/products/${idProducts}`)
      .send(updateTestObj)
      .then(results => {
        expect(results.status).toBe(201);
      });
  });

  it('should DELETE properly /products/:id', () => {
    return mockRequest
      .delete(`/api/v1/products/${idProducts}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });
});
