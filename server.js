'use strict';
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;


server.use(middlewares);


// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

router.render = (req, res) => {
  res.jsonp({
    counts: res.locals.data.length,
    results: res.locals.data,
    bye:'thats all bye hahaha',
  });
};

server.use(router);
server.listen(PORT, () => {
  console.log('JSON Server is running @',PORT);
});
