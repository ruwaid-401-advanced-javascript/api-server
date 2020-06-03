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

  // Code 1: i used this code for test(modelSelector.test.js)  
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

  // // Code 2: not worked well when test model not exists (modelSelector.test.js)  
  // // but worked well when runing the server(localhost)
  // const modelfile = require(`../lib/models/${model}/${model}.collection`);

  // switch (model) {
  // case 'categories':
  // case 'products':
  //   req.model = modelfile;
  //   next();
  //   return;
  // default:
  //   next('invalid model');
  //   return;
  // }
}

module.exports = modelSelector;
