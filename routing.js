"use strict";
const bodyParser = require('body-parser');
const app = require('./server');

// handlers
const create = require('./handlers/createFile');
const findAll = require('./handlers/findFileAll');
const remove = require('./handlers/removeFile');
const update = require('./handlers/updateFile');

// data base
const getDB = require('./db');
let dbName = 'tasks';
let db = getDB(dbName);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
db.loadDatabase();


module.exports = () => {
    app.post('/created', function (req, res) {
        create(db, req.body);
        findAll(db)
            .then((data) => {
                res.send(data);
            })
    })
    app.post('/findAll', function (req, res) {
        findAll(db)
            .then((data) => {
                res.send(data);
            })
    })
    app.post('/update', function (req, res) {
        update(db, req.body)
        findAll(db)
            .then((data) => {
                res.send(data);
            })
    })
    app.post('/remove', function (req, res) {
        remove(db, req.body);
        findAll(db)
            .then((data) => {
                res.send(data);
            })
    })
}