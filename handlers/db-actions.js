"use strict";
module.exports = {
	create: (store, obj) => {
		store.insert(obj);
	},
	find: (store, obj) => {
		return new Promise((resolve, reject) => {
			store.find(obj, (err, docs) => {
				resolve(docs);
			})
		})
	},
	findAll: (store) => {
		return new Promise((resolve, reject) => {
			store.find({}, (err, docs) => {
				resolve(docs);
			})
		})
	},
	update: (store, obj) => {
		store.update( obj[0] , obj[1], {});
	},
	remove: (store, obj) => {
		store.remove(obj, {});
	}
}