"use strict";
const bodyParser = require('body-parser');
const app = require('./server');

// handlers
const autorization = require('./handlers/autorization.js');
const dbActions = require('./handlers/db-actions');
const addKey = require('./handlers/add-key');

// data base
const getDB = require('./db');
let dbName = 'tasks';
let db = getDB(dbName);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
db.loadDatabase();


module.exports = () => {
	app.post('/created', function (req, res) {
		autorization.searchUserData(req.body.key).then((db) => {
			dbActions.create(db, req.body);
			dbActions.findAll(db)
			.then((data) => {
				res.send(data);
			})
		})
	})
	app.post('/findAll', function (req, res) {
		autorization.searchUserData(req.body.key).then((db) => {
			dbActions.findAll(db)
			.then((data) => {
				res.send(data);
			})
		})
	})
	app.post('/update', function (req, res) {
		// console.log(req.body.changeData[0]._id);
		autorization.searchUserData(req.body.key.key).then((db) => {
			dbActions.update(db, req.body.changeData)
			dbActions.findAll(db)
			.then((data) => {
				res.send(data);
			})
		})
	})
	app.post('/remove', function (req, res) {
		autorization.searchUserData(req.body.key).then((db) => {
			dbActions.remove(db, req.body._id);
			dbActions.findAll(db)
			.then((data) => {
				res.send(data);
			})
		})
	})


	app.post('/registration', function (req, res) {
		autorization.createUser(req.body).then((key) => {
			res.send(key);
		})
	})

	app.post('/authentication', function (req, res) {
		autorization.login(req.body).then((key) => {
			res.send(key);
		})
	})
}