"use strict";
const dbActions = require('./db-actions');
const alphArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function getRandomKey() {
		let key = `${getRandomInt(0,10000)}${alphArr[getRandomInt(0,(alphArr.length - 1))]}${alphArr[getRandomInt(0,(alphArr.length - 1))]}${getRandomInt(0,10000)}${getRandomInt(0,10000)}${alphArr[getRandomInt(0,(alphArr.length - 1))]}${alphArr[getRandomInt(0,(alphArr.length - 1))]}${alphArr[getRandomInt(0,(alphArr.length - 1))]}${alphArr[getRandomInt(0,(alphArr.length - 1))]}`
		return key;
	}

	module.exports = {
		getKey: () => getRandomKey(),
		setKey: (store, userData) => {
			return new Promise((resolve, reject) => {
				let updateData = [
					{
						"_id": userData[0]._id
					},
					{
						"login": userData[0].login,
						"password": userData[0].password,
						"key": getRandomKey(),
						"_id": userData[0]._id
					}
				]
				dbActions.update(store ,updateData);
				resolve(updateData[1].key);
			})
		}
	};