const express = require('express');
const app = express();
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');




MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {

	if (err) throw err;

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.static('public'));

	app.get('/', (req, res) => {
		res.sendFile(__dirname + '/index.html');
	});


	const db = client.db('gradtracker');
	app.get('/api/datatable', (req, res) => {

		db.collection('students').find({}).toArray((err, results) => {

			if (err) throw err;
			console.log(results);
			let dataSet = new Array();
			for (let i = 0; i < results.length; i++) {
				let fieldArr = new Array();
				fieldArr.push(results[i].lnumber.toString());
				fieldArr.push(results[i].lastname.toString());
				fieldArr.push(results[i].firstname.toString());
				//				fieldArr.push(results[i].street.toString());
				//				fieldArr.push(results[i].city.toString());
				//				fieldArr.push(results[i].state.toString());
				//				fieldArr.push(results[i].zip.toString());
				fieldArr.push(results[i].gradyear.toString());
				fieldArr.push(results[i].gradsemester.toString());
				fieldArr.push(results[i].major.toString());
				//				fieldArr.push(results[i].currentemployer.toString());
				//				fieldArr.push(results[i].currentsalary.toString());
				//				fieldArr.push(results[i].email.toString());
				dataSet.push(fieldArr);
			}


			res.end(JSON.stringify(dataSet));

		});

	});

	app.listen(8080, () => {
		console.log('Server Ready');
	});

});
