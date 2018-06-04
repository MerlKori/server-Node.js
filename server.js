"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const cors = require ('cors');

const app = express();
const PORT = process.env.PORT || 9595;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    console.log('get');
    res.send('get ok');
})

app.listen(PORT, (err) => console.log('server run!'));