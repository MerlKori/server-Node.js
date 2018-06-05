"use strict";
const dbActions = require('./db-actions');
const createDB = require('../db.js');

const userDB = createDB('users');
userDB.loadDatabase();


module.exports = {
	db: userDB,
	createUser: (userData) => {
		dbActions.create(userDB, userData);
	}
}
