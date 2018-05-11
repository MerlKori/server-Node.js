var http = require("http");
var Datastore = require('nedb');
var db = new Datastore({filename: 'records'});

db.loadDatabase();

function createdRecord(str) {
	let obj = JSON.parse(str)
	db.insert({title : obj.title, desc: obj.desc});
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
	res.writeHead(200, {'Content-Type': 'text/html'});

	if (req.url == '/created') {
		req.on('data', (chunk) => {
			createdRecord(chunk);
			res.write('ok');
			res.end();
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
		req.on('data', (chunk) => {
			findAllRecord()
				.then((data) => {
					res.write(JSON.stringify(data));
					res.end();
				})
		});
	} else if (req.url == '/update')  {
		req.on('data', (chunk) => {
			updateRecord(chunk)
			res.write('ok');
			res.end();
		});
	} else if (req.url == '/rem-rec')  {
		req.on('data', (chunk) => {
			removeRecord(chunk)
			res.write('ok');
			res.end();
		});
	} else {
		// error
		res.end();
	}
  }).listen(9595, () => console.log('server running'));