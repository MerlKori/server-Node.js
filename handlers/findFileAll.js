"use strict";
module.exports = (store) => {
    return new Promise((resolve, reject) => {
		store.find({}, (err, docs) => {
			resolve(docs);
		})
	})
}