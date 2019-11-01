const express = require('express');
const helmet = require('helmet');

const actionRouter = require('./data/routers/actions-router');
const projectRouter = require('./data/routers/project-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter);

module.exports = server;
