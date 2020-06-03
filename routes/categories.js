'use strict';

const express = require('express');
const router = express.Router();

const categories = require('../lib/models/categories/categories.collection');

router.get('/', categoriesGetFunc);
router.get('/:id', categoriesGetByIDFunc);
router.post('/', categoriesPostFunc);
router.put('/:id', categoriesPUTByIDFunc);
router.delete('/:id', categoriesDeleteByIDFunc);



function categoriesGetFunc(req, res, next) {
  categories.read()
    .then(data => {
      let output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    }).catch(next);
}

function categoriesPostFunc(req, res, next) {
  let newdata = req.body;
  categories.creat(newdata)
    .then(data => {
      res.status(201).json(data);
    }).catch(next);
}

function categoriesGetByIDFunc(req, res, next) {
  let id = req.params.id;
  categories.read(id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}

function categoriesPUTByIDFunc(req, res, next) {
  let updatedData = req.body;
  let id = req.params.id;
  categories.update(id,updatedData)
    .then(data =>{
      res.status(201).json(data);
    }).catch(next);
}

function categoriesDeleteByIDFunc(req, res, next) {
  let id = req.params.id;
  categories.delete(id)
    .then(()=> {
      res.status(200).send('deleted wooow ');
    }).catch(next);
}

module.exports = router;