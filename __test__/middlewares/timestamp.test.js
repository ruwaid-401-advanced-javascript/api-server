'use strict';

const timestamp =require('../../middleware/timestamp');
let req = {};
let res = {};
let next = jest.fn(); //function;

describe('timestamp middleware', () => {

  it('add timestamp to the request', () => {
    timestamp(req, res, next);
    expect(req.requestTime).toBeDefined();
  });

  it('properly moved to next', () => {
    timestamp(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
