"use strict";
const bodyParser = require('body-parser');
const app = require('./server');

// handlers
const autorization = require('./handlers/autorization.js');
const dbActions = require('./handlers/db-actions');

// data base
const getDB = require('./db');
let dbName = 'tasks';
let db = getDB(dbName);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
db.loadDatabase();


module.exports = () => {
	app.post('/created', function (req, res) {
		dbActions.create(db, req.body);
		dbActions.findAll(db)
			.then((data) => {
				res.send(data);
			})
	})
	app.post('/findAll', function (req, res) {
		dbActions.findAll(db)
			.then((data) => {
				res.send(data);
			})
	})
	app.post('/update', function (req, res) {
		dbActions.update(db, req.body)
		dbActions.findAll(db)
			.then((data) => {
				res.send(data);
			})
	})
	app.post('/remove', function (req, res) {
		dbActions.remove(db, req.body);
		dbActions.findAll(db)
			.then((data) => {
				res.send(data);
			})
	})


	app.post('/registration', function (req, res) {
		autorization.createUser(req.body);
		dbActions.find(autorization.db, req.body)
			.then((data) => {
				res.send(data);
			})
		
	})
}