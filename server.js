const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const middleware = [helmet(), cors(), express.json()]

const server = express();

server.use(middleware);

const ordersRouter = require('./orders/ordersRouter')

server.use('/api/orders', ordersRouter);

module.exports = server;
