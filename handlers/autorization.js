"use strict";
const dbActions = require('./db-actions');
const createDB = require('../db');
const addKey = require('./add-key');

const userDB = createDB('users');
userDB.loadDatabase();


module.exports = {
	createUser: async (userData) => {
		const user = await dbActions.find(userDB, userData);
		if (user.length === 0) {
			let newUser = {
				login: userData.login,
				password: userData.password,
				key: addKey.getKey()
			}
			dbActions.create(userDB, newUser);
			return newUser.key
		} else {
			return 'error'
		}
	},
	login: async (userData) => {
		let key;
		const user = await dbActions.find(userDB, userData);
		if (user.length === 1) {
			key = await addKey.setKey(userDB, user);
		}	else {
			key = 'error';
		}
		return key;
	}
}
