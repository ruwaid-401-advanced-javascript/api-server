'use strict';

/**
 * will start the server
 * @module index
 */


require('dotenv').config();
const server = require('./lib/server.js');

const PORT = process.env.PORT || 3000;
server.start(PORT);
