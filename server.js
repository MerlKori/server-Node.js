"use strict";
const express = require('express');
const cors = require ('cors');

const app = express();
const PORT = process.env.PORT || 9595;

app.use(cors());

// export module
module.exports = app;

// castom module
const routing = require('./routing')
routing();

app.listen(PORT, (err) => console.log('server run!'));
