var http = require("http");
var Datastore = require('nedb');
var db = new Datastore({filename: 'records'});
var PORT = process.env.PORT || 9595;

db.loadDatabase();

function createdRecord(str) {
	let obj = JSON.parse(str)
	db.insert(obj);
}

function findRecord (str) {
	return new Promise((resolve, reject) => {
		let obj = JSON.parse(str);
		db.find(obj, (err, docs) => {
			resolve(docs);
		})
	})
}

function findAllRecords () {
	return new Promise((resolve, reject) => {
		db.find({}, (err, docs) => {
			resolve(docs);
		})
	})
}

function updateRecord(str) {
	let obj = JSON.parse(str);
	db.update( obj[0] , obj[1], {});
}

function removeRecord(str) {
	let obj = JSON.parse(str);
	db.remove(obj, {});
}


http.createServer((req, res) => {
	// res.writeHead(200, {'Content-Type': 'text/html'});
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

	if (req.url == '/created') {
		req.on('data', (chunk) => {
			createdRecord(chunk);
			findAllRecords()
				.then((data) => {
					res.write(JSON.stringify(data));
					res.end();
				})
		});
	} else if (req.url == '/find-rec') {
		req.on('data', (chunk) => {
			findRecord(chunk)
				.then((data) => {
					res.write(JSON.stringify(data));
					res.end();
				})
		});
	} else if (req.url == '/find-all-rec') {
		req.on('data', () => {
			findAllRecords()
				.then((data) => {
					res.write(JSON.stringify(data));
					res.end();
				})
		});
	} else if (req.url == '/update')  {
		req.on('data', (chunk) => {
			updateRecord(chunk);
			findAllRecords()
				.then((data) => {
					res.write(JSON.stringify(data));
					res.end();
				})
		});
	} else if (req.url == '/rem-rec')  {
		req.on('data', (chunk) => {
			removeRecord(chunk);
			findAllRecords()
				.then((data) => {
					res.write(JSON.stringify(data));
					res.end();
				})
		});
	} else {
		// error
		res.end();
	}
  }).listen(PORT, () => console.log('server running'));