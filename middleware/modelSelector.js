'use strict';


/**
 * (Middleware) will select the correct model for the requested route
 * @module modelSelector
 */

/**
* Input 
* @function logger
* @param req - request
* @param res  - response
* @param next - next
*/
function modelSelector(req, res, next) {
  let model = req.params.model;

  let modelfile = null;
  try {
    modelfile = require(`../lib/models/${model}/${model}.collection`);
    req.model = modelfile;
    next();
    return;
  }
  catch (e) {
    next('invalid model');
    modelfile = null;
    return;
  }
}
module.exports = modelSelector;
