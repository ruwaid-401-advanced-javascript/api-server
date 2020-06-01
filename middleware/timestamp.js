'use strict';

/**
 * (Middleware) will generat a timestamp
 * @module timestamp
 */

/**
* Input 
* @function timestamp
* @param req - request
* @param res  - response
* @param next - next
*/

function timestamp(req, res, next) {
  req.requestTime = new Date().toString();
  next();
}

module.exports = timestamp;
