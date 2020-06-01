'use strict';

/**
 * (Middleware) will console log the requested path,method and time
 * @module logger
 */

/**
* Input 
* @function logger
* @param req - request
* @param res  - response
* @param next - next
*/

function logger(req,res,next){
  console.log('requested Path:',req.path,' Method:',req.method,' Request Time:',req.requestTime);
  next();
}


module.exports = logger;
