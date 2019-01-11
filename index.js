const express = require('express');
const morganLogger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const prRouter = require('./data/allRoutes/projectRoute')
const actRouter = require('./data/allRoutes/actionRoute')


const parser = express.json();


server.use( parser, morganLogger('short'), helmet(), cors(),);

server.use('/api/projects', prRouter)

server.use('/api/actions', actRouter)


const port = process.env.PORT || 5050;

server.listen(port, () => console.log(`The Server is listening on port ${port}`));