'use strict';
const express = require('express');

const cors = require('cors');


const apiRouts = require('../routes/api-v1');
const timestamp = require('../middleware/timestamp');
const logger = require('../middleware/logger');
const error404 = require('../middleware/404');
const error500 = require('../middleware/500');

const app = express();
app.use(cors());
app.use('/docs', express.static('./docs'));
app.use(express.json());
app.use(timestamp);
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).send('hiii');
});

app.get('/error500',fakeError);

app.use('/api/v1',apiRouts);

function fakeError(req,res,next){
  next('wooow ther is an error');
}

app.use(error404);
app.use(error500);


module.exports = {
  server: app,
  start:  (portNumber) => app.listen(portNumber, () => console.log(`Listnening to PORT ${portNumber}`)),
};
