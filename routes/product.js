'use strict';

const express = require('express');
const router = express.Router();

const products = require('../lib/models/products/products.collection');
router.get('/', productsGetFunc);
router.get('/:id', productsGetByIDFunc);
router.post('/', productsPostFunc);
router.put('/:id', productsPUTByIDFunc);
router.delete('/:id', productsDeleteByIDFunc);


function productsGetFunc(req, res,next) {
  products.read()
    .then(data => {
      let output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    }).catch(next);
}

function productsPostFunc(req, res,next) {
  let newdata = req.body;
  products.creat(newdata)
    .then(data => {
      res.status(201).json(data);
    }).catch(next);
}

function productsGetByIDFunc(req, res,next) {
  let id = req.params.id;
  products.read(id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}

function productsPUTByIDFunc(req, res,next) {
  let updatedData = req.body;
  let id = req.params.id;
  products.update(id,updatedData)
    .then(data =>{
      res.status(201).json(data);
    }).catch(next);
}

function productsDeleteByIDFunc(req, res,next) {
  let id = req.params.id;
  products.delete(id)
    .then(()=> {
      res.status(200).send('deleted wooow ');
    }).catch(next);
}


module.exports = router;
