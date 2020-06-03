'use strict';

const express = require('express');
const router = express.Router();

const modelSelector = require('../middleware/modelSelector');

router.param('model',modelSelector);

router.get('/:model', getFunc);
router.get('/:model/:id', getByIDFunc);
router.post('/:model', postFunc);
router.put('/:model/:id', putByIDFunc);
router.delete('/:model/:id', deleteByIDFunc);



function getFunc(req, res, next) {
  req.model.read()
    .then(data => {
      let output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    }).catch(next);
}

function postFunc(req, res, next) {
  let newdata = req.body;
  req.model.creat(newdata)
    .then(data => {
      res.status(201).json(data);
    }).catch(next);
}

function getByIDFunc(req, res, next) {
  let id = req.params.id;
  req.model.read(id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}

function putByIDFunc(req, res, next) {
  let updatedData = req.body;
  let id = req.params.id;
  req.model.update(id,updatedData)
    .then(data =>{
      res.status(201).json(data);
    }).catch(next);
}

function deleteByIDFunc(req, res, next) {
  let id = req.params.id;
  req.model.delete(id)
    .then(()=> {
      res.status(200).send('deleted wooow ');
    }).catch(next);
}

module.exports = router;