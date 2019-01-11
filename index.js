const express = require('express');
const morganLogger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const server = express();


const port = process.env.PORT || 5050;

server.listen(port, () => console.log(`The Server is listening on port ${port}`));