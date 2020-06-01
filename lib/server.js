'use strict';
const express = require('express');
const app = express();
const cors = require('cors');

const timestamp = require('../middleware/timestamp');
const logger = require('../middleware/logger');
const error404 = require('../middleware/404');
const error500 = require('../middleware/500');

app.use(cors());
app.use('/docs', express.static('./docs'));
app.use(express.json());
app.use(timestamp);
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).send('hiii');
});


app.get('/categories', categoriesGetFunc);
app.get('/categories/:id', categoriesGetByIDFunc);
app.post('/categories', categoriesPostFunc);
app.put('/categories/:id', categoriesPUTByIDFunc);
app.delete('/categories/:id', categoriesDeleteByIDFunc);

app.get('/products', productsGetFunc);
app.get('/products/:id', productsGetByIDFunc);
app.post('/products', productsPostFunc);
app.put('/products/:id', productsPUTByIDFunc);
app.delete('/products/:id', productsDeleteByIDFunc);

app.get('/error500',fakeError);


function fakeError(req,res,next){
  next('wooow ther is an error');
}



let db = [{ 'id': 1, 'name': 'prod 1' }];
let catDb = [];

function categoriesGetFunc(req, res) {
  res.status(200).json(catDb);
}

function categoriesPostFunc(req, res) {
  let data = req.body;
  catDb.push(data);
  res.status(201).json(catDb);
}

function categoriesGetByIDFunc(req, res) {
  let id = req.params.id - 1;
  res.status(200).json(catDb[id]);
}

function categoriesPUTByIDFunc(req, res) {
  let data = req.body;
  let id = req.params.id - 1;
  catDb[id] = data;
  res.status(201).json(catDb);
}

function categoriesDeleteByIDFunc(req, res) {
  let id = req.params.id - 1;
  catDb.splice(id, 1);
  res.status(200).json(catDb);
}



function productsGetFunc(req, res) {
  res.status(200).json(db);
}

function productsPostFunc(req, res) {
  let data = req.body;
  db.push(data);
  res.status(201).json(db);

}

function productsGetByIDFunc(req, res) {
  let id = req.params.id - 1;
  res.status(200).json(db[id]);
}

function productsPUTByIDFunc(req, res) {
  let data = req.body;
  let id = req.params.id - 1;
  db[id] = data;
  res.status(201).json(db);
}

function productsDeleteByIDFunc(req, res) {
  let id = req.params.id - 1;
  db.splice(id, 1);
  res.status(200).json(db);
}


app.use(error404);
app.use(error500);


module.exports = {
  server: app,
  start:  (portNumber) => app.listen(portNumber, () => console.log(`Listnening to PORT ${portNumber}`)),
};
